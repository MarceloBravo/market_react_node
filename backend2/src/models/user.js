const connection = require('../../db/connection.js')
const tools = require('../shared/tools.js')
const { regPerPage } = require('../shared/constants');
const rolesUsuario = require('../shared/functions')

let pool = connection.pool()

let userModel = {}


const totRows = (cnn, qry) => {
    return new Promise((resolve, reject)=> {
        cnn.query(qry, (err, res) => {
            if(err){
                return reject(0);
            }else{
                return resolve(res[0].totRows);
            }
        });
    });
}


userModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 
        
        let desde = regPerPage * pag;
        let qry = `
            SELECT 
                id,
                name,
                email,
                email_verified_at,
                remember_token,
                created_at,
                updated_at,
                deleted_at,
                a_paterno,
                a_materno,
                direccion,
                foto,
                fono 
            FROM users
            WHERE 
                deleted_at IS NULL
            LIMIT ${desde}, ${regPerPage} 
        `;

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar los datos.', tipoMensaje: 'danger', id: -1});
            }else{
                let rows = await totRows(cnn, `SELECT COUNT(*) as totRows FROM users WHERE deleted_at IS NULL`);
                resp = callback(null, {data: result, totRows: rows, rowsPerPage: regPerPage, page: pag});
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


userModel.get = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
        SELECT
            id,
            name,
            email, 
            created_at, 
            updated_at, 
            a_paterno, 
            a_materno, 
            direccion, 
            foto, 
            fono 
        FROM 
            users 
        WHERE id = ${cnn.escape(id)}
            AND deleted_at IS NULL
        `

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback(err, {mensaje: 'Ocurrió un error al solicitar los datos del registro.', tipoMensaje:'danger', id: id})
            }else{
                result[0].roles = await rolesUsuario(cnn, id);
                resp = callback(err, result[0])
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

userModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                        name,
                        email, 
                        created_at, 
                        updated_at, 
                        a_paterno, 
                        a_materno, 
                        direccion, 
                        foto, 
                        fono 
                    FROM users 
                    WHERE deleted_at IS NULL 
                    ORDER BY id`;
                    
        cnn.query(qry,(err, rows) => {
            let resp = null
            if(err){
                resp = callback(err, {mensaje: 'Ocurrió un error al solicitar los datos.', tipoMensaje:'danger', id: -1})
            }else{
                resp = callback(null, rows);
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


userModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let filtro =  `AND (
                            name LIKE ${cnn.escape('%'+texto+'%')} OR
                            email LIKE ${cnn.escape('%'+texto+'%')} OR 
                            a_paterno LIKE ${cnn.escape('%'+texto+'%')} OR 
                            a_materno LIKE ${cnn.escape('%'+texto+'%')} OR 
                            direccion LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(created_at, "%d/%m/%Y") LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(deleted_at, "%d/%m/%Y") LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(created_at, "%d-%m-%Y") LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(deleted_at, "%d-%m-%Y") LIKE ${cnn.escape('%'+texto+'%')} 
                        )`;

        let qry = `SELECT 
                    name,
                    email, 
                    created_at, 
                    updated_at, 
                    a_paterno, 
                    a_materno, 
                    direccion, 
                    foto
                FROM users 
                WHERE 
                    deleted_at IS NULL 
                    ${filtro} 
                ORDER BY a_paterno, a_materno, name
        `;

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar los dregistros: ' + err.sqlMessage, tipoMensaje: 'danger', id: -1});
            }else{
                let rows = await totRows(cnn, `SELECT COUNT(*) AS totRows FROM users WHERE deleted_at IS NULL ${filtro}`);
                resp = callback(null, {data: result, totRows: rows, rowsPerPage: regPerPage, page: pag});
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


userModel.insert = async (data, callback) => {
    let validaciones = validaDatos(data);
    if( validaciones.length > 0){
        return callback({mensaje: 'Datos incompletos o no válidos.', tipoMensaje: 'danger', id: -1,  errores: validaciones})
    }
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let password = await tools.encriptarPassword(data.password);

        let rolesId = data.roles.map(r => r.id );

        let qry = `INSERT INTO users (
                        name,
                        email, 
                        password, 
                        created_at, 
                        updated_at, 
                        a_paterno, 
                        a_materno, 
                        direccion, 
                        foto,
                        fono
                    ) VALUES (
                        ${cnn.escape(data.name)}, 
                        ${cnn.escape(data.email)}, 
                        ${cnn.escape(password)},
                        CURDATE(), 
                        CURDATE(), 
                        ${cnn.escape(data.a_paterno)}, 
                        ${cnn.escape(data.a_materno)}, 
                        ${cnn.escape(data.direccion)}, 
                        ${cnn.escape(data.foto)},
                        ${cnn.escape(data.fono)}
                    )`;

        let resp = null
        try{
            await cnn.promise().beginTransaction();

            let result = await cnn.promise().query(qry);

            await cnn.promise().query(`INSERT INTO role_user (role_id, user_id) SELECT id, ${result[0].insertId} FROM roles WHERE id IN (${rolesId})`);

            await cnn.promise().commit();

            

            resp = callback({mensaje: 'El usuario ha sido ingresado exitosamente.', tipoMensaje: 'success', id: -1});

        }catch(err){
            await cnn.promise().rollback();

            resp = callback({mensaje: 'Ocurrió un error al intentar ingrsar el usuario: ' + err.sqlMessage, tipoMensaje: 'danger', id: -1});
        }
        cnn.release()
        return resp
    })
}



userModel.update = async (id, data, callback) => {
    let validaciones = validaDatos(data);
    if( validaciones.length > 0){
        return callback({mensaje: 'Datos incompletos o no válidos.', tipoMensaje: 'danger', id: -1,  errores: validaciones})
    }
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let password = data.password ? await tools.encriptarPassword(data.password) : null;
        let rolesId = data.roles.map(r => r.id);    //Rescatando los ids de los roles asignados al usuario
        

        let qryUsuarios = `
            UPDATE users SET 
                name = ${cnn.escape(data.name)},
                email = ${cnn.escape(data.email)},
                ${password ? `password = ${cnn.escape(password)}, ` : ``}
                updated_at = CURDATE(),
                a_paterno = ${cnn.escape(data.a_paterno)},
                a_materno = ${cnn.escape(data.a_materno)},
                direccion = ${cnn.escape(data.direccion)},
                foto = ${cnn.escape(data.foto)},
                fono = ${cnn.escape(data.fono)}
            WHERE id = ${cnn.escape(id)}
            `

        let qryDeleteRolesUsuario = `DELETE FROM role_user WHERE role_id NOT IN (${rolesId})`

        let qryRolesUsuario = `
                    INSERT INTO role_user (
                        role_id, 
                        user_id, 
                        created_at, 
                        updated_at
                    )  
                    SELECT 
                        id, 
                        ${id}, 
                        CURDATE(), 
                        CURDATE() 
                    FROM roles 
                    WHERE id IN (${rolesId}) AND 
                        id NOT IN (SELECT role_id FROM role_user WHERE user_id = ${id})`
            
        let resp = null
        
        try{
            await cnn.promise().beginTransaction()

            await cnn.promise().query(qryDeleteRolesUsuario);

            //insertando nuevos roles
            await cnn.promise().query(qryRolesUsuario);

            //Actualizando los datos del usuario
            await cnn.promise().query(qryUsuarios);

            await cnn.promise().commit();

            resp = callback(null, {mensaje: 'El usuario ha sido actualizado exitosamente.', tipoMensaje: 'success', id});

        }catch(err){
            await cnn.promise().rollback();

            resp = callback({mensaje: 'Ocurrió un error al intentar actualizar el usuario: '+err.sqlMessage, tipoMensaje: 'danger', id: -1})
        }
        cnn.release()
        return resp 
        
    })
}



