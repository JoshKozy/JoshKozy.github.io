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
  const input = document.getElementById('searchInput').value.toLowerCase();
  fetch('../json_search/combined_index.json')
    .then(response => response.json())
    .then(data => {
      const results = data.index.filter(item => item.keywords.some(keyword => keyword.toLowerCase().includes(input)));
      displayResults(results);
    });
}

function displayResults(results) {
  const container = document.getElementById('searchResults');
  container.innerHTML = ''; // Clear previous results
  if (results.length > 0) {
    results.forEach(result => {
      const element = document.createElement('div');
      // This line constructs a more detailed display text for each result.
      // Adjust it according to how you want to present the information.
      const displayText = `${result.info} - See details on <a href="${result.page}">${result.page.replace('.html', '').toUpperCase()}</a>`;
      element.innerHTML = displayText;
      container.appendChild(element);
    });
  } else {
    container.innerHTML = 'No results found.';
  }
}
