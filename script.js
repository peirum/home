// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".hero-visual, .benefit-card, .benefits-title, .features-visual, .personalization-visual, .testimonial-card",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial styles for animation
  const elementsToAnimate = document.querySelectorAll(
    ".hero-visual, .benefit-card, .benefits-title, .features-visual, .personalization-visual, .testimonial-card",
  )
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
  })

  // Run animation on load and scroll
  window.addEventListener("scroll", animateOnScroll)
  window.addEventListener("load", animateOnScroll)

  // Form submission handling
  const ctaForm = document.querySelector(".cta-form")
  if (ctaForm) {
    ctaForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')

      if (emailInput && emailInput.value) {
        // Here you would typically send the data to your server
        alert("¡Gracias por tu interés! Te contactaremos pronto.")
        emailInput.value = ""
      } else {
        alert("Por favor, ingresa un email válido.")
      }
    })
  }

  // Initialize circle progress animation
  const circleProgress = document.querySelector(".circle-progress")
  if (circleProgress) {
    // Calculate the circumference
    const radius = 40
    const circumference = 2 * Math.PI * radius

    // Set the dasharray to the circumference
    circleProgress.style.strokeDasharray = circumference

    // Calculate the dashoffset based on the percentage (78%)
    const percentage = 78
    const offset = circumference - (percentage / 100) * circumference

    // Animate the dashoffset
    setTimeout(() => {
      circleProgress.style.transition = "stroke-dashoffset 1.5s ease-in-out"
      circleProgress.style.strokeDashoffset = offset
    }, 500)
  }


  // Typing Animation
  const words = ["hotel", "lodge", "glamping", "hostal", "cabaña", "alojamiento"];
  const typedTextSpan = document.querySelector(".typed-text");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isWaiting = true;
      setTimeout(() => {
        isDeleting = true;
        isWaiting = false;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 100 : isWaiting ? 3000 : 200;
    setTimeout(type, typingSpeed);
  }

  if (typedTextSpan) type();
})