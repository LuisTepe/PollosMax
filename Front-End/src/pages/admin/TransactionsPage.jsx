import { useState, useEffect } from "react";
import "./TransactionsPage.css";
import Sidebar from "../../../components/ResponsiveAppBar";
import axios from "axios";

const today = new Date();
today.setDate(today.getDate() + 2); // Agrega dos días a la fecha actual
const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
export default function TransactionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Para buscar transacciones
  const [startDate, setStartDate] = useState("2023-01-01"); // Para buscar por fecha de inicio
  const [endDate, setEndDate] = useState(formattedDate); // Para buscar por fecha de finalización

  //Funcion para obtener las transacciones
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transactions");
      setItems(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  //Funcion para buscar transacciones
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //Funcion para buscar por rango de fechas
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  //Funcion para buscar transacciones
  const filteredItems = items.filter(
    (item) =>
      (item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idTransaction.toString().includes(searchTerm) || 
      item.movementTypeName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      new Date(item.date) >= new Date(startDate) &&
      new Date(item.date) <= new Date(endDate)
  );

  return (
    <div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div style={{ padding: isSidebarOpen ? "0px 0px 0px 250px" : "0px" }}>
        <div className="div-search">
          <input
            type="search"
            placeholder="Buscar transaccion por Tipo o ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <input
            type="date"
            className="date-input"
            placeholder="Fecha de inicio"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            className="date-input"
            placeholder="Fecha de finalización"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div
          className="table-container"
          style={{ width: isSidebarOpen ? "83.7vw" : "100vw" }}
        >
          <table className="table">
            <thead style={{ backgroundColor: "purple", color: "white" }}>
              <tr>
                <th>ID Transaccion</th>
                <th>Usuario</th>
                <th>Tipo de movimiento</th>
                <th>Fecha</th>
                <th>Total de venta</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.idTransaction}>
                  <td>{item.idTransaction}</td>
                  <td>{item.username}</td>
                  <td>{item.movementTypeName}</td>
                  <td>{item.date}</td>
                  <td>{item.totalPrice} PESOS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}