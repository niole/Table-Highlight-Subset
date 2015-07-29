var assert = require('assert'),
  //  test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

describe('table component', function() {
  var driver;
  beforeEach(function(){
    driver = new webdriver.Builder()
          .withCapabilities(webdriver.Capabilities.chrome())
          .build();
  });

  afterEach(function(done) {
    driver.quit();
    done();
  });

  it('asserts that tere is data in the table', function(done) {
    console.log('inside ex');
    driver.get('104.131.191.81:4000');

    var element = driver.findElement({className: 'display'});
    var e2 = driver.findElement({className: 'filter-on-text'});

    var x = this.evaluate( 'count(//p)', this, null, XPathResult.ANY_TYPE, null );

//    var x = //p[@class='filter-on-text']/text();
    console.log(x);

    element.click();
//    element.sendKeys('Cheese!');
//    element.submit();
//
//    driver.getTitle().then(function(title) {
//      console.log('Page title is: ' + title);
//    });
//
//    driver.wait(function() {
//      return driver.getTitle().then(function(title) {
//        return title.toLowerCase().lastIndexOf('cheese!', 0) === 0;
//      });
//    }, 3000);
//
//    driver.getTitle().then(function(title) {
//      console.log('Page title is: ' + title);
//    });

    done();
  });

});
