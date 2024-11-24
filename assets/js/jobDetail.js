// Fetch and save job details to localStorage
fetch('./assets/json/jobDetails.json')
  .then(response => response.json())
  .then(data => {
    if (!localStorage.getItem('jobDetails')) {
      localStorage.setItem('jobDetails', JSON.stringify(data));
    }
  });

// Increment applicants count and update localStorage
function incrementApplicants(jobId) {
  const jobDetails = JSON.parse(localStorage.getItem('jobDetails'));
  jobDetails[jobId].applicants = (jobDetails[jobId].applicants || 0) + 1;
  localStorage.setItem('jobDetails', JSON.stringify(jobDetails)); // Save back to localStorage
  return jobDetails[jobId]; // Return the updated job object
}

// Handle Apply Now button clicks
document.querySelectorAll('.apply-now').forEach(button => {
  button.addEventListener('click', function () {
    const jobId = this.getAttribute('data-job-id'); // Get job ID from button

    // Fetch job details from localStorage
    const jobDetails = JSON.parse(localStorage.getItem('jobDetails'));
    const job = jobDetails[jobId]; // Get job-specific data

    // Populate the modal
    document.querySelector('.job-title').innerText = job.jobTitle;
    document.querySelector('.location').innerText = `Location: ${job.location}`;
    document.querySelector('.job-type').innerText = `Job Type: ${job.jobType}`;
    document.querySelector('.salary-range').innerText = `Salary: ${job.salaryRange}`;
    document.querySelector('.company-logo').src = job.companyLogo;
    document.querySelector('.job-description').innerText = job.jobDescription;

    const responsibilities = document.querySelector('.responsibilities');
    responsibilities.innerHTML = '';
    job.responsibilities.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i>${item}`;
      responsibilities.appendChild(li);
    });

    const qualifications = document.querySelector('.qualifications');
    qualifications.innerHTML = '';
    job.qualifications.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa fa-angle-right text-primary me-2"></i>${item}`;
      qualifications.appendChild(li);
    });

    // Set applicants count
    document.getElementById('applicants-count').textContent = job.applicants || 0;
    document.getElementById('vacancy-count').textContent = job.vacancy || 5;

    // Show the job details modal
    const jobModal = new bootstrap.Modal(document.getElementById('jobModal'));
    jobModal.show();

    // Handle form submission
    const form = document.getElementById('job-application-form');
    form.onsubmit = function (e) {
      e.preventDefault();

      // Increment the applicants count in localStorage
      const updatedJob = incrementApplicants(jobId);

      // Update the applicants count in the modal
      document.getElementById('applicants-count').textContent = updatedJob.applicants;

      // Reset the form fields
      form.reset();

      // Show success modal after submission
      jobModal.hide(); // Hide the current modal
      showSuccessModal(); // Show success message
    };
  });
});

// Function to display a success modal
function showSuccessModal() {
  const successModalHtml = `
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Application Submitted</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <p class="text-success">Your application has been submitted successfully!</p>
            <p>We will review your application and get back to you soon. Thank you for applying!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', successModalHtml);

  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  successModal.show();

  document.getElementById('successModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('successModal').remove();
  });
}
