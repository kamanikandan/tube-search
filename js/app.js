const API_KEY = 'AIzaSyCPf9lrlbh37Z6_oU_BLZUd7PAA4U9aETI';
const resultElement = document.querySelector('.results-wrapper');
const searchKey = document.querySelector('#search');
const youtubeForm = document.querySelector(".youtubeForm");

youtubeForm.addEventListener('submit', e => {
  e.preventDefault();
  let searchQuery = searchKey.value;
  getVideos(searchQuery);
});


function getVideos(searchQuery) {
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: `${API_KEY}`,
      q: `${searchQuery}`,
      part: 'snippet',
      maxResults: 50,
      type: 'video',
      videoEmbeddable: true,
    },
    success: function (data) {
      let resultData = data.items;
      loadResultHTML(resultData);
    },
    error: function (response) {
      console.log("Request Failed");
    }
  });
}


function loadResultHTML(videos) {
  let resultHtml = videos.map(item => {
    return (
      `
      <div class="youtube-card">
          <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" title="${item.snippet.title}">
              <img src=${item.snippet.thumbnails.high.url} alt="${item.snippet.title}">
              <h2>${item.snippet.title}</h2>
          </a>
      </div>
      `
    )
  }).join("");
  resultElement.innerHTML = resultHtml;
}
getVideos("trending");