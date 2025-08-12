// Function to track visitors
function trackVisitor() {
    // Check if we've already tracked this visitor in this session
    if (!sessionStorage.getItem('visitorTracked')) {
        // Get visitor name from cookie or generate a new one
        let visitorName = getCookie('visitorName');
        
        // If no cookie found, generate a visitor name
        if (!visitorName) {
            visitorName = generateVisitorName();
            // Set cookie to expire in 30 days
            setCookie('visitorName', visitorName, 30);
        }
        
        // Get current date and time
        const visitTime = new Date();
        const visitData = {
            name: visitorName,
            date: visitTime.toLocaleDateString(),
            time: visitTime.toLocaleTimeString(),
            timestamp: visitTime.getTime()
        };
        
        // Store visit data in localStorage
        let visits = JSON.parse(localStorage.getItem('visits') || '[]');
        visits.push(visitData);
        localStorage.setItem('visits', JSON.stringify(visits));
        
        // Mark that we've tracked this visitor in this session
        sessionStorage.setItem('visitorTracked', 'true');
        
        console.log("Visitor tracked:", visitData);
    }
    
    // Update the visit count in footer for admin
    updateVisitCount();
}

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to generate a visitor name
function generateVisitorName() {
    // Get browser information
    const browserInfo = navigator.userAgent || "Unknown Browser";
    const platform = navigator.platform || "Unknown Platform";
    const language = navigator.language || "Unknown Language";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown Timezone";
    
    // Create a simple hash of the browser info
    const infoString = browserInfo + platform + language + timezone;
    let hash = 0;
    for (let i = 0; i < infoString.length; i++) {
        const char = infoString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    // Generate a name based on the hash
    const names = [
        "Explorer", "Navigator", "Surfer", "Browser", "User",
        "Visitor", "Guest", "Client", "Viewer", "Reader"
    ];
    
    const nameIndex = Math.abs(hash) % names.length;
    const number = Math.abs(hash) % 1000;
    
    return `${names[nameIndex]} #${number}`;
}

// Function to update visit count in footer
function updateVisitCount() {
    const visits = JSON.parse(localStorage.getItem('visits') || '[]');
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        adminLink.textContent = `Admin Panel (${visits.length} visits)`;
    }
}

// Expose functions to global scope
window.trackVisitor = trackVisitor;
window.getCookie = getCookie;
window.setCookie = setCookie;
window.generateVisitorName = generateVisitorName;
window.updateVisitCount = updateVisitCount;