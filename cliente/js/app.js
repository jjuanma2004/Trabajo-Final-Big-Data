var myVar;
    function  CargarWebcrawler(){
        var Alerta=document.getElementById('Alerta');
        Alerta.innerHTML=NotiWebCwarler();
        myVar = setInterval(ObtenerPorcentajewebcrawler, 500);
        $.post('/cargarwebcrawler',
        {
        }, (response) => {
            myVar="";
            Alerta.innerHTML=FinalizarWebCrawler();
        })
        
    }
    function MostrarWebcrawler(){
        var Pantalla=document.getElementById('WebCrawler');
        var Contenedor=document.getElementById('collapseOne');
        if(Contenedor.getAttribute('class').toString!='hide collapse'){
            $.post('/mostrarwebcrawler',
            {
            }, (response) => {
                Pantalla.innerHTML=response;
            })
        }
    }

    function ObtenerPorcentajewebcrawler(){
        var Porcentaje=document.getElementById('Porcentajewebcrawler');
        $.post('/Porcentajewebcrawler',
        {
        }, (response) => {
            Porcentaje.innerHTML=response;
        })
    }

    function NotiWebCwarler(){
        return '<div class="alert alert-primary alert-dismissible fade show" role="alert">'+
        '<h4 class="alert-heading">Web crawler</h4>El Archivo Web crawler esta en proceso de creación <div id="Porcentajewebcrawler">0</div>%'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
          '<span aria-hidden="true">&times;</span>'+
        '</button>'+
      '</div>';
    }
    function FinalizarWebCrawler(){
        return '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
        '<h4 class="alert-heading">Web crawler</h4>El Archivo Web crawler se a creado'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
          '<span aria-hidden="true">&times;</span>'+
        '</button>'+
      '</div>';
    }

    