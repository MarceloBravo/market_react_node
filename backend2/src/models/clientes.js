const connection = require('../../db/connection')
const constantes = require('../shared/constants')
const tools = require('../shared/tools')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

let pool = connection.pool()

let clientesModel = {}


clientesModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `SELECT 
                    id,
                    rut,
                    nombres,
                    apellido1,
                    apellido2,
                    direccion,
                    cod_region,
                    cod_provincia,
                    cod_comuna,
                    ciudad,
                    email,
                    fono,
                    foto,
                    casa_num,
                    block_num,
                    referencia,
                    created_at,
                    updated_at 
                FROM 
                    clientes
                WHERE 
                    deleted_at IS NULL 
                    LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de clientes: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(*) AS totRows FROM clientes WHERE deleted_at IS NULL`)
                resp = callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
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


clientesModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let filtro = texto ? ` AND (
                        rut LIKE ${cnn.escape('%'+texto+'%')} OR 
                        nombres LIKE ${cnn.escape('%'+texto+'%')} OR 
                        apellido1 LIKE ${cnn.escape('%'+texto+'%')} OR 
                        apellido2 LIKE ${cnn.escape('%'+texto+'%')} OR 
                        direccion LIKE ${cnn.escape('%'+texto+'%')} OR 
                        cod_region LIKE ${cnn.escape('%'+texto+'%')} OR 
                        cod_provincia LIKE ${cnn.escape('%'+texto+'%')} OR 
                        cod_comuna LIKE ${cnn.escape('%'+texto+'%')} OR 
                        ciudad LIKE ${cnn.escape('%'+texto+'%')} OR 
                        email LIKE ${cnn.escape('%'+texto+'%')} OR 
                        fono LIKE ${cnn.escape('%'+texto+'%')} OR 
                        casa_num  LIKE ${cnn.escape('%'+texto+'%')} OR 
                        block_num  LIKE ${cnn.escape('%'+texto+'%')} OR 
                        referencia LIKE ${cnn.escape('%'+texto+'%')} OR 
                        DATE_FORMAT(created_at, '%d/%m/%Y') LIKE ${cnn.escape('%'+texto+'%')} OR
                        DATE_FORMAT(updated_at, '%d/%m/%Y') LIKE ${cnn.escape('%'+texto+'%')} OR 
                        DATE_FORMAT(created_at, '%d-%m-%Y') LIKE ${cnn.escape('%'+texto+'%')} OR
                        DATE_FORMAT(updated_at, '%d-%m-%Y') LIKE ${cnn.escape('%'+texto+'%')} 
                        )` : ''

        let qry = `SELECT 
                    id,
                    rut,
                    nombres,
                    apellido1,
                    apellido2,
                    direccion,
                    cod_region,
                    cod_provincia,
                    cod_comuna,
                    ciudad,
                    email,
                    fono,
                    foto,
                    casa_num,
                    block_num,
                    referencia,
                    created_at,
                    updated_at 
                FROM 
                    clientes
                WHERE 
                    deleted_at IS NULL 
                    ${filtro}
                    LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de clientes: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(*) AS totRows FROM clientes WHERE deleted_at IS NULL ${filtro}`)
                resp = callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
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


clientesModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    id,
                    rut,
                    nombres,
                    apellido1,
                    apellido2,
                    direccion,
                    cod_region,
                    cod_provincia,
                    cod_comuna,
                    ciudad,
                    password,
                    email,
                    fono,
                    foto,
                    casa_num,
                    block_num,
                    referencia,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    clientes
                WHERE 
                    deleted_at IS NULL`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de clientes: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null,{mensaje: res, tipoMensaje: 'success'})
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


clientesModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    id,
                    rut,
                    nombres,
                    apellido1,
                    apellido2,
                    direccion,
                    cod_region,
                    cod_provincia,
                    cod_comuna,
                    ciudad,
                    email,
                    fono,
                    foto,
                    casa_num,
                    block_num,
                    referencia,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    clientes
                WHERE 
                    deleted_at IS NULL AND 
                    id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar los datos del clientes: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null,res[0])
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


clientesModel.findByRut = (rut, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    id,
                    rut,
                    nombres,
                    apellido1,
                    apellido2,
                    direccion,
                    cod_region,
                    cod_provincia,
                    cod_comuna,
                    ciudad,
                    password,
                    email,
                    fono,
                    foto,
                    casa_num,
                    block_num,
                    referencia,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    clientes
                WHERE 
                    deleted_at IS NULL AND 
                    rut = ${cnn.escape(rut)}`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar los datos del clientes: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null,res[0])
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


