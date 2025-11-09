console.log("Cargando sistema de autenticación...")

// Esperar a que TODO esté cargado
window.addEventListener("DOMContentLoaded", function () {
  if (!window.supabaseClient) {
    console.error("ERROR: Supabase no inicializado")
    alert("Error del sistema. Por favor recarga la página.")
    return
  }

  console.log("✅ Supabase listo")
  const loginBtn = document.getElementById("loginBtn")
  const btnHowToUse = document.getElementById("btn-how-to-use")
  const loginModal = document.getElementById("loginModal")
  const registerModal = document.getElementById("registerModal")
  const closeModal = document.getElementById("closeModal")
  const closeRegisterModal = document.getElementById("closeRegisterModal")
  const createAccountLink = document.getElementById("createAccountLink")
  const backToLogin = document.getElementById("backToLogin")
  const loginForm = document.getElementById("loginForm")
  const registerBtn = document.getElementById("registerBtn")
  const registerAlert = document.getElementById("registerAlert")

  function openLoginModal(e) {
    if (e) e.preventDefault()
    loginModal.style.display = "block"
  }

  function closeLoginModal() {
    loginModal.style.display = "none"
    if (loginForm) loginForm.reset()
  }

  function openRegisterModal(e) {
    if (e) e.preventDefault()
    loginModal.style.display = "none"
    registerModal.style.display = "block"
  }

  function closeRegisterModalFn() {
    registerModal.style.display = "none"
    const form = document.getElementById("registerForm")
    if (form) form.reset()
    if (registerAlert) {
      registerAlert.style.display = "none"
      registerAlert.textContent = ""
    }
    if (registerBtn) {
      registerBtn.disabled = false
      registerBtn.textContent = "Registrarse"
    }
  }

  // Event Listeners
  if (loginBtn) loginBtn.addEventListener("click", openLoginModal)
  if (btnHowToUse) btnHowToUse.addEventListener("click", openLoginModal)
  if (closeModal) closeModal.addEventListener("click", closeLoginModal)
  if (closeRegisterModal)
    closeRegisterModal.addEventListener("click", closeRegisterModalFn)
  if (createAccountLink)
    createAccountLink.addEventListener("click", openRegisterModal)
  if (backToLogin)
    backToLogin.addEventListener("click", function (e) {
      e.preventDefault()
      closeRegisterModalFn()
      openLoginModal()
    })

  window.addEventListener("click", function (e) {
    if (e.target === loginModal) closeLoginModal()
    if (e.target === registerModal) closeRegisterModalFn()
  })

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      const email = document.getElementById("username").value.trim()
      const password = document.getElementById("password").value
      const submitBtn = loginForm.querySelector(".login-btn-submit")

      if (!email || !password) {
        showError(loginForm, "Completa todos los campos")
        return
      }

      submitBtn.disabled = true
      submitBtn.textContent = "Iniciando sesión..."
      console.log("🔐 Login:", email)

      try {
        // LOGIN
        const { data: authData, error: authError } =
          await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
          })

        if (authError) throw authError

        console.log("✅ Login OK")

        // OBTENER ROL
        const { data: profileData, error: profileError } =
          await window.supabaseClient
            .from("profiles")
            .select("rol")
            .eq("id", authData.user.id)
            .single()

        if (profileError) {
          console.error("❌ Error perfil:", profileError.message)
        }

        const userRole = profileData?.rol || "alumno"
        console.log("✅ Rol:", userRole)

        // REDIRIGIR
        if (userRole === "maestro") {
          console.log("🎓 → Dashboard MAESTRO")
          window.location.replace("/src/pages/dashboard-tutor.html")
        } else {
          console.log("📚 → Dashboard ALUMNO")
          window.location.replace("/src/pages/dashboard.html")
        }
      } catch (error) {
        console.error("❌ Error:", error.message)

        let msg = "Error al iniciar sesión"
        if (error.message.includes("Invalid login")) {
          msg = "Usuario o contraseña incorrectos"
        } else if (error.message.includes("Email not confirmed")) {
          msg = "Confirma tu correo electrónico"
        }

        showError(loginForm, msg)
        submitBtn.disabled = false
        submitBtn.textContent = "Ingresar"
      }
    })
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", async function () {
      const email = document.getElementById("registerEmail").value.trim()
      const password = document.getElementById("registerPassword").value
      const passwordConfirm = document.getElementById(
        "registerPasswordConfirm"
      ).value

      if (registerAlert) {
        registerAlert.style.display = "none"
        registerAlert.textContent = ""
      }

      if (!email || !password || !passwordConfirm) {
        showError(null, "Completa todos los campos", registerAlert)
        return
      }

      if (password !== passwordConfirm) {
        showError(null, "Las contraseñas no coinciden", registerAlert)
        return
      }

      if (password.length < 6) {
        showError(null, "Mínimo 6 caracteres", registerAlert)
        return
      }

      registerBtn.disabled = true
      registerBtn.textContent = "Registrando..."
      console.log("📝 Registro:", email)

      try {
        const { data, error } = await window.supabaseClient.auth.signUp({
          email: email,
          password: password,
        })

        if (error) throw error

        console.log("✅ Registro OK")
        showSuccess("¡Cuenta creada! Revisa tu correo.", registerAlert)

        setTimeout(() => {
          closeRegisterModalFn()
          openLoginModal()
        }, 3000)
      } catch (error) {
        console.error("❌ Error:", error.message)

        let msg = "Error al crear cuenta"
        if (error.message.includes("already registered")) {
          msg = "Este correo ya está registrado"
        }

        showError(null, msg, registerAlert)
        registerBtn.disabled = false
        registerBtn.textContent = "Registrarse"
      }
    })
  }

  function showError(form, message, customAlert = null) {
    const alert = customAlert || getOrCreateAlert(form)
    if (!alert) return

    alert.textContent = message
    alert.className = "alert alert-error"
    alert.style.display = "block"

    setTimeout(() => (alert.style.display = "none"), 5000)
  }

  function showSuccess(message, customAlert) {
    if (!customAlert) return

    customAlert.textContent = message
    customAlert.className = "alert alert-success"
    customAlert.style.display = "block"

    setTimeout(() => (customAlert.style.display = "none"), 5000)
  }

  function getOrCreateAlert(form) {
    if (!form) return null

    let alert = form.querySelector(".alert")
    if (!alert) {
      alert = document.createElement("div")
      alert.className = "alert"
      form.insertBefore(alert, form.firstChild)
    }
    return alert
  }

  console.log("Sistema de autenticación listo")
})
