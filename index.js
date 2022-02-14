gsap.registerPlugin(ScrollTrigger);

const footer = document.getElementById("copy")

const currentYear = new Date().getFullYear()

footer.innerHTML = `&copy ${currentYear} SF Eastern Europe Region`



let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", {transformOrigin: "right center", force3D: true});




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