// Function to fetch and display job details
function loadJobDetails() {
    fetch('./assets/json/jobDetails.json')
      .then(response => response.json())
      .then(data => {
        // Job Info
        document.querySelector('.job-title').innerText = data.jobTitle;
        document.querySelector('.location').innerText = data.location;
        document.querySelector('.job-type').innerText = data.jobType;
        document.querySelector('.salary-range').innerText = data.salaryRange;
        document.querySelector('.company-logo').src = data.companyLogo;
  
        // Job Description
        document.querySelector('.job-description').innerText = data.jobDescription;
  
        // Responsibilities
        const responsibilitiesList = document.querySelector('.responsibilities');
        data.responsibilities.forEach(responsibility => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i>${responsibility}`;
          responsibilitiesList.appendChild(li);
        });
  
        // Qualifications
        const qualificationsList = document.querySelector('.qualifications');
        data.qualifications.forEach(qualification => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i>${qualification}`;
          qualificationsList.appendChild(li);
        });
  
        // Apply Details
        document.querySelector('.published-date').innerText = data.applyDetails.publishedDate;
        document.querySelector('.vacancy').innerText = data.applyDetails.vacancy;
        document.querySelector('.job-nature').innerText = data.applyDetails.jobNature;
        document.querySelector('.salary').innerText = data.applyDetails.salary;
        document.querySelector('.apply-location').innerText = data.applyDetails.location;
        document.querySelector('.deadline').innerText = data.applyDetails.deadline;
  
      })
      .catch(error => {
        console.error('Error loading job details:', error);
      });
  }
  
  // Call the function to load job details when the page is ready
  document.addEventListener('DOMContentLoaded', loadJobDetails);
  