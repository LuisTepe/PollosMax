import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Sidebar from '../../../components/ResponsiveAppBar';
import SearchBar from '../../../components/ProductHeader';
import ProductSortingBar from '../../../components/ProductSorting';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [order, setOrder] = useState('asc');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Función para obtener la lista de productos desde el servidor
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/productssale');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  // Llamar a fetchProducts cuando se monte el componente y cuando cambie el estado de products
  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, [products]); 

  // Función para agregar un nuevo producto
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3000/insertProduct', newProduct);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await addProduct(newProduct);
      // Después de agregar el producto, volvemos a llamar a fetchProducts para actualizar la lista de productos
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Función para ordenar los productos
  const handleSort = (field, newOrder) => {
    setActiveField(field);
    setOrder(newOrder);

    const sortedProducts = [...products].sort((a, b) => {
      if (newOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setProducts(sortedProducts);
  };

  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <div style={{ padding: '25px', marginLeft: '275px' }}>
        <SearchBar />
        <ProductSortingBar handleSort={handleSort} products={products} />

      </div>
    </div>
  );
}
