---
7-1 Pattern
---

src/
└── styles/
├── abstracts/
│ └── \_variables.scss # For variables, functions, mixins
├── base/
│ ├── \_base.scss # Boilerplate styles
│ ├── \_reset.scss # Your CSS reset
│ └── \_typography.scss # Typography rules (h1, p, etc.)
├── components/
│ ├── \_container.scss
│ ├── \_navigation.scss
│ └── \_tabs.scss
├── layout/
│ ├── \_footer.scss
│ ├── \_grid.scss
│ └── \_header.scss
├── pages/
│ └── \_home.scss # Page-specific styles
└── main.scss # Main file to import all others

---

---

sass/
|
|– abstracts/
| |– \_variables.scss # Sass Variables
| |– \_functions.scss # Sass Functions
| |– \_mixins.scss # Sass Mixins
| |– \_placeholders.scss # Sass Placeholders
|
|– base/
| |– \_reset.scss # Reset/normalize
| |– \_typography.scss # Typography rules
| … # Etc.
|
|– components/
| |– \_buttons.scss # Buttons
| |– \_carousel.scss # Carousel
| |– \_cover.scss # Cover
| |– \_dropdown.scss # Dropdown
| … # Etc.
|
|– layout/
| |– \_navigation.scss # Navigation
| |– \_grid.scss # Grid system
| |– \_header.scss # Header
| |– \_footer.scss # Footer
| |– \_sidebar.scss # Sidebar
| |– \_forms.scss # Forms
| … # Etc.
|
|– pages/
| |– \_home.scss # Home specific styles
| |– \_contact.scss # Contact specific styles
| … # Etc.
|
|– themes/
| |– \_theme.scss # Default theme
| |– \_admin.scss # Admin theme
| … # Etc.
|
|– vendors/
| |– \_bootstrap.scss # Bootstrap
| |– \_jquery-ui.scss # jQuery UI
| … # Etc.
|
`– main.scss # Main Sass file
