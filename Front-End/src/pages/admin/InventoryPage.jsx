import { useState, useEffect } from "react";
import "./InventoryPage.css";
import Sidebar from "../../../components/ResponsiveAppBar";
import notificacion from "../../assets/img/notificacion.png";
import axios from "axios";
import EditMinimumAmountPopup from "../../../components/PopUpInventory";
import AddProductPopup from '../../../components/PopUpUpdateInventory';

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
  const [isAdding, setIsAdding] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Para buscar productos

  //Funcion para obtener el inventario
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/inventory");
      setItems(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  //Funcion para agregar un producto
  async function addProduct(product) {
    try {
      const response = await axios.post(
        "http://localhost:3000/addInventoryProduct",
        product
      );
  
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //Funcion para buscar productos
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  //Funcion para obtener el inventario
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

  //Funcion para buscar productos
  const filteredItems = items.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idProduct.toString().includes(searchTerm)
  );

  //Funcion para editar la cantidad minima de un producto
  const startEditing = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  //Funcion para cerrar el popup
  const stopEditing = () => {
    setIsEditing(false);
  };

  //Funcion para guardar la cantidad minima de un producto
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

  //Funcion para guardar la cantidad minima de un producto
  const handleSaveAdd = async (product) => {
    await addProduct(product);
    setIsAdding(false); // Cierra el popup después de guardar
    fetchItems(); // Actualiza la lista de productos
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
            placeholder="Buscar producto por nombre o ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="btnAdd" onClick={() => setIsAdding(true)}>Agregar producto</button>
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
                <tr key={item.idProduct}>
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
                    {item.productTypeName}
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
                      className="notificacion-img"
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
      {isAdding && (
        <AddProductPopup onClose={() => setIsAdding(false)} onSave={handleSaveAdd} />
      )}
    </div>
  );
}
