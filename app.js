// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

// ===== AUTH TABS =====
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');

  document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
  document.getElementById('form-' + tab).classList.remove('hidden');
}

// ===== PASSWORD TOGGLE =====
function togglePass(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

// ===== SIDEBAR =====
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

// ===== PROGRESS ANIMATIONS =====
function observeProgressBars() {
  const fills = document.querySelectorAll('.animate-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => {
    fill.style.animationPlayState = 'paused';
    observer.observe(fill);
  });
}

// ===== CHECKBOX INTERACTIVITY =====
function initCheckboxes() {
  document.querySelectorAll('.check-item input[type="checkbox"]').forEach(cb => {
    if (cb.closest('.stats-list')) return; // skip stats checkboxes
    cb.addEventListener('change', function () {
      const label = this.closest('.check-item');
      if (this.checked) {
        label.style.opacity = '1';
        label.style.textDecoration = 'none';
        label.style.color = 'var(--neon-cyan)';
        setTimeout(() => { label.style.color = ''; }, 600);
      } else {
        label.style.color = 'var(--text-muted)';
        label.style.textDecoration = 'line-through';
        setTimeout(() => {
          label.style.textDecoration = '';
          label.style.color = '';
        }, 600);
      }
    });
  });
}

// ===== MOTIVATIONAL QUOTES =====
const quotes = [
  '"Eat – Sleep – Code – Repeat"',
  '"First, solve the problem. Then, write the code."',
  '"Code is like humor. When you have to explain it, it\'s bad."',
  '"Every expert was once a beginner."',
  '"Talk is cheap. Show me the code."',
  '"The best error message is the one that never shows up."',
];

function rotateQuote() {
  const quoteEl = document.querySelector('.daily-quote em');
  if (!quoteEl) return;
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % quotes.length;
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(8px)';
    quoteEl.style.transition = 'opacity 0.4s, transform 0.4s';
    setTimeout(() => {
      quoteEl.textContent = quotes[idx];
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 400);
  }, 5000);
}

// ===== CHART ANIMATION =====
function animateBars() {
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    const target = bar.style.height;
    bar.style.height = '0%';
    setTimeout(() => {
      bar.style.transition = 'height 0.6s ease';
      bar.style.height = target;
    }, 100 + i * 80);
  });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar.classList.contains('hidden')) {
      sidebar.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  }
});

// ===== LOGIN VALIDATION =====
document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');

  if (loginBtn) {
    loginBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const email = document.querySelector('#form-login .auth-input[type="email"]');
      const pass = document.getElementById('login-pass');
      if (!email.value.trim() || !pass.value.trim()) {
        showToast('Please fill in all fields', 'error');
        return;
      }
      showToast('Welcome back! 🚀', 'success');
      setTimeout(() => showPage('dashboard'), 600);
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const name = document.querySelector('#form-signup .auth-input[type="text"]');
      const email = document.querySelector('#form-signup .auth-input[type="email"]');
      const pass = document.getElementById('signup-pass');
      if (!name.value.trim() || !email.value.trim() || !pass.value.trim()) {
        showToast('Please fill in all fields', 'error');
        return;
      }
      showToast('Account created! Let\'s learn! ✨', 'success');
      setTimeout(() => showPage('dashboard'), 600);
    });
  }

  observeProgressBars();
  initCheckboxes();
  rotateQuote();
});

// ===== TOAST NOTIFICATIONS =====
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: ${type === 'success' ? 'linear-gradient(90deg,#22d3ee,#06b6d4)' : type === 'error' ? 'linear-gradient(90deg,#f87171,#ef4444)' : 'linear-gradient(90deg,#c084fc,#7c3aed)'};
    color: #0a0614;
    padding: 0.7rem 1.5rem;
    border-radius: 30px;
    font-weight: 700;
    font-size: 0.82rem;
    z-index: 9999;
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    white-space: nowrap;
    font-family: 'Exo 2', sans-serif;
    pointer-events: none;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(() => toast.remove(), 350);
  }, 2500);
}

// ===== PAGE-SPECIFIC TRIGGERS =====
// Wrap showPage to trigger animations on specific pages
const _origShowPage = showPage;
window.showPage = function (pageId) {
  _origShowPage(pageId);
  if (pageId === 'progress') {
    setTimeout(animateBars, 200);
  }
};
