const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let SubCategoriasModel = {}

SubCategoriasModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `
                SELECT 
                    sc.id,
                    sc.nombre,
                    c.nombre as categoria,
                    sc.categoria_id,
                    sc.created_at,
                    sc.updated_at
                FROM 
                    sub_categorias sc 
                    INNER JOIN categorias c ON sc.categoria_id = c.id
                WHERE 
                    sc.deleted_at IS NULL AND 
                    c.deleted_at IS NULL 
                LIMIT ${desde},${constantes.regPerPage}
        `

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar los registros: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(sc.id) as totReg 
                                                        FROM sub_categorias sc 
                                                        INNER JOIN categorias c ON sc.categoria_id = c.id
                                                        WHERE 
                                                            sc.deleted_at IS NULL AND 
                                                            c.deleted_at IS NULL`
                                                        )
                
                resp = callback(null, {data: result, page: pag, totRows: totRows[0][0].totReg, rowsPerPage: constantes.regPerPage});
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


SubCategoriasModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let filtro = `
                    sc.nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                    c.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                    DATE_FORMAT(sc.created_at, '%d %m %Y') LIKE ${cnn.escape('%'+texto+'%')} OR
                    DATE_FORMAT(sc.updated_at, '%d %m %Y') LIKE ${cnn.escape('%'+texto+'%')}
        `
        let qry = `
                SELECT 
                    sc.id,
                    sc.nombre,
                    c.nombre as categoria,
                    sc.categoria_id,
                    sc.created_at,
                    sc.updated_at
                FROM 
                    sub_categorias sc 
                    INNER JOIN categorias c ON sc.categoria_id = c.id
                WHERE 
                    sc.deleted_at IS NULL AND 
                    c.deleted_at IS NULL AND (
                        ${filtro}
                    )
                LIMIT ${desde},${constantes.regPerPage}
        `

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar los registros: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(sc.id) as totReg 
                                                        FROM sub_categorias sc 
                                                        INNER JOIN categorias c ON sc.categoria_id = c.id
                                                        WHERE 
                                                            sc.deleted_at IS NULL AND 
                                                            c.deleted_at IS NULL AND (${filtro})`
                                                        )

                resp = callback(null, {data: result, page: pag, totRows: totRows[0][0].totReg, rowsPerPage: constantes.regPerPage});
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

SubCategoriasModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
                SELECT 
                    sc.id,
                    sc.nombre,
                    c.nombre as categoria,
                    sc.categoria_id,
                    sc.created_at,
                    sc.updated_at
                FROM 
                    sub_categorias sc 
                    INNER JOIN categorias c ON sc.categoria_id = c.id
                WHERE 
                    sc.deleted_at IS NULL AND 
                    c.deleted_at IS NULL 
        `

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar el listado de sub-categorías: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, result);
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


SubCategoriasModel.getAllByCategory = (idCategoria, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 


        let qry = `
                SELECT 
                    sc.id,
                    sc.nombre,
                    c.nombre as categoria,
                    sc.categoria_id,
                    sc.created_at,
                    sc.updated_at
                FROM 
                    sub_categorias sc 
                    INNER JOIN categorias c ON sc.categoria_id = c.id
                WHERE 
                    sc.deleted_at IS NULL AND 
                    c.deleted_at IS NULL AND 
                    sc.categoria_id = ${cnn.escape(idCategoria)}
        `

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar las sub-categorías por categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, result);
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

SubCategoriasModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
                SELECT 
                    id,
                    nombre,
                    categoria_id,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    sub_categorias sc 
                WHERE 
                    deleted_at IS NULL AND 
                    id = ${cnn.escape(id)}
        `

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar la categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, result[0]);
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

SubCategoriasModel.insert = (data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 


        let qry = `
                INSERT INTO sub_categorias ( 
                    nombre,
                    categoria_id,
                    created_at,
                    updated_at
                ) VALUES (
                    ${cnn.escape(data.nombre)},
                    ${cnn.escape(data.categoria_id)},
                    CURDATE(),
                    CURDATE()
                )
        `
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al insertar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La sub-categoría ha sido ingresada.', tipoMensaje: 'success', id: result.insertId});
                }else{
                    resp = callback({mensaje: 'No fue posible insertar la sub-categoría.', tipoMensaje: 'danger'})
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

SubCategoriasModel.update = (id, data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 


        let qry = `
                UPDATE sub_categorias SET 
                    nombre = ${cnn.escape(data.nombre)},
                    categoria_id = ${cnn.escape(data.categoria_id)},
                    updated_at = CURDATE() 
                WHERE id = ${cnn.escape(id)}
        `
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al actualizar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La sub-categoría ha sido actualizada.', tipoMensaje: 'success', id});
                }else{
                    resp = callback({mensaje: 'No fue posible actualizar la sub-categoría.', tipoMensaje: 'danger'})    
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

SubCategoriasModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
                UPDATE sub_categorias SET 
                    deleted_at = CURDATE() 
                WHERE id = ${cnn.escape(id)}
        `
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La sub-categoría ha sido eliminada.', tipoMensaje: 'success', id});
                }else{
                    resp = callback({mensaje: 'No fue posible eliminar la sub-categoría.', tipoMensaje: 'danger'})
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

SubCategoriasModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM sub_categorias WHERE id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La sub-categoría ha sido eliminada.', tipoMensaje: 'success', id});
                }else{
                    resp = callback({mensaje: 'No fue posible eliminar la sub-categoría.', tipoMensaje: 'danger'})
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

module.exports = SubCategoriasModel