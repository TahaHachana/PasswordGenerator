(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Website,Password,Settings,WebSharper,Seq,Operators,List,Math,Number,Unchecked,SettingsFormlet,Client,Formlet,Data,Formlet1,Enhance,String,Controls,jQuery;
 Runtime.Define(Global,{
  Website:{
   Password:{
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
    alpha:Runtime.Field(function()
    {
     return Seq.toList(Operators.range(97,122));
    }),
    charStrength:function(_arg1)
    {
     var activePatternResult;
     activePatternResult=Password["|Alpha|Upper|Number|Punct|Other|"](_arg1);
     if(activePatternResult.$==1)
      {
       return 26;
      }
     else
      {
       if(activePatternResult.$==2)
        {
         return 9;
        }
       else
        {
         if(activePatternResult.$==3)
          {
           return 17;
          }
         else
          {
           if(activePatternResult.$==4)
            {
             return 17;
            }
           else
            {
             return 26;
            }
          }
        }
      }
    },
    generate:function(chars,length)
    {
     var _chars_;
     _chars_=Password.shuffle(chars);
     return Seq.toList(Seq.delay(function()
     {
      return Seq.collect(function()
      {
       var item;
       item=Password.random(0,chars.get_Length()-1);
       return[_chars_.get_Item(item)];
      },Operators.range(1,length));
     }));
    },
    "generate'":function(settings)
    {
     var useUpperCase,useNumbers,useOther,chars,length;
     useUpperCase=settings.UpperCase;
     useNumbers=settings.Numbers;
     useOther=settings.Other;
     chars=Seq.toList(Seq.delay(function()
     {
      return Seq.append(Password.alpha(),Seq.delay(function()
      {
       return Seq.append(useUpperCase?Password.upperCase():Seq.empty(),Seq.delay(function()
       {
        return Seq.append(useNumbers?Password.numbers():Seq.empty(),Seq.delay(function()
        {
         if(useOther)
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
     length=settings.Length;
     return Password.generate(chars,length);
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
    strength:function(password)
    {
     var x,x1,f,f1,f3;
     x=(x1=(f=function(_arg1)
     {
      return Password.charStrength(_arg1);
     },Seq.sumBy(f,password)),(f1=function(x2)
     {
      var x3,value,f2;
      x3=(value=Number(x2),Math.log(value))*(Number(password.get_Length())/Math.log(2));
      f2=function(value1)
      {
       return Math.floor(value1);
      };
      return f2(x3);
     },f1(x1)));
     f3=function(_arg1)
     {
      var activePatternResult;
      activePatternResult=Password["|Weak|Medium|Strong|Best|"](_arg1);
      if(activePatternResult.$==1)
       {
        return{
         $:1
        };
       }
      else
       {
        if(activePatternResult.$==2)
         {
          return{
           $:2
          };
         }
        else
         {
          if(activePatternResult.$==3)
           {
            return{
             $:3
            };
           }
          else
           {
            return{
             $:0
            };
           }
         }
       }
     };
     return f3(x);
    },
    upperCase:Runtime.Field(function()
    {
     return Seq.toList(Operators.range(65,90));
    }),
    "|Alpha|Upper|Number|Punct|Other|":function(c)
    {
     var x,f,predicate,x2,f1,predicate1,x3,f2,predicate2,x4,f3,predicate3;
     if(x=Password.alpha(),(f=(predicate=function(x1)
     {
      return x1===c;
     },function(list)
     {
      return Seq.exists(predicate,list);
     }),f(x)))
      {
       return{
        $:0,
        $0:null
       };
      }
     else
      {
       if(x2=Password.upperCase(),(f1=(predicate1=function(x1)
       {
        return x1===c;
       },function(list)
       {
        return Seq.exists(predicate1,list);
       }),f1(x2)))
        {
         return{
          $:1,
          $0:null
         };
        }
       else
        {
         if(x3=Password.numbers(),(f2=(predicate2=function(x1)
         {
          return x1===c;
         },function(list)
         {
          return Seq.exists(predicate2,list);
         }),f2(x3)))
          {
           return{
            $:2,
            $0:null
           };
          }
         else
          {
           if(x4=Password.punctuation(),(f3=(predicate3=function(x1)
           {
            return x1===c;
           },function(list)
           {
            return Seq.exists(predicate3,list);
           }),f3(x4)))
            {
             return{
              $:3,
              $0:null
             };
            }
           else
            {
             return{
              $:4,
              $0:null
             };
            }
          }
        }
      }
    },
    "|Weak|Medium|Strong|Best|":function(x)
    {
     if(x>=128)
      {
       return{
        $:3,
        $0:null
       };
      }
     else
      {
       if(x<128?x>=64:false)
        {
         return{
          $:2,
          $0:null
         };
        }
       else
        {
         if(x<64?x>=56:false)
          {
           return{
            $:1,
            $0:null
           };
          }
         else
          {
           return{
            $:0,
            $0:null
           };
          }
        }
      }
    }
   },
   SettingsFormlet:{
    Client:{
     SettingsFormletViewer:Runtime.Class({
      get_Body:function()
      {
       return Client.formlet();
      }
     }),
     form:Runtime.Field(function()
     {
      var x,x1,x2,f,f1;
      x=(x1=Data.$(Data.$(Data.$(Data.$((x2=function(length)
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
      },Formlet1.Return(x2)),Client.lengthSelect()),Client.upperCaseCheckbox()),Client.numbersCheckbox()),Client.otherCheckbox()),(f=function(formlet)
      {
       return Enhance.WithSubmitAndResetButtons(formlet);
      },f(x1)));
      f1=function(formlet)
      {
       return Enhance.WithFormContainer(formlet);
      };
      return f1(x);
     }),
     formlet:Runtime.Field(function()
     {
      return Formlet1.Run(function(settings)
      {
       var password,_password_,f,folder,x1,matchValue,f1;
       password=Password["generate'"](settings);
       _password_=(f=(folder=function(x)
       {
        return function(y)
        {
         return x+String.fromCharCode(y);
        };
       },function(list)
       {
        return Seq.fold(folder,"",list);
       }),f(password));
       x1=(matchValue=Password.strength(password),matchValue.$==1?["Medium",50,"progress progress-warning"]:matchValue.$==2?["Strong",75,"progress progress-success"]:matchValue.$==3?["Best",100,"progress progress-info"]:["Weak",25,"progress progress-danger"]);
       f1=Runtime.Tupled(function(tupledArg)
       {
        var strength,width,cssClass;
        strength=tupledArg[0];
        width=tupledArg[1];
        cssClass=tupledArg[2];
        return Client.updateView(_password_,strength,width,cssClass);
       });
       return f1(x1);
      },Client.form());
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
     lengthSelect:Runtime.Field(function()
     {
      var x,f;
      x=Controls.Select(8,Client.lengthList());
      f=function(formlet)
      {
       return Enhance.WithTextLabel("Length",formlet);
      };
      return f(x);
     }),
     numbersCheckbox:Runtime.Field(function()
     {
      var x,f;
      x=Controls.Checkbox(false);
      f=function(formlet)
      {
       return Enhance.WithTextLabel("Numbers",formlet);
      };
      return f(x);
     }),
     otherCheckbox:Runtime.Field(function()
     {
      var x,f;
      x=Controls.Checkbox(false);
      f=function(formlet)
      {
       return Enhance.WithTextLabel("Other",formlet);
      };
      return f(x);
     }),
     updateView:function(password,strength,width,cssClass)
     {
      var _width_;
      _width_="width: "+Global.String(width)+"%;";
      jQuery("#password").attr("value",password);
      jQuery("#strengthLabel").text("Strength: "+strength);
      jQuery("#progressDiv").attr("class",cssClass);
      return jQuery("#progress").attr("style",_width_);
     },
     upperCaseCheckbox:Runtime.Field(function()
     {
      var x,f;
      x=Controls.Checkbox(false);
      f=function(formlet)
      {
       return Enhance.WithTextLabel("Upper Case",formlet);
      };
      return f(x);
     })
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Website=Runtime.Safe(Global.Website);
  Password=Runtime.Safe(Website.Password);
  Settings=Runtime.Safe(Password.Settings);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Seq=Runtime.Safe(WebSharper.Seq);
  Operators=Runtime.Safe(WebSharper.Operators);
  List=Runtime.Safe(WebSharper.List);
  Math=Runtime.Safe(Global.Math);
  Number=Runtime.Safe(Global.Number);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  SettingsFormlet=Runtime.Safe(Website.SettingsFormlet);
  Client=Runtime.Safe(SettingsFormlet.Client);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  Data=Runtime.Safe(Formlet.Data);
  Formlet1=Runtime.Safe(Formlet.Formlet);
  Enhance=Runtime.Safe(Formlet.Enhance);
  String=Runtime.Safe(Global.String);
  Controls=Runtime.Safe(Formlet.Controls);
  return jQuery=Runtime.Safe(Global.jQuery);
 });
 Runtime.OnLoad(function()
 {
  Client.upperCaseCheckbox();
  Client.otherCheckbox();
  Client.numbersCheckbox();
  Client.lengthSelect();
  Client.lengthList();
  Client.formlet();
  Client.form();
  Password.upperCase();
  Password.punctuation();
  Password.numbers();
  Password.alpha();
 });
}());
