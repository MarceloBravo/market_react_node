const connection = require('../../db/connection.js')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const constantes = require('../shared/constants');
const rolesUsuario = require('../shared/functions');
const constants = require('../shared/constants');

let login = {}

let pool = connection.pool()


login.login = async (credentials, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

            let qry = `
            SELECT
                id,
                name,
                email, 
                password, 
                created_at, 
                updated_at, 
                a_paterno, 
                a_materno, 
                direccion, 
                foto,
                fono 
            FROM 
                users 
            WHERE email = ${cnn.escape(credentials.email)}             
                AND deleted_at IS NULL `
            
            cnn.query(qry, async (err, result) => {            
                let row = result[0]
                let access_token = null
                let refresh_token = null
                let resp = null
                if(err){
                    resp = callback(err, null)
                }else if(row === undefined){
                    resp = callback({mensaje: 'Usuario inexistente.', tipo:'danger', id:-1})
                }else{
                    let roles = await rolesUsuario(cnn, row.id)
                    bcrypt.compare(credentials.password.toString(), row.password.toString(), async (err, res)=>{

                        if(err || !res){
                            resp = callback(err ? err.message : {mensaje: 'Usuario y/o contraseña no válidos.',tipoMensaje:'danger', id:-1}, {access_token: null, user:null})
                        }else{
                            delete row.password
                            row.remember = credentials.remember
                            access_token = jwt.sign({user: row, roles}, constantes.secret, {issuer: credentials.host, expiresIn: constants.expiresTimeToken})    //Agregar datos al token: https://www.npmjs.com/package/jsonwebtoken
                            if(credentials.remember){
                                refresh_token = jwt.sign({user: row, roles}, constantes.secretRefresh, {issuer: credentials.host, expiresIn: constants.expiresTimeRefreshToken})    //Token de refresco dura 5:30 hrs, media hora más que el token
                            }else{
                                refresh_token = null
                            }
                            try{
                                await saveRememberToken(cnn, refresh_token, credentials.email)
                                resp = callback(null,{access_token, refresh_token, user: row, roles})
                            }catch(error){
                                resp = callback({mensaje: 'Ocurrió un error al registrar el token de refresco: ' + error.message, tipoMensaje: 'danger'})
                            }
                        }
                    })
                }
                cnn.release()
                return resp;
            })

            /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


login.logout = async (token, callback) => {
    try{
        const verifyResult = jwt.verify(token, constantes.secret)
        email = verifyResult.user.email
        if(!email){
            throw 'La sesión no pudo ser finalizada.'
        }
        await saveRememberToken(cnn, null,email)
        console.log('SESSIÓN FINALIZADA OK')
        return callback(null, {mensaje: 'Sesión finalizada', tipoMensaje: 'success'})
    }catch(error){
        console.log('ERROR AL FINALIZAR LA SESIÓN ---- '+error)
        return callback({mensaje: 'Ocurrió un error al intentar finalizar la sesión: '+error.message, tipoMensaje: 'danger'})
    }
}


login.refreshToken = async (refreshToken, host, callback) => {
    //console.log(refreshToken, host, constants.secretRefresh)
    let email = null, id = null
    try{
        const verifyResult = jwt.verify(refreshToken, constants.secretRefresh)
        //console.log('verifyResult',verifyResult)
        email = verifyResult.user.email
        //console.log('email',email)
        id = verifyResult.user.id
        //console.log('id',id)
    }catch(error){
        console.log('ERROR*****',error)
        return callback({mensaje: 'Ocurrió un error al reautenticar al usuario: '+error.message, tipoMensaje: 'danger'})
    }   
    
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
        SELECT
            id,
            name,
            email, 
            created_at, 
            updated_at, 
            a_paterno, 
            a_materno, 
            direccion, 
            foto,
            fono 
        FROM 
            users 
        WHERE email = ${cnn.escape(email)} AND 
            id = ${cnn.escape(id)} AND 
            remember_token = ${cnn.escape(refreshToken)} AND 
            deleted_at IS NULL `
    
    

        cnn.query(qry, async (err, result) => {
            let row = result[0]
            let access_token = null
            let refresh_token = null
            let resp = null
            if(err){
                resp = callback(err, null)

            }else if(row === undefined){
                resp = callback({mensaje: 'Usuario inexistente.', tipo:'danger', id:-1})

            }else{
                let roles = await rolesUsuario(cnn, row.id)
                row.remember = true
                access_token = jwt.sign({user: row, roles}, constantes.secret, {issuer: host, expiresIn: constants.expiresTimeToken})    //Agregar datos al token: https://www.npmjs.com/package/jsonwebtoken
                refresh_token = jwt.sign({user: row, roles}, constantes.secretRefresh, {issuer: host, expiresIn: constants.expiresTimeRefreshToken})    //Token de refresco dura 5:30 hrs, media hora más que el token 
                try{
                    await saveRememberToken(cnn, refresh_token, email)
                    resp = callback(null,{access_token, refresh_token, user: row, roles})
                    
                }catch(error){
                    resp = callback({mensaje: 'Ocurrió un error al registrar el token de refresco: ' + error.message, tipoMensaje: 'danger'})

                }
            }
            cnn.release()
            return resp
        })
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })

}


const saveRememberToken = async (cnn, token, email) => {
    try{
        let qry = `UPDATE users SET remember_token = ${cnn.escape(token)} WHERE email = ${cnn.escape(email)}`
        let res = await cnn.promise().query(qry)
        if(res[0].affectedRows === 0){
            throw "El token de refresco no pudo ser registrado"
        }

    }catch(error){
        throw error
    }
}

module.exports = login