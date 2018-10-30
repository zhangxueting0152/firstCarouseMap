window.onload = function () {
    var container = document.getElementById("container");
    var imgs = document.getElementById("imgs");
    //offset表示图片在切换时，需要相对于container偏移的位置
    var offset = imgs.style.left;
    var buttons = document.getElementsByTagName("span");
    //上一张按钮
    var pre = document.getElementById("pre");
    //下一张按钮
    var next = document.getElementById("next");
    //index表示按钮的索引
    var index = 0;
    var IntervalName;

//页面加载时，就需要开始轮播
    play();
    pre.onclick = function () {
        change(300);
    }
    next.onclick = function () {
        change(-300);
    }

    //当切换到图片时，使得对应的圆圈按钮背景色变黑，并且使它的class名称设为空
    function showButton() {
        for (var i = 0; i<buttons.length; i++){
            //class为active时，表示显示的是当前图片
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
    //shift表示图片需要还移动的距离
    function change(shift) {
        offset = parseInt(offset) + shift + 'px';
        //表示要展示第五张照片了
        if (parseInt(offset) > -300) {
            offset = -1500 + 'px';
            index = 4;
        }
        //表示要展示第一张照片了
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
        //IntervalName = setInterval("next.click()",1000);//这种写法也可以
        IntervalName = setInterval(function(){ next.click(); },1000);
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
    //鼠标移动到container容器上时，需要停止自动轮播功能
    container.onmouseover = pause;
    //鼠标离开container容器时，需要开启自动轮播功能
    container.onmouseout = play;

}