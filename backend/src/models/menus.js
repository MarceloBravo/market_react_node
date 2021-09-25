const connection = require('../../db/connection.js');
const constantes = require('../shared/constants');
const todayToString = require('../shared/functions');

let cnn = connection.conect();

let menusModel = {};


// ******************* MENÚ DEL ESCRITORIO DE LA APLICACIÓN *******************
//Retorna el menú principal de la aplicación
menusModel.mainMenu = (idRol, callback) => {
    if(cnn){
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
            
            cnn.query(qry, async (err, res) => {
                if(err){
                    return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1, errores: err})
                }else{
                    let menu = res
                    for(var x=0; x < menu.length; x++){
                        sub = await subMenus(menu[x].id, idRol)
                        menu[x]['sub_menu'] = sub
                    }
                    return callback(err, menu);
                }
            })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }
}


function subMenus(idMenuPadre, idRol){
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
    if(cnn){
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

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                let totRows = await totoReg(`SELECT COUNT(*) as totRows FROM menus WHERE deleted_at IS NULL`);
                return callback(err, {data: res, page: pag, rowsPerPage: constantes.regPerPage, totRows});
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }

}


const totoReg = (qry) => {
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
    if(cnn){
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
        
        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                let totRows = await totoReg(`SELECT COUNT(m.id) as totRows FROM menus m WHERE deleted_at IS NULL ${filtro}`)
                return callback(err, {data: res, page: pag, rowsPerPage: constantes.regPerPage, totRows});
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }

}


menusModel.get = (id, callback) => {
    if(cnn){
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

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, res[0]);
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }

}


menusModel.getAll = (callback) => {
    if(cnn){
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

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, res);
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }
}


menusModel.insert = (data, callback) => {
    if(cnn){

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
            return callback({mensaje, tipoMensaje, id});
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

menusModel.update = (id, data, callback) => {
    if(cnn){

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
            if(err){
                return callback({mensaje: 'Ocurrió un error al intentar actualizar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, {mensaje: 'El registro ha sidio actualizado exitosamente.', tipoMensaje: 'success', id: id})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}


menusModel.softDelete = (id, callback) => {
    if(cnn){
        let deletedAt = todayToString();
        let qry = `
            UPDATE menus SET 
                deleted_at = CURDATE()  
            WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, {mensaje: 'El registro ha sidio eliminado exitosamente.', tipoMensaje: 'success', id})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}


menusModel.delete = (id, callback) => {
    if(cnn){
        let qry = `
            DELETE FROM menus WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, {mensaje: 'El registro ha sidio eliminado exitosamente.', tipoMensaje: 'success', id})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}
// ******************* FIN MANTENEDOR DE MENÚ *******************

module.exports = menusModel;


