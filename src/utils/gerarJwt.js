import jwt from "jsonwebtoken";


function gerarJwt(playload){
    const tokenJwt = jwt.sign(playload, process.env.CHAVE_JWT,
        {
            expiresIn: "1h"
        }
    )

    return tokenJwt;
}

export default gerarJwt;