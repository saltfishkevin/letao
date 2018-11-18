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

    //获取id,设置给准备好的input
    var id=$(this).data("id");
    $('[name="categoryId"]').val(id);
    // $('[name="categoryId"]').trigger("input");
    // console.log(txt);
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")
  })

  //4.文件上传初始化
  $("#fileupload").fileupload({

    dataType:"json",
    done:function(e,data){
      console.log(data);
      var result=data.result;
      var picUrl=result.picAddr;
      $("#imgBox img").attr("src",picUrl);

      //将src路径设置给input
      $('[name="brandLogo"]').val(picUrl);

      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }

  })


  //5.配置表单校验
  $("#form").bootstrapValidator({

    excluded:[],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{

      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请选择图片"
          }
        }
      }

    }
  });


  //6.注册表单校验成功事件,阻止默认提交
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          //关模态框
          $('#addModal').modal('hide');
          //重新渲染第一页
          currentPage=1;
          render();
          //重置内容和校验状态
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownText').text('请选择一级分类');
          $('#imgBox img').attr("src","./images/none.png");
        }
      }
    })
  })

})