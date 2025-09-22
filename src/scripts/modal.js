// JavaScript para manejar el modal
const loginBtn = document.getElementById("loginBtn")
const bttnHowToUse = document.getElementById("btn-how-to-use")
const loginModal = document.getElementById("loginModal")
const closeModal = document.getElementById("closeModal")
const loginForm = document.getElementById("loginForm")
const createAccountLink = document.getElementById("createAccountLink")

// Modal del login
// Mostrar modal con función flecha
const handleLoginClick = (e) => {
  e.preventDefault()
  loginModal.classList.add("show")
}

loginBtn.addEventListener("click", handleLoginClick)
bttnHowToUse.addEventListener("click", handleLoginClick)

// Cerrar modal con X
const closeModalWithX = (e) => {
  e.preventDefault()
  loginModal.classList.remove("show")
}

closeModal.addEventListener("click", closeModalWithX)

// Cerrar modal haciendo clic fuera
loginModal.addEventListener("click", function (e) {
  if (e.target === loginModal) {
    loginModal.classList.remove("show")
  }
})

// Cerrar modal con Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && loginModal.classList.contains("show")) {
    loginModal.classList.remove("show")
  }
})

// Manejar envío del formulario
loginForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const userType = document.querySelector(
    'input[name="userType"]:checked'
  ).value

  // Fin del modal de login

  // Aquí puedes agregar la lógica de autenticación
  console.log("Datos de login:", {
    username: username,
    password: password,
    userType: userType,
  })

  // Ejemplo de redirección basada en el tipo de usuario
  alert(`Iniciando sesión como ${userType}: ${username}`)

  // Aquí podrías redirigir a diferentes páginas según el tipo de usuario
  // if (userType === 'alumno') {
  //   window.location.href = 'dashboard-alumno.html';
  // } else if (userType === 'tutor') {
  //   window.location.href = 'dashboard-tutor.html';
  // }

  // Cerrar modal después del login exitoso
  loginModal.classList.remove("show")
})

// Cargar script existente si existe
if (typeof window !== "undefined") {
  const existingScript = document.createElement("script")
  existingScript.src = "/scripts/script.js"
  existingScript.onerror = function () {
    // El archivo no existe, no hacer nada
  }
  document.head.appendChild(existingScript)
}

// ...Links de botón crear cuenta ...
createAccountLink.addEventListener("click", function (e) {
  e.preventDefault()
  const userTypeRadio = document.querySelector('input[name="userType"]:checked')
  if (!userTypeRadio) {
    alert("Selecciona el tipo de usuario antes de crear una cuenta.")
    return
  }
  if (userTypeRadio.value === "alumno") {
    window.location.href = "src/pages/signup-student.html"
  } else if (userTypeRadio.value === "tutor") {
    window.location.href = "src/pages/signup-teacher.html"
  }
})
// ...links de boton crear cuenta...