clientesModel.emailIsInUse = (email, rut, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    id,
                    rut,
                    nombres,
                    apellido1,
                    apellido2,
                    direccion,
                    cod_region,
                    cod_provincia,
                    cod_comuna,
                    ciudad,
                    password,
                    email,
                    fono,
                    foto,
                    casa_num,
                    block_num,
                    referencia,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    clientes
                WHERE 
                    deleted_at IS NULL AND 
                    email = ${cnn.escape(email)} AND 
                    rut <> ${cnn.escape(rut)}`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar los datos del clientes: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null,res[0])
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


clientesModel.insert = async (data, callback) => {
    let validate = validaDatos(null, data)
    if(validate.length > 0){
        return callback({mensaje: 'Datos incompletos o no válidos', tipoMensaje: 'danger', errors: validate})
    }

    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let password = await tools.encriptarPassword(data.password)

        let qry = `INSERT INTO clientes (
                        rut,
                        nombres,
                        apellido1,
                        apellido2,
                        direccion,
                        cod_region,
                        cod_provincia,
                        cod_comuna,
                        ciudad,
                        password,
                        email,
                        fono,
                        foto,
                        casa_num,
                        block_num,
                        referencia,
                        created_at,
                        updated_at
                    ) VALUES (
                        ${cnn.escape(data.rut)},
                        ${cnn.escape(data.nombres)},
                        ${cnn.escape(data.apellido1)},
                        ${cnn.escape(data.apellido2)},
                        ${cnn.escape(data.direccion)},
                        ${cnn.escape(data.cod_region)},
                        ${cnn.escape(data.cod_provincia)},
                        ${cnn.escape(data.cod_comuna)},
                        ${cnn.escape(data.ciudad)},
                        ${cnn.escape(password)},
                        ${cnn.escape(data.email)},
                        ${cnn.escape(data.fono)},
                        ${cnn.escape(data.foto)},
                        ${cnn.escape(data.casa_num)},
                        ${cnn.escape(data.block_num)},
                        ${cnn.escape(data.referencia)},
                        CURDATE(),
                        CURDATE()
                    )`

            cnn.query(qry, (err, res) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al intentar ingresar el usuario: '+ err.message, tipoMensaje: 'danger'})
                }else{
                    if(res.affectedRows > 0){
                        resp = callback(null, {mensaje: 'El cliente ha sido ingresado exitosamente.', tipoMensaje: 'success', id: res.insertId})
                    }else{
                        resp = callback({mensaje: 'El registro no pudo ser ingresado: '+ err.message, tipoMensaje: 'danger'})
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



clientesModel.update = async (id, data, callback) => {
    let validate = validaDatos(id, data)
    if(validate.length > 0){
        return callback({mensaje: 'Datos incompletos o no válidos', tipoMensaje: 'danger', errors: validate})
    }

    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let password = null
        if(data.password){
            password = await tools.encriptarPassword(data.password)
        }
        let qry = `UPDATE clientes SET 
                    rut = ${cnn.escape(data.rut)},
                    nombres = ${cnn.escape(data.nombres)},
                    apellido1 = ${cnn.escape(data.apellido1)},
                    apellido2 = ${cnn.escape(data.apellido2)},
                    direccion = ${cnn.escape(data.direccion)},
                    cod_region = ${cnn.escape(data.cod_region)},
                    cod_provincia = ${cnn.escape(data.cod_provincia)},
                    cod_comuna = ${cnn.escape(data.cod_comuna)},
                    ciudad = ${cnn.escape(data.ciudad)},
                    ${password ? 'password = ' + cnn.escape(password) + ',' : ''}
                    email = ${cnn.escape(data.email)},
                    fono = ${cnn.escape(data.fono)},
                    foto = ${cnn.escape(data.foto)},
                    casa_num = ${cnn.escape(data.casa_num)},
                    block_num = ${cnn.escape(data.block_num)},
                    referencia = ${cnn.escape(data.referencia)},
                    updated_at = CURDATE() 
                WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar el usuario: '+ err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El cliente ha sido actualizado exitosamente.', tipoMensaje: 'success', id: res.insertId})
                }else{
                    resp = callback({mensaje: 'El registro no pudo ser actualizado: '+ err.message, tipoMensaje: 'danger'})
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


clientesModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE clientes SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, {mensaje: 'El cliente ha sido eliminado.', tipoMensaje: 'success', id})
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


clientesModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM clientes WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let resp = nul
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar borrar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, {mensaje: 'El cliente ha sido borrado', tipoMensaje: 'success', id})
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


