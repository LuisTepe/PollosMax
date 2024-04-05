import PropTypes from "prop-types";
import { useState } from 'react'
import './PopUp.css';

const PopupPay = ({ image, message, onClose }) => {
    const [color, setColor] = useState({
        color: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderTopColor: 'rgba(0, 0, 0, 1)',
        borderRightColor: 'rgba(0, 0, 0, 1)',
        borderBottomColor: 'rgba(0, 0, 0, 1)',
      })
    

    function handleMouseUp(){
        setColor({
            color: 'rgba(0, 0, 0, 1)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderTopColor: 'rgba(0, 0, 0, 1)',
            borderRightColor: 'rgba(0, 0, 0, 1)',
            borderBottomColor: 'rgba(0, 0, 0, 1)',
          })
      }
    
      function handleMouseDown(){
        setColor({
            color: 'rgba(30, 30, 30, 1)',
            borderColor: 'rgba(30, 30, 30, 1)',
            borderTopColor: 'rgba(30, 30, 30, 1)',
            borderRightColor: 'rgba(30, 30, 30, 1)',
            borderBottomColor: 'rgba(30, 30, 30, 1)',
          })
      }
    
      function handleHover(){
        setColor({
            color: 'rgba(30, 30, 30, 1)',
            borderColor: 'rgba(30, 30, 30, 1)',
            borderTopColor: 'rgba(30, 30, 30, 1)',
            borderRightColor: 'rgba(30, 30, 30, 1)',
            borderBottomColor: 'rgba(30, 30, 30, 1)',
          })
      }

  return (
    <div className="modal-container" id="modal">
      <div className="modal-content">
        <h2>Pago confirmado!</h2>
        <img src={image} alt="Error image" />
        <p>{message}</p>
        <button onClick={onClose}  style={{color:'white', marginTop: '2px', fontFamily: 'Allerta', background: color.color, borderWidth: '5px', borderColor: color.borderColor, borderTopColor: color.borderTopColor, borderRightColor: color.borderRightColor, borderBottomColor: color.borderBottomColor, outline: 'none' }} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseOver={handleHover} onMouseLeave={handleMouseUp}>Cerrar</button>
      </div>
    </div>
  );
};

PopupPay.propTypes = {
    image: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
export default PopupPay;