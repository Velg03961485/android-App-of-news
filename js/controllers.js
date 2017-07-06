angular.module("controllers" , ['ngCordova'])
.controller("tuijianC" , function($scope , $http , $state , $ionicSlideBoxDelegate , $timeout , myValue){
  // 搜索的点击事件
  $scope.searchFn = function(){
    $state.go("tab.searchDetail")
  }
  //更多的点击事件
  $scope.starFn = function(){
    $state.go("tab.star")
  }
  $scope.hufuFn=function () {
    myValue.appValue = false;
    $state.go("tab.hufu")
  }
  $scope.yule=function () {
    myValue.appValue = false;
    $state.go("tab.yvle")
  }
  $scope.meishi=function () {
    myValue.appValue = false;
    $state.go("tab.meishi")
  }
  $scope.xingzuo=function () {
    myValue.appValue = false;
    $state.go("tab.xingzuo")
  }
  $scope.jianfei=function () {
    myValue.appValue = false;
    $state.go("tab.jianfei")
  }
  $scope.lvxing=function () {
    myValue.appValue = false;
    $state.go("tab.lvxing")
  }
  $scope.moredata = false;
  $scope.name = "推荐";
  $scope.clickFn = function(index){
    $ionicSlideBoxDelegate.slide(index , 1000);
    $ionicSlideBoxDelegate.next(1000)
  };
  $scope.mine = {
    dataArr:"",
    dataStar:"",
    meizhuang:"",
    yule:"",
    food:"",
    xingzuo:"",
    jianfei:"",
    lvyou:"",
    //明星动态的点击事件
    dataStarFn:function(index){
      $state.go("tab.videoDetile",{
        starUrl: $scope.mine.dataStar[index].sources[0].page
      })
    },
    //美妆的点击事件
    meizhuangFn:function(index){
      $state.go("tab.meizhuang",{
        meizhuangUrl: $scope.mine.meizhuang[index].sources[0].page
      })
    },
    //娱乐的点击事件
    yuleFn:function(index){
      $state.go("tab.yule",{
        yuleUrl: $scope.mine.yule[index].sources[0].page
      })
    },
    //食物的点击事件
    foodFn:function(index){
      $state.go("tab.food",{
        foodUrl: $scope.mine.food[index].sources[0].page
      })
    },
    //星座的点击事件
    xingzuoFn:function(index){
      $state.go("tab.xingzuo1",{
        xingzuoUrl: $scope.mine.xingzuo[index].sources[0].page
      })
    },
    //减肥的点击事件
    jianfeiFn:function(index){
      $state.go("tab.jianfei1",{
        jianfeiUrl: $scope.mine.jianfei[index].sources[0].page
      })
    },
    //旅游的点击事件
    lvyouFn:function(index){
      $state.go("tab.lvyou",{
        lvyouUrl: $scope.mine.lvyou[index].sources[0].page
      })
    }

  };
  $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/index/recommend?_ts=1487568738815")
  //下拉刷新
  $scope.doRefresh = function() {
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function(res){
        $scope.mine.dataArr = res.data.recs;
        $scope.$broadcast('scroll.refreshComplete');
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      })
  };
  //请求服务器
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
    method:"GET"
  })
    .then(function(res){
      console.log(res);
      $scope.mine.dataArr = res.data.recs;
      $scope.mine.dataStar = $scope.mine.dataArr[1].items;
      for(var i = 0; i< $scope.mine.dataStar.length;i++){
        $scope.mine.dataStar[i].length = numberToTime($scope.mine.dataStar[i].length);
      }
      //美妆护肤
      $scope.mine.meizhuang = $scope.mine.dataArr[2].items;
      for(var i = 0; i< $scope.mine.meizhuang.length;i++){
        $scope.mine.meizhuang[i].length = numberToTime($scope.mine.meizhuang[i].length);
      }

      //娱乐八卦
      $scope.mine.yule = $scope.mine.dataArr[3].items;
      for(var i = 0; i< $scope.mine.yule.length;i++){
        $scope.mine.yule[i].length = numberToTime($scope.mine.yule[i].length);
      }

      //美食精选
      $scope.mine.food = $scope.mine.dataArr[4].items;
      for(var i = 0; i< $scope.mine.food.length;i++){
        $scope.mine.food[i].length = numberToTime($scope.mine.food[i].length);
      }

      //星座运程
      $scope.mine.xingzuo = $scope.mine.dataArr[5].items;
      for(var i = 0; i< $scope.mine.xingzuo.length;i++){
        $scope.mine.xingzuo[i].length = numberToTime($scope.mine.xingzuo[i].length);
      }

      //减肥健身
      $scope.mine.jianfei = $scope.mine.dataArr[6].items;
      for(var i = 0; i< $scope.mine.jianfei.length;i++){
        $scope.mine.jianfei[i].length = numberToTime($scope.mine.jianfei[i].length);
      }

      //旅游推荐
      $scope.mine.lvyou = $scope.mine.dataArr[7].items;
      for(var i = 0; i< $scope.mine.lvyou.length;i++){
        $scope.mine.lvyou[i].length = numberToTime($scope.mine.lvyou[i].length);
      }
    })
    .then(function(error){
      if(error){
        console.log(error);
      }
    });
  //计算事件
  function numberToTime(number) {
    //计算分钟 。 秒钟
    var currentMintue = parseInt(number / 60);
    var currentSecode = number - currentMintue * 60;
    if(currentMintue < 10){
      currentMintue = "0" + currentMintue;
    }
    currentSecode = parseInt(currentSecode);
    if(currentSecode < 10){
      currentSecode = "0" + currentSecode;
    }
    return currentMintue + ":" + currentSecode;
  }
})
//搜索框
.controller("searchDetailC" , function($scope , $http , $state , $cordovaInAppBrowser){
  $scope.isShow = true;
  // 返回事件
  $scope.goBack = function(){
    $scope.data.wd = "";
    window.history.go(-1)
  };
  $scope.data = {
    wd:"",
    hotWords:""
  };
  $scope.hotWordsFn = function(index){
    $state.go("tab.searchList" , {
      wd:$scope.data.hotWords[index]
    })
  };
  //取消的点击事件
  $scope.cancelFn = function(){
    window.history.go(0)
  };
  $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/search/configs?_ts=1487985320109&dt=0");
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
    method:"GET"
  })
    .then(function(res){
      $scope.data.hotWords = res.data.hotWords;
    })
    .then(function(error){
      if(error){
        console.log(error);
      }
    });

  //输入框改变会触发的方法
  $scope.change = function(){
    $scope.isShow = false;
    $http.jsonp("http://nssug.baidu.com/su?prod=video_sp&ie=utf-8&version=7.2.2&&cb=JSON_CALLBACK&wd="+$scope.data.wd).success(function(res){
      angular.forEach(res , function(item , key){
        if(key == "s"){
          $scope.result = item;
          for(var i = 0; i< $scope.result.length; i++){
            $scope.result[i] = $scope.result[i].split("{")[0]
          }
        }
      })
    });
    if($scope.data.wd == ""){
      $scope.isShow = true;
    }
  };

  $scope.searchListFn = function(index){
    // $scope.url = "https://m.baidu.com/s?word="+$scope.result[index]+"&ts=4063581&t_kt=0&ie=utf-8&rsv_iqid=2411090120&rsv_t=7dfcMI75cmO2H9tnknBv8ssKesillFovv2O5kBmdmJ4aIJ4f140w&sa=is_1&rsv_pq=2411090120&rsv_sug4=5610&inputT=1656&ss=100&rq=%E4%B8%89"
    // cordova.InAppBrowser.open($scope.url, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
    $state.go("tab.searchList" , {
      wd:$scope.result[index]
    })
  }
})
//搜索点击的详情页
.controller("searchListC" , function($scope, $state , $stateParams , $http  , $cordovaInAppBrowser){
  $scope.mine = {
    k:"",
    data:""
  };
  // if(!cordova.InAppBrowser) {
  //   return;
  // }
  $scope.mine.k = $stateParams.wd;
  $scope.url = "https://m.baidu.com/s?word="+$scope.mine.k+"&ts=4063581&t_kt=0&ie=utf-8&rsv_iqid=2411090120&rsv_t=7dfcMI75cmO2H9tnknBv8ssKesillFovv2O5kBmdmJ4aIJ4f140w&sa=is_1&rsv_pq=2411090120&rsv_sug4=5610&inputT=1656&ss=100&rq=%E4%B8%89"
  document.getElementById("myIframe").src = $scope.url;
  $scope.height = window.innerHeight;
  $scope.goBack = function(){
    window.history.go(-1)
  };
  // cordova.InAppBrowser.open($scope.url, '_blank', 'location=yes,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
})
//明星的详情页面
//明星动态的详情界面
.controller("videoDetileC" , function($scope, $state , $stateParams){
  $scope.dataStar = $stateParams.starUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
  // window.location.href = $scope.dataStar;
})
//美妆的详情界面
.controller("meizhuangC" , function ($scope , $state , $stateParams) {
  $scope.dataStar = $stateParams.meizhuangUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})
