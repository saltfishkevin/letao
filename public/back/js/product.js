
$(function(){

  var currentPage=1;
  var pageSize=3;
  var picArr=[];

  render();

  //1.渲染
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("productTpl",info);
        $('tbody').html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            // console.log(page);
            currentPage=page;
            render();
          }
        })
      }
    })
  }

  //2.模态框初始显示情况(要含有二级分类信息)
  $("#addBtn").click(function(){
    $("#addModal").modal("show");

    //发送ajax请求,请求二级分类数据渲染
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
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

  //3.点击下拉菜单切换内容(id要存在隐藏域)
  $(".dropdown-menu").on("click","a",function(){

    // console.log(666);
    var txt=$(this).text();
    $("#dropdownText").text(txt);

    var id=$(this).data("id");
    $('[name="brandId"]').val(id);

    //将校验状态改成VALID
    $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });

  //4.进行文件上传配置
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      console.log(data);

      var picObj=data.result;
      var picUrl=picObj.picAddr;

      picArr.unshift(picObj);

      $("#imgBox").prepend('<img style="height: 100px;" src="'+picUrl+'" alt="">');
      console.log(picArr);
      if(picArr.length>3){
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }

      if(picArr.length===3){
        //满3张后,picStatus状态改成VALID
        $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
      }
    }
  });

  //5.表单校验初始化
  $("#form").bootstrapValidator({
    excluded:[],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },

      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },

      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },

      num:{
        validators:{
          notEmpty:{
            message:"请输入库存数量"
          },
        //正则校验
        regexp: {
          regexp: /^[1-9]\d*$/,
          message: '请输入非0开头的数字'
        }
        }
      },

      size:{
        validators:{
          notEmpty:{
            message:"请输入尺码"
          },
           //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入xx-xx格式,xx是两位数字'
          }
        }
      },

      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          },
        }
      },

      price:{
        validators:{
          notEmpty:{
            message:"请输入商品现价"
          }
        }
      },

      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传三张图片"
          }
        }
      }

    }

  });

  //6.注册表单校验成功事件，阻止默认提交，通过ajax提交
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    var params=$("#form").serialize();
    console.log(picArr);
    params+="&picName1="+ picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    params+="&picName2="+ picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    params+="&picName3="+ picArr[2].picName+"&picAddr3="+picArr[2].picAddr;

    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:params,
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          //关闭模态框
          $("#addModal").modal("hide");
          //重新渲染第一页
          currentPage=1;
          render();
          //重置内容和状态
          $("#form").data("bootstrapValidator").resetForm(true);
          //重置下拉按钮和图片内容
          $("#dropdownText").text("请选择二级分类");
          $("#imgBox img").remove();
          //清空数组
          picArr=[];
        }
      }

    })
  })

})