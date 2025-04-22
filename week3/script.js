document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.querySelector(".news-container");
    const API_KEY = "pub_35609bb2c75368620f0d9f429d40e0359c990"; // Replace with your API key
    const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=al&language=sq`;

    async function fetchNews() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                newsContainer.innerHTML = ""; // Clear previous news
                data.results.forEach(article => {
                    const newsCard = document.createElement("div");
                    newsCard.classList.add("news-card");

                    newsCard.innerHTML = `
                        <img src="${article.image_url || 'https://via.placeholder.com/300'}" alt="News Image">
                        <div class="news-content">
                            <h3>${article.title || "No Title Available"}</h3>
                            <p>${article.description || "No Description Available."}</p>
                            <a href="${article.link}" target="_blank">Lexo më shumë</a>
                        </div>
                    `;

                    newsContainer.appendChild(newsCard);
                });
            } else {
                newsContainer.innerHTML = "<p>Nuk ka lajme për momentin...</p>";
            }
        } catch (error) {
            console.error("Gabim gjatë marrjes së lajmeve:", error);
            newsContainer.innerHTML = "<p>Gabim gjatë marrjes së lajmeve.</p>";
        }
    }

    fetchNews();
});
