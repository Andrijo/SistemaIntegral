// Desplazamiento suave para enlaces
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    const navLinks = document.querySelectorAll(".nav-links a") // Definir navLinks aquí

    if (targetElement) {
      // Remover clase active de todos los enlaces
      navLinks.forEach((link) => link.classList.remove("active"))

      // Agregar clase active al enlace clickeado
      this.classList.add("active")

      // Actualizar la URL
      history.replaceState(null, null, targetId)

      // Scroll suave al elemento
      window.scrollTo({
        top: targetElement.offsetTop - 40, // Ajusta según la altura de tu navbar
        behavior: "smooth",
      })
    }
  })
})

// Desplazamiento suave para el logo
const logo = document.querySelector(".logo a")
if (logo) {
  logo.addEventListener("click", (e) => {
    e.preventDefault()
    history.replaceState(null, null, logo)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// FAQ desplegable
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", function () {
    const answer = this.nextElementSibling
    if (answer && answer.classList.contains("faq-answer")) {
      answer.style.display =
        answer.style.display === "none" || answer.style.display === ""
          ? "block"
          : "none"
    }
  })
})
