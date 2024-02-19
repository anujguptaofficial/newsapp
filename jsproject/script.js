const apiKey = "e7a6396fdaf048f9a62648174580a9f7";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const fetchNews = async () => {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.error("Error while fetching news", err);
    return [];
  } finally {
  }
};

searchButton.addEventListener("click", async () => {
  const querry = searchField.value.trim();
  if (querry != "") {
    try {
      const articles = await fetchNewsQuerry(querry);
      displayBlogs(articles);
    } catch (err) {
      console.log("Error while fecthing ", err);
    }
  }
});

const fetchNewsQuerry = async () => {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${querry}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.error("Error while fetching news", err);
    return [];
  } finally {
  }
};

const displayBlogs = (articles) => {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    blogContainer.appendChild(blogCard);
  });
};

(async () => {
  try {
    const articles = await fetchNews();
    displayBlogs(articles);
  } catch (err) {
    console.error("Error while fetching news", err);
    return [];
  }
})();
