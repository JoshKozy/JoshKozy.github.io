document.addEventListener("DOMContentLoaded", function() {
  // Select all elements with the class 'toggleText' and iterate over them
  document.querySelectorAll('.toggleText').forEach(function(toggleTextElement) {
    toggleTextElement.addEventListener('click', function() {
      console.log("Toggle image visibility");
      // Find the nearest parent 'li', then find the 'imageToggle' class within it to toggle
      this.closest('li').querySelector('.imageToggle').style.display = this.closest('li').querySelector('.imageToggle').style.display === 'none' ? 'block' : 'none';
    });
  });
});
