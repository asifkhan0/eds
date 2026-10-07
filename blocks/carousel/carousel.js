export default function decorate(block) {
  const rows = [...block.children];

  [...block.children].forEach((row, r) => {
    // First row = Next button
    if (r === 0) {
      const nextBtn = document.createElement('button');

      nextBtn.classList.add('btn');
      nextBtn.classList.add('btn-next');

      const node = document.createTextNode(row.textContent);

      nextBtn.append(node);
      row.replaceWith(nextBtn);

    // Last row = Previous button
    } else if (r === rows.length - 1) {
      const prevBtn = document.createElement('button');

      prevBtn.classList.add('btn');
      prevBtn.classList.add('btn-prev');

      const node = document.createTextNode(row.textContent);

      prevBtn.append(node);
      row.replaceWith(prevBtn);

    // Everything between = slides
    } else {
      row.classList.add('slide');

      [...row.children].forEach((col, c) => {
        console.log('====>', row, r, col, c);

        if (c === 1) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  // Select all slides
  const slides = block.querySelectorAll('.slide');

  // Set initial position of every slide
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  // Select buttons
  const nextSlide = block.querySelector('.btn-next');
  const prevSlide = block.querySelector('.btn-prev');

  // Current slide
  let currentSlide = 0;

  // Next button
  nextSlide.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      currentSlide += 1;

      slides.forEach((slide) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
      });
    }
  });

  // Previous button
  prevSlide.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide -= 1;

      slides.forEach((slide) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
      });
    }
  });
}