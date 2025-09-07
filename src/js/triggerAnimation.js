function triggerAnimation(element, className) {
  element.classList.add(className);

  element.addEventListener(
    'animationend',
    () => {
      element.classList.remove(className);
    },
    { once: true } // makes sure listener runs only once
  );
}

export default triggerAnimation;
