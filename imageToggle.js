// Adding support for image toggling
document.getElementById("toggleText").addEventListener("click", function() {
    console.log("Text was clicked!"); // This will confirm the click event is working
    var imageToggle = document.getElementById("imageContainer");
    if (imageToggle.style.display === "none") {
        console.log("Image was hidden, now showing...");
        imageToggle.style.display = "block";
    } else {
        console.log("Image was shown, now hiding...");
        imageToggle.style.display = "none";
    }
});

