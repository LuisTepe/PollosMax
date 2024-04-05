import PropTypes from "prop-types";
import { useState } from 'react'
import './PopUpUpdateInventory.css';

const AddProductPopup = ({ onClose, onSave }) => {
  const [idProductType, setIdProductType] = useState("");
  const [idUnit, setIdUnit] = useState("");
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleSave = () => {
    onSave({ idProductType, idUnit, productName, productAmount, minimumAmount, productPrice });
    onClose();
  };

  return (
    <div className="modal-container" id="modal">
      <div className="modal-content" style={{ background: 'rgb(251, 225, 147)',  height: '550px', padding: '75px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginTop: '80px' }}>
        <div style={{ width: '350px', textAlign: '', height: '500px' }}>
          <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-x d-lg-flex align-content-around align-self-end order-1 justify-content-lg-end align-items-lg-start" style={{ width: '40px', height: '40px', cursor:'pointer' }} onClick={onClose}>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '10px', marginBottom: '0px' }}>Agregar Producto</p>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Tipo de producto</td>
                  <td>Unidad</td>
                  <td>Nombre del producto</td>
                </tr>
                <tr>
                  <td>
                    <select
                      value={idProductType}
                      onChange={(e) => setIdProductType(e.target.value)}
                      style={{ marginTop: '30px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px' }}
                    >
                      <option value="" disabled hidden>Selecciona el tipo de producto</option>
                      <option value="1">Almacen</option>
                      <option value="2">Comercial</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={idUnit}
                      onChange={(e) => setIdUnit(e.target.value)}
                      style={{ marginTop: '30px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px' }}
                    >
                      <option value="" disabled hidden>Selecciona la unidad</option>
                      <option value="1">KG</option>
                      <option value="2">Unidades</option>
                      <option value="3">Piezas</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Nombre del producto"
                      style={{ marginTop: '30px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px' }}
                    />
                  </td>
                  </tr>
                  <tr>
                  <td>Cantidad del producto</td>
                  <td>Cantidad mínima</td>
                  <td>Precio del producto</td>
                </tr>
                  <tr>
                  <td>
                    <input
                      type="number"
                      value={productAmount}
                      onChange={(e) => setProductAmount(e.target.value)}
                      placeholder="Cantidad del producto"
                      style={{ marginTop: '30px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px' }}
                    />            
                  </td>
                  <td>
                    <input
                      type="number"
                      value={minimumAmount}
                      onChange={(e) => setMinimumAmount(e.target.value)}
                      placeholder="Cantidad mínima"
                      style={{ marginTop: '30px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px' }}
                    />            
                  </td>
                  <td>
                    <input
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="Precio del producto"
                      style={{ marginTop: '30px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px' }}
                    />            
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <button onClick={handleSave} className="" type="button" style={{color:'white', marginTop: '20px', fontFamily: 'Allerta', background: 'rgba(0, 0, 0, 1)', borderWidth: '5px', borderColor: 'rgba(0, 0, 0, 1)', borderTopColor: 'rgba(0, 0, 0, 1)', borderRightColor: 'rgba(0, 0, 0, 1)', borderBottomColor: 'rgba(0, 0, 0, 1)', outline: 'none' }}>GUARDAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

AddProductPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddProductPopup;