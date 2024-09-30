document.addEventListener('DOMContentLoaded', function () {
  // Counter Animation
  const counters = document.querySelectorAll('.number');
  const speed = 200; // The lower the slower

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;

      // Lower increment for smoother animation
      const increment = target / speed;

      // If count is less than target, increment
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
  new WOW().init();
  // Owl Carousel Initialization
  $('#testimonialCarousel').owlCarousel({
    items: 3,
    margin: 10,
    loop: true,
    nav: true,
    navText: [
      "<i class='fas fa-chevron-left'></i>",
      "<i class='fas fa-chevron-right'></i>",
    ],
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Video Modal Reload
  document
    .getElementById('videoModal')
    .addEventListener('hide.bs.modal', function () {
      var iframe = document.getElementById('videoIframe');
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc; // Reload iframe to stop video
    });
});

// Define the loadMore function in the global scope
function loadMore() {
  const hiddenCards = document.querySelectorAll('.testimonial-card.hidden');
  for (let i = 0; i < 9 && i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove('hidden');
  }
  if (document.querySelectorAll('.testimonial-card.hidden').length === 0) {
    document.querySelector('.load-more-btn').style.display = 'none';
  }
}
