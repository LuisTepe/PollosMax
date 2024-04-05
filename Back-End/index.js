const express = require("express");
const app = new express();
const cors = require("cors");
const path = require("path");

const db = require('./config/config_db');

app.use(cors());

//busca el dist de electron que es estatico
app.use(express.static(path.join(__dirname, '..', 'Front-End', 'dist'))) //modificar para poner donde esté el dist de react, se puede poner el dist en otra parte

app.get('/', (req, res) => {
//Manda a la ruta origen el index.html(dist/build) a la pantalla que se abre con express-electron
res.sendFile(path.join(__dirname,  '..', 'Front-End', 'dist', 'index.html')); //poner donde se encuentra el index del dist
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
app.set('json spaces', 2);


app.use(express.urlencoded({ extended: true }));//Para poder recibir datos de un formulario

app.use(express.json());//Para poder recibir datos en formato JSON 

app.post('/login', async (req, res) => {
  const { user, pass } = req.body;

  if (!user || !pass) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const query = `SELECT idUser, username, password, userTypeName FROM user, userType WHERE username = ? AND password = ? AND user.idUserType = userType.idUserType AND userStatus = 'ACTIVO'`;
    const [result] = await db.query(query, [user, pass]);

    if (result.length === 0) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    res.status(200).json(result[0]);

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});

//funcion para obtener el inventario
app.get('/inventory', async (req, res) => {
  try {
    const query = `SELECT * FROM product a 
    INNER JOIN unit b on a.idUnit = b.idUnit 
    INNER JOIN producttype c on a.idProductType = c.idProductType 
    ORDER BY idProduct ASC`;
    const [result] = await db.query(query);

    res.status(200).json(result);

  } catch (error) {
    console.error("Error during fetching inventory:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});

//funcion para actualizar la cantidad minima de un producto
app.put('/updateInventoryAmount', async (req, res) => {
  const { idProduct, minimumAmount } = req.body;

  if (!idProduct || minimumAmount === undefined) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  try {
    const query = `UPDATE product SET minimumAmount = ? WHERE idProduct = ?`;
    await db.query(query, [minimumAmount, idProduct]);

    res.status(200).json({ message: "Producto actualizado con éxito" });

  } catch (error) {
    console.error("Error during product update:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});

//Funcion para agregar un producto
app.post('/addInventoryProduct', async (req, res) => {
  const { idProductType, idUnit, productName, productAmount, minimumAmount, productPrice } = req.body;

  if ( !idProductType || !idUnit || !productName || productAmount === undefined || minimumAmount === undefined || productPrice === undefined) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  try {
    const query = `INSERT INTO product (idProductType, idUnit, productName, productAmount, minimumAmount, productPrice) VALUES (?, ?, ?, ?, ?, ?)`;
    await db.query(query, [idProductType, idUnit, productName, productAmount, minimumAmount, productPrice]);

    res.status(200).json({ message: "Producto agregado con éxito" });

  } catch (error) {
    console.error("Error durante la creación del producto:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }});



//CRUD de la sección de productos

app.get('/products', async(req,res) =>{
  try {
    const query = `SELECT idProduct, productName, productPrice, productAmount FROM product;`;
    const [result] = await db.query(query);

    res.status(200).json(result);

  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});



app.post('/insertProduct', async (req, res) => {
  try {
      const { productName, productPrice, productAmount, idProductType, idUnit, minimumAmount } = req.body;

      // Verificar si todos los campos requeridos están presentes en la solicitud
      if (!productName || !productPrice || !productAmount || !idProductType || !idUnit || !minimumAmount) {
          return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }

      const query = `
          INSERT INTO product (idProductType, idUnit, productName, productAmount, minimumAmount, productPrice)
          VALUES (?, ?, ?, ?, ?, ?);
      `;
      const result = await db.query(query, [idProductType, idUnit, productName, productAmount, minimumAmount, productPrice]);

      const insertedId = result.insertId;

      res.status(200).json({ message: 'Producto insertado correctamente.', insertedId });
  } catch (error) {
      console.error("Error al insertar producto:", error);
      res.status(500).json({ message: "Error al insertar el producto en la base de datos" });
  }
});



app.put('/updateProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productPrice, productAmount } = req.body;

    if (!productName || !productPrice || !productAmount) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const query = `
      UPDATE product
      SET productName = ?, productPrice = ?, productAmount = ?
      WHERE idProduct = ?;
    `;
    await db.query(query, [productName, productPrice, productAmount, id]);

    res.status(200).json({ message: 'Producto modificado correctamente.' });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto en la base de datos" });
  }
});

app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM product
      WHERE idProduct = ?;
    `;
    await db.query(query, [id]);

    res.status(200).json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto de la base de datos" });
  }
});

//funcion search, regresar nomre de productos que coincidan con la busqueda
app.post('/search', async (req, res) => {
  try {
    const { search } = req.body;
    const query = `SELECT productName FROM product WHERE productName LIKE ? AND idProductType = 2;`;
    const [result] = await db.query(query, [`%${search}%`]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});

// Función searchProductos, regresa productos que coincidan con la búsqueda
app.post('/searchProductos', async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Received id:", id); // Log the received id

    const query = `SELECT productPrice FROM product WHERE productName LIKE ? AND idProductType = 2 LIMIT 1`;
    console.log("Query:", query); // Log the query

    const [result] = await db.query(query, [id]);

    console.log("Result:", result); // This should print the result
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});

app.get('/productssale', async(req,res) =>{
  try {
    const query = `SELECT idProduct, productName, productPrice, productAmount FROM product WHERE idProductType = 2;`;
    const [result] = await db.query(query);

    res.status(200).json(result);

  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});
