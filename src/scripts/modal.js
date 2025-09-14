// JavaScript para manejar el modal
const loginBtn = document.getElementById("loginBtn")
const loginModal = document.getElementById("loginModal")
const closeModal = document.getElementById("closeModal")
const loginForm = document.getElementById("loginForm")
const createAccountLink = document.getElementById("createAccountLink")

// Mostrar modal
loginBtn.addEventListener("click", function (e) {
  e.preventDefault()
  loginModal.classList.add("show")
})

// Cerrar modal con X
closeModal.addEventListener("click", function () {
  loginModal.classList.remove("show")
})

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

// ...links de boton crear cuenta...
createAccountLink.addEventListener("click", function (e) {
  e.preventDefault()
  const userTypeRadio = document.querySelector('input[name="userType"]:checked')
  if (!userTypeRadio) {
    alert("Selecciona el tipo de usuario antes de crear una cuenta.")
    return
  }
  if (userTypeRadio.value === "alumno") {
    window.location.href = "src/pages/registroDeAlumno.html"
  } else if (userTypeRadio.value === "tutor") {
    window.location.href = "src/pages/registroDeTutor.html"
  }
})
// ...links de boton crear cuenta...
