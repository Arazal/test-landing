const footer = document.getElementById("copy")

const currentYear = new Date().getFullYear()

footer.innerHTML = `&copy ${currentYear} SF Eastern Europe Region`

/**
     * Проверка видимости элемента (в видимой части страницы)
     * Достаточно, чтобы верхний или нижний край элемента был виден
     */
 function isVisible(elem) {

    let coords = elem.getBoundingClientRect();

    let windowHeight = document.documentElement.clientHeight;

    // видны верхний ИЛИ нижний край элемента
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
  }

  /**
  Вариант проверки, считающий элемент видимым,
  если он не более чем -1 страница назад или +1 страница вперед.

  function isVisible(elem) {

    let coords = elem.getBoundingClientRect();

    let windowHeight = document.documentElement.clientHeight;

    let extendedTop = -windowHeight;
    let extendedBottom = 2 * windowHeight;

    // top visible || bottom visible
    let topVisible = coords.top > extendedTop && coords.top < extendedBottom;
    let bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

    return topVisible || bottomVisible;
  }
  */

  function showVisible() {
    for (let img of document.querySelectorAll('img')) {
      let realSrc = img.dataset.src;
      if (!realSrc) continue;

      if (isVisible(img)) {
        // отключение кеширования
        // эта строка должна быть удалена в "боевом" коде
        realSrc += '?nocache=' + Math.random();

        img.src = realSrc;

        img.dataset.src = '';
      }
    }
  }

  window.addEventListener('scroll', showVisible);
  showVisible();