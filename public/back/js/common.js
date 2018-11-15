// NProgress.start();
// setTimeout(function(){
//   NProgress.done();
// },500)

$(document).ajaxStart(function(){
  NProgress.start();  
})

$(document).ajaxStop(function(){
  NProgress.done();
})