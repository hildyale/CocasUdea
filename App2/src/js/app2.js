var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split ("&");
var params = {};
var caloriasCalculoCorrecto;

for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
if (params['num']) {
   caloriasCalculoCorrecto=params['num'];
    
   
    
} else {
   console.log('No se envió el parámetro variable');
}

//Harinas 
function loadHarinas() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='harinas' value='266'><img src='src/images/Harinas/pizza.png'/></button></div> <div class='item'><button id='harinas' value='113'><img src='src/images/Harinas/bread.png'/></button></div><div class='item'><button id='harinas' value='348'><img src='src/images/Harinas/cereals.png'/></button></div><div class='item'><button id='harinas' value='263'><img src='src/images/Harinas/corndog.png'/></button></div><div class='item'><button id='harinas' value='386'><img src='src/images/Harinas/croissant.png'/></button></div><div class='item'><button id='harinas' value='324'><img src='src/images/Harinas/flour.png'/></button></div><div class='item'><button id='harinas' value='293'><img src='src/images/Harinas/intbread.png'/></button></div><div class='item'><button id='harinas' value='77'><img src='src/images/Harinas/potato.png'/></button></div><div class='item'><button id='harinas' value='311'><img src='src/images/Harinas/friedpotatoes.png'/></button></div><div class='item'><button id='harinas' value='320'><img src='src/images/Harinas/pretzel.png'/></button></div><div class='item'><button id='harinas' value='226'><img src='src/images/Harinas/taco.png'/></button></div><div class='item'><button id='harinas' value='159'><img src='src/images/Harinas/yuca.jpg'/></button></div><div class='item'><button id='harinas' value='109'><img src='src/images/Harinas/arepa.jpg'/></button></div><div class='item'><button id='harinas' value='200'><img src='src/images/Harinas/platano_maduro.jpg'/></button></div><div class='item'><button id='harinas' value='122'><img src='src/images/Harinas/platano_verde.png'/></button></div><div class='item'><button id='harinas' value='130'><img src='src/images/Harinas/rice.png'/></button></div><div class='item'><button id='harinas' value='113'><img src='src/images/Harinas/mazorca.jpg'/></button></div><div class='item'><button id='harinas' value='158'><img src='src/images/Harinas/spaguetti.png'/></button></div><div class='item'><button id='harinas' value='52'><img src='src/images/Harinas/galleta_soda.jpg'/></button></div>"
            );
    
}

//Nueces y Semillas 
function loadNuezSemillas() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button value='58'><img src='src/images/Nueces y semillas/girasol.png'/></button></div><div class='item'><button value='200'><img src='src/images/Nueces y semillas/hazelnut.png'/></button></div><div class='item'><button value='170'><img src='src/images/Nueces y semillas/pistachio.png'/></button></div>"
            );
    
}

