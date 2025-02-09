document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    window.addEventListener('load', () => {
        loadingScreen.classList.add('hidden');
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const header = document.querySelector('header');
    const announcementSection = document.querySelector('.announcements-section .announcements');

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        header.classList.add('dark-mode');
        announcementSection.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    } else {
        darkModeToggle.textContent = '🌙';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        header.classList.toggle('dark-mode');
        announcementSection.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });

    // Menu Toggle for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navMenu.classList.toggle('show');
        }
    });

    // Dropdown Menus
    const dropdowns = document.querySelectorAll('.dropdown > a');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            const expanded = dropdown.getAttribute('aria-expanded') === 'true';
            // Close other open dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.setAttribute('aria-expanded', 'false');
                    d.nextElementSibling.classList.remove('show');
                }
            });
            // Toggle current dropdown
            dropdown.setAttribute('aria-expanded', !expanded);
            dropdown.nextElementSibling.classList.toggle('show');
        });

        // Keyboard navigation for dropdown
        dropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.click();
            }
        });
    });

    // Click outside to close dropdowns
    document.addEventListener('click', (e) => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.setAttribute('aria-expanded', 'false');
                dropdown.nextElementSibling.classList.remove('show');
            }
        });
    });

    // Search Autocomplete
    const searchInput = document.getElementById('search');
    const suggestions = [
        'Academic Calendar',
        'Course Registration',
        'Examination Schedule',
        'Faculty Guidelines',
        'Undergraduate Programs',
        'Postgraduate Programs',
        'Master Programs',
        'eMasters & Online Courses',
        'Research Opportunities',
        'Internship Opportunities',
        'Faculty Resources',
        'Grade Portal',
        'Resource Library',
        'Messaging System',
        'User Profile',
        'FAQ',
        'Contact Us'
        // Add more relevant suggestions as needed
    ];

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = suggestions.filter(item => item.toLowerCase().includes(query));
        // Remove existing datalist if any
        let dataList = document.getElementById('search-suggestions');
        if (dataList) {
            dataList.remove();
        }
        // Create new datalist
        if (filtered.length > 0) {
            dataList = document.createElement('datalist');
            dataList.id = 'search-suggestions';
            filtered.forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                dataList.appendChild(option);
            });
            document.body.appendChild(dataList);
            searchInput.setAttribute('list', 'search-suggestions');
        } else {
            searchInput.removeAttribute('list');
        }
    });

    // Announcements Control
    const announcementsList = document.querySelector('.announcements-list');
    const controlButton = document.querySelector('.announcement-control');
    let isPaused = false;

    controlButton.addEventListener('click', () => {
        if (isPaused) {
            announcementsList.style.animationPlayState = 'running';
            controlButton.textContent = 'Pause';
        } else {
            announcementsList.style.animationPlayState = 'paused';
            controlButton.textContent = 'Play';
        }
        isPaused = !isPaused;
    });

    // Messaging System
    const messageForm = document.getElementById('messageForm');
    const messagesContainer = document.querySelector('.messages');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'sent');
            messageElement.innerHTML = `<p>${messageText}</p>`;
            messagesContainer.appendChild(messageElement);
            messageInput.value = '';

            // Scroll to the latest message
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Simulate a response after a delay
            setTimeout(() => {
                const responseElement = document.createElement('div');
                responseElement.classList.add('message', 'received');
                responseElement.innerHTML = `<p>Thank you for your message. We will get back to you shortly.</p>`;
                messagesContainer.appendChild(responseElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 2000);
        }
    });

    // FAQ Section
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.hidden = true;
            });
            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
                question.nextElementSibling.hidden = false;
            }
        });

        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement form submission logic (e.g., AJAX request)
        // For demonstration, we'll show a success alert
        alert('Your message has been sent successfully!');
        contactForm.reset();
    });

    // Placeholder for Interactive Academic Calendar (Can be integrated with a library like FullCalendar)
    // For demonstration, we'll display a simple message
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '<p>Interactive Academic Calendar will be integrated here.</p>';

    // Chatbot Functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotModal = document.getElementById('chatbotModal');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotMessages = document.getElementById('chatbotMessages');

    chatbotToggle.addEventListener('click', () => {
        chatbotModal.style.display = 'block';
        chatbotModal.setAttribute('aria-hidden', 'false');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotModal.style.display = 'none';
        chatbotModal.setAttribute('aria-hidden', 'true');
    });

    window.addEventListener('click', (e) => {
        if (e.target == chatbotModal) {
            chatbotModal.style.display = 'none';
            chatbotModal.setAttribute('aria-hidden', 'true');
        }
    });

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const chatbotInput = document.getElementById('chatbotInput');
        const chatbotText = chatbotInput.value.trim();
        if (chatbotText !== '') {
            const userMessage = document.createElement('div');
            userMessage.classList.add('chatbot-message', 'user');
            userMessage.innerHTML = `<p>${chatbotText}</p>`;
            chatbotMessages.appendChild(userMessage);
            chatbotInput.value = '';

            // Scroll to the latest message
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Simulate bot response
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.classList.add('chatbot-message', 'bot');
                botMessage.innerHTML = `<p>I'm here to help! Please visit our <a href="#">FAQ</a> section or contact support for more information.</p>`;
                chatbotMessages.appendChild(botMessage);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1500);
        }
    });

    // Smooth Scroll for Explore Button
    const exploreBtn = document.getElementById('exploreBtn');
    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.latest-news').scrollIntoView({ behavior: 'smooth' });
    });

    // Keyboard Accessibility for Chatbot Toggle
    chatbotToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            chatbotToggle.click();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FullCalendar only if the calendar container exists
    var calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Displays a month view by default.
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        // Sample events: Replace these with your real academic events.
        events: [
          { title: 'Course Registration Deadline', start: '2024-03-15' },
          { title: 'Thesis Submission Deadline', start: '2024-04-10' },
          { title: 'Scholarship Applications Due', start: '2024-05-01' },
          { title: 'Faculty Workshop', start: '2024-04-20', end: '2024-04-22' }
        ],
        selectable: true,
        // Optional: Handle clicks on a date.
        dateClick: function(info) {
          alert('You clicked on: ' + info.dateStr);
          // You can open a modal here or perform other actions.
        }
      });
      calendar.render(); // Render the calendar inside the container.
    }
  });
  // calendar.js

