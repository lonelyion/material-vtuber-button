const webdriver = require('selenium-webdriver');
const fs = require('fs');

const userName = process.env.BS_NAME;
const accessKey = process.env.BS_TOKEN;
const browserstackURL = 'https://' + userName + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub';
const commit_id = get_commit();

// Input capabilities
const capabilities = {
  project: 'fubuki-button',
  build: commit_id,
  os_version: '13',
  device: 'iPhone 11 Pro',
  real_mobile: 'true',
  browserName: 'iPhone',
  'browserstack.local': 'false'
};

console.log('Testing for Commit', commit_id);

function get_driver() {
  if (!process.env.LOCAL)
    return new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build();
  else return new webdriver.Builder().forBrowser('chrome').build();
}

module.exports = get_driver;

function get_commit() {
  if (process.env.GITHUB_ACTION) {
    return process.env.GITHUB_SHA.trim().slice(0, 7);
  } else {
    const rev = fs.readFileSync(process.env.GITHUB_WORKSPACE + '/.git/refs/heads/master').toString();
    return rev.trim().slice(0, 7);
  }
}