//Lacteos 
function loadLacteos() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='lacteos' value='146'><img src='src/images/Lacteos/milk.png'/></button></div><div class='item'><button  id='lacteos' value='248'><img src='src/images/Lacteos/leche_polvo.jpg'/></button></div> <div class='item'><button id='lacteos' value='100'><img src='src/images/Lacteos/yogurt.png'/></button></div>"
            );
    
}
//Quesos y Sustitutos 
function loadQuesoSustitutos() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button value='100'><img src='src/images/Quesos y sustitutos/quesito.jpg'/></button></div><div class='item'><button value='124'><img src='src/images/Quesos y sustitutos/mozarella.png'/></button></div><div class='item'><button value='380'><img src='src/images/Quesos y sustitutos/embutido.jpg'/></button></div><div class='item'><button value='336'><img src='src/images/Quesos y sustitutos/salami.png'/></button></div><div class='item'><button value='400'><img src='src/images/Quesos y sustitutos/sausage.png'/></button></div><div class='item'><button id='carnes' value='80'><img src='src/images/Quesos y sustitutos/egg.jpg'/></button></div>"
            );
    
}
//Grasas 
function loadGrasas() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='grasas' value='322'><img src='src/images/Grasas/avocado.png'/></button></div><div class='item'><button id='grasas' value='160'><img src='src/images/Grasas/coco.png'/></button></div> <div class='item'><button id='grasas' value='102'><img src='src/images/Grasas/mantequilla.png'/></button></div><div class='item'><button id='grasas' value='57'><img src='src/images/Grasas/mayonesa.png'/></button></div><div class='item'><button id='grasas' value='9'><img src='src/images/Grasas/vinagre.png'/></button></div>"
            );
    
}
//Leguminosas 
function loadLeguminosas() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='leguminosas' value='116'><img src='src/images/Leguminosas/lentejas.jpg'/></button></div><div class='item'><button id='leguminosas' value='112'><img src='src/images/Leguminosas/frijoles.jpg'/></button></div><div class='item'><button id='leguminosas' value='316'><img src='src/images/Leguminosas/garbanzo.jpg'/></button></div>"
            );
    
}
//Frutas 
function loadFrutas() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='frutas' value='72'><img src='src/images/Frutas/apple.png'/></button></div><div class='item'><button  id='frutas' value='105'><img src='src/images/Frutas/banana.png'/></button></div> <div class='item'><button id='frutas' value='58'><img src='src/images/Frutas/cherry.png'/></button></div><div class='item'><button id='frutas' value='110'><img src='src/images/Frutas/grape.png'/></button></div><div class='item'><button  id='frutas' value='105'><img src='src/images/Frutas/grenade.png'/></button></div><div class='item'><button id='frutas' value='47'><img src='src/images/Frutas/kiwi.png'/></button></div><div class='item'><button id='frutas' value='17'><img src='src/images/Frutas/lemon.png'/></button></div> <div class='item'><button id='frutas' value='20'><img src='src/images/Frutas/lime.png'/></button></div><div class='item'><button id='frutas' value='107'><img src='src/images/Frutas/mango.png'/></button></div><div class='item'><button  id='frutas' value='53'><img src='src/images/Frutas/melon.png'/></button></div><div class='item'><button id='frutas' value='62'><img src='src/images/Frutas/orange.png'/></button></div><div class='item'><button id='frutas' value='55'><img src='src/images/Frutas/papaya.png'/></button></div><div class='item'><button id='frutas' value='38'><img src='src/images/Frutas/peach.png'/></button></div> <div class='item'><button id='frutas' value='96'><img src='src/images/Frutas/pear.png'/></button></div><div class='item'><button  id='frutas' value='74'><img src='src/images/Frutas/pineapple.png'/></button></div><div class='item'><button id='frutas' value='30'><img src='src/images/Frutas/plum.png'/></button></div><div class='item'><button id='frutas' value='64'><img src='src/images/Frutas/raspberry.png'/></button></div><div class='item'><button id='frutas' value='49'><img src='src/images/Frutas/strawberry.png'/></button></div><div class='item'><button id='frutas' value='46'><img src='src/images/Frutas/watermelon.png'/></button></div>"
            );
    
}
//Verduras 
function loadVerduras() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='verduras' value='84'><img src='src/images/Verduras/artichoke.png'/></button></div><div class='item'><button id='verduras' value='6'><img src='src/images/Verduras/asparagus.png'/></button></div> <div class='item'><button id='verduras' value='58'><img src='src/images/Verduras/beet.png'/></button></div><div class='item'><button id='verduras' value='24'><img src='src/images/Verduras/bell-pepper.png'/></button></div><div class='item'><button id='verduras' value='31'><img src='src/images/Verduras/broccoli.png'/></button></div><div class='item'><button id='verduras' value='21'><img src='src/images/Verduras/cabbage.png'/></button></div><div class='item'><button id='verduras' value='25'><img src='src/images/Verduras/cauliflower.png'/></button></div><div class='item'><button id='verduras' value='16'><img src='src/images/Verduras/cucumber.png'/></button></div><div class='item'><button id='verduras' value='44'><img src='src/images/Verduras/tomato.png'/></button></div><div class='item'><button id='verduras' value='10'><img src='src/images/Verduras/lettuce.png'/></button></div><div class='item'><button id='verduras' value='22'><img src='src/images/Verduras/mushroom.png'/></button></div><div class='item'><button id='verduras' value='42'><img src='src/images/Verduras/onion.png'/></button></div><div class='item'><button id='verduras' value='24'><img src='src/images/Verduras/onion-egg.png'/></button></div> <div class='item'><button id='verduras' value='42'><img src='src/images/Verduras/onion-white.png'/></button></div><div class='item'><button id='verduras' value='19'><img src='src/images/Verduras/radish.png'/></button></div>"
            );
    
}
//Carnes 
function loadCarnes() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='carnes' value='48'><img src='src/images/Carnes/camaron.png'/></button></div> <div class='item'><button id='carnes' value='208'><img src='src/images/Carnes/cerdo.png'/></button></div><div class='item'><button id='carnes' value='260'><img src='src/images/Carnes/atun.png'/></button></div><div class='item'><button id='carnes'value='178'><img src='src/images/Carnes/fried-chicken.png'/></button></div><div class='item'><button id='carnes' value='108'><img src='src/images/Carnes/ham.png'/></button></div><div class='item'><button  id='carnes' value='186'><img src='src/images/Carnes/pollosinpiel.png'/></button></div><div class='item'><button id='carnes' value='285'><img src='src/images/Carnes/pollofrito.png'/></button></div><div class='item'><button id='carnes' value='170'><img src='src/images/Carnes/turkey.png'/></button></div>"
            );
    
}
//Dulces 
function loadDulces() {        
    $("#foods").empty();
    $(".container").append(
            "<div class='item'><button id='dulces' value='133'><img src='src/images/Dulces/nutella.png'/></button></div><div class='item'><button id='dulces' value='223'><img src='src/images/Dulces/chocolate.png'/></button></div> <div class='item'><button id='dulces' value='388'><img src='src/images/Dulces/cookies.png'/></button></div><div class='item'><button id='dulces' value='227'><img src='src/images/Dulces/cupcake.png'/></button></div><div class='item'><button id='dulces' value='250'><img src='src/images/Dulces/doughnut.png'/></button></div><div class='item'><button id='dulces' value='128'><img src='src/images/Dulces/honey.png'/></button></div><div class='item'><button id='dulces' value='145'><img src='src/images/Dulces/ice-cream.png'/></button></div><div class='item'><button id='dulces' value='287'><img src='src/images/Dulces/ice-cream-2.png'/></button></div><div class='item'><button id='dulces' value='119'><img src='src/images/Dulces/jam.png'/></button></div><div class='item'><button id='dulces' value='225'><img src='src/images/Dulces/pancakes.png'/></button></div><div class='item'><button id='dulces' value='350'><img src='src/images/Dulces/pie.png'/></button></div><div class='item'><button id='dulces' value='120'><img src='src/images/Dulces/pudding.png'/></button></div><div class='item'><button id='dulces' value='88'><img src='src/images/Dulces/coke.png'/></button></div><div class='item'><button id='dulces' value='193'><img src='src/images/Dulces/azucar.jpg'/></button></div><div class='item'><button id='dulces' value='180'><img src='src/images/Dulces/panela.jpg'/></button></div>"
            );
    
}

