const SAMPLE_DATA = [
    {
      "id": "1742089709318",
      "category": "Test",
      "title": "Test 1",
      "url": "test1",
      "message": "test \n# test \n\n"
    },
    {
      "id": "1742089731914",
      "category": "Test 2",
      "title": "test 2",
      "url": "tes2",
      "message": "# markdown"
    }
  ];

  setTimeout(() => {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
      loadingEl.classList.add('finished');
      setTimeout(() => {
        loadingEl.style.display = 'none';
      }, 500);
    }
  }, 3000);
  
  function setupSearchShortcut() {
    const searchBar = document.querySelector('.search-bar');
    
    document.addEventListener('keydown', function(e) {
      if (e.key === '/' && 
          document.activeElement.tagName !== 'INPUT' && 
          document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault(); 
        searchBar.focus(); 
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    
    setupSearchShortcut();
    
    loadDocumentation()
      .then(docs => {
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
          loadingEl.classList.add('finished');
          setTimeout(() => {
            loadingEl.style.display = 'none';
          }, 500);
        }
        
        if (!docs || docs.length === 0) {
          console.log('No documentation found or empty documentation.');
          return;
        }
        
        const allHashtags = extractAllHashtags(docs);
        
        if (allHashtags.length > 0) {
          populateHashtagsFilter(allHashtags);
          document.getElementById('hashtags-filter').style.display = 'block';
        }
        
        const docsWithHashtags = docs.map(doc => {
          const hashtags = extractHashtags(doc.message);
          return { ...doc, hashtags };
        });
  
  function showWelcomeScreen() {
    const docContent = document.getElementById('doc-content');
    if (!docContent) return;
    
    const searchOverlay = document.getElementById('search-overlay');
    if (searchOverlay) searchOverlay.style.display = 'none';
    
    document.querySelectorAll('.doc-item').forEach(item => {
      item.classList.remove('active');
    });
    
    docContent.style.opacity = '0';
    docContent.style.transform = 'translateY(20px)';
    
    docContent.innerHTML = `
      <h1 class="doc-title" style="margin-bottom: 1rem;">Welcome to Documentation</h1>
      <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: var(--on-surface-medium);">Select a category and document from the sidebar to get started.</p>
      
      <div style="margin-top: 1.5rem; padding: 1.8rem; background-color: var(--surface-2); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.07); box-shadow: var(--elevation-1); transition: all var(--transition-medium);" class="welcome-card">
        <h3 style="margin-top: 0; color: var(--primary-color); font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
          <span style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.5rem;">✨</span> 
          Getting Started
        </h3>
        <p style="margin-bottom: 1.2rem; line-height: 1.6;">This documentation site helps you find and navigate through documentation content with ease.</p>
        
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <div style="flex: 1; min-width: 200px; background-color: var(--surface-3); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); transition: all var(--transition-medium);" class="feature-card">
            <h4 style="color: var(--primary-color); margin-top: 0; margin-bottom: 0.5rem; font-size: 1rem;">Browse Categories</h4>
            <p style="margin-bottom: 0; font-size: 0.95rem; color: var(--on-surface-light);">Use the sidebar to navigate through document categories and topics.</p>
          </div>
          
          <div style="flex: 1; min-width: 200px; background-color: var(--surface-3); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); transition: all var(--transition-medium);" class="feature-card">
            <h4 style="color: var(--secondary-color); margin-top: 0; margin-bottom: 0.5rem; font-size: 1rem;">Quick Search</h4>
            <p style="margin-bottom: 0; font-size: 0.95rem; color: var(--on-surface-light);">Press <kbd style="background: var(--surface-4); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; box-shadow: 0 2px 0 rgba(0,0,0,0.2);">/</kbd> to quickly search all content.</p>
          </div>
        </div>
        
        <div style="background-color: rgba(138, 132, 255, 0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem; display: flex; align-items: center; gap: 0.8rem;">
          <div style="background-color: var(--primary-color); width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 50%; font-size: 1rem; font-weight: bold;">i</div>
          <p style="margin: 0; font-size: 0.95rem;">Click on hashtags to filter content by specific topics.</p>
        </div>
      </div>
    `;
    
    setTimeout(() => {
      const featureCards = document.querySelectorAll('.feature-card');
      featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = 'var(--elevation-2)';
          card.style.backgroundColor = 'var(--surface-4)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = 'none';
          card.style.backgroundColor = 'var(--surface-3)';
        });
      });
      
      const welcomeCard = document.querySelector('.welcome-card');
      if (welcomeCard) {
        welcomeCard.addEventListener('mouseenter', () => {
          welcomeCard.style.transform = 'translateY(-3px)';
          welcomeCard.style.boxShadow = 'var(--elevation-2)';
          welcomeCard.style.backgroundColor = 'var(--surface-3)';
        });
        
        welcomeCard.addEventListener('mouseleave', () => {
          welcomeCard.style.transform = 'translateY(0)';
          welcomeCard.style.boxShadow = 'var(--elevation-1)';
          welcomeCard.style.backgroundColor = 'var(--surface-2)';
        });
      }
      
      docContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      docContent.style.opacity = '1';
      docContent.style.transform = 'translateY(0)';
    }, 50);
  }
    
  document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.getElementById('logo-home');
    if (logoContainer) {
      logoContainer.addEventListener('click', function() {
        window.location.href = 'https://layeredy.com';
      });
    }
  });
        
        populateSidebar(docsWithHashtags);
        
        setupSearch(docsWithHashtags);
        
        document.getElementById('clear-filters').addEventListener('click', () => {
          document.querySelectorAll('.hashtag-filter').forEach(tag => {
            tag.classList.remove('active');
          });
          filterDocsByHashtags([]);
        });
        
        setupNavigation();
        
        setTimeout(() => {
          handleUrlParameters();
        }, 300);
      })
      .catch(error => {
        console.error('Failed to initialize documentation:', error);
        const loadingEl = document.getElementById('loading');
        if (loadingEl) loadingEl.style.display = 'none';
        
        const docContent = document.getElementById('doc-content');
        docContent.style.opacity = '0';
        docContent.style.transform = 'translateY(20px)';
        
        docContent.innerHTML = `
          <h1 class="doc-title">Error Initializing Documentation</h1>
          <div style="background: linear-gradient(135deg, rgba(255, 92, 138, 0.1), rgba(255, 92, 138, 0.05)); padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--error); margin: 1.5rem 0;">
            <h3 style="color: var(--error); margin-top: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.2rem;">⚠️</span> Something went wrong
            </h3>
            <p style="margin-bottom: 0.5rem;">There was a problem setting up the documentation.</p>
            <p style="margin-bottom: 0; font-size: 0.95rem; color: var(--on-surface-light);">Please check the browser console for additional details.</p>
          </div>
          <div style="margin-top: 2rem; text-align: center;">
            <button id="retry-button" style="background-color: var(--primary-color); color: var(--on-primary); border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all var(--transition-medium); box-shadow: var(--elevation-1);">Try Again</button>
          </div>
        `;
        
        setTimeout(() => {
          const retryButton = document.getElementById('retry-button');
          if (retryButton) {
            retryButton.addEventListener('mouseenter', () => {
              retryButton.style.transform = 'translateY(-3px)';
              retryButton.style.boxShadow = 'var(--elevation-2)';
              retryButton.style.backgroundColor = 'var(--primary-variant)';
            });
            
            retryButton.addEventListener('mouseleave', () => {
              retryButton.style.transform = 'translateY(0)';
              retryButton.style.boxShadow = 'var(--elevation-1)';
              retryButton.style.backgroundColor = 'var(--primary-color)';
            });
            
            retryButton.addEventListener('click', () => {
              window.location.reload();
            });
          }
          
          docContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          docContent.style.opacity = '1';
          docContent.style.transform = 'translateY(0)';
        }, 50);
      });
  });

  function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
      });
      
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar && !sidebar.contains(e.target) && 
            e.target !== sidebarToggle &&
            sidebar.classList.contains('show')) {
          sidebar.classList.remove('show');
        }
      });
    }
  }

  async function loadDocumentation() {
    try {
      console.log('Attempting to load config/documentation.json');
      const response = await fetch('config/documentation.json');
      
      if (!response.ok) {
        console.warn(`Failed to load config/documentation.json (status: ${response.status})`);
        throw new Error('Documentation file not found');
      }
      
      const data = await response.json();
      console.log('Successfully loaded documentation:', data);
      return data;
    } catch (error) {
      console.error('Error loading documentation:', error);
      
                const docContent = document.getElementById('doc-content');
        docContent.style.opacity = '0';
        docContent.style.transform = 'translateY(20px)';
        
        docContent.innerHTML = `
            <div style="padding: 2rem; background-color: rgba(255, 59, 48, 0.15); border-radius: 16px; border: 1px solid rgba(255, 59, 48, 0.3); box-shadow: var(--elevation-2); transition: all var(--transition-medium);" class="error-card">
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <div style="background: linear-gradient(135deg, #ff1500, #ff453a); width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 50%; font-size: 1.5rem; flex-shrink: 0; box-shadow: var(--elevation-1);">!</div>
                <div>
                <h3 style="margin-top: 0; color: #ff2200; font-size: 1.2rem;">Documentation File Missing</h3>
                <p style="font-size: 1.05rem; margin-bottom: 1.5rem; line-height: 1.6; color: #ff3b30;">The config/documentation.json file could not be found or loaded. This file contains the content that powers this documentation system.</p>
              <div style="background-color: rgba(255, 120, 100, 0.15); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 3px solid #ff3b30;">
            <p style="margin: 0; font-size: 0.95rem; color: #ff3b30;">You'll need to create a documentation.json file and place it in the config directory.</p>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: #ff30a9; font-size: 1rem;">→</span>
            <p style="margin: 0;">Visit <a href="https://writer.layeredy.com" style="color:#ff30a9; font-weight: 600; text-decoration: none; border-bottom: 2px solid rgba(255, 59, 48, 0.5); padding-bottom: 2px; transition: all var(--transition-medium);" class="writer-link">https://writer.layeredy.com</a> to create your documentation file.</p>
              </div>
            </div>
          </div>
        </div>
          `;
      
      setTimeout(() => {
        const errorCard = document.querySelector('.error-card');
        if (errorCard) {
          errorCard.addEventListener('mouseenter', () => {
            errorCard.style.transform = 'translateY(-3px)';
            errorCard.style.boxShadow = 'var(--elevation-3)';
            errorCard.style.backgroundColor = 'var(--surface-3)';
          });
          
          errorCard.addEventListener('mouseleave', () => {
            errorCard.style.transform = 'translateY(0)';
            errorCard.style.boxShadow = 'var(--elevation-2)';
            errorCard.style.backgroundColor = 'var(--surface-2)';
          });
        }
        
        const writerLink = document.querySelector('.writer-link');
        if (writerLink) {
          writerLink.addEventListener('mouseenter', () => {
            writerLink.style.borderBottomColor = 'var(--primary-color)';
            writerLink.style.color = 'var(--secondary-color)';
          });
          
          writerLink.addEventListener('mouseleave', () => {
            writerLink.style.borderBottomColor = 'rgba(138, 132, 255, 0.3)';
            writerLink.style.color = 'var(--primary-color)';
          });
        }
        
        docContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        docContent.style.opacity = '1';
        docContent.style.transform = 'translateY(0)';
      }, 50);
      
      return [];
    }
  }

  function extractHashtags(content) {
    if (!content) return [];
    
    const regex = /#(\w+)/g;
    const hashtags = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      hashtags.push(match[1]);
    }
    
    return [...new Set(hashtags)]; 
  }

  function extractAllHashtags(docs) {
    const allHashtags = [];
    
    docs.forEach(doc => {
      if (doc.message) {
        const hashtags = extractHashtags(doc.message);
        allHashtags.push(...hashtags);
      }
    });
    
    return [...new Set(allHashtags)].sort();
  }

  function populateHashtagsFilter(hashtags) {
    if (hashtags.length === 0) return;
    
    const hashtagsList = document.getElementById('hashtags-list');
    if (!hashtagsList) return;
    
    hashtagsList.innerHTML = '';
    
    hashtags.forEach(hashtag => {
      const hashtagEl = document.createElement('span');
      hashtagEl.className = 'hashtag-filter';
      hashtagEl.textContent = `#${hashtag}`;
      hashtagEl.setAttribute('data-hashtag', hashtag);
      
      hashtagEl.addEventListener('click', () => {
        hashtagEl.classList.toggle('active');
        
        const activeHashtags = Array.from(document.querySelectorAll('.hashtag-filter.active'))
          .map(el => el.getAttribute('data-hashtag'));
        
        filterDocsByHashtags(activeHashtags);
      });
      
      hashtagsList.appendChild(hashtagEl);
    });
  }

  function filterDocsByHashtags(activeHashtags) {
    if (activeHashtags.length === 0) {
      document.querySelectorAll('.category').forEach(cat => {
        cat.style.display = 'block';
      });
      
      document.querySelectorAll('.doc-item').forEach(docItem => {
        docItem.style.display = 'block';
      });
      return;
    }
    
    document.querySelectorAll('.category').forEach(cat => {
      cat.style.display = 'none';
    });
    
    document.querySelectorAll('.doc-item').forEach(docItem => {
      const hashtagsStr = docItem.getAttribute('data-hashtags');
      if (!hashtagsStr) {
        docItem.style.display = 'none';
        return;
      }
      
      try {
        const hashtags = JSON.parse(hashtagsStr);
        const hasAllTags = activeHashtags.every(tag => hashtags.includes(tag));
        
        if (hasAllTags) {
          docItem.style.display = 'block';
          const parentSubmenu = docItem.closest('.submenu');
          if (parentSubmenu) {
            const parentCategory = parentSubmenu.previousElementSibling;
            if (parentCategory) {
              parentCategory.style.display = 'block';
              parentSubmenu.classList.add('show');
              parentCategory.classList.add('active');
            }
          }
        } else {
          docItem.style.display = 'none';
        }
      } catch (error) {
        console.error('Error parsing hashtags:', error);
        docItem.style.display = 'none';
      }
    });
  }

  function populateSidebar(docs) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    sidebar.innerHTML = '';
    
    const categories = [...new Set(docs.map(doc => doc.category))];
    
    categories.forEach((category, index) => {
      const categoryEl = document.createElement('div');
      categoryEl.className = 'category';
      categoryEl.textContent = category;
      
      if (index === 0) {
        categoryEl.classList.add('active');
      }
      
      const submenu = document.createElement('div');
      submenu.className = 'submenu';
      
      const categoryDocs = docs.filter(doc => doc.category === category);
      
      categoryDocs.forEach(doc => {
        const docItem = document.createElement('div');
        docItem.className = 'doc-item';
        docItem.textContent = doc.title;
        docItem.setAttribute('data-id', doc.id);
        docItem.setAttribute('data-hashtags', JSON.stringify(doc.hashtags || []));
        
        docItem.addEventListener('click', () => {
          document.querySelectorAll('.doc-item').forEach(item => {
            item.classList.remove('active');
          });
          
          docItem.classList.add('active');
          
          displayDocument(doc);
          
          const url = new URL(window.location);
          url.searchParams.set('doc', doc.id);
          window.history.pushState({}, '', url);
          
          if (window.innerWidth <= 768) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.remove('show');
          }
        });
        
        submenu.appendChild(docItem);
      });
      
      categoryEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('doc-item')) return;
        
        categoryEl.classList.toggle('active');
        
        submenu.classList.toggle('show');
      });
      
      sidebar.appendChild(categoryEl);
      sidebar.appendChild(submenu);
      
      if (index === 0) {
        submenu.classList.add('show');
      }
    });
  }

  function displayDocument(doc) {
    const docContent = document.getElementById('doc-content');
    if (!docContent) return;
    
    const searchOverlay = document.getElementById('search-overlay');
    if (searchOverlay) searchOverlay.style.display = 'none';
    
    docContent.style.opacity = '0';
    docContent.style.transform = 'translateY(20px)';
    
    let hashtagsHtml = '';
    if (doc.hashtags && doc.hashtags.length > 0) {
      hashtagsHtml = `
        <div class="tags-container">
          ${doc.hashtags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
      `;
    }
    
    let htmlContent = '';
    try {
      htmlContent = marked.parse(doc.message || '');
    } catch (error) {
      console.error('Error parsing markdown:', error);
      htmlContent = `
        <div style="background-color: rgba(255, 92, 138, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 3px solid var(--error);">
          <p style="margin: 0 0 0.5rem 0; color: var(--error); font-weight: 500;">Error rendering markdown</p>
          <p style="margin: 0; font-family: monospace; font-size: 0.9rem;">${error.message}</p>
        </div>
        <pre style="background-color: var(--surface-2); padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.9rem;">${doc.message}</pre>
      `;
    }
    
    const tocHtml = generateTableOfContents(htmlContent);
    
    docContent.innerHTML = `
      <div class="doc-title-container">
        <h1 class="doc-title">${doc.title || 'Untitled Document'}</h1>
        <div class="doc-category">${doc.category || 'Uncategorized'}</div>
      </div>
      ${hashtagsHtml}
      ${tocHtml}
      <div class="markdown-content">${htmlContent}</div>
    `;
    
    setTimeout(() => {
      docContent.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            targetElement.style.transition = 'background-color 0.5s';
            targetElement.style.backgroundColor = 'rgba(138, 132, 255, 0.1)';
            setTimeout(() => {
              targetElement.style.backgroundColor = 'transparent';
            }, 1500);
          }
        });
      });
      
      docContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      docContent.style.opacity = '1';
      docContent.style.transform = 'translateY(0)';
    }, 50);
  }
  
  function generateTableOfContents(htmlContent) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4');
    if (headings.length < 3) return ''; 
    
    let tocHtml = `
      <div style="background-color: var(--surface-2); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid rgba(255, 255, 255, 0.05); max-height: 300px; overflow-y: auto;" class="toc-container">
        <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--primary-color); font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
          <span style="color: var(--primary-color);">📑</span> Table of Contents
        </h3>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
    `;
    
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      
      const level = parseInt(heading.tagName.substring(1));
      const indent = (level - 1) * 1;
      
      tocHtml += `
        <li style="margin-bottom: 0.5rem; padding-left: ${indent}rem; transition: all var(--transition-medium);" class="toc-item">
          <a href="#${heading.id}" style="color: var(--on-surface-medium); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; transition: all var(--transition-medium);" class="toc-link">
            <span style="font-size: 0.7rem; color: var(--primary-color); opacity: 0.7;">•</span>
            ${heading.textContent}
          </a>
        </li>
      `;
    });
    
    tocHtml += `
        </ul>
      </div>
    `;
    
    return tocHtml;
    
    docContent.querySelectorAll('.tag').forEach(tagEl => {
      tagEl.addEventListener('click', () => {
        const hashtag = tagEl.textContent.substring(1);
        
        const hashtagFilter = document.querySelector(`.hashtag-filter[data-hashtag="${hashtag}"]`);
        
        if (hashtagFilter) {
          hashtagFilter.classList.add('active');
          
          const activeHashtags = Array.from(document.querySelectorAll('.hashtag-filter.active'))
            .map(el => el.getAttribute('data-hashtag'));
          
          filterDocsByHashtags(activeHashtags);
          
          const hashtagsFilter = document.getElementById('hashtags-filter');
          if (hashtagsFilter) hashtagsFilter.style.display = 'block';
        }
      });
    });
  }

  function setupSearch(docs) {
    const searchBar = document.querySelector('.search-bar');
    const searchResults = document.getElementById('search-results');
    const searchOverlay = document.getElementById('search-overlay');
    
    if (!searchBar || !searchResults || !searchOverlay) return;
    
    let selectedIndex = -1;
    let filteredDocs = [];
    
    function selectSearchResult(index) {
      document.querySelectorAll('.search-result-item').forEach(item => {
        item.classList.remove('selected');
      });
      
      const items = document.querySelectorAll('.search-result-item');
      if (index >= 0 && index < items.length) {
        selectedIndex = index;
        items[index].classList.add('selected');
        
        items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    
    function handleKeyNavigation(e) {
      const items = document.querySelectorAll('.search-result-item');
      
      if (searchOverlay.style.display !== 'block' || items.length === 0) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectSearchResult(Math.min(selectedIndex + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectSearchResult(Math.max(selectedIndex - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredDocs.length) {
          const doc = filteredDocs[selectedIndex];
          displayDocument(doc);
          
          searchOverlay.style.display = 'none';
          searchBar.value = '';
          
          const url = new URL(window.location);
          url.searchParams.set('doc', doc.id);
          window.history.pushState({}, '', url);
          
          updateSidebarSelection(doc.id);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        searchOverlay.style.display = 'none';
        searchBar.value = '';
      }
    }
    
    function updateSidebarSelection(docId) {
      const docItem = document.querySelector(`.doc-item[data-id="${docId}"]`);
      if (docItem) {
        document.querySelectorAll('.doc-item').forEach(item => {
          item.classList.remove('active');
        });
        
        docItem.classList.add('active');
        
        const submenu = docItem.closest('.submenu');
        if (submenu) {
          submenu.classList.add('show');
          
          const category = submenu.previousElementSibling;
          if (category) {
            category.classList.add('active');
          }
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyNavigation);
    
    searchBar.addEventListener('input', () => {
      const query = searchBar.value.trim().toLowerCase();
      
      if (query === '') {
        searchOverlay.style.display = 'none';
        return;
      }
      
      selectedIndex = -1;
      
      filteredDocs = docs.filter(doc => {
        const titleMatch = doc.title && doc.title.toLowerCase().includes(query);
        const messageMatch = doc.message && doc.message.toLowerCase().includes(query);
        return titleMatch || messageMatch;
      });
      
      searchOverlay.style.display = 'block';
      searchResults.style.display = 'block';
      
      searchResults.innerHTML = '';
      
      if (filteredDocs.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        return;
      }
      
      function highlightMatch(text, query) {
        if (!text) return '';
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-result-highlight">$1</span>');
      }
      
      filteredDocs.forEach((doc, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.setAttribute('data-index', index);
        
        const titleHighlighted = highlightMatch(doc.title || 'Untitled', query);
        
        let snippet = '';
        if (doc.message) {
          const lowerMessage = doc.message.toLowerCase();
          const queryIndex = lowerMessage.indexOf(query);
          
          if (queryIndex !== -1) {
            const start = Math.max(0, queryIndex - 40);
            const end = Math.min(doc.message.length, queryIndex + query.length + 40);
            snippet = doc.message.substring(start, end);
            
            if (start > 0) snippet = '...' + snippet;
            if (end < doc.message.length) snippet += '...';
            
            snippet = highlightMatch(snippet, query);
          }
        }
        
        resultItem.innerHTML = `
          <div class="search-result-title">${titleHighlighted}</div>
          <div class="search-result-category">${doc.category || 'Uncategorized'}</div>
          ${snippet ? `<div class="search-result-snippet">${snippet}</div>` : ''}
        `;
        
        resultItem.addEventListener('mouseenter', () => {
          selectSearchResult(index);
        });
        
        resultItem.addEventListener('click', () => {
          displayDocument(doc);
          
          searchOverlay.style.display = 'none';
          searchBar.value = '';
          
          const url = new URL(window.location);
          url.searchParams.set('doc', doc.id);
          window.history.pushState({}, '', url);
          
          updateSidebarSelection(doc.id);
        });
        
        searchResults.appendChild(resultItem);
      });
      
      if (filteredDocs.length > 0) {
        selectSearchResult(0);
      }
    });
    
    searchBar.addEventListener('focus', () => {
      if (searchBar.value.trim() !== '') {
        searchOverlay.style.display = 'block';
      }
    });
    
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.style.display = 'none';
      }
    });
    
    document.querySelector('.search-popup').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('doc');
    
    if (docId) {
      const docItem = document.querySelector(`.doc-item[data-id="${docId}"]`);
      if (docItem) {
        docItem.click();
      }
    }
  }
  
  function setupNavigation() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('doc-item')) {
        const docId = e.target.getAttribute('data-id');
        if (docId) {
          const url = new URL(window.location);
          url.searchParams.set('doc', docId);
          window.history.pushState({}, '', url);
        }
      }
    });
    
    window.addEventListener('popstate', () => {
      handleUrlParameters();
    });
  }