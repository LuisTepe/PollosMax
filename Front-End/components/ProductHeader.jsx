import React, { useState } from "react";
import buscarIcono from "/src/assets/img/buscar.png";
import "./ProductHeader.css";

function SearchBar({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // Llamar a la función de búsqueda y pasar el término de búsqueda
        handleSearch(value);
    };

    return (
        <div className="search-bar-container">
            <div className="search-icon-container">
                <img src={buscarIcono} alt="Icono de búsqueda" className="search-icon" />
            </div>
            <form>
                <input
                    type="text"
                    placeholder="Ingrese código o nombre del producto"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}

export default SearchBar;