/*Función para elegir la comida*/
function ElegirComida() {
//Ingresamos un mensaje a mostrar

$('.endFood').prop('disabled', true);//Desactivar boton de finalziar comida
    var comida = prompt("Seleccione el NÚMERO de la comida\n\n (1) Desayuno\n (2) Entre Comidas\n (3) Almuerzo\n (4) Cena", );    

//Detectamos si el usuario ingreso un valor
    switch (comida) {
    case "1":
        document.querySelector('#etiquetaComida').innerText = 'Desayuno';            
        break;
    case "2":
        document.querySelector('#etiquetaComida').innerText = 'Entre comidas';
        break;
    case "3":
        document.querySelector('#etiquetaComida').innerText = 'Almuerzo';
        break;
    case "4":
        document.querySelector('#etiquetaComida').innerText = 'Cena';
        break;   
        default:
            ElegirComida();
}
}



$(document).ready(function() {
 var options = {minMargin: 5, maxMargin: 15, itemSelector: ".item", firstItemClass: "first-item"};
 $(".container").rowGrid(options);
    $(".container").append(
     "<p>IMPORTANTE: Seleccione uno de los botones en la parte superior para empezar a elegir los elementos que armarán su comida, cada imagen de un alimento representa una porción de la misma, puede agregar tantas porciones como desee, cuando sienta que ha finalizado la selección de alimentos de click en finalizar comida y se realizará el cálculo correpondiente</p>"                      
                       
);

 ElegirComida();

});

