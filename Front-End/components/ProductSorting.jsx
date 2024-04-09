import React, { useState } from 'react';
import PropTypes from "prop-types";
import flechaAbajo from "/src/assets/img/caret-abajo.png";
import flechaArriba from "/src/assets/img/caret-flecha-hacia-arriba.png";
import "./ProductSorting.css"
import editar from "/src/assets/img/editar.png";
import borrar from "/src/assets/img/borrar.png";
import agregar from "/src/assets/img/agregar.png";
import PopupDelete from './PopUpDelete'; 
import PopupUpdate from './PopUpUpdate'; 
import PopupInsert from './PopUpInsert';
import SearchBar from './ProductHeader'; // Corregido: Importa desde el archivo correcto

function ProductSortingBar({ handleSort, products }) {

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

   const [activeProductId, setActiveProductId] = useState(null);
 
   //Abrir el pop-up de update al hacer clic en el botón de editar
 const handleEditButtonClick = (productId) => {
  setIsEditPopupOpen(true);
  setIsDeletePopupOpen(false); // Asegurarse de que el popup de eliminación esté cerrado al abrir el de edición
  setActiveProductId(productId); // Establecer el idProduct del producto seleccionado
};
 
   //Abrir el pop-up de insert al hacer clic en el botón de agregar
   const handleAddButtonClick = () => {
     setIsInsertPopupOpen(true);
   };
    const [activeField, setActiveField] = useState(null);
    const [imageSrc, setImageSrc] = useState(flechaAbajo); 
    const [order, setOrder] = useState('asc'); 

    const handleClick = (field) => {
      // Cambiar el estado del campo activo
      setActiveField(field);

      // Cambiar el orden
      const newOrder = order === 'asc' ? 'desc' : 'asc';
      setOrder(newOrder);

      // Cambiar la flechilla de organizacion según el campo activo y el orden
      setImageSrc(newOrder === 'asc' ? flechaArriba : flechaAbajo);

      // Llamar a la función de ordenamiento
      handleSort(field, newOrder);
    };
  
    // Función para manejar la búsqueda de productos por nombre
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (term) => {
      setSearchTerm(term);
    };

    // Filtrar los productos por nombre según el término de búsqueda
    const filteredProducts = products.filter(
      (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.idProduct.toString().includes(searchTerm.toLowerCase()) // Convertir a cadena y buscar por número de código
        
        
    );
  
    return (
      <div>
      <div className="product-sorting-general">
        <div className="product-categories">
          <button
            className={activeField === 'code' ? 'active' : ''}
            onClick={() => handleClick('code')}
          >
            Código
          </button>
          <button
            className={activeField === 'name' ? 'active' : ''}
            onClick={() => handleClick('name')}
          >
            Nombre
          </button>
        
          <button
            className={activeField === 'price' ? 'active' : ''}
            onClick={() => handleClick('price')}
          >
            Precio
          </button>
          <button
            className={activeField === 'stock' ? 'active' : ''}
            onClick={() => handleClick('stock')}
          >
            Stock
          </button>
          <img
            className={`image-format ${activeField === 'image' ? 'active' : ''}`}
            src={imageSrc} // Usar la imagen dinámica
            alt="caret-abajo"
            onClick={() => handleClick('image')}
          />
        </div>
      </div>
      <SearchBar handleSearch={handleSearch} />
         <div className="product-list-container" style={{ maxHeight: 'auto', overflowY: 'auto', overflowX:'auto'}}>
         <table className="product-table">
           <tbody>
             {filteredProducts.map((product, index) => (
               <tr key={index} className="product-item">
                 <td>{product.idProduct}</td>
                 <td>{product.productName}</td>
                 <td>{product.productPrice}</td>
                 <td>{product.productAmount}</td>
                 <td>
                   {/* Convertir las imágenes en botones */}
                   <button className="edit-button" onClick={() => handleEditButtonClick(product.idProduct)}>
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
       </div>
       {isDeletePopupOpen && <PopupDelete onClose={() => setIsDeletePopupOpen(false)} />}
       
       {isInsertPopupOpen && <PopupInsert onClose={() => setIsInsertPopupOpen(false)} />}
       {isEditPopupOpen && (
  <PopupUpdate
    onClose={() => setIsEditPopupOpen(false)}
    idProduct={activeProductId} // Pasa el ID del producto activo
    product={products.find(product => product.idProduct === activeProductId)} // Encuentra el producto correspondiente al ID activo
  />
)}
      </div>

      
      
  );
}

ProductSortingBar.propTypes = {
  handleSort: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductSortingBar;
