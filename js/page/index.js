/************************
 *name：首页-index的JS文件
 *date：2018/02/08
 *author：Lyrica
 *remarks：null
 */
/*
 *改用jQ来实现
 */

// 首页header 搜索框
 function topSearchFn(){
     $('#topSearchId')
         .attr('value',topSearchVal )
         .on({
             focus:function(){
                 $(this).attr('value','');
             },
             blur:function(){
                 $(this).attr('value',topSearchVal);
             }
         });
 }
// 生成左侧导航子菜单
function createSubNavMenuFn(){
    var _subNavId   = $('#subNavId');
    var _data       = DATA_temp.subNavData;
    var _dataLen    = _data.length;

    //console.log( _dataLen );
    for(var i=0;i<_dataLen;i++){
        $('<li/>')
            .html(function(){
                var _this = $(this);
                $('<p/>').html(_data[i].name).appendTo(_this);
                $('<div/>',{
                        'class':'popUpDiv'
                    })
                    //.addClass('popUpDiv')
                    .html(function(){
                        $('<ul/>')
                            .html(function(){
                                var _listLen = _data[i].list.length;
                                for(j=0;j<_listLen;j++){
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
            mouseover:function(){
                $(this)
                    .children('.popUpDiv')
                    .show();
            },
            mouseout:function(){
                $(this)
                    .children('.popUpDiv')
                    .hide();
            }
        });
}

// 首页 轮播图
function sliderWrapFn(){
    var _data           = DATA_temp.imgUrl;
    var _dataLen        = _data.length;

    var _leftBtnId      = $('#leftBtnId');
    var _rightBtnId     = $('#rightBtnId');

    var _ulId           = $('#ulId');

    var _pointBtnId     = $('#pointBtnId');
    var _inx            = 0;

    var _sliderPWId     = $('#sliderPWId');
    var _sliderPWBgId   = $('#sliderPWBgId');

    var _sliderPW_width = _dataLen * 27;
    var _pointMarL      = -(_sliderPW_width/2)-5;

    // 根据图片的数量，设置ul的宽度
    _ulId.css('width',_dataLen * 997);

    // 根据小白点数量设置宽度
    _sliderPWId.css({
        'width':_sliderPW_width,
        'marginLeft':_pointMarL
    });
    _sliderPWBgId.css({
        'width':_sliderPW_width,
        'marginLeft':_pointMarL
    });

    // 生成轮播图列表dom节点
    for(var i=0; i<_dataLen; i++){
        $('<li/>')
            .html('<img src='+ _data[i] +' />')
            .appendTo( _ulId );
    }
    // 生成小白点li
    for(var i=0; i<_dataLen; i++){
        $('<li/>')
            .appendTo( _pointBtnId );
    }
    // 获取小白点列表的li节点，它是一个集合
    var _pBtn           = _pointBtnId.children();
    // 左按钮
    _leftBtnId.on('click',function(){
        if(_inx < (_dataLen-1)){
            _inx++;
        }else{
            _inx = 0;
        }
        _ulId.css('left',-996*_inx );
        // 小白点的颜色跟随图片来切换
        //_pBtn.eq(_inx).addClass('redBg').siblings().removeClass('redBg');
        switchPointRedFn(_inx);
    });
    // 右按钮
    _rightBtnId.on('click',function(){
        if(_inx > 0){
            _inx--;
        }else{
            _inx = (_dataLen-1);
        }
        _ulId.css('left',-996*_inx );
        // 小白点的颜色跟随图片来切换
        //_pBtn.eq(_inx).addClass('redBg').siblings().removeClass('redBg');
        switchPointRedFn(_inx);
    });

    function switchPointRedFn(_n){
        _pBtn.eq(_n).addClass('redBg').siblings().removeClass('redBg');
    }
    // 小白点的点击事件
    _pBtn.on('click',function(){
        var _this       = $(this);
        _inx = _this.index();
        _ulId.css('left',-996*_inx);
        _this
            .addClass('redBg')
            .siblings()
            .removeClass('redBg');
    });
}