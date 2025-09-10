// Desplazamiento suave para enlaces
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        navLinks.classList.remove("active")
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: "smooth",
        })
      }
    }
  })
})

// Desplazamiento suave para el logo
const logo = document.querySelector(".logo a")
if (logo) {
  logo.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Menú hamburguesa responsive
const menuToggle = document.getElementById("menuToggle")
const navLinks = document.getElementById("navLinks")
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")
  })
  // Accesibilidad: permitir abrir con Enter
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      navLinks.classList.toggle("active")
    }
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