document.addEventListener("DOMContentLoaded", () => {
    // Month navigation placeholders
    const monthYearDisplay = document.querySelector(".month-year");
    const prevBtn = document.querySelector(".prev-month");
    const nextBtn = document.querySelector(".next-month");
  
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    
    // Starting month/year for the dummy calendar
    let currentMonth = 4; // May (0-indexed)
    let currentYear = 2025;
  
    function updateMonthYear() {
      // Display current month & year in the header
      monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
    }
  
    // Fake "previous" month logic
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateMonthYear();
    });
  
    // Fake "next" month logic
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateMonthYear();
    });
  
    // Interactive Calendar Cell Clicks
    const cells = document.querySelectorAll(".dummy-calendar td");
    const selectedDateDisplay = document.getElementById("selectedDate");
  
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        // Remove active class from all cells
        cells.forEach(c => c.classList.remove("active"));
  
        // Add active class to the clicked cell
        cell.classList.add("active");
  
        // Get the day number from the cell (text content)
        const dayNumber = cell.textContent.trim();
        // If the day cell is empty (e.g., blank td), do nothing
        if (!dayNumber) {
          selectedDateDisplay.textContent = "";
          return;
        }
        
        // Retrieve event info from data attributes, if any
        const eventName = cell.getAttribute("data-event");
        const eventType = cell.getAttribute("data-event-type");
        const eventColor = cell.getAttribute("data-event-color");
        
        // Build a user-friendly string
        let details = `${months[currentMonth]} ${dayNumber}, ${currentYear}`;
        if (eventName && eventType) {
          details += ` – ${eventType.toUpperCase()} of ${eventName}`;
        }
        
        // Display the selected date & event details
        selectedDateDisplay.textContent = `Selected Date: ${details}`;
        // Optionally, you could color the text or do something else based on eventColor
      });
    });
  
    // Initialize the display
    updateMonthYear();
  });
  