var sumaCalorias=0;//Aquí se almacenan os valores de las calorías
var mensajeNutrientes="";
var idAlimento;//Almacena el nombre del id del alimento
var contHarina=0, contLacteos=0, contGrasas=0, contLeguminosas=0, contFrutas=0, contVerduras=0, contCarnes=0, contDulces=0;//Controlar los mensajes que se agregan
var porcentajeComida=0;

function calculoComidas(caloriasInput){
    /*Aquí calculamos porcentajes sanos en calorias
    Desayuno 20%
    Entre comidas 25%
    Almuerzo 30%
    Cena 25%    
    */
    switch (document.querySelector('#etiquetaComida').innerText) {
    case "Desayuno":
        porcentajeComida=caloriasInput*(20/100);          
        break;
    case "Entre comidas":
        porcentajeComida=caloriasInput*(25/100);
        break;
    case "Almuerzo":
        porcentajeComida=caloriasInput*(30/100);
        break;
    case "Cena":
        porcentajeComida=caloriasInput*(25/100);
        break;   
}
    if(sumaCalorias>porcentajeComida){
    document.getElementById("imagenEstado").src = "src/images/triste.png";
        mensajeNutrientes=mensajeNutrientes+"\n¡Cuidado! esta comida excede el número de calorias que debería tener "+porcentajeComida+"%";        
    }else{
    document.getElementById("imagenEstado").src = "src/images/feliz.png";
        
    }
}

function agregarMensaje(element){
	
		switch (element) {
    case "harinas":
                contHarina++;
                if(contHarina==1){
        mensajeNutrientes=mensajeNutrientes+"-Tu comida contiene harinas elige siempre sin refinar para aumentar el consumo de fibra y mejorar los procesos digestivos. Tener en cuenta que éstos son la principal fuente de energía por lo cual en ningún momento se deben omitir en la alimentación.\n";}         
        break;    
    case "lacteos":
                contLacteos++;
                if(contLacteos==1){
        mensajeNutrientes=mensajeNutrientes+"-Tu comida contiene lacteos consume mínimo dos porciones al día. Estos productos son fuente importante de proteína y calcio que te ayudará a fortalecer huesos y a mejorar la contracción muscular.\n";}
        break;    
    case "grasas":
                contGrasas++;
                if(contGrasas==1){
        mensajeNutrientes=mensajeNutrientes+"-Elige aceites vegetales para cocinar y en ensaladas como parte de las vinagretas, en vez de utilizar margarinas, mantequillas y mantecas fuentes de grasas saturada y grasas trans, las cuales son responsables de aumentar el riesgo de enfermedades cardiovasculares.\n";}     
        break;
    case "leguminosas":
                 contLeguminosas++;
                if(contLeguminosas==1){
        mensajeNutrientes=mensajeNutrientes+"-Elige entre pollo, pescado, carnes rojas y leguminosas como frijol, garbanzo, lentejas o soya o sustitutos como el huevo, además recuerda disminuir el consumo de los embutidos, el tocino y otras carnes procesadas, ya que por su alto contenido de grasa y sodio representan un factor de riesgo para la salud. Los frutos y las semillas proporcionan grasas saludables, antioxidantes y fibra benéficos para tu salud, recuerda consumir la cantidad recomendada para no aumentar la ingesta calórica en exceso.\n";}
        break;
    case "frutas":
                contFrutas++;
                if(contFrutas==1){
        mensajeNutrientes=mensajeNutrientes+"-Tu comida contiene frutas que nos aportan agua, vitaminas, minerales, fibra y diferentes compuestos beneficiosos para el organismo. Por sus antioxidantes, previenen el envejecimiento prematuro de las células, dándote una piel más limpia, joven, suave y sana y mayor calidad de vida.\n";}
        break;
    case "verduras":
                contVerduras++;
                if(contVerduras==1){
        mensajeNutrientes=mensajeNutrientes+"-Entre más cantidad y variedad de frutas y vegetales mejor. La recomendación es consumir 5 porciones al día, mezclarlas en colores y texturas para tener un mayor aporte de nutrientes, fibra y antioxidantes. Previenen enfermedades cardiovasculares, diferentes tipos de cánceres, diabetes, sobrepeso, además de deficiencia de micronutrientes.\n";}
        break;
    case "carnes":
                contCarnes++;
                if(contCarnes==1){
        mensajeNutrientes=mensajeNutrientes+"-Tu comida contiene carne rica en proteinas y hierro recuerda moderar su consumo.\n";}
        break;    
    case "dulces":
                contDulces++;
                if(contDulces==1){
        mensajeNutrientes=mensajeNutrientes+"-Tu comida contiene azucar, no deben superar un rango entre 5 y 10% de la ingesta calórica total, lo que equivaldría aproximadamente a una chocolatina pequeña, 2 cucharadas soperas de azúcar o 5 confites. Prefiere los alimentos naturales y con el sabor original sin adicionar aditivos dulces, recuerda que dentro de este grupo está el azúcar refinado, la panela, la miel, los dulces como galletas, confites, chocolatinas y aquellos productos que en sus ingredientes contengan endulzantes calóricos.\n";}
        break;
        default:
         mensajeNutrientes="";
}
	}

