/* SECTION1: NAV MENU */
const nav = document.querySelector(".nav");
const navIcon = document.querySelector(".nav__icon");

navIcon?.addEventListener("click", () => {
  nav?.classList.toggle("expand");
});

/* SECTION2: ARTICLES RENDERING IN ALL PAGES */
const articles = getArticles();

const url = new URL(window.location.href);
console.log(url.pathname);

// Home
if (url.pathname.includes("home") || url.pathname === "/") {
  let mostPopularArticlesHTML = "";
  for (article of articles.filter((article) => article.isPopular)) {
    mostPopularArticlesHTML += getCardHTML(article);
  }
  document.getElementById("most_popular").innerHTML = mostPopularArticlesHTML;
}

// Articles
if (url.pathname.includes("articles")) {
  document.addEventListener("DOMContentLoaded", () => {
    let articlesHTML = "";

    for (const article of articles.filter(
      (article) => document.getElementById(article.category).checked
    )) {
      articlesHTML += getCardHTML(article);
    }

    document.getElementById("articles").innerHTML = articlesHTML;
  });

  //handle filtering
  document.getElementById("category_filter").addEventListener("click", () => {
    let filteredArticles = "";
    for (const article of articles
      .filter((article) => document.getElementById(article.category).checked)
      .sort(
        (a, b) =>
          new Date(a.publishedAt).getDay() - new Date(b.publishedAt).getDay()
      )) {
      filteredArticles += getCardHTML(article);
    }
    document.getElementById("articles").innerHTML =
      filteredArticles || "<p>Please reduce the filters to show results.</p>";
  });
}

// Article
if (url.pathname.includes("article")) {
  document.addEventListener("DOMContentLoaded", () => {
    // Render article
    const articleId = url.search.split("=")[1];
    const currentArticle = articles.find(
      (article) => +article.id === +articleId
    );
    const articleHTML = currentArticle
      ? `
        <div class="container mt-4 px-0">
          <img class="object-fit-cover" style="max-width="100%" height="300" src="${
            currentArticle.urlToImage
          }" alt="" title="">
          <div class="d-flex flex-column justify-content-between item-content py-3 align-left">
            <div>
              <h5 class="mbr-fonts-style mt-0 mb-2 display-6">
                <strong>${currentArticle.shortTitle}</strong>
              </h5>
              <p class="mb-3 display-7">${
                new Date(currentArticle.publishedAt).toISOString().split("T")[0]
              }</p>
              <p class="mb-3 display-7">
                <strong>${currentArticle.title}</strong>
              </p>
              <p class="mb-3 display-7">
                ${currentArticle.description}
              </p>
              <p class="mb-3 display-7">
                ${currentArticle.description}
              </p>
              <p class="mb-3 display-7">
                ${currentArticle.description}
              </p>
            </div>
          </div>
          </div>
        `
      : "<div>Not Found!</div>";
    document.getElementById("article").innerHTML = articleHTML;

    // Render related articles
    let relatedArticlesHTML = "";
    for (const article of articles.filter(
      (article) => article.category === currentArticle.category
    )) {
      if (article.id === currentArticle.id) continue;
      relatedArticlesHTML += getCardHTML(article);
    }
    document.getElementById("related_articles").innerHTML = relatedArticlesHTML;
  });
}

function getCardHTML(article) {
  return `
        <div class="card px-0 col-12 col-md-5 col-lg-3">
          <img class="object-fit-cover" height="300" src="${
            article.urlToImage
          }" alt="${article.title}" title="">
          <div class="card-img-overlay">
           <span class="badge bg-${article.category}">${article.category}</span>
         </div>
          <div class="card-body d-flex flex-column justify-content-between item-content py-3 align-left">
            <div>
              <h5 class="mbr-fonts-style mt-0 mb-2 display-6">
                <strong>${article.shortTitle}</strong>
              </h5>
              <p class="display-7 mb-1">${
                new Date(article.publishedAt).toISOString().split("T")[0]
              }</p>
              <p class="card-text mb-3 display-7">
                ${article.title}
              </p>
            </div>
            <div class="card-item">
              <a class="btn btn-primary" href="article?id=${
                article.id
              }" target="_blank">read</a>
            </div>
            </div>
        </div>
      `;
}

