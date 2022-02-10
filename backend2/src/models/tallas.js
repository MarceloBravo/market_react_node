const connection = require('../../db/connection.js');
const constantes = require('../shared/constants');

let pool = connection.pool()

let TallasModel = {}


TallasModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id: -1})
        }


        let desde = constantes.regPerPage * pag
        let from = `
                FROM 
                    tallas  
                WHERE
                    deleted_at IS NULL 
                ORDER BY 
                    updated_at DESC,
                    talla ASC
        `
        let qry = `
            SELECT 
                id, talla, created_at, updated_at 
            ${from}
            LIMIT ${desde}, ${constantes.regPerPage}
        `

        cnn.query(qry, async (err, result) => {
            let res = null
            if(err){
                res = callback({mensaje: 'Ocurrio un error al intentar obtener el listado de registros: ' + err.message, tipoMensaje: 'danger', id: -1})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(*) totRows ${from}`)
                res = callback(null, {data: result, page: pag, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage})
            }
            cnn.release()
            return res
        })
    })
} 


TallasModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva', tipoMensaje: 'danger', id: -1})
        }

        let desde = constantes.regPerPage * pag
        let from = `
                FROM 
                    tallas 
                WHERE
                    deleted_at IS NULL AND 
                    (
                        talla LIKE '%${cnn.escape(texto)}%' OR 
                        DATE_FORMAT(created_at, '%d %m %Y') LIKE '%${cnn.escape(texto)}%' OR 
                        DATE_FORMAT(updated_at, '%d %m %Y') LIKE '%${cnn.escape(texto)}%'
                    ) 
                    ORDER BY 
                        updated_at DESC, 
                        talla ASC`

        let qry = `SELECT talla ${from} LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, result) => {
            let res = null
            if(err){
                res = callback({mensaje: 'Ocurrio un error al intentar filtrar los registros: ' + err.message, tipoMensaje: 'danger', id: -1})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(*) totRows ${from}`)
                res = callback(null, {data: result, page: pag, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage})
            }
            cnn.release()
            return res
        })
    })
}


TallasModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id:-1})
        }

        let qry = `SELECT 
                id, tallas, created_at, updated_at
            FROM 
                tallas 
            WHERE
                deleted_at IS NULL 
            ORDER BY talla ASC`

        cnn.query(qry,(err, result) => {
            let res = null
            if(err){
                res = callback({mensaje: 'Ocurrio un error al obtener el listado de todas la tallas: ' + err.message, tipoMensaje: 'danger', id:-1})
            }else{
                res = callback(null, result)
            }
            cnn.release()
            return res
        })
    })
}


TallasModel.getBySubCategory = (idSubCategoria, callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `
            SELECT 
                t.id, 
                t.talla, 
                t.created_at, 
                t.updated_at 
            FROM 
                tallas t 
                INNER JOIN tallas_subcategorias tsc ON t.id = tsc.tallas_id 
            WHERE 
                t.deleted_at IS NULL AND 
                tsc.deleted_at IS NULL AND 
                tsc.sub_categorias_id = ${cnn.escape(idSubCategoria)}  
            GROUP BY
                t.id, 
                t.talla, 
                t.created_at, 
                t.updated_at  
            ORDER BY 
                t.talla ASC             
        `

        cnn.query(qry, (err, result) => {
            let res = null
            if(err){
                res = callback({mensaje: 'Ocurrio un error al intentar obtener las tallas por subcategorías', tipoMensaje: 'danger', id:-1})
            }else{
                res = callback(null, result)
            }

            cnn.release()
            return res
        })
    })
}

TallasModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id:-1})
        }

        let qry = `
            SELECT 
                t.id, 
                t.talla,
                c.id as categoria_id, 
                t.created_at,
                t.updated_at 
            FROM 
                tallas t 
                INNER JOIN tallas_subcategorias tsc ON t.id = tsc.tallas_id 
                INNER JOIN sub_categorias sc ON tsc.sub_categorias_id = sc.id 
                INNER JOIN categorias c ON sc.categoria_id = c.id 
            WHERE 
                t.deleted_at IS NULL AND 
                sc.deleted_at IS NULL AND 
                c.deleted_at IS NULL AND 
                t.id = ${cnn.escape(id)}`

        let qrySubCategorias = `
            SELECT 
                sc.id,
                sc.nombre,
                sc.created_at,
                sc.updated_at
            FROM 
                tallas_subcategorias tsc 
                INNER JOIN sub_categorias sc ON tsc.sub_categorias_id = sc.id 
            WHERE 
                tsc.tallas_id = ${cnn.escape(id)}
        `

        cnn.query(qry, async (err, result) => {
            let res = null
            if(err){
                res = callback({mensaje: 'Ocurrio un error al buscar el registro: ' + err.message, tipoMensaje: 'danger', id: -1})
            }else{
                let subCategorias = await cnn.promise().query(qrySubCategorias)
                result[0].sub_categorias = subCategorias[0]
                res = callback(null, result[0])
            }
            cnn.release()
            return res
        } )
    })
}

TallasModel.insert = (data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `INSERT INTO tallas (
                        talla,
                        created_at,
                        updated_at
                    ) VALUES (
                        ${cnn.escape(data.talla)},
                        CURDATE(),
                        CURDATE()
                    )`
            
        let resp = null
        try{
            await cnn.promise().beginTransaction()

            let result = await cnn.promise().query(qry);

            await grabarTallasSubcategorias(cnn, result[0].insertId, data.sub_categorias)
            
            await cnn.promise().commit()

            resp = callback(null, {mensaje: 'El registro ha sido ingresado.', tipoMensaje: 'success', id: result.insertId})

        } catch(err) {
            resp = callback({mensaje: 'Ocurrio un error al intentar ingresar el registro: ' + err.message, tipoMensaje: 'danger', id: -1})
        }
        cnn.release()
        return resp
    })

}

TallasModel.update = (id, data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `UPDATE tallas SET 
                        talla='${data.talla}',
                        updated_at = CURDATE(), 
                        deleted_at = null
                    WHERE 
                        id = ${cnn.escape(id)}`

        let resp = null
        try{
            await cnn.promise().beginTransaction()

            let result = await cnn.promise().query(qry);

            await grabarTallasSubcategorias(cnn, id, data.sub_categorias)

            //await insertarTallasSubcategorias(cnn, id, data.sub_categorias)
            
            await cnn.promise().commit()

            resp = callback(null, {mensaje: 'El registro ha sido actualizado.', tipoMensaje: 'success', id: result.insertId})

        } catch(err) {
            resp = callback({mensaje: 'Ocurrio un error al intentar actualizar el registro: ' + err.message, tipoMensaje: 'danger', id: -1})
        }
        cnn.release()
        return resp
    })
}


const grabarTallasSubcategorias = async (cnn, idTalla, arrSubCategorias) => {
    
    try{
        if(arrSubCategorias.length > 0){
            let qry = `DELETE FROM tallas_subcategorias WHERE tallas_id = ${idTalla} AND sub_categorias_id NOT IN (${arrSubCategorias})`
            await cnn.promise().query(qry)
        
            let qryInsert = `INSERT INTO tallas_subcategorias (
                                tallas_id,
                                sub_categorias_id,
                                created_at,
                                updated_at 
                            ) 
                            SELECT ${idTalla}, id, CURDATE(), CURDATE() 
                                FROM sub_categorias 
                            WHERE 
                                id IN (${arrSubCategorias}) AND 
                                id NOT IN (
                                    SELECT 
                                        sub_categorias_id 
                                    FROM 
                                        tallas_subcategorias 
                                    WHERE 
                                        tallas_id = ${idTalla} AND 
                                        sub_categorias_id IN (${arrSubCategorias})
                                )
                            `
            console.log(qryInsert)

            await cnn.promise().query(qryInsert)
        }

        
    }catch(error){
        throw 'Ocurrio un error al grabar las tallas.'
    }
    return true
} 

TallasModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `UPDATE tallas SET  
                        deleted_at = CURDATE()
                    WHERE 
                        id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result) => {
            let res = null
            if(err){
                res = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: ' + err.message, tipoMensaje: 'danger', id: -1})
            }else{
                if(result.affectedRows > 0){
                    res = callback(null, {mensaje: 'El registro ha sido eliminado.' , tipoMensaje: 'success', id})
                }else{
                    res = callback({mensaje: 'No fue posible eliminar el registro.', tipoMensaje: 'danger', id: -1})
                }
                cnn.release()
                return res
            }
        })
    })
}

TallasModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            return callback({mensaje: 'Conección inactiva.', tipoMensaje: 'danger', id: -1})
        }

        let qry = `DELETE FROM 
                        tallas
                    WHERE 
                        id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result) => {
            let res = null
            if(err){
                res = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: ' + err.message, tipoMensaje: 'danger', id: -1})
            }else{
                if(result.affectedRows > 0){
                    res = callback(null, {mensaje: 'El registro ha sido eliminado.' , tipoMensaje: 'success', id})
                }else{
                    res = callback({mensaje: 'No fue posible eliminar el registro.', tipoMensaje: 'danger', id: -1})
                }
                cnn.release()
                return res
            }
        })
    })
}

module.exports = TallasModel