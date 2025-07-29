function getJobs() {
  return JSON.parse(localStorage.getItem('jobs')) || [];
}

function saveJobs(jobs) {
  localStorage.setItem('jobs', JSON.stringify(jobs));
}

document.getElementById('jobForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('jobTitle').value.trim();
  const company = document.getElementById('companyName').value.trim();
  const status = document.getElementById('status').value;
  const link = document.getElementById('jobLink').value.trim();

  if (title && company) {
    const jobs = getJobs();
    jobs.push({ title, company, status, link });
    saveJobs(jobs);

    alert('Job added successfully!');
    document.getElementById('jobForm').reset();
  } else {
    alert('Please fill all required fields.');
  }
});
