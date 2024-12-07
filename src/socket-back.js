import io from "./servidor.js";
import  autorizarUsuario  from "./middlewares/autorizarUsuario.js";
import "dotenv/config";


import registroEventosInicio from "./RegistroEventos/inicio.js";
import registroEventoDocumento from "./RegistroEventos/documento.js";
import registroEventoCad from "./RegistroEventos/cad.js";
import { registrarEventosLogin } from "./RegistroEventos/login.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
    registroEventosInicio(socket, nspUsuarios);
    registroEventoDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
    registroEventoCad(socket, io);
    registrarEventosLogin(socket, io);
});
