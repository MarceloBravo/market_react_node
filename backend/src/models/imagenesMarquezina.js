const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let cnn = connection.conect()

let ImagenesMarquezinaModel = {}

ImagenesMarquezinaModel.getData = (callback) => {
    if(cnn){
        let qry = `
                SELECT 
                    id,
                    src_imagen,
                    texto,
                    link,
                    posicion,
                    created_at,
                    updated_at 
                FROM 
                    imagenes_marquesina_home  
                WHERE 
                    deleted_at IS NULL
                ORDER BY posicion ASC`
            
            cnn.query(qry, (err, res)=>{
                if(err){
                    return callback({mensaje: 'Ocurrió un error al obtener las imágenes de la marquezina: ' + err.message, tipoMensaje: 'danger'})
                }else{
                    return callback(null, res)
                }
            })
        
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}


ImagenesMarquezinaModel.save = async (data, callback) => {
    if(cnn){
        try{
            await cnn.promise().beginTransaction();
            await eliminar(data.imagenes)
            await actualizar(data.imagenes)
            await insertarNuevos(data.imagenes)
            await cnn.promise().commit()
            return callback(null, {mensaje: 'Las imágenes han sido grabadas.', tipoMensaje: 'success'})
        }catch(err){
            await cnn.promise().rollback()
            return callback(null, {mensaje: 'Ocurrió un error al intentar grabar las imágenes: '+err.message, tipoMensaje: 'danger'})
        }
        
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}


const insertarNuevos = async (data) => {
    return await data.map(async i => {
        //console.log(i, typeof(i))
        //console.log(JSON.parse(i).source_image, JSON.parse(i).id)
        let objImage = JSON.parse(i)
        if(objImage.id < 0){
            let qry = `INSERT INTO imagenes_marquesina_home (
                src_imagen,
                texto,
                link,
                posicion, 
                created_at,
                updated_at
            ) VALUES (
                ${cnn.escape(objImage.source_image)},
                ${cnn.escape(objImage.texto)},
                ${cnn.escape(objImage.link)},
                ${cnn.escape(objImage.posicion)},
                CURDATE(),
                CURDATE()
            )`

            await cnn.promise().query(qry)
        }
    })
}


const actualizar = async (data) => {
    return await data.map(async i => {
        let objImage = JSON.parse(i)
        let qry = `UPDATE imagenes_marquesina_home SET 
                    src_imagen = ${cnn.escape(objImage.source_image)},
                    texto = ${cnn.escape(objImage.texto)}, 
                    link = ${cnn.escape(objImage.link)},
                    posicion = ${cnn.escape(objImage.posicion)},
                    deleted_at = null 
                WHERE 
                    id = ${cnn.escape(objImage.id)}`

        await cnn.promise().query(qry)
    })
}

const eliminar = (data) => {
    let ids = data.map(i => JSON.parse(i).id)
    let qry = `UPDATE imagenes_marquesina_home SET deleted_at = CURDATE() WHERE id NOT IN (${cnn.escape(ids)})`

    return new Promise((resolve, reject)=>{
        cnn.query(qry, (err, res) =>{
            return err ? reject(false) : resolve(true)
        })
    })
}

module.exports = ImagenesMarquezinaModel