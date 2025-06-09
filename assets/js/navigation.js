document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const primaryNav = document.querySelector(".primary-navigation")
  // const header = document.querySelector('.primary-header'); // Optional: if you add .nav-open to header

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpened = primaryNav.classList.toggle("nav-open")
      navToggle.setAttribute("aria-expanded", isOpened.toString())

      // Optional: Toggle class on header or body for more complex styling,
      // e.g., to prevent body scroll when nav is open.
      // if (header) {
      //   header.classList.toggle('nav-open');
      // }
    })
  }
})
