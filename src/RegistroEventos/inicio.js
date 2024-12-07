import {adicionarDocumento, obterDocumentos} from "../db/documentosDb.js"

function registroEventosInicio(socket, io){
    socket.on("obter_documentos", async (devolverDocumentos)=>{
        const documentos =  await obterDocumentos();
        devolverDocumentos(documentos);
    });

    socket.on("adicionar_documento", async (nome)=>{
        const documentoJaExiste = (await encontrarDocumento(nome)) !== null;

        if(documentoJaExiste) {
            socket.emit("documento_existente", nome);
        }else{
            const resultado = await  adicionarDocumento(nome);
    
            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nome);
            }else{
                io.emit("erro_adicionar_documento_interface", nome);
            }
        }
    })
}

export default registroEventosInicio;