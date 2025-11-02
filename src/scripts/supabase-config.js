// Configuración de Supabase
const SUPABASE_URL = "https://uznqokybucscboikanfc.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_ImmUkkSBODuqU7UP7hOfnA_Q7sU21tG"
// Verificar que supabase esté cargado
if (typeof window.supabase === "undefined") {
  console.error(
    "ERROR: Supabase no está cargado. Verifica que el script de Supabase esté antes de este archivo."
  )
} else {
  console.log("Supabase cargado correctamente")
}

// Inicializar cliente de Supabase
let supabaseClient = null

try {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  console.log("Cliente de Supabase inicializado correctamente")
} catch (error) {
  console.error("Error al inicializar Supabase:", error)
}

// Exportar para uso global
window.supabaseClient = supabaseClient
