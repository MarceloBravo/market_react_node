const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let cnn = connection.conect()

let ProductosModel = {}

ProductosModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
        let fromClause = `  productos p 
                            INNER JOIN unidades u ON p.unidad_id = u.id 
                            INNER JOIN marcas m ON p.marca_id = m.id 
                            INNER JOIN categorias c ON p.categoria_id = c.id
                            INNER JOIN sub_categorias sc ON p.sub_categoria_id = sc.id 
                            LEFT JOIN imagenes_productos ip ON p.id = ip.producto_id AND ip.imagen_principal
                            LEFT JOIN (
                                SELECT ip.producto_id, SUM(porcentaje) as total_impuestos 
                                FROM impuestos_productos ip
                                INNER JOIN impuestos i ON ip.impuesto_id = i.id 
                                GROUP BY ip.producto_id
                            ) imp ON p.id = imp.producto_id`
        let qry = `
                SELECT 
                    p.id,
                    p.nombre,
                    p.precio_venta_normal,
                    imp.total_impuestos,
                    p.stock,
                    u.nombre as unidad,
                    m.nombre as marca,
                    c.nombre as categoria,
                    sc.nombre as subcategoria,
                    ip.source_image,
                    p.created_at,
                    p.updated_at 
                FROM 
                    ${fromClause}
                WHERE
                    p.deleted_at IS NULL  
                    LIMIT ${desde}, ${hasta}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al obtener el listado de productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows FROM ${fromClause} WHERE p.deleted_at IS NULL`)
                console.log(totRows)
                return callback(null, {data: res, rousPerPage: constantes.regPerPage, rows: totRows[0][0].totRows, page: pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}



ProductosModel.filter = (texto, pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
        let filtro = `
        (
            p.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
            p.precio_venta_normal LIKE ${cnn.escape('%'+texto+'%')} OR 
            imp.total_impuestos LIKE ${cnn.escape('%'+texto+'%')} OR 
            p.stock LIKE ${cnn.escape('%'+texto+'%')} OR 
            u.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
            m.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
            c.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
            sc.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
            ip.source_image LIKE ${cnn.escape('%'+texto+'%')} OR 
            CONVERT(p.created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR 
            CONVERT(p.updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} 
        )`
        let fromClause = `  productos p 
                            INNER JOIN unidades u ON p.unidad_id = u.id 
                            INNER JOIN marcas m ON p.marca_id = m.id 
                            INNER JOIN categorias c ON p.categoria_id = c.id
                            INNER JOIN sub_categorias sc ON p.sub_categoria_id = sc.id 
                            LEFT JOIN imagenes_productos ip ON p.id = ip.producto_id AND ip.imagen_principal
                            LEFT JOIN (
                                SELECT ip.producto_id, SUM(porcentaje) as total_impuestos 
                                FROM impuestos_productos ip
                                INNER JOIN impuestos i ON ip.impuesto_id = i.id 
                                GROUP BY ip.producto_id
                            ) imp ON p.id = imp.producto_id`
        let qry = `
                SELECT 
                    p.id,
                    p.nombre,
                    p.precio_venta_normal,
                    imp.total_impuestos,
                    p.stock,
                    u.nombre as unidad,
                    m.nombre as marca,
                    c.nombre as categoria,
                    sc.nombre as subcategoria,
                    ip.source_image,
                    p.created_at,
                    p.updated_at 
                FROM 
                    ${fromClause} 
                WHERE
                    p.deleted_at IS NULL AND 
                    ${filtro} 
                    LIMIT ${desde}, ${hasta}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al filtrar el listado de productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows FROM ${fromClause} WHERE p.deleted_at IS NULL AND ${filtro}`)
                return callback(null, {data: res, rousPerPage: constantes.regPerPage, rows: totRows[0][0].totRows, page: pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

ProductosModel.getAll = (callback) => {
    if(cnn){
        let qry = `
                SELECT 
                    p.id,
                    p.nombre,
                    p.precio_venta_normal,
                    imp.total_impuestos,
                    p.stock,
                    u.nombre as unidad,
                    m.nombre as marca,
                    c.nombre as categoria,
                    sc.nombre as subcategoria,
                    ip.source_image,
                    p.created_at,
                    p.updated_at 
                FROM 
                    productos p 
                    INNER JOIN unidades u ON p.unidad_id = u.id 
                    INNER JOIN marcas m ON p.marca_id = m.id 
                    INNER JOIN categorias c ON p.categoria_id = c.id
                    INNER JOIN sub_categorias sc ON p.sub_categoria_id = sc.id 
                    LEFT JOIN imagenes_productos ip ON p.id = ip.producto_id AND ip.imagen_principal
                    LEFT JOIN (
                        SELECT ip.producto_id, SUM(porcentaje) as total_impuestos 
                        FROM impuestos_productos ip
                        INNER JOIN impuestos i ON ip.impuesto_id = i.id 
                        GROUP BY ip.producto_id
                    ) imp ON p.id = imp.producto_id
                WHERE
                    p.deleted_at IS NULL`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al obtener el listado de todos los productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res)
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

ProductosModel.find = (id, callback) => {
    if(cnn){
        let qry = `
                SELECT 
                    p.id,
                    p.nombre,
                    p.precio_venta_normal,
                    imp.total_impuestos,
                    p.stock,
                    u.nombre as unidad,
                    m.nombre as marca,
                    c.nombre as categoria,
                    sc.nombre as subcategoria,
                    ip.source_image,
                    p.created_at,
                    p.updated_at 
                FROM 
                    productos p 
                    INNER JOIN unidades u ON p.unidad_id = u.id 
                    INNER JOIN marcas m ON p.marca_id = m.id 
                    INNER JOIN categorias c ON p.categoria_id = c.id
                    INNER JOIN sub_categorias sc ON p.sub_categoria_id = sc.id 
                    LEFT JOIN imagenes_productos ip ON p.id = ip.producto_id AND ip.imagen_principal
                    LEFT JOIN (
                        SELECT ip.producto_id, SUM(porcentaje) as total_impuestos 
                        FROM impuestos_productos ip
                        INNER JOIN impuestos i ON ip.impuesto_id = i.id 
                        GROUP BY ip.producto_id
                    ) imp ON p.id = imp.producto_id
                WHERE
                    p.deleted_at IS NULL AND 
                    p.id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al buscar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res[0])
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


ProductosModel.insert = async (data, callback) => {
    if(cnn){
        let { impuestos_id, imagenes } = data
        console.log(impuestos_id, imagenes)

        let qryProductos = `
                INSERT INTO productos (
                    nombre,
                    descripcion,
                    precio_venta_normal,
                    stock,
                    unidad_id,
                    marca_id,
                    categoria_id,
                    sub_categoria_id,
                    created_at,
                    updated_at 
                ) VALUES (
                    ${cnn.escape(data.nombre)},
                    ${cnn.escape(data.descripcion)},
                    ${cnn.escape(data.precio_venta_normal)},
                    ${cnn.escape(data.stock)},
                    ${cnn.escape(data.unidad_id)},
                    ${cnn.escape(data.marca_id)},
                    ${cnn.escape(data.categoria_id)},
                    ${cnn.escape(data.sub_categoria_id)},
                    CURDATE(),
                    CURDATE()
                )`
        
        
        cnn.query(qryProductos, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al ingresar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    if(impuestos_id.length > 0){
                        if(!await ingresarImpuestos(res.insertId, impuestos_id)){
                            throw 'Error al registrar los impuestos del productos.'
                        }
                    }
                    if(imagenes.length > 0){
                        if(!await ingresarFotos(res.insertId, imagenes)){
                            throw 'Error al registrar las fotos del productos.'
                        }
                    }
                    return callback(null, {mensaje: 'El producto ha sido ingresado,', tipoMensaje:'success', id: res.insertId})
                }else{
                    return callback({mensaje: 'No fue posible ingresar el producto.', tipoMensaje: 'danger', id: -1})
                }
            }
        })
        

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


const ingresarImpuestos = (idProducto, arrImpuestos) => {
    let qryImpuestosDelete = `DELETE FROM impuestos_productos WHERE producto_id = ${idProducto} AND impuesto_id NOT IN (${arrImpuestos})`
    let qryImpuestosInsert = `INSERT INTO impuestos_productos 
                                (producto_id, impuesto_id, created_at, updated_at) 
                            SELECT ${idProducto}, id, CURDATE(), CURDATE() 
                            FROM 
                                impuestos 
                            WHERE 
                                deleted_at IS NULL AND 
                                id IN (${arrImpuestos}) AND 
                                id NOT IN (
                                    SELECT impuesto_id FROM impuestos_productos 
                                    WHERE 
                                        producto_id = ${idProducto} AND 
                                        impuesto_id IN (${arrImpuestos})
                                )`
                                
    return new Promise(async function(resolve, reject){
        try{
            await cnn.promise().query(qryImpuestosDelete)
            await cnn.promise().query(qryImpuestosInsert)
            return resolve(true)
        }catch(err){
            console.log(err)
            return reject(false)
        }
    })
}


const ingresarFotos = (idProducto, arrFotos) => {
    let fecha = new Date()
    let strFecha = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    let arrNombresFotos = arrFotos.map(f => `'${f.source_image}'`)

    let qryFotosDelete = `DELETE FROM imagenes_productos WHERE producto_id = ${idProducto} AND source_image NOT IN (${arrNombresFotos})`
    let qryFotosInsert = `INSERT INTO imagenes_productos 
                            (producto_id, source_image, imagen_principal, created_at, updated_at) 
                            VALUES ? `
                            
    return new Promise(function(resolve, reject){
        try{
            cnn.query(`SELECT DISTINCT source_image FROM imagenes_productos WHERE deleted_at IS NULL AND producto_id = ${idProducto} AND source_image IN (${arrNombresFotos})`, async (err, res) => {
                if(err){
                    return reject(false)
                }else{
                    //Verificando si las imágenes ya se encuentran en la base de datos o no
                    let arrNuevasImagenes = []
                    //let comparar = true

                    arrFotos.forEach(e => {
                        //comparar = true
                        let existe = res.map(i => i.source_image).indexOf(e.source_image)

                        //Sólo si la imágen no se encuentra en la base de datos asociada al producto, se crea el array con los 
                        //datos de la imágen a ingresar y se agrega a la matriz de imágenes a registrar
                        if(existe === -1){  
                            arrNuevasImagenes.push([idProducto, `${e.source_image}`, e.imagen_principal, `${strFecha}`, `${strFecha}`])
                        }
                    })

                    await cnn.promise().query(qryFotosDelete)
                    if(arrNuevasImagenes.length > 0){
                        await cnn.promise().query(qryFotosInsert, [arrNuevasImagenes])
                    }
                    return resolve(true)
                }
            })
            
        }catch(err){
            console.log('ingresarFotos',err)
            return reject(false)
        }
    })
}



ProductosModel.update = (id, data, callback) => {
    if(cnn){
        let { impuestos_id, imagenes } = data
        console.log(impuestos_id, imagenes)
        
        let qryProductos = `
                UPDATE productos SET 
                    nombre = ${cnn.escape(data.nombre)},
                    descripcion = ${cnn.escape(data.descripcion)},
                    precio_venta_normal = ${cnn.escape(data.precio_venta_normal)},
                    stock = ${cnn.escape(data.stock)},
                    unidad_id = ${cnn.escape(data.unidad_id)},
                    marca_id = ${cnn.escape(data.marca_id)},
                    categoria_id = ${cnn.escape(data.categoria_id)},
                    sub_categoria_id = ${cnn.escape(data.sub_categoria_id)},
                    updated_at = CURDATE(),
                    deleted_at = null
                WHERE 
                    id = ${cnn.escape(id)}`
        
        cnn.query(qryProductos, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al ingresar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    if(impuestos_id.length > 0){
                        if(!await ingresarImpuestos(id, impuestos_id)){
                            throw 'Error al actualizar los impuestos del productos.'
                        }
                    }
                    if(imagenes.length > 0){
                        if(!await ingresarFotos(id, imagenes)){
                            throw 'Error al actualizar las fotos del productos.'
                        }
                    }
                    return callback(null, {mensaje: 'El producto ha sido actualizado.', tipoMensaje:'success', id: res.insertId})
                }else{
                    return callback({mensaje: 'No fue posible actualizar el producto.', tipoMensaje: 'danger', id: -1})
                }
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

ProductosModel.softDelete = (id, callback) => {
    if(cnn){
        
        let qryProductos = `UPDATE productos SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`
        
        
        cnn.query(qryProductos, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al eliminar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    await cnn.promise().query(`UPDATE impuestos_productos SET deleted_at = CURDATE() WHERE producto_id = ${cnn.escape(id)}`)
                    await cnn.promise().query(`UPDATE imagenes_productos SET deleted_at = CURDATE() WHERE producto_id = ${cnn.escape(id)}`)

                    return callback(null, {mensaje: 'El producto ha sido eliminado.', tipoMensaje:'success', id})
                }else{
                    return callback({mensaje: 'No fue posible eliminar el producto.', tipoMensaje: 'danger', id: -1})
                }
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

ProductosModel.delete = (id, callback) => {
    if(cnn){
        //Importante.: Las tablas imagenes_productos e impuestos_productos productos tienen configurada su propiedad ONDELETE 
        //para las FK, como en CASCADA (al borrar un producto se eliminan también sus imágenes y sus impuestos asociados)
        let qryProductos = `DELETE FROM productos WHERE id = ${cnn.escape(id)}` 
        
        cnn.query(qryProductos, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al borrar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    //await cnn.promise().query(`DELETE FROM impuestos_productos WHERE producto_id = ${cnn.escape(id)}`)
                    //await cnn.promise().query(`DELETE FROM imagenes_productos WHERE producto_id = ${cnn.escape(id)}`)

                    return callback(null, {mensaje: 'El producto ha sido borrar.', tipoMensaje:'success', id})
                }else{
                    return callback({mensaje: 'No fue posible borrar el producto.', tipoMensaje: 'danger', id: -1})
                }
            }
        })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

module.exports = ProductosModel