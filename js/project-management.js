// Load projects from localStorage and display them
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    // Check if there are any projects in localStorage
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // If no projects exist in localStorage, create default projects
    if (projects.length === 0) {
        projects = [
            {
                name: "Nanobee",
                description: "Website for a software company with a modern UI and sleek features.",
                image: "Resources/Screenshot 2025-08-08 020704.png",
                link: "#"
            },
            {
                name: "Cyberbot",
                description: "A laptop shop web portal with an elegant eCommerce layout.",
                image: "Resources/Screenshot 2025-08-08 020758.png",
                link: "#"
            },
            {
                name: "Product Management System",
                description: "System built for Cybertech to manage inventory and product flow efficiently.",
                image: "Resources/Screenshot 2025-08-08 020911.png",
                link: "#"
            }
        ];
        
        // Save default projects to localStorage
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    // Display projects
    displayProjects(projects);
}

// Display projects in the projects container
function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects available.</p>';
        return;
    }
    
    let html = '';
    
    projects.forEach(project => {
        html += `
            <div class="project">
                <img src="${project.imageData || project.image || 'Resources/photo_2025-08-08_02-05-40.jpg'}" onerror="this.onerror=null;this.src='Resources/photo_2025-08-08_02-05-40.jpg';" alt="${project.name}" loading="lazy">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="view-project">View Project</a>
            </div>
        `;
    });
    
    projectsContainer.innerHTML = html;
}

// Expose functions to global scope for admin panel
window.loadProjects = loadProjects;
window.displayProjects = displayProjects;