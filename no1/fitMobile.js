(function () {
    var doc = document.documentElement;
    var deviceWidth = doc.clientWidth;
    deviceWidth = deviceWidth > 640?640:deviceWidth;
    doc.style.fontSize = deviceWidth / 6.4 + 'px';
})();