function getArticles() {
  return [
    {
      id: "10",
      category: "Health",
      title:
        "'Alpha bridge' hack can help you fall asleep — even on planes - New York Post",
      shortTitle: "Sleep Hack",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Airplanes can be Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Airplanes can be Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Airplanes can be some of the noisiest and most uncomfortable places to try and catch some sleep, but there’s a game-changing trick that could have you flying off to dreamland in no time.",
      urlToImage:
        "https://nypost.com/wp-content/uploads/sites/2/2024/11/tired-blonde-casual-caucasian-lady-89859141.jpg?quality=75&strip=all&w=1024",
      publishedAt: "2024-11-02T13:00:00Z",
    },
    {
      id: "7",
      category: "Business",
      title:
        "As Patagonia tightens operations, workers say the company has lost its soul - Business Insider",
      shortTitle: "Patagonia Cuts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Patagonia sold itself Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Patagonia sold itself Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Patagonia sold itself as a workplace nirvana. But as sales slow, the brand is hunkering down and cutting jobs.",
      urlToImage:
        "https://i.insider.com/67447c51fa0140cdd56528f3?width=1200&format=jpeg",
      publishedAt: "2024-11-23T10:00:00Z",
    },
    {
      id: "2",
      category: "Sport",
      title:
        "Maui Invitational takeaways: UConn reeling, Tyrese Hunter puts Memphis in finals and Auburn's case for No. 1 - CBS Sports",
      shortTitle: "Maui Finals",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Johni Broome and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Johni Broome and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Johni Broome and Tyrese Hunter had huge games Tuesday to put their teams into Wednesday's Maui Invitational championship.",
      urlToImage:
        "https://sportshub.cbsistatic.com/i/r/2024/11/27/ca138754-487d-49e2-9f60-34145601d2cd/thumbnail/1200x675/6329c0e6ffd2875ddeb484b58408d808/gettyimages-2187036930-1.jpg",
      publishedAt: "2024-11-23T08:06:00Z",
    },
    {
      isPopular: true,
      id: "1",
      category: "Sport",
      title:
        "College Football Playoff rankings: Power conference takes big hit - New York Post",
      shortTitle: "Playoff Hit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The Southeastern Conference’s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The Southeastern Conference’s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The Southeastern Conference’s losses were almost everyone else’s gain in the College Football Playoff rankings.",
      urlToImage:
        "https://nypost.com/wp-content/uploads/sites/2/2024/11/newspress-collage-nj94kc10f-1732695761055.jpg?quality=75&strip=all&1732677892&w=1024",
      publishedAt: "2024-11-23T08:27:00Z",
    },
    {
      isPopular: true,
      id: "4",
      category: "Business",
      title:
        "JJ Watt lauds Paul Bissonnette for ‘defending the people’ in restaurant brawl - New York Post",
      shortTitle: "Watt Brawl",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Reacting to Paul Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Reacting to Paul Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Reacting to Paul Bissonnette’s video about what occurred during the restaurant assault on X, ex-NFL defensive end J.J. Watt applauded the actions.",
      urlToImage:
        "https://nypost.com/wp-content/uploads/sites/2/2024/11/newspress-collage-b77szehar-1732682089516.jpg?quality=75&strip=all&1732664170&w=1024",
      publishedAt: "2024-11-29T04:56:00Z",
    },

    {
      id: "6",
      category: "Business",
      title:
        "Amazon Black Friday Deals: I Found the 53 Deals Worth Shopping This Holiday Season - CNET",
      shortTitle: "Black Friday",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Shop the best Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Shop the best Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Shop the best deals across TVs, tablets, kitchen appliances, headphones, and more before they are gone.",
      urlToImage:
        "https://www.cnet.com/a/img/resize/ad3ef896d2b455c7def22b3ebade7f5aedb62885/hub/2024/10/23/8cb0b746-8105-4f89-a44a-510e2cbef344/black-friday-2024-amazon.png?auto=webp&fit=crop&height=675&width=1200",
      publishedAt: "2024-11-29T10:01:16Z",
    },

    {
      id: "5",
      category: "Business",
      title:
        "China’s EV price war set to intensify next year as BYD squeezes suppliers - Financial Times",
      shortTitle: "EV Price War",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Chinese carmaker asks Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Chinese carmaker asks Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Chinese carmaker asks auto parts providers to cut their prices by 10%.",
      urlToImage:
        "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fe7195fe2-4eaf-4e85-a14f-bf49b2b02a97.jpg?source=next-barrier-page",
      publishedAt: "2024-11-02T10:11:14Z",
    },

    {
      isPopular: true,
      id: "8",
      category: "Health",
      title:
        "Exercising to lose weight? Science says it rarely works. - The Washington Post",
      shortTitle: "Exercise Myth",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A metabolism researcher Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A metabolism researcher Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A metabolism researcher dispels myths about how we burn calories and how this changes as we age.",
      urlToImage:
        "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/DFLLSVOX6CWNKM273OWJOWPO5M.JPG&w=1440",
      publishedAt: "2024-11-02T13:32:13Z",
    },
    {
      id: "3",
      category: "Sport",
      title:
        "Mack Brown deserved better, but that sadly may be the story of his Hall of Fame career - CBS Sports",
      shortTitle: "Brown's Fate",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Twice now Brown Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Twice now Brown Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Twice now Brown has been shoved out of places he built or resurrected.",
      urlToImage:
        "https://sportshub.cbsistatic.com/i/r/2024/11/26/0ef91427-211d-4e8a-b93c-2d64ac3014dd/thumbnail/1200x675/12aee265afa08d665bedf6dec190e636/sadmack.jpg",
      publishedAt: "2024-11-02T07:50:00Z",
    },
    {
      id: "9",
      category: "Health",
      title:
        "These Are the Healthiest Fast Food Restaurants, According to Dietitians - AOL",
      shortTitle: "Healthy Fast Food",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fast food gets Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fast food gets Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fast food gets a bad rap for being unhealthy, but there are healthy fast food options at chains like McDonald’s, Pizza Hut, and Sonic. Dietitians explain.",
      urlToImage:
        "https://s.yimg.com/ny/api/res/1.2/NcUtfFZSu687Zpv3YtDiGQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/aol_prevention_182/9e93f01d38d582fb813bc05110af6594",
      publishedAt: "2024-11-02T13:29:56Z",
    },
  ];
}
