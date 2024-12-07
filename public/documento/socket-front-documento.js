import { atualizaTextoEditor, alertaERedirecionar, tratarAutorizacaoSucesso } from "./documento.js";
import { obterCookie } from "../utils/cookies.js";

const listaUsuarios = document.querySelector("#lista-usuarios");
const quantidadeUsuarios = document.querySelector("#usersOn");

const socket = io("/usuarios", {
    auth: {
        token: obterCookie("tokenJWT"),
    },
});

socket.on("autorizacao_sucesso", (payloadToken) => {
    tratarAutorizacaoSucesso(payloadToken)
  });

socket.on("connect_error", (erro) => {
    window.location.href = "/login/index.html";
});


function selecionarDocumento(dadosEntrada) {
    socket.emit("selecionar_documento", dadosEntrada, (texto) => {
        atualizaTextoEditor(texto);
    });
}


socket.on("erro_conexao", () => {
    window.location.href = "/";
});


function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
}

function emitirEcluirDOcumento(nomeParaEmitir) {
    socket.emit("emitir_exclusao_documento", nomeParaEmitir);
}

function sairDocumento(dadosSaida) {
    socket.emit("sair_documento", dadosSaida);
}


// Atualizar a lista de usuários online no front
socket.on("usuarios_online", (usuarios) => {
    listaUsuarios.innerHTML = "";
    quantidadeUsuarios.innerHTML = "";
    quantidadeUsuarios.textContent = "Usuários Online: " + usuarios.length;
    usuarios.forEach((usuario) => {
        const users = document.createElement("li");
        users.textContent = usuario;
        listaUsuarios.appendChild(users);
    });
});


socket.on("text_editor_clientes", (texto) => {
    atualizaTextoEditor(texto);
});

socket.on("excluir_documento_sucesso", (nome) => {
    alertaERedirecionar(nome);
});

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});



export { emitirTextoEditor, selecionarDocumento, emitirEcluirDOcumento, sairDocumento };
