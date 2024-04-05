import PropTypes from "prop-types";
import { useState } from 'react'
import './PopUp.css';
import PopupPay from './PopUpPay';
import Popup from './PopUp';

export default function PopUpCompra ({ onClose, total, onPago }) {
    const [color, setColor] = useState({
        color: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderTopColor: 'rgba(0, 0, 0, 1)',
        borderRightColor: 'rgba(0, 0, 0, 1)',
        borderBottomColor: 'rgba(0, 0, 0, 1)',
    })

    const [selectedButton, setSelectedButton] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupImage, setPopupImage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessageFail, setPopupMessageFail] = useState('');
    const [popupImageFail, setPopupImageFail] = useState('');
    const [showPopupFail, setShowPopupFail] = useState(false);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    }

    const buttonStyle = (buttonName) => ({
        marginTop: '20px',
        fontFamily: 'Allerta',
        background: selectedButton === buttonName ? 'purple' : '#fbd23a',
        color: selectedButton === buttonName ? 'white' : 'black',
        borderWidth: '0px',
        borderColor: color.borderColor,
        borderTopColor: color.borderTopColor,
        borderRightColor: color.borderRightColor,
        borderBottomColor: color.borderBottomColor,
        outline: 'none'
    });

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

    const handlePago = async () => {
        if (selectedButton === 'Efectivo') {
            if (quantity >= total) {
                const change = quantity - total;
                setPopupImage("../src/assets/img/success.png");
                setPopupMessage('Pago exitoso, su cambio es de ' + change.toFixed(2) + ' pesos');
                setShowPopup(true);
                console.log(`El cambio es: ${change}`);      
                // Aquí puedes hacer algo con el cambio, como mostrarlo en la interfaz de usuario
            } else {
                setPopupImageFail("../src/assets/img/error.png");
                setPopupMessageFail('La cantidad introducida es menor que el costo total');
                setShowPopupFail(true);
                // Aquí puedes hacer algo si la cantidad introducida es menor que el costo total, como mostrar un mensaje de error
                return; // No continuar con el pago si la cantidad es menor que el costo total
            }
        }



        onPago();
    }


    const handleClosePopup = () => {
        setShowPopup(false);
        onClose();
      }
    
    const handleClosePopupFail = () => {
        setShowPopupFail(false);
        }

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        setQuantity(quantity);
    };

    return (
        <div>
        <div className="modal-container" id="modal">
            <div className="modal-content d-inline-flex justify-content-lg-center align-items-lg-center" style={{ background: 'rgb(251, 225, 147)', width: '400px', height: '500px', padding: '75px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginTop: '80px' }}>
                <div style={{ width: '350px', textAlign: 'center', height: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Total sin redondeo: ${total.toFixed(2)}</div>
                        <div>Total redondeado: ${Math.ceil(total)}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button onClick={() => handleButtonClick('Efectivo')} style={buttonStyle('Efectivo')} className="btn btn-primary">Efectivo</button>
                        <button onClick={() => handleButtonClick('Tarjeta')} style={buttonStyle('Tarjeta')} className="btn btn-primary">Tarjeta</button>
                        <button onClick={() => handleButtonClick('Transferencia')} style={buttonStyle('Transferencia')} className="btn btn-primary">Transferencia</button>
                    </div>

                    {selectedButton === 'Efectivo' && (
                        <><div style={{ marginTop: '30px' }}>
                            <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad Recibida</p>
                        </div><div>
                                <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '10px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                                    <input type="number" style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} onChange={handleQuantityChange} />
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
    onPago: PropTypes.func.isRequired,
};
