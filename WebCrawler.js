var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');

var UrlInicial="https://www.wikipedia.org";
var NumeroMaximoPagina=100;
var NumeroPaginaVisitada=0;
var PaginasVisitadas=[];
var PaginasAVisitar=[];
var Url=new URL(UrlInicial);
var BaseUrl=Url.protocol+"//"+Url.hostname;
PaginasAVisitar.push(UrlInicial);

function IniciarEscaneo(){
  NumeroPaginaVisitada=0;
  PaginasVisitadas=[];
  PaginasAVisitar=[];
  PaginasAVisitar.push(UrlInicial);
  Rastrear();
}

function Rastrear(){
  //condición para saber si no se a consultado el numero maximo de paginas
  if(NumeroPaginaVisitada>=NumeroMaximoPagina){
    console.log(JSON.stringify(PaginasVisitadas));
    console.log("Terminado Rastrear las primeras "+NumeroMaximoPagina);
    EscribirJson();
    return;
  }
  var ProximaPagina=PaginasAVisitar.pop();

  if(ProximaPagina in PaginasVisitadas){
    Rastrear();
  }else{
    VisitarPagina(ProximaPagina,Rastrear);
  }
}
var Contador=0;

function VisitarPagina(url, callback){
  //se agrega la pagina al arreglo y se aumenta el valor de la paginas visitadas
  // PaginasVisitadas[url]=true;
  
  var Pagina={url:url, ranking:0,enlaces:"", ruta:""};
 
  if(PaginasVisitadas.find((elemento)=>elemento.url==url)==undefined){
    Pagina.ruta=['recursos/html/pagina'+NumeroPaginaVisitada.toString()+'.html',
    url];
  PaginasVisitadas.push(Pagina);
  NumeroPaginaVisitada++;
  console.log("Numero Pagina "+NumeroPaginaVisitada);
  if(Contador>=10){
    EscribirJson();
    Contador=0;
  }else{
    Contador++;
  }
  
  }

  request(url,function(error,response,body){

    /*
    codigo = 200 indica que la pagina esta correcta
    si la pagina retorna un codigo diferente a 200 indica que la pagina 
    a presentado un error
    */
    if(response!=undefined){
      var $ = cheerio.load(body);
      
      GuardarHtml($,body);
      if(response.statusCode!==200){
        callback();
        return;
      }
      
      if(PaginasAVisitar.length<=1000){
      ColectarRutas($);
      }
      callback();
    }

  });
}

function ColectarRutas($){
    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function() {
      var href=$(this).attr('href');
      if(href.indexOf("//")==0){
        href=Url.protocol+href;
      }
      if(href.indexOf("/")==0){
        href=Url.protocol+"//"+Url.hostname+href;
      }
        if(href!="/" &&
            PaginasVisitadas.find((elemento)=>elemento.url==href)==undefined) 
            {
              PaginasAVisitar.push(href);
        }
    });
}

function EscribirJson(){
    fs.writeFile('recursos/webcrawler.json', JSON.stringify(PaginasVisitadas), function(err){
      if (err) throw err;
        // console.log('Creado archivo Json del Web Crawler');
    })
}

function GuardarHtml($,body){
    fs.writeFile('recursos/html/pagina'+NumeroPaginaVisitada.toString()+'.html', body, function(err){
    if (err) throw err;
      // console.log('Creado archivo Json del Web Crawler');
  })
}

function ObtenerPorcentajewebcrawler(){
  return (NumeroPaginaVisitada*100/NumeroMaximoPagina).toString();
}

exports.ObtenerPorcentajewebcrawler=ObtenerPorcentajewebcrawler;
exports.Rastrear=IniciarEscaneo;