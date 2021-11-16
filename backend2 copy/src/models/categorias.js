const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let categoriasModel = {}

categoriasModel.getPage = (pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `
            SELECT
                id,
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL 
            LIMIT ${desde}, ${constantes.regPerPage}
        `

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar los datos: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(*) AS totRows FROM categorias WHERE deleted_at IS NULL`)
                
                resp = callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
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

categoriasModel.filter = (texto, pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let filtro = `(
            nombre LIKE ${cnn.escape('%'+texto+'%')} OR
            CONVERT(created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
            CONVERT(updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}
        )`
        let qry = `
            SELECT
                id,
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL AND 
                ${filtro}
            LIMIT ${desde}, ${constantes.regPerPage}
        `

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar los registros: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(*) AS totRows FROM categorias WHERE deleted_at IS NULL AND nombre LIKE ${filtro}`)
                resp = callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
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

categoriasModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT
                id,
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL
        `

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar todas las categorías: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, res)
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


categoriasModel.getCategorias = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT
                id,
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL
        `

        cnn.query(qry, async (error, res)=>{
            let response = null
            if(error){
                response = callback({mensaje: 'Ocurrió un error al obtener el listado de categoríoas: '+error.message, tipoMensaje: 'danger'})
            }else{
                let resp = await Promise.all(res.map(async element => {
                        let subCat = await subCategorias(cnn, element.id)
                        element.sub_categoria = subCat
                        return element
                    })
                );
                response = callback(null, resp)
            }
            cnn.release()
            return response;
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

const subCategorias = async (cnn, idCategoria) => {
    let qry = `SELECT id, nombre FROM sub_categorias WHERE categoria_id = ${idCategoria} AND deleted_at IS NULL` 
    try{
        let res = await cnn.promise().query(qry)
        return res[0]
    }catch(error){
        console.log('ERROR SUB_CATEGORIAS', error)
        return error
    }
}

categoriasModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL AND 
                id = ${cnn.escape(id)}
        `

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, res[0])
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

categoriasModel.insert = (data, callback) => {
    let validacion = validaDatos(data);
    if(validacion.length > 0){
        return callback({mensaje: 'Datos no válidos o incompletos: ' + validacion[0], tipoMensaje: 'danger'})
    }
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            INSERT INTO categorias (
                nombre,
                created_at,
                updated_at 
            ) VALUES (
                ${cnn.escape(data.nombre)},
                CURDATE(),
                CURDATE()
            )
        `

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al insertar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El registro ha sido ingresado.' , tipoMensaje: 'success', id: res.insertId})
                }else{
                    resp = callback({mensaje: 'El registro no pudo ser ingresado.' , tipoMensaje: 'danger'})
                }
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

categoriasModel.update = (id, data, callback) => {
    let validacion = validaDatos(data);
    if(validacion.length > 0){
        return callback({mensaje: 'Datos no válidos o incompletos: ' + validacion[0], tipoMensaje: 'danger'})
    }

    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            UPDATE categorias SET 
                nombre = ${cnn.escape(data.nombre)},
                updated_at = CURDATE()
            WHERE 
                id = ${cnn.escape(id)}
            `

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al actualizar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El registro ha sido actualizado.' , tipoMensaje: 'success', id})
                }else{
                    resp = callback({mensaje: 'El registro no pudo ser actualizado.' , tipoMensaje: 'danger'})
                }
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

categoriasModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE categorias SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El registro ha sido eliminado.' , tipoMensaje: 'success', id})
                }else{
                    resp = callback({mensaje: 'El registro no pudo ser eliminado.' , tipoMensaje: 'danger'})
                }
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

categoriasModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM categorias WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El registro ha sido eliminado.' , tipoMensaje: 'success', id})
                }else{
                    resp = callback({mensaje: 'El registro no pudo ser eliminado.' , tipoMensaje: 'danger'})
                }
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

const validaDatos = (data) => {
    let res = []
    if(data.nombre.length === 0){res.push('El nombre de la categoría es obligatorio.')}
    if(data.nombre.length < 3){res.push('El nombre de la categoría debe tener almenos 3 carácteres. Ingresa un nombre más largo.')}
    if(data.nombre.length > 50){res.push('El nombre de la categoría debe tener almenos 50 carácteres. Ingresa un nombre más corto.')}
    return res
}

module.exports = categoriasModel