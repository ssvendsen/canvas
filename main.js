

var randomData = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 200))


var initiatePlot = function (div) {

    var canvas = div.querySelector(".canvas");
    var metrix = div.querySelector(".metrix");
    var context = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        canvas.width = div.clientWidth;
        canvas.height = div.clientHeight - metrix.offsetHeight;
    }
    resizeCanvas();

    var count = 0
    var start = performance.now()

    var updateCanvas = function () {
        var height = canvas.height
        var width = canvas.width
        var offset = Math.floor(Math.random() * 1000)

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.moveTo(0, Math.random() * height);
        for (var x = 0; x < width; x++) {
            //context.lineTo(x, Math.random() * height)
            context.lineTo(x, randomData[x + offset])
        }
        context.stroke();

        count++
        requestAnimationFrame(updateCanvas)
    }
    updateCanvas()

    var updateMetrix = function () {
        var now = performance.now()
        var periodMs = now - start
        var fps = count / periodMs * 1000
        metrix.innerText = canvas.width + " " + canvas.height + " " + fps.toPrecision(2)
        count = 0
        start = now
    }
    setInterval(updateMetrix, 1000)
}

initiatePlot(document.getElementById('widget1'))
initiatePlot(document.getElementById('widget2'))
initiatePlot(document.getElementById('widget3'))
initiatePlot(document.getElementById('widget4'))
initiatePlot(document.getElementById('widget5'))
