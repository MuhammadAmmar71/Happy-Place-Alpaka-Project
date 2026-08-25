

document.addEventListener('DOMContentLoaded', function () {

  var menuBtn = document.getElementById('menuBtn');
  var navlinks = document.getElementById('navlinks');

  if (menuBtn && navlinks) {
    menuBtn.addEventListener('click', function () {
      var open = navlinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });

    navlinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navlinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

   
    document.addEventListener('click', function (ev) {
      if (!navlinks.classList.contains('open')) {
        return;
      }
      if (navlinks.contains(ev.target) || menuBtn.contains(ev.target)) {
        return;
      }
      navlinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  if (navlinks) {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navlinks.querySelectorAll('a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === currentPath) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: .12 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  }

  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var ok = document.getElementById('formOk');
      if (ok) {
        ok.style.display = 'block';
      }
      var submitBtn = form.querySelector('button[type=submit]');
      if (submitBtn) {
        submitBtn.style.display = 'none';
      }
    });
  }

});
