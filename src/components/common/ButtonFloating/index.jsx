import React from 'react'
import './styles.css'

const ButtonFloating = ({ onClick }) => {

    return (
        <div className="contenedor" >
            <button className="botonF1" onClick={onClick}>
                <span>+</span>
            </button>
        </div>
    )
}

export default ButtonFloating;
