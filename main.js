"use strict";

// My API key: aeb95d45e09a4a5482af12552511c112

const btnSearch = document.querySelector(".btn--search");
const articlesList = document.querySelector(".main");
const inputSearch = document.querySelector(".searchbar-input");

btnSearch.addEventListener("click", function (e) {
  e.preventDefault();

  // 객체 생성
  const xhr = new XMLHttpRequest();

  // 검색어 가져오기
  const query = inputSearch.value;

  // Open()로 url을 제공 (서버에 데이터 요청단계)
  xhr.open(
    "get",
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&sortBy=publishedAt&apiKey=aeb95d45e09a4a5482af12552511c112`,
    true
  );

  // 서버에 있는 결과가 넘어올 때 아래 함수가 콜 될것.
  xhr.onload = function () {
    const result = xhr.responseText;
    const resultObj = JSON.parse(result);

    // article들이 담겨져 있는 배열
    const articles = resultObj["articles"];

    let resultText = "";

    for (let i = 0; i < articles.length; i++) {
      const title = articles[i]["title"];
      const content = articles[i]["content"];
      const cover = articles[i]["urlToImage"];
      const writer = articles[i]["author"];
      const date = new Date(articles[i]["publishedAt"]).toLocaleString();
      const moreLink = articles[i]["url"];

      resultText += `<div class="article-single">
          <img class="article-cover" src=${cover} alt="article-photo" />

          <div class="article-main">
            <h2 class="article-title">${title}</h2>
            <p class="article-info">
              <span class="author">${writer}</span>
              <span class="published-date">${date} -</span>
              <a href=${moreLink}>more</a>
            </p>
            <p class="article-content">
             ${content}
            </p>
          </div>
        </div>`;
    }
    articlesList.innerHTML = resultText;
  };

  // 서버에 업무 요청
  xhr.send();

  // 검색창 인풋 삭제
  inputSearch.value = "";
});
