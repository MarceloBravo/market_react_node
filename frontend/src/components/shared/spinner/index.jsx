//https://www.npmjs.com/package/react-spinners  
//https://www.davidhu.io/react-spinners/    tipos de spinners
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PulseLoader from "react-spinners/PulseLoader"; //yarn add react-spinners
import './style.css'


export const SpinnerComponent = (props) => {
    const showSpinner = useSelector(state => state.SpinnerReducer.showSpinner)
    // eslint-disable-next-line
    let [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    let [color, setColor] = useState("#ffffff");

    return (
        showSpinner && 
        <>
            <div className="spinner-background"></div>
            <PulseLoader color={color} loading={loading} size={20} />
        </>
    )
}