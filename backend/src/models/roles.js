const connection = require('../../db/connection.js');
const constantes = require('../shared/constants');
//const todayToString = require('../shared/functions');

let cnn = connection.conect();
let rowsPerPage = constantes.regPerPage;

let rolesModel = {};

const getTotRows = (qry) => {
    return new Promise(( resolve, reject) => {
        cnn.query(qry, (err, res) => {
            if(err){
                console.log(err);
                return reject(0);
            }else{
                return resolve(res[0].totReg);
            }   
        })
    })
}


rolesModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = rowsPerPage  * pag;
        let hasta = desde + rowsPerPage;
        let qry = `
                SELECT 
                    id,
                    name,
                    description,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    roles
                WHERE 
                    deleted_at IS NULL
                LIMIT ${desde}, ${hasta}
            `;

            cnn.query(qry, async (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ocurrió un error al solicitar los registros: '+err.message, tipoMensaje: 'danger', id:-1});
                }else{
                    let totRows = await getTotRows('SELECT COUNT(*) AS totReg FROM roles WHERE deleted_at IS NULL');
                    return callback(null, {data:res, page: pag, rows: totRows, rowsPerPage: constantes.regPerPage});
                }
            });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }

}


rolesModel.get = (id, callback) => {
    if(cnn){
        let qry = `
                SELECT 
                    id,
                    name,
                    description,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    roles
                WHERE 
                    deleted_at IS NULL
                    AND id = ${cnn.escape(id)}
            `;

            cnn.query(qry, (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ocurrió un error al buscar el registro: '+err.message, tipoMensaje: 'danger', id:-1});
                }else{
                    return callback(null, res[0]);
                }
            });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}


rolesModel.getAll = (callback) => {
    if(cnn){
        let qry = `
                SELECT 
                    id,
                    name,
                    description,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    roles
                WHERE 
                    deleted_at IS NULL
            `;

            cnn.query(qry, (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ocurrió un error al solicitar el listado de registros: '+err.message, tipoMensaje: 'danger', id:-1});
                }else{
                    return callback(null, res);
                }
            });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}


rolesModel.filter = (texto, pag, callback) => {
    if(cnn){
        let filtro = `AND 
                    (
                        name LIKE ${cnn.escape('%' + texto+ '%')}
                        OR description LIKE ${cnn.escape('%' + texto + '%')}
                        OR DATE_FORMAT(created_at, "%d/%M/%Y") LIKE ${cnn.escape('%' + texto + '%')}
                        OR DATE_FORMAT(updated_at, "%d/%M/%Y") LIKE ${cnn.escape('%' + texto + '%')}
                    )`;
                    
        let desde = rowsPerPage  * pag;
        let hasta = desde + rowsPerPage;
        let qry = `
                SELECT 
                    id,
                    name,
                    description,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    roles
                WHERE 
                    deleted_at IS NULL
                    ${filtro}
                LIMIT ${desde}, ${hasta}
            `;

            cnn.query(qry, async (err, res) => {
                if(err){
                    console.log(err);
                    return callback({mensaje: 'Ocurrió un error al filtrar los registros: '+err.message, tipoMensaje: 'danger', id:-1});
                }else{
                    let totRows = await getTotRows(`SELECT COUNT(*) AS totReg FROM roles WHERE deleted_at IS NULL ${filtro}`);
                    return callback(null, {data:res, page: pag, rows: totRows, rowsPerPage: constantes.regPerPage});
                }
            });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}


rolesModel.insert = (data, callback) => {
    if(cnn){
        let qry = `
            INSERT INTO roles (
                name,
                description,
                created_at,
                updated_at
            ) VALUES (
                ${cnn.escape(data.name)},
                ${cnn.escape(data.description)},
                CURDATE(),
                CURDATE()
            )
            `;

        cnn.query(qry, (err, res) => {
            if(err){
                console.log(err)
                return callback({mensaje: 'Ocurrió un error al intentar ingresar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback(null, {mensaje: 'El registro ha sido ingresado exitosamente.', tipoMensaje: 'success', id: res.newId})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}


rolesModel.update = (id, data, callback) => {
    if(cnn){
        let qry = `
            UPDATE roles SET 
                name = ${cnn.escape(data.name)},
                description = ${cnn.escape(data.description)},
                updated_at = CURDATE()
            WHERE id = ${cnn.escape(id)}
            `;

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al intentar actualizar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback(null, {mensaje: 'El registro ha sido actualizado exitosamente.', tipoMensaje: 'success', id: res.newId})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}


rolesModel.softDelete = (id, callback) => {
    if(cnn){
        let qry = `
            UPDATE roles SET 
                deleted_at = CURDATE()
            WHERE id = ${cnn.escape(id)}
            `;

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al intentar eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback(null, {mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: res.newId})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }    
}


rolesModel.delete = (id, callback) => {
    if(cnn){
        let qry = `DELETE FROM roles WHERE id = ${cnn.escape(id)}`;

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al intentar eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                return callback(null, {mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: res.newId})
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }    
}

module.exports = rolesModel;