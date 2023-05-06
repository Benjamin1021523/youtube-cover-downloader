var title;
var infoTitle;
var imgUrl;

const regex1 = / *\/ */g;

const setImageInfo = (ele) => {
  document.getElementById('title').value = title + '_' + ele.textContent;
  document.getElementById('preview').src = imgUrl + ele.id + '.jpg';
  document.getElementById('download').href = imgUrl + ele.id + '.jpg';
}

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const urlStr = tabs[0].url;

  const url = new URL(urlStr);
  const videoId = url.searchParams.get('v');
  if (!videoId) {
    document.getElementById('info').textContent = '非執行對象';
    document.getElementById('main').hidden = true;
    return;
  }

  title = tabs[0].title.slice(0, tabs[0].title.length - ' - YouTube'.length);
  infoTitle = title;
  title = title.replaceAll(regex1, '、');

  document.getElementById('info').textContent = `標題：《${infoTitle}》`;

  imgUrl = `https://i.ytimg.com/vi/${videoId}/`;

  document.getElementById('maxresdefault').click();
});

document.getElementById('maxresdefault').addEventListener('click', function() {
  setImageInfo(this);
});

document.getElementById('hqdefault').addEventListener('click', function() {
  setImageInfo(this);
});

document.getElementById('mqdefault').addEventListener('click', function() {
  setImageInfo(this);
});

document.getElementById('download').addEventListener('click', function() {
  chrome.downloads.download({
    filename: document.getElementById('title').value + '.jpg',
    url: this.href
  });
});