clientesModel.login = async (data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT 
                id,
                rut,
                nombres,
                apellido1,
                apellido2,
                direccion,
                cod_region,
                cod_provincia,
                cod_comuna,
                ciudad,
                password,
                email,
                fono,
                foto,
                casa_num,
                block_num,
                referencia
            FROM 
                clientes 
            WHERE 
                deleted_at IS NULL AND 
                email = ${cnn.escape(data.email)}`

        cnn.query(qry, (err, res)=>{
            let resp = null
            let row = res[0]
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al autenticar el usuario: '+err.message, tipoMensaje: 'danger'})
            }else if(row === undefined){
                resp = callback({mensaje: 'Usuario y/ocontraseña no válidos', tipoMensaje: 'danger'})
            }else{
                bcrypt.compare(data.password, row.password.toString(), (err, res)=>{
                    if(err || !res){
                        resp = callback(err ? err.message : {mensaje: 'Usuario y/o contraseña no válidos.',tipoMensaje:'danger', id:-1}, {access_token: null, user:null})
                    }else{
                        access_token = jwt.sign({user: row}, constantes.secret, {issuer: data.host, expiresIn: '5h'})    //Agregar datos al token: https://www.npmjs.com/package/jsonwebtoken
                        resp = callback(null,{access_token})
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

const validaDatos = (id, data) => {
    let res = []
    if(!data.rut || data.rut.length === 0)res.push({'rut': 'Debes ingresar el rut'})
    if(data.rut?.length > 14)res.push({'rut': 'El rut ingresado no es válido'})
    
    if(!data.nombres || data.nombres.length === 0)res.push({'nombres': 'El nombre del cliente es obligatorio'})
    if(data.nombres?.length > 50)res.push({'nombres': 'El nombre ingresado es demasiado largo. Ingresa un nombre más corto'})

    if(!data.apellido1 || data.apellido1.length === 0)res.push({'apellido1': 'El primer apellido es obligatorio'})
    if(data.apellido1?.length > 50)res.push({'apellido1': 'El primer apellido es demasiado largo. Ingresa un apellido más corto'})

    if(data.apellido2?.length > 50)res.push({'apellido2': 'El segundo apellido es demasiado largo. Ingresa un apellido más corto'})

    if(data.direccion?.length > 255)res.push({'direccion': 'La dirección es demasiado larga. Ingresa una dirección más corta'})

    if(!data.cod_region || isNaN(data.cod_region) || parseInt(data.cod_region) < 0)res.push({'cod_region': 'La ciudad seleccionada no es válida.'})

    if(!data.cod_provincia || isNaN(data.cod_provincia) || parseInt(data.cod_provincia) < 0)res.push({'cod_provincia': 'La provincia seleccionada no es válida.'})

    if(!data.cod_comuna || isNaN(data.cod_comuna) || parseInt(data.cod_comuna) < 0)res.push({'cod_comuna': 'La comuna seleccionada no es válida.'})

    if(!data.ciudad || data.ciudad.length === 0)res.push({'ciudad': 'La ciudad es obligatoria obligatorio'})
    if(data.ciudad?.length > 50)res.push({'ciudad': 'La ciudad es demasiado larga. Ingresa una ciudad más corta'})

    if(id && data.password && data.password.length === 0 || (!id && (!data.password || data.password.length === 0)))res.push({'password': 'La contraseña es obligatoria'})
    if(id && data.password && data.password.length > 20 || (!id && (!data.password || data.password.length > 20)))res.push({'password': 'La contraseña es demasiado larga Ingresa una contraseña mas corta'})
    
    if(!data.email || data.email.length === 0)res.push({'email': 'El email es obligatorio'})
    if(data.email?.length > 150)res.push({'email': 'El email ingreesado es demasiado largo. Ingresa un email más corto'})

    if(!data.fono || data.fono.length === 0)res.push({'fono': 'El fono es obligatorio'})
    if(data.fono?.length > 150)res.push({'fono': 'El fono ingreesado es demasiado largo. Ingresa un fono más corto'})

    if(data.foto && data.foto.length === 0)res.push({'foto': 'La foto es obligatorio'})
    if(data.foto && data.foto?.length > 255)res.push({'foto': 'La foto ingreesada es demasiada larga. Ingresa una foto más corta'})

    if(!data.casa_num || data.casa_num.length === 0)res.push({'casa_num': 'El número de casa es obligatorio'})
    if(data.casa_num?.length > 150)res.push({'casa_num': 'El número de casa ingreesado es demasiado largo. Ingresa un número más corto'})
    
    if(data.foto && data.foto.length === 0)res.push({'foto': 'La foto es obligatorio'})
    if(data.foto && data.foto?.length > 255)res.push({'foto': 'La foto ingreesada es demasiada larga. Ingresa una foto más corta'})

    if(data.block_num && data.block_num?.length > 10)res.push({'block_num': 'El número de block es demasiado largo. Ingresa un número más corto'})

    if(data.referencia && data.referencia?.length > 255)res.push({'referencia': 'LA referencia es demasiado larga. Ingresa una referencia más corta'})

    return res
}

module.exports = clientesModel