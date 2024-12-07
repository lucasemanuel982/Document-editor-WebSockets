
import {MongoClient} from "mongodb";

const cliente = new MongoClient("mongodb+srv://lucascursos982:lucas.123@alura.c5zfl2s.mongodb.net/?retryWrites=true&w=majority&appName=Alura")

let documentosColecao, usuariosColecao;

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");

    documentosColecao = db.collection("documentos");
    usuariosColecao = db.collection("usuarios");
} catch (error) {
    console.log(error)
}

export {documentosColecao, usuariosColecao};