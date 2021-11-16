const connection = require('../../db/connection');
const constantes = require('../shared/constants');

let pool = connection.pool()

let pantallaModel = {}

pantallaModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag;
        let qry = `
                SELECT
                    p.id,
                    p.nombre,
                    m.nombre as menu,
                    m.url,
                    p.created_at,
                    p.updated_at,
                    p.deleted_at,
                    p.menus_id,
                    p.permite_crear,
                    p.permite_modificar,
                    p.permite_eliminar
                FROM 
                    pantallas p
                    INNER JOIN menus m ON p.menus_id = m.id
                WHERE
                    p.deleted_at IS NULL
                LIMIT ${desde}, ${constantes.regPerPage}
                `;

            cnn.query(qry, async (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ha ocurrido un error al solicitar los datos: ' + err.message, tipoMensaje: 'danger', id:-1});
                }else{
                    let totReg = await totRows(cnn, `SELECT COUNT(*) AS totRows FROM pantallas WHERE deleted_at IS NULL`);
                    resp = callback(err, {data: result, totRows: totReg, rowsPerPage: constantes.regPerPage, page: pag});
                }
                cnn.release()
                return resp
            });

            /*
            cnn.on('error', function(err) {      
                return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
            })
            */
    })
}

const totRows = (cnn, qry) => {
    return new Promise((resolve, reject) => {
        cnn.query(qry, (err, res) => {
            if(err){
                return reject(0);
            }else{
                return resolve(res[0].totRows);
            }
        })
    })
    
}

pantallaModel.getAll = (callback ) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT 
                nombre,
                created_at,
                updated_at,
                deleted_at,
                menus_id,
                permite_crear,
                permite_modificar,
                permite_eliminar
            FROM 
                pantallas
            WHERE
                deleted_at IS NULL
            `;

            cnn.query(qry, (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al solicitar los registro: ' +err.message, tipoMensaje:'danger', id:-1});
                }else{
                    resp = callback(null, result);
                }
                cnn.release()
                return resp
            })

            /*
            cnn.on('error', function(err) {      
                return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
            })
            */
    })
}

pantallaModel.get = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT 
                nombre,
                created_at,
                updated_at,
                deleted_at,
                menus_id,
                permite_crear,
                permite_modificar,
                permite_eliminar
            FROM 
                pantallas
            WHERE
                deleted_at IS NULL
                AND id = ${cnn.escape(id)}
            `;

            cnn.query(qry, (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al buscar el registro: ' +err.message, tipoMensaje:'danger', id:-1});
                }else{
                    resp = callback(null, result[0]);
                }
                cnn.release()
                return resp
            })

            /*
            cnn.on('error', function(err) {      
                return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: id})
            })
            */
    })
} 

pantallaModel.getByUrl = (url, callback) => {
    pool.getConnection((err, cnn) => {
        if(err){
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT 
                p.id,
                p.nombre,
                p.created_at,
                p.updated_at,
                p.deleted_at,
                p.menus_id,
                mp.id as menu_padre_id,
                p.permite_crear,
                p.permite_modificar,
                p.permite_eliminar
            FROM 
                pantallas p
                INNER JOIN menus m ON p.menus_id = m.id 
                INNER JOIN menus mp ON m.menu_padre_id = mp.id
            WHERE
                p.deleted_at IS NULL
                AND m.deleted_at IS NULL 
                AND m.url = ${cnn.escape(url)}
            `;

            cnn.query(qry, (err, result) => {
                let resp = null 
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al buscar el registro: ' +err.message, tipoMensaje:'danger', id:-1});
                }else{
                    resp = callback(null, result[0]);
                }
                cnn.release()
                return resp
            })

            /*
            cnn.on('error', function(err) {      
                return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
            })
            */
    })
}

pantallaModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag;
        let qry = `
                    SELECT
                        p.id,
                        p.nombre,
                        m.nombre as menu,
                        p.created_at,
                        p.updated_at,
                        p.deleted_at,
                        p.menus_id,
                        p.permite_crear,
                        p.permite_modificar,
                        p.permite_eliminar
                    FROM 
                        pantallas p
                    INNER JOIN menus m ON p.menus_id = m.id 
                    WHERE
                        p.deleted_at IS NULL
                    AND (
				        p.nombre LIKE '%${cnn.escape(texto)}%' OR 
                        m.nombre LIKE '%${cnn.escape(texto)}%'
                    )
                LIMIT ${desde}, ${constantes.regPerPage}
                `;

            cnn.query(qry, async (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al solicitar los datos.', tipoMensaje: 'danger', id:-1});
                }else{
                    let totReg = await totRows(cnn, `SELECT COUNT(*) AS totRows FROM pantallas WHERE deleted_at IS NULL AND nombre LIKE '%${texto}%'`);
                    resp = callback(null, {data: result, totRows: totReg, rowsPerPage: constantes.regPerPage, page: pag});
                }
                cnn.release()
                return resp
            })

            /*
            cnn.on('error', function(err) {      
                return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
            })
            */
    })
}

pantallaModel.insert = (data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            INSERT INTO pantallas (
                nombre,
                created_at,
                updated_at,
                menus_id,
                permite_crear,
                permite_modificar,
                permite_eliminar
            ) VALUES (
                ${cnn.escape(data.nombre)},
                CURDATE(),
                CURDATE(),
                ${cnn.escape(data.menus_id)},
                ${cnn.escape(data.permite_crear)},
                ${cnn.escape(data.permite_modificar)},
                ${cnn.escape(data.permite_eliminar)}
            )
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al agregar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback({mensaje: 'El registro ha sido agregado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
        })
        */
    })

}

pantallaModel.update = (id, data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            UPDATE pantallas SET
                nombre = ${cnn.escape(data.nombre)},
                updated_at = CURDATE(),
                menus_id = ${cnn.escape(data.menus_id)},
                permite_crear = ${cnn.escape(data.permite_crear)},
                permite_modificar = ${cnn.escape(data.permite_modificar)},
                permite_eliminar = ${cnn.escape(data.permite_eliminar)}
            WHERE 
                id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al actualizar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback({mensaje: 'El registro ha sido actualizado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
        })
        */
    })
}

pantallaModel.sofDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            UPDATE pantallas SET
                deleted_at = CURDATE()  
            WHERE 
                id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback({mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
        })
        */
    })
}

pantallaModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            //console.log(err.message)
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            DELETE FROM 
                pantallas 
            WHERE 
                id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback({mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
            cnn.release()
            return resp
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: -1})
        })
        */
    })
}

module.exports = pantallaModel;
