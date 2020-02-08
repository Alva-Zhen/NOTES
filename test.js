var x = "window";
var obj = {
  x: "obj"
};
function test(y) {
  console.log(this.x + y);
}
test.apply(obj, [1]);
