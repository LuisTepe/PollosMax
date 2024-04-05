import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Sidebar from '../../../components/ResponsiveAppBar';
import SearchBar from '../../../components/ProductHeader';
import ProductSortingBar from '../../../components/ProductSorting';
// import ProductList from '../../../components/ProductList';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [order, setOrder] = useState('asc');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Obtener los productos desde el app.get del back
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/productssale'); 
      setProducts(response.data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []); 

  // Funcion para ordenar lo que se reciba del back
  const handleSort = (field, newOrder) => {
    // Cambiar el estado del campo activo y el orden
    setActiveField(field);
    setOrder(newOrder);

    // Ordenar los productos según el campo y el orden
    const sortedProducts = [...products].sort((a, b) => {
      if (newOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    // Actualizar la lista de productos ordenados
    setProducts(sortedProducts);
  };

  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div style={{ padding: '25px', marginLeft: '275px' }}>
        <SearchBar />
        <ProductSortingBar handleSort={handleSort} products={products} />
        {/* <ProductList products={products} /> */}
      </div>
    </div>
  );
}
