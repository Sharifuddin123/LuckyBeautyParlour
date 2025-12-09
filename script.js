document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));

  // theme toggle (persist)
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'lucky-theme-dark';
  const setDark = (val) => {
    if (val) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem(STORAGE_KEY, val ? '1' : '0');
  };
  // init
  setDark(localStorage.getItem(STORAGE_KEY) === '1');

  themeToggle?.addEventListener('click', () => {
    setDark(!document.documentElement.classList.contains('dark'));
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav if open
        navLinks.classList.remove('open');
      }
    });
  });

  /* ---------- Carousel logic ---------- */
  const slides = Array.from(document.querySelectorAll('#carousel .slide'));
  let slideIndex = 0;
  const showSlide = (i) => {
    slides.forEach((s, idx)=> s.classList.toggle('active', idx === i));
  };
  const nextSlide = () => { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); };
  const prevSlide = () => { slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); };

  document.getElementById('next')?.addEventListener('click', nextSlide);
  document.getElementById('prev')?.addEventListener('click', prevSlide);

  // autoplay
  let carouselTimer = setInterval(nextSlide, 4200);
  // pause on hover
  const carouselEl = document.getElementById('carousel');
  carouselEl?.addEventListener('mouseenter', ()=> clearInterval(carouselTimer));
  carouselEl?.addEventListener('mouseleave', ()=> carouselTimer = setInterval(nextSlide, 4200));

  /* ---------- Testimonials slider ---------- */
  const tests = Array.from(document.querySelectorAll('.testimonial'));
  let testIndex = 0;
  const showTest = (i) => tests.forEach((t,idx)=>t.classList.toggle('active', idx===i));
  document.getElementById('testNext')?.addEventListener('click', ()=> { testIndex = (testIndex+1)%tests.length; showTest(testIndex); });
  document.getElementById('testPrev')?.addEventListener('click', ()=> { testIndex = (testIndex-1+tests.length)%tests.length; showTest(testIndex); });
  // auto rotate testimonials
  setInterval(()=>{ testIndex = (testIndex+1)%tests.length; showTest(testIndex); }, 6000);

  /* ---------- Appointment form ---------- */
  const form = document.getElementById('appointmentForm');
  const modal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    // basic validation
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    if(!name || !/^\d{10}$/.test(phone)){
      alert('Please enter a valid name and 10-digit phone number.');
      return;
    }

    // Here you would normally send data to server via fetch/ajax.
    // For this demo we show success modal and reset form.
    modal.classList.add('show');
    form.reset();
  });

  closeModal?.addEventListener('click', ()=> modal.classList.remove('show'));
  modal?.addEventListener('click', (e)=> { if (e.target === modal) modal.classList.remove('show'); });

  /* ---------- Basic reveal on scroll ---------- */
  const revealElements = document.querySelectorAll('.cards-grid .service-card, .hero-content, .media-card, .carousel, .testimonials, .form-grid');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.style.transform = 'translateY(0)', entry.target.style.opacity = 1;
    });
  }, {threshold: 0.12});
  revealElements.forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'all .6s cubic-bezier(.2,.9,.2,1)';
    revealObserver.observe(el);
  });

});


document.getElementById("appointmentForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop page refresh

    const beauticianNumber = "919390966127"; 

    const name = document.querySelector("input[name='name']").value;
    const phone = document.querySelector("input[name='phone']").value;
    const email = document.querySelector("input[name='email']").value;
    const datetime = document.querySelector("input[name='datetime']").value;
    const service = document.querySelector("select[name='service']").value;
    const note = document.querySelector("textarea[name='note']").value;
    const address = document.querySelector("textarea[name='address']").value;

    // Format date/time for readability
    const formattedDate = new Date(datetime).toLocaleString();

    // Create WhatsApp Message
    const message = `
🌸 *New Appointment Booking - Lucky Beauty Parlour* 🌸

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email || "Not provided"}
📅 *Date & Time:* ${formattedDate}
💄 *Service:* ${service}
📝 *Notes:* ${note || "None"}
📝 *Address:* ${address || "Not Provided"}

Please confirm the appointment. 💕
    `;

    // Encode message
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp Chat
    const whatsappURL = `https://wa.me/${beauticianNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
});
