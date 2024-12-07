import { encontrarDocumento, atulizaDocumento, excluirDocumento, adicionarConexao, obterConexoes, removerConexaoPorSocketId } from "../db/documentosDb.js";

const usuariosOnline = {};

function registroEventoDocumento(socket, io) {
    socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {

        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            const usuarioAtual = usuariosOnline[socket.id];
            if (usuarioAtual) {
                const { nomeDocumento: salaAnterior } = usuarioAtual;
                socket.leave(salaAnterior);

                removerConexaoPorSocketId(nomeUsuario);
                io.to(salaAnterior).emit("usuarios_online", obterConexoes(salaAnterior));
            }

            socket.join(nomeDocumento);
            adicionarConexao({ nomeDocumento, nomeUsuario, socketId: socket.id });

            usuariosOnline[socket.id] = { nomeDocumento, nomeUsuario };

            io.to(nomeDocumento).emit("usuarios_online", obterConexoes(nomeDocumento));

            devolverTexto(documento.texto);
        }
    });

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atulizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("text_editor_clientes", texto);
        }
    })

    socket.on("emitir_exclusao_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);

        if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
        }
    })

    socket.on("sair_documento", (nomeDocumento ) => {
        const usuarioDesconectado = usuariosOnline[socket.id];
        if (usuarioDesconectado && usuarioDesconectado.nomeDocumento === nomeDocumento) {
            socket.leave(nomeDocumento);
            
            removerConexaoPorSocketId(usuarioDesconectado.nomeUsuario);
            delete usuariosOnline[socket.id];
            
            io.to(nomeDocumento).emit("usuarios_online", obterConexoes(nomeDocumento));
        }
    });

    socket.on("disconnect", () => {
        const usuarioDesconectado = usuariosOnline[socket.id];

        if (usuarioDesconectado) {
            const { nomeDocumento } = usuarioDesconectado;

            removerConexaoPorSocketId(socket.id);
            delete usuariosOnline[socket.id];

            io.to(nomeDocumento).emit("usuarios_online", obterConexoes(nomeDocumento));
        }
    });
}

export default registroEventoDocumento;