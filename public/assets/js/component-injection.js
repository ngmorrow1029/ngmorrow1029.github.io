/* _navigation.html */
document.addEventListener("DOMContentLoaded", function () {
  // Function to load navigation
  function loadNavigation() {
    fetch("components/_navigation.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText)
        }
        return response.text()
      })
      .then((data) => {
        document.getElementById("navbar-placeholder").innerHTML = data
      })
      .catch((error) => console.error("Error loading navigation:", error))
  }

  loadNavigation()
})
