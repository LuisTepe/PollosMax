import React, { useState } from 'react';
import editar from "/src/assets/img/editar.png";
import borrar from "/src/assets/img/borrar.png";
import agregar from "/src/assets/img/agregar.png";
import "./ProductList.css";
import PopupDelete from './PopUpDelete'; 
import PopupUpdate from './PopUpUpdate'; 
import PopupInsert from './PopUpInsert';

function ProductList({ products }) {
  // Controlar si el pop-up de eliminación está abierto o cerrado
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  
  // Controlar si el pop-up de actualización está abierto o cerrado
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  // Controlar si el pop-up de inserción está abierto o cerrado
  const [isInsertPopupOpen, setIsInsertPopupOpen] = useState(false);

  //Abrir el pop-up de delete al hacer clic en el botón de borrar
  const handleDeleteButtonClick = () => {
    setIsDeletePopupOpen(true);
    setIsEditPopupOpen(false); // Asegurarse de que el popup de edición esté cerrado al abrir el de eliminación
  };

  //Abrir el pop-up de update al hacer clic en el botón de editar
  const handleEditButtonClick = () => {
    setIsEditPopupOpen(true);
    setIsDeletePopupOpen(false); // Asegurarse de que el popup de eliminación esté cerrado al abrir el de edición
  };

  //Abrir el pop-up de insert al hacer clic en el botón de agregar
  const handleAddButtonClick = () => {
    setIsInsertPopupOpen(true);
  };

  return (
    <div className="product-list-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <table className="product-table">
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="product-item">
              <td>{product.idProduct}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productAmount}</td>
              <td>
                {/* Convertir las imágenes en botones */}
                <button className="edit-button" onClick={handleEditButtonClick}>
                  <img src={editar} alt="Editar" className="edit-icon" />
                </button>
                <button className="delete-button" onClick={handleDeleteButtonClick}>
                  <img src={borrar} alt="Borrar" className="delete-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-button" onClick={handleAddButtonClick}>
        <img src={agregar} alt="Agregar" className="add-icon" />
      </button>
      {isDeletePopupOpen && <PopupDelete onClose={() => setIsDeletePopupOpen(false)} />}
      {isEditPopupOpen && <PopupUpdate onClose={() => setIsEditPopupOpen(false)} idProduct={product.idProduct} />}
      {isInsertPopupOpen && <PopupInsert onClose={() => setIsInsertPopupOpen(false)} />}
    </div>
  );
}

export default ProductList;
