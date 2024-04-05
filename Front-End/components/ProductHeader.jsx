import React, { useState } from "react";
import buscarIcono from "/src/assets/img/buscar.png";
import "./ProductHeader.css"

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    return (
      <div className="search-bar-container"> 
        <div className="search-icon-container"> 
          <img src={buscarIcono} alt="Icono de búsqueda" className="search-icon" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingrese código o nombre del producto"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
    );
  }
  
  export default SearchBar;

