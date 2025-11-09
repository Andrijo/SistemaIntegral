// --- Lógica de Biblioteca ---

// Espera a que el HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // 1. Simulación de Base de Datos de Libros
  const bibliotecaDB = [
    {
      id: 101,
      titulo: "Cálculo de una variable",
      autor: "James Stewart",
      disponible: true,
    },
    {
      id: 102,
      titulo: "Ingeniería de Software: Un Enfoque Práctico",
      autor: "Roger S. Pressman",
      disponible: false,
    },
    {
      id: 103,
      titulo: "Sistemas Operativos Modernos",
      autor: "Andrew S. Tanenbaum",
      disponible: true,
    },
    {
      id: 104,
      titulo: "Redes de Computadoras",
      autor: "Andrew S. Tanenbaum",
      disponible: true,
    },
  ]

  // 2. Simulación de Préstamos del Alumno
  let misPrestamos = [
    {
      id: 105,
      titulo: "Ingeniería de Software (9na Ed.)",
      fechaPrestamo: "01/11/2025",
      fechaVencimiento: "08/11/2025",
    },
  ]

  // 3. Referencias al DOM de Biblioteca
  const bibliotecaNav = document.querySelector(".biblioteca-nav")
  const bibliotecaPanes = document.querySelectorAll(".biblioteca-pane")
  const formBusqueda = document.getElementById("form-biblioteca-buscar")
  const inputBusqueda = document.getElementById("biblioteca-search-input")
  const resultadosDiv = document.getElementById("biblioteca-resultados")
  const tbodyPrestamos = document.getElementById("tbody-prestamos-actuales")

  // 4. Lógica de Pestañas (¡Con safety check!)
  // Revisamos que 'bibliotecaNav' no sea nulo antes de añadir el listener
  if (bibliotecaNav) {
    bibliotecaNav.addEventListener("click", (e) => {
      if (!e.target.classList.contains("biblioteca-tab-btn")) return

      const targetId = e.target.dataset.target

      // Quitar 'active' de todos los botones y pestañas
      bibliotecaNav
        .querySelectorAll(".biblioteca-tab-btn")
        .forEach((btn) => btn.classList.remove("active"))
      bibliotecaPanes.forEach((pane) => pane.classList.remove("active"))

      // Añadir 'active' al botón y pestaña correctos
      e.target.classList.add("active")
      const targetPane = document.getElementById(targetId)
      if (targetPane) {
        targetPane.classList.add("active")
      }
    })
  }

  // 5. Lógica de Búsqueda (¡Con safety check!)
  if (formBusqueda) {
    formBusqueda.addEventListener("submit", (e) => {
      e.preventDefault()
      const termino = inputBusqueda.value.toLowerCase()
      if (!termino) return

      const resultados = bibliotecaDB.filter(
        (libro) =>
          libro.titulo.toLowerCase().includes(termino) ||
          libro.autor.toLowerCase().includes(termino)
      )
      renderizarResultadosBusqueda(resultados)
    })
  }

  function renderizarResultadosBusqueda(resultados) {
    if (!resultadosDiv) return // Safety check
    resultadosDiv.innerHTML = "" // Limpiar resultados anteriores

    if (resultados.length === 0) {
      resultadosDiv.innerHTML =
        '<p class="placeholder-seleccion">No se encontraron libros con ese término.</p>'
      return
    }

    resultados.forEach((libro) => {
      const yaPrestado = misPrestamos.some((p) => p.id === libro.id)
      const solicitado =
        document.querySelector(`.btn-solicitar[data-id="${libro.id}"]`)
          ?.disabled || false

      const div = document.createElement("div")
      div.className = "libro-resultado"
      div.innerHTML = `
        <div>
          <div class="titulo">${libro.titulo}</div>
          <div class="autor">${libro.autor}</div>
          <div class="${libro.disponible ? "disponible" : "no-disponible"}">
            ${libro.disponible ? "Disponible" : "No Disponible"}
          </div>
        </div>
        <button 
          class="btn-primary btn-solicitar" 
          data-id="${libro.id}"
          ${!libro.disponible || yaPrestado || solicitado ? "disabled" : ""}>
          ${yaPrestado || solicitado ? "Solicitado" : "Solicitar Préstamo"}
        </button>
      `
      resultadosDiv.appendChild(div)
    })
  }

  // 6. Lógica de Préstamo (¡Con safety check!)
  if (resultadosDiv) {
    resultadosDiv.addEventListener("click", (e) => {
      if (!e.target.classList.contains("btn-solicitar")) return

      const btn = e.target
      const libroId = parseInt(btn.dataset.id)
      const libro = bibliotecaDB.find((l) => l.id === libroId)

      alert(
        `Has solicitado el préstamo de:\n\n"${libro.titulo}"\n\nPasa a la ventanilla de biblioteca para recogerlo.`
      )

      const hoy = new Date()
      const vencimiento = new Date()
      vencimiento.setDate(hoy.getDate() + 7)

      misPrestamos.push({
        id: libro.id,
        titulo: libro.titulo,
        fechaPrestamo: hoy.toLocaleDateString("es-ES"),
        fechaVencimiento: vencimiento.toLocaleDateString("es-ES"),
      })

      btn.disabled = true
      btn.textContent = "Solicitado"
      renderizarMisPrestamos()
    })
  }

  // 7. Lógica de Control (Renderizar "Mis Préstamos")
  function renderizarMisPrestamos() {
    if (!tbodyPrestamos) return // Safety check
    tbodyPrestamos.innerHTML = ""

    if (misPrestamos.length === 0) {
      tbodyPrestamos.innerHTML =
        '<tr><td colspan="4" style="text-align:center;">No tienes préstamos activos.</td></tr>'
      return
    }

    misPrestamos.forEach((prestamo) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${prestamo.titulo}</td>
        <td>${prestamo.fechaPrestamo}</td>
        <td>${prestamo.fechaVencimiento}</td>
        <td><button class="btn-renovar" data-id="${prestamo.id}">Renovar</button></td>
      `
      tbodyPrestamos.appendChild(tr)
    })
  }

  // 8. Carga inicial
  renderizarMisPrestamos()
}) // <-- FIN DEL WRAPPER DOMContentLoaded

// --- Fin de Lógica de Biblioteca ---
