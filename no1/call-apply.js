(function (window, undefined) {
    // 选择器函数,较低浏览器不支持
    var $ = function (selector) {
        return document.querySelector(selector);
    };
    var data = [], // 存放数据，充当栈和队列
        message = '';
    /**
     * 这里不进行对输入进行判断
     */
    function getInputValue() {
        return $('#entry').value;
    }
    
    /**
     * deal函数
     */
    function deal(func, obj) {
        var args = [].slice.call(arguments, 2);
        
        return function (e) {
            if (obj != null) {
                message = func.call(data);
                obj(message);
            } else {
                var arg = args.map(function (item) {
                    return typeof item === 'function'?item():item;
                });
                func.call(data, arg);
            }
            render();
        };
    }
    
    /**
     * render渲染函数
     */
    function render() {
        var inner = data.map(function (d) {
            return '<div>'+d+'</div>';
        }).join('');
        $('#result').innerHTML = inner;
    }
    window.onload = function () {
        $('#left-in').onclick = deal([].unshift, null, getInputValue);
        $('#right-in').onclick = deal([].push, null, getInputValue);
        $('#left-out').onclick = deal([].shift, window.alert);
        $('#right-out').onclick = deal([].pop, window.alert);
    };
}(window));