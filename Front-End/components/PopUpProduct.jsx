import PropTypes from "prop-types";
import { useState } from 'react'
import './PopUp.css';
import { handleKeyDownForNumericInputs, handleValueForNumericInputs } from "../src/helpers/InputCheckers";

const PopupProduct = ({ onClose, onConfirm, productName, productAmount}) => {
    const [color, setColor] = useState({
        color: ' rgb(49, 48, 77)',
            borderColor: ' rgb(49, 48, 77)',
            borderTopColor: ' rgb(49, 48, 77)',
            borderRightColor: ' rgb(49, 48, 77)',
            borderBottomColor: ' rgb(49, 48, 77)',
    })
    const [quantity, setQuantity] = useState("");

    function handleClick(e) {
        e.preventDefault();
        const numQuantity = Number(quantity);
        if (!isNaN(numQuantity)) {
            onConfirm(numQuantity);
        }
    }


    function handleMouseUp() {
        setColor({
            color: ' rgb(49, 48, 77)',
            borderColor: ' rgb(49, 48, 77)',
            borderTopColor: ' rgb(49, 48, 77)',
            borderRightColor: ' rgb(49, 48, 77)',
            borderBottomColor: ' rgb(49, 48, 77)',
        })
    }

    function handleMouseDown() {
        setColor({
            color: ' rgb(49, 48, 77)',
            borderColor: ' rgb(49, 48, 77)',
            borderTopColor: ' rgb(49, 48, 77)',
            borderRightColor: ' rgb(49, 48, 77)',
            borderBottomColor: ' rgb(49, 48, 77)',
        })
    }

    function handleHover() {
        setColor({
            color: ' rgb(49, 48, 77)',
            borderColor: ' rgb(49, 48, 77)',
            borderTopColor: ' rgb(49, 48, 77)',
            borderRightColor: ' rgb(49, 48, 77)',
            borderBottomColor: ' rgb(49, 48, 77)',
        })
    }
   
    return (
        <div className="modal-container" id="modal">
            <div className="modal-content d-inline-flex justify-content-lg-center align-items-lg-center" style={{ background: 'rgb(182, 187, 196)', width: '400px', height: '550px', padding: '75px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginTop: '80px' }}>
                <div style={{ width: '350px', textAlign: 'center', height: '500px' }}>
                    <div className="d-lg-flex justify-content-lg-end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-x d-lg-flex align-content-around align-self-end order-1 justify-content-lg-end align-items-lg-start" style={{ width: '40px', height: '40px', cursor: 'pointer' }} onClick={onClose}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                        </svg>
                    </div>
                    <div>
                        <p style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '10px', marginBottom: '0px' }}>{productName}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '10px', marginBottom: '0px' }}>Inventario: {productAmount}</p>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '10px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input 
                            type="number" 
                            min="0" 
                            style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} 
                            value = {quantity? quantity : ''}
                            onChange={(e) => handleValueForNumericInputs(e, setQuantity, quantity)} 
                            onKeyDown={handleKeyDownForNumericInputs} />
                        </div>
                    </div>
                    <div>
                        <p style={{ marginTop: '10px', textAlign: 'left', fontFamily: 'Allerta', fontSize: '18px' }}>Notas</p>
                    </div>
                    <div style={{ alignContent: "initial", borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '10px', width: '330px', height: '120px', border: '2px solid var(--bs-emphasis-color)' }}>
                        <input type="text" style={{ color: 'black', background: 'rgba(255,255,255,0)', borderStyle: 'none', borderColor: 'rgba(194,186,186,0)', height: '95px', outline: 'none' }} />
                    </div>
                    <div>
                    <button
                            onClick={handleClick}
                            className="btn btn-primary"
                            type="button"
                            style={{ color: 'white', marginTop: '20px', fontFamily: 'Allerta', background: color.color, borderWidth: '5px', borderColor: color.borderColor, borderTopColor: color.borderTopColor, borderRightColor: color.borderRightColor, borderBottomColor: color.borderBottomColor, outline: 'none' }}
                            onMouseUp={handleMouseUp}
                            onMouseDown={handleMouseDown}
                            onMouseOver={handleHover}
                            onMouseLeave={handleMouseUp}
                            disabled={!quantity || quantity > productAmount || quantity == 0 || quantity < 0} // Deshabilita el botón si quantity es null, 0, o mayor que productAmount >
                            >
                            AGREGAR AL CARRITO
                        </button></div>
                </div>
            </div>
        </div>
    );
};

PopupProduct.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    productName: PropTypes.string.isRequired,
    productAmount: PropTypes.number.isRequired,
};

export default PopupProduct;