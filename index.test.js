const { Builder, By, until } = require('selenium-webdriver');

describe("Testing by Selenium framework", () => {

  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  })

  test("testing the google page", async() => {
    await driver.get('https://www.google.com/');
    let title = driver.getTitle();
    let googlePic = driver.findElement(By.css("img.lnXdpd"));
    let searchInput = driver.findElement(By.name('q'));
    let searchBtn = driver.findElement(By.css("input[type=submit]"));
    let gmailLink = driver.findElement(By.xpath("/html/body/div[1]/div[1]/div/div/div/div[1]/div/div[1]/a"));

    await Promise.all([title,googlePic,searchInput,searchBtn,gmailLink]).then(val => {
      title = val[0];
      googlePic = val[1];
      searchInput = val[2]
      searchBtn = val[3];
      gmailLink = val[4];
    });

    expect(title).toBe("Google");
    expect(googlePic).toBeDefined();
    expect(searchInput).toBeDefined();
    expect(searchBtn).toBeDefined();
    expect(gmailLink).toBeDefined();
  },10000);

  test("testing the wikipedia page", async () => {

    await driver.get('https://uk.wikipedia.org/');

    let searchInput = await driver.findElement(By.id("searchInput")).sendKeys("Київ");
    expect(searchInput).toBeDefined();
    await driver.findElement(By.id("searchButton")).click();

    await driver.wait(
      until.urlIs("https://uk.wikipedia.org/wiki/%D0%9A%D0%B8%D1%97%D0%B2"),
      7000
    );

    let emblem = await driver.findElement(By.css('img[alt="COA of Kyiv Kurovskyi.svg"]'));
    let population = await driver.findElement(By.css('a[title="Населення"]'));
    let temperature = await driver.findElement(By.xpath('//*[@id="collapsibleTable0"]/tbody/tr[5]/th[1]'));
    let tempInApril = await driver.findElement(By.xpath('//*[@id="collapsibleTable0"]/tbody/tr[2]/th[5]'))
    let coronavirus = await driver.findElement(By.id("Епідемія_коронавірусу"));
    let populationDensity = await driver.findElement(By.linkText("Густота населення"));
    const architectureMonuments = await driver.findElement(By.xpath("/html/body/div[3]/div[3]/div[5]/div[1]/ul[11]"));
    const countMonuments = await architectureMonuments.findElements(By.css("li"));

    expect(emblem).toBeDefined();
    expect(population).toBeDefined();
    expect(temperature).toBeDefined();
    expect(tempInApril).toBeDefined();
    expect(coronavirus).toBeDefined();
    expect(populationDensity).toBeDefined();
    expect(countMonuments).toBeGreaterThan(20)
  }, 10000)

  afterAll(async () => {
    await driver.quit();
  })

})

