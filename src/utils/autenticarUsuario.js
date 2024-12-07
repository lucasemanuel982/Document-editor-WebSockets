import {scryptSync, timingSafeEqual} from "crypto"

function autenticarUsuario(senhaDigitada, usuario) {
    if (!usuario || !usuario.salSenha || !usuario.hashSenha) {
        return false;
    }

    try {
        const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64);
        
        const hashReal = Buffer.from(usuario.hashSenha, "hex");
        
        const autenticado = timingSafeEqual(hashTeste, hashReal);
        
        return autenticado;
    } catch (erro) {
        console.error("Erro ao autenticar usuário:", erro);
        return false;
    }
}

export default autenticarUsuario;