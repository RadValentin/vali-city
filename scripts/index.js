require('normalize.css');

/* Image gallery (lightbox) functionality */
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxImage = document.querySelector('.lightbox-overlay img');
const lightboxCaption = document.querySelector('.lightbox-overlay .caption');
const lightboxCloseBtn = document.querySelector('.lightbox-content .btn-close');

/* Open lightbox */
const galleryImages = [...document.querySelectorAll('.gallery-item img')];
const contentDiv = document.querySelector('.content');
const lightboxNext = document.querySelector('.lightbox-content .btn-next');
const lightboxPrev = document.querySelector('.lightbox-content .btn-prev');

function showImageInLightbox(imageNode) {
  const captionText = imageNode.parentElement.querySelector('figcaption').textContent;
  const imgIndex = galleryImages.indexOf(imageNode);

  // show/hide next/prev buttons
  lightboxPrev.style.visibility = imgIndex === 0 ? 'hidden': 'visible';
  lightboxNext.style.visibility = imgIndex === galleryImages.length - 1 ? 'hidden': 'visible';

  lightboxImage.setAttribute('src', imageNode.src);

  if (captionText) {
    lightboxCaption.textContent = captionText;
  }
}

contentDiv.addEventListener('click', function(e) {
  if (e.target.matches('.gallery-item img')) {
    lightboxOverlay.style.display = 'flex';
    showImageInLightbox(e.target);
  }
});

/* Cycle through lightbox images */
function showNextImageInLightbox() {
    const imgIndex = galleryImages.findIndex(
    img => lightboxImage.getAttribute('src').includes(img.getAttribute('src'))
  )

  if (imgIndex < galleryImages.length - 1) {
    showImageInLightbox(galleryImages[imgIndex + 1]);
  }
}

function showPrevImageInLightbox() {
  const imgIndex = galleryImages.findIndex(
    img => lightboxImage.getAttribute('src').includes(img.getAttribute('src'))
  )

  if (imgIndex > 0) {
    showImageInLightbox(galleryImages[imgIndex - 1]);
  }
}

lightboxNext.addEventListener('click', showNextImageInLightbox);
lightboxPrev.addEventListener('click', showPrevImageInLightbox);

/* Close lightbox */
function closeLightbox(e) {
  lightboxOverlay.style.display = 'none';
  lightboxImage.removeAttribute('src');
  lightboxCaption.textContent = '';
}

lightboxCloseBtn.addEventListener('click', closeLightbox);
// keyboard navigation
document.addEventListener('keydown', function(e) {
  const isLightboxVisible = lightboxOverlay.style.display !== 'none';

  if (!isLightboxVisible) {
    return;
  }

  if (e.code === 'Escape') {
    closeLightbox();
  } else if (e.code === 'ArrowRight') {
    showNextImageInLightbox();
  } else if (e.code === 'ArrowLeft') {
    showPrevImageInLightbox();
  }
});
