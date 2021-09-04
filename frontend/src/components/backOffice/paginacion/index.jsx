import React, { useEffect, useState, useRef } from 'react'
import { Pagination } from 'react-bootstrap'
import './style.css'

export const Paginacion = (props) => {
    const renderCount = useRef(0);
    const { data, goToPage } = props
    const [ items, setItems ] = useState([])
    renderCount.current = renderCount.current + 1;


    useEffect(() => {
        let totPages = Math.ceil(data.totRows/data.rowsPerPage) -1
        let pag = data.page * 1
        if (data && totPages > 0) {
            let arrNumbers = [<Pagination.First key="-1" onClick={() => goToPage(0)}/>]
            let desde = 0
            let hasta = (totPages > 10 && pag + 2 <= totPages)? pag + 2 : totPages
            if(pag - 4 >= 0){                
                desde = pag - 3
                arrNumbers.push(<Pagination.Ellipsis />)
            }
            if(hasta < 5 && totPages > 5){
                hasta = 5
            }
            hasta++
            console.log('hasta',hasta)
            
            for (let number = desde; number < hasta; number++) {
                arrNumbers.push(
                    <Pagination.Item key={number*10} active={number === pag} onClick={() => goToPage(number)}>
                        {number+1}
                    </Pagination.Item>
                );
            }
            if(totPages > 10 && (pag + 3 < totPages)){
                arrNumbers.push(<Pagination.Ellipsis />)
            }
            arrNumbers.push(<Pagination.Last key={totPages*10+1} onClick={() => goToPage(totPages)}/>)
            setItems(arrNumbers)
        }        
    },[data, goToPage])


    return (
        <div key={Math.random()}>
            {items.length <= 10 && <Pagination>{items}</Pagination>}
            {items.length > 10 && <Pagination size="sm">{items}</Pagination>}
        </div>
    )
}

