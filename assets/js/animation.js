// Smooth Scrolling

const smoothScrolling = () => {
  const lenis = new Lenis({
    duration: 2,
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

smoothScrolling();

// Full Nav Menu
const fullNavMenu = () => {
  const hamburger = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close-btn button");
  const fullNav = document.querySelector(".full-nav");
  const navLinks = document.querySelectorAll(".nav-list .nav-item a"); // Select all nav links

  const openNav = () => {
    gsap.to(fullNav, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3,
    });

    gsap.fromTo(
      ".full-nav .top-content",
      { opacity: 0, y: "-20px" },
      {
        opacity: 1,
        y: "0px",
        duration: 0.5,
        ease: "power1.out",
      }
    );

    gsap.fromTo(
      ".nav-list .nav-item",
      { opacity: 0, x: "50px" },
      {
        opacity: 1,
        x: "0px",
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
      }
    );

    gsap.fromTo(
      ".full-nav .bottom-content",
      { opacity: 0, y: "20px" },
      {
        opacity: 1,
        y: "0px",
        duration: 0.5,
        ease: "power1.out",
        delay: 0.6, // Add delay to start after the nav items animation
      }
    );

    document.querySelector("body").style.overflowY = "hidden";
  };

  const closeNav = () => {
    gsap.to(fullNav, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
    });

    document.querySelector("body").style.overflowY = "auto";
  };

  hamburger.addEventListener("click", openNav);
  closeBtn.addEventListener("click", closeNav);

  // Close the nav when any link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", closeNav);
  });
};

fullNavMenu();


// Fade Animation

function loadAnimations() {
  let visibleElements = [];

  const revealOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!visibleElements.includes(entry.target)) {
          visibleElements.push(entry.target);
        }
      }
    });

    if (visibleElements.length > 1) {
      visibleElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("reveal");
          observer.unobserve(element);

          visibleElements = visibleElements.filter((el) => el !== element);
        }, index * 200);
      });
    } else if (visibleElements.length === 1) {
      const element = visibleElements[0];
      element.classList.add("reveal");
      observer.unobserve(element);
      visibleElements = [];
    }
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    root: null,
    threshold: 0.2,
  });

  document.querySelectorAll(".masker").forEach((element) => {
    observer.observe(element);
  });
}

loadAnimations();

// Magnetic Hover Button Animation

const btn = document.querySelectorAll(".magnetic-btn");

btn.forEach((button) => {
  // Define the magnetic area (in pixels)
  const magneticArea = 100;

  let isHovering = false; // Track if the button is being hovered

  // Mouse enter event to set hovering state
  button.addEventListener('mouseenter', () => {
    isHovering = true; // Set to true when mouse enters
    hoverImage.style.opacity = '1'; // Show hover image
  });

  // Mouse leave event to reset hovering state
  button.addEventListener('mouseleave', () => {
    isHovering = false; // Set to false when mouse leaves
    hoverImage.style.opacity = '0'; // Hide hover image
  });

  window.addEventListener("mousemove", (e) => {
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const distance = Math.sqrt(x * x + y * y);

    // Check if the mouse is within the magnetic range
    if (distance < magneticArea) {
      gsap.to(button, {
        x: x * 0.3, // Control intensity of the movement
        y: y * 0.3,
        duration: 0.3,
        ease: "power3.out",
      });
    } else {
      // Reset position when out of magnetic range
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    // Maintain hover image visibility if still hovering
    if (isHovering) {
      hoverImage.style.opacity = '1'; // Keep it visible
    }
  });

  // Reset button position on mouseleave of body
  document.body.addEventListener("mouseleave", () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  });
});


// loader display only when website takes loading

// Once the window has fully loaded
window.onload = function () {
  // Get the loader and content elements
  var loader = document.getElementById('loader');
  var webContent = document.querySelector('.webContent');

  // Simulate a fake loading delay of 3 seconds before hiding the loader
  setTimeout(function () {
    // Hide the loader after the fake delay
    loader.style.display = "none";

    // Show the content by changing display to block
    webContent.style.display = "block";
  }, 0);
};


