import PropTypes from "prop-types";
import { useState } from 'react';
import axios from 'axios';
import './PopUpInsert.css';

async function fetchProducts() {
    try {
        const response = await axios.get("http://localhost:3000/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function addProduct(product) {
    try {
        const response = await axios.post(
            "http://localhost:3000/insertProduct",
            product
        );
        console.log(response.data.message);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const PopupInsert = ({ onClose }) => {
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productUnit, setProductUnit] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [minimumAmount, setMinimumAmount] = useState("");

    const [color, setColor] = useState({
        color: "rgba(0, 0, 0, 1)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderTopColor: "rgba(0, 0, 0, 1)",
        borderRightColor: "rgba(0, 0, 0, 1)",
        borderBottomColor: "rgba(0, 0, 0, 1)",
    });

    const handleMouseUp = () => {
        setColor({
            color: "rgba(0, 0, 0, 1)",
            borderColor: "rgba(0, 0, 0, 1)",
            borderTopColor: "rgba(0, 0, 0, 1)",
            borderRightColor: "rgba(0, 0, 0, 1)",
            borderBottomColor: "rgba(0, 0, 0, 1)",
        });
    };

    const handleMouseDown = () => {
        setColor({
            color: "rgba(30, 30, 30, 1)",
            borderColor: "rgba(30, 30, 30, 1)",
            borderTopColor: "rgba(30, 30, 30, 1)",
            borderRightColor: "rgba(30, 30, 30, 1)",
            borderBottomColor: "rgba(30, 30, 30, 1)",
        });
    };

    const handleHover = () => {
        setColor({
            color: "rgba(30, 30, 30, 1)",
            borderColor: "rgba(30, 30, 30, 1)",
            borderTopColor: "rgba(30, 30, 30, 1)",
            borderRightColor: "rgba(30, 30, 30, 1)",
            borderBottomColor: "rgba(30, 30, 30, 1)",
        });
    };

    const handleAddProduct = async () => {
        try {
            await addProduct({
                productName,
                productPrice,
                productAmount: currentAmount,
                idProductType: productType,
                idUnit: productUnit,
                minimumAmount,
            });
            console.log("Producto insertado correctamente");
            onClose();

            // Obtener la lista actualizada de productos después de agregar uno nuevo
            const updatedProducts = await fetchProducts();
            // Actualizar la lista de productos en el componente
            setProductName("");
            setProductType("");
            setProductUnit("");
            setProductPrice("");
            setCurrentAmount("");
            setMinimumAmount("");
        } catch (error) {
            console.error("Error al insertar producto:", error);
        }
    };

    const handleProductNameChange = (e) => {
        const value = e.target.value;
        // Solo permite letras y espacios en blanco
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setProductName(value);
        }
    };

    const handlePriceChange = (e) => {
        let value = e.target.value;
        // Permite solo números positivos y ajusta el valor máximo a 999999
        if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) <= 999999)) {
            setProductPrice(value);
        }
    };

    const handleCurrentAmountChange = (e) => {
        let value = e.target.value;
        // Permite solo números positivos y ajusta el valor máximo a 99999
        if (value === '' || (/^\d*\.?\d*$/.test(value) && parseInt(value) <= 99999)) {
            setCurrentAmount(value);
        }
    };

    const handleMinimumAmountChange = (e) => {
        let value = e.target.value;
        // Permite solo números positivos y ajusta el valor máximo a 99999
        if (value === '' || (/^\d*\.?\d*$/.test(value)&& parseInt(value) >= .1 && parseInt(value) <= 99999)) {
            setMinimumAmount(value);
        }
    };

    const handleKeyPress = (e) => {
        // Permitir números, el punto y el borrado (tecla Backspace)
        if (!/^[\d.]*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    const isFormValid = productName && productType && productUnit && productPrice && currentAmount && minimumAmount;

    return (
        <div className="modal-container" id="modal">
            <div className="modal-content d-inline-flex justify-content-lg-center align-items-lg-center" style={{ background: 'rgb(251, 225, 147)', width: '40vw', height: '95vh', padding: '0px', borderRadius: '10px', border: '2px solid var(--bs-emphasis-color)', marginBottom: '0px' }}>
                <div style={{ width: '350px', textAlign: 'center', height: '500px', marginBottom: '185px' }}>
                    <div className="d-lg-flex justify-content-lg-end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-x d-lg-flex align-content-around align-self-end order-1 justify-content-lg-end align-items-lg-start" style={{ width: '40px', height: '40px', cursor: 'pointer' }} onClick={onClose}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                        </svg>
                    </div>
                    <div>
                        <p style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Allerta', marginTop: '0px', marginBottom: '0px' }}>Agregar producto</p>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Nombre</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="text" value={productName} onChange={handleProductNameChange} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Tipo de producto</p>
                    </div>
                    <div>
                        <select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px', width: '330px', borderRadius: '5px', color: 'rgb(0,0,0)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)' }}
                        >
                            <option value="" disabled hidden>Selecciona el tipo de producto</option>
                            <option value="1" style={{ color: 'rgb(0,0,0)' }}>Almacen</option>
                            <option value="2" style={{ color: 'rgb(0,0,0)' }}>Comercial</option>
                        </select>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Tipo de unidad</p>
                    </div>
                    <div>
                        <select
                            value={productUnit}
                            onChange={(e) => setProductUnit(e.target.value)}
                            style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'center', fontSize: '15px', width: '330px', borderRadius: '5px', color: 'rgb(0,0,0)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)' }}
                        >
                            <option value="" disabled hidden >Selecciona la unidad</option>
                            <option value="1" style={{ color: 'rgb(0,0,0)' }}>KG</option>
                            <option value="2" style={{ color: 'rgb(0,0,0)' }}>Unidades</option>
                            <option value="3" style={{ color: 'rgb(0,0,0)' }}>Piezas</option>
                        </select>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Precio</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="text" value={productPrice} onChange={handlePriceChange} onKeyPress={handleKeyPress} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad actual en almacén</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="text" value={currentAmount} onChange={handleCurrentAmountChange} onKeyPress={handleKeyPress} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <p style={{ marginTop: '10px', fontFamily: 'Allerta', textAlign: 'left', fontSize: '18px' }}>Cantidad mínima de alerta en almacén</p>
                    </div>
                    <div>
                        <div className="text-start" style={{ borderRadius: '5px', color: 'rgb(157,153,153)', background: '#D9D9D9', padding: '2px', border: '2px solid var(--bs-emphasis-color)', width: '330px' }}>
                            <input type="text" value={minimumAmount} onChange={handleMinimumAmountChange} onKeyPress={handleKeyPress} style={{ color: 'black', background: 'rgba(255,255,255,0)', borderColor: 'rgba(194,186,186,0)', outline: 'none' }} />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleAddProduct}
                            disabled={!isFormValid}
                            className="btn btn-primary"
                            type="button"
                            style={{
                                marginTop: '20px',
                                fontFamily: 'Allerta',
                                background: color.color,
                                borderWidth: '5px',
                                borderColor: color.borderColor,
                                borderTopColor: color.borderTopColor,
                                borderRightColor: color.borderRightColor,
                                borderBottomColor: color.borderBottomColor,
                                outline: 'none'
                            }}
                            onMouseUp={handleMouseUp}
                            onMouseDown={handleMouseDown}
                            onMouseOver={handleHover}
                            onMouseLeave={handleMouseUp}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

PopupInsert.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default PopupInsert;
