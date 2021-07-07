import React, { useEffect, useState, useRef } from 'react'
import { Pagination } from 'react-bootstrap'

export const Paginacion = (props) => {
    const renderCount = useRef(0);
    const { data, goToPage } = props
    const [ items, setItems ] = useState([])
    renderCount.current = renderCount.current + 1;

    useEffect(() => {
        let totPages = Math.ceil(data.totRows/data.rowsPerPage) -1
        if (data && totPages > 0) {
            let arrNumbers = [<Pagination.First key="-1" onClick={() => goToPage(0)}/>]
            
            for (let number = 0; number <= totPages; number++) {
                arrNumbers.push(
                    <Pagination.Item key={number} active={number === parseInt(data.page)} onClick={() => goToPage(number)}>
                        {number+1}
                    </Pagination.Item>
                );
            }
            arrNumbers.push(<Pagination.Last key={totPages+1} onClick={() => goToPage(totPages)}/>)
            setItems(arrNumbers)
        }        
    },[data, goToPage])


    return (
        <div key={Math.random()}>
            {items.length < 10 && <Pagination>{items}</Pagination>}
            {items.length > 10 && <Pagination size="sm">{items}</Pagination>}
        </div>
    )
}

