import { useState } from 'react';
import './ProductPage.css';
import Sidebar from '../../../components/ResponsiveAppBar';

export default function ProductPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{padding: isSidebarOpen ? '25px 25px 25px 275px' : '25px'}}>      
      <h1>Productos</h1>
      <p>Productos page content</p>
    </div>
    </div>
  );
}
