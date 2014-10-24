/*FeedEk jQuery RSS/ATOM Feed Plugin v2.0
* http://jquery-plugins.net/FeedEk/FeedEk.html  
* https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com */

(function($){
    $.fn.FeedEk=function(opt){
        var def=$.extend({
            FeedUrl:"http://rss.cnn.com/rss/edition.rss",MaxCount:5,ShowDesc:true,
            ShowPubDate:true,CharacterLimit:0,TitleLinkTarget:"_blank",
            DateFormat:"",DateFormatLang:"en",
        },opt);
        var id=$(this).attr("id"),i,s="",dt;
        $("#"+id).empty().append('<img src="loader.gif" />');
        $.ajax({
            url:"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="+ def.MaxCount+"&output=json&q="+encodeURIComponent(def.FeedUrl)+"&hl=en&callback=?",
            dataType:"json",
            success:function(data){
                $("#"+id).empty();
                $.each(data.responseData.feed.entries,function(e,item){
                    //console.log(item.title+'id='+e);
                    s+='<li><div class="itemTitle"><a href="#'+e+'" data-rel="'+e+'" data-transition="slidedown">'+item.title+"</div>";
                    if(def.ShowPubDate){
                        dt=new Date(item.publishedDate);
                        if($.trim(def.DateFormat).length>0){
                            try{
                                moment.lang(def.DateFormatLang);
                                s+='<div class="itemDate">'+moment(dt).format(def.DateFormat)+"</div>";
                            }catch(e){
                                s+='<div class="itemDate">'+dt.toLocaleDateString()+"</div>";
                            }
                        }else{
                            s+='<div class="itemDate">'+dt.toLocaleDateString()+"</div>";
                        }
                    }
                    if(def.ShowDesc){
                        if(def.DescCharacterLimit>0&&item.content.length>def.DescCharacterLimit){
                            s+='<div class="itemContent">'+
                                item.content.substr(0,def.DescCharacterLimit)+"...</div>";
                        }else{
                            s+='<div class="itemContent">'+item.content+"</div></a>";
                        }
                    }
                    var header ='<div data-role="page" id="'+e+'"><div data-role="header" data-position="fixed" data-theme="b"><h1>Ciudad Maracay</h1><a href="#home" id="home" data-rel="home" class="ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-home show-page-loading-msg" data-textonly="false" data-textvisible="true" data-msgtext="Cargando" data-inline="true" data-theme="b">Actualizar</a></div>';
                    var content = '<div data-role="main" class="ui-content"><h3 style="text-align: justify;">'+item.title+'</h3><div class="itemContent">'+item.content+'</div></div>';
                    var news_detail = header + content;
                    $('body').append(news_detail);
                });
                $("#"+id).append('<ul class="feedEkList">'+s+"</ul>");
            }
        });
    }
})(jQuery)