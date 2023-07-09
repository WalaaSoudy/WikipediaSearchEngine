function searchWikipedia() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();
  
    if (searchQuery === '') {
      return;
    }
  
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      searchQuery
    )}&format=json&origin=*`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const searchResults = data.query.search;
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = '';
  
        searchResults.forEach(result => {
          const title = result.title;
          const snippet = result.snippet;
  
          const resultElement = document.createElement('div');
          resultElement.classList.add('result');
          resultElement.innerHTML = `
            <h3><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(
              title
            )}" target="_blank">${title}</a></h3>
            <p>${snippet}</p>
          `;
  
          searchResultsContainer.appendChild(resultElement);
        });
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
  }
  