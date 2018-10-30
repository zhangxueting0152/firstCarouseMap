window.onload = function () {
    var container = document.getElementById("container");
    var imgs = document.getElementById("imgs");
    var offset = imgs.style.left;
    var buttons = document.getElementsByTagName("span");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");

    var index = 0;
    var IntervalName;

    play();
    pre.onclick = function () {
        change(300);
    }
    next.onclick = function () {
        change(-300);
    }

    //当切换到图片时，使得对应的圆圈按钮背景色变黑
    function showButton() {
        for (var i = 0; i<buttons.length; i++){
            if (buttons[i].className === 'active'){
                buttons[i].style.backgroundColor = '#fff';
                buttons[i].className = '';
                break;
            }
        }
        buttons[index].className = 'active';
        buttons[index].style.backgroundColor = '#000';
    }
    //change方法包装了点击上一张或者下一张按钮时，发生的事件
    function change(shift) {
        offset = parseInt(offset) + shift + 'px';
        if (parseInt(offset) > -300) {
            offset = -1500 + 'px';
            index = 4;
        }
        else if (parseInt(offset) < -1500) {
            offset = -300 + 'px';
            index = 0;
        }
        else if (shift<0) {//点击下一张按钮
            index += 1;
        }
        else{//点击上一张按钮
            index -= 1;
        }
        imgs.style.left = offset;
        showButton();
    }

    //停止自动播放
    function pause() {
        clearInterval(IntervalName);//clearInterval的参数需要传入停止的计时器的名字
    }
    //开始自动播放
    function play() {
        IntervalName = setInterval("next.click()",1000);
    }

    //点击圆圈按钮时，显示对应的图片
    for (var i=0; i<buttons.length; i++){
        buttons[i].onclick = function() {
            if (this.className === 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var shift = -300 * (myIndex - index);
            change(shift);
            index = myIndex;
            showButton();
        }
    }

    container.onmouseover = pause;
    container.onmouseout = play;

}