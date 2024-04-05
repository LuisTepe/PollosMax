import PropTypes from "prop-types";
import { useState } from 'react';
import axios from 'axios';
import './PopUpInsert.css';

const PopupInsert = ({ onClose }) => {
    const [color, setColor] = useState({
        color: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderTopColor: 'rgba(0, 0, 0, 1)',
        borderRightColor: 'rgba(0, 0, 0, 1)',
        borderBottomColor: 'rgba(0, 0, 0, 1)',
    });

    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productUnit, setProductUnit] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [minimumAmount, setMinimumAmount] = useState("");

    function handleMouseUp() {
        setColor({
            color: 'rgba(0, 0, 0, 1)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderTopColor: 'rgba(0, 0, 0, 1)',
            borderRightColor: 'rgba(0, 0, 0, 1)',
            borderBottomColor: 'rgba(0, 0, 0, 1)',
        })
    }

    function handleMouseDown() {
        setColor({
            color: 'rgba(30, 30, 30, 1)',
            borderColor: 'rgba(30, 30, 30, 1)',
            borderTopColor: 'rgba(30, 30, 30, 1)',
            borderRightColor: 'rgba(30, 30, 30, 1)',
            borderBottomColor: 'rgba(30, 30, 30, 1)',
        })
    }

    function handleHover() {
        setColor({
            color: 'rgba(30, 30, 30, 1)',
            borderColor: 'rgba(30, 30, 30, 1)',
            borderTopColor: 'rgba(30, 30, 30, 1)',
            borderRightColor: 'rgba(30, 30, 30, 1)',
            borderBottomColor: 'rgba(30, 30, 30, 1)',
        })
    }

    const handleAddProduct = async () => {
        try {
            // Realiza la solicitud de inserción al backend utilizando Axios
            await axios.post('http://localhost:3000/insertProduct', {
                productName,
                productPrice,
                productAmount: currentAmount,
                idProductType: productType,
                idUnit: productUnit,
                minimumAmount
            });
            console.log("Producto insertado correctamente");
            onClose(); // Cierra el popup después de agregar el producto
        } catch (error) {
            console.error("Error al insertar producto:", error);
        }
    };

    return (
        <div className="modal-container" id="modal">
            <div className="modal-content d-inline-flex justify-content-lg-center align-items-lg-center" style={{ background: 'rgb(251, 225, 147)', width: '40vw', height: '95vh', padding: '0px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginBottom: '0px' }}>
                <div style={{ width: '350px', textAlign: 'center', height: '500px', marginBottom: '185px' }}>
                    <div className="d-lg-flex justify-content-lg-end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-x d-lg-flex align-content-around align-self-end order-1 justify-content-lg-end align-items-lg-start" style={{ width: '40px', height: '40px', cursor: 'pointer' }} onClick={onClose}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                        </svg>
                    </div>
                    <div>
                        <p style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '0px', marginBottom: '0px' }}>Agregar producto</p>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Nombre</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Tipo de producto</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="number" value={productType} onChange={(e) => setProductType(e.target.value)} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Tipo de unidad</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="number" value={productUnit} onChange={(e) => setProductUnit(e.target.value)} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Precio</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad actual en almacén</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="number" value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad mínima de alerta en almacén</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="number" value={minimumAmount} onChange={(e) => setMinimumAmount(e.target.value)} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleAddProduct} className="btn btn-primary" type="button" style={{ marginTop: '20px', fontFamily: 'Allerta', background: color.color, borderWidth: '5px', borderColor: color.borderColor, borderTopColor: color.borderTopColor, borderRightColor: color.borderRightColor, borderBottomColor: color.borderBottomColor, outline: 'none' }} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseOver={handleHover} onMouseLeave={handleMouseUp}>Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

PopupInsert.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default PopupInsert;
