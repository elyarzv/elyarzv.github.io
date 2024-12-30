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
  function toggleUnderline(lineElement) {
    if (lineElement.textContent.endsWith("_")) {
      lineElement.textContent = lineElement.textContent.slice(0, -1); // Remove the underline
    } else {
      lineElement.textContent += "_"; // Add the underline
    }
  }
  
  // Function to type each line sequentially
  function typeLines(lines, container, i = 0, previousDashInterval = null) {
    if (i < lines.length) {
      const lineElement = document.createElement("div"); // Create a new line element
      lineElement.className = "typed-line"; // Add a class for styling
      container.appendChild(lineElement); // Add the line to the specified container
  
      // Stop the previous blinking underline interval
      if (previousDashInterval) {
        clearInterval(previousDashInterval); // Stop blinking for the previous line
        const previousLine = container.children[i - 1];
        if (previousLine) {
          previousLine.textContent = previousLine.textContent.replace("_", ""); // Remove the underline
        }
      }
  
      // Start typing the current line
      typeCharacter(lineElement, lines[i], 0, () => {
        // Start the underline blinking effect after the line is fully typed
        const underlineInterval = setInterval(() => toggleUnderline(lineElement), 500);
        // Move to the next line immediately after finishing the current line
        typeLines(lines, container, i + 1, underlineInterval);
      });
    }
  }
  
  // Start typing effect when the page loads
  document.addEventListener("DOMContentLoaded", () => {typeLines(lines, typingContainer);});