import { emitirAdicionarDocumento } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";

// const tokenJWT = obterCookie("tokenJWT");

const listDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");
const botaoLogout = document.getElementById("botao-logout");

botaoLogout.addEventListener("click", () => {
    removerCookie("tokenJWT");
    alert("Usuário deslogado com sucesso!");
    window.location.href = "/login/index.html";
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    emitirAdicionarDocumento(inputDocumento.value);
    inputDocumento.value = "";
})

function inserirLinkDocumento(nomeDocumento) {
    listDocumentos.innerHTML += `
        <a href="/documento/index.html?nome=${nomeDocumento}"  id ="documento-${nomeDocumento}"class="list-group-item list-group-item-action">
            ${nomeDocumento}
        </a>
    `
}

function removerLinkDocumento(nomeDocumento) {
    const documentoRetorno = document.getElementById(`documento-${nomeDocumento}`)
    listDocumentos.removeChild(documentoRetorno)
}

export { inserirLinkDocumento, removerLinkDocumento };
