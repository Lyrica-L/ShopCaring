/**
 *name：首页-index的JS文件
 *date：2018/02/08
 *author：Lyrica
 *remarks：改用jQ来实现
 */

// 首页header 搜索框
function topSearchFn() {
    $('#topSearchId')
        .attr('value', topSearchVal)
        .on({
            focus: function () {
                $(this).attr('value', '');
            },
            blur: function () {
                $(this).attr('value', topSearchVal);
            }
        });
}
// 生成左侧导航子菜单
function createSubNavMenuFn() {
    var _subNavId = $('#subNavId');
    var _data     = DATA_temp.subNavData;
    var _dataLen  = _data.length;

    //console.log( _dataLen );
    for (var i = 0; i < _dataLen; i++) {
        $('<li/>')
            .html(function () {
                var _this = $(this);
                $('<p/>').html(_data[i].name).appendTo(_this);
                $('<div/>', {
                    'class': 'popUpDiv'
                })
                //.addClass('popUpDiv')
                    .html(function () {
                        $('<ul/>')
                            .html(function () {
                                var _listLen = _data[i].list.length;
                                for (j = 0; j < _listLen; j++) {
                                    $('<li/>')
                                        .html(_data[i].list[j])
                                        .appendTo($(this))
                                }
                            })
                            .appendTo($(this));
                    })
                    .appendTo(_this)
            })
            .appendTo(_subNavId)
    }
    _subNavId
        .children()
        .on({
            mouseover: function () {
                $(this)
                    .children('.popUpDiv')
                    .show();
            },
            mouseout: function () {
                $(this)
                    .children('.popUpDiv')
                    .hide();
            }
        });
}

// 产品导航 subNavId 绑定事件
/*function subNavMenuFn() {
    $('#subNavId')
        .children()
        .on({
            mouseover: function () {
                $(this)
                    .children('.popUpDiv')
                    .show();
            },
            mouseout: function () {
                $(this)
                    .children('.popUpDiv')
                    .hide();
            }
        });
}*/
// 首页 轮播图
function sliderWrapFn() {
    var _data    = DATA_temp.imgUrl;
    var _dataLen = _data.length;

    var _leftBtnId  = $('#leftBtnId');
    var _rightBtnId = $('#rightBtnId');

    var _ulId = $('#ulId');

    var _pointBtnId = $('#pointBtnId');
    var _inx        = 0;

    var _sliderPWId   = $('#sliderPWId');
    var _sliderPWBgId = $('#sliderPWBgId');

    var _sliderPW_width = _dataLen * 27;
    var _pointMarL      = -(_sliderPW_width / 2) - 5;

    // 根据图片的数量，设置ul的宽度
    _ulId.css('width', _dataLen * 997);

    // 根据小白点数量设置宽度
    _sliderPWId.css({
        'width': _sliderPW_width,
        'marginLeft': _pointMarL
    });
    _sliderPWBgId.css({
        'width': _sliderPW_width,
        'marginLeft': _pointMarL
    });

    // 生成轮播图列表dom节点
    for (var i = 0; i < _dataLen; i++) {
        $('<li/>')
            .html('<img src=' + _data[i] + ' />')
            .appendTo(_ulId);
    }

    // 生成小白点li
    for (var i = 0; i < _dataLen; i++) {
        $('<li/>')
            .appendTo(_pointBtnId);
    }

    // 获取小白点列表的li节点，它是一个集合
    var _pBtn = _pointBtnId.children();

    // 图片、小白点 无方向切换
    function imgMove(_inx){
        var _val = "translate3d("+ -996 * _inx + "px"+", 0, 0)";
        //_ulId.animate({left: valLeft + 'px'},"slow");
        _ulId.css({"transform": _val, "transition-duration":"0.3s"});
        _pBtn.eq(_inx).addClass('redBg').siblings().removeClass('redBg');
    }

    // 图片向后切换
    function nextSliderFn(){
        if (_inx < (_dataLen - 1)) {
            _inx++;
         } else {
            _inx = 0;
         }

        imgMove(_inx);
    }

    // 初始化
    imgMove(0);

    // 自动轮播
    var autoTrans = setInterval(nextSliderFn,3000);

    // 鼠标在图片上时停止轮播
    _ulId.on({
        mouseover: function(){
            clearInterval(autoTrans);
        },
        mouseout: function(){
            autoTrans = setInterval(nextSliderFn,3000);
        }

    })

    // 点击左按钮 上一张
    _leftBtnId.on('click', function () {
        clearInterval(autoTrans);
        if(_inx > 0) {
            _inx--;
        } else {
            _inx = _dataLen - 1;
        }

        imgMove(_inx);
        autoTrans = setInterval(nextSliderFn,3000);
    });

    // 点击右按钮 下一张
    _rightBtnId.on('click', function () {
        clearInterval(autoTrans);
        nextSliderFn();
        autoTrans = setInterval(nextSliderFn,3000);
    });

    // 小白点的点击事件
    _pBtn.on('click', function () {
        var _this = $(this);
        _inx      = _this.index();

        imgMove(_inx);
    });
}