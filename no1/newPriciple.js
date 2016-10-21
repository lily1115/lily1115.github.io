function Person( name ) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name;
};

var objFactory = function () {
    var Constructor = [].shift.call(arguments); // 取得外部传入的构造器
    var obj = new Object(); // 从Object.prototype上克隆一个空的对象
    obj.__proto__ = Constructor.prototype; // 指向正确的原型
    Constructor.apply( obj, arguments ); // 借用外部传入的构造器给obj设置属性
    return obj; // 返回对象
};
var a = objFactory(Person, 'shikokuyt');
console.log(a.getName());