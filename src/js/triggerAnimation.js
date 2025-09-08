function triggerAnimation(element, className) {
  element.classList.toggle(className);

  element.addEventListener(
    'animationend',
    () => {
      element.classList.toggle(className);
    },
    { once: true } // makes sure listener runs only once
  );
}

export default triggerAnimation;
