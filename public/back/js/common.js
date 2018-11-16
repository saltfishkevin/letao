

// NProgress.start();
// setTimeout(function(){
//   NProgress.done();
// },500)

$(document).ajaxStart(function(){
  NProgress.start();  
});

$(document).ajaxStop(function(){
  NProgress.done();
});

$(function(){

  //公共功能:
  //1.导航点击切换功能

  $(".lt_aside .category").click(function(){

    $(this).next().stop().slideToggle();

  });

  //2.左侧菜单列表切换功能

  $(".lt_topbar .icon_left").click(function(){

    $(".lt_aside").toggleClass("hidemenu");

    $(".lt_main").toggleClass("hidemenu");

    $(".lt_topbar").toggleClass("hidemenu");

  })

  //3.退出功能
  $(".lt_topbar .icon_right").click(function(){

    $("#logoutModal").modal("show");

  });

  $("#logoutBtn").click(function(){
    
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    });

  })



})