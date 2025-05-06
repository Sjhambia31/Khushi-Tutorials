
document.addEventListener('DOMContentLoaded', function() {
    
    setupMobileNavigation();
    
    
    if (document.getElementById('inquiry-form')) {
        setupFormValidation();
    }
    
    
    const facultyCards = document.querySelectorAll('.faculty-card');
    if (facultyCards.length > 0) {
        setupFacultyCardInteraction(facultyCards);
    }
    
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        setupTestimonialAnimation(testimonialCards);
    }
    
    
    const featureCards = document.querySelectorAll('.feature');
    if (featureCards.length > 0) {
        enhanceFeatureCards(featureCards);
    }
    
    
    const classGroups = document.querySelectorAll('.class-group');
    if (classGroups.length > 0) {
        setupClassGroupInteraction(classGroups);
    }
    
    
    setupScrollAnimation();
    
   
    updateCopyrightYear();
});


function setupMobileNavigation() {
    
    const header = document.querySelector('header');
    
    
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<span></span><span></span><span></span>';
    
    
    header.querySelector('.container').appendChild(mobileNavToggle);
    
    
    const mobileNavStyles = document.createElement('style');
    mobileNavStyles.textContent = `
        
        .mobile-nav-toggle {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 21px;
            cursor: pointer;
        }
        
        .mobile-nav-toggle span {
            display: block;
            height: 3px;
            width: 100%;
            background-color: #E3F2E4;
            border-radius: 3px;
            transition: all 0.3s ease; 
        }
        
       
        @media (max-width: 840px) {
            .mobile-nav-toggle {
                display: flex;
            }
            
            nav ul {
                display: none;
                flex-direction: column;
                width: 100%;
                text-align: center;
                margin-top: 20px;
            }
            
            nav ul.show {
                display: flex;
            }
            
            nav ul li {
                margin: 10px 0;
            }
            
            header .container {
                flex-wrap: wrap;
                justify-content: space-between;
            }
            
            
            .mobile-nav-toggle.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            
            .mobile-nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-nav-toggle.active span:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
        }
    `;
    document.head.appendChild(mobileNavStyles);
    
    
    mobileNavToggle.addEventListener('click', function() {
        const navMenu = header.querySelector('nav ul');
        navMenu.classList.toggle('show'); 
        this.classList.toggle('active');
    });
}


function setupFormValidation() {
    
    const form = document.getElementById('inquiry-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const classSelect = document.getElementById('class-interest');
    const messageInput = document.getElementById('message');
    
    
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        
        .error-message {
            color: #d9534f;
            font-size: 14px;
            margin-top: 5px;
            display: block;
        }
        
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #d9534f;
        }
        
        .form-group.success input,
        .form-group.success select,
        .form-group.success textarea {
            border-color: #5cb85c;
        }
        
        .success-message {
            background-color: #5cb85c;
            color: white;
            padding: 15px;
            margin: 20px 0;
            border-radius: 6px;
            text-align: center;
            display: none;
        }
    `;
    document.head.appendChild(errorStyle);
    
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your inquiry! We will contact you shortly.';
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    
    form.addEventListener('submit', function(e) {
     
        e.preventDefault();
        
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
       

        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            group.classList.remove('success');
        });
        
        let isValid = true;
        
       
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }
        
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
        
        
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid 10-digit phone number');
            isValid = false;
        } else {
            showSuccess(phoneInput);
        }
        
        
        if (classSelect.value === '') {
            showError(classSelect, 'Please select a class');
            isValid = false;
        } else {
            showSuccess(classSelect);
        }
        
       
        if (isValid) {
            form.reset();
            successMessage.style.display = 'block';
            
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
    }
    
    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.add('success');
    }
    
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    
    function isValidPhone(phone) {
        const re = /^\d{10}$/;
        return re.test(String(phone));
    }
}


function setupFacultyCardInteraction(cards) {
    
    cards.forEach(card => {
        
        const facultyInfo = card.querySelector('.faculty-info');
        const detailDiv = document.createElement('div');
        detailDiv.className = 'faculty-details';
        
        
        detailDiv.style.display = 'none';
        detailDiv.style.padding = '15px';
        detailDiv.style.backgroundColor = '#f8f9fa';
        detailDiv.style.borderTop = '1px solid #BACDB0';
        detailDiv.style.marginTop = '15px';
        

        const facultyName = facultyInfo.querySelector('h3').textContent;
        let specialization = '';
        
        
        if (facultyName.includes('Sonia Vohra')) {
            specialization = `<p><strong>Specialization:</strong> Mathematics, Science, Business Studies, Accountancy</p>
                             <p><strong>Teaching Philosophy:</strong> "I believe in building strong conceptual foundations and practical application of knowledge."</p>`;
        } else if (facultyName.includes('Sangeeta Jadwani')) {
            specialization = `<p><strong>Specialization:</strong> Economics</p>
                             <p><strong>Teaching Philosophy:</strong> "Economics is all around us. I help students connect theoretical concepts with real-world applications."</p>`;
        } else if (facultyName.includes('Jigyasa Sitani')) {
            specialization = `<p><strong>Specialization:</strong> All subjects for middle school</p>
                             <p><strong>Teaching Philosophy:</strong> "Every child learns differently. I adapt my teaching to match different learning styles."</p>`;
        } else if (facultyName.includes('Bhavika Madnani')) {
            specialization = `<p><strong>Specialization:</strong> All subjects for junior classes</p>
                             <p><strong>Teaching Philosophy:</strong> "Learning should be fun and engaging, especially for younger students."</p>`;
        }
        
        
        detailDiv.innerHTML = specialization;
        facultyInfo.appendChild(detailDiv);
        
        
        const readMoreBtn = document.createElement('button');
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.className = 'read-more-btn';
        
        
        readMoreBtn.style.backgroundColor = '#5A9A91';
        readMoreBtn.style.color = '#E3F2E4';
        readMoreBtn.style.border = 'none';
        readMoreBtn.style.padding = '8px 15px';
        readMoreBtn.style.borderRadius = '4px';
        readMoreBtn.style.cursor = 'pointer';
        readMoreBtn.style.marginTop = '10px';
        readMoreBtn.style.fontWeight = '500';
        
        facultyInfo.appendChild(readMoreBtn);
        
        
        readMoreBtn.addEventListener('click', function() {
            
            if (detailDiv.style.display === 'none') {
                detailDiv.style.display = 'block';
                readMoreBtn.textContent = 'Read Less';
            } else {
                detailDiv.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            }
        });
    });
}


function setupTestimonialAnimation(cards) {
    
    cards.forEach((card, index) => {
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; 
        
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    
    cards.forEach(card => {
        const quoteIcon = document.createElement('div');
        quoteIcon.className = 'quote-icon';
        quoteIcon.innerHTML = '❝';
        
        
        quoteIcon.style.fontSize = '3rem';
        quoteIcon.style.color = '#BACDB0';
        quoteIcon.style.opacity = '0.3';
        quoteIcon.style.position = 'absolute'; 
        quoteIcon.style.top = '10px';
        quoteIcon.style.right = '15px';
        
        card.style.position = 'relative';
        card.prepend(quoteIcon);
    });
}


function enhanceFeatureCards(cards) {
    
    const icons = ['📚', '🏆', '👨‍🏫', '📊'];
    
    
    cards.forEach((card, index) => {
        
        const icon = document.createElement('div');
        icon.className = 'feature-icon';
        
        
        icon.textContent = icons[index % icons.length];
        
        
        icon.style.fontSize = '2.5rem';
        icon.style.marginBottom = '15px';
        icon.style.color = '#5A9A91';
        
        card.prepend(icon);
    });
    
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        
        .feature {
            transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        
        .feature:hover {
            background-color: #5A9A91;
            color: #E3F2E4;
        }
        
        .feature:hover h3, .feature:hover .feature-icon {
            color: #E3F2E4;
        }
    `;
    document.head.appendChild(styleSheet);
}


