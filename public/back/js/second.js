$(function(){

  //1.一进入页面渲染
  var currentPage=1;
  var pageSize=5;

  render();

  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("secondTpl",info);
        $('tbody').html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }

  //2.点击按钮，显示添加模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");

    //发送ajax请求,获取下拉菜单一级分类数据
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  });

  //3.给下拉菜单的所有a添加点击事件，通过事件委托注册
  $(".dropdown-menu").on("click","a",function(){
    // console.log(666);
    var txt=$(this).text();
    $("#dropdownText").text(txt);
    console.log(txt);
  })

  //4.文件上传初始化
  $("#fileupload").fileupload({

    dataType:"json",
    done:function(e,data){
      console.log(data);
      var result=data.result;
      var picUrl=result.picAddr;
      $("#imgBox img").attr("src",picUrl);
    }

  })


})