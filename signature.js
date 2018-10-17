function signature (options) {

    var default_options = {
        strokeColor: options.strokeColor || '#000000',
        strokeWidth: options.strokeColor || 5,
        width: options.strokeColor || 500,
        height: options.strokeColor || 250,
        clearBtnSelector: options.strokeColor || ".js-clear-sketch",
        saveBtnSelector: options.strokeColor || ".js-save-sketch",
        containerId: options.strokeColor || "container",
        url: options.url
    }
    
    var sketch = Sketch.create({
        container: document.getElementById(default_options.containerId),
        autoclear: false,
        retina: 'auto',
        width: default_options.width,
        height: default_options.height,
        fullscreen: false,
        setup() {
            this.fillStyle = default_options.strokeWidth
            this.strokeStyle = default_options.strokeWidth
            this.liheWidth = default_options.strokeWidth
        },
        touchmove: function() {
            if (this.dragging) {
                var touch = this.touches[0];
                this.beginPath();
                this.moveTo(touch.ox, touch.oy);
                this.lineTo(touch.x, touch.y);
                this.stroke();
            }
        }
    })
    
    document.querySelector(default_options.clearBtnSelector).addEventListener("click", function(){
        sketch.clear()
    });
    
    document.querySelector(default_options.saveBtnSelector).addEventListener("click", function () {
        var selector = '#' + default_options.containerId + ' canvas'
        var canvas = document.querySelector(selector)
        var base64 = canvas.toDataURL()
    
        var httpPost = new XMLHttpRequest()
        var path = default_options.url
        var data = JSON.stringify({ image: base64 })
    
        httpPost.onreadystatechange = function (err) {
            if (httpPost.readyState == 4 && httpPost.status == 200) {
                console.log(httpPost.responseText);
            } else {
                console.log(err);
            }
        };
    
        httpPost.open("POST", path, true);
        httpPost.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        httpPost.send(data);
    });

}
