// Gestión de modales con autenticación Supabase

document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const loginModal = document.getElementById("loginModal")
  const registerModal = document.getElementById("registerModal")
  const loginBtn = document.getElementById("loginBtn")
  const closeModal = document.getElementById("closeModal")
  const closeRegisterModal = document.getElementById("closeRegisterModal")
  const createAccountLink = document.getElementById("createAccountLink")
  const backToLogin = document.getElementById("backToLogin")
  const loginForm = document.getElementById("loginForm")
  const registerBtn = document.getElementById("registerBtn")
  const btnHowToUse = document.getElementById("btn-how-to-use")

  // Función para mostrar alertas
  function showAlert(message, type = "error") {
    const alertDiv = document.getElementById("registerAlert")
    if (!alertDiv) return

    alertDiv.textContent = message
    alertDiv.className = `alert ${type}`
    alertDiv.style.display = "block"

    setTimeout(() => {
      alertDiv.style.display = "none"
    }, 5000)
  }

  // Abrir modal de login
  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault()
      loginModal.style.display = "flex"
      loginModal.style.alignItems = "center"
      loginModal.style.justifyContent = "center"
    })
  }

  if (btnHowToUse) {
    btnHowToUse.addEventListener("click", function (e) {
      e.preventDefault()
      loginModal.style.display = "flex"
    })
  }

  // Cerrar modal de login
  if (closeModal) {
    closeModal.addEventListener("click", function () {
      loginModal.style.display = "none"
    })
  }

  // Cerrar modal de registro
  if (closeRegisterModal) {
    closeRegisterModal.addEventListener("click", function () {
      registerModal.style.display = "none"
    })
  }

  // Cambiar a modal de registro
  if (createAccountLink) {
    createAccountLink.addEventListener("click", function (e) {
      e.preventDefault()
      loginModal.style.display = "none"
      registerModal.style.display = "flex"
      registerModal.style.alignItems = "center"
      registerModal.style.justifyContent = "center"
    })
  }

  // Volver a modal de login
  if (backToLogin) {
    backToLogin.addEventListener("click", function (e) {
      e.preventDefault()
      registerModal.style.display = "none"
      loginModal.style.display = "flex"
      loginModal.style.alignItems = "center"
      loginModal.style.justifyContent = "center"
    })
  }

  // Cerrar modales al hacer clic fuera
  window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = "none"
    }
    if (event.target === registerModal) {
      registerModal.style.display = "none"
    }
  })

  // Manejar envío del formulario de login
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      const email = document.getElementById("username").value
      const password = document.getElementById("password").value

      // Mostrar indicador de carga
      const submitBtn = loginForm.querySelector(".login-btn-submit")
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Ingresando..."
      submitBtn.disabled = true

      // Intentar iniciar sesión
      const result = await loginUser(email, password)

      if (result.success) {
        // Éxito - el listener onAuthStateChange manejará la redirección
        console.log("Login exitoso")
      } else {
        // Mostrar error
        alert(`Error al iniciar sesión: ${result.error}`)
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }
    })
  }

  // Manejar registro de usuario
  if (registerBtn) {
    registerBtn.addEventListener("click", async function (e) {
      e.preventDefault()

      const email = document.getElementById("registerEmail").value
      const password = document.getElementById("registerPassword").value
      const passwordConfirm = document.getElementById(
        "registerPasswordConfirm"
      ).value

      // Validaciones
      if (!email || !password || !passwordConfirm) {
        showAlert("Por favor completa todos los campos", "error")
        return
      }

      if (password !== passwordConfirm) {
        showAlert("Las contraseñas no coinciden", "error")
        return
      }

      if (password.length < 6) {
        showAlert("La contraseña debe tener al menos 6 caracteres", "error")
        return
      }

      // Mostrar indicador de carga
      const originalText = registerBtn.textContent
      registerBtn.textContent = "Registrando..."
      registerBtn.disabled = true

      // Intentar registrar
      const result = await registerUser(email, password)

      if (result.success) {
        showAlert(
          "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta",
          "success"
        )

        // Limpiar formulario
        document.getElementById("registerEmail").value = ""
        document.getElementById("registerPassword").value = ""
        document.getElementById("registerPasswordConfirm").value = ""

        // Volver al login después de 3 segundos
        setTimeout(() => {
          registerModal.style.display = "none"
          loginModal.style.display = "flex"
        }, 3000)
      } else {
        showAlert(`Error al registrar: ${result.error}`, "error")
      }

      registerBtn.textContent = originalText
      registerBtn.disabled = false
    })
  }

  // Gestión de FAQ (acordeón)
  const faqQuestions = document.querySelectorAll(".faq-question")
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling
      const isOpen = answer.style.display === "block"

      // Cerrar todas las respuestas
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        ans.style.display = "none"
      })

      // Abrir/cerrar la respuesta clickeada
      if (!isOpen) {
        answer.style.display = "block"
      }
    })
  })
})
