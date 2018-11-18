$(function(){

  var currentPage=1;
  var pageSize=5;

  render();

  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("firstTpl",info);
        $("tbody").html(htmlStr);

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
    });
  }


  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  });

  $("#form").bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      }
    }
  });


  $("#form").on("success.form.bv",function(e){

    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          currentPage=1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })


});