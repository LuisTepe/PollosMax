import PropTypes from "prop-types";
import { useState } from 'react'
import './PopUp.css';
import PopupPay from './PopUpPay';
import Popup from './PopUp';
import { handleKeyDownForNumericInputs, handleValueForNumericInputs } from "../src/helpers/InputCheckers";
import axios from 'axios';
import { getLoggedInUser } from '../src/pages/LoginPage';

export default function PopUpCompra({ onClose, total, onCompra }) {
    const [color, setColor] = useState({
        color: ' rgb(49, 48, 77)',
        borderColor: ' rgb(49, 48, 77)',
        borderTopColor: ' rgb(49, 48, 77)',
        borderRightColor: ' rgb(49, 48, 77)',
        borderBottomColor: ' rgb(49, 48, 77)',
    })

    const [selectedButton, setSelectedButton] = useState("Efectivo");
    const [quantity, setQuantity] = useState("");
    const [popupMessage, setPopupMessage] = useState('');
    const [popupImage, setPopupImage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessageFail, setPopupMessageFail] = useState('');
    const [popupImageFail, setPopupImageFail] = useState('');
    const [showPopupFail, setShowPopupFail] = useState(false);
    const user = getLoggedInUser();

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    }

    const buttonStyle = (buttonName) => ({
        marginTop: '20px',
        fontFamily: 'Allerta',
        background: selectedButton === buttonName ? 'rgb(23, 22, 36)' : 'rgb(49, 48, 77)',
        color: selectedButton === buttonName ? 'white' : 'white',
        borderWidth: '0px',
        borderColor: color.borderColor,
        borderTopColor: color.borderTopColor,
        borderRightColor: color.borderRightColor,
        borderBottomColor: color.borderBottomColor,
        outline: 'none'
    });

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

    const handlePago = async () => {
        if (selectedButton === 'Efectivo') {
            if (quantity === null || quantity === 0) {
                setPopupImageFail("../src/assets/img/error.png");
                setPopupMessageFail('Por favor, introduzca una cantidad válida');
                setShowPopupFail(true);
                return; // No continuar con el pago si la cantidad es inválida
            }
            if (quantity >= total) {
                const change = quantity - total;
                setPopupImage("../src/assets/img/success.png");
                setPopupMessage('Pago exitoso, su cambio es de ' + change.toFixed(2) + ' pesos');
                setShowPopup(true);
                console.log(`El cambio es: ${change}`);
                registrarVenta(2);
                // Aquí puedes hacer algo con el cambio, como mostrarlo en la interfaz de usuario
            } else {
                setPopupImageFail("../src/assets/img/error.png");
                setPopupMessageFail('La cantidad introducida es menor que el costo total');
                setShowPopupFail(true);
                // Aquí puedes hacer algo si la cantidad introducida es menor que el costo total, como mostrar un mensaje de error
                return; // No continuar con el pago si la cantidad es menor que el costo total
            }
        }
    }

    async function registrarVenta(metodoPago) {
        var usuario;
        console.log(user);
        if (user === 'admin') {
            usuario = 1;
        } else if (user === 'caja') {
            usuario = 2;
        } else {
            console.log(user);
            console.error('Error al registrar la venta:', 'No se pudo obtener el tipo de usuario');
            return;
        }

        // Aquí puedes registrar la venta en la base de datos
        try {
            const response = await axios.post('http://localhost:3000/transaction', {
                idUser: usuario, // Reemplaza esto con la variable que contiene si el usuario es admin o user
                idMovementType: metodoPago,
                totalPrice: total,
            });

            console.log('Venta registrada:', response.data);
        } catch (error) {
            console.error('Error al registrar la venta:', error);
        }
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        onCompra();
    }

    const handleClosePopupFail = () => {
        setShowPopupFail(false);
    }

    return (
        <div>
            <div className="modal-container" id="modal">
                <div className="modal-content d-inline-flex justify-content-lg-center align-items-lg-center" style={{ background: 'rgb(182, 187, 196)', width: '400px', height: '500px', padding: '75px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginTop: '80px' }}>
                    <div style={{ width: '350px', textAlign: 'center', height: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Total sin redondeo: ${total.toFixed(2)}</div>
                            <div>Total redondeado: ${Math.ceil(total)}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button onClick={() => handleButtonClick('Efectivo')} style={buttonStyle('Efectivo')} className="btn btn-primary">Efectivo</button>
                            <button disabled onClick={() => handleButtonClick('Tarjeta')} style={buttonStyle('Tarjeta')} className="btn btn-primary">Tarjeta</button>
                            <button disabled onClick={() => handleButtonClick('Transferencia')} style={buttonStyle('Transferencia')} className="btn btn-primary">Transferencia</button>
                        </div>

                        {selectedButton === 'Efectivo' && (
                            <><div style={{ marginTop: '30px' }}>
                                <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad Recibida</p>
                            </div><div>
                                    <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '10px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                                        <input
                                            type="number"
                                            style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }}
                                            value={quantity ? quantity : ''}
                                            onChange={(e) => handleValueForNumericInputs(e, setQuantity, quantity)}
                                            onKeyDown={handleKeyDownForNumericInputs}
                                        />
                                    </div>
                                </div></>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={onClose} className="btn btn-primary" type="button" style={{ marginTop: '20px', fontFamily: 'Allerta', background: color.color, borderWidth: '5px', borderColor: color.borderColor, borderTopColor: color.borderTopColor, borderRightColor: color.borderRightColor, borderBottomColor: color.borderBottomColor, outline: 'none' }}>Cancelar</button>
                            <button onClick={handlePago} className="btn btn-primary" type="button" style={{ marginTop: '20px', fontFamily: 'Allerta', background: color.color, borderWidth: '5px', borderColor: color.borderColor, borderTopColor: color.borderTopColor, borderRightColor: color.borderRightColor, borderBottomColor: color.borderBottomColor, outline: 'none' }} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseOver={handleHover} onMouseLeave={handleMouseUp}>Pagar</button>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (<PopupPay image={popupImage} message={popupMessage} onClose={handleClosePopup} />)}
            {showPopupFail && (<Popup image={popupImageFail} message={popupMessageFail} onClose={handleClosePopupFail} />)}
        </div>
    );
}

PopUpCompra.propTypes = {
    onClose: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    onCompra: PropTypes.func.isRequired,
};
