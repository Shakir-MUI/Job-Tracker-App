// ✅ Get Jobs from localStorage
function getJobs() {
  return JSON.parse(localStorage.getItem('jobs')) || [];
}

// ✅ Save Jobs to localStorage
function saveJobs(jobs) {
  localStorage.setItem('jobs', JSON.stringify(jobs));
}

// ✅ Display Jobs on Home Page
function displayJobs() {
  const jobList = document.getElementById('jobList');
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const filterValue = document.getElementById('statusFilter').value;

  let jobs = getJobs();

  // ✅ Filter by search
    jobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchValue) ||
    job.company.toLowerCase().includes(searchValue)
  );

  // ✅ Filter by status
  if (filterValue !== 'All') {
    jobs = jobs.filter(job => job.status === filterValue);
  }

  jobList.innerHTML = "";

  if (jobs.length === 0) {
    jobList.innerHTML = "<p class='text-center text-muted'>No jobs found.</p>";
    return;
  }

  // ✅ Display each job as a card
  jobs.forEach((job, index) => {
    const card = document.createElement('div');
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <h5 class="card-title">${job.title}</h5>
          <p class="card-text"><strong>Company:</strong> ${job.company}</p>
          <p><span class="badge bg-info">${job.status}</span></p>
          ${job.link ? `<a href="${job.link}" target="_blank" class="btn btn-sm btn-outline-primary">View Job</a>` : ''}
          <hr>
          <button class="btn btn-sm btn-warning me-2" onclick="editJob(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteJob(${index})">Delete</button>
        </div>
      </div>
    `;
    jobList.appendChild(card);
  });
}

// ✅ Delete Job
function deleteJob(index) {
  if (confirm("Are you sure you want to delete this job?")) {
    let jobs = getJobs();
    jobs.splice(index, 1);
    saveJobs(jobs);
    displayJobs();
  }
}

// ✅ Edit Job
function editJob(index) {
  let jobs = getJobs();
  const job = jobs[index];

  const newTitle = prompt("Edit Job Title:", job.title);
  const newCompany = prompt("Edit Company Name:", job.company);
  const newStatus = prompt("Edit Status (Applied, Interview, Offer, Rejected):", job.status);
  const newLink = prompt("Edit Job Link (optional):", job.link);

  if (newTitle && newCompany && newStatus) {
    jobs[index] = {
      title: newTitle,
      company: newCompany,
      status: newStatus,
      link: newLink
    };
    saveJobs(jobs);
    displayJobs();
  }
}

// ✅ Event Listeners
document.getElementById('searchInput').addEventListener('input', displayJobs);
document.getElementById('statusFilter').addEventListener('change', displayJobs);

// ✅ Initial Load
document.addEventListener('DOMContentLoaded', displayJobs);
