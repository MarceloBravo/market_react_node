const connection = require('../../db/connection.js');
const constantes = require('../shared/constants');

let cnn = connection.conect();

let menusTiendaModel = {};


// ******************* MENÚ DE LA TIENDA *******************
//Retorna el menú principal de la tienda (FrontOffice del FrontEnd)
menusTiendaModel.mainMenu = (callback) => {
    if(cnn){
        let qry = `
            SELECT
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion
            FROM
                menus_tienda m 
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
                        sub = await subMenus(menu[x].id)
                        menu[x]['sub_menu'] = sub
                    }
                    return callback(err, menu);
                }
            })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }
}


function subMenus(idMenuPadre){
    let qry = `
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion  
            FROM 
                menus_tienda m 
            WHERE 
                m.deleted_at IS NULL AND 
                menu_padre_id = ${cnn.escape(idMenuPadre)} 
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
// ******************* FIN MENÚ DE LA TIENDA *******************


// ******************* MANTENEDOR DE MENÚ *******************
menusTiendaModel.getPage = (pag, callback) => {    
    if(cnn){
        let desde = pag  * constantes.regPerPage;
        let hasta = desde + constantes.regPerPage;
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
                menus_tienda m
                LEFT JOIN menus_tienda mp ON m.menu_padre_id = mp.id 
            WHERE 
                m.deleted_at IS NULL 
            ORDER BY m.nombre 
            LIMIT ${desde}, ${hasta}
            
        `;

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                let totRows = await totoReg(`SELECT COUNT(*) as totRows FROM menus_tienda WHERE deleted_at IS NULL`);
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
                console.log(err.message);
                return reject(0);                
            }else{
                return resolve(res[0].totRows);
            }
        })
    })
}

menusTiendaModel.filter = (texto, pag, callback) => {    
    if(cnn){
        let filtro = `AND (
                            m.id LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.url LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.menu_padre_id LIKE ${cnn.escape('%'+texto+'%')} OR 
                            m.posicion LIKE ${cnn.escape('%'+texto+'%')} 
                        )`;
        let desde = pag  * 10
        let hasta = desde + 10;
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
                menus_tienda m
                LEFT JOIN menus_tienda mp ON m.menu_padre_id = mp.id 
            WHERE 
                m.deleted_at IS NULL
                ${filtro} 
            ORDER BY m.nombre
            LIMIT ${desde}, ${hasta}
        `;
        
        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                let totRows = await totoReg(`SELECT COUNT(m.id) as totRows FROM menus_tienda m WHERE deleted_at IS NULL ${filtro}`)
                return callback(err, {data: res, page: pag, rowsPerPage: constantes.regPerPage, totRows});
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }

}


menusTiendaModel.get = (id, callback) => {
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
                menus_tienda m
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


menusTiendaModel.getAll = (callback) => {
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
                menus_tienda m
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


menusTiendaModel.insert = (data, callback) => {
    if(cnn){

        let qry = `
            INSERT INTO menus_tienda (
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
                console.log(err);
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

menusTiendaModel.update = (id, data, callback) => {
    if(cnn){

        let qry = `
            UPDATE menus_tienda SET 
                nombre = ${cnn.escape(data.nombre)},
                url = ${cnn.escape(data.url)},
                menu_padre_id = ${cnn.escape(data.menu_padre_id)},
                posicion = ${cnn.escape(data.posicion)},
                updated_at = CURDATE() 
            WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                console.log(err);
                return callback({mensaje: 'Ocurrió un error al intentar actualizar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, {mensaje: 'El registro ha sidio actualizado exitosamente.', tipoMensaje: 'success', id: id})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}


menusTiendaModel.softDelete = (id, callback) => {
    if(cnn){
        let qry = `
            UPDATE menus_tienda SET 
                deleted_at = CURDATE()  
            WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                console.log(err);
                return callback({mensaje: 'Ocurrió un error al intentar eliminar el registro: ' + err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, {mensaje: 'El registro ha sidio eliminado exitosamente.', tipoMensaje: 'success', id})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}


menusTiendaModel.delete = (id, callback) => {
    if(cnn){
        let qry = `
            DELETE FROM menus_tienda WHERE id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                console.log(err);
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

module.exports = menusTiendaModel;