//娱乐的详情界面
.controller("yuleC" , function ($scope , $state , $stateParams) {
  $scope.dataStar = $stateParams.yuleUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})
//食物的详情界面
.controller("foodC" , function ($scope , $state , $stateParams) {
  $scope.dataStar = $stateParams.foodUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})
//星座的详情界面
.controller("xingzuo1C" , function ($scope , $state , $stateParams) {
  $scope.dataStar = $stateParams.xingzuoUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})
//减肥的详情界面
.controller("jianfei1C" , function ($scope , $state , $stateParams) {
  $scope.dataStar = $stateParams.jianfeiUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})
//旅游的详情界面
.controller("lvyouC" , function ($scope , $state , $stateParams) {
  $scope.dataStar = $stateParams.lvyouUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})

.controller("starC" , function ($scope , $http , $state , $timeout , myValue , $ionicSideMenuDelegate) {
  // $scope.guanzhu = function (index) {
  //   if(myValue.QQIsLogin == ""){
  //     $ionicSideMenuDelegate.toggleLeft()
  //   }else{
  //     var a = document.getElementsByClassName("guanzhu")[index]
  //     if(a.innerHTML == "+关注"){
  //       a.innerHTML = "取消关注"
  //     }else{
  //       a.innerHTML = "+关注"
  //     }
  //
  //   }
  // };
  $scope.moredata = false;
  $scope.mine = {
    dataList:"",
    dataArry:"",
    itemClick:function(index){
      console.log($scope.mine.dataList[index]);
      var a = JSON.stringify($scope.mine.dataList[index]);
      var a = encodeURIComponent(a);
      $state.go("tab.starRank" , {
        starRank:a
      })
    },
    dataDynamic:function(index){
      $state.go("tab.starDynamic" , {
        starDynamic:$scope.mine.dataArry[index].sources[0].page
      })
    }
  };
  //明星排行
  $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/index?_ts=1487556346421");
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
    method:"GET"
  })
    .then(function(res){
      $scope.mine.dataList = res.data.hotStars;
    })
    .then(function(error){
      if(error){
        console.log(error);
      }
    });
  //明星动态
  $scope.count = 30;
  $scope.offset = 0;
  $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotVideos?_ts=1487556346412&count="+$scope.count+"&offset=" + $scope.offset);

  //下拉刷新
  $scope.doRefresh = function() {
    $scope.count = 30;
    $scope.offset = 0;
    $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotVideos?_ts=1487556346412&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.dataArry = res.data.videos;
        for(var i = 0; i< $scope.mine.dataArry.length;i++){
          $scope.mine.dataArry[i].length = numberToTime($scope.mine.dataArry[i].length);
        }
        // 结束加载
        $scope.$broadcast('scroll.refreshComplete');
      })
      .then(function (error) {
        console.log(error);
      });
  };

// 上拉加载
  $scope.loadMore = function() {
    $scope.count += 30;
    console.log($scope.count);
    $scope.offset += 30;
    console.log($scope.offset);
    $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotVideos?_ts=1487556346412&count="+$scope.count+"&offset=" + $scope.offset);
    var time = "";
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function (res) {
        var length = $scope.mine.dataArry.length;
        $scope.mine.dataArry = $scope.mine.dataArry.concat(res.data.videos);
        for(var i = length; i< $scope.mine.dataArry.length;i++){
          $scope.mine.dataArry[i].length = numberToTime($scope.mine.dataArry[i].length);
        }
        // 结束加载
        tiem = $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 2000);
      })
      .then(function (error) {
        console.log(error);
      });
  };
  //数据请求
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
    method:"GET"
  })
    .then(function(res){
      // console.log(res);
      $scope.mine.dataArry = res.data.videos;
      console.log($scope.mine.dataArry);
      for(var i = 0; i< $scope.mine.dataArry.length;i++){
        $scope.mine.dataArry[i].length = numberToTime($scope.mine.dataArry[i].length);
      }
      console.log($scope.mine.dataArry);
    })
    .then(function(error){
      if(error){
        console.log(error);
      }
    });
  //计算事件
  function numberToTime(number) {
    //计算分钟 。 秒钟
    var currentMintue = parseInt(number / 60);
    var currentSecode = number - currentMintue * 60;
    if(currentMintue < 10){
      currentMintue = "0" + currentMintue;
    }
    currentSecode = parseInt(currentSecode);
    if(currentSecode < 10){
      currentSecode = "0" + currentSecode;
    }
    return currentMintue + ":" + currentSecode;
  }
  $scope.moreFn = function(){
    $state.go("tab.starMore")
  };
})
//明星动态
.controller("starDynamicC" , function($scope , $stateParams , $state){
  $scope.dataArr = $stateParams.starDynamic;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataArr;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})
