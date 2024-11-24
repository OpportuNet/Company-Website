document.addEventListener('DOMContentLoaded', () => {
    const jobSearchBar = document.getElementById('jobSearchBar');
    const jobItems = document.querySelectorAll('.job-item'); // Select all job items
    const noResultsMessage = document.getElementById('noResultsMessage'); // Message container

    // Listen for input event on the search bar
    jobSearchBar.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();

        // Hide all job items initially
        jobItems.forEach(item => item.style.display = 'none');

        // If there is no search term, show all jobs again
        if (query === '') {
            jobItems.forEach(item => item.style.display = 'block');
            noResultsMessage.style.display = 'none'; // Hide the message when there's no search
        } else {
            // Filter and display only jobs that match the search query
            const filteredJobs = Array.from(jobItems).filter((job) => {
                const jobTitle = job.querySelector('h5').textContent.toLowerCase();
                return jobTitle.includes(query); // If the job title matches the query
            });

            // Show only the filtered jobs
            filteredJobs.forEach(job => job.style.display = 'block');

            // If no jobs match, show the "no results" message
            if (filteredJobs.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none'; // Hide the message when there are results
            }
        }
    });
});
