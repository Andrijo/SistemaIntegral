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
          top: targetElement.offsetTop - 40,
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
