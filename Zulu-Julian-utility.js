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
document.getElementById('searchBox').addEventListener('input', function(e) {
  const searchQuery = e.target.value.toLowerCase();

  // List of your JSON files
  const jsonFiles = ['../json_search/Ref_Des.json', '../json_search/Hyd.json', '../json_search/MESL.json'];
  const searchPromises = jsonFiles.map(file => fetch(file).then(response => response.json()));

  // Fetch all JSON files and process them together
  Promise.all(searchPromises).then(dataArrays => {
    // Flatten the array of arrays into a single array containing all items
    const allData = dataArrays.flat();

    // Filter the combined data based on the search query
    const results = allData.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchQuery)
      )
    );

    // Display the combined search results
    displayResults(results);
  });
});

function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // Clear previous results
  results.forEach(result => {
    // Assuming each item has a 'title' and 'url' property for demonstration
    const elem = document.createElement('div');
    elem.innerHTML = `<a href="${result.url}">${result.title}</a>`;
    resultsContainer.appendChild(elem);
  });
}
