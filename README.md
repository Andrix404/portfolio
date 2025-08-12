# Thidaksha Meghan's Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and experience as a software developer.

## Features

- Responsive design that works on all devices
- Dark/light mode toggle
- Customizable accent color
- Interactive animations and effects
- Admin panel for managing projects and visitor tracking
- Contact form with Formspree integration
- Performance optimized with lazy loading

## Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── style.css                # Main stylesheet
├── main.js                  # Main JavaScript file (loader)
├── js/                      # JavaScript modules
│   ├── visitor-tracking.js # Visitor tracking functionality
│   ├── admin-panel.js      # Admin panel functionality
│   ├── project-management.js # Project management functionality
│   └── site-init.js         # Site initialization functionality
├── Resources/              # Image assets
└── README.md                # This file
```

## Image Optimization Recommendations

To further improve performance, consider the following image optimization techniques:

1. **Compress Images**: Use tools like TinyPNG or ImageOptim to reduce file sizes without significant quality loss.

2. **Use Modern Formats**: Convert images to WebP format for better compression and quality.

3. **Responsive Images**: Implement `srcset` attribute for different screen sizes.

4. **Proper Dimensions**: Resize images to their actual display size to avoid unnecessary scaling.

5. **Lazy Loading**: Already implemented for all images using the `loading="lazy"` attribute.

## Performance Enhancements

- Lazy loading implemented for all images
- CSS and JavaScript modularized for better caching
- Minified CSS and JavaScript files for production use
- Efficient DOM manipulation techniques

## Setup

1. Clone the repository
2. Open `index.html` in a web browser
3. Customize content in the HTML file
4. Update project information through the admin panel (Ctrl+Shift+V)

## Customization

- Change accent color using the color picker in the header
- Toggle between dark/light mode with the "Toggle Mode" button
- Update projects through the admin panel

## Admin Panel Access

Press `Ctrl+Shift+V` to access the admin panel and manage:
- Visitor tracking data
- Project information and images

Default admin password: `admin123` (change this in production)

## Contact Form

The contact form uses Formspree for handling submissions. To use:
1. Create a Formspree account
2. Update the form action URL in `index.html`
3. Verify your email address with Formspree

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).