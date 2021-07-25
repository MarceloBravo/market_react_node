import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../../../actions/seccionesHome'
import { defaultImagesProducts } from '../../../shared/constantes'

//Documentación multi-carrousel https://www.npmjs.com/package/react-multi-carousel
//yarn add react-multi-carousel --save
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css'


export const SeccionesHomeComponent = (props) => {
    const listaSeccionesState = useSelector(state => state.SeccionesHomeReducer.list)
    const dispatch = useDispatch()
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };


    useEffect(()=>{
        dispatch(getAll())
    },[dispatch])
    

    useEffect(()=>{
        console.log(listaSeccionesState[0]?.productos)
    },[listaSeccionesState])
    

    return (
        <>
        { listaSeccionesState.map( (s, key1) => {
            return  <div className="div-carrousel" key={key1}>
                        <div className="div-secction-title">
                            <h3>{s.nombre}</h3>
                        </div>
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            showDots={true}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            //autoPlay={this.props.deviceType !== "mobile" ? true : false}
                            autoPlay={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={5000}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            //deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            centerMode={true}
                            >

                                { s.productos.map((i, key2) => {
                                    return <div key={key2}>
                                                <Card>
                                                    <Card.Img variant="top" src={defaultImagesProducts + i.source_image} />
                                                    <Card.Body>
                                                        <Card.Title>{i.nombre}</Card.Title>
                                                        <Card.Text>
                                                            {i.texto1.length + i.texto2.length < 40 && <label>{i.texto1} {i.texto2}</label> }
                                                            
                                                            {// eslint-disable-next-line jsx-a11y/no-distracting-elements
                                                            i.texto1.length + i.texto2.length >= 40 &&  <marquee>
                                                                        {i.texto1} {i.texto2}
                                                                    </marquee>
                                                            }
                                                        </Card.Text>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <small className="text-muted">Comprar</small>
                                                    </Card.Footer>
                                                </Card>
                                        </div>
                                    })
                                }
                        </Carousel>
                    </div>
                    
                })
            }
        </>
    )
}
