const connection = require('../../db/connection.js')
const constantes = require('../shared/constants');
const todayToString = require('../shared/functions');

let pool = connection.pool()

let menusModel = {};


// ******************* MENÚ DEL ESCRITORIO DE LA APLICACIÓN *******************
//Retorna el menú principal de la aplicación
menusModel.mainMenu = (idRol, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 
        
        let qry = `
            SELECT
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion
            FROM
                menus m 
            WHERE 
                menu_padre_id = 0 
                AND deleted_at IS NULL 
            ORDER BY 
                posicion
            `;
            
            cnn.query(qry, async (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: err.message, tipoMensaje: 'danger', id: -1, errores: err})
                }else{
                    let menu = result
                    for(var x=0; x < menu.length; x++){
                        sub = await subMenus(cnn, menu[x].id, idRol)
                        menu[x]['sub_menu'] = sub
                    }
                    resp = callback(err, menu);
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


function subMenus(cnn, idMenuPadre, idRol){
    let qry = `
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion, 
                pr.acceder 
            FROM 
                menus m
                INNER JOIN pantallas p ON m.id = p.menus_id 
                INNER JOIN permisos pr ON p.id = pr.pantallas_id 
            WHERE 
                m.deleted_at IS NULL AND 
                menu_padre_id = ${cnn.escape(idMenuPadre)} AND 
                roles_id = ${cnn.escape(idRol)}
            ORDER BY posicion
            `;
            
        return new Promise((resolve, reject) => {
            cnn.query(qry, (err, res) => {
                if(err){
                    return reject(err)
                }else{
                    return resolve(res)
                }
            })
        });
        
}
// ******************* FIN MENÚ DEL ESCRITORIO DE LA APLICACIÓN *******************


// ******************* MANTENEDOR DE MENÚ *******************
menusModel.getPage = (pag, callback) => {    
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = pag  * constantes.regPerPage;
        let qry = `
            SELECT 
                m.id,
                m.nombre,
                mp.nombre as menu_padre,
                m.url,
                m.menu_padre_id,
                m.posicion,
                m.created_at,
                m.updated_at 
            FROM 
                menus m
                LEFT JOIN menus mp ON m.menu_padre_id = mp.id 
            WHERE 
                m.deleted_at IS NULL 
            ORDER BY m.nombre 
            LIMIT ${desde}, ${constantes.regPerPage}
            
        `;

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                let totRows = await totoReg(cnn, `SELECT COUNT(*) as totRows FROM menus WHERE deleted_at IS NULL`);
                resp = callback(err, {data: result, page: pag, rowsPerPage: constantes.regPerPage, totRows});
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


const totoReg = (cnn, qry) => {
    return new Promise((resolve, reject) => {
        cnn.query(qry,(err, res) => {
            if(err){
                return reject(0);                
            }else{
                return resolve(res[0].totRows);
            }
        })
    })
}

menusModel.filter = (texto, pag, callback) => {    
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let filtro = `AND (
                            m.id LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.url LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.menu_padre_id LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.posicion LIKE ${cnn.escape('%'+texto+'%')} 
                        )`;
        let desde = pag  * 10
        let qry = `
            SELECT 
                m.id,
                m.nombre,
                mp.nombre as menu_padre,
                m.url,
                m.menu_padre_id,
                m.posicion,
                m.created_at,
                m.updated_at 
            FROM 
                menus m
                LEFT JOIN menus mp ON m.menu_padre_id = mp.id 
            WHERE 
                m.deleted_at IS NULL
                ${filtro} 
            ORDER BY m.nombre
            LIMIT ${desde}, ${constantes.regPerPage}
        `;
        
        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                let totRows = await totoReg(cnn, `SELECT COUNT(m.id) as totRows FROM menus m WHERE deleted_at IS NULL ${filtro}`)
                resp = callback(err, {data: result, page: pag, rowsPerPage: constantes.regPerPage, totRows});
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


menusModel.get = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion,
                created_at,
                updated_at 
            FROM 
                menus m
            WHERE 
                deleted_at IS NULL AND 
                id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                resp = callback(err, result[0]);
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


menusModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion,
                created_at,
                updated_at 
            FROM 
                menus m
            WHERE deleted_at IS NULL
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                resp = callback(err, result);
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


menusModel.insert = (data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            INSERT INTO menus (
                nombre,
                url,                
                menu_padre_id,
                posicion,
                created_at,
                updated_at
            ) VALUES (
                ${cnn.escape(data.nombre)},
                ${cnn.escape(data.url)},
                ${cnn.escape(data.menu_padre_id ? data.menu_padre_id : 0)},
                ${cnn.escape(data.posicion)},
                CURDATE(),
                CURDATE()
            )
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                mensaje = 'Ocurrió un error al intentar agregar el registro: '+err.message;
                tipoMensaje = 'danger';
                id = -1;
            }else{
                mensaje = 'El registro ha sido ingresado exitosamente.';
                tipoMensaje = 'success';
                id = result.insertId;
            }
            cnn.release()
            return callback({mensaje, tipoMensaje, id});
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

menusModel.update = (id, data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            UPDATE menus SET 
                nombre = ${cnn.escape(data.nombre)},
                url = ${cnn.escape(data.url)},
                menu_padre_id = ${cnn.escape(data.menu_padre_id)},
                posicion = ${cnn.escape(data.posicion)},
                updated_at = CURDATE() 
            WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                resp = callback(err, {mensaje: 'El registro ha sidio actualizado exitosamente.', tipoMensaje: 'success', id: id})
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: id})
        })
        */
    })
}


menusModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let deletedAt = todayToString();
        let qry = `
            UPDATE menus SET 
                deleted_at = CURDATE()  
            WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                resp = callback(err, {mensaje: 'El registro ha sidio eliminado exitosamente.', tipoMensaje: 'success', id})
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: id})
        })
        */
    })
}


menusModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            DELETE FROM menus WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                resp = callback(err, {mensaje: 'El registro ha sidio eliminado exitosamente.', tipoMensaje: 'success', id})
            }
            cnn.release()
            return resp
        });
        
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id: id})
        })
        */
    })
}
// ******************* FIN MANTENEDOR DE MENÚ *******************

module.exports = menusModel;


