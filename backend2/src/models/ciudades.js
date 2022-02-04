const connection = require('../../db/connection')
const constantes = require('../shared/constants')
const tools = require('../shared/tools')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let pool = connection.pool()

let CiudadModel = {}

CiudadModel.getPage = function(pag , callback){
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        }
    })

    let desde = constantes.regPerPage * pag
    let hasta = desde + constantes.regPerPage
    let qry = `
        SELECT 
            cod_region,
            cod_provincia,
            cod_comuna,
            nombre
        FROM 
            ciudades
        WHERE
            deleted_at IS NULL
            LIMIT ${desde}, ${hasta}
        `

    cnn.query(qry, async (err, res) => {
        let resp = null
        if(err){
            resp = callback({mensaje: 'Ocurrio un error al obtener el listado de ciudades: ' + err.message(), tipoMensaje: 'danger', id:-1})
        }else{
            totRows = await cnn.promise().query(`SELECT count(*) as totRows FROM ciudades WHERE deleted_at IS NULL`)
            resp = callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.rowsPerPage, page: pag})
        }
        cnn.release()
        return resp
    })
}


CiudadModel.getAll = function(callback){
    cnn.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger', id:-1})
        }

        let qry = `SELECT 
                    cod_region, 
                    cod_provincia,
                    cod_comuna,
                    nombre
                FROM 
                    ciudades 
                WHERE   
                    deleted_at IS NULL`

            cnn.query(qry, (err, res)=>{
                let result = null
                if(err){
                    result = callback({mensaje: 'Ocurrio un error al solicitar todas las ciudades: ' + err.message()})
                }else{
                    result = callback(null, res)
                }
                cnn.release()
                return result
            })
    })
}


CiudadModel.getAllByComuna = function(cod_comuna, callback){
    cnn.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger', id:-1})
        }

        let qry = `SELECT 
                    cod_region, 
                    cod_provincia,
                    cod_comuna,
                    nombre
                FROM 
                    ciudades 
                WHERE   
                    deleted_at IS NULL AND  
                    comuna LIKE ${'%'+cnn.escape(cod_comuna)+'%'}`

            cnn.query(qry, (err, res)=>{
                let result = null
                if(err){
                    result = callback({mensaje: 'Ocurrio un error al solicitar todas las ciudades: ' + err.message()})
                }else{
                    result = callback(null, res)
                }
                cnn.release()
                return result
            })
    })
}

CiudadModel.filter = function(texto, pag, callback){
    pool.getConnection((err, cnn) =>{
        if(err){
            return callback({mensaje: 'Conexión inactiva', tipoMensaje:'danger', id:-1})
        }

        let desde = constantes.rowsPerPage * pag
        let hasta = desde + constantes.rowsPerPage
        let filtro = `nombre LIKE ${'%'+cnn.escape(texto)+'%'}`
        qry = `
            SELECT
                cod_region,
                cod_provincia,
                cod_comuna,
                nombre
            FROM 
                ciudades
            WHERE 
                deleted_at IS NULL AND 
                ${filtro}
            LIMIT ${desde}, ${hasta}
        `

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al efectuar el filtro de ciudades: ' + err.message()})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(*) as totRows FROM ciudades WHERE deleted_at IS NULL AND ${filtro}`)
                resp = callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.rowsPerPage, page: pag})
            }
            cnn.release()
            return resp
        })
    })
}


CiudadModel.find = function(id, callback){
    cnn.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `SELECT 
                    cod_region, 
                    cod_provincia,
                    cod_comuna,
                    nombre
                FROM
                    ciudades
                WHERE id = ${cnn.escape(id)}
                `
        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al buscar el registro: '+err.message(), id})
            }else{
                resp = callback(null, res[0])
            }
            cnn.release()
            return resp
        })
    })
}


CiudadModel.insert = function(data, callback){
    cnn.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `INSERT INTO ciudades (
                        cod_region,
                        cod_provincia,
                        cod_comuna,
                        nombre
                    ) VALUES (
                        ${cnn.escape(data.cod_region)},
                        ${cnn.escape(data.cod_provincia)},
                        ${cnn.escape(data.cod_comuna)},
                        ${cnn.escape(data.nombre)},
                        created_at = CURDATE(),
                        updated_at = CURDATE()
                    )`

            cnn.query(qry, async (err, res) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrio un error al intentar ingresar el registro: '+err.message()})
                }else{
                    if(res.affectedRows > 0){
                        resp = callback(null, {mensaje: 'El registro sido ingresado.', tipoMensaje: 'success', id: res.insertId})
                    }else{
                        resp = callback({mensaje: 'La ciudad no pudo ser ingresada.', tipoMensaje: 'danger', id:-1})
                    }
                }
                cnn.release()
                return resp
            })
    } )
}

CiudadModel.update = function(id, data, callback){
    cnn.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `UPDATE ciudades SET 
                        cod_region = ${cnn.escape(data.cod_region)},
                        cod_provincia = ${cnn.escape(data.cod_provincia)},
                        cod_comuna = ${cnn.escape(data.cod_comuna)},
                        nombre = ${cnn.escape(data.nombre)},
                        updated_at = CURDATE()
                    WHERE id = ${cnn.escape(id)}`

            cnn.query(qry, async (err, res) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrio un error al intentar actualizar el registro: '+err.message()})
                }else{
                    if(res.affectedRows > 0){
                        resp = callback(null, {mensaje: 'El registro sido actualizado.', tipoMensaje: 'success', id: res.insertId})
                    }else{
                        resp = callback({mensaje: 'La ciudad no pudo ser actualizada.', tipoMensaje: 'danger', id:-1})
                    }
                }
                cnn.release()
                return resp
            })
    } )
}

CiudadModel.softDelete = function(id, callback){
    cnn.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `UPDATE ciudades SET 
                        deleted_at = CURDATE()
                    WHERE id = ${cnn.escape(id)}`

            cnn.query(qry, async (err, res) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrio un error al intentar eliminar el registro: '+err.message()})
                }else{
                    if(res.affectedRows > 0){
                        resp = callback(null, {mensaje: 'El registro sido eliminado.', tipoMensaje: 'success', id: res.insertId})
                    }else{
                        resp = callback({mensaje: 'La ciudad no pudo ser eliminada.', tipoMensaje: 'danger', id:-1})
                    }
                }
                cnn.release()
                return resp
            })
    } )
}


module.exports = CiudadModel