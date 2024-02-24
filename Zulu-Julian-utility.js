function updateZuluTime() {
    const now = new Date();
    const zuluTime = now.toISOString().split('T')[1].split('.')[0]; // Extracts time part in HH:MM:SS format
    document.getElementById('zuluTimeClock').innerHTML = `ZULU Time: ${zuluTime}`;
}

function getJulianDate() {
    const now = new Date();
    const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const julianDay = Math.floor(diff / oneDay);
    document.getElementById('julianDate').innerHTML = `Julian Date: ${julianDay}`;
}

// Update ZULU time every second
setInterval(updateZuluTime, 1000);

// Update Julian Date (This could be set to run less frequently if needed, but once per page load is likely sufficient)
getJulianDate();


// Search function support
function search() {
  console.log("Search initiated"); // Debugging log
  const input = document.getElementById('searchBox').value.toLowerCase();
  console.log(`Searching for: ${input}`); // Debugging log
  fetch('json_search/combined_index.json') // Ensure the path to your JSON file is correct
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Data fetched successfully:", data); // Debugging log

      // Log to inspect the keywords
      console.log("Inspecting keywords in data.index:", data.index.map(item => item.keywords));

      // Adjusted filter to check if keyword is a string
      const results = data.index.filter(item => 
        item.keywords.some(keyword => 
          typeof keyword === 'string' && keyword.toLowerCase().includes(input)
        )
      );

      console.log(`Found ${results.length} results`, results); // Debugging log
      displayResults(results);
    })
    .catch(error => console.error('Error fetching the index or processing data:', error)); // Added error handling
}

function displayResults(results) {
  const container = document.getElementById('searchResults');
  container.innerHTML = ''; // Clear previous results
  container.style.display = 'block'; // Make sure the container is always shown after a search
    
  if (results.length > 0) {
    results.forEach(result => {
      const element = document.createElement('div');
      element.innerHTML = `<a href="${result.page}">${result.info}</a>`;
      container.appendChild(element);
    });
  } else {
    container.innerHTML = 'No results found.';
  }
}

// Adding event listener for the Enter key press
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('searchBox').addEventListener('keyup', function(e) {
    console.log(`Key pressed: ${e.key}`); // To verify the event is triggered
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  });
});

// Adding support for image toggling
document.getElementById("toggleText").addEventListener("click", function() {
    var imageToggle = document.getElementById("toggleImage");
    if (imageToggle.style.display === "none") {
        imageToggle.style.display = "block";
    } else {
        imageToggle.style.display = "none";
    }
});
