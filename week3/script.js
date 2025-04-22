document.addEventListener("DOMContentLoaded", () => {
    // Add active class to current nav item
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPage) {
            link.classList.add("active");
        }
    });

    // For the news container on main page
    const newsContainer = document.querySelector(".news-container");
    if (newsContainer) {
        const API_KEY = "pub_35609bb2c75368620f0d9f429d40e0359c990"; 
        const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=al&language=sq`;

        async function fetchNews() {
            try {
                // Show loading spinner
                newsContainer.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                        <div class="spinner"></div>
                        <p>Duke ngarkuar lajmet...</p>
                    </div>
                `;
                
                const response = await fetch(API_URL);
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    newsContainer.innerHTML = ""; // Clear previous news
                    
                    data.results.forEach(article => {
                        // Format the date if available
                        let formattedDate = '';
                        if (article.pubDate) {
                            const date = new Date(article.pubDate);
                            formattedDate = `${date.toLocaleDateString('sq-AL')}`;
                        }
                        
                        const newsCard = document.createElement("div");
                        newsCard.classList.add("news-card");

                        newsCard.innerHTML = `
                            <img src="${article.image_url || 'placeholder.jpg'}" alt="${article.title || 'News Image'}" 
                                onerror="this.src='placeholder.jpg'">
                            <div class="news-content">
                                <h3>${article.title || "Pa titull"}</h3>
                                ${formattedDate ? `<small style="color: #777; margin-bottom: 10px; display: block;">${formattedDate}</small>` : ''}
                                <p>${article.description || "Nuk ka përshkrim për këtë lajm."}</p>
                                <a href="${article.link}" target="_blank">Lexo më shumë</a>
                            </div>
                        `;

                        newsContainer.appendChild(newsCard);
                    });
                } else {
                    newsContainer.innerHTML = `
                        <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                            <p>Nuk ka lajme për momentin. Ju lutemi provoni më vonë.</p>
                        </div>
                    `;
                }
            } catch (error) {
                console.error("Gabim gjatë marrjes së lajmeve:", error);
                newsContainer.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                        <p>Gabim gjatë marrjes së lajmeve. Ju lutemi provoni më vonë.</p>
                    </div>
                `;
            }
        }

        fetchNews();
    }

    // Form validation and enhancement
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            // Add basic animation on submit
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = 'Duke dërguar...';
                submitButton.style.opacity = '0.7';
                
                // Prevent the immediate submission to show the animation
                event.preventDefault();
                
                // Submit the form after a small delay (for demo purposes)
                setTimeout(() => {
                    // In a real app, you would validate here
                    alert('Forma u dërgua me sukses!');
                    submitButton.innerHTML = 'Dërgo';
                    submitButton.style.opacity = '1';
                    this.reset();
                }, 1000);
            }
        });
    });
});