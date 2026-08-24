document.addEventListener('DOMContentLoaded', () => {

    // 1. TYPING ANIMATION IN HERO
    const typingElement = document.getElementById('typing-text');
    const titles = [
        "Data Analyst",
        "AI Enthusiast",
        "Machine Learning Learner",
        "Tech Freelancer"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingElement) return;

        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    // 2. STICKY NAVBAR SCROLL TRANSITION
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {

        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        const backToTopBtn = document.getElementById('backToTop');

        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('d-none');
            } else {
                backToTopBtn.classList.add('d-none');
            }
        }
    });


    // Back to top
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // 3. CANVAS TECH BACKGROUND ANIMATION
    const canvas = document.getElementById('hero-canvas');

    if (canvas) {

        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);

        for (let i = 0; i < 45; i++) {

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });

        }

        function drawCanvas() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
            ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';

            particles.forEach((p, i) => {

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) {
                    p.vx *= -1;
                }

                if (p.y < 0 || p.y > canvas.height) {
                    p.vy *= -1;
                }

                ctx.beginPath();
                ctx.arc(
                    p.x,
                    p.y,
                    p.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {

                    const p2 = particles[j];

                    const dist = Math.hypot(
                        p.x - p2.x,
                        p.y - p2.y
                    );

                    if (dist < 120) {

                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();

                    }
                }

            });

            requestAnimationFrame(drawCanvas);
        }

        drawCanvas();
    }


    // 4. DATA ANALYSIS WORKFLOW
    const workflowSteps =
        document.querySelectorAll('.workflow-step');

    const workflowDesc =
        document.getElementById('workflow-description');

    const stepTexts = {

        1:
            '<strong class="text-white d-block mb-2">Stage 1: Raw Data Collection</strong>Gathering raw operational data, numerical variables, and structured inputs from disparate sources for evaluation.',

        2:
            '<strong class="text-white d-block mb-2">Stage 2: Data Cleaning & Preprocessing</strong>Handling missing values, outlier detection, data standardization, and format normalization to ensure data quality.',

        3:
            '<strong class="text-white d-block mb-2">Stage 3: Exploratory Data Analysis (EDA)</strong>Applying statistical methods, correlation matrices, and distribution analyses to identify hidden patterns.',

        4:
            '<strong class="text-white d-block mb-2">Stage 4: Data Visualization</strong>Building visual charts and statistical graphs using NumPy and Matplotlib to clearly render complex data trends.',

        5:
            '<strong class="text-white d-block mb-2">Stage 5: Insight Extraction</strong>Translating mathematical patterns into actionable recommendations and predictive modeling features.',

        6:
            '<strong class="text-white d-block mb-2">Stage 6: Decision Support</strong>Delivering data-driven predictions to optimize operations, such as predictive maintenance schedules.'
    };


    workflowSteps.forEach(step => {

        step.addEventListener('click', () => {

            workflowSteps.forEach(s =>
                s.classList.remove('active')
            );

            step.classList.add('active');

            const stepNum =
                step.getAttribute('data-step');

            if (workflowDesc && stepTexts[stepNum]) {
                workflowDesc.innerHTML =
                    stepTexts[stepNum];
            }

        });

    });


    // 5. PROJECT FILTERING
    const filterButtons =
        document.querySelectorAll('.btn-filter');

    const projectItems =
        document.querySelectorAll('.project-item');


    filterButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            filterButtons.forEach(b =>
                b.classList.remove('active')
            );

            btn.classList.add('active');

            const filterValue =
                btn.getAttribute('data-filter');

            projectItems.forEach(item => {

                const categories =
                    item.getAttribute('data-category')
                        .split(' ');

                if (
                    filterValue === 'all' ||
                    categories.includes(filterValue)
                ) {

                    item.style.display = 'block';

                } else {

                    item.style.display = 'none';

                }

            });

        });

    });


    // 6. DYNAMIC PROJECT MODALS
    const projectData = {

        'predictive-maintenance': {

            title: 'Predictive Maintenance using Machine Learning',

            overview:
                'A machine learning system engineered to analyze operational telemetry data and predict machine equipment failures before they occur.',

            problem:
                'Unplanned industrial machine breakdowns lead to costly downtime and maintenance overheads.',

            approach:
                'Conducted exploratory data analysis, handled feature preprocessing on operational dataset metrics, and trained supervised machine learning algorithms to identify patterns leading up to failures.',

            tech: [
                'Python',
                'Machine Learning',
                'Data Preprocessing',
                'EDA',
                'Matplotlib'
            ],

            features: [
                'Early fault prediction based on operational parameters',
                'Exploratory data analysis of sensor readings',
                'Model result evaluation for decision support'
            ]
        },


        'maze-solver': {

            title: 'AI Maze Solver',

            overview:
                'A Python-based artificial intelligence framework designed to solve grid-based mazes using diverse graph search strategies.',

            problem:
                'Comparing pathfinding efficiency across informed vs uninformed search algorithms.',

            approach:
                'Implemented BFS, DFS, Uniform Cost Search, and A* Search (Manhattan & Euclidean heuristics), benchmarked on metrics like path length and explored nodes.',

            tech: [
                'Python',
                'AI Search Algorithms',
                'NumPy',
                'Matplotlib'
            ],

            features: [
                'Implementation of 5 pathfinding algorithms',
                'Visual mapping using Matplotlib',
                'Performance comparison on explored state efficiency'
            ]
        },


        'networks-project': {

            title: 'Computer Networks Infrastructure',

            overview:
                'An end-to-end network setup designed in Cisco Packet Tracer demonstrating VLAN segmentation and standard routing configurations.',

            problem:
                'Designing scalable and isolated enterprise subnets for department traffic management.',

            approach:
                'Configured router-on-a-stick, DHCP IP pools, VLAN trunk links, and switch security options.',

            tech: [
                'Cisco Packet Tracer',
                'Computer Networks',
                'VLANs',
                'DHCP',
                'IP Addressing'
            ],

            features: [
                'Inter-VLAN routing configuration',
                'Automated DHCP IP assignment',
                'Network topology validation'
            ]
        },


        'data-structures': {

            title: 'Data Structures Implementations in C++',

            overview:
                'A collection of standard computer science data structures and algorithms written in C++ for optimal memory and computational performance.',

            problem:
                'Efficient memory organization and fast lookup/insertion algorithmic execution.',

            approach:
                'Implemented dynamic memory structures, self-balancing search trees (AVL), graphs, and shortest path algorithms.',

            tech: [
                'C++',
                'Data Structures',
                'Graphs',
                'AVL Trees',
                'Dijkstra'
            ],

            features: [
                'AVL Tree balance and rotations',
                'Dijkstra Shortest Path implementation',
                'Heap operations and Hash tables'
            ]
        }

    };


    const projectModalElement =
        document.getElementById('projectModal');

    let projectModal = null;

    if (projectModalElement) {
        projectModal =
            new bootstrap.Modal(projectModalElement);
    }

    const modalTitle =
        document.getElementById('modalTitle');

    const modalBody =
        document.getElementById('modalBody');


    document
        .querySelectorAll('.btn-project-details')
        .forEach(btn => {

            btn.addEventListener('click', () => {

                const key =
                    btn.getAttribute('data-project');

                const data =
                    projectData[key];

                if (!data || !projectModal) return;

                modalTitle.textContent =
                    data.title;

                modalBody.innerHTML = `

                    <div class="mb-3">

                        <strong class="text-cyan font-mono d-block mb-1">
                            OVERVIEW
                        </strong>

                        <p class="text-secondary small">
                            ${data.overview}
                        </p>

                    </div>


                    <div class="mb-3">

                        <strong class="text-cyan font-mono d-block mb-1">
                            PROBLEM STATEMENT
                        </strong>

                        <p class="text-secondary small">
                            ${data.problem}
                        </p>

                    </div>


                    <div class="mb-3">

                        <strong class="text-cyan font-mono d-block mb-1">
                            APPROACH
                        </strong>

                        <p class="text-secondary small">
                            ${data.approach}
                        </p>

                    </div>


                    <div class="mb-3">

                        <strong class="text-cyan font-mono d-block mb-2">
                            KEY HIGHLIGHTS
                        </strong>

                        <ul class="text-secondary small ps-3">

                            ${data.features
                                .map(
                                    f => `<li class="mb-1">${f}</li>`
                                )
                                .join('')}

                        </ul>

                    </div>


                    <div class="mb-3">

                        <strong class="text-cyan font-mono d-block mb-2">
                            TECHNOLOGIES
                        </strong>

                        <div class="d-flex flex-wrap gap-1">

                            ${data.tech
                                .map(
                                    t => `<span class="badge bg-dark text-cyan">${t}</span>`
                                )
                                .join('')}

                        </div>

                    </div>
                `;

                projectModal.show();

            });

        });


    // 7. AI MAZE SOLVER ALGORITHM SPOTLIGHT
    const algoCards =
        document.querySelectorAll('.algorithm-card');

    const algoTitle =
        document.getElementById('algo-title');

    const algoDesc =
        document.getElementById('algo-desc');


    const algoInfo = {

        'bfs': {

            title: 'Breadth-First Search (BFS)',

            desc:
                'Uninformed search algorithm that expands node frontiers level-by-level. Guarantees the shortest path in unweighted maze graphs.'
        },

        'dfs': {

            title: 'Depth-First Search (DFS)',

            desc:
                'Uninformed search algorithm that explores along graph branches as far as possible before backtracking. Memory efficient but does not guarantee shortest path.'
        },

        'ucs': {

            title: 'Uniform Cost Search (UCS)',

            desc:
                'Optimal search strategy expanding nodes with the lowest path cost g(n). Guarantees optimal path solution on weighted grids.'
        },

        'a-manhattan': {

            title: 'A* (Manhattan Distance)',

            desc:
                'Informed heuristic search f(n) = g(n) + h(n), estimating distance on 4-directional grid movements.'
        },

        'a-euclidean': {

            title: 'A* (Euclidean Distance)',

            desc:
                'Informed heuristic search using straight-line Euclidean distance to guide frontier node expansion.'
        }

    };


    algoCards.forEach(card => {

        card.addEventListener('click', () => {

            algoCards.forEach(c =>
                c.classList.remove('active')
            );

            card.classList.add('active');

            const algoKey =
                card.getAttribute('data-algo');

            if (algoInfo[algoKey]) {

                algoTitle.textContent =
                    algoInfo[algoKey].title;

                algoDesc.textContent =
                    algoInfo[algoKey].desc;

            }

        });

    });


    // 8. COPY TO CLIPBOARD
    const toastElement =
        document.getElementById('actionToast');

    let actionToast = null;

    if (toastElement) {
        actionToast =
            new bootstrap.Toast(toastElement);
    }

    const toastMessage =
        document.getElementById('toastMessage');


    document
        .querySelectorAll('.copy-btn')
        .forEach(btn => {

            btn.addEventListener('click', () => {

                const textToCopy =
                    btn.getAttribute('data-copy');

                navigator.clipboard
                    .writeText(textToCopy)
                    .then(() => {

                        if (toastMessage) {
                            toastMessage.textContent =
                                `Copied to clipboard: ${textToCopy}`;
                        }

                        if (actionToast) {
                            actionToast.show();
                        }

                    })
                    .catch(() => {

                        if (toastMessage) {
                            toastMessage.textContent =
                                'Unable to copy text.';
                        }

                        if (actionToast) {
                            actionToast.show();
                        }

                    });

            });

        });


    // ============================================================
    // 9. CONTACT FORM - REAL WEB3FORMS INTEGRATION
    // ============================================================

    const contactForm =
        document.getElementById('contact-form');

    if (contactForm) {

        contactForm.addEventListener('submit', async (event) => {

            event.preventDefault();
            event.stopPropagation();


            // Validate form
            if (!contactForm.checkValidity()) {

                contactForm.classList.add('was-validated');

                return;
            }


            // Your Web3Forms Access Key
            const WEB3FORMS_ACCESS_KEY =
                '633feeb2-fc18-4d72-b3ca-78b528155707';


            // Get form values
            const name =
                document.getElementById('name').value.trim();

            const email =
                document.getElementById('email').value.trim();

            const message =
                document.getElementById('message').value.trim();


            // Disable button while sending
            const submitButton =
                contactForm.querySelector('button[type="submit"]');

            const originalButtonHTML =
                submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2"></span>
                Sending...
            `;


            try {

                // Send message to Web3Forms
                const response = await fetch(
                    'https://api.web3forms.com/submit',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },

                        body: JSON.stringify({

                            access_key:
                                WEB3FORMS_ACCESS_KEY,

                            subject:
                                `New Portfolio Contact Message from ${name}`,

                            from_name:
                                'Hossam Hisham Portfolio',

                            name:
                                name,

                            email:
                                email,

                            message:
                                message

                        })
                    }
                );


                const result =
                    await response.json();


                if (response.ok && result.success) {

                    // SUCCESS
                    if (toastMessage) {

                        toastMessage.textContent =
                            'Message sent successfully!';

                    }

                    if (actionToast) {
                        actionToast.show();
                    }

                    contactForm.reset();

                    contactForm.classList.remove(
                        'was-validated'
                    );


                } else {

                    // WEB3FORMS ERROR
                    console.error(
                        'Web3Forms Error:',
                        result
                    );

                    if (toastMessage) {

                        toastMessage.textContent =
                            result.message ||
                            'Failed to send message. Please try again.';

                    }

                    if (actionToast) {
                        actionToast.show();
                    }

                }


            } catch (error) {

                // NETWORK ERROR
                console.error(
                    'Contact Form Error:',
                    error
                );

                if (toastMessage) {

                    toastMessage.textContent =
                        'Connection error. Please try again.';

                }

                if (actionToast) {
                    actionToast.show();
                }

            } finally {

                // Restore button
                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonHTML;

            }

        });

    }

});