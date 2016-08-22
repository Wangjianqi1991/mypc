/**
 * Created by Administrator on 2016/6/24.
 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;

    function listToArray(arg) {
        if (flag) {
            return Array.prototype.slice.call(arg);
        }
        var ary = [];
        for (var i = 0; i < arg.length; i++) {
            ary.push(arg[i]);
        }
        return ary;
    }

    function rnd(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var tmp = n;
            n = m;
            m = n;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    function jsonParse(jstr) {
        return 'JSON' in window ? JSON.parse(jstr) : eval('(' + jstr + ')');
    }

    function win(attr, value) {
        if (typeof value === 'undefined') {//获取
            return document.documentElement[attr] || document.body[attr];
        }//设置
        document.documentElement[attr] = document.body[attr] = value;
    }

    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t}
    }

    function getByClass(strClass,curEle) {
        curEle = curEle || document;
        if (flag) {
            return this.listToArray(curEle.getElementsByClassName(strClass));
        }
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        var nodeList = curEle.getElementsByTagName('*');
        var bOk = true;
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                    break
                }
            }
            if (bOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary;
    }

    function hasClass(curEle, cName) {
        cName = cName.replace(/(^ +)|( +$)/g, '');
        var reg = new RegExp('\\b' + cName + '\\b');
        return reg.test(curEle.className);
    }

    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass
            }
        }
    }

    function removeClass( curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var reg = new RegExp('(^| )' + aryClass[i] + '( +|$)');
            //var reg=new RegExp('\\b'+aryClass[i]+'\\b');
            if (reg.test(curEle.className)) {
                curEle.className = curEle.className.replace(reg, '').replace(/\s+/g, ' ').replace(/(^ +)|( +$)/g, '');

            }
        }
    }

    function getCss(curEle, attr) {
        var val, reg;
        if ('getComputedStyle' in window) {
            if (attr === 'float') {
                return getComputedStyle(curEle, null).cssFloat || curEle.currentStyle.styleFloat;
            }
            val = getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity[:=](\d+)\)$/g;
                return reg.test(val) ? RegExp.$1 / 100 : 1;
            }
            val = curEle.currentStyle[attr]
        }
        reg = /^([+-])?\d+(\.\d+)?(px|pt|rem|em)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle.style.styleFloat = value;
            curEle.style.cssFloat = value;
            return;
        }
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        var reg = /(width|height|top|right|bottom|left|((margin|padding)(right|bottom|left|top)?))/;
        if (reg.test(attr)) {
            value = parseFloat(value) + 'px';
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, options) {
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr]);
        }
    }

    function css(curEle) {
        var arg2 = arguments[1];
        if (typeof arg2 === 'string') {
            var arg3 = arguments[2];
            if (typeof arg3 === 'undefined') {
                return this.getCss(curEle, arg2);
            } else {
                this.setCss(curEle, arg2, arg3);
            }
        }
        //if(arg2 instanceof Object)
        if (arg2.toString() === '[object Object]') {
            this.setGroupCss(curEle, arg2);
        }
    }

    function getChildren(curEle) {
        if (flag) {
            return this.listToArray(curEle.children);
        }
        var ary = [];
        var nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeType === 1) {
                ary.push(nodeList[i]);
            }
        }
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    function nextAll(curEle) {
        var nex = this.next(curEle);
        var ary = [];
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        if (pre) ary.push(pre);
        if (nex) ary.push(nex);
        return ary;

    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    function firstChild(curEle) {
        return this.getChildren(curEle)[0];
    }

    function listChild(curEle) {
        var aChs = this.getChildren(curEle);
        return aChs[aChs.length - 1]
    }

    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    function prependChild(parent, newEle) {
        /*  var aChs=this.getChildren(parent);
         if(aChs.length){
         var first=this.firstChild(parent);
         parent.insertBefore(newEle,first)
         }
         this.appendChild(parent,newEle);*/
        var first = this.firstChild(parent);
        if (first) {
            parent.insertBefore(newEle, first)
        } else {
            parent.appendChild(newEle);
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    function insertAfter(newEle, oldEle) {
        //获取指定原素的弟弟元素
        var nex = this.next(oldEle);
        if (nex) {
            //如果有指定元素的弟弟元素存在就把新元素插入弟弟元素的前边
            oldEle.parentNode.insertBefore(newEle, nex);
        } else {
            oldEle.parentNode.appendChild(newEle);
        }
    }
    function  bind(curEle,eventType,eventFn){
        if('addEventListener' in document){
            curEle.addEventListener(eventType,eventFn,false);
            return;
        }
        var tmpFn=function(){
            eventFn.call(curEle);
        };
        tmpFn.name=eventFn;
        if(!curEle['myBind'+eventType]){
            curEle['myBind'+eventType]=[];
        }
        var ary=curEle['myBind'+eventType];
        for(var i=0; i<ary.length; i++){
            var cur=ary[i];
            if(cur.name===eventFn){
                return;
            }
        }
        ary.push(tmpFn);
        curEle.attachEvent('on'+eventType,tmpFn);
    }
    function on(curEle,eventType,eventFn){
        if(!curEle['myEvent'+eventType]){
            curEle['myEvent'+eventType]=[];
        }
        var ary=curEle['myEvent'+eventType];
        for(var i=0; i<ary.length; i++){
            var cur=ary[i];
            if(cur===eventFn){
                return;
            }
        }
        ary.push(eventFn);
        bind(curEle,eventType,run);
    }
    function off(curEle,eventType,eventFn){
        var ary=curEle['myEvent'+eventType];
        for(var i=0; i<ary.length; i++){
            var cur=ary[i];
            if(cur===eventFn){
                ary.splice(i,1);
                break;
            }
        }
    }
    function run(e){
        e=e||window.event;
        if(!e.target){
            e.target= e.srcElement;
            e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
            e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
            e.preventDefault=function(){
                e.returnValue=false;
            };
            e.stopPropagation=function(){
                e.cancelBubble=true;
            }
        }
        var ary=this['myEvent'+ e.type];
        for(var i=0; i<ary.length; i++){
            var cur=ary[i];
            cur.call(this,e);
        }
    }
    return {
        /**
         * 类数组转数组
         * @param arg（传进来类数组）
         * @returns {Array}
         */
        listToArray: listToArray,
        /**
         * 求任意范围内的随机数
         * @param n
         * @param m
         * @returns {number}
         */
        rnd: rnd,
        /**
         * JSON格式的字符串转化为JSON格式的对象
         * @param jstr（传进来的JSON格式的字符串）
         * @returns {Object}（对象）
         */
        jsonParse: jsonParse,
        /**
         * 处理（获取 设置）浏览器盒子模型的兼容性
         * @param attr
         * @param value
         * @returns {*}
         */
        win: win,
        /**
         *当前元素距离body的距离
         * @param curEle
         * @returns {{left: (Number|number), top: (Number|number)}}
         */
        offset: offset,
        /**
         * 限定范围的通过className获取元素
         * @param curEle 当前元素
         * @param strClass className名
         * @returns {*}
         */
        getByClass: getByClass,
        /**
         * 判断某个元素身上是否有某个className
         * @param curEle 元素
         * @param cName 要检测的className（字符串格式）
         * @returns {boolean}
         */
        hasClass: hasClass,
        /**
         * 给某个元素添加没有的 className
         * @param curEle 要添加的元素
         * @param strClass 添加的className（字符串格式）
         */
        addClass: addClass,
        /**
         * 删除任意一个元素中 指定的className
         * @param curEle
         * @param strClass
         */
        removeClass: removeClass,
        /**
         * 获取元素的非行间样式
         * @param curEle
         * @param attr
         * @returns {*}
         */
        getCss: getCss,
        /**
         * 给某个元素的某种样式设置某个值
         * @param curEle 哪个元素
         * @param attr 哪种样式
         * @param value 什么值
         */
        setCss: setCss,
        /**
         * 給一个元素身上添加一组样式
         * @param curEle 元素
         * @param options 一组样式
         */
        setGroupCss: setGroupCss,
        /**
         * 取值赋值合体函数 getCss setCss setGroupCss 三合一
         * @param curEle 元素
         * @returns {*} 设置的时候没有返回值  获取的时候有返回值
         */
        css: css,
        /**
         * 获取当前元素的所有子元素节点
         * @param curEle 当前元素
         * @returns {*} 返回值 所有元素节点
         */
        getChildren: getChildren,
        /**
         * 获取当前元素的上一个哥哥元素节点
         * @param curEle 当前元素
         * @returns {*} 返回哥哥元素节点
         */
        prev: prev,
        /**
         * 获取当前元素的所有哥哥元素节点
         * @param curEle 当前元素
         * @returns {Array} 返回值 所有哥哥元素节点
         */
        prevAll: prevAll,
        /**
         * 获取当前元素下一个弟弟元素节点
         * @param curEle 当前元素
         * @returns {*} 返回值 返回下一个弟弟元素节点
         */
        next: next,
        /**
         * 获取当前元素的所有弟弟元素节点
         * @param curEle 当前元素
         * @returns {Array} 返回值 返回一组弟弟元素节点
         */
        nextAll: nextAll,
        /**
         * 获取当前元素相邻的元素节点
         * @param curEle
         * @returns {Array}
         */
        sibling: sibling,
        /**
         * 获取当前元素所有的相邻兄弟元素节点
         * @param curEle
         * @returns {Array.<T>}
         */
        siblings: siblings,
        /**
         * 获取当前元素下的第一个子元素
         * @param curEle 当前元素
         * @returns {*} 返回 第一个子元素
         */
        firstChild: firstChild,
        /**
         * 获取当前元素下的最后一个子元素
         * @param curEle
         * @returns {*}
         */
        listChild: listChild,
        /**
         * 获取当前元素的索引
         * @param curEle
         * @returns {Number}
         */
        index: index,
        /**
         * 把当新元素插入到当前元素的最前边
         * @param parent
         * @param newEle
         */
        prependChild: prependChild,
        /**
         * 把新元素插入到指定元素的前边
         * @param newEle
         * @param oldEle
         */
        insertBefore: insertBefore,
        /**
         * 把新元素插入到指定元素的弟弟元素的前面
         * @param newEle
         * @param oldEle
         */
        insertAfter: insertAfter,
        /**
         * on 解决了DOM2级事件的兼容问题
         * @param curEle
         * @param eventType
         * @param eventFn
         */
        on:on,
        /**
         * off 解除DOM2级事件的兼容问题
         * @param curEle
         * @param eventType
         * @param eventFn
         */
        off:off
    }
})();
