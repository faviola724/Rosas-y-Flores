var ie5 = (navigator.appVersion.indexOf("MSIE 5.")==-1) ? false : true;
var ie6 = (navigator.appVersion.indexOf("MSIE 6.")==-1) ? false : true;
var ie7 = (navigator.appVersion.indexOf("MSIE 7.")==-1) ? false : true;
var ie8 = (navigator.appVersion.indexOf("MSIE 8.")==-1) ? false : true;
var ie9 = (navigator.appVersion.indexOf("MSIE 9.")==-1) ? false : true;
var ie = (navigator.appVersion.indexOf("MSIE ")==-1) ? false : true;

function alert_r(Objeto){
	alert(print_r(Objeto));
}

function print_r(x, max, sep, l) {
	l = l || 0;
	max = max || 10;
	sep = sep || ' ';
	if (l > max) {
		return "[WARNING: Too much recursion]\n";
	}
	var
		i,
		r = '',
		t = typeof x,
		tab = '';
	if (x === null) {
		r += "(null)\n";
	} else if (t == 'object') {
		l++;
		for (i = 0; i < l; i++) {
			tab += sep;
		}
		if (x && x.length) {
			t = 'array';
		}
		r += '(' + t + ") :\n";
		for (i in x) {
			try {
				r += tab + '[' + i + '] : ' + print_r(x[i], max, sep, (l + 1));
			} catch(e) {
				return "[ERROR: " + e + "]\n";
			}
		}
	} else {
		if (t == 'string') {
			if (x == '') {
				x = '(empty)';
			}
		}
		r += '(' + t + ') ' + x + "\n";
	}
	return r;
};
var_dump = print_r;










function Boom(){
	var ConstAltura = 220;
	if($("#FlotanteBoomid").length == 0){
		$("body").append("<div id='FlotanteBoomid'></div>");
		$(window).resize(function() {
			if($("#FlotanteBoomid").length > 0){
				if($("#FlotanteBoomid").is(":visible")){
					Boom();
				}
			}
		});
		$("#FlotanteBoomid").on("click", ".Fondo", function(){
			$("#FlotanteBoomid").fadeOut("fast");	
			if(ie7 || ie6){
				$("html").css("overflow-y", "auto");
			}else{
				$("body").css("overflow-y", "auto");
			}
		});
	}
	var T = '<div class="Fondo"></div><div class="Contenido"><div class="GaleriasBoom">';
	var A = new Array();
	var L = Articulos.length;
	var W = $(window).width();
	var H = $(window).height();
	var i, AR, j, SumaAlturas, WW;
	var Filas = new Array();
	Filas[0] = new Array(1, 0, 0, 0);
	var Contador = 0;
	var CF = 0;
	for(i in Articulos){
		Contador++;
		A = Articulos[i];
		AR = Math.round(ConstAltura * A[3] / A[4]);
		if((Filas[CF][2] + AR) > W){				
			CF++;
			Filas[CF] = new Array(Contador, Contador, AR, 0);
		}else{
			Filas[CF][1] = Contador;
			Filas[CF][2] += AR;
		}			
	}
	SumaAlturas = 0;	
	for(i in Filas){
		Contador = 0;
		SumaAlturas += Math.min(400, Math.round(W * ConstAltura / Filas[i][2]));		
		for(j in Articulos){
			Contador++;			
			if(Contador >= Filas[i][0] && Contador <= Filas[i][1]){
				if(SumaAlturas > H){
					Articulos[j][5] = 0;	
				}else{
					Articulos[j][5] = Math.min(400, Math.round(W * ConstAltura / Filas[i][2]) - 20);
				}
			}					
		}	
	}
	for(i in Articulos){			
		A = Articulos[i];	
		if(A[5] > 0){
			T = T + '<span class="Foto"><a href="' + A[1] + '"><img src="' + A[2] + '" alt="' + A[0] + '" title="' + A[0] + '" data-w=' + A[3] + ' data-h=' + A[4] + ' style="height:' + A[5] + 'px;" /></a></span>';
		}
	}
	T = T + '</div></div>';
	$("#FlotanteBoomid").html(T);
	if(ie7 || ie6){
		$("html").css("overflow-y", "hidden").css("overflow-x", "hidden");
	}else{
		$("body").css("overflow-y", "hidden").css("overflow-x", "hidden");
	}	
	Contador = 0;
	$("#FlotanteBoomid .Foto").hide().each(function(){		
		var Ref = $(this);
		Contador++;
		setTimeout(function(){
			Ref.fadeIn();
		}, Contador * 100);
	});
	
	$("#FlotanteBoomid").show().width($(window).width()).height($(window).height()).hide().fadeIn();
	$("#FlotanteBoomid .Fondo").width($("#FlotanteBoomid").width()).height($("#FlotanteBoomid").height());	
}

