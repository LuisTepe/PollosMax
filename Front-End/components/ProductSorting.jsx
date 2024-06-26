import React, { useState } from 'react';
import PropTypes from "prop-types";
import flechaAbajo from "/src/assets/img/caret-abajo.png";
import flechaArriba from "/src/assets/img/caret-flecha-hacia-arriba.png";
import "./ProductSorting.css"
import editar from "/src/assets/img/editar.png";
import borrar from "/src/assets/img/borrar.png";
import agregar from "/src/assets/img/agregar2.png";
import PopupDelete from './PopUpDelete'; 
import PopupUpdate from './PopUpUpdate'; 
import PopupInsert from './PopUpInsert';
import SearchBar from './ProductHeader';

function ProductSortingBar({ handleSort, products }) {

   // Controlar si el pop-up de eliminación está abierto o cerrado
   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  
   // Controlar si el pop-up de actualización está abierto o cerrado
   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
 
   // Controlar si el pop-up de inserción está abierto o cerrado
   const [isInsertPopupOpen, setIsInsertPopupOpen] = useState(false);

   // ID del producto activo para edición o eliminación
   const [activeProductId, setActiveProductId] = useState(null);
 
   // Abrir el pop-up de delete al hacer clic en el botón de borrar
   const handleDeleteButtonClick = (productId) => {
     setIsDeletePopupOpen(true);
     setIsEditPopupOpen(false); // Asegúrate de que el popup de edición esté cerrado al abrir el de eliminación
     setActiveProductId(productId); // Establecer el productId activo
   };

   // Abrir el pop-up de update al hacer clic en el botón de editar
   const handleEditButtonClick = (productId) => {
     setIsEditPopupOpen(true);
     setIsDeletePopupOpen(false); // Asegúrate de que el popup de eliminación esté cerrado al abrir el de edición
     setActiveProductId(productId); // Establecer el idProduct del producto seleccionado
   };
 
   // Abrir el pop-up de insert al hacer clic en el botón de agregar
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
             
           >
             Código
           </button>
           <button
             className={activeField === 'name' ? 'active' : ''}
           
           >
             Nombre
           </button>
           <button
             className={activeField === 'price' ? 'active' : ''}
         
           >
             Precio
           </button>
           <button
             className={activeField === 'stock' ? 'active' : ''}
            
           >
             Stock
           </button>
           
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
                   <button className="edit-button" onClick={() => handleEditButtonClick(product.idProduct)}>
                     <img src={editar} alt="Editar" className="edit-icon" />
                   </button>
                   <button className="delete-button"  onClick={() => handleDeleteButtonClick(product.idProduct)}>
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
       {isDeletePopupOpen && <PopupDelete onClose={() => setIsDeletePopupOpen(false)} idProduct={activeProductId} />}
       {isInsertPopupOpen && <PopupInsert onClose={() => setIsInsertPopupOpen(false)} />}
       {isEditPopupOpen && (
         <PopupUpdate
           onClose={() => setIsEditPopupOpen(false)} // Cierra el popup de edición
           idProduct={activeProductId}
           product={products.find(product => product.idProduct === activeProductId)}
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