$(function() {//Al presionar uno de los botones
 $(document).on('click', 'button', function(event) {
 		
     if(this.id!="gruposComidas"){
         $('#menuComidas button').prop('disabled', true);//Desactivar botones de las categorias
         $(this).addClass('cambioColor');
         $(this).prop('disabled', true);//Desactivamos para que no lo clickeen 2 veces       
         idAlimento=this.id;//Almacenamos la categoria del alimento seleccionado
         
    sumaCalorias = sumaCalorias + parseInt(this.value);
         }
  });
});

function sumarComida(){//Realiza el  calculo de las calorias y reactiva botones
    
        agregarMensaje(idAlimento);//Envíamos id para agregar mensaje        
         $('#menuComidas button').prop('disabled', false);//Habilitar botones de las categorias
         $('#foods button').removeClass('cambioColor');
         $('#foods button').prop('disabled', false);//Habilitar botones de la comida
         //('#foods button').prop('disabled', true);//Desactivar botones de los alimentos
         if(sumaCalorias!=0){$('.endFood').prop('disabled', false);}//Desactivar boton de finalziar comida
        
}

function faltaNutriente(){
    if(contHarina==0){mensajeNutrientes=mensajeNutrientes+"\n\nSe debe consumir una harina por comida"}
    if(contVerduras==0){mensajeNutrientes=mensajeNutrientes+"\n\nDebe haber dos porciones  de verduras al dia"}
    if(contCarnes==0){mensajeNutrientes=mensajeNutrientes+"\n\nSe debe consumir carne almenos 1 vez al dia"}
       
}

function finSuma(){//Finaliza comida y empieza de nuevo
    calculoComidas(caloriasCalculoCorrecto);
    faltaNutriente();
    
    if (confirm("Calorias aproximadas totales: "+ sumaCalorias+ "\n\n"+mensajeNutrientes) == true) {
        $('#menuComidas button').prop('disabled', false);//Habilitar botones de las categorias
    $('#foods button').removeClass('cambioColor');
    $('#foods button').prop('disabled', false);//Habilitar botones de la comida
         //('#foods button').prop('disabled', true);//Desactivar botones de los alimentos
         sumaCalorias = 0;
        contHarina=0, contLacteos=0, contGrasas=0, contLeguminosas=0, contFrutas=0, contVerduras=0, contCarnes=0, contDulces=0;//Reinicio de variables
        mensajeNutrientes=" ";//Reinicio de mensajes
        ElegirComida();//Reiniciamos
    } else {
        alert("Nos veremos proximamente!");
    }  
    
    
}

    


