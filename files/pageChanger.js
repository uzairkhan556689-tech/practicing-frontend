function pageChanger() {
    // Load header
    // sync vs async
   
       fetch('./header.html')
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(data => {
              
                document.getElementById('header-container').innerHTML = data;
                // Get current page filename
                
                const currentPage = window.location.pathname.split('/').pop() || 'main.html';
                console.log('Current page:', currentPage);
                // Add active class to current page link
                console.log(document.querySelectorAll('nav a'));
                document.querySelectorAll('nav a').forEach(item => {
                    console.log(item.getAttribute('href'));
                    if (item.getAttribute('href').includes(currentPage)) {
                        item.classList.add('active');
                    }
                });
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
}


window.addEventListener('DOMContentLoaded', pageChanger);
