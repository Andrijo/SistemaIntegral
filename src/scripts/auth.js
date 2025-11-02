// Funciones de autenticación con Supabase

// Verificar que supabaseClient esté disponible
function checkSupabaseClient() {
  if (!window.supabaseClient) {
    console.error(
      "ERROR: supabaseClient no está definido. Verifica tu configuración."
    )
    return false
  }
  return true
}

// Función para iniciar sesión
async function loginUser(email, password) {
  if (!checkSupabaseClient()) {
    return {
      success: false,
      error: "Supabase no está configurado correctamente",
    }
  }

  try {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword(
      {
        email: email,
        password: password,
      }
    )

    if (error) throw error

    console.log("Inicio de sesión exitoso:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message)
    return { success: false, error: error.message }
  }
}

// Función para registrar usuario
async function registerUser(email, password) {
  if (!checkSupabaseClient()) {
    return {
      success: false,
      error: "Supabase no está configurado correctamente",
    }
  }

  try {
    const { data, error } = await window.supabaseClient.auth.signUp({
      email: email,
      password: password,
    })

    if (error) throw error

    console.log("Registro exitoso:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error al registrar:", error.message)
    return { success: false, error: error.message }
  }
}

// Función para cerrar sesión
async function logoutUser() {
  if (!checkSupabaseClient()) {
    return {
      success: false,
      error: "Supabase no está configurado correctamente",
    }
  }

  try {
    const { error } = await window.supabaseClient.auth.signOut()
    if (error) throw error

    console.log("Sesión cerrada exitosamente")
    return { success: true }
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message)
    return { success: false, error: error.message }
  }
}

// Función para obtener usuario actual
async function getCurrentUser() {
  if (!checkSupabaseClient()) {
    return null
  }

  try {
    const {
      data: { user },
    } = await window.supabaseClient.auth.getUser()
    return user
  } catch (error) {
    console.error("Error al obtener usuario:", error.message)
    return null
  }
}

// Verificar estado de autenticación al cargar la página
async function checkAuthState() {
  if (!checkSupabaseClient()) {
    console.log("Supabase no está configurado")
    return
  }

  const user = await getCurrentUser()

  if (user) {
    console.log("Usuario autenticado:", user.email)
    // Actualizar UI para usuario autenticado
    updateUIForAuthenticatedUser(user)
  } else {
    console.log("No hay usuario autenticado")
    updateUIForGuestUser()
  }
}

// Actualizar UI para usuario autenticado
function updateUIForAuthenticatedUser(user) {
  const loginBtn = document.getElementById("loginBtn")
  if (loginBtn) {
    loginBtn.textContent = user.email
    loginBtn.style.cursor = "default"
    loginBtn.onclick = (e) => e.preventDefault()

    // Agregar botón de cerrar sesión si no existe
    const existingLogoutBtn = document.querySelector(".logout-btn")
    if (!existingLogoutBtn) {
      const logoutBtn = document.createElement("a")
      logoutBtn.href = "#"
      logoutBtn.className = "login-btn logout-btn"
      logoutBtn.textContent = "Cerrar sesión"
      logoutBtn.style.marginLeft = "10px"
      logoutBtn.onclick = async (e) => {
        e.preventDefault()
        const result = await logoutUser()
        if (result.success) {
          window.location.reload()
        }
      }

      loginBtn.parentElement.appendChild(logoutBtn)
    }
  }
}

// Actualizar UI para usuario invitado
function updateUIForGuestUser() {
  const loginBtn = document.getElementById("loginBtn")
  if (loginBtn) {
    loginBtn.textContent = "Iniciar sesión"
    loginBtn.style.cursor = "pointer"
  }

  // Eliminar botón de logout si existe
  const logoutBtn = document.querySelector(".logout-btn")
  if (logoutBtn) {
    logoutBtn.remove()
  }
}

// Listener para cambios en el estado de autenticación
if (checkSupabaseClient()) {
  window.supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log("Estado de autenticación cambió:", event, session)

    if (event === "SIGNED_IN") {
      console.log("Usuario ha iniciado sesión")
      // Redirigir al dashboard si existe, sino mantener en la página actual
      const dashboardPath = "/src/pages/dashboard.html"
      if (window.location.pathname !== dashboardPath) {
        window.location.href = dashboardPath
      }
    } else if (event === "SIGNED_OUT") {
      console.log("Usuario ha cerrado sesión")
      updateUIForGuestUser()
    }
  })
}

// Inicializar verificación de autenticación
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, verificando autenticación...")
  checkAuthState()
})
