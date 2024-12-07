import {cadastrarUsuario, encontrarUsuario} from "../db/usuariosDb.js";

function registroEventoCad(socket,io) {
    socket.on("cadastrar_usuario", async (dados) =>{
        const usuarioJaExiste = (await encontrarUsuario(dados.nome)) !== null;

        if(usuarioJaExiste) {
            socket.emit("usuario_existente");
        }else{
            const resultado =  await cadastrarUsuario(dados);
            if (resultado.acknowledged) {
                socket.emit("cadastro_sucesso");
            }else{
                socket.emit("cadastro_error");
            }
        }

    });
};

export default registroEventoCad;