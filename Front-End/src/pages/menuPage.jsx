import { useState } from 'react';
import axios from 'axios';
import './menuPage.css';
import Sidebar from '../../components/ResponsiveAppBar';
import PopupProduct from '../../components/PopUpProduct';
import PopUpCompra from '../../components/PopUpCompra';

export default function MenuPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [tableProducts, setTableProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopupCompra, setShowPopupCompra] = useState(false);

  const [color, setColor] = useState({
    color: 'rgba(117, 42, 116, 1)',
  })

  const [search, setSearch] = useState('');
  const [showPopupProduct, setShowPopupProduct] = useState(false);

  function handleOpenPopupProduct(product) {
    setSelectedProduct(product);
    setShowPopupProduct(true);
  }

  const handleClosePopupProduct = () => {
    setSelectedProduct(null);
    setShowPopupProduct(false);
  };

  // Filtra los productos basado en la búsqueda
  // Asumiendo que `product` es un objeto con una propiedad `productName` que es una cadena
  const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(search.toLowerCase()));

  const handleSearchChange = async (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    console.log(`Searching for: ${searchValue}`); // Imprime la consulta de búsqueda en la consola

    // Llama a tu API cuando el valor de búsqueda cambia
    try {
      const response = await axios.post('http://localhost:3000/search', { search: searchValue });
      setProducts(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function handleMouseUp() {
    setColor({
      color: 'rgba(117, 42, 116, 1)',
    })
  }

  function handleMouseDown() {
    setColor({
      color: 'rgba(155, 80, 154, 1)',
    })
  }

  function handleHover() {
    setColor({
      color: 'rgba(155, 80, 154, 0.5)',
    })
  }

  async function handleConfirm(quantity) {
    console.log('Confirming quantity:', quantity);
    console.log('Selected product:', selectedProduct);

    try {
      // Llama al backend para buscar el producto en la base de datos
      const response = await axios.post('http://localhost:3000/searchProductos', { id: selectedProduct.productName });
      const product = response.data[0];

      console.log('Fetched product:', product);

      // Crea un nuevo producto con productName y price del producto buscado y quantity del popup
      const newProduct = {
        productName: selectedProduct.productName,
        price: product.productPrice,
        quantity: quantity
      };
      console.log('New product:', newProduct);

      setTableProducts(prevTableProducts => [...prevTableProducts, newProduct]);
      handleClosePopupProduct();
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  function handleClearTable() {
    setTableProducts([]); // Limpia los productos de la tabla
  }

  function handleOpenPopupCompra() {
    setShowPopupCompra(true); // Abre el popup de compra
  }

  function handleClosePopupCompra() {
    setShowPopupCompra(false); // Cierra el popup de compra
  }

  // Calcular el total
  const total = tableProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const roundedTotal = Math.ceil(total);

  return (
    <div className='d-flex' style={{ background: '#faf0d2', position: 'initial', flexWrap: 'wrap' }}>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{ padding: isSidebarOpen ? '0px 240px 150px 240px' : '0px 0px 150px 40px', position: 'initial' }}>
        <div className="wrapper" style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 22, borderTopStyle: 'none' }}>
          <div id="content" style={{ background: '#FAF0D2', borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271' }}>
            <div style={{ marginTop: 10, marginLeft: 30 }}>
              <h1 style={{ fontSize: 25, fontFamily: 'Allerta, sans-serif' }}>Expendio Bachoco</h1>
              <h1 style={{ fontFamily: 'Allerta, sans-serif', fontSize: 38 }}>EL POLLO MAX</h1>
            </div>
            <div className="d-flex justify-content-between" style={{ marginTop: 50, marginLeft: 50 }}>
              <div className='d-flex' style={{ background: '#faf0d2', position: 'initial', flexWrap: 'wrap', overflow: 'hidden' }}>
                <table className="table table-borderless">
                  <thead style={{ background: '#FAF0D2' }}>
                    <tr style={{ background: '#FAF0D2' }}>
                      <th style={{ background: '#faf0d2', fontSize: 25, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color: 'black' }}>Producto</th>
                      <th style={{ background: '#faf0d2', fontSize: 25, marginRight: 0, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color: 'black' }}>Cantidad</th>
                      <th style={{ background: '#faf0d2', fontSize: 25, width: 100, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color: 'black' }}>P.U.</th>
                      <th style={{ background: '#faf0d2', fontSize: 25, marginRight: 0, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color: 'black' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableProducts.map((product, index) => (
                      <tr key={index}>
                        <td style={{ background: '#faf0d2', borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border: 'none' }}>{product.productName}</td>
                        <td style={{ background: '#faf0d2', borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border: 'none' }}>{product.quantity}</td>
                        <td style={{ background: '#faf0d2', width: 100, borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border: 'none' }}>{product.price}</td>
                        <td style={{ background: '#faf0d2', borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border: 'none' }}>{product.quantity * product.price}</td>
                      </tr>
                    ))}
                    <tr>
                      <td style={{ background: '#faf0d2', borderTopColor: '#7c3271', borderLeft: '0px', borderRight: '0px', borderBottom: '0px', borderRadius: '0px' }}></td>
                      <td style={{ background: '#faf0d2', borderTopColor: '#7c3271', borderLeft: '0px', borderRight: '0px', borderBottom: '0px', borderRadius: '0px' }}></td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, borderTopColor: '#7c3271', borderLeft: '0px', borderRight: '0px', borderBottom: '0px', borderRadius: '0px' }}>Total</td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, borderTopColor: '#7c3271', borderLeft: '0px', borderRight: '0px', borderBottom: '0px', borderRadius: '0px' }}>${total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style={{ background: '#faf0d2', border: 'none' }}></td>
                      <td style={{ background: '#faf0d2', border: 'none' }}></td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, border: 'none' }}>Redondeo</td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, border: 'none' }}>${roundedTotal}</td>
                    </tr>
                  </tbody>
                </table>

                <button style={{ width: 200, height: 60, fontFamily: 'Allerta, sans-serif', fontSize: 18, border: 'none', background: color.color, outline: 'none', marginLeft: 70, marginRight: 70 }} onClick={handleClearTable}>Limpiar Carrito</button>
                <button style={{ width: 200, height: 60, fontFamily: 'Allerta, sans-serif', fontSize: 24, border: 'none', background: color.color, outline: 'none' }} onClick={handleOpenPopupCompra}>Cobrar</button>
              </div>

              <div style={{ marginLeft: 50 }}>
                <label className="form-label" style={{ fontFamily: 'Allerta, sans-serif', fontSize: 25, color: 'var(--bs-emphasis-color)', marginLeft: 20 }}>Buscar:&nbsp;</label>
                <input
                  type="search"
                  style={{ background: '#faf0d2', width: 160, outline: 'none', color: 'black', padding: '0px 10px' }}
                  value={search}
                  onChange={handleSearchChange}
                />
                <div>
                  <ul className="list-group">
                    {filteredProducts.map((product, index) => (
                      <li key={index} className="list-group-item d-xl-flex justify-content-xl-center" style={{ background: '#faf0d2', border: 'none', color: 'rgb(255,255,255)' }}>
                        <button
                          onClick={() => handleOpenPopupProduct(product)}
                          className="btn btn-primary"
                          type="button"
                          style={{ width: 270, height: 60, fontFamily: 'Allerta, sans-serif', fontSize: 24, border: 'none', background: color.color, outline: 'none' }}
                          onMouseUp={handleMouseUp}
                          onMouseDown={handleMouseDown}
                          onMouseOver={handleHover}
                          onMouseLeave={handleMouseUp}
                        >
                          {product.productName}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {showPopupProduct && (
                  <PopupProduct
                    onClose={handleClosePopupProduct}
                    onConfirm={handleConfirm}
                    productName={selectedProduct.productName}
                  />
                )}
                {showPopupCompra && (
                  <PopUpCompra 
                    onClose={handleClosePopupCompra} 
                    total={total}
                    onPago={handleClearTable}
                  />
                
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
