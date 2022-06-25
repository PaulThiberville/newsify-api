const puppeteer = require("puppeteer");

exports.lesEchos = async (req, res) => {
  const split = "%20";
  const params = req.params.query.split("&").join(split);
  const url = `https://www.lesechos.fr/recherche?q=${params}`;
  let articles = [];

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 });
  await page.goto(url);
  await page.waitForSelector(".sc-iphbbg-2");

  articles = await page.evaluate(() => {
    let links = document.body.querySelectorAll(".sc-iphbbg-2");
    let articles = Object.values(links)
      .slice(0, 8)
      .map((x) => {
        return {
          url: `https://www.lesechos.fr${x
            .querySelector("a")
            ?.getAttribute("href")}`,
          title: x.querySelector("h3.sc-14kwckt-6")?.textContent ?? null,
          description: x.querySelector(".sc-a3uhlr-0")?.textContent ?? null,
          photoUrl:
            x.querySelector(".sc-14kwckt-20")?.getAttribute("src") ??
            "https://picsum.photos/200/300",
        };
      });
    return articles;
  });

  await browser.close();

  res.json(articles);
};

exports.lHumanite = async (req, res) => {
  const split = "%20";
  const params = req.params.query.split("&").join(split);
  const url = `https://www.humanite.fr/search/${params}?f%5B0%5D=type%3Aarticle`;
  let articles = [];

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 });
  await page.goto(url);
  await page.waitForSelector(".view-mode-search_result");

  articles = await page.evaluate(() => {
    let links = document.body.querySelectorAll(".view-mode-search_result");
    let articles = Object.values(links)
      .slice(0, 8)
      .map((x) => {
        return {
          url: `https://www.humanite.fr${x
            .querySelector("a")
            ?.getAttribute("href")}`,
          title: x.querySelector(".field-name-title a")?.textContent ?? null,
          description: x.querySelector("p")?.textContent ?? null,
          photoUrl:
            x.querySelector("img")?.getAttribute("src") ??
            "https://picsum.photos/200/300",
        };
      });
    return articles;
  });

  await browser.close();

  res.json(articles);
};

exports.liberation = async (req, res) => {
  const split = "%20";
  const params = req.params.query.split("&").join(split);
  const url = `https://www.liberation.fr/recherche/?query=${params}`;
  let articles = [];

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 8000 });
  await page.goto(url);
  await page.waitForSelector(".queryly_item_row");

  articles = await page.evaluate(() => {
    let links = document.body.querySelectorAll(".queryly_item_row");
    let articles = Object.values(links)
      .slice(0, 8)
      .map((x) => {
        return {
          url: `https://www.liberation.fr${x
            .querySelector("a")
            ?.getAttribute("href")}`,
          title: x.querySelector(".queryly_item_title")?.textContent ?? null,
          description:
            x.querySelector(".queryly_item_description")?.textContent ?? null,
          photoUrl:
            "https://www.liberation.fr" +
              x
                .querySelector(".queryly_advanced_item_imagecontainer")
                ?.style.backgroundImage.slice(4, -68)
                .replace(/"/g, "") ?? "https://picsum.photos/200/300",
        };
      });
    return articles;
  });

  await browser.close();

  res.json(articles);
};
