document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!"); // Debugging log

    /*** Scroll to section on box click ***/
    document.querySelectorAll(".box").forEach((box) => {
        box.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                console.log(`Switching to section: ${targetId}`);
                targetSection.scrollIntoView({ behavior: "smooth" });
            } else {
                console.error(`Section with ID '${targetId}' not found`);
            }
        });
    });

    /*** Scroll to Login/Signup Sections ***/
    const setupScroll = (triggerId, targetId) => {
        const triggerElement = document.getElementById(triggerId);
        const targetSection = document.getElementById(targetId);
        if (triggerElement && targetSection) {
            triggerElement.addEventListener("click", function () {
                targetSection.scrollIntoView({ behavior: "smooth" });
            });
        } else {
            console.error(`${triggerId} or ${targetId} not found!`);
        }
    };

    setupScroll("login-tab", "login-section");
    setupScroll("signup-link", "signup-section");
    setupScroll("login-link", "login-section");

    /*** Multi-Step Form Logic ***/
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const progressBar = document.getElementById("progress-bar");
    const steps = document.querySelectorAll(".step");
    let currentStep = 0;

    function updateForm() {
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
            steps[index]?.classList.toggle("active", index <= currentStep);
        });

        if (progressBar) {
            progressBar.style.width = `${(currentStep / (formSteps.length - 1)) * 100}%`;
        }
    }

    nextBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (validateForm(currentStep) && currentStep < formSteps.length - 1) {
                currentStep++;
                updateForm();
            }
        });
    });

    prevBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                updateForm();
            }
        });
    });

    function validateForm(step) {
        const inputs = formSteps[step].querySelectorAll("input[required], select[required]");
        let valid = true;

        inputs.forEach((input) => {
            if (!input.value.trim()) {
                input.style.border = "2px solid red";
                valid = false;
            } else {
                input.style.border = "1px solid #ccc";
            }
        });

        return valid;
    }

    updateForm(); // Initialize form steps

    document.getElementById("apply-form")?.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Application Submitted!");
        location.reload();
    });

    /*** Chatbot Toggle ***/
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatContainer = document.getElementById("chat-container");
    const chatBox = document.getElementById("chat-box");
    const closeChatbot = document.getElementById("close-chatbot");

    if (chatbotIcon && chatContainer) {
        chatbotIcon.addEventListener("click", function () {
            chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "")
                ? "flex"
                : "none";
        });
    }

    if (closeChatbot) {
        closeChatbot.addEventListener("click", function () {
            chatContainer.style.display = "none";
        });
    }

    /*** Chatbot FAQ Handling ***/
    const faqList = {
        "What is a scholarship?": "A scholarship is financial aid given to students based on merit, financial need, or other criteria.",
        "Who is eligible for scholarships?": "Eligibility varies based on academic performance, income level, category (SC/ST/OBC/General), or special skills.",
        "How do I apply for a scholarship?": "Visit the scholarship portal, check eligibility, fill out the form, and submit required documents.",
        "What documents are required?": "Common documents include Aadhaar card, income certificate, marksheets, caste certificate (if applicable), and bank details.",
        "How can I track my application?": "Log into the scholarship portal and check your application status.",
        "I forgot my password. What do I do?": "Click on the 'Forgot Password' option on the login page and follow the instructions.",
        "What are some government scholarships?": "Some major government scholarships include NSP (National Scholarship Portal), PM Scholarship Scheme, Post-Matric Scholarships, and Merit-cum-Means Scholarships.",
        "What are some private scholarships?": "Private scholarships include Tata Trust Scholarship, Reliance Foundation Scholarship, Infosys Foundation Scholarship, etc."
    };

    function displayQuestions() {
        chatBox.innerHTML = "";
        Object.keys(faqList).forEach((question) => {
            let questionButton = document.createElement("button");
            questionButton.classList.add("faq-button");
            questionButton.textContent = question;
            questionButton.addEventListener("click", function () {
                displayAnswer(question);
            });
            chatBox.appendChild(questionButton);
        });
    }

    function displayAnswer(question) {
        let answer = faqList[question];
        chatBox.innerHTML += `<div class='user-message'>You: ${question}</div>`;
        chatBox.innerHTML += `<div class='bot-message'>Bot: ${answer}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(displayQuestions, 3000);
    }

    displayQuestions(); 
    document.addEventListener("DOMContentLoaded", function () {
        const profileIcon = document.querySelector(".profile-icon");
        const profilePanel = document.getElementById("profilePanel");
    
        function togglePanel() {
            profilePanel.classList.toggle("active");
        }
    
        profileIcon.addEventListener("click", togglePanel);
        document.querySelector(".close-btn").addEventListener("click", togglePanel);
    });
    

    /*** Signup Form Submission ***/
    document.getElementById("signup-form")?.addEventListener("submit", async function (e) {
        e.preventDefault();
    
        const firstname = document.getElementById("signup-firstname").value;
        const lastname = document.getElementById("signup-lastname").value;
        const email = document.getElementById("signup-email").value;
        const phone = document.getElementById("signup-number").value;
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;

        try {
            const response = await axios.post("http://localhost:5000/signup", {
                name: `${firstname} ${lastname}`,
                email,
                phone,
                username,
                password
            });

            if (response.data) {
                alert("Signup Successful!");
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            alert("Signup failed. Please try again.");
        }
    });

    /*** Login Form Submission ***/
    document.getElementById("login-form")?.addEventListener("submit", async function (e) {
        e.preventDefault();
    
        const usernameOrEmail = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        try {
            const response = await axios.post("http://localhost:5000/login", {
                email: usernameOrEmail,
                password
            });

            if (response.data) {
                localStorage.setItem("token", response.data.token);
                alert("Login successful!");
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        }
    });
});