// Plan Sec Animation
function initializeFadeInAnimations() {
  const fadeInContainer = document.querySelector(".fadeInContainer");
  const fadeInElements = fadeInContainer.querySelectorAll(".fadeInElement");
  let visibleElements = [];

  const revealOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!visibleElements.includes(entry.target)) {
          visibleElements.push(entry.target);
        }
      }
    });

    if (visibleElements.length > 0) {
      visibleElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("reveal");
          observer.unobserve(element);
          visibleElements = visibleElements.filter((el) => el !== element);
        }, index * 200); // Staggered animation by 200ms for each element
      });
    }
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    root: null,
    threshold: 0.2, // Adjust as needed
  });

  observer.observe(fadeInContainer); // Observe the parent container

  // Observe each fadeInElement to trigger staggered animations
  fadeInElements.forEach((element) => {
    observer.observe(element);
  });
}

// Call the function to load animations
initializeFadeInAnimations();



// Mess sec Animation

function loadMsgAnimations() {
  let visibleMessages = [];

  const revealMessagesOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!visibleMessages.includes(entry.target)) {
          visibleMessages.push(entry.target);
        }
      }
    });

    if (visibleMessages.length > 1) {
      visibleMessages.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("reveal");
          observer.unobserve(element);

          visibleMessages = visibleMessages.filter((el) => el !== element);
        }, index * 200);
      });
    } else if (visibleMessages.length === 1) {
      const element = visibleMessages[0];
      element.classList.add("reveal");
      observer.unobserve(element);
      visibleMessages = [];
    }
  };

  const observer = new IntersectionObserver(revealMessagesOnScroll, {
    root: null,
    threshold: 0.2, // Adjust as needed
  });

  document.querySelectorAll(".msg-frame").forEach((element) => {
    observer.observe(element);
  });
}

loadMsgAnimations();


// Hover prcing list btn functionality

