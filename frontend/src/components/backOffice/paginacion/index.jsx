import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const Paginacion = (props) => {
    const { totRows } = useSelector(state => state.GridReducer.totRows)
    const { rowsPerPage } = useSelector(state => state.GridReducer.rowsPerPage)
    const { page } = useSelector(state => state.GridReducer.page)
    const [ items, setItems ] = useState([])

    useEffect(() => {  
        if (totRows && rowsPerPage && page) {
            let arrNumbers = []
            for (let number = 0; number < Math.ceil(totRows/rowsPerPage); number++) {
                arrNumbers.push(
                    <Pagination.Item key={number} active={number === page}>
                        {number+1}
                    </Pagination.Item>
                );
            }
            setItems(arrNumbers)
        }        
    },[totRows, rowsPerPage, page])


    return (
        <div>
            {items.length < 10 && <Pagination>{items}</Pagination>}
            {items.length < 10 && <Pagination size="sm">{items}</Pagination>}
        </div>
    )
}

