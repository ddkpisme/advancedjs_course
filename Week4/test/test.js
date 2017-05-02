/*

Title: Lint test file
Author: Dylan Patterson

*/

//Defining Tests
var expect = require("chai").expect;
var book = require("../list.js");



describe("Book module", () => {
 it("get returns requested book", function() {
   var result = book.get("dune");
   expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });
 
 it("get fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
});

describe("Book module", () => {
 it("get returns requested book", function() {
   var result = book.del("dune");
   expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });
 
 it("get fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
});

describe("Book module", () => {
 it("get returns requested book", function() {
   var result = book.ad("dune");
   expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });
 
 it("get fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
});