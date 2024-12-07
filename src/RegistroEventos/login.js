import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";

import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({ nome, senha }) => {
        try {
            const usuario = await encontrarUsuario(nome);

            if (!usuario) {
                socket.emit("dados_incorretos");
                return;
            }

            const autenticado = autenticarUsuario(senha, usuario);

            if (autenticado) {
                const tokenJWT = gerarJwt({ nomeUsuario: nome});
                
                socket.emit("autenticacao_sucesso", tokenJWT);
            } else {
                socket.emit("autenticacao_erro");
            }
        } catch (erro) {
            console.error("Erro no processo de login:", erro);
            socket.emit("erro_servidor");
        }
    });
}

export { registrarEventosLogin }