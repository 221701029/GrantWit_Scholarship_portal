document.addEventListener("DOMContentLoaded", function () {
    // Search function to filter scholarships
    function searchScholarships() {
        let input = document.getElementById("searchInput").value.toLowerCase().trim(); // Added .trim()
        let scholarships = document.querySelectorAll(".scholarship-card");

        scholarships.forEach(card => {
            let name = card.getAttribute("data-name").toLowerCase();
            let text = card.textContent.toLowerCase(); // Added text content search

            if (name.includes(input) || text.includes(input)) {
                card.style.display = "block"; // Show matching scholarships
            } else {
                card.style.display = "none";  // Hide non-matching scholarships
            }
        });
    }

    // Attach event listener to the search button
    document.querySelector(".search-bar button").addEventListener("click", searchScholarships);

    // Enable real-time search on keypress
    document.getElementById("searchInput").addEventListener("keyup", searchScholarships);

    // Toggle details functionality
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.dataset.target;
            const detailsDiv = document.getElementById(targetId);
            if (detailsDiv) {
                detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
            }
        });
    });
});