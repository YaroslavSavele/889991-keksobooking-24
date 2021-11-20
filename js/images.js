const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

const avatarChooser = document.querySelector('#avatar');
const photoChooser = document.querySelector('#images');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewPhoto = document.querySelector('.ad-form__photo img');

/**
 * Показывает превью картинки при загрузке этой картинки
 * @param {*} input поле загрузки картинки
 * @param {*} image картинка на превью по умолчанию
 */
const insertsPicture = (input, image) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      image.src = URL.createObjectURL(file);
      image.width = 70;
      image.height = 70;
    }
  });
};

const insertImages = () => {
  insertsPicture(avatarChooser, previewAvatar);
  insertsPicture(photoChooser, previewPhoto);
};

export {insertImages, previewPhoto, previewAvatar};

