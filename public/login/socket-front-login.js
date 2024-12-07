import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitiAutenticarUsuario(dados) {
    socket.emit("autenticar_usuario", dados);
};

socket.on("autenticacao_sucesso", (tokenJWT)=> {
    definirCookie("tokenJWT",tokenJWT);
    window.location.href = "/";}
);
socket.on("autenticacao_erro", ()=> alert("Erro na autenticacão!"));

socket.on("dados_incorretos", ()=> alert("Dados incorretos!"));

export {emitiAutenticarUsuario};