var PosicionDiapositivas = 0;
var TotalFotosDiapositivas = 5;
function Diapositivas(Bloque){	
	var T = ""; 
	var Contador = 0;
	var AD = new Array();
	if(Bloque > 0){
		TotalFotosDiapositivas = 0;
	}
	for(var i in Articulos){
		if(Bloque == 0){
			AD[i] = Articulos[i];
		}else{
			if(Articulos[i][8] == Bloque){
				AD[i] = Articulos[i];
				TotalFotosDiapositivas++;
			}
		}
	}	
	for(i in AD){
		A = AD[i];
		T = T + '<div class="Capa"><a href="' + A[1] + '"><img src="' + A[2] + '" class="Imagen" style="left:-' + A[10] + 'px; top:-' + A[11] + 'px;" /></a>' +
			'<div class="FondoTexto"></div><div class="Texto"><div class="Titulo"><a href="' + A[1] + '">' + A[0] + '</a></div><div class="Descripcion">' + A[7] + '</div></div></div>';
		Contador++;
		if(Contador >= TotalFotosDiapositivas){
			break;
		}
	}
	$(".Diapositivas .Capas").html(T).width(728 * TotalFotosDiapositivas);
	
	$(".Diapositivas .FlechaIzquierda").on("click", function(){
		PosicionDiapositivas--;
		if(PosicionDiapositivas < 0){
			PosicionDiapositivas = TotalFotosDiapositivas - 1;	
		}
		$(".Diapositivas .Capas").animate({
			top: 0,
			left: - PosicionDiapositivas * 728
		});
		CanceloClickDerecho();
		AjustoBolitas();
	});
	$(".Diapositivas .FlechaDerecha").on("click", function(){
		PosicionDiapositivas++;
		if(PosicionDiapositivas >= TotalFotosDiapositivas){
			PosicionDiapositivas = 0;	
		}
		$(".Diapositivas .Capas").animate({
			top: 0,
			left: - PosicionDiapositivas * 728
		});		
		CanceloClickDerecho();		
		AjustoBolitas();
	});
	
	$(".Diapositivas img.Imagen").each(function(){
		var AuxImagen = new Image();
		var Ref = $(this);
		AuxImagen.onload = function(){
			var W = AuxImagen.width;
			var H = AuxImagen.height;
			var W2 = 728;
			var H2 = 300;
			if((W/W2) >= (H/H2)){
				W = W * H2 / H;
				H = H2;
			}else{
				H = H * W2 / W;		
				W = W2;
			}
			Ref.width(W).height(H).fadeIn();
		};
		AuxImagen.src = $(this).attr("src");	
	});
}

function ListadoArticulos(){
	$(".ListadoArticulos a.Fotito span.EnvolturaFotito img").hide().each(function(){
		var AuxImagen = new Image();
		var Ref = $(this);
		AuxImagen.onload = function(){
			var W = AuxImagen.width;
			var H = AuxImagen.height;
			var W2 = 60;
			var H2 = 60;
			if((W/W2) >= (H/H2)){
				W = W * H2 / H;
				H = H2;
			}else{
				H = H * W2 / W;		
				W = W2;
			}
			Ref.width(W).height(H).fadeIn().on("mouseenter", function(){
				$(this).stop().animate({
					left: W2 - W,
					top: H2 - H
				}, 1000);
			}).on("mouseleave", function(){
				$(this).stop().animate({
					left: 0,
					top: 0
				}, 500);
			});
		};
		AuxImagen.src = $(this).attr("src");	
	});
}

var FlechaDerechaClickId;
var ClickDerecho = function(){
	FlechaDerechaClickId = setTimeout(function(){
		PosicionDiapositivas++;
		if(PosicionDiapositivas >= TotalFotosDiapositivas){
			PosicionDiapositivas = 0;	
		}
		$(".Diapositivas .Capas").animate({
			top: 0,
			left: - PosicionDiapositivas * 728
		});	
		ClickDerecho();
		AjustoBolitas();
	}, 10 * 1000);
};
var CanceloClickDerecho = function(){
	clearTimeout(FlechaDerechaClickId);
	ClickDerecho();
};

