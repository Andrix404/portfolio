// Function to set up admin panel access
function setupAdminAccess() {
    // Add keyboard shortcut
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'V') {
            e.preventDefault();
            showAdminPanel();
        }
    });
}

// Function to show admin panel (password protected)
function showAdminPanel() {
    const password = prompt("Enter admin password to access the admin panel:");
    
    // In a real implementation, you would use a more secure method
    // For this demo, we'll use a simple password check
    if (password === "admin123") { // You should change this password
        displayAdminPanel();
    } else if (password !== null) {
        alert("Incorrect password!");
    }
}

// Function to display the main admin panel
function displayAdminPanel() {
    const visits = JSON.parse(localStorage.getItem('visits') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Create admin panel HTML
    let html = `
        <div id="admin-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(10px);
            cursor: auto;
        ">
            <div style="
                background: #1e1e1e;
                border-radius: 16px;
                padding: 30px;
                width: 90%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid #ae00ff;
                box-shadow: 0 0 30px rgba(174, 0, 255, 0.5);
                cursor: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color: #ae00ff; margin: 0;">Admin Panel</h2>
                    <button onclick="document.getElementById('admin-overlay').remove()" style="
                        background: #ae00ff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Close</button>
                </div>
                
                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <button onclick="displayVisitorData()" style="
                        background: #444;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Visitor Data</button>
                    
                    <button onclick="displayProjectManagement()" style="
                        background: #444;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Project Management</button>
                </div>
                
                <div id="admin-content">
                    <h3 style="color: #ae00ff;">Dashboard</h3>
                    <p>Total visits: ${visits.length}</p>
                    <p>Total projects: ${projects.length}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add the admin panel to the document
    document.body.insertAdjacentHTML('beforeend', html);
}

// Function to display visitor data
function displayVisitorData() {
    const visits = JSON.parse(localStorage.getItem('visits') || '[]');
    const contentDiv = document.getElementById('admin-content');
    
    let html = `
        <h3 style="color: #ae00ff;">Visitor Tracking Data</h3>
        <p>Total visits: ${visits.length}</p>
    `;
    
    if (visits.length === 0) {
        html += `<p>No visitor data available.</p>`;
    } else {
        html += `
            <div style="margin-top: 20px;">
                <table style="width: 100%; border-collapse: collapse; color: white;">
                    <thead>
                        <tr style="background: rgba(174, 0, 255, 0.2);">
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #444;">Name</th>
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #444;">Date</th>
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #444;">Time</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        // Sort visits by timestamp (newest first)
        visits.sort((a, b) => b.timestamp - a.timestamp);
        
        visits.forEach(visit => {
            html += `
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 12px;">${visit.name}</td>
                    <td style="padding: 12px;">${visit.date}</td>
                    <td style="padding: 12px;">${visit.time}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <button onclick="clearVisitorData()" style="
                    background: #ff4d4d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                ">Clear All Data</button>
            </div>
        `;
    }
    
    contentDiv.innerHTML = html;
}

// Function to display project management interface
function displayProjectManagement() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const contentDiv = document.getElementById('admin-content');
    
    let html = `
        <h3 style="color: #ae00ff;">Project Management</h3>
        <button onclick="showAddProjectForm()" style="
            background: #ae00ff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            margin-bottom: 20px;
        ">Add New Project</button>
    `;
    
    if (projects.length === 0) {
        html += `<p>No projects available.</p>`;
    } else {
        html += `
            <div style="margin-top: 20px;">
                <table style="width: 100%; border-collapse: collapse; color: white;">
                    <thead>
                        <tr style="background: rgba(174, 0, 255, 0.2);">
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #444;">Project Name</th>
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #444;">Description</th>
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #444;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        projects.forEach((project, index) => {
            html += `
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 12px;">${project.name}</td>
                    <td style="padding: 12px;">${project.description}</td>
                    <td style="padding: 12px;">
                        <button onclick="editProject(${index})" style="
                            background: #444;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 4px;
                            cursor: pointer;
                            margin-right: 5px;
                        ">Edit</button>
                        <button onclick="deleteProject(${index})" style="
                            background: #ff4d4d;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 4px;
                            cursor: pointer;
                        ">Delete</button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    contentDiv.innerHTML = html;
}

// Function to show add project form
function showAddProjectForm() {
    const contentDiv = document.getElementById('admin-content');
    
    const html = `
        <h3 style="color: #ae00ff;">Add New Project</h3>
        <form id="project-form" style="display: flex; flex-direction: column; gap: 15px;">
            <input type="hidden" id="project-index" value="-1">
            <input type="hidden" id="project-image-data" value="">
            <div>
                <label for="project-name" style="display: block; margin-bottom: 5px;">Project Name</label>
                <input type="text" id="project-name" style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #444;
                    background: #333;
                    color: white;
                " required>
            </div>
            
            <div>
                <label for="project-description" style="display: block; margin-bottom: 5px;">Description</label>
                <textarea id="project-description" rows="4" style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #444;
                    background: #333;
                    color: white;
                    resize: vertical;
                " required></textarea>
            </div>
            
            <div>
                <label for="project-image" style="display: block; margin-bottom: 5px;">Project Image</label>
                <div id="image-upload-area" style="
                    width: 100%;
                    height: 200px;
                    border: 2px dashed #444;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #333;
                    color: #aaa;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                ">
                    <div id="upload-text">Click or drag an image here</div>
                    <img id="image-preview" style="max-width: 100%; max-height: 100%; display: none;">
                </div>
                <input type="file" id="project-image" accept="image/*" style="display: none;">
            </div>
            
            <div>
                <label for="project-link" style="display: block; margin-bottom: 5px;">Project Link (optional)</label>
                <input type="text" id="project-link" style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #444;
                    background: #333;
                    color: white;
                ">
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button type="submit" style="
                    background: #ae00ff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                ">Save Project</button>
                
                <button type="button" onclick="displayProjectManagement()" style="
                    background: #444;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                ">Cancel</button>
            </div>
        </form>
    `;
    
    contentDiv.innerHTML = html;
    
    // Add event listeners for image upload
    const uploadArea = document.getElementById('image-upload-area');
    const fileInput = document.getElementById('project-image');
    const imagePreview = document.getElementById('image-preview');
    const uploadText = document.getElementById('upload-text');
    
    // Click on upload area to trigger file input
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Check if file is an image
            if (!file.type.match('image.*')) {
                alert('Please select an image file (JPEG, PNG, GIF, etc.)');
                return;
            }
            
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Please select an image smaller than 2MB');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Show preview
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                uploadText.style.display = 'none';
                
                // Store image data in hidden input
                document.getElementById('project-image-data').value = e.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ae00ff';
        this.style.backgroundColor = '#444';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#444';
        this.style.backgroundColor = '#333';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#444';
        this.style.backgroundColor = '#333';
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    });
    
    // Add event listener to the form
    document.getElementById('project-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProject();
    });
}

