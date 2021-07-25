import axios from 'axios'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
import { types as alertasTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as imgMarquesinaTypes } from '../redux/ImagenesMarquesina/types'
const url = 'imagenes_marquesina'

export const getData = () => {
    return (dispatch, action)=> {
        axios.get(`${endPoint}/${url}`, {headers: getHeader()}).then(res => {
            console.log(res, res.data)
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: imgMarquesinaTypes.GET_IMAGES_MARQUESINA, payload: {imagenes: res.data, objImage: []}})
        }).catch(err => {
            handlerError(dispatch, err, 'Ha ocurrido un error al obtener las imágenes de la marquesina: ')
        })
    }
}

export const save = (data) => {
    let fd = crearFormData(data)
    return (dispatch, action)=> {
        axios.post(`${endPoint}/${url}`, fd, {headers: getHeader()}).then(res => {
            console.log('RESPUESTA',res, data)
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: imgMarquesinaTypes.GET_IMAGES_MARQUESINA, payload: data})
        }).catch(err => {
            handlerError(dispatch, err, 'Ha ocurrido un error al obtener las imágenes de la marquesina: ')
        })
    }
}

const crearFormData = (data) => {
    let fd = new FormData()
    Object.keys(data).forEach(i => {
        if(i === 'imagenes'){
            data[i].forEach(img => {
                fd.append('objImages',img.file)
                fd.append(i, `{"id": ${img.id}, "source_image": "${img.src_imagen}", "posicion": ${img.posicion}, "link": "${img.link}", "texto": "${img.texto}"}`)
            })
        }
    })

    return fd
}

/*
[
   {
      "id":-0.820895223858277,
      "source_image":"20190501_215233.jpg",
      "file":{
            "name": "20190501_215233.jpg",
            "size": 3216866,
            "type": "image/jpeg",
      },
      "texto":"aaaaaaaaaaaa",
      "posicion":"10",
      "obj":"blob:http://localhost:3001/05adcf71-21e2-4c00-be2a-82cf26196874",
      "errors":{
         "id":-0.820895223858277
      },
      "link":"hp tftftftft"
   },
   {
      "id":-0.9071943706271235,
      "source_image":"result~2.jpg",
      "file":{
            "name": "result~2.jpg",
            "size": 35782,
            "type": "image/jpeg",
      },
      "texto":"bbbbbbbbbbbb",
      "posicion":"20",
      "obj":"blob:http://localhost:3001/0d6dc24c-a5d5-44b1-ba53-7e2492ec0827",
      "errors":{
         "id":-0.9071943706271235
      },
      "link":"hp hghghghghgh"
   },
   {
      "id":-0.43672327224128105,
      "source_image":"WIN_20200709_19_11_53_Pro (2).jpg",
      "file":{
            "name": "WIN_20200709_19_11_53_Pro (2).jpg",
            "size": 215450,
            "type": "image/jpeg",
      },
      "texto":"ccccccccccccc",
      "posicion":"30",
      "obj":"blob:http://localhost:3001/8062fc9f-58ea-4057-a8d1-44d910e3d834",
      "errors":{
         "id":-0.43672327224128105
      },
      "link":"hp vhvhvhvhvhvhvh"
   }
]
*/