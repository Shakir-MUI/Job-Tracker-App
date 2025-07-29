function getJobs() {
  return JSON.parse(localStorage.getItem('jobs')) || [];
}

function generateDashboard() {
  const jobs = getJobs();

  const totalJobs = jobs.length;
  const applied = jobs.filter(job => job.status === 'Applied').length;
  const interview = jobs.filter(job => job.status === 'Interview').length;
  const offer = jobs.filter(job => job.status === 'Offer').length;
  const rejected = jobs.filter(job => job.status === 'Rejected').length;

  // Update HTML counts
  document.getElementById('totalJobs').textContent = totalJobs;
  document.getElementById('appliedJobs').textContent = applied;
  document.getElementById('interviewJobs').textContent = interview;
  document.getElementById('offerJobs').textContent = offer;

  // Pie Chart
  const ctx = document.getElementById('jobsChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
      datasets: [{
        data: [applied, interview, offer, rejected],
        backgroundColor: ['#0d6efd', '#ffc107', '#28a745', '#dc3545']
      }]
    },
    options: {
      plugins: { legend: { display: false } }
    }
  });
}

document.addEventListener('DOMContentLoaded', generateDashboard);
