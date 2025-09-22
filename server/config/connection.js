// Conexion a la base de datos
const mysql = require("mysql2")

// Configuración de la conexión
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "sga",
})

// Control de errores en la conexión
connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos: " + error.stack)
    return
  }
  console.log("Conexión exitosa a la base de datos MySQL. \n")
})
module.exports = connection

// Ejemplo de uso de la conexión
const query = "SELECT * from users"

connection.query(query, (error, results) => {
  if (error) {
    console.error("Error al ejecutar la consulta: " + error.stack)
    return
  }
  console.log("Query solicitado:" + query + "\n")
  console.log("Resultados de la consulta:")
  console.log(results)
})

// Cerrar la conexión
connection.end()
