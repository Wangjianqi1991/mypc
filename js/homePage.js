var oHeader=document.getElementById('header');

//导航电话图片
(function(){
    var telephone=utils.getByClass('telephone')[0];
    var xPhone=utils.getByClass('xPhone')[0];
    utils.on(telephone,'mouseover',function(){
        utils.css(xPhone,'display','block')
    });
    utils.on(telephone,'mouseout',function(){
        utils.css(xPhone,'display','none')
    });
})();

//导航选中
(function(){
    var oUl=oHeader.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    for(var i=0;i<aLi.length;i++){
        var cur=aLi[i];
        cur.onclick=function(){
            this.className='colour';
            var siblings=utils.siblings(this);
            for (var i=0;i<siblings.length;i++){
                siblings[i].className=''
            }
        }
    }
})();

//图片轮播
var  aryL=[
    {"imgSrc":"img1/banner1.jpg","desc":"这是测试图片"},
    {"imgSrc":"img1/banner2.jpg","desc":"这是测试图片"},
    {"imgSrc":"img1/banner3.jpg","desc":"这是测试图片"},
    {"imgSrc":"img1/banner4.jpg","desc":"这是测试图片"}
];
(function figure(){
    var fig=document.getElementById('figure');
    var fade=fig.getElementsByTagName('div')[0];
    var aBin=fade.getElementsByTagName('div');
    var oP=fig.getElementsByTagName('P')[0];
    var aA=oP.getElementsByTagName('a');
    var interval=4000;
    var autoTimer=null;
    var step=0;
    bind();
    function bind(){
        var str1='';
        var str2='';
        for (var i=0;i<aryL.length;i++){
            str1+='<div style=" background-image: url('+aryL[i].imgSrc+')"></div>';
            str2+=i===0?'<a href="javascript:;" alt="" class="bg"></a>':'<a href="javascript:;" alt=""></a>'
        }
        fade.innerHTML=str1;
        oP.innerHTML=str2;
    }
    moveTool(aBin[0],{opacity:1},500);
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if (step>=aBin.length-1){
            step=-1;
        }
        step++;
        setBanner();
    }
    function setBanner(){
        for (var i=0;i<aBin.length;i++){
            if(i===step){
                utils.css(aBin[i],'zIndex',1);
                moveTool(aBin[i],{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0;i<siblings.length;i++){
                        utils.css(siblings[i],'opacity',0)
                    }
                });
                continue;
            }
            utils.css(aBin[i],'zIndex',0);
        }
        bannerTip();
    }
    function bannerTip(){
        for(var i=0;i<aA.length;i++){
            aA[i].className=i===step?'bg':'';
        }
    }
    moveOut();
    function moveOut(){
        fig.onmouseover=function(){
            clearInterval(autoTimer);
        };
        fig.onmouseout=function(){
            autoTimer=setInterval(autoMove,interval);
        };
    }
    handChange();
    function handChange(){
        for(var i=0;i<aA.length;i++){
            aA[i].index=i;
            aA[i].onclick=function(){
                step=this.index;
                setBanner();
            }
        }
    }
})();

//选项卡的方法
(function(){
    function banner(idName,className,bg,show){
        var oBox=document.getElementById(idName);
        var oUl=oBox.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName('li');
        var aDiv=utils.getByClass(className,oBox);
        for(var i=0;i<aLi.length;i++){
            (function (index){
                aLi[index].onclick=function(e){
                    e=e||window.event;
                    e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
                    for(var j=0; j<aLi.length; j++){
                        aLi[j].className='';
                        utils.removeClass(aDiv[j],show)
                    }
                    aLi[index].className=bg;
                    utils.addClass(aDiv[index],show)
                }
            })(i)
        }
    }
   window.banner=banner;
})();
//图片轮播中的选项卡
banner("optionIn",'one','bg',"show");
//优惠车型选项卡
banner("setTime","autoM","bgOne","boxShow");


banner("cityD","cityHz","liBg","cityShow");
banner("cityD1","cityHz","liBg","cityShow");

//移入切换方法
(function(){
    function changee(idName,bg,width){
        var oBox=document.getElementById(idName);
        var oBoxInner=oBox.getElementsByTagName('div')[0];
        var oUl=oBox.getElementsByTagName('ol')[0];
        var aLi=oUl.getElementsByTagName('li');
        var step=0;
        var interval=1000;
        function  bannerTip(){
            for(var i=0;i<aLi.length;i++){
                i===step%aLi.length?aLi[i].className=bg:aLi[i].className=''
            }
        }
        handChange();
        function handChange(){
            for(var i=0;i<aLi.length;i++){
                aLi[i].index=i;
                aLi[i].onmouseover=function(){
                    step=this.index;
                    moveTool(oBoxInner,{left:-step*width},interval/2);
                    bannerTip();
                }
            }
        }
    }
    window.changee=changee;
})();
//优惠车型移入切换
changee('showOne','bgShow',780);
//顺风车的移入切换
changee("fShowL",'bgShow',385);

