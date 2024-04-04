import { useState } from 'react';
import './TransactionsPage.css';
import Sidebar from '../../../components/ResponsiveAppBar';

export default function TransactionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{padding: isSidebarOpen ? '25px 25px 25px 275px' : '25px'}}>     
       <h1>Transacciones</h1>
      <p>Transacciones page content</p>
    </div>
    </div>
  );
}