// Function to edit a project
function editProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects[index];
    
    if (!project) return;
    
    const contentDiv = document.getElementById('admin-content');
    
    const html = `
        <h3 style="color: #ae00ff;">Edit Project</h3>
        <form id="project-form" style="display: flex; flex-direction: column; gap: 15px;">
            <input type="hidden" id="project-index" value="${index}">
            <input type="hidden" id="project-image-data" value="${project.imageData || ''}">
            <div>
                <label for="project-name" style="display: block; margin-bottom: 5px;">Project Name</label>
                <input type="text" id="project-name" value="${project.name}" style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #444;
                    background: #333;
                    color: white;
                " required>
            </div>
            
            <div>
                <label for="project-description" style="display: block; margin-bottom: 5px;">Description</label>
                <textarea id="project-description" rows="4" style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #444;
                    background: #333;
                    color: white;
                    resize: vertical;
                " required>${project.description}</textarea>
            </div>
            
            <div>
                <label for="project-image-upload" style="display: block; margin-bottom: 5px;">Project Image</label>
                <div id="image-upload-area" style="
                    width: 100%;
                    height: 200px;
                    border: 2px dashed #444;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #333;
                    color: #aaa;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                ">
                    <div id="upload-text" style="${project.imageData ? 'display: none;' : ''}">Click or drag an image here</div>
                    <img id="image-preview" src="${project.imageData || ''}" style="max-width: 100%; max-height: 100%; ${project.imageData ? 'display: block;' : 'display: none;'}">
                </div>
                <input type="file" id="project-image-upload" accept="image/*" style="display: none;">
            </div>
            
            <div>
                <label for="project-link" style="display: block; margin-bottom: 5px;">Project Link (optional)</label>
                <input type="text" id="project-link" value="${project.link || ''}" style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #444;
                    background: #333;
                    color: white;
                ">
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button type="submit" style="
                    background: #ae00ff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                ">Update Project</button>
                
                <button type="button" onclick="displayProjectManagement()" style="
                    background: #444;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                ">Cancel</button>
            </div>
        </form>
    `;
    
    contentDiv.innerHTML = html;
    
    // Add event listeners for image upload
    const uploadArea = document.getElementById('image-upload-area');
    const fileInput = document.getElementById('project-image-upload');
    const imagePreview = document.getElementById('image-preview');
    const uploadText = document.getElementById('upload-text');
    const imageDataInput = document.getElementById('project-image-data');
    
    // Click on upload area to trigger file input
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Check if file is an image
            if (!file.type.match('image.*')) {
                alert('Please select an image file (JPEG, PNG, GIF, etc.)');
                return;
            }
            
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Please select an image smaller than 2MB');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Show preview
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                uploadText.style.display = 'none';
                
                // Store image data in hidden input
                imageDataInput.value = e.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ae00ff';
        this.style.backgroundColor = '#444';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#444';
        this.style.backgroundColor = '#333';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#444';
        this.style.backgroundColor = '#333';
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    });
    
    // Add event listener to the form
    document.getElementById('project-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProject();
    });
}