//明星排行榜中的更多
.controller("starMoreC" , function($scope , $http , $state , $timeout , $ionicPopup , myValue){
  $scope.guanzhu = function (index) {
    if(myValue.QQIsLogin == ""){
      var alertPopup = $ionicPopup.alert({
        title: "QQ登录",
        template: '请先登录'
      });
      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    }else{
      var a = document.getElementsByClassName("guanzhu")[index]
      if(a.innerHTML == "+关注"){
        a.innerHTML = "取消关注"
      }else{
        a.innerHTML = "+关注"
      }

    }
  };

  $scope.mine = {
      dataList:""
    };
    //数据请求
    $scope.count = 30;
    $scope.offset = 0;
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?_ts=1487572006625&count="+$scope.count+"&offset="+$scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function(res){
        $scope.mine.dataList = res.data.hotStars;
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?_ts=1487572006625&count="+$scope.count+"&offset="+$scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.dataList = res.data.hotStars;
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      $scope.offset += 30;
      $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?_ts=1487572006625&count="+$scope.count+"&offset="+$scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.dataList =  $scope.mine.dataList.concat(res.data.hotStars);
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };

    // 更多明星中的排行榜的详情
    $scope.starMoreFn = function(index){
      var a = JSON.stringify($scope.mine.dataList[index]);
      var a = encodeURIComponent(a);
      $state.go("tab.starRank" , {
        starRank:a
      })
    }
    $scope.goBack = function(){
      window.history.go(-1)
    }
  })
//明星排行
.controller("starRankC" , function($scope , $state , $stateParams){
  $scope.dataArr = $stateParams.starRank;
  $scope.dataArr = decodeURIComponent($scope.dataArr);
  $scope.dataArr = JSON.parse($scope.dataArr);
  console.log($scope.dataArr)
  $scope.goBack = function(){
    window.history.go(-1);
  };
  $state.go("tab.starRank.newsDong" ,{
    sid:$scope.dataArr.sid
  });
  //最新动态的点击事件
  $scope.dongtaiFn = function () {
    $state.go("tab.starRank.newsDong" , {
      sid:$scope.dataArr.sid
    })
  };
  //作品集的点击事件
  $scope.zuopinFn = function () {
    $state.go("tab.starRank.zuopin" , {
      sid:$scope.dataArr.sid
    })
  };
  //粉丝区的点击事件
  $scope.fansFn = function () {
    $state.go("tab.starRank.fans" , {
      sid:$scope.dataArr.sid
    })
  }

  $scope.baiduDetailFn = function(){
    $state.go("tab.baiduDetail" , {
      baikeUrl:$scope.dataArr.baikeUrl
    })
  }
})
//详细资料的详情界面
.controller("baiduDetailC" , function($scope , $state , $stateParams ,$http){
  $scope.dataStar = $stateParams.baikeUrl;
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
  $scope.goBack = function(){
    window.history.go(-1);
  };
})
//最新动态
.controller("newsDongC" , function($scope , $state , $stateParams ,$http , $timeout){
  $scope.sid = $stateParams.sid;
  $scope.mine = {
    dataArr:""
  };
  $scope.dongtaiFn = function(index){
    $state.go("tab.starRank.newsVideo" , {
      newsVideo: $scope.mine.dataArr[index].sources[0].page
    })
  };
  $scope.offset = 0;
  $scope.count = 20;
  $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/videos?sid="+$scope.sid+"&sort=t&offset="+$scope.offset+"&count="+$scope.count);
  //下拉刷新
  $scope.doRefresh = function() {
    $scope.count = 20;
    $scope.offset = 0;
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/videos?sid="+$scope.sid+"&sort=t&offset="+$scope.offset+"&count="+$scope.count);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.dataArr = res.data.videos;
        //分秒的循环
        for(var i = 0; i< $scope.mine.dataArr.length;i++){
          $scope.mine.dataArr[i].length = numberToTime($scope.mine.dataArr[i].length);
        }
        //时间戳的循环
        for(var j = 0; j < $scope.mine.dataArr.length;j++){
          $scope.mine.dataArr[j].publishTime = formatMsgTime($scope.mine.dataArr[j].publishTime);
        }
        // 结束加载
        $scope.$broadcast('scroll.refreshComplete');
      })
      .then(function (error) {
        console.log(error);
      });
  };

// 上拉加载
  $scope.loadMore = function() {
    $scope.count += 20;
    $scope.offset += 20;
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/videos?sid="+$scope.sid+"&sort=t&offset="+$scope.offset+"&count="+$scope.count);
    var time = "";
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        var length = $scope.mine.dataArr.length;
        $scope.mine.dataArr = $scope.mine.dataArr.concat(res.data.videos);
        //分秒的循环
        for(var i = length; i< $scope.mine.dataArr.length;i++){
          $scope.mine.dataArr[i].length = numberToTime($scope.mine.dataArr[i].length);
        }
        //时间戳的循环
        for(var j = length; j < $scope.mine.dataArr.length;j++){
          $scope.mine.dataArr[j].publishTime = formatMsgTime($scope.mine.dataArr[j].publishTime);
        }
        // 结束加载
        tiem = $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 2000);
      })
      .then(function (error) {
        console.log(error);
      });
  };

  //数据请求
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
    method:"GET"
  })
    .then(function(res){
      $scope.mine.dataArr = res.data.videos;
      //分秒的循环
      for(var i = 0; i< $scope.mine.dataArr.length;i++){
        $scope.mine.dataArr[i].length = numberToTime($scope.mine.dataArr[i].length);
      }
      //时间戳的循环
      for(var j = 0; j < $scope.mine.dataArr.length;j++){
        $scope.mine.dataArr[j].publishTime = formatMsgTime($scope.mine.dataArr[j].publishTime);
      }
    })
    .then(function(error){
      if(error){
        console.log(error);
      }
    });
  //计算转化为分秒的事件
  function numberToTime(number) {
    //计算分钟 。 秒钟
    var currentMintue = parseInt(number / 60);
    var currentSecode = number - currentMintue * 60;
    if(currentMintue < 10){
      currentMintue = "0" + currentMintue;
    }
    currentSecode = parseInt(currentSecode);
    if(currentSecode < 10){
      currentSecode = "0" + currentSecode;
    }
    return currentMintue + ":" + currentSecode;
  }
  //计算时间戳转化为几天前的事件
  function formatMsgTime (timespan){
    var dateTime = new Date(timespan);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法

    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - timespan;

    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }
    else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    }
    else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
      timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
      timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return timeSpanStr;
  }
})
//最新动态里的视频详情页面
.controller("newsVideoC" , function($scope , $stateParams){
  $scope.dataStar = $stateParams.newsVideo;
  console.log($scope.dataStar);
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
})
//作品集
.controller("zuopinC" , function($scope , $state , $stateParams,$http){
  $scope.sid = $stateParams.sid;
  $scope.mine = {
    dataArr:"",
    dataStarFn:function(index){
      $state.go("tab.starRank.zuopinVideo" , {
        zuopinVideo:$scope.mine.dataArr[index].sources[0].page
      })
    }
  };
  $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/works?sid="+$scope.sid+"&cate=2&offset=0&count=20");
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
    method:"GET"
  })
    .then(function(res){
      $scope.mine.dataArr = res.data.works;
      console.log($scope.mine.dataArr);
      //时间戳的循环
      for(var j = 0; j < $scope.mine.dataArr.length;j++){
        $scope.mine.dataArr[j].publishTime = formatMsgTime($scope.mine.dataArr[j].publishTime);
      }
    })
    .then(function(error){
      if(error){
        console.log(error);
      }
    });
  //计算时间戳转化为几天前的事件
  function formatMsgTime (timespan){
    var dateTime = new Date(timespan);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法

    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - timespan;

    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }
    else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    }
    else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
      timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
      timeSpanStr = year + '-' + month + '-' + day ;
    }
    return timeSpanStr;
  }
})
//作品集的视频详情页面
.controller("zuopinVideoC" , function ($scope , $stateParams) {
  $scope.dataStar = $stateParams.zuopinVideo;
  console.log($scope.dataStar);
  $scope.height = window.innerHeight;
  document.getElementById("myIframe").src = $scope.dataStar;
})
  //粉丝区
