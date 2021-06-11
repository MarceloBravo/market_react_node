const connection = require('../../db/connection');
const constantes = require('../shared/constants');

let cnn = connection.conect();

let pantallaModel = {}

pantallaModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag;
        let hasta = desde + constantes.regPerPage;
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
                LIMIT ${desde}, ${hasta}
                `;

            cnn.query(qry, async (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ha ocurrido un error al solicitar los datos: ' + err.message, tipoMensaje: 'danger', id:-1});
                }else{
                    let totReg = await totRows(`SELECT COUNT(*) AS totRows FROM pantallas WHERE deleted_at IS NULL`);
                    console.log('totReg',totReg)
                    return callback(err, {data: res, rows: totReg, rowsPerPage: constantes.regPerPage, page: pag});
                }
            });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

const totRows = (qry) => {
    return new Promise((resolve, reject) => {
        cnn.query(qry, (err, res) => {
            if(err){
                console.log(err);
                return reject(0);
            }else{
                return resolve(res[0].totRows);
            }
        })
    })
    
}

pantallaModel.getAll = (callback ) => {
    if(cnn){
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

            cnn.query(qry, (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ocurrió un error al solicitar los registro: ' +err.message, tipoMensaje:'danger', id:-1});
                }else{
                    return callback(null, res);
                }
            })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

pantallaModel.get = (id, callback) => {
    if(cnn){
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

            cnn.query(qry, (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ocurrió un error al buscar el registro: ' +err.message, tipoMensaje:'danger', id:-1});
                }else{
                    return callback(null, res[0]);
                }
            })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
} 


pantallaModel.filter = (texto, pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag;
        let hasta = desde + constantes.regPerPage;
        let qry = `
                SELECT
                    id,
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
                    AND nombre LIKE '%${texto}%' 
                LIMIT ${desde}, ${hasta}
                `;

            cnn.query(qry, async (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ocurrió un error al solicitar los datos.', tipoMensaje: 'danger', id:-1});
                }else{
                    let totReg = await totRows(`SELECT COUNT(*) AS totRows FROM pantallas WHERE deleted_at IS NULL AND nombre LIKE '%${texto}%'`);
                    return callback(null, {data: res, rows: totReg, rowsPerPage: constantes.regPerPage, page: pag});
                }
            })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

pantallaModel.insert = (data, callback) => {
    if(cnn){
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
            if(err){
                console.log(err);
                return callback({mensaje: 'Ocurrió un error al agregar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback({mensaje: 'El registro ha sido agregado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }

}

pantallaModel.update = (id, data, callback) => {
    if(cnn){
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
            if(err){
                console.log(err);
                return callback({mensaje: 'Ocurrió un error al actualizar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback({mensaje: 'El registro ha sido actualizado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

pantallaModel.sofDelete = (id, callback) => {
    if(cnn){
        let qry = `
            UPDATE pantallas SET
                deleted_at = CURDATE()  
            WHERE 
                id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                console.log(err);
                return callback({mensaje: 'Ocurrió un error al eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback({mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

pantallaModel.delete = (id, callback) => {
    if(cnn){
        let qry = `
            DELETE FROM 
                pantallas 
            WHERE 
                id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, result) => {
            if(err){
                console.log(err);
                return callback({mensaje: 'Ocurrió un error al eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback({mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: result.insertId});
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

module.exports = pantallaModel;
