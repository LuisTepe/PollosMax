import { useState } from 'react';
import './ReportsPage.css';
import Sidebar from '../../../components/ResponsiveAppBar';

export default function ProductAdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{padding: isSidebarOpen ? '25px 25px 25px 275px' : '25px'}}>      
      <h1>ProductosAdmin</h1>
      <p>ProductosAdmin page content</p>
    </div>
    </div>
  );
}
