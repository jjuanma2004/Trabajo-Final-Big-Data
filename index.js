var body_parser = require('body-parser');
var express     = require('express');
var fs          = require('fs');
var URL         = require('url-parse');
var app         = express();
const WebCrawler = require('./WebCrawler');

app.use(express.static("cliente"));
app.use(body_parser.urlencoded({extended:true}));

app.post("/cargarwebcrawler",function(req,res){
    // var user=req.body.user || '';
    // var pass=req.body.pass || '';
    WebCrawler.Rastrear();
})

app.post("/mostrarwebcrawler",function(req,res){
    // var user=req.body.user || '';
    // var pass=req.body.pass || '';
    fs.readFile('recursos/webcrawler.json', 'utf8', function(err, contents) {
        // console.log(contents);
        PaginaRetorno=contents;
        res.end(PaginaRetorno);
    });
   
})

app.post("/Porcentajewebcrawler",function(req,res){
    var porcentaje=WebCrawler.ObtenerPorcentajewebcrawler();
    res.end(porcentaje);
})

app.listen(80, function () {
  console.log('Escuchando por el puerto 80');
});

