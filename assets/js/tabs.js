document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".nav-tabs .tab__item[data-tab-target]")
  const tabContents = document.querySelectorAll(".tab-content .tab-pane")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tabTarget
      const targetContent = document.querySelector(targetId)

      // Remove active class from all tab items
      tabs.forEach((t) => {
        t.classList.remove("active")
      })

      // Remove active class from all tab panes
      tabContents.forEach((tc) => {
        tc.classList.remove("active")
      })

      // Add active class to the clicked tab and its corresponding content
      tab.classList.add("active")
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })
})
