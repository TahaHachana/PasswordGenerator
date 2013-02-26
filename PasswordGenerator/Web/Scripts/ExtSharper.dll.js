(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Math,Number;
 Runtime.Define(Global,{
  ExtSharper:{
   Client:{
    Random:Runtime.Class({},{
     Next:function()
     {
      var x,f;
      x=Math.random()*2147483648;
      f=function(arg00)
      {
       return Math.floor(arg00);
      };
      return f(x);
     },
     Next1:function(maxValue)
     {
      var x,x1,f,f1;
      x=Math.random()*(x1=maxValue+1,(f=function(value)
      {
       return Number(value);
      },f(x1)));
      f1=function(arg00)
      {
       return Math.floor(arg00);
      };
      return f1(x);
     },
     Next2:function(minValue,maxValue)
     {
      var x,x1,f,f1;
      x=Math.random()*(x1=maxValue-minValue+1,(f=function(value)
      {
       return Number(value);
      },f(x1)))+Number(minValue);
      f1=function(arg00)
      {
       return Math.floor(arg00);
      };
      return f1(x);
     },
     NextDouble:function()
     {
      return Math.random();
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  Math=Runtime.Safe(Global.Math);
  return Number=Runtime.Safe(Global.Number);
 });
 Runtime.OnLoad(function()
 {
 });
}());
