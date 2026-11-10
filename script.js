
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. PROJECT INFORMATION
    // =====================================

    const projects = {
        pguard: {
            title: "Intelligent PGuard Maintenance",
            category: "ROBOTICS · ROS 2",
            description: "An intelligent maintenance system developed for the PGuard security robot. The project focuses on automating the hood opening and closing process and improving maintenance operations through SMED methodology and ROS 2.",
            technologies: [
                "ROS 2 Humble",
                "Python",
                "Raspberry Pi",
                "Arduino / Pico",
                "Linear Actuators",
                "SMED"
            ],
            role: "Designed the automatic hood-opening prototype, worked on actuator sizing, electrical architecture, battery monitoring and ROS 2 integration."
        },

        gas: {
            title: "Gas Detection & Alert Robot",
            category: "ROBOTICS · SAFETY",
            description: "A robotic system designed to detect gas in its environment and activate an alert when a dangerous level is detected.",
            technologies: [
                "Gas Sensor",
                "Robotics",
                "Buzzer",
                "LED Indicators",
                "Embedded Programming"
            ],
            role: "Worked on sensor integration, the alert system and robot behavior."
        },

        fire: {
            title: "Fire Detection Robot",
            category: "ROBOTICS · FIRE SAFETY",
            description: "A robotic prototype designed to detect flames and provide visual and audible warnings when fire is detected.",
            technologies: [
                "Flame Sensors",
                "Infrared Sensor",
                "Buzzer",
                "LED",
                "Motor Driver"
            ],
            role: "Worked on sensor wiring, flame detection logic, warning indicators and robot control."
        },

        rfid: {
            title: "RFID Access Control",
            category: "EMBEDDED SYSTEMS",
            description: "An electronic access control prototype using RFID technology to identify authorized cards and manage access.",
            technologies: [
                "RFID RC522",
                "Raspberry Pi Pico",
                "LCD I2C",
                "Servo Motor",
                "Embedded C++"
            ],
            role: "Worked on RFID integration, access validation and the user feedback interface."
        },

        parking: {
            title: "Smart Parking System",
            category: "SMART TECHNOLOGY",
            description: "An intelligent parking prototype designed to support parking-space management and provide information about available spaces.",
            technologies: [
                "Sensors",
                "Microcontroller",
                "Embedded Programming",
                "Electronics"
            ],
            role: "Worked on the system concept, component integration and control logic."
        },

        robot: {
            title: "Line Follower & All-Terrain Robot",
            category: "ARDUINO · ESP32",
            description: "A mobile robotics project involving robot assembly, motor control, sensor integration and autonomous movement.",
            technologies: [
                "Arduino",
                "ESP32",
                "Motor Driver",
                "DC Motors",
                "Sensors"
            ],
            role: "Worked on robot assembly, wiring, sensor integration and programming."
        },

        pid: {
            title: "PID Temperature Control",
            category: "MATLAB · SIMULINK",
            description: "A simulation project focused on temperature regulation using a PID controller and analysis of system response.",
            technologies: [
                "MATLAB",
                "Simulink",
                "PID Controller",
                "Control Systems"
            ],
            role: "Worked on system modelling, PID parameter adjustment and simulation analysis."
        }
    };


    // =====================================
    // 2. PROJECT MODAL
    // =====================================

    const projectModal = document.getElementById("project-modal");
    const projectTitle = document.getElementById("project-title");
    const projectCategory = document.getElementById("project-category");
    const projectDescription = document.getElementById("project-description");
    const projectTechnologies = document.getElementById("project-technologies");
    const projectRole = document.getElementById("project-role");

    function openProject(projectId) {

        const project = projects[projectId];

        if (!project || !projectModal) return;

        projectTitle.textContent = project.title;
        projectCategory.textContent = project.category;
        projectDescription.textContent = project.description;
        projectRole.textContent = project.role;

        projectTechnologies.replaceChildren();

        project.technologies.forEach(technology => {

            const tag = document.createElement("span");
            tag.textContent = technology;

            projectTechnologies.appendChild(tag);

        });

        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    // Open project when clicking Discover Project

    document.addEventListener("click", event => {

        const projectButton = event.target.closest(".project-open");

        if (projectButton) {

            const card = projectButton.closest(".project-card");

            if (card) {
                openProject(card.dataset.project);
            }

        }

    });


    // Close modal buttons

    document.querySelectorAll(".modal-close").forEach(button => {

        button.addEventListener("click", () => {

            closeModal(button.closest(".modal"));

        });

    });


    // Close when clicking outside modal content

    document.querySelectorAll(".modal").forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal(modal);
            }

        });

    });


    // Close project modal with Escape

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            document.querySelectorAll(".modal.active").forEach(closeModal);

        }

    });


    // =====================================
    // 3. PROJECT CAROUSEL
    // =====================================

    const track = document.querySelector(".project-track");
    const previous = document.querySelector(".carousel-arrow.prev");
    const next = document.querySelector(".carousel-arrow.next");
    const progress = document.querySelector(".carousel-progress span");


    function updateProgress() {

        if (!track || !progress) return;

        const maxScroll = track.scrollWidth - track.clientWidth;

        const percentage = maxScroll > 0
            ? (track.scrollLeft / maxScroll) * 100
            : 100;

        progress.style.width = Math.max(20, percentage) + "%";

    }


    if (track) {

        // Previous button

        previous?.addEventListener("click", () => {

            track.scrollBy({
                left: -320,
                behavior: "smooth"
            });

        });


        // Next button

        next?.addEventListener("click", () => {

            track.scrollBy({
                left: 320,
                behavior: "smooth"
            });

        });


        track.addEventListener("scroll", updateProgress);
        window.addEventListener("resize", updateProgress);

        updateProgress();


        // Mouse drag support

        let isDragging = false;
        let startX = 0;
        let initialScroll = 0;


        track.addEventListener("mousedown", event => {

            if (event.target.closest("button")) return;

            isDragging = true;
            startX = event.pageX;
            initialScroll = track.scrollLeft;

        });


        window.addEventListener("mouseup", () => {

            isDragging = false;

        });


        track.addEventListener("mousemove", event => {

            if (!isDragging) return;

            event.preventDefault();

            track.scrollLeft = initialScroll - (event.pageX - startX);

        });

    }


    // =====================================
    // 4. GALLERY FILTERS
    // =====================================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;


            // Update active filter

            filterButtons.forEach(item => {

                item.classList.remove("active");

            });

            button.classList.add("active");


            // Filter gallery items

            galleryItems.forEach(item => {

                const matches =
                    selectedFilter === "all" ||
                    item.dataset.category === selectedFilter;

                item.style.display = matches ? "inline-block" : "none";

            });

        });

    });


    // =====================================
    // 5. NAVIGATION ACTIVE LINK
    // =====================================

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar a[href^='#']");


    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );

                });

            }

        });

    }, {

        rootMargin: "-35% 0px -55% 0px"

    });


    sections.forEach(section => {

        observer.observe(section);

    });


    // =====================================
    // 6. REVEAL SECTIONS ON SCROLL
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .skill-card, .timeline-item, .certificate-card, .web-service-card, .instagram-card"
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.12

    });


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    // =====================================
    // 7. CONTACT POPUP
    // =====================================

    const openContact = document.getElementById("open-contact");
    const closeContact = document.getElementById("close-contact");
    const contactPopup = document.getElementById("contact-popup");


    if (openContact && closeContact && contactPopup) {

        // Open popup

        openContact.addEventListener("click", () => {

            contactPopup.hidden = false;

            document.body.style.overflow = "hidden";

        });


        // Close popup

        function closePopup() {

            contactPopup.hidden = true;

            document.body.style.overflow = "";

        }


        // Close with X

        closeContact.addEventListener("click", closePopup);


        // Close by clicking outside the card

        contactPopup.addEventListener("click", event => {

            if (event.target === contactPopup) {

                closePopup();

            }

        });


        // Close with Escape

        document.addEventListener("keydown", event => {

            if (event.key === "Escape" && !contactPopup.hidden) {

                closePopup();

            }

        });

    }

}); // End of DOMContentLoaded
