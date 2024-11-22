// Function to fetch and display job details based on jobId in the URL
function loadJobDetails() {
  // Get the jobId from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = parseInt(urlParams.get('jobId')); // Convert to integer

  // Fetch the job details from the JSON file
  fetch('./assets/json/jobDetails.json')
    .then(response => response.json())
    .then(data => {
      // Ensure the jobId is valid and within range
      if (jobId >= 0 && jobId < data.length) {
        const job = data[jobId];

        // Job Info
        document.querySelector('.job-title').innerText = job.jobTitle;
        document.querySelector('.location').innerText = job.location;
        document.querySelector('.job-type').innerText = job.jobType;
        document.querySelector('.salary-range').innerText = job.salaryRange;
        document.querySelector('.company-logo').src = job.companyLogo;

        // Job Description
        document.querySelector('.job-description').innerText = job.jobDescription;

        // Responsibilities
        const responsibilitiesList = document.querySelector('.responsibilities');
        responsibilitiesList.innerHTML = ''; // Clear previous items
        job.responsibilities.forEach(responsibility => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i>${responsibility}`;
          responsibilitiesList.appendChild(li);
        });

        // Qualifications
        const qualificationsList = document.querySelector('.qualifications');
        qualificationsList.innerHTML = ''; // Clear previous items
        job.qualifications.forEach(qualification => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i>${qualification}`;
          qualificationsList.appendChild(li);
        });

        // Set initial applicant count if provided in the data
        let applicantsCount = job.applyDetails ? job.applyDetails.applicantsCount || 0 : 0;
        const applicantsCountElement = document.getElementById('applicants-count');
        applicantsCountElement.innerText = applicantsCount;

        // Handle Submit Button Click to Increment Applicant Count
        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', () => {
          // Increment the count when the submit button is clicked
          applicantsCount++;

          // Update the applicant count in the UI
          applicantsCountElement.innerText = applicantsCount;

          // Optionally, you can update the applicant count in the jobDetails.json or server
          console.log('Application submitted! Total applicants:', applicantsCount);

          // Reset the form after submission (optional)
          document.getElementById('job-application-form').reset();
        });

      } else {
        console.error('Invalid jobId');
        // You can display an error message or redirect to a default page
      }
    })
    .catch(error => {
      console.error('Error loading job details:', error);
    });
}

// Call the function to load job details when the page is ready
document.addEventListener('DOMContentLoaded', loadJobDetails);
