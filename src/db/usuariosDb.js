import { usuariosColecao } from "./dbConnect.js";

import criarHashESalSenha from "../utils/criarHashESalSenha.js";

function cadastrarUsuario({nome, senha}) {
    const {hashSenha, salSenha} = criarHashESalSenha(senha);

    return usuariosColecao.insertOne(
        {
            nome, 
            hashSenha,
            salSenha
        });
};

function encontrarUsuario(nome){
    const usuario = usuariosColecao.findOne({
        nome: { $regex: new RegExp(`^${nome}$`, 'i') }
    });
    return usuario;
}

export {cadastrarUsuario, encontrarUsuario};