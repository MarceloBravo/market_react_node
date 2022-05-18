const connection = require('../../db/connection.js');
const constantes = require('../shared/constants');
//const todayToString = require('../shared/functions');

let pool = connection.pool()

let rowsPerPage = constantes.regPerPage;

let rolesModel = {};

const getTotRows = (cnn, qry) => {
    return new Promise(( resolve, reject) => {
        cnn.query(qry, (err, res) => {
            if(err){
                return reject(0);
            }else{
                return resolve(res[0].totReg);
            }   
        })
    })
}


rolesModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = rowsPerPage  * pag;
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
            LIMIT ${desde}, ${rowsPerPage}
        `;

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar los registros: '+err.message, tipoMensaje: 'danger', id:-1});
            }else{
                let totRows = await getTotRows(cnn, 'SELECT COUNT(*) AS totReg FROM roles WHERE deleted_at IS NULL');
                resp = callback(null, {data: result, page: pag, totRows, rowsPerPage: constantes.regPerPage});
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })

}


rolesModel.get = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

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

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar el registro: '+err.message, tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, result[0]);
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id})
        })
        */
    })
}


rolesModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

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

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar el listado de registros: '+err.message, tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, result);
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id})
        })
        */
    })
}


rolesModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let filtro = `AND 
                    (
                        name LIKE ${cnn.escape('%' + texto+ '%')}
                        OR description LIKE ${cnn.escape('%' + texto + '%')}
                        OR DATE_FORMAT(created_at, "%d/%m/%Y") LIKE ${cnn.escape('%' + texto + '%')}
                        OR DATE_FORMAT(updated_at, "%d/%m/%Y") LIKE ${cnn.escape('%' + texto + '%')} 
                        OR DATE_FORMAT(created_at, "%d-%m-%Y") LIKE ${cnn.escape('%' + texto + '%')}
                        OR DATE_FORMAT(updated_at, "%d-%m-%Y") LIKE ${cnn.escape('%' + texto + '%')}
                    )`;
                    
        let desde = rowsPerPage  * pag;
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
            LIMIT ${desde}, ${rowsPerPage}
        `;

        console.log(qry, pag)

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar los registros: '+err.message, tipoMensaje: 'danger', id:-1});
            }else{
                let totRows = await getTotRows(cnn, `SELECT COUNT(*) AS totReg FROM roles WHERE deleted_at IS NULL ${filtro}`);
                resp = callback(null, {data: result, page: pag, totRows, rowsPerPage: constantes.regPerPage});
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id})
        })
        */
    })
}


rolesModel.insert = (data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

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

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar ingresar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, {mensaje: 'El registro ha sido ingresado exitosamente.', tipoMensaje: 'success', id: result.newId})
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id})
        })
        */
    })
}


rolesModel.update = (id, data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            UPDATE roles SET 
                name = ${cnn.escape(data.name)},
                description = ${cnn.escape(data.description)},
                updated_at = CURDATE()
            WHERE id = ${cnn.escape(id)}
            `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, {mensaje: 'El registro ha sido actualizado exitosamente.', tipoMensaje: 'success', id: result.newId})
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id})
        })
        */
    })
}


rolesModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            UPDATE roles SET 
                deleted_at = CURDATE()
            WHERE id = ${cnn.escape(id)}
            `;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, {mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: result.newId})
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id})
        })
        */
    })    
}


rolesModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM roles WHERE id = ${cnn.escape(id)}`;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro.', tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, {mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id: result.newId})
            }
            cnn.release()
            return resp
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id})
        })
        */
    })  
}

module.exports = rolesModel;