# Claude's Guide to DIY Website

## Commands
- No build commands required (static HTML/CSS website)
- To serve locally: `python -m http.server 8000` (if Python is installed)
- No linting or testing frameworks available

## Code Style Guidelines

### HTML Conventions
- Use semantic HTML5 elements (`section`, `nav`, `header`, `footer`)
- Indent with 4 spaces
- Use kebab-case for class names (e.g., `class="feature-card"`)
- Use Japanese (ja) as the language attribute

### CSS Conventions
- Use CSS variables for colors (defined in `:root`)
- Mobile-first responsive design with media queries
- Use flexbox and grid for layouts
- Comment responsive breakpoints

### JavaScript Conventions
- Minimal JavaScript for interactive elements
- Event listeners on specific elements
- Use camelCase for variable names
- Use ES6 syntax where possible

### Error Handling
- Validate user inputs where applicable
- Provide clear visual feedback for interactive elements
- Include fallbacks for unsupported features

### Naming Conventions
- Descriptive class names that indicate function
- Consistent naming patterns across similar components
- IDs for interactive JavaScript elements

### File Organization
- Keep related files in the same directory
- Use descriptive filenames in lowercase
- HTML files named after their purpose (e.g., `toilet.html`)