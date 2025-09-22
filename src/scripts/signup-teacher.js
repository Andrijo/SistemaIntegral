// Variables globales
let matriculaCounter = 1
const currentDate = new Date()

// Formatear fecha
function formatDate(date) {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Generar matrícula de tutor
function generateMatriculaTutor() {
  const year = currentDate.getFullYear().toString().slice(-2)
  const numero = matriculaCounter.toString().padStart(4, "0")
  return `TUT-${year}${numero}`
}

// Actualizar matrícula en tiempo real
function updateMatricula() {
  const matricula = generateMatriculaTutor()
  document.getElementById("matriculaPreview").textContent = matricula
}

// Inicializar página
function init() {
  // Mostrar fecha actual
  document.getElementById("fechaRegistro").textContent = formatDate(currentDate)

  // Generar matrícula inicial
  updateMatricula()

  // Actualizar contador desde localStorage si existe
  const savedCounter = localStorage.getItem("tutorCounter")
  if (savedCounter) {
    matriculaCounter = parseInt(savedCounter) + 1
    updateMatricula()
  }
}

// Validar formulario
function validateForm(formData) {
  const errors = []

  if (formData.nombre.length < 3) {
    errors.push("El nombre debe tener al menos 3 caracteres")
  }

  if (!formData.email.includes("@")) {
    errors.push("Email inválido")
  }

  if (!/^[0-9]{10}$/.test(formData.telefono)) {
    errors.push("El teléfono debe tener 10 dígitos")
  }

  if (!formData.especialidad) {
    errors.push("Debes seleccionar una especialidad")
  }

  if (formData.username.length < 4) {
    errors.push("El nombre de usuario debe tener al menos 4 caracteres")
  }

  if (formData.password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres")
  }

  return errors
}

// Mostrar mensajes
function showMessage(type, message) {
  const successMsg = document.getElementById("successMessage")
  const errorMsg = document.getElementById("errorMessage")

  if (type === "success") {
    successMsg.textContent = message
    successMsg.style.display = "block"
    errorMsg.style.display = "none"
  } else {
    errorMsg.textContent = message
    errorMsg.style.display = "block"
    successMsg.style.display = "none"
  }

  // Scroll hacia arriba para ver el mensaje
  document.querySelector(".container").scrollTop = 0
}

// Guardar tutor (simulado - localStorage)
function saveUser(userData) {
  try {
    // Obtener tutores existentes
    const existingUsers = JSON.parse(
      localStorage.getItem("usuarios_tutores") || "[]"
    )

    // Verificar si el email o username ya existen
    const emailExists = existingUsers.some(
      (user) => user.email === userData.email
    )
    const usernameExists = existingUsers.some(
      (user) => user.username === userData.username
    )

    if (emailExists) {
      throw new Error("El email ya está registrado")
    }

    if (usernameExists) {
      throw new Error("El nombre de usuario ya está en uso")
    }

    // Agregar nuevo tutor
    existingUsers.push(userData)

    // Guardar en localStorage
    localStorage.setItem("usuarios_tutores", JSON.stringify(existingUsers))
    localStorage.setItem("tutorCounter", matriculaCounter)

    return true
  } catch (error) {
    console.error("Error al guardar tutor:", error)
    throw error
  }
}

// Obtener nombre de especialidad formateado
function getEspecialidadName(value) {
  const especialidades = {
    matematicas: "Matemáticas",
    espanol: "Español",
    ciencias: "Ciencias Naturales",
    historia: "Historia",
    geografia: "Geografía",
    ingles: "Inglés",
    educacion_fisica: "Educación Física",
    artes: "Artes",
    computacion: "Computación",
    filosofia: "Filosofía",
    quimica: "Química",
    fisica: "Física",
    biologia: "Biología",
    otra: "Otra especialidad",
  }
  return especialidades[value] || value
}

// Manejar envío del formulario
document
  .getElementById("registroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault()

    // Obtener datos del formulario
    const formData = {
      nombre: document.getElementById("nombre").value.trim(),
      email: document.getElementById("email").value.trim().toLowerCase(),
      telefono: document.getElementById("telefono").value.trim(),
      especialidad: document.getElementById("especialidad").value,
      especialidadNombre: getEspecialidadName(
        document.getElementById("especialidad").value
      ),
      username: document.getElementById("username").value.trim(),
      password: document.getElementById("password").value,
      matricula: document.getElementById("matriculaPreview").textContent,
      fechaRegistro: currentDate.toISOString(),
      tipoUsuario: "tutor",
    }

    // Validar datos
    const errors = validateForm(formData)
    if (errors.length > 0) {
      showMessage("error", errors.join(". "))
      return
    }

    // Deshabilitar botón
    const submitBtn = document.querySelector(".submit-btn")
    submitBtn.disabled = true
    submitBtn.textContent = "Creando cuenta..."

    // Simular delay de red
    setTimeout(() => {
      try {
        saveUser(formData)
        showMessage(
          "success",
          `¡Cuenta de tutor creada exitosamente! Tu matrícula es: ${formData.matricula}. Especialidad: ${formData.especialidadNombre}`
        )

        // Limpiar formulario
        document.getElementById("registroForm").reset()

        // Generar nueva matrícula para el siguiente tutor
        matriculaCounter++
        updateMatricula()

        // Opcional: redirigir después de 4 segundos
        setTimeout(() => {
          window.location.href = "index.html"
        }, 4000)
      } catch (error) {
        showMessage("error", error.message)
      } finally {
        submitBtn.disabled = false
        submitBtn.textContent = "Crear Cuenta de Tutor"
      }
    }, 1000)
  })

// Actualizar matrícula cuando cambie el nombre
document.getElementById("nombre").addEventListener("input", function () {
  if (this.value.trim()) {
    updateMatricula()
  }
})

// Inicializar cuando cargue la página
document.addEventListener("DOMContentLoaded", init)
