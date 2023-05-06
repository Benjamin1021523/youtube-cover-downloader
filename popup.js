var title;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const urlStr = tabs[0].url;
  title = tabs[0].title;

  document.getElementById('title').textContent = urlStr;

  const url = new URL(urlStr);
  const videoId = url.searchParams.get('v');
  if (!videoId) {
    document.getElementById('title').textContent = '非執行對象';
    document.getElementById('maxresdefault').hidden = true;
    return;
  }

  let imgUrl = `https://i.ytimg.com/vi/${videoId}/`;

  document.getElementById('maxresdefault').src = imgUrl + 'maxresdefault.jpg';
  document.getElementById('download').href = imgUrl + 'maxresdefault.jpg';
  document.getElementById('download').download = 'maxresdefault.jpg';
});

document.getElementById('download').addEventListener('click', function() {
  chrome.downloads.download({
    filename: title + '.jpg',
    url: this.href
  });
});
