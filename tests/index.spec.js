const driver = require('./setup_driver')();
const { describe, it, after } = require('mocha');
const { By } = require('selenium-webdriver');
const expect = require('chai').expect;

describe('Index', function () {
  this.timeout(300000);
  it('should render properly', async function () {
    await driver.get('https://fubuki.moe/');

    //App Bar title
    const title = await driver.findElement(By.css('.v-toolbar__title')).getText();
    expect(title).to.include('(^・ω・^§)ﾉ');

    //Switch to Japanese
    await driver.findElement(By.css('.white--text:nth-child(9) svg')).click();
    await driver.findElement(By.id('lang-switch-ja')).click();
    const moe_text = await driver.findElement(By.css('.v-card:nth-child(2) > .v-card__title')).getText();
    expect(moe_text).to.equal('萌え');

    //First Card
    const live_title = await driver.findElement(By.css('.v-card:nth-child(1) > .v-card__title')).getText();
    expect(live_title).to.equal('ライブ ストリーム');

    //F-001 Voice Clip Label: kon~nya~nya~kon~
    const label = await driver
      .findElement(By.xpath("//div[@id='app']/div/main/div/div/div/div[3]/div[3]/div[2]/button/span/div"))
      .getText();
    expect(label).to.equal('こ～んにゃにゃこ～ん~');
  });
  after(() => {
    driver.quit();
  });
});
