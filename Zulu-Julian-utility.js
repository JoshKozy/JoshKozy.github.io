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
function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    const { category } = result;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {});

  Object.entries(groupedResults).forEach(([category, results]) => {
    // Create and append category header
    const categoryHeader = document.createElement('h3');
    categoryHeader.textContent = category;
    resultsContainer.appendChild(categoryHeader);

    results.forEach(result => {
      const elem = document.createElement('div');
      let url = constructUrl(result); // Function to construct URL based on the result's properties
      elem.innerHTML = `<a href="${url}">${result.title}</a>`;
      resultsContainer.appendChild(elem);
    });
  });
}

function constructUrl(result) {
  // Dynamically construct URL based on result properties
  let url = '#';
  switch(result.category) {
    case 'Hyd':
      url = `/hydraulics-details.html#${result.identifier}`;
      break;
    case 'MESL':
      url = `/maintenance-support.html#${result.identifier}`;
      break;
    // Add more cases as needed for different categories
    default:
      // Handle default case or unknown category
      break;
  }
  return url;
}
