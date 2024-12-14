const zoomText = document.querySelector('.zoom-text');

// Listen for scroll events
window.addEventListener('scroll', () => {
    // Calculate scroll position
    const scrollY = window.scrollY;

    // Adjust scale based on scroll position (control the divisor to tweak sensitivity)
    const scaleValue = 1 + scrollY / 350;
    const opacityValue = Math.max(1.5 - scrollY / 100, 0);

    // Apply the scaling effect
    zoomText.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
    zoomText.style.opacity = opacityValue;
});