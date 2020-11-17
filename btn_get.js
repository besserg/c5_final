const inpt_value = document.querySelector('#pagenumber');
const inpt_limit = document.querySelector('#limit');
const Url = 'https://picsum.photos/v2/list?';

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Responce state:', xhr.status);
    } else {
      const responce_result = JSON.parse(xhr.response);
      if (callback) {
        callback(responce_result);
      }
    }
  };
  xhr.onerror = function() {
    console.log('Error! Responce status:', xhr.status);
  };
  xhr.send();
};

const resultNode = document.querySelector('.j-result');
const btn = document.querySelector('.btn');
function displayResult(apiData) {
  let cards = '';
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
      <p>${item.author}</p>  
      <img src="${item.download_url}"
          class="card-image"
        />
      </div>
      `;
    cards = cards + cardBlock;
  });
  resultNode.innerHTML = cards;
};

btn.addEventListener('click', () => {
  const inptval = inpt_value.value;
  const inptlim = inpt_limit.value;
  let pgnumb;
  let lim;
  let check_val = false;
  let check_lim = false;
  resultNode.innerHTML = '';
  if (inptval < 11 && inptval > 0) {
    check_val = true;
  } else {
    check_val = false
  }

  if (inptlim < 11 && inptlim > 0) {
    check_lim = true
  } else {
    check_lim = false
  }

  if (check_lim && check_val) {
    localStorage.clear();
    useRequest(Url+'page='+inptval.toString()+'&limit='+inptlim.toString(), displayResult);
    pgnumb = inptval.toString();
    lim = inptlim.toString();
    localStorage.setItem('pagenumber', pgnumb);
    localStorage.setItem('limit', lim);
  } else 
      if (!check_val && check_lim) {
        resultNode.innerHTML = '<h3> Номер страницы вне диапазона от 1 до 10 </h3>';
      } 
    else 
      if (check_val && !check_lim) {
        resultNode.innerHTML = '<h3> Лимит вне диапазона от 1 до 10 </h3>';
      }
  else {
    resultNode.innerHTML = '<h3> Номер страницы и лимит вне диапазона от 1 до 10 </h3>';
  }  
});

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', console.log('loaded'));
}
else {
  pgnumb = localStorage.getItem('pagenumber');
  lim = localStorage.getItem('limit');
  console.log('PageNumber:'+pgnumb+', Limit:'+lim);
  if (pgnumb && lim)  {
    useRequest(Url+'page='+pgnumb+'&limit='+lim, displayResult);
  }
  // localStorage.clear();
};