// Function to save a project (add or update)
function saveProject() {
    const index = document.getElementById('project-index').value;
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;
    const imageData = document.getElementById('project-image-data').value;
    const link = document.getElementById('project-link').value;
    
    if (!name || !description) {
        alert("Please fill in all required fields.");
        return;
    }
    
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    const project = {
        name: name,
        description: description,
        imageData: imageData || '',
        link: link || ''
    };
    
    if (index === "-1") {
        // Add new project
        projects.push(project);
    } else {
        // Update existing project
        projects[index] = project;
    }
    
    localStorage.setItem('projects', JSON.stringify(projects));
    alert("Project saved successfully!");
    
    // Refresh the projects display on the main page
    if (typeof loadProjects === 'function') {
        loadProjects();
    }
    
    displayProjectManagement();
}

// Function to delete a project
function deleteProject(index) {
    if (!confirm("Are you sure you want to delete this project?")) {
        return;
    }
    
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    alert("Project deleted successfully!");
    
    // Refresh the projects display on the main page
    if (typeof loadProjects === 'function') {
        loadProjects();
    }
    
    displayProjectManagement();
}

// Function to clear visitor data
function clearVisitorData() {
    if (confirm("Are you sure you want to clear all visitor data?")) {
        localStorage.removeItem('visits');
        // Update the visit count in the footer
        updateVisitCount();
        alert("Visitor data cleared!");
        // Refresh the visitor data display
        displayVisitorData();
    }
}

// Expose functions to global scope
window.setupAdminAccess = setupAdminAccess;
window.showAdminPanel = showAdminPanel;
window.displayAdminPanel = displayAdminPanel;
window.displayVisitorData = displayVisitorData;
window.displayProjectManagement = displayProjectManagement;
window.showAddProjectForm = showAddProjectForm;
window.editProject = editProject;
window.saveProject = saveProject;
window.deleteProject = deleteProject;
window.clearVisitorData = clearVisitorData;