document.addEventListener('DOMContentLoaded', () => {
  const hoverImage = document.querySelector('.hover-image');
  const hoverButton = document.querySelector('.hover-button');

  if (!hoverImage || !hoverButton) {
      console.error('Element not found. Check your HTML structure and class names.');
      return; // Exit if elements are not found
  }

  let intervalId;  // Stores the interval ID for toggling visibility
  let isHovered = false;  // Keeps track of whether the button is hovered
  let isToggling = false;  // Keeps track of whether toggling is active

  // Function to toggle image visibility every 3 seconds when not hovering
  function toggleImage() {
      if (!isToggling) { // Only start toggling if it's not already active
          isToggling = true; // Set toggling to true
          intervalId = setInterval(() => {
              if (!isHovered) {  // Only toggle if button is not hovered
                  hoverImage.style.opacity = hoverImage.style.opacity === '1' ? '0' : '1';
              }
          }, 3000);
      }
  }

  // Start toggling visibility on page load
  toggleImage();

  // Stop toggling and show image when hovered
  hoverButton.addEventListener('mouseenter', () => {
      console.log('Mouse entered button'); // Debugging log
      isHovered = true;  // Set hover state to true
      clearInterval(intervalId);  // Stop the toggle interval
      hoverImage.style.opacity = '1';  // Show image immediately
      isToggling = false; // Stop any toggling
  });

  // Resume toggling when hover ends
  hoverButton.addEventListener('mouseleave', () => {
      console.log('Mouse left button'); // Debugging log
      isHovered = false;  // Reset hover state
      hoverImage.style.opacity = '0';  // Ensure image is hidden before resuming
      toggleImage();  // Restart the toggle functionality
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.hover-button');
  const hoverImage = document.querySelector('.hover-image'); // Adjust this if needed

  // Define the magnetic area (in pixels)
  const magneticArea = 100;

  buttons.forEach((button) => {
      let isHovering = false; // Track if the button is being hovered

      // Mouse enter event to set hovering state
      button.addEventListener('mouseenter', () => {
          isHovering = true; // Set to true when mouse enters
          hoverImage.style.opacity = '1'; // Show hover image
      });

      // Mouse leave event to reset hovering state
      button.addEventListener('mouseleave', () => {
          isHovering = false; // Set to false when mouse leaves
          hoverImage.style.opacity = '0'; // Hide hover image
      });

      // Track mouse movement over the button
      window.addEventListener('mousemove', (e) => {
          const { top, left, width, height } = button.getBoundingClientRect();
          const x = e.clientX - left - width / 2;
          const y = e.clientY - top - height / 2;
          const distance = Math.sqrt(x * x + y * y);

          // Check if the mouse is within the magnetic range
          if (distance < magneticArea) {
              gsap.to(button, {
                  x: x * 0.3, // Control intensity of the movement
                  y: y * 0.3,
                  duration: 0.3,
                  ease: 'power3.out',
              });
          } else {
              // Reset position when out of magnetic range
              gsap.to(button, {
                  x: 0,
                  y: 0,
                  duration: 0.3,
                  ease: 'power3.out',
              });
          }

          // Maintain hover image visibility if still hovering
          if (isHovering) {
              hoverImage.style.opacity = '1'; // Keep it visible
          }
      });

      // Reset button position on mouseleave of body
      document.body.addEventListener('mouseleave', () => {
          gsap.to(button, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power3.out',
          });
      });
  });
});

// view more btn

document.addEventListener('DOMContentLoaded', () => {
  const viewHoverImg = document.querySelector('.view-hover-img');
  const newMagneticBtn = document.querySelector('.new-magnetic-btn');

  if (!viewHoverImg || !newMagneticBtn) {
      console.error('Element not found. Check your HTML structure and class names.');
      return; // Exit if elements are not found
  }

  let intervalId;  // Stores the interval ID for toggling visibility
  let isHovered = false;  // Keeps track of whether the button is hovered
  let isToggling = false;  // Keeps track of whether toggling is active

  // Function to toggle image visibility every 3 seconds when not hovering
  function toggleImage() {
      if (!isToggling) { // Only start toggling if it's not already active
          isToggling = true; // Set toggling to true
          intervalId = setInterval(() => {
              if (!isHovered) {  // Only toggle if button is not hovered
                  viewHoverImg.style.opacity = viewHoverImg.style.opacity === '1' ? '0' : '1';
              }
          }, 3000);
      }
  }

  // Start toggling visibility on page load
  toggleImage();

  // Show image when hovered
  newMagneticBtn.addEventListener('mouseenter', () => {
      isHovered = true;  // Set hover state to true
      clearInterval(intervalId);  // Stop the toggle interval
      viewHoverImg.style.opacity = '1';  // Show image immediately
      isToggling = false; // Stop any toggling
  });

  // Resume toggling when hover ends
  newMagneticBtn.addEventListener('mouseleave', () => {
      isHovered = false;  // Reset hover state
      toggleImage();  // Restart the toggle functionality
      // Optional: Ensure the image is hidden when mouse leaves the button
      viewHoverImg.style.opacity = '0'; // Hide image if not hovered
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.new-magnetic-btn');
  const hoverImage = document.querySelector('.view-hover-img'); // Adjust this if needed

  // Define the magnetic area (in pixels)
  const magneticArea = 100;

  buttons.forEach((button) => {
      let isHovering = false; // Track if the button is being hovered

      // Mouse enter event to set hovering state
      button.addEventListener('mouseenter', () => {
          isHovering = true; // Set to true when mouse enters
          hoverImage.style.opacity = '1'; // Show hover image
      });

      // Mouse leave event to reset hovering state
      button.addEventListener('mouseleave', () => {
          isHovering = false; // Set to false when mouse leaves
          hoverImage.style.opacity = '0'; // Hide hover image
      });

      // Track mouse movement over the button
      window.addEventListener('mousemove', (e) => {
          const { top, left, width, height } = button.getBoundingClientRect();
          const x = e.clientX - left - width / 2;
          const y = e.clientY - top - height / 2;
          const distance = Math.sqrt(x * x + y * y);

          // Check if the mouse is within the magnetic range
          if (distance < magneticArea) {
              gsap.to(button, {
                  x: x * 0.3, // Control intensity of the movement
                  y: y * 0.3,
                  duration: 0.3,
                  ease: 'power3.out',
              });
          } else {
              // Reset position when out of magnetic range
              gsap.to(button, {
                  x: 0,
                  y: 0,
                  duration: 0.3,
                  ease: 'power3.out',
              });
          }

          // Maintain hover image visibility if still hovering
          if (isHovering) {
              hoverImage.style.opacity = '1'; // Keep it visible
          }
      });

      // Reset button position on mouseleave of body
      document.body.addEventListener('mouseleave', () => {
          gsap.to(button, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power3.out',
          });
      });
  });
});