var AjustoBolitas = function(){	
	var T = (PosicionDiapositivas + 1).toString();
	$(".Diapositivas2 .d").removeClass("Oscurezco");
	$(".Diapositivas2 #d" + T).addClass("Oscurezco");
};	



$(document).ready(function(){
	$(".Boom").on("click", function(){		
		Boom();
	});
	if($(".Diapositivas").length > 0){
		if($("h1.Bloque").length > 0){
			Diapositivas($("h1.Bloque").data("id"));			
		}else{
			Diapositivas(0);	
		}
		ListadoArticulos();
		ClickDerecho();
	}
	$("span.VerEmail").on("click", function(){
		var EM = "editor";		
		EM = EM + "manuel+" + EmailAdicional;
		EM = EM + "@";
		EM = EM + "gmail.com";
		alert(EM);
	});	
	
	$(".ListadoArticulos2 .EnvolturaFotito img").hide().each(function(){
		var AuxImagen = new Image();
		var Ref = $(this);
		AuxImagen.onload = function(){
			var W = AuxImagen.width;
			var H = AuxImagen.height;
			var W2 = 320;
			var H2 = 140;
			if((W/W2) >= (H/H2)){
				W = W * H2 / H;
				H = H2;
			}else{
				H = H * W2 / W;		
				W = W2;
			}
			Ref.width(W).height(H).fadeIn().on("mouseenter", function(){
				$(this).stop().animate({
					left: W2 - W,
					top: H2 - H
				}, 1000).css("opacity", "1");
			}).on("mouseleave", function(){
				$(this).stop().animate({
					left: 0,
					top: 0
				}, 500);
			});
		};
		AuxImagen.src = $(this).attr("src");	
	});
	AjustoBolitas();
	$(".Diapositivas2 .d").on("click", function(){
		PosicionDiapositivas = parseInt($(this).attr("id").substr(1, 2)) - 1;		
		$(".Diapositivas .Capas").animate({
			top: 0,
			left: - PosicionDiapositivas * 728
		});		
		CanceloClickDerecho();		
		AjustoBolitas();
	});
	
	
	$(".ArticuloRelacionado2 .EnvolturaFotito img").hide().each(function(){
		var AuxImagen = new Image();
		var Ref = $(this);
		AuxImagen.onload = function(){
			var W = AuxImagen.width;
			var H = AuxImagen.height;
			var W2 = 160;
			var H2 = 80;
			if((W/W2) >= (H/H2)){
				W = W * H2 / H;
				H = H2;
			}else{
				H = H * W2 / W;		
				W = W2;
			}
			Ref.width(W).height(H).fadeIn().on("mouseenter", function(){
				$(this).stop().animate({
					left: W2 - W,
					top: H2 - H
				}, 1000).css("opacity", "1");
			}).on("mouseleave", function(){
				$(this).stop().animate({
					left: 0,
					top: 0
				}, 500);
			});
		};
		AuxImagen.src = $(this).attr("src");	
	});

	$("#CentroId").append('<div id="MenuXs">' + $("#MenuId").html() + '</div>');
	if(screen.width < 400){
		$("#HeaderId .Abajo .EnlaceHeader").each(function(){
			if($(this).attr("href") == "galerias" || $(this).attr("href") == "/galerias"){
				$(this).html("Galerías");
				return false;
			}
		});
	}


});


$(window).load(function() {		
	
});

$(document).ready(function(){
	var fr = function(){
		var r = $("#CapaCentradora").offset().left + 1010;		
		$("#CapaAdsenseFijo").css("left", r + "px");
	};	
	$(window).resize(fr);
	fr();
});

