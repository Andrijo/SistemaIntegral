// Resalta la box seleccionada al hacer clic en el glosario
document.querySelectorAll(".glosario-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    // Espera al scroll suave antes de resaltar
    setTimeout(() => {
      document
        .querySelectorAll(".box")
        .forEach((box) => box.classList.remove("active-box"))
      const targetId = this.getAttribute("href").replace("#", "")
      const targetBox = document.getElementById(targetId)
      if (targetBox) {
        targetBox.classList.add("active-box")
        // Opcional: quitar el brillo después de unos segundos
        setTimeout(() => {
          targetBox.classList.remove("active-box")
        }, 1000)
      }
    }, 200) // Espera 0.5 segundos para que el scroll termine
  })
})
