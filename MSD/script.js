document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded successfully');

  const revealElems = document.querySelectorAll('section, .form-container, footer, .job-categories, .hero');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealElems.forEach(el => io.observe(el));

  const searchForm = document.querySelector('.search-bar');
  if (searchForm) {
    const input = searchForm.querySelector('input');
    searchForm.addEventListener('submit', e => {
      e.preventDefault(); 
      filterCategories(input.value);
    });
    input.addEventListener('input', () => filterCategories(input.value));
  }
  function filterCategories(query) {
    document.querySelectorAll('.category-card').forEach(card => {
      const match = card.textContent.toLowerCase().includes(query.toLowerCase());
      card.style.display = match ? '' : 'none';
    });
  }

  /* Hover effect for job categories */
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.03)';
      card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('input[required]').forEach(inp => {
        if (!inp.value.trim()) {
          inp.style.borderColor = 'red';
          valid = false;
        } else {
          inp.style.borderColor = '';
        }
      });
      const pass = form.querySelector('input[placeholder="Password"]');
      const confirm = form.querySelector('input[placeholder="Confirm Password"]');
      if (pass && confirm && pass.value !== confirm.value) {
        alert('Passwords do not match!');
        valid = false;
      }
      if (valid) {
        alert('Form submitted successfully! (Demo)');
        form.reset();
      }
    });
  });

  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    const text = heroH1.textContent.trim();
    heroH1.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroH1.textContent += text.charAt(i);
        i++;
        setTimeout(type, 40);
      }
    };
    type();
  }
});
