// Agregar interactividad básica
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault()
    document
      .querySelectorAll(".nav-item")
      .forEach((nav) => nav.classList.remove("active"))
    this.classList.add("active")
  })
})

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function (e) {
    e.preventDefault()
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"))
    this.classList.add("active")
  })
})

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", function () {
    console.log("Abriendo:", this.querySelector(".card-title").textContent)
  })
})

// Efecto de búsqueda
const searchInput = document.querySelector(".search-input")
searchInput.addEventListener("focus", function () {
  this.style.transform = "scale(1.02)"
})

searchInput.addEventListener("blur", function () {
  this.style.transform = "scale(1)"
})
