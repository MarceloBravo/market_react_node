const connection = require('../../db/connection.js');
const constantes = require('../shared/constants');

let pool = connection.pool()

let SeccionesHome = {}

SeccionesHome.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `SELECT 
                        id,
                        nombre,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        secciones_home
                    WHERE
                        deleted_at IS NULL
                    LIMIT ${desde}, ${constantes.regPerPage}
                    `

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener las secciones: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) totRows FROM secciones_home WHERE deleted_at IS NULL`)
                resp = callback(null, {data: result, page: pag, rows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage});
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

SeccionesHome.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let filtro = ` AND (
                            nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                            CONVERT(created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR 
                            CONVERT(updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}
                        )`

        let qry = `SELECT 
                        id,
                        nombre,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        secciones_home
                    WHERE
                        deleted_at IS NULL 
                         ${filtro}    

                    LIMIT ${desde}, ${constantes.regPerPage}
                    `

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar las secciones: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) totRows FROM secciones_home WHERE deleted_at IS NULL ${filtro}`)
                resp = callback(null, {data: result, page: pag, rows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage});
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

SeccionesHome.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                        id,
                        nombre,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        secciones_home
                    WHERE
                        deleted_at IS NULL
                    `

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de todas las secciones: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let respuesta = await obtenerProductosSeccion(cnn, result)
                resp = callback(null, respuesta);
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


const obtenerProductosSeccion = async (cnn, res) => {
    await Promise.all(res.map(async e => {
    let qry = `SELECT 
                p.id,
                p.nombre,
                p.descripcion,
                p.precio_venta_normal,
                p.stock,
                p.unidad_id,
                p.marca_id,
                p.categoria_id,
                p.sub_categoria_id,
                psh.texto1,
                psh.texto2, 
                psh.seccion_id, 
                ip.source_image 
            FROM 
                productos_secciones_home psh 
                INNER JOIN productos p ON psh.producto_id = p.id 
                LEFT JOIN (
                        SELECT 
                            producto_id, 
                            source_image 
                        FROM imagenes_productos 
                        WHERE deleted_at IS NULL 
                        AND imagen_principal 
                        ORDER BY imagen_principal DESC
                    ) ip 
                ON p.id = ip.producto_id 
            WHERE 
                psh.deleted_at IS NULL AND 
                p.deleted_at IS NULL AND 
                psh.seccion_id = ${cnn.escape(e.id)}`

        let productos = await cnn.promise().query(qry)
        e.productos = productos[0]
    }))
    return res
}

SeccionesHome.get = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    nombre, 
                    created_at, 
                    updated_at  
                FROM 
                    secciones_home 
                WHERE 
                    deleted_at IS NULL AND 
                    id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                let productos = await getProductosSeccion(cnn, id)
                result[0]['productos'] = productos[0]
                resp = callback(null, result[0])
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


const getProductosSeccion = (cnn, idSeccion) => {
    return cnn.promise().query(
        `SELECT 
            psh.id,
            psh.producto_id,
            psh.texto1,
            psh.texto2,
            p.nombre,
            p.descripcion,
            p.precio_venta_normal,
            p.stock,
            p.unidad_id,
            p.marca_id,
            p.categoria_id,
            p.sub_categoria_id,
            psh.created_at,
            psh.updated_at, 
            ip.source_image 
        FROM 
            productos_secciones_home psh 
            INNER JOIN productos p ON psh.producto_id = p.id 
            LEFT JOIN (
                SELECT 
                    producto_id, 
                    source_image 
                FROM imagenes_productos 
                WHERE deleted_at IS NULL 
                ORDER BY imagen_principal DESC 
                LIMIT 1
                ) ip 
            ON p.id = ip.producto_id 
        WHERE 
            psh.deleted_at IS NULL AND 
            p.deleted_at IS NULL AND 
            psh.seccion_id = ${idSeccion}`
        )
}


SeccionesHome.insert = async (data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `INSERT INTO secciones_home (
                        nombre,
                        created_at,
                        updated_at
                    ) VALUES (
                        ${cnn.escape(data.nombre)},
                        CURDATE(),
                        CURDATE()
                    )`
                    
        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                await cnn.promise().rollback()
                resp = callback(null, {mensaje: 'Ocurrió un error al ingresar la sección: '+err.message, tipoMensaje: 'danger'})
            }else{
                try{
                    await eliminarProductos(cnn, result.insertId, data.productos)
                    await actualizarProductos(cnn, result.insertId, data.productos)
                    await insertarProductos(cnn, result.insertId, data.productos)
                    await cnn.promise().commit()
                    resp = callback(null, {mensaje: 'La sección a sido ingresada.', tipoMensaje: 'success', id: res.insertId})
                }catch(err){
                    await cnn.promise().rollback()
                    resp = callback(null, {mensaje: 'Ocurrió un error al ingresar los productos de la sección: '+err.message, tipoMensaje: 'danger'})
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


SeccionesHome.update = async (id, data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE secciones_home SET 
                        nombre = ${cnn.escape(data.nombre)},
                        updated_at = CURDATE() 
                    WHERE 
                        id = ${cnn.escape(id)}`
        
        await cnn.promise().beginTransaction();
        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                await cnn.promise().rollback()
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar las secciones: '+err.message, tipoMensaje: 'danger'})
            }else{
                try{
                    await eliminarProductos(cnn, id, data.productos)
                    await actualizarProductos(cnn, id, data.productos)
                    await insertarProductos(cnn, id, data.productos)
                    await cnn.promise().commit()
                    resp = callback({mensaje: 'Las secciones han sido actualizadas', tipoMensaje: 'success', id})
                }catch(err){
                    await cnn.promise().rollback()
                    resp = callback({mensaje: 'Ocurrió un error al intentar actualizar los productos de las secciones: '+err.message, tipoMensaje: 'danger'})
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


SeccionesHome.softDelete = async (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE productos_secciones_home SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`
        
        await cnn.promise().beginTransaction();
        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar la sección.', tipoMensaje: 'danger'})
            }else{
                try{
                    await cnn.promise().query(`UPDATE prosuctos_secciones_home SET deleted_at WHERE seccion_id = ${cnn.escape(id)}`)
                    resp = callback(null,{mensaje: 'La sección ha sido eliminada.', tipoMensaje: 'success', id})
                }catch(err){
                    resp = callback({mensaje: 'Ocurrió un error al eliminar los productos de la sección.', tipoMensaje: 'danger'})
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


SeccionesHome.erase = async (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM productos_secciones_home WHERE id = ${cnn.escape(id)}`

        await cnn.promise().beginTransaction();
        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al borrar la sección.', tipoMensaje: 'danger'})
            }else{
                try{
                    await cnn.promise().query(`DELETE FROM prosuctos_secciones_home WHERE seccion_id = ${cnn.escape(id)}`)
                    resp = callback(null,{mensaje: 'La sección ha sido borrada.', tipoMensaje: 'success', id})
                }catch(err){
                    resp = callback({mensaje: 'Ocurrió un error al borrar los productos de la sección.', tipoMensaje: 'danger'})
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


const insertarProductos = async (cnn, idSeccion, data) => {
    return await data.map(async p => {
        if(p.id < 0){
            let qry = `INSERT INTO productos_secciones_home (
                seccion_id,
                producto_id,
                texto1,
                texto2,
                created_at,
                updated_at
            ) VALUES (
                ${cnn.escape(idSeccion)},
                ${cnn.escape(p.producto_id)},
                ${cnn.escape(p.texto1)},
                ${cnn.escape(p.texto2)},
                CURDATE(),
                CURDATE()
            )`

            await cnn.promise().query(qry);
        }
    })
}


const eliminarProductos = async (cnn, idSeccion, data) => {
    let ids = await data.map(p => p.producto_id)
    if(ids.length === 0){
        return true
    }
    let qry = `UPDATE productos_secciones_home SET deleted_at = CURDATE() WHERE seccion_id = ${idSeccion} AND producto_id NOT IN (${ids})`

    return new Promise(function(resolve, reject){
        cnn.query(qry,(err, res) => {
            return err ? reject(false) : resolve(true)
        })
    })
}


const actualizarProductos = async (cnn, idSeccion, data) => {
    return await data.map(async p => {
        if(p.id > 0){
            let qry = `UPDATE productos_secciones_home SET 
                            seccion_id = ${cnn.escape(idSeccion)},
                            producto_id = ${cnn.escape(p.producto_id)},
                            texto1 = ${cnn.escape(p.texto1)}, 
                            texto2 = ${cnn.escape(p.texto2)}, 
                            updated_at = CURDATE(),
                            deleted_at = null 
                        WHERE
                            id = ${p.id}
                        `

            await cnn.promise().query(qry)
        }
    })
}


module.exports = SeccionesHome