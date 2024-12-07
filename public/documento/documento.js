import { emitirTextoEditor, selecionarDocumento, emitirEcluirDOcumento, sairDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const buttonDelete = document.getElementById("excluir-documento");
const buttonVoltar = document.getElementById("voltar");

tituloDocumento.textContent = nomeDocumento || "Documento Sem Título"

selecionarDocumento(nomeDocumento);

// Quando soltar uma tecla ele pega o  que foi digitado
textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor(
        {
            texto: textoEditor.value,
            nomeDocumento
        });
});

function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
}

buttonDelete.addEventListener("click", () => {
    emitirEcluirDOcumento(nomeDocumento);
})

buttonVoltar.addEventListener("click", () => {
    sairDocumento(nomeDocumento);
})

function alertaERedirecionar(nome) {
    if (nome === nomeDocumento) {
        alert(`Documento ${nome} excluído!`);
        window.location.href = "/"
    }
}

function tratarAutorizacaoSucesso(payloadToken) {
    selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });
  }

export { atualizaTextoEditor, alertaERedirecionar, tratarAutorizacaoSucesso }