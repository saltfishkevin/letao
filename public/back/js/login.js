// 需求:进行表单校验
/*
* 1. 进行表单校验配置
*    校验要求:
*        (1) 用户名不能为空, 长度为2-6位
*        (2) 密码不能为空, 长度为6-12位
* */

$(function(){

  $('#form').bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置校验字段
    fields:{

      username:{
        validators:{

          notEmpty:{
            message:"用户名不能为空"
          },

          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须是2-6位"
          },

          //配置回调函数的提示信息
          callback:{
            message:"用户名不存在"
          }

        }
      },


      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },

          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6-12位"
          },

          //配置回调函数的提示信息
          callback:{
            message:"密码错误"
          }

        }
      }

    }

  });


/*
* 2. 表单校验需要在表单提交时, 进行校验, 需要submit按钮
*    可以注册一个表单校验成功事件, 表单校验成功之后, 默认会提交
*    可以在成功事件中, 阻止默认的表单提交, 通过 ajax 提交, 就不会跳转了
*
* 思路: 1. 注册表单校验成功事件
*      2. 在事件中, 阻止默认的表单提交, 通过 ajax 提交即可
* */
$('form').on("success.form.bv",function(e){
  e.preventDefault();
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    data:$('#form').serialize(),
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success){
        location.href="index.html";
      }
      if(info.error===1000){
        $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
      }
      if(info.error===1001){
        $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
      }
    }
  })
});


// 3.重置功能
$('[type="reset"]').click(function(){

  $('#form').data("bootstrapValidator").resetForm();

})

});


