const zoomText = document.querySelector('.zoom-text');

window.addEventListener("load", () => {
    const zoomText = document.querySelector(".zoom-text");
    zoomText.style.opacity = "1"; // Make text visible
});

// Listen for scroll events
window.addEventListener('scroll', () => {
    // Calculate scroll position
    const scrollY = window.scrollY;

    // Adjust scale based on scroll position (control the divisor to tweak sensitivity)
    const scaleValue = 1 + scrollY / 2000;
    const opacityValue = Math.max(1.5 - scrollY / 500, 0);

    // Apply the scaling effect
    zoomText.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
    zoomText.style.opacity = opacityValue;
});