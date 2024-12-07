const socket = io();

const user =  document.getElementById("input-usuario")
const senha =  document.getElementById("input-senha")


function emitirCadUser(dados) {
    socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", ()=>{
    alert("Cadastro realizado com sucesso!");
    user.value = "";
    senha.value = "";
    window.location.href = "/login/index.html"
});

socket.on("cadastro_error", ()=>{
    alert(`Cadastro não realizado!`);
});

socket.on("usuario_existente", ()=>{
    alert(`Usuario já existente!`);
});

export default emitirCadUser;