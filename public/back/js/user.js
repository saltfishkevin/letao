$(function(){

  var currentPage=1;
  var pageSize=5;
  var currentId;
  var isDelete;


  render();

  function render(){

    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        // 生成htmlStr
        var htmlStr=template("tmp",info);
        $('tbody').html(htmlStr);
  
        // 分页初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            console.log(page);
            // 根据page,请求对应页数据
            currentPage=page;
            render();
          }
        })
      }
    });

  }

  $('tbody').on("click",".btn",function(){
    // console.log("呵呵");
    $("#userModal").modal("show");

    currentId=$(this).parent().data("id");

    isDelete=$(this).hasClass("btn-danger")?0:1;
  });


  $("#confirmBtn").click(function(){

    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          $("#userModal").modal("hide");
          render();
        }
      }
    });

  });







  // 测试分页插件
  // $("#paginator").bootstrapPaginator({
  //   bootstrapMajorVersion:3,
  //   totalPages:3,
  //   currentPage:1,
  //   onPageClicked:function(a,b,c,page){
  //     console.log(page);
  //   }
  // });

});

