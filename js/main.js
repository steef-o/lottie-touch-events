const animContainer = document.getElementById("lottie");

const animation = lottie.loadAnimation({
  container: animContainer,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "data/wifi_v.01.json",
});

animation.addEventListener("data_ready", function () {
  let lastY;
  let lastDirection;
  let direction;
  document.addEventListener("touchmove", (e) => {
    const currentY = e.touches[0].clientY;

    // Scrolling down
    if (currentY > lastY) {
      direction = "down";
      // Scrolling up
    } else if (currentY < lastY) {
      direction = "up";
    }
    lastY = currentY;
  });

  document.addEventListener("touchstart", () => {
    // Ensures the correct end animation to avoid jumpy animation transitions
    // when Y direction changes midway through a touch.
    lastDirection = direction;

    if (direction === "down") {
      // stretch start animation
      animation.playSegments([0, 10], true);
      lastDirection = "down";
    } else {
      // compress start animation
      animation.playSegments([20, 30], true);
      lastDirection = "up";
    }
  });

  document.addEventListener("touchend", () => {
    if (lastDirection === "down") {
      // stretch end animation
      animation.playSegments([10, 20], true);
    } else {
      // compress end animation
      animation.playSegments([30, 40], true);
    }
  });
});