.controller("fansC" , function($scope , $state , $stateParams , $http , $timeout){
  $scope.sid = $stateParams.sid;
  $scope.mine = {
    topics:"",
    photos:""
  };
  $scope.page = 1;
  $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/starTopicsV2?sid="+$scope.sid+"&page="+$scope.page);
  //下拉刷新
  $scope.doRefresh = function() {
    $scope.page = 1;
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/starTopicsV2?sid="+$scope.sid+"&page="+$scope.page);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.topics = res.data.topics;
        console.log($scope.mine.topics);
        for(var i = 0; i < $scope.mine.topics.length; i++){
          $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime)
        }
        // 结束加载
        $scope.$broadcast('scroll.refreshComplete');
      })
      .then(function (error) {
        console.log(error);
      });
  };

// 上拉加载
  $scope.loadMore = function() {
    $scope.page += 1;
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/starTopicsV2?sid="+$scope.sid+"&page="+$scope.page);
    var time = "";
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        var length = $scope.mine.topics.length;
        $scope.mine.topics  = $scope.mine.topics.concat(res.data.topics);
        for(var i = length; i < $scope.mine.topics.length; i++){
          $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime)
        }
        // 结束加载
        tiem = $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 2000);
      })
      .then(function (error) {
        console.log(error);
      });
  };

  //数据请求
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
    method:"GET"
  })
    .then(function(res){
      $scope.mine.topics = res.data.topics;
      for(var i = 0; i < $scope.mine.topics.length; i++){
        $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime)
      }
    })
    .then(function(error){
      if(error){
        console.log(error);
      }
    });
  //计算时间戳转化为几天前的事件
  function formatMsgTime (timespan){
    var dateTime = new Date(timespan);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法

    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - timespan;

    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }
    else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    }
    else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
      timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
      timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return timeSpanStr;
  }

  $scope.fansDetailFn = function(index){
    $state.go("tab.starRank.fansDetail" , {
      tid:$scope.mine.topics[index].tid
    })
  }
})
// 粉丝区的详情页
.controller("fansDetailC" , function($scope , $stateParams , $http , $timeout){
  $scope.tid = $stateParams.tid;
  $scope.mine = {
    topic:"",
    posts:""
  };
  //请求粉丝详情的头部
  $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/topicInfo?_ts=1487810885122&tid="+$scope.tid);
  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
    method:"GET"
  })
    .then(function (res) {
      $scope.mine.topic = res.data.topic;
      console.log($scope.mine.topic);
      $scope.mine.topic.lastReplyTime = formatMsgTime($scope.mine.topic.lastReplyTime);
      // 结束加载
      $scope.$broadcast('scroll.refreshComplete');
    })
    .then(function (error) {
      console.log(error);
    });

  //请求粉丝详情的底部
  $scope.page = 1;
  $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);

  //下拉刷新
  $scope.doRefresh = function() {
    $scope.page = 1;
    $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.posts = res.data.posts;
        //时间戳的循环
        for(var i = 0; i < $scope.mine.posts.length; i++){
          $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
        }
        // 结束加载
        $scope.$broadcast('scroll.refreshComplete');
      })
      .then(function (error) {
        console.log(error);
      });
  };

