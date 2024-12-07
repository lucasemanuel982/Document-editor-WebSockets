import { documentosColecao } from "./dbConnect.js";

const conexoesPorDocumento = {};

function adicionarConexao({ nomeDocumento, nomeUsuario, socketId }) {
    if (!conexoesPorDocumento[nomeDocumento]) {
        conexoesPorDocumento[nomeDocumento] = new Set(); 
    }
    conexoesPorDocumento[nomeDocumento].add(nomeUsuario);
}


function removerConexaoPorSocketId(socketId) {
    for (const [nomeDocumento, listaConexoes] of Object.entries(conexoesPorDocumento)) {
        if (listaConexoes.has(socketId)) {
            listaConexoes.delete(socketId);
            
            if (listaConexoes.size === 0) {
                delete conexoesPorDocumento[nomeDocumento];
            }

            return; 
        }
    }
}


function obterConexoes(nomeDocumento) {
    return Array.from(conexoesPorDocumento[nomeDocumento] || []);
}

function encontrarDocumento(nome){
    const documento = documentosColecao.findOne({
        nome: { $regex: new RegExp(`^${nome}$`, 'i') }
    });
    return documento;
}

function excluirDocumento(nome){
    const resultado = documentosColecao.deleteOne({
        nome: { $regex: new RegExp(`^${nome}$`, 'i') }
    });
    return resultado;
}

function atulizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome
    },{
        $set: {
            texto
        }
    } );

    return atualizacao
}

function obterDocumentos() {
    const documentos = documentosColecao.find().toArray();

    return documentos;
}

function adicionarDocumento(nome) {
    const resultado = documentosColecao.insertOne({
        nome,
        texto:""
    });

    return resultado;
}

export {encontrarDocumento, atulizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento, adicionarConexao, removerConexaoPorSocketId, obterConexoes};