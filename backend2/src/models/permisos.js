const connection = require('../../db/connection');

let pool = connection.pool()

let permisosModel = {};

permisosModel.get = async (idRol, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */

        let resp = null
        try{
            let qry = `
                    SELECT
                        qry1.id,
                        qry1.roles_id,
                        pt.id AS pantallas_id,
                        pt.nombre AS pantalla,
                        pt.permite_crear,
                        pt.permite_modificar,
                        pt.permite_eliminar,
                        qry1.acceder,
                        qry1.crear,
                        qry1.modificar,
                        qry1.eliminar,
                        qry1.created_at,
                        qry1.updated_at,
                        qry1.deleted_at
                FROM pantallas pt
                LEFT JOIN 
                (	SELECT p.* FROM permisos p 
                    INNER JOIN roles r ON p.roles_id = r.id AND r.id = ${cnn.escape(idRol)} 
                ) qry1 ON pt.id = qry1.pantallas_id 
                WHERE
                        pt.deleted_at IS NULL AND
                        qry1.deleted_at IS NULL
                ORDER BY
                        roles_id,
                        pantallas_id`;
                        
            let result = await cnn.promise().query(qry);

            resp = callback(null, result[0]);
        }catch(error){
            console.log(error.message)

            resp = callback({mensaje: 'Ocurrió un error al buscar los permisos del rol: '+ error.message, tipoMensaje: 'danger', id: -1});
        }
        cnn.release()
        return resp
    })
}

permisosModel.getPermisosPantalla = (url, arrRoles, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
                SELECT
                    p.acceder,
                    p.crear,
                    p.modificar,
                    p.eliminar 
                FROM permisos p
                    INNER JOIN pantallas pt ON p.pantallas_id = pt.id 
                    INNER JOIN menus m on pt.menus_id = m.id 
                WHERE m.url = ${cnn.escape(url)} 
                AND p.roles_id IN (${cnn.escape(arrRoles)})
                AND p.deleted_at IS NULL
                AND pt.deleted_at IS NULL
                AND m.deleted_at IS NULL;
        `

        cnn.query(qry, (error, result) => {
            let resp = null
            if(error){
                console.log(error)
                resp = callback({mensaje: 'Ocurrió un error al consultar los permisos: '+error.message, tipoMensaje: 'danger', id: -1});
            }else{
                resp = callback(null, result);
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

permisosModel.savePermissions = async (id, data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let resp = null
        try{
            await cnn.promise().beginTransaction();
            await deletePermissions(cnn, id, data);
            await insertPermissions(cnn, id, data);
            await updatePermissions(cnn, id, data);
            await cnn.promise().commit();

            resp = callback({mensaje: 'Los permisos han sido actualizados.', tipoMensaje: 'success', id: -1});
        }catch(error){
            await cnn.promise().rollback();

            resp = callback({mensaje: 'Ocurrió un error al intentar registrar los permisos: '+error.message, tipoMensaje: 'danger', id: -1});
        }
        cnn.release()
        return resp
    
    })
}

const insertPermissions = async (cnn, idRol, data) => {
    data.filter(p => p.id === null).forEach(async p => {
        var qry = `
            INSERT INTO permisos (
                roles_id,
                pantallas_id,
                acceder,
                crear,
                modificar,
                eliminar,
                created_at,
                updated_at
            ) VALUE (
                ${cnn.escape(idRol)},
                ${cnn.escape(p.pantallas_id)},
                ${cnn.escape(p.acceder)},
                ${cnn.escape(p.crear)},
                ${cnn.escape(p.modificar)},
                ${cnn.escape(p.eliminar)},
                CURDATE(),
                CURDATE()
            )`;
        await cnn.promise().query(qry);
    });
}

const updatePermissions = async (cnn, idRol, data) => {
    data.filter(p => p.id !== null).forEach(async p => {
        var qry = `
        UPDATE permisos SET 
            roles_id = ${cnn.escape(idRol)}, 
            pantallas_id = ${cnn.escape(p.pantallas_id)},
            acceder = ${cnn.escape(p.acceder)},
            crear = ${cnn.escape(p.crear)},
            modificar = ${cnn.escape(p.modificar)},
            eliminar = ${cnn.escape(p.eliminar)},
            updated_at = CURDATE()
        WHERE id = ${p.id}`;
        await cnn.promise().query(qry);
    });
}


const deletePermissions = async (cnn, idRol, data) => {
    //console.log(data)
    let ids = data.filter(p => p.id !== null).map(p => p.id);
    let qry = `
            DELETE FROM 
                permisos 
            WHERE 
                roles_id = ${cnn.escape(idRol)} AND 
                id NOT IN (${ids})
            `;
    
    if(ids.length > 0){
        await cnn.promise().query(qry);
    }
}


module.exports = permisosModel;