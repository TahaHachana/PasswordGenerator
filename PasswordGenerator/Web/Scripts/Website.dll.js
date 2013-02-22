(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Seq,Operators,Website,Password,String,Arrays,Strings,List,Math,Number,Unchecked,SettingsFormlet,Client,Settings,Formlet,Controls,Enhance,Data,Formlet1,jQuery;
 Runtime.Define(Global,{
  Website:{
   Password:{
    alpha:Runtime.Field(function()
    {
     return Seq.toList(Operators.range(97,122));
    }),
    generate:function(chars,length)
    {
     var _chars_;
     _chars_=Password.shuffle(chars);
     return Seq.toArray(Seq.delay(function()
     {
      return Seq.collect(function()
      {
       var item;
       item=Password.random(0,chars.get_Length()-1);
       return[_chars_.get_Item(item)];
      },Operators.range(1,length));
     }));
    },
    "generate'":function(forceUpperCase,forceNumbers,forcePunctuation,length)
    {
     var chars,x,x1,f,mapping,f1;
     chars=Seq.toList(Seq.delay(function()
     {
      return Seq.append(Password.alpha(),Seq.delay(function()
      {
       return Seq.append(forceUpperCase?Password.upperCase():Seq.empty(),Seq.delay(function()
       {
        return Seq.append(forceNumbers?Password.numbers():Seq.empty(),Seq.delay(function()
        {
         if(forcePunctuation)
          {
           return Password.punctuation();
          }
         else
          {
           return Seq.empty();
          }
        }));
       }));
      }));
     }));
     x=(x1=Password.generate(chars,length),(f=(mapping=function(value)
     {
      return String.fromCharCode(value);
     },function(array)
     {
      return Arrays.map(mapping,array);
     }),f(x1)));
     f1=function(strings)
     {
      return Strings.concat("",strings);
     };
     return f1(x);
    },
    numbers:Runtime.Field(function()
    {
     return Seq.toList(Operators.range(49,57));
    }),
    punctuation:Runtime.Field(function()
    {
     return List.ofArray([126,96,33,64,35,36,37,94,38,42,40,41,45,95,43,61,34]);
    }),
    random:function(lowerBound,upperBound)
    {
     var x,x1,f,f1;
     x=Math.random()*(x1=upperBound-lowerBound+1,(f=function(value)
     {
      return Number(value);
     },f(x1)));
     f1=function(arg00)
     {
      return Math.floor(arg00);
     };
     return f1(x);
    },
    remove:function(item,lst)
    {
     var f,predicate;
     f=(predicate=function(x)
     {
      return!Unchecked.Equals(x,item);
     },function(list)
     {
      return List.filter(predicate,list);
     });
     return f(lst);
    },
    shuffle:function(lst)
    {
     return Seq.toList(Seq.delay(function()
     {
      var item,x;
      item=Password.random(0,lst.get_Length()-1);
      x=lst.get_Item(item);
      return Seq.append([x],Seq.delay(function()
      {
       var _lst_;
       _lst_=Password.remove(x,lst);
       if(!(_lst_.$==0))
        {
         return Password.shuffle(_lst_);
        }
       else
        {
         return Seq.empty();
        }
      }));
     }));
    },
    upperCase:Runtime.Field(function()
    {
     return Seq.toList(Operators.range(65,90));
    })
   },
   SettingsFormlet:{
    Client:{
     Settings:Runtime.Class({},{
      Create:function(length,upperCase,numbers,other)
      {
       return Runtime.New(Settings,{
        Length:length,
        UpperCase:upperCase,
        Numbers:numbers,
        Other:other
       });
      }
     }),
     SettingsFormletViewer:Runtime.Class({
      get_Body:function()
      {
       return Client.main();
      }
     }),
     lengthList:Runtime.Field(function()
     {
      var x,f,mapping;
      x=Seq.toList(Operators.range(6,32));
      f=(mapping=function(x1)
      {
       return[Global.String(x1),x1];
      },function(list)
      {
       return List.map(mapping,list);
      });
      return f(x);
     }),
     main:function()
     {
      var lengthSelect,x,f,upperCaseCheckbox,x1,f1,numbersCheckbox,x2,f2,otherCheckbox,x3,f3,form,x4,x5,x6,f4,f5;
      lengthSelect=(x=Controls.Select(8,Client.lengthList()),(f=function(formlet)
      {
       return Enhance.WithTextLabel("Length",formlet);
      },f(x)));
      upperCaseCheckbox=(x1=Controls.Checkbox(false),(f1=function(formlet)
      {
       return Enhance.WithTextLabel("Upper Case",formlet);
      },f1(x1)));
      numbersCheckbox=(x2=Controls.Checkbox(false),(f2=function(formlet)
      {
       return Enhance.WithTextLabel("Numbers",formlet);
      },f2(x2)));
      otherCheckbox=(x3=Controls.Checkbox(false),(f3=function(formlet)
      {
       return Enhance.WithTextLabel("Other",formlet);
      },f3(x3)));
      form=(x4=(x5=Data.$(Data.$(Data.$(Data.$((x6=function(length)
      {
       return function(upperCase)
       {
        return function(numbers)
        {
         return function(other)
         {
          return(function(arg20)
          {
           return function(arg30)
           {
            return Settings.Create(length,upperCase,arg20,arg30);
           };
          }(numbers))(other);
         };
        };
       };
      },Formlet1.Return(x6)),lengthSelect),upperCaseCheckbox),numbersCheckbox),otherCheckbox),(f4=function(formlet)
      {
       return Enhance.WithSubmitAndResetButtons(formlet);
      },f4(x5))),(f5=function(formlet)
      {
       return Enhance.WithFormContainer(formlet);
      },f5(x4)));
      return Formlet1.Run(function(settings)
      {
       var password;
       password=Password["generate'"](settings.UpperCase,settings.Numbers,settings.Other,settings.Length);
       return jQuery("#password").attr("value",password);
      },form);
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Seq=Runtime.Safe(WebSharper.Seq);
  Operators=Runtime.Safe(WebSharper.Operators);
  Website=Runtime.Safe(Global.Website);
  Password=Runtime.Safe(Website.Password);
  String=Runtime.Safe(Global.String);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Strings=Runtime.Safe(WebSharper.Strings);
  List=Runtime.Safe(WebSharper.List);
  Math=Runtime.Safe(Global.Math);
  Number=Runtime.Safe(Global.Number);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  SettingsFormlet=Runtime.Safe(Website.SettingsFormlet);
  Client=Runtime.Safe(SettingsFormlet.Client);
  Settings=Runtime.Safe(Client.Settings);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  Controls=Runtime.Safe(Formlet.Controls);
  Enhance=Runtime.Safe(Formlet.Enhance);
  Data=Runtime.Safe(Formlet.Data);
  Formlet1=Runtime.Safe(Formlet.Formlet);
  return jQuery=Runtime.Safe(Global.jQuery);
 });
 Runtime.OnLoad(function()
 {
  Client.lengthList();
  Password.upperCase();
  Password.punctuation();
  Password.numbers();
  Password.alpha();
 });
}());
