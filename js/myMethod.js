window.onload = function () {
    //图片数组，存放着图片的地址
    imgArr = ["http://localhost:63342/carouseMap2/images/1.jpg",
        "http://localhost:63342/carouseMap2/images/2.jpg",
        "http://localhost:63342/carouseMap2//images/3.jpg",
        "http://localhost:63342/carouseMap2/images/4.jpg",
        "http://localhost:63342/carouseMap2/images/5.jpg",
        "http://localhost:63342/carouseMap2/images/b.png"];
    //图片切换的时间间隔
    var interval;

    //createMarquee(imgArr);
    createMarquee(imgArr,3000);

    //创建一个跑马灯方法
    function createMarquee(imgArr, ...myInterval) {//myInterval为可选参数，表示图片切换的时间间隔
        if (myInterval.length == 0) {
            interval = 1000;//如果没有设置时间间隔，那就默认赋值1000
        }else{
            interval = myInterval[0];
        }
        createImg(imgArr);
        createButton(imgArr);
    }
 /*   function createMarquee(imgArr,myInterval) {
        interval = myInterval;
        createImg(imgArr);
        createButton(imgArr);
    }*/


    var imgNum = imgArr.length;
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
            offset = -300*imgNum + 'px';
            index = imgNum-1;
        }
        //表示要展示第一张照片了
        else if (parseInt(offset) < -300*imgNum) {
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
        IntervalName = setInterval(function(){ next.click(); },interval);
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


    function createImg(imgArr) {
        //找到父节点
        var imgs=document.getElementById("imgs");

        //创建过渡img
        var img = document.createElement("img");
        img.src=imgArr[imgArr.length-1];
        imgs.appendChild(img);

        //开始创建真正需要用到的img
        for (var i=0; i<imgArr.length; i++){
            var img = document.createElement("img");
            img.src=imgArr[i];
            imgs.appendChild(img);
        }

        //创建过渡img
        var img = document.createElement("img");
        img.src=imgArr[0];
        imgs.appendChild(img);
    }

    function createButton(imgArr) {
        //找到添加的按钮的父节点
        var buttonFa=document.getElementById("buttons");

        //开始创建真正需要用到的img
        for (var i=0; i<imgArr.length; i++){
            var span = document.createElement("span");
            span.index=i;

            //如果是第0个节点，将class设为active
            if (i===0){
                span.style.backgroundColor='#000';
                span.classList.add("active");
                //span.className='active';//这种写法是错误的
            }
            buttonFa.appendChild(span);
        }
    }

}