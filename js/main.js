const animContainer = document.getElementById("lottie");

const animation = lottie.loadAnimation({
  container: animContainer,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "data/wifi_v.01.json",
});

animation.addEventListener("data_ready", function () {
  // animation.setSpeed(5);
  let lastY;
  let lastDirection;
  let direction;
  let play = false;
  document.addEventListener("touchmove", (e) => {
    const currentY = e.touches[0].clientY;
    // moving down
    if (currentY > lastY) {
      direction = "down";
      // moving up
    } else if (currentY < lastY) {
      direction = "up";
    }
    lastY = currentY;
  });

  document.addEventListener("touchstart", () => {
    lastDirection = direction;
    if (direction === "down") {
      animation.playSegments([0, 10], true);
      lastDirection = "down";
    } else {
      animation.playSegments([20, 30], true);
      lastDirection = "up";
    }
  });

  document.addEventListener("touchend", () => {
    if (lastDirection === "down") {
      animation.playSegments([10, 20], true);
    } else {
      animation.playSegments([30, 40], true);
    }
  });
});
