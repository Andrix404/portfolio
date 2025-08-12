// Portfolio Admin System
document.addEventListener('DOMContentLoaded', function() {
    // Track visitor on page load
    if (typeof trackVisitor === 'function') {
        trackVisitor();
    }
    
    // Set up admin panel access
    if (typeof setupAdminAccess === 'function') {
        setupAdminAccess();
    }
    
    // Initialize all other functionality
    if (typeof initializeSite === 'function') {
        initializeSite();
    }
});
