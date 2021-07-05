const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let cnn = connection.conect()

let SubCategoriasModel = {}

SubCategoriasModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
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
                LIMIT ${desde},${hasta}
        `

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al solicitar los registros: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(sc.id) as totReg 
                                                        FROM sub_categorias sc 
                                                        INNER JOIN categorias c ON sc.categoria_id = c.id
                                                        WHERE 
                                                            sc.deleted_at IS NULL AND 
                                                            c.deleted_at IS NULL`
                                                        )
                
                return callback(null, {data:res, page: pag, totRows: totRows[0][0].totReg, rowsPerPage: constantes.regPerPage});
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


SubCategoriasModel.filter = (texto, pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
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
                LIMIT ${desde},${hasta}
        `

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al filtrar los registros: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(sc.id) as totReg 
                                                        FROM sub_categorias sc 
                                                        INNER JOIN categorias c ON sc.categoria_id = c.id
                                                        WHERE 
                                                            sc.deleted_at IS NULL AND 
                                                            c.deleted_at IS NULL AND (${filtro})`
                                                        )

                return callback(null, {data:res, page: pag, totRows: totRows[0][0].totReg, rowsPerPage: constantes.regPerPage});
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

SubCategoriasModel.getAll = (callback) => {
    if(cnn){
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

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al solicitar el listado de sub-categorías: ' + err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res);
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


SubCategoriasModel.getAllByCategory = (idCategoria, callback) => {
    if(cnn){
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

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al solicitar las sub-categorías por categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res);
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

SubCategoriasModel.find = (id, callback) => {
    if(cnn){
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

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al buscar la categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res[0]);
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

SubCategoriasModel.insert = (data, callback) => {
    if(cnn){
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
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al insertar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La sub-categoría ha sido ingresada.', tipoMensaje: 'success', id: res.insertId});
                }else{
                    return callback({mensaje: 'No fue posible insertar la sub-categoría.', tipoMensaje: 'danger'})
                }
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

SubCategoriasModel.update = (id, data, callback) => {
    if(cnn){
        let qry = `
                UPDATE sub_categorias SET 
                    nombre = ${cnn.escape(data.nombre)},
                    categoria_id = ${cnn.escape(data.categoria_id)},
                    updated_at = CURDATE() 
                WHERE id = ${cnn.escape(id)}
        `
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al actualizar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La sub-categoría ha sido actualizada.', tipoMensaje: 'success', id});
                }else{
                    return callback({mensaje: 'No fue posible actualizar la sub-categoría.', tipoMensaje: 'danger'})    
                }
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

SubCategoriasModel.softDelete = (id, callback) => {
    if(cnn){
        let qry = `
                UPDATE sub_categorias SET 
                    deleted_at = CURDATE() 
                WHERE id = ${cnn.escape(id)}
        `
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al eliminar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La sub-categoría ha sido eliminada.', tipoMensaje: 'success', id});
                }else{
                    return callback({mensaje: 'No fue posible eliminar la sub-categoría.', tipoMensaje: 'danger'})
                }
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

SubCategoriasModel.delete = (id, callback) => {
    if(cnn){
        let qry = `DELETE FROM sub_categorias WHERE id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al eliminar la sub-categoría: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La sub-categoría ha sido eliminada.', tipoMensaje: 'success', id});
                }else{
                    return callback({mensaje: 'No fue posible eliminar la sub-categoría.', tipoMensaje: 'danger'})
                }
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

module.exports = SubCategoriasModel