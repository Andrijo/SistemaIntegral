// Configuración de Supabase
const SUPABASE_URL = "https://uznqokybucscboikanfc.supabase.co"

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6bnFva3lidWNzY2JvaWthbmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNDIzNzAsImV4cCI6MjA3NzYxODM3MH0.L1di6LqteqMG8LCR-Utaqq1k9c5v-pNiBDbEt9SE5uc"

// Verificar que Supabase esté cargado
if (typeof window.supabase === "undefined") {
  console.error(
    " ERROR: Supabase no está cargado. Verifica que el script de Supabase esté antes de este archivo."
  )
} else {
  console.log("Supabase CDN cargado correctamente")
}

// Inicializar cliente de Supabase
let supabaseClient = null

try {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  console.log("Cliente de Supabase inicializado correctamente")

  // Verificar conexión
  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error("Error de conexión con Supabase:", error.message)
      console.error("Verifica tu SUPABASE_ANON_KEY")
    } else {
      console.log("Conexión con Supabase establecida")
    }
  })
} catch (error) {
  console.error("Error al inicializar Supabase:", error)
}

// Exportar para uso global
window.supabaseClient = supabaseClient
