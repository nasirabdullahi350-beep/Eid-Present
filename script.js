// Generate Stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                starsContainer.appendChild(star);
            }
        }

        // Generate Floating Hearts
        function createHearts() {
            const heartsContainer = document.getElementById('hearts');
            const heartSymbols = ['♥', '💖', '💝', '💗', '💓'];
            
            setInterval(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
                heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                heartsContainer.appendChild(heart);
                
                setTimeout(() => heart.remove(), 11000);
            }, 800);
        }

        // Generate Lanterns
        function createLanterns() {
            const lanternsContainer = document.getElementById('lanterns');
            
            setInterval(() => {
                const lantern = document.createElement('div');
                lantern.className = 'lantern';
                lantern.style.left = Math.random() * 100 + '%';
                lantern.style.animationDuration = (Math.random() * 10 + 12) + 's';
                lantern.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                lanternsContainer.appendChild(lantern);
                
                setTimeout(() => lantern.remove(), 25000);
            }, 3000);
        }

        // Reveal Love Note
        function revealNote(e) {
            const note = document.getElementById('loveNote');
            const btn = e.target;
            
            if (note.classList.contains('show')) {
                note.classList.remove('show');
                btn.innerHTML = 'Open My Heart ♥';
            } else {
                note.classList.add('show');
                btn.innerHTML = 'Close My Heart ♡';
                createSparkles(e.clientX, e.clientY);
            }
        }

        // Gift Selection
        function selectGift(element, value) {
            // Remove selected class from all options
            document.querySelectorAll('.gift-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            element.classList.add('selected');
            
            // Check the radio input
            element.querySelector('input').checked = true;
            
            // Create sparkles
            const rect = element.getBoundingClientRect();
            createSparkles(rect.left + rect.width/2, rect.top + rect.height/2);
        }

       // Handle Form Submit with AJAX (no redirect)
document.getElementById('giftForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const form = e.target;
    const name = document.getElementById('herName').value;
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(form);
    
    try {
        // Send to Formspree
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // SUCCESS - Show animations immediately
            showSuccessMessage(name);
            
            // Reset form
            form.reset();
            document.querySelectorAll('.gift-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        } else {
            alert('Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        alert('Connection error. Please check your internet and try again.');
    } finally {
        submitBtn.classList.remove('loading');
    }
});

function showSuccessMessage(name) {
    const formContainer = document.getElementById('giftFormContainer');
    const successMessage = document.getElementById('successMessage');
    
    document.getElementById('successName').textContent = name;
    
    // Animate transition
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'scale(0.9)';
    formContainer.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';

            
            // Celebration sparkles
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    createSparkles(
                        window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                        window.innerHeight / 2 + (Math.random() - 0.5) * 400
                    );
                }, i * 50);
            }
        }

        // Sparkle Effect
        function createSparkles(x, y) {
            for (let i = 0; i < 20; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = x + 'px';
                sparkle.style.top = y + 'px';
                sparkle.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
                sparkle.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }
        }

        // Click anywhere for sparkles
        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('surprise-btn') && 
                !e.target.closest('.gift-option') &&
                !e.target.closest('.submit-btn')) {
                createSparkles(e.clientX, e.clientY);
            }
        });

        // Initialize
        createStars();
        createHearts();
        createLanterns();

        // Parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const moon = document.querySelector('.moon-container');
            const x = (window.innerWidth - e.pageX) / 50;
            const y = (window.innerHeight - e.pageY) / 50;
            moon.style.transform = `translate(${x}px, ${y}px)`;
        });
