import PropTypes from "prop-types";
import { useState } from 'react'
import './PopUpInventory.css';

const EditMinimumAmountPopup = ({ onClose, item, onSave }) => {
  const [minimumAmount, setMinimumAmount] = useState(item ? item.minimumAmount : 0);

  const handleSave = () => {
    onSave(minimumAmount);
    onClose();
  };

  return (
    <div className="modal-container" id="modal">
      <div className="modal-content d-inline-flex justify-content-lg-center align-items-lg-center" style={{ background: 'rgb(251, 225, 147)', width: '400px', height: '550px', padding: '75px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginTop: '80px' }}>
        <div style={{ width: '350px', textAlign: 'center', height: '500px' }}>
          <div className="d-lg-flex justify-content-lg-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-x d-lg-flex align-content-around align-self-end order-1 justify-content-lg-end align-items-lg-start" style={{ width: '40px', height: '40px', cursor:'pointer' }} onClick={onClose}>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '10px', marginBottom: '0px' }}>Editar cantidad minima</p>
          </div>
          <div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '0px' }}>{item.productName}</p>
          </div>
          <div style={{ marginTop: '30px', marginLeft:'100px'}}>
            <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad Minima</p>
          </div>
          <div>
            <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '10px', border: '2px solid var(--bs-emphasis-color)', width: '150px', marginLeft: '100px'}}>
            <input
              type="number"
              value={minimumAmount}
              onChange={(e) => setMinimumAmount(e.target.value)}
              style={{ color: 'black',  borderColor: 'rgba(194,186,186,0)',  textAlign: 'center'}}
            />            
          </div>
          </div>
          <div>
            <button onClick={handleSave} className="btn btn-primary" type="button" style={{ color:'white', marginTop: '20px', fontFamily: 'Allerta', background: 'rgba(0, 0, 0, 1)', borderWidth: '5px', borderColor: 'rgba(0, 0, 0, 1)', borderTopColor: 'rgba(0, 0, 0, 1)', borderRightColor: 'rgba(0, 0, 0, 1)', borderBottomColor: 'rgba(0, 0, 0, 1)', outline: 'none' }}>GUARDAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditMinimumAmountPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditMinimumAmountPopup;