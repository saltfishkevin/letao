$(function(){

  //1.分页渲染
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
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }





  //2.显示模态框(包含一级分类信息)
  $("#addBtn").click(function(){
    $("#addModal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:5
      },
      dataType:"json",
      success:function(info){
        console.log(info);
      }
    })


  })

})