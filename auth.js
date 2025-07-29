const DEMO_USER = 'admin';
const DEMO_PASS = '12345';

// ✅ Login Handling
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === DEMO_USER && password === DEMO_PASS) {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'home.html'; // ✅ Redirect to home
  } else {
    alert('Invalid credentials');
  }
});

// ✅ Check Authentication for other pages
if (!window.location.href.includes('index.html')) {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
  }
}

// ✅ Logout
document.getElementById('logoutBtn')?.addEventListener('click', function() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'index.html';
});
