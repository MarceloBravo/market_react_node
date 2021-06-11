const connection = require('../../db/connection.js')
const tools = require('../shared/tools.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const constantes = require('../shared/constants');
const rolesUsuario = require('../shared/functions')

let cnn = connection.conect();

let login = {}


login.getUserData = async (credentials, callback) => {

    if(cnn){
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
            if(err){
                return callback(err, null)
            }else if(row === undefined){
                return callback({mensaje: 'Usuario inexistente.', tipo:'danger', id:-1})
            }else{
                let roles = await rolesUsuario(row.id)
                bcrypt.compare(credentials.password.toString(), row.password.toString(), (err, res)=>{
                    //console.log('LOGIN',err, res)
                    if(err || !res){
                        return callback(err ? err.message : {mensaje: 'Usuario y/o contraseña no válidos.',tipoMensaje:'danger', id:-1}, {access_token: null, user:null})
                    }else{
                        delete row.password
                        //console.log('result.id', result.id)
                        access_token = jwt.sign({user: row, roles}, constantes.secret, {issuer: credentials.host})    //Agregar datos al token: https://www.npmjs.com/package/jsonwebtoken
                        return callback(null,{access_token, user: row, roles})
                    }
                })
            }
        })
            
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
    }
}


login.logout = (req, res, callback) => {
    if(req.session.user){
        req.session.user = null
    }
    callback(null, {mensaje: 'La sessión ha finalizado.', tipo: 'success'})
}


module.exports = login