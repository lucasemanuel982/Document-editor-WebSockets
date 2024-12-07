const form = document.getElementById("form-cadastro");

import emitirCadUser from "./socket-front-cadastro.js";

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();

    const nome = form["input-usuario"].value;
    const senha = form["input-senha"].value;

    emitirCadUser({nome, senha});
});