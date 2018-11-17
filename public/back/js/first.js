$(function(){

  var currentPage=1;
  var pageSize=5;

  //1.进入页面渲染&分页渲染
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
  
        //分页初始化
        $("#paginator").bootstrapPaginator({
  
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            //更新当前页
            currentPage=page;
            //重新渲染
            render();
          }
        })
      }
    });
  }

  //2.点击添加按钮，显示添加模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  });

  //3.表单校验
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

  //4.注册表单校验成功事件，阻止默认提交,用ajax提交
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
          //1.关闭模态框
          $("#addModal").modal("hide");
          //2.重新渲染第一页
          currentPage=1;
          render();
          //3.重置表单的内容和状态
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })

});