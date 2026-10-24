document.addEventListener('DOMContentLoaded', () => {
  // 1. Funcionalidade de copiar IP
  const rows = document.querySelectorAll('#server-list tr');

  rows.forEach(row => {
    const copyBtn = row.querySelector('.copy-btn');
    const ipCell = row.querySelector('td:nth-child(2) .server-ip');

    if (copyBtn && ipCell) {
      const ipText = ipCell.textContent.trim();

      copyBtn.addEventListener('click', async () => {
        const commandToCopy = `${ipText}`;

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(commandToCopy);
          } else {
            const tempInput = document.createElement('input');
            tempInput.value = commandToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
          }

          copyBtn.textContent = 'Copiado!';
          copyBtn.classList.add('copied');

          setTimeout(() => {
            copyBtn.textContent = 'Copiar IP';
            copyBtn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Erro ao copiar IP:', err);
        }
      });
    }
  });

  // 2. Controle do Botão Voltar ao Topo
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 3. Navbar mobile toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.getElementById('navbar-menu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      const isOpen = navbarToggle.getAttribute('aria-expanded') === 'true';
      navbarToggle.setAttribute('aria-expanded', !isOpen);
      navbarMenu.classList.toggle('open', !isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        const isClickInside = navbarToggle.contains(e.target) || navbarMenu.contains(e.target);
        if (!isClickInside && navbarMenu.classList.contains('open')) {
          navbarToggle.setAttribute('aria-expanded', 'false');
          navbarMenu.classList.remove('open');
        }
      }
    });
  }

  // 4. Keyboard navigation for navbar links
  const navbarLinks = document.querySelectorAll('.navbar-link');
  navbarLinks.forEach(link => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
});