window.___gcfg = {lang: 'es'};
(function () {
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();


!function(a){a.cookieBar=function(b,c){if("cookies"==b)var d="cookies";else if("set"==b)var d="set";else var d=!1;var e={message:"Recogemos y usamos cookies para personalizar el contenido y los anuncios, ofrecer funciones de medios sociales y analizar el tráfico. Compartimos información sobre el uso que haga del sitio web con nuestros partners de redes sociales, publicidad y análisis web.&nbsp;",acceptButton:!0,acceptText:"Aceptar",acceptFunction:function(a){"enabled"!=a&&"accepted"!=a&&(window.location=window.location.href)},declineButton:!1,declineText:"Disable Cookies",declineFunction:function(a){"enabled"!=a&&"accepted"!=a||(window.location=window.location.href)},policyButton:!0,policyText:"Más información",policyURL:"/legal",autoEnable:!0,acceptOnContinue:!1,acceptOnScroll:!1,acceptAnyClick:!1,expireDays:365,renewOnVisit:!1,forceShow:!1,effect:"slide",element:"body",append:!0,fixed:!0,bottom:!0,zindex:"",domain:String(window.location.hostname),referrer:String(document.referrer)},b=a.extend(e,b),f=new Date;f.setTime(f.getTime()+864e5*b.expireDays),f=f.toGMTString();var h,j,g="cb-enabled={value}; expires="+f+"; path=/",i="",k=document.cookie.split("; ");for(h=0;h<k.length;h++)j=k[h].split("="),"cb-enabled"==j[0]&&(i=j[1]);if(""==i&&"cookies"!=d&&b.autoEnable?(i="enabled",document.cookie=g.replace("{value}","enabled")):"accepted"!=i&&"declined"!=i||"cookies"==d||!b.renewOnVisit||(document.cookie=g.replace("{value}",i)),b.acceptOnContinue&&b.referrer.indexOf(b.domain)>=0&&String(window.location.href).indexOf(b.policyURL)==-1&&"cookies"!=d&&"set"!=d&&"accepted"!=i&&"declined"!=i&&(d="set",c="accepted"),"cookies"==d)return"enabled"==i||"accepted"==i;if("set"==d&&("accepted"==c||"declined"==c))return document.cookie=g.replace("{value}",c),"accepted"==c;var l=b.message.replace("{policy_url}",b.policyURL);if(b.acceptButton)var m='<span class="cb-enable">'+b.acceptText+"</span>";else var m="";if(b.declineButton){'<a href="" class="cb-disable">'+b.declineText+"</a>"}else;if(b.policyButton)var o='<a rel="nofollow" href="'+b.policyURL+'" class="cb-policy">'+b.policyText+"</a>";else var o="";if(b.fixed)if(b.bottom)var p=' class="fixed bottom"';else var p=' class="fixed"';else var p="";if(""!=b.zindex)var q=' style="z-index:'+b.zindex+';"';else var q="";(b.forceShow||"enabled"==i||""==i)&&(b.append?a(b.element).append('<div id="cookie-bar"'+p+q+'><div class="cookies-bar-inner">'+m+"<p>"+l+o+"</p></div></div>"):a(b.element).prepend('<div id="cookie-bar"'+p+q+'><div class="cookies-bar-inner">'+m+"<p>"+l+o+"</p></div></div>"));var r=function(c){b.acceptOnScroll&&a(document).off("scroll"),"function"==typeof c&&c(i),"slide"==b.effect?a("#cookie-bar").slideUp(300,function(){a("#cookie-bar").remove()}):"fade"==b.effect?a("#cookie-bar").fadeOut(300,function(){a("#cookie-bar").remove()}):a("#cookie-bar").hide(0,function(){a("#cookie-bar").remove()}),a(document).unbind("click",u)},s=function(){document.cookie=g.replace("{value}","accepted"),r(b.acceptFunction)},t=function(){var a=new Date;for(a.setTime(a.getTime()-864e6),a=a.toGMTString(),k=document.cookie.split("; "),h=0;h<k.length;h++)j=k[h].split("="),j[0].indexOf("_")>=0?document.cookie=j[0]+"=0; expires="+a+"; domain="+b.domain.replace("www","")+"; path=/":document.cookie=j[0]+"=0; expires="+a+"; path=/";document.cookie=g.replace("{value}","declined"),r(b.declineFunction)},u=function(b){a(b.target).hasClass("cb-policy")||s()};if(a("#cookie-bar .cb-enable").click(function(){return s(),!1}),a("#cookie-bar .cb-disable").click(function(){return t(),!1}),b.acceptOnScroll){var w,x,v=a(document).scrollTop();a(document).on("scroll",function(){w=a(document).scrollTop(),x=w>v?w-v:v-w,console.log(x),x>400&&s()})}b.acceptAnyClick&&a(document).bind("click",u)}}(jQuery);

$(document).ready(function(){
//	$("#cookie-bar div.cookies-bar-inner").css("max-width", "850px");
	$.cookieBar({
		policyURL: '/legal',
	});
});

$(document).ready(function(){
	$("#FooterId").html('<a href="legal" rel="nofollow">Aviso legal</a> <span>&bull;</span><a href="legal#contacto" rel="nofollow">Contacto</a><div class="clearBoth"></div>');
});

$(document).ready(function(){
	$("div.Arriba span.MenuMovil, #MenuMovil").on("click", function(){
		$("div.Abajo").slideDown();
		$("div.Arriba span.MenuMovil, #MenuMovil").remove();
	});
});

