import { useState, useEffect } from "react";
import "./InventoryPage.css";
import Sidebar from "../../../components/ResponsiveAppBar";
import notificacion from "../../assets/img/notificacion.png";
import axios from "axios";
import EditMinimumAmountPopup from "../../../components/PopUpInventory";

async function updateInventoryAmount(idProduct, minimumAmount) {
  try {
    const response = await axios.put(
      "http://localhost:3000/updateInventoryAmount",
      {
        idProduct,
        minimumAmount,
      }
    );

    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function InventoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Cambia esto para que searchTerm sea modificable

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/inventory");
      setItems(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/inventory")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idProduct.toString().includes(searchTerm)
  );

  const startEditing = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  const handleSave = async (minimumAmount) => {
    await updateInventoryAmount(currentItem.idProduct, minimumAmount);
    setItems(
      items.map((item) =>
        item.idProduct === currentItem.idProduct
          ? { ...item, minimumAmount: minimumAmount }
          : item
      )
    );
    fetchItems();
    stopEditing();
  };

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
            placeholder="Buscar por Nombre del Producto o por ID del Producto..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div
          className="table-container"
          style={{ width: isSidebarOpen ? "83.7vw" : "100vw" }}
        >
          <table className="table">
            <thead style={{ backgroundColor: "purple", color: "white" }}>
              <tr>
                <th>ID Producto</th>
                <th>Tipo de Producto</th>
                <th>Nombre del Producto</th>
                <th>Cantidad del Producto</th>
                <th>Cantidad Mínima</th>
                <th>Tipo de Unidad</th>
                <th>Notificación</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      backgroundColor:
                        item.productAmount < item.minimumAmount
                          ? "#F5B470"
                          : "#90EE90",
                    }}
                  >
                    {item.idProduct}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        item.productAmount < item.minimumAmount
                          ? "#F5B470"
                          : "#90EE90",
                    }}
                  >
                    {item.idProductType}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        item.productAmount < item.minimumAmount
                          ? "#F5B470"
                          : "#90EE90",
                    }}
                  >
                    {item.productName}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        item.productAmount < item.minimumAmount
                          ? "#F5B470"
                          : "#90EE90",
                    }}
                  >
                    {item.productAmount}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        item.productAmount < item.minimumAmount
                          ? "#F5B470"
                          : "#90EE90",
                    }}
                  >
                    {item.minimumAmount}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        item.productAmount < item.minimumAmount
                          ? "#F5B470"
                          : "#90EE90",
                    }}
                  >
                    {item.unitName}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        item.productAmount < item.minimumAmount
                          ? "#F5B470"
                          : "#90EE90",
                    }}
                  >
                    <img
                      src={notificacion}
                      onClick={() => startEditing(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditing && (
        <EditMinimumAmountPopup
          onClose={stopEditing}
          item={currentItem}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
