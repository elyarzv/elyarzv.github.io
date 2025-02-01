const lines = [
    "Hello! ", "My name is Elyar!",
    "Welcome to my portfolio!"
  ];

  
  const typingContainer = document.querySelector(".typing-container"); // The container where lines will appear
  const studiesContainer = document.querySelector(".studies-container"); // The container where lines will appear
  const typingSpeed = 100; // Speed of typing each character
  
  // Function to type characters one by one with an underline
  function typeCharacter(lineElement, text, index, callback) {
    if (index < text.length) {
      lineElement.textContent = text.slice(0, index + 1) + "_"; // Add the next character with underline
      setTimeout(() => typeCharacter(lineElement, text, index + 1, callback), typingSpeed);
    } else {
      // Keep the underline at the end of the text and start blinking after typing is done
      lineElement.textContent = text + "_";
      if (callback) {
        callback(); // Immediately call the callback after typing the full line
      }
    }
  }
  
  // Function to toggle the underline visibility for the last line
  // Function to type each line sequentially
function typeLines(lines, container, i = 0) {
  if (i < lines.length) {
    const lineElement = document.createElement("div"); // Create a new line element
    lineElement.className = "typed-line"; // Add a class for styling
    container.appendChild(lineElement); // Add the line to the specified container

    // Start typing the current line
    typeCharacter(lineElement, lines[i], 0, () => {
      // Move to the next line immediately after finishing the current line
      typeLines(lines, container, i + 1);
    });
  }
}

// Helper function to type characters one by one
function typeCharacter(lineElement, text, index, callback) {
  if (index < text.length) {
    lineElement.textContent += text[index];
    setTimeout(() => typeCharacter(lineElement, text, index + 1, callback), 50); // Adjust typing speed here
  } else {
    callback(); // Call the callback when typing is complete
  }
}
  
  // Start typing effect when the page loads
  document.addEventListener("DOMContentLoaded", () => {typeLines(lines, typingContainer);});