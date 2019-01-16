//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Definicion de la data a utilizar///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ventas = ["Categoria",[
["Comida",[["Cereales",["Cereal 1,178,78,35,105","Cereal 2,245,210,80,160","Cereal 3,5,25,99,73"]],
           ["Carnes",["Carne 1,69,190,234,78","Carne 2,210,247,185,192","Carne 3,74,170,27,207"]],
           ["Postres",["Postre 1,215,235,212,175","Postre 2,209,210,210,209"]]]],
["Electrodoméstico",[["Lavadoras",["Lavadora 1,27,19,42,11","Lavadora 2,10,58,2,20"]],
                     ["Microondas",["Microondas 1,64,57,81,43"]]]],
["Equipo de Deporte",[["Balones",["Balón 1,61,29,120,102","Balón 2,77,48,241,242","Balón 3,89,56,231,76","Balón 4,124,175,105,200"]],
                      ["Uniformes",["Uniforme 1,94,84,104,214","Uniforme 2,222,215,196,188"]]]]
]];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Definicion del json a utilizar con la libreria Highcharts//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var jsonHighcharts = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Ventas por Mes'
    },
    subtitle: {
        text: 'Fuente: Agile Solutions'
    },
    xAxis: {
        categories: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Ventas'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0">{point.y} Ventas</td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.1,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Producto',
        data: [49, 216, 194, 95]
    }]
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Inicializacion de los ComboBox///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inicializarComboBoxes(){
    $("#categoria").html("");
    for(var i=0;i<ventas[1].length;i++){
        $("#categoria").append(`<option value="${i}">${ventas[1][i][0]}</option>`);
    }
    $("#producto").html("");
    for(var j=0;j<ventas[1][0][1].length;j++){
        $("#producto").append(`<option value="${j}">${ventas[1][0][1][j][0]}</option>`);
    }
    $("#marca").html("");
    for(var k=0;k<ventas[1][0][1][0][1].length;k++){
        var marca = [];
        marca = ventas[1][0][1][0][1][k].split(",").slice();
        $("#marca").append(`<option value="${k}">${marca[0]}</option>`);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Control de cambios en los ComboBox///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#categoria").change(function(){
    //console.log($("#categoria option:selected").text());
    var i = ($("#categoria").val());

    $("#producto").html("");
    for(var j=0;j<ventas[1][i][1].length;j++){
        $("#producto").append(`<option value="${j}">${ventas[1][i][1][j][0]}</option>`);
    }
    $("#marca").html("");
    for(var k=0;k<ventas[1][i][1][0][1].length;k++){
        var marca = [];
        marca = ventas[1][i][1][0][1][k].split(",").slice();
        $("#marca").append(`<option value="${k}">${marca[0]}</option>`);
    }

    jsonHighcharts.series = [obtenerNuevoHighcharts()];
    Highcharts.chart('container', jsonHighcharts);
});

$("#producto").change(function(){
    var i = ($("#categoria").val());
    var j = ($("#producto").val());

    $("#marca").html("");
    for(var k=0;k<ventas[1][i][1][j][1].length;k++){
        var marca = [];
        marca = ventas[1][i][1][j][1][k].split(",").slice();
        $("#marca").append(`<option value="${k}">${marca[0]}</option>`);
    }

    jsonHighcharts.series = [obtenerNuevoHighcharts()];
    Highcharts.chart('container', jsonHighcharts);
});

$("#marca").change(function(){
    jsonHighcharts.series = [obtenerNuevoHighcharts()];
    Highcharts.chart('container', jsonHighcharts);
});

(function inicializar(){
    inicializarComboBoxes();
    //console.log(actualizarHighcharts());
    jsonHighcharts.series = [obtenerNuevoHighcharts()];
    Highcharts.chart('container', jsonHighcharts);
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Obteniendo los nuevos datos de acuerdo a nueva seleccion///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function obtenerNuevoHighcharts(){
    var jsonDatos = {};
    var m1 = $("#marca option:selected").text();
    //console.log("Este es el valor de marca: "+m1);
    for(var i=0;i<ventas[1].length;i++){
        for(var j=0;j<ventas[1][i][1].length;j++){
            for(var k=0;k<ventas[1][i][1][j][1].length;k++){
                var m2 = [];
                m2 = ventas[1][i][1][j][1][k].split(",").slice();
                if(m2[0] == m1){
                    jsonDatos.name =  m2[0];
                    jsonDatos.data =  [Number(m2[1]), Number(m2[2]), Number(m2[3]), Number(m2[4])];
                    return jsonDatos;
                }
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Mostrando grafica de entrada con valores por defecto///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Highcharts.chart('container', jsonHighcharts);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////