function setupClassGroupInteraction(classGroups) {
    
    classGroups.forEach(group => {
        
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'class-details';
        
        
        detailsContainer.style.maxHeight = '0';
        detailsContainer.style.overflow = 'hidden';
        detailsContainer.style.transition = 'max-height 0.4s ease'; 
        detailsContainer.style.marginTop = '15px';
        
        
        const title = group.querySelector('h3').textContent;
        let details = '';
        
        
        if (title.includes('6th to 8th')) {
            details = `
                <ul style="list-style-type: disc; padding-left: 20px; color: #E3F2E4;">
                    <li>Mathematics and Science by Ms. Jigyasa Sitani</li>
                    <li>English and Social Studies</li>
                    <li>Focus on NCERT curriculum and competitive exams</li>
                    <li>Regular tests and assessments</li>
                </ul>
            `;
        } else if (title.includes('9th & 10th')) {
            details = `
                <ul style="list-style-type: disc; padding-left: 20px; color: #E3F2E4;">
                    <li>Mathematics and Science by Mrs. Sonia Vohra</li>
                    <li>Social Studies with focus on board exam preparation</li>
                    <li>Special sessions for difficult topics</li>
                    <li>Mock tests based on CBSE pattern</li>
                </ul>
            `;
        } else if (title.includes('11th & 12th')) {
            details = `
                <ul style="list-style-type: disc; padding-left: 20px; color: #E3F2E4;">
                    <li>Business Studies and Accountancy by Mrs. Sonia Vohra</li>
                    <li>Economics by Ms. Sangeeta Jadwani</li>
                    <li>Focused preparation for board exams</li>
                    <li>Career counseling and guidance</li>
                </ul>
            `;
        }
        
        
        detailsContainer.innerHTML = details;
        group.appendChild(detailsContainer);
        
        group.style.cursor = 'pointer';
        group.addEventListener('click', function() {
            
            classGroups.forEach(otherGroup => {
                if (otherGroup !== group) {
                    otherGroup.querySelector('.class-details').style.maxHeight = '0';
                }
            });
            
            
            const currentDetails = this.querySelector('.class-details');
            if (currentDetails.style.maxHeight === '0px' || currentDetails.style.maxHeight === '') {
                currentDetails.style.maxHeight = currentDetails.scrollHeight + 'px';
            } else {
                currentDetails.style.maxHeight = '0';
            }
        });
    });
}


function setupScrollAnimation() {
    
    const sections = document.querySelectorAll('section:not(.hero):not(.page-heading)');
    
    
    const observerStyles = document.createElement('style');
    observerStyles.textContent = `
        
        .fade-in-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-section.appear {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(observerStyles);
    
    
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
   
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    
    sections.forEach(section => {
        observer.observe(section);
    });
}


function updateCopyrightYear() {
    
    const footerYear = document.querySelector('footer .container p');
    if (footerYear) {
       
        const currentYear = new Date().getFullYear();
        
        footerYear.innerHTML = `&copy; ${currentYear} Khushi Tutorials. All Rights Reserved.`;
    }
}

