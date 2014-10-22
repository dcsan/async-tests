#!/usr/local/bin/node

var sleep = require('sleep');
var Fiber = require('fibers');
var Future = require('fibers/future')

console.log("start");

// setTimeout( function() {
//   console.log("2")
// }, 0)

// setTimeout( function() {
//   console.log("sleep")
//   sleep.sleep(2)
//   console.log("3")
// }, 0)

Fiber(function() {
  var fiber = Fiber.current;
  console.log("new fiber");

  setTimeout(function() {
    var inner = { title: "result" };
    fiber.run(inner);
  }, 1000)

  var doc = Fiber.yield();
  console.log("doc", doc);

}).run();


var tryUsingFutures = function () {
  var myFunc = function () {
    var f3 = new Future;

    setTimeout(function () {
      f3.return({whoami: 'f3'});
    }, 500);

    var result = f3.wait();
    console.log(result);
  };

  Fiber(myFunc).run();
};

tryUsingFutures()


// using separate Future npm package

var FutureLib = require('future')

var context = { "whoami": "annie" };
var err;
var whoami = "main";

console.log("create")
var f1 = FutureLib.create(context);
// future.setTimeout(100);

f1.whenever(function (error, data) {
  if (error) {
    throw err;
  }
  console.log("f1 inner", " data: ", data, this.whoami );
});

console.log("deliver")
f1.deliver(err, {whoami: "annie"});
f1.deliver(err, {whoami: "bob"});



console.log("end");