userModel.delete = async (data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  `DELETE FROM users WHERE id = ${cnn.escape(data.id)}`
        let qryDeleteRolesUsuario = `DLETE FROM role_user WHERE user_id = ${cnn.escape(id)}`;

        let resp = null
        try{
            await cnn.promise().beginTransaction();

            await cnn.promise().query(qryDeleteRolesUsuario);

            await cnn.promise().query(qry);

            await cnn.promise().commit();

            resp = callback(null, {mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id});
        }catch(err){
            await cnn.promise().rollback();            

            resp = callback({mensaje: 'Ocurrió un error al intentar eliminar el registro.', tipoMensaje: 'danger', id:-1});
        }
        
        cnn.release()
        return resp
    })
}


userModel.softDelete = async (id, callback) =>  {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 
        
        let qry = `UPDATE users SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`;
        
        let qry2 = `UPDATE role_user SET deleted_at = CURDATE() WHERE user_id = ${cnn.escape(id)}`;

        let resp = null
        
        try{
            await cnn.promise().beginTransaction();

            await cnn.promise().query(qry2);

            await cnn.promise().query(qry);

            await cnn.promise().commit();

            resp = callback(null, {mensaje: 'El registro ha sido eliminado exitosamente.', tipoMensaje: 'success', id})
        }catch(err){
            await cnn.promise().rollback();

            resp = callback({mensaje: 'Ha ocurrido un error al intentar eliminar el usuario: '+err.sqlMessage, tipoMensaje: 'danger', id});
        }

        cnn.release()
        return resp
    })
}


const validaDatos = (data, newUser) => {
    let res = [];
    if(!data.name){res.push('Debe ingresar el nombre del usuario.')}
    if(!data.a_paterno){res.push('Debe ingresar el apellido paterno.')} 
    if(!data.a_materno){res.push('Debe ingresar el apellido materno.')} 
    if(!data.email){res.push('El email es obligatorio.')}
    if(!data.direccion){res.push('La dirección es obligatoria')}
    if(newUser && !data.password){res.push('Debe ingresar una contraseña para el usuario.')}
    return res;
}

module.exports = userModel;