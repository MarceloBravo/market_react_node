const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let ProductosModel = {}

ProductosModel.getPage = (pag, callback) => {
    getProductos(pag, constantes.regPerPage, null, null, callback)
}


ProductosModel.getItemsPerPage = (pag, items, callback) => {
    return getProductos(pag, items, null, null, callback)
}


ProductosModel.getItemsPerPageOrderBy = (pag, items, orderByField, orderByDirection, callback) => {
    return getProductos(pag, items, orderByField, orderByDirection, callback)
}


const getProductos = (pag, items, orderByField, orderByDirection, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
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
                    ${orderByField && orderByDirection ? ' ORDER BY ' + orderByField + ' ' + orderByDirection : ''} 
                     LIMIT ${desde}, ${items}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows FROM ${fromClause} WHERE p.deleted_at IS NULL`)
                resp = callback(null, {data: result, rowsPerPage: items, totRows: totRows[0][0].totRows, page: pag})
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


ProductosModel.getMinMaxPrice = (callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        let qry = `SELECT MIN(precio_venta_normal) min, MAX(precio_venta_normal) max FROM productos WHERE deleted_at IS NULL`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener los precios mínimos y máximos de los productos: '+err.message, tipoMensaje: 'danger'})
            }else{
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



ProductosModel.filter = (texto, pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
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
                    LIMIT ${desde}, ${constantes.regPerPage}`
        
        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar el listado de productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows FROM ${fromClause} WHERE p.deleted_at IS NULL AND ${filtro}`)
                resp = callback(null, {data: result, rowsPerPage: constantes.regPerPage, totRows: totRows[0][0].totRows, page: pag})
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


ProductosModel.filterParams = (data, pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        let marcas = data.marcas
        let categorias = data.departamentos
        let precioMin = data.min
        let precioMax = data.max
        let orderBy = data.ordenar_por
        let order = data.direccion
        let texto = data.texto ? data.texto : null
        let itemsPorPag = data.itemsPorPagina ? data.itemsPorPagina : constantes.regPerPage
        let categoriaId  = data.categoriaId ? data.categoriaId : ''
        let subCategoriaId  = data.subCategoriaId ? data.subCategoriaId : ''

        let desde = itemsPorPag * pag
        let qryFiltro = texto ? `p.id LIKE ${cnn.escape('%'+texto+'%')} OR 
                        p.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                        CONVERT(p.precio_venta_normal, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                        u.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                        m.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                        c.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                        sc.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                        CONVERT(p.created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                        CONVERT(p.updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}`  
                        : ''

        let filtro = ` 
            ${qryFiltro ? ' AND (' + qryFiltro + ')' : ''}
            ${marcas ? ' AND m.nombre IN (' + marcas + ')' : ''} 
            ${categorias ? ' AND c.nombre IN (' + categorias + ')' : ''}
            ${(precioMin && precioMax) ? ' AND p.precio_venta_normal BETWEEN ' + precioMin + ' AND ' + precioMax + ' ': ''}
            ${subCategoriaId ? 'AND sc.id = '+cnn.escape(subCategoriaId) : ''}
            ${categoriaId ? 'AND c.id = '+cnn.escape(categoriaId) : ''}
        `
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
                    ${filtro} 
                    ${orderBy && order ? ' ORDER BY ' + orderBy + ' ' + order : '' }
                LIMIT ${desde}, ${itemsPorPag}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar el listado de productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows FROM ${fromClause} WHERE p.deleted_at IS NULL ${filtro}`)
                resp = callback(null, {data: result, rowsPerPage: constantes.regPerPage, totRows: totRows[0][0].totRows, page: pag})
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


ProductosModel.getAll = (callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

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

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de todos los productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, result)
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

ProductosModel.find = (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        let qry = `
                SELECT 
                    p.id,
                    p.nombre,
                    p.descripcion,
                    p.precio_venta_normal,
                    CASE 
                        WHEN 
                            NOT pp.precio IS NULL 
                        THEN 
                            pp.precio 
                        ELSE 
                            p.precio_venta_normal 
                    END AS precio_actual,
                    pp.fecha_desde as precio_fecha_desde, 
                    pp.fecha_hasta as precio_fecha_hasta, 
                    imp.total_impuestos,
                    p.stock,
                    p.unidad_id,
                    u.nombre as nombre_unidad,
                    p.marca_id,
                    m.nombre as nombre_marca,
                    p.categoria_id,
                    c.nombre as nombre_categoria,
                    p.sub_categoria_id,
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
                    LEFT JOIN (
                        SELECT precio, producto_id, fecha_desde, fecha_hasta 
                        FROM precios_productos 
                        WHERE deleted_at IS NULL AND 
                            producto_id = ${cnn.escape(id)} AND 
                            NOT fecha_desde IS NULL AND 
                            fecha_desde >= CURRENT_TIMESTAMP() AND 
                            (fecha_hasta IS NULL OR fecha_hasta >= CURRENT_TIMESTAMP()) 
                        LIMIT 1
                    ) pp ON p.id = pp.producto_id
                WHERE
                    p.deleted_at IS NULL AND 
                    p.id = ${cnn.escape(id)}`
            
            let qryImpuestos = `
                SELECT 
                    i.id,
                    i.nombre, 
                    i.sigla, 
                    i.porcentaje 
                FROM 
                    impuestos_productos ip
                    INNER JOIN impuestos i ON ip.impuesto_id = i.id
                WHERE 
                    ip.deleted_at IS NULL AND 
                    ip.producto_id = ${cnn.escape(id)}`

            let qryImagenes = `
                            SELECT 
                                id,
                                source_image,
                                imagen_principal
                            FROM 
                                imagenes_productos
                            WHERE 
                                deleted_at IS NULL AND 
                                producto_id = ${cnn.escape(id)}`

        let qryTallas = `
                SELECT 
                    tp.id, 
                    tp.talla_id, 
                    t.talla 
                FROM 
                    tallas_productos tp 
                    INNER JOIN tallas t ON tp.talla_id = t.id 
                WHERE 
                    tp.deleted_at IS NULL AND 
                    tp.producto_id = ${cnn.escape(id)} 
                    `
        
        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result[0]){
                    let impuestos = await cnn.promise().query(qryImpuestos)
                    result[0].impuestos = impuestos[0]
                    result[0].impuestos_id = impuestos[0].map(i => i.id)

                    let imagenes = await cnn.promise().query(qryImagenes)
                    result[0].imagenes = imagenes[0]

                    let tallas = await cnn.promise().query(qryTallas)
                    result[0].tallas_id = tallas[0].map(e => e.talla_id )
                    result[0].tallas = tallas[0]
                }
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


ProductosModel.insert = async (data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        let { impuestos_id, imagenes, tallas_id } = data

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
        
        let res = null 
        try{
            await cnn.promise().beginTransaction()

            let result = await cnn.promise().query(qryProductos)

            if(result[0].affectedRows === 0){
                throw {message: 'No fue posible ingresar el producto.'}
            }
            
            if(!await ingresarImpuestos(cnn, result[0].insertId, impuestos_id)){
                throw {message: 'Error al intentar registrar los impuestos'}
            }

            if(!await ingresarFotos(cnn, result[0].insertId, imagenes)){
                throw {message: 'Error al intentar registrar las fotos'}
            }

            if(!await ingresarTallas(cnn, result[0].insertId, tallas_id)){
                throw {message: 'Error al intentar registrar las tallas'}
            }

            await cnn.promise().commit()

            res = callback(null, {mensaje: 'El producto ha sido ingresado.', tipoMensaje: 'success', id: result.insertId})
            /*
            cnn.query(qryProductos, async (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al ingresar el producto: '+err.message, tipoMensaje: 'danger'})
                }else{
                    if(result.affectedRows > 0){

                        //Grabando los impuestos
                        if(impuestos_id?.length > 0){
                            if(!await ingresarImpuestos(cnn, result.insertId, impuestos_id)){
                                throw 'Error al registrar los impuestos del producto.'
                            }
                        }

                        //Grabando las tallas
                        if(tallas_id?.length > 0){
                            if(!await ingresarTallas(cnn, result.insertId, tallas_id)){
                                throw 'Error al registrar las tallas del producto.'
                            }
                        }

                        //Grabando las imágenes
                        if(imagenes?.length > 0){
                            if(!await ingresarFotos(cnn, result.insertId, imagenes)){
                                throw 'Error al registrar las fotos del productos.'
                            }
                        }
                        resp = callback(null, {mensaje: 'El producto ha sido ingresado,', tipoMensaje:'success', id: result.insertId})
                    }else{
                        resp = callback({mensaje: 'No fue posible ingresar el producto.', tipoMensaje: 'danger', id: -1})
                    }
                }
                cnn.release()
                return resp
            })
            */
        }catch(error){
            cnn.promise().rollback()

            res = callback({mensaje: 'Ocurrio un error al intentar ingresar el producto: ' + error.message, tipoMensaje: 'danger', id: -1})
        }
        cnn.release()
        return res
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


const ingresarImpuestos = (cnn, idProducto, arrImpuestos) => {
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

    let qryImpuestosUndelete = `UPDATE impuestos_productos SET 
                                    deleted_at = null 
                                WHERE 
                                    producto_id = ${idProducto} AND 
                                    impuesto_id IN (${arrImpuestos}) AND 
                                    NOT deleted_at IS NULL` 

                                
                                
    return new Promise(async function(resolve, reject){
        try{
            await cnn.promise().query(qryImpuestosDelete)
            await cnn.promise().query(qryImpuestosInsert)
            await cnn.promise().query(qryImpuestosUndelete)
            return resolve(true)
        }catch(err){
            console.log(err)
            return reject(false)
        }
    })
}


const ingresarFotos = async (cnn, idProducto, arrFotos) => {
    let fotos = []
    if(Array.isArray(arrFotos)){
        fotos = arrFotos.map(f => JSON.parse(f))
    }else{
        fotos[0] = JSON.parse(arrFotos)
    }
    
    let fecha = new Date()
    let strFecha = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    let arrNombresFotos = fotos.map(f => `'${f.source_image}'`)

    let qryFotosDelete = `DELETE FROM imagenes_productos WHERE producto_id = ${idProducto} AND source_image NOT IN (${arrNombresFotos})`
    let qryFotosInsert = `INSERT INTO imagenes_productos 
                            (producto_id, source_image, imagen_principal, created_at, updated_at) 
                            VALUES `
    let qryFotosUpdate = ``
                            
    return new Promise(function(resolve, reject){
        try{
            cnn.query(`SELECT DISTINCT source_image FROM imagenes_productos WHERE deleted_at IS NULL AND producto_id = ${idProducto} AND source_image IN (${arrNombresFotos})`, async (err, res) => {
                if(err){
                    return reject(false)
                }else{
                    //Verificando si las imágenes ya se encuentran en la base de datos o no
                    let arrNuevasImagenes = ''
                    //let comparar = true

                    fotos.forEach(e => {
                        //comparar = true
                        let existe = res.map(i => i.source_image).indexOf(e.source_image)

                        //Sólo si la imágen no se encuentra en la base de datos asociada al producto, se crea el array con los 
                        //datos de la imágen a ingresar y se agrega a la matriz de imágenes a registrar
                        if(existe === -1){
                            arrNuevasImagenes += (arrNuevasImagenes !== '' ? ',' :'')+`(${idProducto}, '${e.source_image}', ${e.imagen_principal}, '${strFecha}', '${strFecha}')`
                        }else{
                            qryFotosUpdate = `UPDATE imagenes_productos SET 
                                                imagen_principal = ${e.imagen_principal},
                                                updated_at = CURDATE()
                                            WHERE 
                                                producto_id = ${idProducto} AND 
                                                source_image = '${e.source_image}' `
                        }
                    })

                    await cnn.promise().query(qryFotosDelete)
                    if(arrNuevasImagenes.length > 0){
                        await cnn.promise().query(qryFotosInsert + arrNuevasImagenes)
                    }
                    if(qryFotosUpdate !== ``){
                        await cnn.promise().query(qryFotosUpdate)
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


const ingresarTallas = async (cnn, idProducto, arrTallas) => {
    let res = true
    try{
        await cnn.promise().query(`DELETE FROM tallas_productos WHERE producto_id = ${cnn.escape(idProducto)} AND talla_id NOT IN (${arrTallas})`)

        let qry = `INSERT INTO tallas_productos (
                    producto_id, 
                    talla_id, 
                    created_at,
                    updated_at 
                ) 
                SELECT 
                    ${cnn.escape(idProducto)}, 
                    id,
                    CURDATE(),
                    CURDATE() 
                FROM tallas 
                WHERE id IN (${cnn.escape(arrTallas.split(','))})
                `

                let result = await cnn.promise().query(qry)
                if(result.affectedRows === 0){
                    return false
                }
        
    }catch(error){
        console.log(error)
        res = false
    }
    return res
}


ProductosModel.update = (id, data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 
        

        let { impuestos_id, imagenes, tallas_id } = data
        
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
        
        let res = null
        try{

            cnn.promise().beginTransaction()

            let result = await cnn.promise().query(qryProductos)

            if(result.affectedRows === 0){
                throw {message: 'No fue posible actualizar el producto.'}
            }

            if(!await ingresarImpuestos(cnn, id, impuestos_id)){
                throw {message: 'Error al actualizar los impuestos'}
            }

            if(!await ingresarFotos(cnn, id, imagenes)){
                throw {message: 'Error al actualizar las imagenes'}
            }

            if(!await ingresarTallas(cnn, id, tallas_id)){
                throw {message: 'Error al actualizar las tallas'}
            }

            await cnn.promise().commit()

            res = callback(null, {mensaje: 'El producto ha sido actualizado', tipoMensaje: 'success', id})
        
        /*
        cnn.query(qryProductos, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al ingresar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    if(impuestos_id?.length > 0){
                        if(!await ingresarImpuestos(cnn, id, impuestos_id)){
                            throw 'Error al actualizar los impuestos del productos.'
                        }
                    }
                    if(imagenes?.length > 0){
                        if(!await ingresarFotos(cnn, id, imagenes)){
                            throw 'Error al actualizar las fotos del productos.'
                        }
                    }
                    resp = callback(null, {mensaje: 'El producto ha sido actualizado.', tipoMensaje:'success', id: result.insertId})
                }else{
                    resp = callback({mensaje: 'No fue posible actualizar el producto.', tipoMensaje: 'danger', id: -1})
                }
            }
            cnn.release()
            return resp
        })
        */
        }catch(error){
            console.log('ERROR: ',error)
            cnn.promise().rollback()

            res = callback({mensaje: 'Ocurrio un error al intentar actualizar el producto: ' + error.message, tipoMensaje: 'danger', id})
        }
        cnn.release()

        return res
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


ProductosModel.softDelete = (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        let qryProductos = `UPDATE productos SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`
        cnn.query(qryProductos, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    await cnn.promise().query(`UPDATE impuestos_productos SET deleted_at = CURDATE() WHERE producto_id = ${cnn.escape(id)}`)
                    await cnn.promise().query(`UPDATE imagenes_productos SET deleted_at = CURDATE() WHERE producto_id = ${cnn.escape(id)}`)

                    resp = callback(null, {mensaje: 'El producto ha sido eliminado.', tipoMensaje:'success', id})
                }else{
                    resp = callback({mensaje: 'No fue posible eliminar el producto.', tipoMensaje: 'danger', id: -1})
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

ProductosModel.delete = (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
        } 

        //Importante.: Las tablas imagenes_productos, tallas_productos e impuestos_productos productos tienen configurada su propiedad ONDELETE 
        //para las FK, como en CASCADA (al borrar un producto se eliminan también sus imágenes y sus impuestos asociados)
        let qryProductos = `DELETE FROM productos WHERE id = ${cnn.escape(id)}` 
        
        cnn.query(qryProductos, async (err, result) => {
            let resp = null
            if(err){
                return callback({mensaje: 'Ocurrió un error al borrar el producto: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    //await cnn.promise().query(`DELETE FROM impuestos_productos WHERE producto_id = ${cnn.escape(id)}`)
                    //await cnn.promise().query(`DELETE FROM imagenes_productos WHERE producto_id = ${cnn.escape(id)}`)

                    resp = callback(null, {mensaje: 'El producto ha sido borrar.', tipoMensaje:'success', id})
                }else{
                    resp = callback({mensaje: 'No fue posible borrar el producto.', tipoMensaje: 'danger', id: -1})
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

module.exports = ProductosModel