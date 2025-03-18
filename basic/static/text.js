async function loadTextConfig() {
    try {
      const response = await fetch('config/text.json');
      if (!response.ok) {
        throw new Error('Failed to load text configuration');
      }
      const textConfig = await response.json();
      applyTextConfig(textConfig);
    } catch (error) {
      console.error('Error loading text configuration:', error);
    }
  }
  
  function applyTextConfig(config) {
    document.title = config.documentTitle;
    
    const logoImage = document.getElementById('logo-image');
    if (logoImage) {
      logoImage.src = config.logo.imageUrl;
      logoImage.alt = config.logo.altText || 'Logo';
    }
    
    const logoContainer = document.getElementById('logo-home');
    if (logoContainer) {
      logoContainer.onclick = function() {
        window.location.href = config.logo.linkUrl;
      };
      logoContainer.style.cursor = 'pointer';
    }
    
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.placeholder = config.searchPlaceholder;
    }
    
    const navHome = document.getElementById('nav-home');
    const navBilling = document.getElementById('nav-billing');
    const navGithub = document.getElementById('nav-github');
    
    if (navHome) {
      navHome.textContent = config.navigation.home.text;
      navHome.href = config.navigation.home.url;
    }
    if (navBilling) {
      navBilling.textContent = config.navigation.billing.text;
      navBilling.href = config.navigation.billing.url;
    }
    if (navGithub) {
      navGithub.textContent = config.navigation.github.text;
      navGithub.href = config.navigation.github.url;
    }
    
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.textContent = config.sidebarToggle;
    }
    
    const hashtagsTitle = document.getElementById('hashtags-title');
    if (hashtagsTitle) {
      hashtagsTitle.textContent = config.hashtagsFilter.title;
    }
    
    const clearFilters = document.getElementById('clear-filters');
    if (clearFilters) {
      clearFilters.textContent = config.hashtagsFilter.clearFilters;
    }
    
    const docTitle = document.getElementById('doc-title');
    if (docTitle) {
      docTitle.textContent = config.welcome.title;
    }
    
    const docDescription = document.getElementById('doc-description');
    if (docDescription) {
      docDescription.textContent = config.welcome.description;
    }
    
    const footerText = document.getElementById('footer-text');
    if (footerText) {
      footerText.innerHTML = `${config.copyright} | Powered by<a href="https://lyrdy.co/docs" class="bold">lyrdy/docs</a>`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadTextConfig);