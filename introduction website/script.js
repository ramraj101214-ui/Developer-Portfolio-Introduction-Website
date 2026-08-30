/**
 * Deepak | Developer Portfolio JavaScript Logic
 * - Sticky Navbar Header & Glassmorphic Backdrop
 * - Active Navigation Link Highlighting (IntersectionObserver)
 * - Mobile Navigation Menu Drawer Toggle & Morphing Hamburger
 * - Animated Stats Suffixes & Scroll-Triggered Progress Bars
 * - Real-time Form Validation & Accessible Toast Notifications
 * - Fully Interactive Live Demo Modals for All Featured Projects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements Selection
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const formSuccessToast = document.getElementById('formSuccessToast');
  const globalToast = document.getElementById('globalToast');
  const globalToastMsg = document.getElementById('globalToastMsg');

  // Modal Elements
  const projectDemoModal = document.getElementById('projectDemoModal');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  /* ==========================================================================
     1. Sticky Navbar Header Effect
     ========================================================================== */
  const handleScrollHeader = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });

  /* ==========================================================================
     2. Mobile Menu Toggle & Navigation Links Handling
     ========================================================================== */
  if (hamburgerBtn && navMenu) {
    const closeMobileMenu = () => {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      if (navOverlay) navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      if (navOverlay) navOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Keyboard navigation: Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. Active Link Highlighting on Scroll (IntersectionObserver)
     ========================================================================== */
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding link
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* ==========================================================================
     4. Animated Counter Stats with Suffix Preservation
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') !== null ? stat.getAttribute('data-suffix') : '';
      if (isNaN(target)) return;
      
      let count = 0;
      const duration = 1400; // ms
      const increment = Math.max(1, Math.ceil(target / (duration / 30)));

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = count + suffix;
        }
      }, 30);
    });
  };

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animateCounters();
          animatedStats = true;
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(heroSection);
  }

  /* ==========================================================================
     5. Scroll-Triggered Skill Progress Bars Animation
     ========================================================================== */
  const skillBars = document.querySelectorAll('.progress-bar-fill');
  const skillsSection = document.getElementById('skills');
  if (skillsSection && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress') || '100%';
            bar.style.width = targetWidth;
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  /* ==========================================================================
     6. Interactive Project Live Demo Modal Manager
     ========================================================================== */
  const demoBtns = document.querySelectorAll('.demo-btn');

  // In-memory State for TaskFlow App Demo
  let demoTasks = [
    { id: 1, title: 'Design Normalized SQL Database Schema', category: 'SQL', priority: 'High', completed: false },
    { id: 2, title: 'Build Glassmorphism Responsive UI', category: 'Web Dev', priority: 'Medium', completed: true },
    { id: 3, title: 'Integrate AI Prompt Generator', category: 'AI', priority: 'High', completed: false }
  ];

  // Helper Toast Notice
  let toastTimer = null;
  const showToastNotice = (msg) => {
    if (!globalToast || !globalToastMsg) return;
    globalToastMsg.textContent = msg;
    globalToast.hidden = false;

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      globalToast.hidden = true;
    }, 4000);
  };

  // Close Modal Handling
  if (projectDemoModal && modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => projectDemoModal.close());
    projectDemoModal.addEventListener('click', (e) => {
      if (e.target === projectDemoModal) projectDemoModal.close();
    });
  }

  // Open Specific Demo Modal
  const openDemoModal = (type) => {
    if (!projectDemoModal || !modalBody) return;

    if (type === 'portfolio') {
      modalBadge.textContent = 'FEATURING GLASSMORPHISM & ES6+';
      modalTitle.textContent = 'Personal Developer Portfolio — Live Features Tour';
      renderPortfolioDemoContent();
    } else if (type === 'taskflow') {
      modalBadge.textContent = 'SQL & TASK MANAGER APP DEMO';
      modalTitle.textContent = 'TaskFlow — SQL Task Management Web App';
      renderTaskFlowDemoContent();
    } else if (type === 'assistant') {
      modalBadge.textContent = 'AI WORKFLOW & PROMPT GENERATOR DEMO';
      modalTitle.textContent = 'Smart Assistant — AI Workflow Tool';
      renderAssistantDemoContent();
    }

    if (typeof projectDemoModal.showModal === 'function') {
      projectDemoModal.showModal();
    } else {
      projectDemoModal.setAttribute('open', 'true');
    }
  };

  demoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoType = btn.getAttribute('data-demo');
      openDemoModal(demoType);
    });
  });

  /* --------------------------------------------------------------------------
     Demo Renderer 1: Portfolio Website Showcase
     -------------------------------------------------------------------------- */
  const renderPortfolioDemoContent = () => {
    modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          This portfolio is engineered as a zero-dependency, ultra-fast single page web app using modern semantic <strong>HTML5</strong>, CSS custom properties with <strong>Glassmorphism</strong> styling, and ES6 JavaScript.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div style="background: rgba(30,41,59,0.5); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 0.25rem;">⚡ Performance</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Instant loading, responsive SVG iconography, zero build overhead.</div>
          </div>
          <div style="background: rgba(30,41,59,0.5); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 0.25rem;">🎨 Design System</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Deep Slate Dark Mode, backdrop filters & fluid typography.</div>
          </div>
          <div style="background: rgba(30,41,59,0.5); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 0.25rem;">♿ Accessibility</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">WCAG compliant form validation, ARIA descriptions, and focus rings.</div>
          </div>
        </div>

        <div class="demo-sql-box">
          <div class="demo-sql-title">Live CSS Design Tokens Inspection</div>
          <div class="demo-sql-code">
:root {
  --bg-dark: #0b0f17;
  --accent-primary: #06b6d4;
  --accent-gradient: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  --bg-card: rgba(19, 27, 46, 0.75);
}
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem;">
          <button type="button" class="btn btn-outline" id="tourCloseBtn">Close Preview</button>
        </div>
      </div>
    `;

    document.getElementById('tourCloseBtn')?.addEventListener('click', () => projectDemoModal.close());
  };

  /* --------------------------------------------------------------------------
     Demo Renderer 2: TaskFlow SQL App Interactive Demo
     -------------------------------------------------------------------------- */
  const renderTaskFlowDemoContent = () => {
    const updateTaskFlowUI = (lastQuery = "SELECT * FROM tasks ORDER BY priority DESC;") => {
      const taskListContainer = document.getElementById('demoTaskList');
      const sqlCodeElement = document.getElementById('demoSqlCode');

      if (taskListContainer) {
        taskListContainer.innerHTML = demoTasks.map(t => `
          <div class="demo-task-item ${t.completed ? 'completed' : ''}">
            <div class="demo-task-left">
              <input type="checkbox" class="demo-checkbox" data-id="${t.id}" ${t.completed ? 'checked' : ''} />
              <span style="font-size: 0.95rem; font-weight: 500;">${t.title}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="demo-tag tag-${t.priority.toLowerCase()}">${t.priority}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); background: rgba(11,15,23,0.5); padding: 0.2rem 0.5rem; border-radius: 4px;">${t.category}</span>
              <button type="button" class="delete-task-btn" data-id="${t.id}" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:1.1rem; padding: 0 0.25rem;">&times;</button>
            </div>
          </div>
        `).join('');

        // Task Item Listeners
        taskListContainer.querySelectorAll('.demo-checkbox').forEach(chk => {
          chk.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'), 10);
            const task = demoTasks.find(t => t.id === id);
            if (task) {
              task.completed = e.target.checked;
              const statusStr = task.completed ? 'completed' : 'pending';
              updateTaskFlowUI(`UPDATE tasks SET status = '${statusStr}' WHERE id = ${id};`);
            }
          });
        });

        taskListContainer.querySelectorAll('.delete-task-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'), 10);
            demoTasks = demoTasks.filter(t => t.id !== id);
            updateTaskFlowUI(`DELETE FROM tasks WHERE id = ${id};`);
          });
        });
      }

      if (sqlCodeElement) {
        sqlCodeElement.textContent = lastQuery;
      }
    };

    modalBody.innerHTML = `
      <div>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
          Try adding a new task or toggling task completion. Notice how the corresponding <strong>SQL Database Query</strong> updates live below!
        </p>

        <form id="demoTaskForm" class="demo-task-controls">
          <input type="text" id="taskTitleInput" class="form-input demo-task-input" placeholder="e.g. Optimize SQL Query Indexes" required />
          <select id="taskCategorySelect" class="demo-select">
            <option value="SQL">SQL</option>
            <option value="Web Dev">Web Dev</option>
            <option value="AI">AI</option>
          </select>
          <select id="taskPrioritySelect" class="demo-select">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.25rem;">+ Add Task</button>
        </form>

        <div id="demoTaskList" class="demo-task-list"></div>

        <div class="demo-sql-box">
          <div class="demo-sql-title">⚡ Generated SQL Database Execution</div>
          <div class="demo-sql-code" id="demoSqlCode">SELECT * FROM tasks;</div>
        </div>
      </div>
    `;

    // Render Initial List
    updateTaskFlowUI();

    // Form Submit Event
    document.getElementById('demoTaskForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('taskTitleInput');
      const catSelect = document.getElementById('taskCategorySelect');
      const prioSelect = document.getElementById('taskPrioritySelect');

      if (!titleInput.value.trim()) return;

      const newTask = {
        id: Date.now(),
        title: titleInput.value.trim(),
        category: catSelect.value,
        priority: prioSelect.value,
        completed: false
      };

      demoTasks.unshift(newTask);
      titleInput.value = '';
      const sqlInsert = `INSERT INTO tasks (title, category, priority, status) VALUES ('${newTask.title}', '${newTask.category}', '${newTask.priority}', 'pending');`;
      updateTaskFlowUI(sqlInsert);
    });
  };

  /* --------------------------------------------------------------------------
     Demo Renderer 3: Smart Assistant AI Tool Interactive Demo
     -------------------------------------------------------------------------- */
  const renderAssistantDemoContent = () => {
    modalBody.innerHTML = `
      <div>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
          Select a prompt recipe or type a custom request to see how the <strong>AI Assistant Tool</strong> generates structured code & workflow solutions.
        </p>

        <div class="demo-ai-pills">
          <button type="button" class="demo-pill-btn" data-prompt="Write a clean SQL query to fetch top 5 users by project count">🗄️ SQL Query Generator</button>
          <button type="button" class="demo-pill-btn" data-prompt="Create a CSS Glassmorphism card template with cyan border highlight">🎨 Glassmorphism CSS</button>
          <button type="button" class="demo-pill-btn" data-prompt="Refactor JavaScript code to use async/await and robust try/catch error handling">⚡ Async JS Refactor</button>
          <button type="button" class="demo-pill-btn" data-prompt="Summarize prompt engineering best practices for web development">🤖 AI Workflow Tips</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <textarea id="aiPromptInput" class="form-textarea" rows="3" placeholder="Type your prompt here or select a recipe above..."></textarea>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: var(--text-muted);">Model: Gemini 3.6 Flash (Simulated Sandbox)</span>
            <button type="button" class="btn btn-primary" id="generateAiBtn">✨ Generate AI Response</button>
          </div>
        </div>

        <div class="demo-ai-box" id="aiOutputBox" style="display: none;">
          <div class="demo-ai-header">
            <span style="font-weight: 700; color: var(--accent-primary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">🤖 AI Response Output</span>
            <button type="button" id="copyAiBtn" class="btn btn-outline" style="padding: 0.3rem 0.75rem; font-size: 0.75rem;">Copy Output</button>
          </div>
          <div class="demo-ai-text" id="aiTextContainer"></div>
        </div>
      </div>
    `;

    const promptInput = document.getElementById('aiPromptInput');
    const outputBox = document.getElementById('aiOutputBox');
    const textContainer = document.getElementById('aiTextContainer');
    const generateBtn = document.getElementById('generateAiBtn');

    const sampleResponses = {
      sql: `SELECT u.id, u.name, COUNT(p.id) AS total_projects\nFROM users u\nJOIN projects p ON u.id = p.user_id\nGROUP BY u.id, u.name\nORDER BY total_projects DESC\nLIMIT 5;`,
      css: `.glass-card {\n  background: rgba(19, 27, 46, 0.75);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(6, 182, 212, 0.4);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);\n}`,
      js: `async function fetchProjectData(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(\`HTTP Error: \${response.status}\`);\n    const data = await response.json();\n    return { success: true, data };\n  } catch (error) {\n    console.error('Fetch Failed:', error);\n    return { success: false, error: error.message };\n  }\n}`,
      tips: `1. Specify Clear Constraints: Define exact return format (JSON/SQL/CSS).\n2. Provide Context: Include target framework or database engine.\n3. Iterative Refinement: Ask for edge-case handling and performance checks.`
    };

    const runSimulatedAi = (prompt) => {
      outputBox.style.display = 'block';
      textContainer.textContent = 'Generating AI response... ⏳';

      setTimeout(() => {
        let resultText = '';
        const lower = prompt.toLowerCase();
        if (lower.includes('sql')) {
          resultText = `Here is your optimized SQL query:\n\n${sampleResponses.sql}`;
        } else if (lower.includes('css') || lower.includes('glass')) {
          resultText = `Here is your CSS Glassmorphism styles:\n\n${sampleResponses.css}`;
        } else if (lower.includes('js') || lower.includes('javascript') || lower.includes('refactor')) {
          resultText = `Here is the refactored asynchronous JavaScript implementation:\n\n${sampleResponses.js}`;
        } else {
          resultText = `Here are the AI Workflow & Prompting recommendations:\n\n${sampleResponses.tips}`;
        }

        textContainer.textContent = resultText;
      }, 500);
    };

    // Pill Click Events
    modalBody.querySelectorAll('.demo-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const text = pill.getAttribute('data-prompt');
        promptInput.value = text;
        runSimulatedAi(text);
      });
    });

    // Generate Button Event
    generateBtn?.addEventListener('click', () => {
      const val = promptInput.value.trim();
      if (!val) {
        promptInput.focus();
        return;
      }
      runSimulatedAi(val);
    });

    // Copy Button Event
    document.getElementById('copyAiBtn')?.addEventListener('click', () => {
      if (textContainer.textContent) {
        navigator.clipboard?.writeText(textContainer.textContent);
        showToastNotice('AI Response copied to clipboard!');
      }
    });
  };

  /* ==========================================================================
     7. Contact Form Real-time Validation & Submission
     ========================================================================== */
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Email regex pattern
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateField = (input, isValid) => {
      if (isValid) {
        input.classList.remove('invalid');
        input.setAttribute('aria-invalid', 'false');
      } else {
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
      }
      return isValid;
    };

    // Real-time typing & blur validation
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, nameInput.value.trim().length > 0);
    });
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('invalid')) {
        validateField(nameInput, nameInput.value.trim().length > 0);
      }
    });

    emailInput.addEventListener('blur', () => {
      validateField(emailInput, isValidEmail(emailInput.value.trim()));
    });
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('invalid')) {
        validateField(emailInput, isValidEmail(emailInput.value.trim()));
      }
    });

    messageInput.addEventListener('blur', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10);
    });
    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('invalid')) {
        validateField(messageInput, messageInput.value.trim().length >= 10);
      }
    });

    // Form submit handler
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length > 0);
      const isEmailValid = validateField(emailInput, isValidEmail(emailInput.value.trim()));
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

      if (isNameValid && isEmailValid && isMessageValid) {
        // Show success toast notification
        formSuccessToast.hidden = false;

        // Reset form inputs
        contactForm.reset();

        // Auto hide success toast after 6 seconds
        setTimeout(() => {
          formSuccessToast.hidden = true;
        }, 6000);
      }
    });
  }
});