//回到顶部
(function(){
    var oBtn=document.getElementById("toTOP");
    oBtn.onclick=function() {
        var total = utils.win('scrollTop');
        var tTime = 1000;
        var freq = 30;
        var step = total / tTime * freq;
        timer = setInterval(function () {
            var curEt = utils.win('scrollTop');
            if (curEt <= 0) {
                clearInterval(timer);
                return
            }
            curEt -= step;
            total = utils.win('scrollTop', curEt);
        }, freq)
    }
})();

(function(){
    function bindEvent1(){
        var get=document.getElementById('get');
        var city=document.getElementById('city');
        var cityD=document.getElementById('cityD');
        var cityZm=document.getElementById('cityZm');
        var cityTs=document.getElementById('cityTs');
        var short=utils.getByClass('short');
        var that=this;
        city.onfocus=function(){
            if (cityTs.style.display=='block'){

            }else{
                cityD.style.display='block';
                city.style.borderColor="#fabe00";
                city.style.borderBottom='1px solid transparent'
            }
        };
        city.onkeyup=function(){
            cityD.style.display="none";
            cityTs.style.display="block"
        };
        get.onclick=function(e){
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarTag = tar.tagName.toUpperCase(),
                tarInn = tar.innerHTML;
            if (tarTag==='LI' && tar.parentNode.className==='cityNr'){
                city.value=tarInn;
                cityD.style.display='none';
                city.style.borderColor="#e9ebee";
            }
            if (tarTag=='P'&&tar.parentNode.parentNode.className=='hqNr'){
                tar=tar.parentNode;
                var p= utils.getChildren(tar)[0];
                city.value= p.innerHTML;
            }
            if (tarTag=='I'&&tar.parentNode.parentNode.className=='hqNr'){
                tar=tar.parentNode;
                p= utils.getChildren(tar)[0];
                city.value= p.innerHTML;
            }
            if (tarTag=='LI' && tar.parentNode.parentNode.id=='cityTs'){
                p= utils.getChildren(tar)[0];
                city.value= p.innerHTML;
            }
            cityD.style.display='none';
            cityTs.style.display="none";
            city.style.borderColor="#e9ebee";
        };
        city.onclick=function(e){
            e=e||window.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        };
        short[0].onclick=function(){
            cityD.style.display='none';
            cityTs.style.display="none";
            city.style.borderColor="#e9ebee";
        }
    }
    bindEvent1();
   /* function bindEvent(){

        var get=document.getElementById('also');
        if (get==='also'){

        }
        var get=document.getElementById('also');
        var city=document.getElementById('city1');
        var cityD=document.getElementById('cityD1');
        var cityTs=document.getElementById('cityTs1');
        var short=utils.getByClass('short');
        var that=this;
        city.onfocus=function(){
            if (cityTs.style.display=='block'){

            }else{
                cityD.style.display='block';
                city.style.borderColor="#fabe00";
                city.style.borderBottom='1px solid transparent'
            }
        };
        city.onkeyup=function(){
            cityD.style.display="none";
            cityTs.style.display="block"
        };
        get.onclick=function(e){
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarTag = tar.tagName.toUpperCase(),
                tarInn = tar.innerHTML;
            if (tarTag==='LI' && tar.parentNode.className==='cityNr'){
                city.value=tarInn;
                cityD.style.display='none';
                city.style.borderColor="#e9ebee";
            }
            if (tarTag=='P'&&tar.parentNode.parentNode.className=='hqNr'){
                tar=tar.parentNode;
                var p= utils.getChildren(tar)[0];
                city.value= p.innerHTML;
            }
            if (tarTag=='I'&&tar.parentNode.parentNode.className=='hqNr'){
                tar=tar.parentNode;
                p= utils.getChildren(tar)[0];
                city.value= p.innerHTML;
            }
            if (tarTag=='LI' && tar.parentNode.parentNode.className=='cityTs'){
                p= utils.getChildren(tar)[0];
                city.value= p.innerHTML;
            }
            cityD.style.display='none';
            cityTs.style.display="none";
            city.style.borderColor="#e9ebee";
        };
        city.onclick=function(e){
            e=e||window.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        };
        short[0].onclick=function(){
            cityD.style.display='none';
            cityTs.style.display="none";
            city.style.borderColor="#e9ebee";
        }
    }
    bindEvent();*/
})();

