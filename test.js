var singleton = (function() {
  //私有变量和私有函数
  var privateVariable = 10;
  function privateFunction() {
    return false;
  }
  //特权/公有方法和属性
  return {
    publicProperty: true,
    publicMethod: function() {
      privateVariable++;
      return privateFunction();
    }
  };
})();
