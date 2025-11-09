// --- Lógica de Inscripciones ---

// 1. Define los datos (simulación de una base de datos)
const materiasDisponiblesDB = [
  {
    id: 1,
    clave: "FS2",
    nombre: "Tópicos Avanzados de Programación",
    grupo: "A",
    aula: "S1",
    horario: "L-V 10:00-11:00",
  },
  {
    id: 2,
    clave: "1P8",
    nombre: "Sistemas Programables",
    grupo: "B",
    aula: "D2",
    horario: "L-V 8:00-9:00",
  },
  {
    id: 3,
    clave: "2P8",
    nombre: "Taller de Investigación I",
    grupo: "A",
    aula: "E3",
    horario: "L-J 12:00-13:00",
  },
  {
    id: 4,
    clave: "2P8",
    nombre: "Taller de Investigación I",
    grupo: "C",
    aula: "E4",
    horario: "M-V 14:00-15:00",
  },
  {
    id: 5,
    clave: "3P8",
    nombre: "Cómputo en la Nube",
    grupo: "A",
    aula: "S3",
    horario: "L-V 16:00-17:00",
  },
]

// 2. Define el "estado" (las materias que el usuario ha seleccionado)
let materiasSeleccionadas = []

// 3. Referencias a los elementos del DOM
const listaDisponiblesEl = document.getElementById("lista-materias-disponibles")
const listaSeleccionadasEl = document.getElementById(
  "lista-materias-seleccionadas"
)
const tituloSeleccionadasEl = document.getElementById("titulo-seleccionadas")
const btnGuardar = document.getElementById("btn-guardar-seleccion")
const btnLimpiar = document.getElementById("btn-limpiar-seleccion")

// 4. Funciones de "Render" (dibujar en la pantalla)

function renderizarMateriasDisponibles() {
  listaDisponiblesEl.innerHTML = "" // Limpiar lista

  if (materiasDisponiblesDB.length === 0) {
    listaDisponiblesEl.innerHTML =
      '<li class="placeholder-seleccion">No hay materias disponibles.</li>'
    return
  }

  materiasDisponiblesDB.forEach((materia) => {
    // Comprobar si ya está seleccionada
    const yaSeleccionada = materiasSeleccionadas.some(
      (sel) => sel.id === materia.id
    )

    const li = document.createElement("li")
    li.className = "materia-item"
    if (yaSeleccionada) {
      li.classList.add("seleccionada")
    }

    li.innerHTML = `
      <div>
        <strong>${materia.nombre} (${materia.clave})</strong><br />
        Grupo: ${materia.grupo} | Aula: ${materia.aula} | Horario: ${
      materia.horario
    }
      </div>
      <button 
        class="btn-primary btn-add" 
        data-id="${materia.id}"
        ${yaSeleccionada ? "disabled" : ""}>
        ${yaSeleccionada ? "Añadida" : "Añadir"}
      </button>
    `
    listaDisponiblesEl.appendChild(li)
  })
}

function renderizarMateriasSeleccionadas() {
  listaSeleccionadasEl.innerHTML = "" // Limpiar lista
  tituloSeleccionadasEl.textContent = `Tu Selección (${materiasSeleccionadas.length} Materias)`

  if (materiasSeleccionadas.length === 0) {
    listaSeleccionadasEl.innerHTML =
      '<li class="placeholder-seleccion">Aún no has seleccionado materias.</li>'
    return
  }

  materiasSeleccionadas.forEach((materia) => {
    const li = document.createElement("li")
    li.className = "materia-item-seleccionada"
    li.innerHTML = `
      <div>
        <strong>${materia.nombre} (${materia.grupo})</strong><br />
        <small>${materia.horario}</small>
      </div>
      <button class="btn-delete" data-id="${materia.id}">Eliminar</button>
    `
    listaSeleccionadasEl.appendChild(li)
  })
}

// 5. Funciones de "Manejo de Eventos" (Add, Delete, Edit)

function handleAñadirMateria(id) {
  // Encontrar la materia en la "base de datos"
  const materiaAñadir = materiasDisponiblesDB.find((m) => m.id === id)

  // Evitar duplicados (aunque el botón esté deshabilitado, es buena práctica)
  if (!materiasSeleccionadas.some((sel) => sel.id === id)) {
    materiasSeleccionadas.push(materiaAñadir)
  }

  // "Editar" en este caso significa que puedes añadir otra del mismo nombre
  // pero diferente grupo. La lógica actual añade por ID único.

  // Volver a dibujar ambas listas
  renderizarMateriasDisponibles()
  renderizarMateriasSeleccionadas()
}

function handleEliminarMateria(id) {
  // Filtrar la materia fuera del array de seleccionadas
  materiasSeleccionadas = materiasSeleccionadas.filter((m) => m.id !== id)

  // Volver a dibujar ambas listas
  renderizarMateriasDisponibles()
  renderizarMateriasSeleccionadas()
}

function handleLimpiarSeleccion() {
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar toda tu selección?"
  )
  if (confirmar) {
    materiasSeleccionadas = []
    renderizarMateriasDisponibles()
    renderizarMateriasSeleccionadas()
  }
}

function handleGuardarSeleccion() {
  if (materiasSeleccionadas.length === 0) {
    alert("No has seleccionado ninguna materia para guardar.")
    return
  }
  // En una app real, aquí enviarías 'materiasSeleccionadas' al servidor
  alert(
    `Selección guardada con éxito:\n\n` +
      materiasSeleccionadas
        .map((m) => ` - ${m.nombre} (Grupo ${m.grupo})`)
        .join("\n")
  )
}

// 6. "Pegar" los eventos a los botones
// Usamos delegación de eventos para no añadir un listener por cada botón

listaDisponiblesEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    const id = parseInt(e.target.dataset.id)
    handleAñadirMateria(id)
  }
})

listaSeleccionadasEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = parseInt(e.target.dataset.id)
    handleEliminarMateria(id)
  }
})

btnGuardar.addEventListener("click", handleGuardarSeleccion)
btnLimpiar.addEventListener("click", handleLimpiarSeleccion)

// 7. Carga inicial
// Llamar a las funciones de render cuando la página cargue
renderizarMateriasDisponibles()
renderizarMateriasSeleccionadas()

// --- Fin de Lógica de Inscripciones ---
