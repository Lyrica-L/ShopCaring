/************************
 *name：首页-index的JS文件
 *date：2018/02/07
 *author：Lyrica
 *remarks：null
 */

/*
    第一版的index.js
 */

// header 搜索框
function topSearchFn(){
    var _topSearchId = gId('topSearchId');
    //console.log(_topSearchId);

    // 页面打开时给搜索框赋值。
    _topSearchId.setAttribute('value',topSearchVal);

    _topSearchId.onfocus = function(){
        this.setAttribute('value',"");
    };
    _topSearchId.onblur = function(){
        this.setAttribute('value',topSearchVal);
    };
}
// 产品导航 subNavId
function subNavMenuFn(){
    var _subNavId   = gId('subNavId');
    var _li         = _subNavId.children;
    var _len        = _li.length;
    //console.log(_li);
    for(var i=0;i<_len-6;i++){
        // 鼠标移入
        _li[i].onmouseover = function(){
            this.children[1].style.display = 'block';
        };
        // 鼠标移出
        _li[i].onmouseout = function(){
            this.children[1].style.display = 'none';
        }
    }
}
// 首页 轮播图
function sliderWrapFn(){
    // 左右按钮
    var _leftBtnId  = gId('leftBtnId');
    var _rightBtnId = gId('rightBtnId');
    var _ulId       = gId('ulId');
    var _ullen      = ulId.children.length;
    var _pointBtnId = gId('pointBtnId');
    var _pBtn       = _pointBtnId.children;
    var _inx        = 0;
    // 左按钮
    _leftBtnId.onclick = function(){
        if(_inx < _ullen-1){
            _inx++;
        }else{
            _inx = 0;
        }
        _ulId.style.left = -996*_inx + 'px';

    };
    // 右按钮
    _rightBtnId.onclick = function(){
        if(_inx > 0){
            _inx--;
        }else{
            _inx = _ullen-1;
        }
        _ulId.style.left =  -996*_inx + 'px';
    };
    // 小白点按钮
    for(var i=0; i<_pBtn.length; i++){
        _pBtn[i].onclick = function(){
            // 同步_inx的值，让小白点按钮与左右按钮保持一致。
            _inx = this.getAttribute('inx');
            _ulId.style.left =  -996*_inx+ 'px';
        }
    }
}