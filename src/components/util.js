
// 将被点击的城市设置到历史记录里
export const setHistory = (citytype, cityid, cityname) => {
  let kwcHistory = localStorage.getItem('kwcHistory')

  if( kwcHistory ){
    kwcHistory = window.JSON.parse(kwcHistory);
    let _thisTypeHistory = kwcHistory[citytype];

    if( _thisTypeHistory ){
      for (let i = 0; i < _thisTypeHistory.length; i++) {
        let o = _thisTypeHistory[i];
        if( o.cityid == cityid ){
          _thisTypeHistory.splice(i, 1);
          break;
        }
      }

      // 在数组首部插入一个元素，也可以用 unshift() 函数实现，但是 IE8 不兼容...
      _thisTypeHistory.splice(0, 0, {
        cityname: cityname,
        cityid: cityid,
        citytype: citytype
      });

      // 删除数组中超过6位的元素
      _thisTypeHistory.splice(6);
    }else{
      kwcHistory[citytype] = [{
        cityname: cityname,
        cityid: cityid,
        citytype: citytype
      }];
    }
  }else{
    kwcHistory = {};
    kwcHistory[citytype] = [{
      cityname: cityname,
      cityid: cityid,
      citytype: citytype
    }];
  }

  localStorage.setItem('kwcHistory', window.JSON.stringify(kwcHistory));
}


// 先登录
export const loginFirst = (_this) => {
  _this.$store.commit('setCommonState', {t: 'showLoginDialog', v: true})
}


// 远程加载 js，比如需要在页面加载完之后再加载 js 资源
export const remoteJS = (src) => {
  if(Array.prototype.slice.call(document.scripts).filter(n => n.src === src).length > 0)  return;

  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = src
  document.body.appendChild(s);
}