// 上拉加载
  $scope.loadMore = function() {
    $scope.page += 1;
    $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);
    var time = "";
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
      method:"GET"
    })
      .then(function (res) {
        var length = $scope.mine.posts.length;
        console.log(length)
        $scope.mine.posts = $scope.mine.posts.concat(res.data.posts);
        for(var i = length; i < $scope.mine.posts.length; i++){
          $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
        }
        // 结束加载
        tiem = $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 2000);
      })
      .then(function (error) {
        console.log(error);
      });
  };

  $http({
    url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
    method:"GET"
  })
    .then(function (res) {
      $scope.mine.posts = res.data.posts;
      for(var i = 0; i < $scope.mine.posts.length; i++){
        $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
      }
    })
    .then(function (error) {
      console.log(error);
    });
  //计算时间戳转化为几天前的事件
  function formatMsgTime (timespan){
    var dateTime = new Date(timespan);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法

    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - timespan;

    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }
    else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    }
    else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
      timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
    } else {
      timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return timeSpanStr;
  }
})
//发现的控制器
  .controller("faxianC",function ($scope,$http,$state,myValue) {
    //下拉刷新
    $scope.doRefresh = function() {
      $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/getBoardsV2");
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.mines=res.data.mines;
          console.log($scope.mine.mines)
          for(var i = 0; i < $scope.mine.mines.length; i++){
            $scope.mine.mines[i].lastTopicModify =formatMsgTime($scope.mine.mines[i].lastTopicModify)
          }
          $scope.mine.hots=res.data.hots;
          for(var i = 0; i < $scope.mine.hots.length; i++){
            $scope.mine.hots[i].lastTopicModify =formatMsgTime($scope.mine.hots[i].lastTopicModify)
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

    $scope.mine={
      mines:"",
      hots:"",
      hufuFn:function () {
        console.log("aaa");
        myValue.appValue = true
        $state.go("tab.hufu")
      },
      meishiFn:function () {
        myValue.appValue = true
        $state.go("tab.meishi")
      },
      jianfeiFn:function () {
        myValue.appValue = true
        $state.go("tab.jianfei")
      },
      yvleFn:function () {
        myValue.appValue = true
        $state.go("tab.yvle")
      },
      xingzuoFn:function () {
        myValue.appValue = true
        $state.go("tab.xingzuo")
      },
      lvxingFn:function () {
        myValue.appValue = true
        $state.go("tab.lvxing")
      },
      yonghuFn:function () {
        myValue.appValue = true
        $state.go("tab.yonghu")
      },
      tougaoFn:function () {

      }
    };
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/getBoardsV2");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.mines=res.data.mines;
        console.log($scope.mine.mines)
        for(var i = 0; i < $scope.mine.mines.length; i++){
          $scope.mine.mines[i].lastTopicModify =formatMsgTime($scope.mine.mines[i].lastTopicModify)
        }
        $scope.mine.hots=res.data.hots;
        for(var i = 0; i < $scope.mine.hots.length; i++){
          $scope.mine.hots[i].lastTopicModify =formatMsgTime($scope.mine.hots[i].lastTopicModify)
        }
      })
      .then(function (error) {
        if(error){
          console.log(error);
        }
      });
    //计算时间的事件
    function formatMsgTime (timespan){
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day ;
      }
      return timeSpanStr;
    }
    // 我的的讨论区的点击事件
    $scope.taolunFn = function(index){
      console.log($scope.mine.mines[index].bid)
      $state.go("tab.taolun" , {
        bid:$scope.mine.mines[index].bid
      })
    }
    //我是热门讨论区的点击事件
    $scope.retaolunFn=function (index) {
      $state.go("tab.remen",{
        sid:index
      })
    }
  })
  // 发现-讨论区的详情页面
  .controller("taolunC" , function($scope,$http,$state,$timeout,$stateParams){
    $scope.mine = {
      board:"",
      topics:""
    };
    $scope.bid = $stateParams.bid;
    $scope.goBack = function(){
      window.history.go(-1)
    };

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.page = 1;
      $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/topicsV2?bid="+$scope.bid+"&page="+$scope.page);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.board = res.data.board;
          $scope.mine.topics = res.data.topics;
          for(var i = 0; i < $scope.mine.topics.length; i++){
            $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime)
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.page += 1;
      $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/topicsV2?bid="+$scope.bid+"&page="+$scope.page);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.topics.length;
          $scope.mine.topics = $scope.mine.topics.concat(res.data.topics);
          for(var i = length; i < $scope.mine.topics.length;i++){
            $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };

    //请求数据
    $scope.page = 1;
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/topicsV2?bid="+$scope.bid+"&page="+$scope.page);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.board = res.data.board;
        $scope.mine.topics = res.data.topics;
        console.log($scope.mine.topics)
        for(var i = 0; i < $scope.mine.topics.length; i++){
          $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime);
        }
      })
      .then(function (error) {
        if(error){
          console.log(error);
        }
      });
    //计算时间的事件
    function formatMsgTime (timespan){
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day ;
      }
      return timeSpanStr;
    }
    //进入详情页面的点击事件
    $scope.fansDetailFn = function(index){
      $state.go("tab.taolunDetail" , {
        tid:$scope.mine.topics[index].tid
      })
    }
  })
  //发现-讨论区的详情界面-评论详情界面
  .controller("taolunDetailC" , function($scope , $http , $stateParams ,$state , $timeout){
    $scope.tid = $stateParams.tid;
    $scope.mine = {
      topic:"",
      posts:""
    };
    $scope.go = function () {
      window.history.go(-1)
    };
    //请求粉丝详情的头部
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/topicInfo?_ts=1487810885122&tid="+$scope.tid);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.topic = res.data.topic;
        console.log($scope.mine.topic);
        $scope.mine.topic.lastReplyTime = formatMsgTime($scope.mine.topic.lastReplyTime);
        // 结束加载
        $scope.$broadcast('scroll.refreshComplete');
      })
      .then(function (error) {
        console.log(error);
      });

    //请求粉丝详情的底部
    $scope.page = 1;
    $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.page = 1;
      $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.posts = res.data.posts;
          //时间戳的循环
          for(var i = 0; i < $scope.mine.posts.length; i++){
            $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.page += 1;
      $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.posts.length;
          console.log(length)
          $scope.mine.posts = $scope.mine.posts.concat(res.data.posts);
          for(var i = length; i < $scope.mine.posts.length; i++){
            $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };

    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.posts = res.data.posts;
        for(var i = 0; i < $scope.mine.posts.length; i++){
          $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
        }
      })
      .then(function (error) {
        console.log(error);
      });
    //计算时间戳转化为几天前的事件
    function formatMsgTime (timespan){
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      }
      return timeSpanStr;
    }

  })
  // 发现-热门讨论区
  .controller("remenC",function ($scope,$http,$state,$timeout,$stateParams ) {
    $scope.sid = $stateParams.sid;
    $scope.mine={
      data:"",
      topics:''
    };
    //下拉刷新
    $scope.doRefresh = function() {
      $scope.page = 1;
      $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/starTopicsV2?sid="+$scope.sid+"&page="+$scope.page);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.topics = res.data.topics;
          $scope.mine.data=res.data;
          console.log($scope.mine.topics);
          for(var i = 0; i < $scope.mine.topics.length; i++){
            $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime)
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.page += 1;
      $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/starTopicsV2?sid="+$scope.sid+"&page="+$scope.page);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.topics.length;
          $scope.mine.data=res.data;
          $scope.mine.topics  = $scope.mine.topics.concat(res.data.topics);
          for(var i = length; i < $scope.mine.topics.length; i++){
            $scope.mine.topics[i].lastReplyTime = formatMsgTime($scope.mine.topics[i].lastReplyTime)
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };

    $scope.page=1;
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/starTopicsV2?sid="+$scope.sid+"&page="+$scope.page)
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.data=res.data;
        $scope.mine.topics=res.data.topics
        for(var i=0;i<$scope.mine.topics.length;i++){
          $scope.mine.topics[i].lastReplyTime=formatMsgTime($scope.mine.topics[i].lastReplyTime)
        }
        console.log(res);
      })
      .then(function (error) {
        if(error){
          console.log(error);
        }
      })

    //计算时间戳转化为几天前的事件
    function formatMsgTime (timespan){
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      }
      return timeSpanStr;
    }


    $scope.renmenDetailFn = function(index){
      console.log(index);
      $state.go("tab.renmenDetail" , {
        tid:$scope.mine.topics[index].tid
      })
    }

    $scope.goBack = function(){
      window.history.go(-1);
    };

  })
  // 发现-热门讨论区-热门讨论区的详情
  .controller("renmenDetailC",function ($scope,$http,$state,$timeout,$stateParams) {
    $scope.tid = $stateParams.tid;
    $scope.mine = {
      topic:"",
      posts:""
    };
    $scope.goBack = function(){
      window.history.go(-1);
    };
    //请求粉丝详情的头部
    $scope.url = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/topicInfo?_ts=1487810885122&tid="+$scope.tid);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.topic = res.data.topic;
        console.log($scope.mine.topic);
        $scope.mine.topic.lastReplyTime = formatMsgTime($scope.mine.topic.lastReplyTime);
        // 结束加载
        $scope.$broadcast('scroll.refreshComplete');
      })
      .then(function (error) {
        console.log(error);
      });

    //请求粉丝详情的底部
    $scope.page = 1;
    $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.page = 1;
      $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.posts = res.data.posts;
          //时间戳的循环
          for(var i = 0; i < $scope.mine.posts.length; i++){
            $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };
    // 上拉加载
    $scope.loadMore = function() {
      $scope.page += 1;
      $scope.remarkUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/bbs/api/forum/posts?_ts=1487810885057&page="+$scope.page+"&sort=0&tid="+$scope.tid);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.posts.length;
          console.log(length)
          $scope.mine.posts = $scope.mine.posts.concat(res.data.posts);
          for(var i = length; i < $scope.mine.posts.length; i++){
            $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.remarkUrl,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.posts = res.data.posts;
        for(var i = 0; i < $scope.mine.posts.length; i++){
          $scope.mine.posts[i].postTime = formatMsgTime($scope.mine.posts[i].postTime);
        }
      })
      .then(function (error) {
        console.log(error);
      });
    //计算时间戳转化为几天前的事件
    function formatMsgTime (timespan){
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      }
      return timeSpanStr;
    }

  })
  //护肤
  .controller("hufuC",function ($scope,$http,$state,myValue) {
    $scope.mine={

    };
    $scope.goBack = function(){
      if(myValue.appValue == true){
        window.history.go(-1);
      }else{
        $state.go("tab.tuijian")
      }
    };

    $state.go("tab.hufu.tuijianH")
  })
  //护肤-推荐
  .controller("tuijianH",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tuijianvideo:function (index) {
        $state.go("tab.hufu.tuijianvideo", {
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=3&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=3&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.dataArry);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.dataArry[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset = 0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=3&count="+$scope.count+"&offset="+ $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        console.log($scope.mine.videos[0].sources[0].page)
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //护肤-化妆
  .controller("huazhuangC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      huazhuangvideo:function (index) {
        $state.go("tab.hufu.huazhuangvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotVideos?_ts=1487556346412&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotVideos?_ts=1487556346412&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count=32;
    $scope.offset=0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569152923&cid=27&count="+$scope.count+"&offset="+$scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //护肤-护肤
  .controller("hufuH",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      hufuvideo:function (index) {
        $state.go("tab.hufu.hufuvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=28&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=28&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset = 0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=28&count="+$scope.count+"&offset="+$scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //护肤-发型
  .controller("faxingC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      faxingvideo:function (index) {
        $state.go("tab.hufu.faxingvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=29&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=29&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count=30;
    $scope.offset=0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=29&count="+$scope.count+"&offset="+$scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //护肤-美甲
  .controller("meijiaC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      meijiavideo:function (index) {
        $state.go("tab.hufu.meijiavideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=31&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=31&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=31&count="+$scope.count+"&offset="+$scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //护肤-测评
  .controller("cepinC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      cepinvideo:function (index) {
        $state.go("tab.hufu.cepinvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=32&count"+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=32&count"+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=32&count"+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //  护肤-推荐-详情
  .controller("tuijianvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  护肤-化妆-详情
  .controller("huazhuangvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  护肤-护肤-详情
  .controller("hufuvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  护肤-发型-详情
  .controller("faxingvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  护肤-美甲-详情
  .controller("meijiavideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  护肤-测评-详情
  .controller("cepinvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })

  //美食
  .controller("meishiC",function ($scope,$http,$state , myValue) {
    $scope.mine={
    }

    $scope.goBack = function(){
      if(myValue.appValue == true){
        window.history.go(-1);
      }else{
        $state.go("tab.tuijian")
      }
    };

    $state.go("tab.meishi.tuijianM")
  })
  //美食-推荐
  .controller("tuijianM",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tuijianMvideo:function (index) {
        $state.go("tab.meishi.tuijianMvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=1&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=1&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=1&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        console.log(res);
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //美食-甜品
  .controller("tianpinC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tianpinvideo:function (index) {
        $state.go("tab.meishi.tianpinvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=6&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=6&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=6&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //美食-烘焙
  .controller("hongbeiC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      hongbeivideo:function (index) {
        $state.go("tab.meishi.hongbeivideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=11&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=11&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=11&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //美食-日韩料理
  .controller("rihanC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      rihanvideo: function (index) {
        console.log("aaa");
        $state.go("tab.meishi.rihanvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    };

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=16&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=16&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=16&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //美食-西餐
  .controller("xicanC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      xicanvideo:function (index) {
        $state.go("tab.meishi.xicanvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=13&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=13&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569970580&cid=13&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }
  })
  //  美食-推荐-详情
  .controller("tuijianMvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  美食-甜品-详情
  .controller("tianpinvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  美食-烘焙-详情
  .controller("hongbeivideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  美食-日韩料理-详情
  .controller("rihanvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  美食-西餐-详情
  .controller("xicanvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })



  //减肥健身
  .controller("jianfeiC",function ($scope,$http,$state , myValue) {
    $scope.mine={
    }

    $scope.goBack = function(){
      if(myValue.appValue == true){
        window.history.go(-1);
      }else{
        $state.go("tab.tuijian")
      }
    };

    $state.go("tab.jianfei.tuijianJ")
  })
  //减肥健身-推荐
  .controller("tuijianJ",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tuijianJvideo:function (index) {
        $state.go("tab.jianfei.tuijianJvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 20;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=4&offset="+$scope.offset+"&count="+$scope.count);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 20;
      console.log($scope.count);
      $scope.offset += 20;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=4&offset="+$scope.offset+"&count="+$scope.count);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 20;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=4&offset="+$scope.offset+"&count="+$scope.count );
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        console.log(res);
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //减肥健身-瘦身塑性
  .controller("shoushenC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      shoushenvideo:function (index) {
        $state.go("tab.jianfei.shoushenvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=23&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=23&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=23&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //减肥健身-燃脂
  .controller("ranzhiC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      ranzhivideo:function (index) {
        $state.go("tab.jianfei.ranzhivideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=22&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=22&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=22&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //减肥健身-瑜伽
  .controller("yvjiaC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      yvjiavideo:function (index) {
        $state.go("tab.jianfei.yvjiavideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=32&count"+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=32&count"+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=21&count=30&offset=0");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //减肥健身-马甲线
  .controller("majiaxianC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      majiaxianvideo:function (index) {
        $state.go("tab.jianfei.majiaxianvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=32&count"+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487557091712&cid=32&count"+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=24&count=30&offset=0");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }
  })
  //  减肥健身-推荐-详情
  .controller("tuijianJvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  减肥健身-瘦身塑性-详情
  .controller("shoushenvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  减肥健身-燃脂-详情
  .controller("ranzhivideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  减肥健身-瑜伽-详情
  .controller("yvjiavideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  减肥健身-马甲线-详情
  .controller("majiaxianvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })


  //娱乐
  .controller("yvleC",function ($scope,$http,$state , myValue) {
    $scope.mine={
    }

    $scope.goBack = function(){
      if(myValue.appValue == true){
        window.history.go(-1);
      }else{
        $state.go("tab.tuijian")
      }
    };

    $state.go("tab.yvle.tuijianY")
  })
  //娱乐-推荐
  .controller("tuijianY",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tuijianYvideo:function (index) {
        console.log("ssss");
        $state.go("tab.yvle.tuijianYvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=10&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=10&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=10&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        console.log(res);
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //娱乐-韩国娱乐
  .controller("hanguoC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      hanguovideo:function (index) {
        $state.go("tab.yvle.hanguovideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=36&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=36&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=36&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //娱乐-明星资讯
  .controller("mingxinC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      mingxinvideo:function (index) {
        $state.go("tab.yvle.mingxinvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=37&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=37&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=37&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //娱乐-影视资讯
  .controller("yingshiC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      yingshivideo:function (index) {
        $state.go("tab.yvle.yingshivideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=38&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=38&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487569753974&cid=38&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //  娱乐-推荐-详情
  .controller("tuijianYvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  娱乐-韩国娱乐-详情
  .controller("hanguovideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  娱乐-明星资讯-详情
  .controller("mingxinvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  娱乐-影视资讯-详情
  .controller("yingshivideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })


  //星座
  .controller("xingzuoC",function ($scope,$http,$state , myValue) {
    $scope.mine={
    }

    $scope.goBack = function(){
      if(myValue.appValue == true){
        window.history.go(-1);
      }else{
        $state.go("tab.tuijian")
      }
    };

    $state.go("tab.xingzuo.tuijianX")
  })
  //星座-推荐
  .controller("tuijianX",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tuijianXvideo:function (index) {
        $state.go("tab.xingzuo.tuijianXvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=5&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=5&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570478933&cid=5&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        console.log(res);
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //星座-推荐-详情
  .controller("tuijianXvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })

  //旅行
  .controller("lvxingC",function ($scope,$http,$state , myValue) {
    $scope.mine={
    }

    $scope.goBack = function(){
      window.history.go(-1);
    };

    $state.go("tab.lvxing.tuijianL")
  })
  //旅行-推荐
  .controller("tuijianL",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tuijianLvideo:function (index) {
        $state.go("tab.lvxing.tuijianLvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=2&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=2&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=2&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        console.log(res);
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //旅行-北美
  .controller("beimeiC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      rihanvideo:function (index) {
        $state.go("tab.lvxing.rihanvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=19&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=19&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=19&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //旅行-国内游
  .controller("guoneiC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      guoneivideo:function (index) {
        $state.go("tab.lvxing.guoneivideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=18&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=18&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=18&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //旅行-东南亚
  .controller("dongnanyaC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      dongnanyavideo:function (index) {
        $state.go("tab.lvxing.dongnanyavideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=17&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=17&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=17&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //旅行-欧洲
  .controller("ouzhouC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      ouzhouvideo:function (index) {
        $state.go("tab.lvxing.ouzhouvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 30;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=7&count="+$scope.count+"&offset=" + $scope.offset);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 30;
      console.log($scope.count);
      $scope.offset += 30;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=7&count="+$scope.count+"&offset=" + $scope.offset);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 30;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?_ts=1487570999475&cid=7&count="+$scope.count+"&offset=" + $scope.offset);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }
  })
  //  旅行-推荐-详情
  .controller("tuijianJvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  旅行-北美-详情
  .controller("beimeivideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  旅行-国内游-详情
  .controller("guoneivideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  旅行-东南亚-详情
  .controller("dongnanyavideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  旅行-欧洲-详情
  .controller("ouzhouvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })

  //用户
  .controller("yonghuC",function ($scope,$http,$state , myValue) {
    $scope.mine={
    }

    $scope.goBack = function(){
      if(myValue.appValue == true){
        window.history.go(-1);
      }else{
        $state.go("tab.tuijian")
      }
    };

    $state.go("tab.yonghu.tuijianY")
  })
  //用户-推荐
  .controller("tuijianY",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      tuijianYvideo:function (index) {
        $state.go("tab.yonghu.tuijianYvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 20;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=46&offset="+ $scope.offset+"&count="+$scope.count);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 20;
      console.log($scope.count);
      $scope.offset += 20;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=46&offset="+ $scope.offset+"&count="+$scope.count);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 20;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=46&offset="+ $scope.offset+"&count="+$scope.count);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        console.log(res);
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //用户-电视剧
  .controller("dianshijuC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      dianshijuvideo:function (index) {
        $state.go("tab.yonghu.dianshijuvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 20;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=53&offset="+ $scope.offset+"&count="+$scope.count);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 20;
      console.log($scope.count);
      $scope.offset += 20;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=53&offset="+ $scope.offset+"&count="+$scope.count);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 20;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=53&offset="+ $scope.offset+"&count="+$scope.count);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //用户-综艺
  .controller("zongyiC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      zongyivideo:function (index) {
        $state.go("tab.yonghu.zongyivideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 20;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=54&offset="+$scope.offset+"&count="+$scope.count);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 20;
      console.log($scope.count);
      $scope.offset += 20;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=54&offset="+$scope.offset+"&count="+$scope.count);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 20;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=54&offset="+$scope.offset+"&count="+$scope.count);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //用户-电影
  .controller("dianyingC",function ($scope,$http,$state,$timeout) {
    $scope.mine={
      videos:"",
      dianyingvideo:function (index) {
        $state.go("tab.yonghu.dianyingvideo",{
          videoUrl:$scope.mine.videos[index].sources[0].page
        })
      }
    }

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.count = 20;
      $scope.offset = 0;
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=52&offset="+$scope.offset+"&count="+$scope.count);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.videos = res.data.videos;
          for(var i = 0; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.count += 20;
      console.log($scope.count);
      $scope.offset += 20;
      console.log($scope.offset);
      $scope.starUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=52&offset="+$scope.offset+"&count="+$scope.count);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
        method:"GET"
      })
        .then(function (res) {
          var length = $scope.mine.videos.length;
          $scope.mine.videos = $scope.mine.videos.concat(res.data.videos);
          for(var i = length; i< $scope.mine.videos.length;i++){
            $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //数据请求
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starUrl,
      method:"GET"
    })
      .then(function(res){
        // console.log(res);
        $scope.mine.videos = res.data.videos;
        console.log($scope.mine.videos);
        for(var i = 0; i< $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime($scope.mine.videos[i].length);
        }
        console.log($scope.mine.videos);
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

    $scope.count = 20;
    $scope.offset =0;
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/cate/videos?cid=52&offset="+$scope.offset+"&count="+$scope.count);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.videos=res.data.videos;
        for(var i = 0; i<  $scope.mine.videos.length;i++){
          $scope.mine.videos[i].length = numberToTime( $scope.mine.videos[i].length);
        };
      })
      .then(function (error) {
        if(error){
          console.log(error)
        }
      });
    //计算事件
    function numberToTime(number) {
      //计算分钟 。 秒钟
      var currentMintue = parseInt(number / 60);
      var currentSecode = number - currentMintue * 60;
      if(currentMintue < 10){
        currentMintue = "0" + currentMintue;
      }
      currentSecode = parseInt(currentSecode);
      if(currentSecode < 10){
        currentSecode = "0" + currentSecode;
      }
      return currentMintue + ":" + currentSecode;
    }

  })
  //  用户-推荐-详情
  .controller("tuijianYvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  用户-电视剧-详情
  .controller("dianshijuvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  用户-综艺-详情
  .controller("zongyivideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })
  //  用户-电影-详情
  .controller("dianyingvideoC" , function($scope , $stateParams , $state){
    $scope.dataArr = $stateParams.videoUrl;
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.dataArr;
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })

  .controller("videoBokeC" , function($scope , $state , $http , $timeout){
    $scope.videoFn = function(index){
      $scope.biaoti =$scope.videoList[index].subject;
      $scope.video = "http://morguo.com/forum.php?mod=viewthread&tid="+$scope.videoList[index].tid;
      $state.go("tab.xiangqing",{
        xiangqing:$scope.video,
        biaoti: $scope.biaoti
      });
    };
    $scope.page = 1;
    $scope.url = encodeURIComponent("http://morguo.com/forum.php?mod=threadvideo&androidflag=1&iosflag=1&page="+ $scope.page);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function(res){
        $scope.videoList = res.data.data.list;
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    $scope.doRefresh = function() {
      $scope.page = 1;
      $scope.url = encodeURIComponent("http://morguo.com/forum.php?mod=threadvideo&androidflag=1&page="+ $scope.page);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.videoList = res.data.data.list;
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };
    $scope.loadMore = function() {
      $scope.page +=1;
      $scope.url = encodeURIComponent("http://morguo.com/forum.php?mod=threadvideo&androidflag=1&page="+ $scope.page);
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.videoList = $scope.videoList.concat(res.data.data.list);
          // 结束加载
          $scope.$broadcast('scroll.infiniteScrollComplete');

        })
        .then(function (error) {
          console.log(error);
        });
    };

  })
  .controller("xiangqingC" , function ($scope , $state ,$stateParams) {
    $scope.name = $stateParams.xiangqing;
    $scope.title = $stateParams.biaoti;
    //console.log($scope.biaoti1)
    document.getElementById("myIframe").src = $scope.name;
    $scope.height = window.innerHeight
    $scope.goBack = function(){
      window.history.go(-1);
    };
  })

  // 我的界面控制器
  .controller("wodeC" , function ($scope,$state,$http,myValue ) {
    $scope.name = "立即登录"
    $scope.touxiang = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3610704133,3947436040&fm=21&gp=0.jpg";
    // qq登录
    $scope.QQloginFn = function () {

      QQSDK.ssoLogin(function (res) {
        // alert(res.access_token);
        // alert(res.userid);
        $scope.useraccess_token = res.access_token;
        $scope.userid = res.userid;
        //获取用户信息
        $scope.qqurl =encodeURIComponent("https://graph.qq.com/user/get_user_info?access_token=" + $scope.useraccess_token + "&oauth_consumer_key=1105995386&openid=" + $scope.userid);
        $http({
          url:"http://59.110.139.104:3000/wy?myUrl="+$scope.qqurl,
          method:"GET"
        })
          .then(function (res) {
            $scope.name = res.data.nickname;
            $scope.touxiang = res.data.figureurl_qq_2;
            myValue.QQIsLogin = res.data.nickname;
          })
      },function (error) {
        alert(error);
      });
    }
    // 退出
    $scope.QQlogoutFn = function () {
      QQSDK.logout(function () {
        $scope.name = "立即登录"
        $scope.touxiang = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3610704133,3947436040&fm=21&gp=0.jpg";
      }, function (failReason) {
        alert(failReason);
      });
    }

  })

  // nba界面控制器
  .controller("nbaNewsC" , function ($scope , $state , $http , $timeout) {
    $scope.goBack = function(){
      window.history.go(-1)
    };
    $scope.mine = {
      data:""
    };
    $scope.page = 0;
    $scope.url = encodeURIComponent("http://120.27.187.151/right/news/news_list?leagueId=1&page="+$scope.page+"&pageSize=20&version=202&platform=iOS&type=0&uid=199013521105");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function(res){
        $scope.mine.data = res.data.data;
        console.log( $scope.mine.data)
        for(var i = 0; i<  $scope.mine.data.length;i++){
          $scope.mine.data[i].index = formatMsgTime( $scope.mine.data[i].index);
        }
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });

    //下拉刷新
    $scope.doRefresh = function() {
      $scope.page = 0;
      $scope.url = encodeURIComponent("http://120.27.187.151/right/news/news_list?leagueId=1&page="+$scope.page+"&pageSize=20&version=202&platform=iOS&type=0&uid=199013521105");
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          $scope.mine.data = res.data.data;
          for(var i = 0; i<  $scope.mine.data.length;i++){
            $scope.mine.data[i].index = formatMsgTime( $scope.mine.data[i].index);
          }
          // 结束加载
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          console.log(error);
        });
    };

// 上拉加载
    $scope.loadMore = function() {
      $scope.page += 1;
      $scope.url = encodeURIComponent("http://120.27.187.151/right/news/news_list?leagueId=1&page="+$scope.page+"&pageSize=20&version=202&platform=iOS&type=0&uid=199013521105");
      var time = "";
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"GET"
      })
        .then(function (res) {
          var length =  $scope.mine.data.length;
          $scope.mine.data = $scope.mine.data.concat(res.data.data);
          for(var i = length; i<  $scope.mine.data.length;i++){
            $scope.mine.data[i].index = formatMsgTime( $scope.mine.data[i].index);
          }
          // 结束加载
          tiem = $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 2000);
        })
        .then(function (error) {
          console.log(error);
        });
    };
    //计算时间戳转化为几天前的事件
    function formatMsgTime (timespan){
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var second = dateTime.getSeconds();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      }
      return timeSpanStr;
    }

    $scope.newsDetailFn = function(index){
      var aaa = JSON.stringify($scope.mine.data[index])
      var bbb = encodeURIComponent(aaa);
      $state.go("tab.newsDetail" , {
        data:bbb
      })
    }
  })
  .controller("newsDetailC" , function($state, $scope, $stateParams , $http , myValue , $ionicPopup){
    $scope.data = $stateParams.data;
    $scope.data = decodeURIComponent($scope.data);
    $scope.data = JSON.parse($scope.data);
    console.log($scope.data);
    $scope.mine = {
      data:""
    };
    $scope.url = encodeURIComponent("http://120.27.187.151/right/news/news_content?nid="+$scope.data.newsId+"&platform=ios&version=202");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function(res){
        $scope.mine.data = res.data.data;
        console.log("")
        if($scope.data.hasVideo == false){
          $scope.isShow = true;
          document.getElementById("content").innerHTML = $scope.mine.data.content;
          $scope.shareFn = function(){
            if(myValue.QQIsLogin == ""){
              var alertPopup = $ionicPopup.alert({
                title: "QQ登录",
                template: '请先登录'
              });
              alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
              });
            }else{
              var args = {};
              args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
              args.url = "http://www.baidu.com";
              args.title = "精彩NBA";
              args.description = $scope.mine.data.title;
              args.image = $scope.mine.data.image;

              QQSDK.shareNews(function () {
                alert("分享成功");
              }, function (failReason) {
                alert(failReason);
              },args);
            }
          }
        }
        else {
          $scope.isShow = false;
          document.getElementById("myIframe").src = $scope.data.url;
          $scope.shareFn = function () {
            if (myValue.QQIsLogin == "") {
              var alertPopup = $ionicPopup.alert({
                title: "QQ登录",
                template: '请先登录'
              });
              alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
              });
            } else {
              $scope.shareFn = function () {
                var args = {};
                args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
                args.text = $scope.data.url;
                QQSDK.shareText(function () {
                  alert('分享成功');
                }, function (failReason) {
                  alert(failReason);
                }, args);
              }
            }
          }
        }
      })
      .then(function(error){
        if(error){
          console.log(error);
        }
      });
    $scope.goBack = function(){
      window.history.go(-1)
    };
  });
