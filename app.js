const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const modalContainer = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxImg = document.querySelector('.lightbox__image');
const backdrop = document.querySelector('.lightbox__overlay');
const galleryContainer = document.querySelector('.js-gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
};

function onGalleryContainerClick(event) {
  closeModalBtn.addEventListener('click', onCloseModal);
  backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowsKeyPress);
  
  event.preventDefault();

  const currentImg = event.target.dataset.source;
  const currentDecription = event.target.alt;

  if (event.target.nodeName === 'IMG') {
    modalContainer.classList.add('is-open');
      lightboxImg.setAttribute('src', `${currentImg}`);
      lightboxImg.setAttribute('alt', `${currentDecription}`);
  }
}

function onCloseModal() {
  closeModalBtn.removeEventListener('click', onCloseModal);

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowsKeyPress);

  modalContainer.classList.remove('is-open');
  lightboxImg.setAttribute('src', '');
  lightboxImg.setAttribute('alt', '');
}

function onBackdropClick(event) {
  backdrop.removeEventListener('click', onBackdropClick);

  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onArrowsKeyPress(event) {
  const leftArrow = 'ArrowLeft';
  const rightArrow = 'ArrowRight';

  const currentIndex = galleryItems.findIndex(item => item.original === lightboxImg.src);

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  if (event.code !== leftArrow && event.code !== rightArrow)
    return;
  
  if (event.code === leftArrow && prevIndex >= 0) {
    lightboxImg.setAttribute('src', `${galleryItems[prevIndex].original}`);
    lightboxImg.setAttribute('alt', `${galleryItems[prevIndex].description}`);
    return lightboxImg;
  }

  if (event.code === rightArrow && nextIndex < galleryItems.length) {
    lightboxImg.setAttribute('src', `${galleryItems[nextIndex].original}`);
    lightboxImg.setAttribute('alt', `${galleryItems[nextIndex].description}`);
    return lightboxImg;
  }
}


