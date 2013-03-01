(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Math,Number,WebSharper,List,Operators,Seq,String;
 Runtime.Define(Global,{
  ExtSharper:{
   Random:{
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
     },
     NextString:function(length,charSet)
     {
      var defaultCharSet,_charSet_,charSetLength,x,f,folder;
      defaultCharSet=List.ofArray([65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57]);
      _charSet_=Operators.DefaultArg(charSet,defaultCharSet);
      charSetLength=Number(_charSet_.get_Length());
      x=Seq.toList(Seq.delay(function()
      {
       return Seq.collect(function()
       {
        var item,arg00;
        item=(arg00=Math.random()*charSetLength,Math.floor(arg00));
        return[_charSet_.get_Item(item)];
       },Operators.range(1,length));
      }));
      f=(folder=function(state)
      {
       return function(x1)
       {
        return state+String.fromCharCode(x1);
       };
      },function(list)
      {
       return Seq.fold(folder,"",list);
      });
      return f(x);
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  Math=Runtime.Safe(Global.Math);
  Number=Runtime.Safe(Global.Number);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  List=Runtime.Safe(WebSharper.List);
  Operators=Runtime.Safe(WebSharper.Operators);
  Seq=Runtime.Safe(WebSharper.Seq);
  return String=Runtime.Safe(Global.String);
 });
 Runtime.OnLoad(function()
 {
 });
}());
