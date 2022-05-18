import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../actions/imagenesMarquesina'
import { defaultImagesTienda } from '../../../shared/constantes'
import './style.css'


export const Marquesina = () => {
    const imagenesState = useSelector(state => state.ImagenesMarquesinaReducer.imagenes)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getData())
    },[dispatch])
    

    return (
        <Carousel fade variant="dark">
            {imagenesState && imagenesState.map((i, key) => {
                return <Carousel.Item key={key}>
                        <img
                        className="d-block w-100"
                        src={defaultImagesTienda + i.src_imagen}
                        alt={i.texto}
                        />
                        {(i.texto || i.link) && 
                            <Carousel.Caption>
                                <h5>{i.texto}</h5>
                                <p>{i.link}</p>
                            </Carousel.Caption>
                                    }
                    </Carousel.Item>
                })
            }
        </Carousel>
    )
}