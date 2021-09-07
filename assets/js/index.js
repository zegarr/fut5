let jugSel = [];
let jugPreCar = [
{nombre : "enzo", valor : 10 },
{nombre : "pedro", valor: 9} ,
{nombre : "adrian", valor : 7} ,
{nombre : "rebasti", valor : 8} ,
{nombre : "nico", valor : 7} ,
{nombre : "tanque", valor : 7} ,
{nombre : "ignacio", valor : 7} ,
{nombre : "diegoJp", valor : 7 },
{nombre : "jp", valor : 7} ,
{nombre : "pelado", valor : 6} ,
{nombre : "federicoAdrian", valor : 6} ,
{nombre : "ema", valor : 2} ,
{nombre : "eze", valor : 5} ,
{nombre : "piyu", valor : 5} ,
{nombre : "emiliano", valor : 5} , 
{nombre : "botta", valor : 4} ,
{nombre : "facuBarrios", valor : 4} ,
{nombre : "caracas", valor : 3} ,
{nombre : "guille", valor : 3} ,
{nombre : "tubino", valor : 3} ,
{nombre : "gaston", valor : 2}
];
let errores = {
	cantMaxJugadores:"Maximo 10 jugadores",
	cantMaxNombre:"Nombre entre 3 y 15 caracteres",
	cantMaxPuntaje:"Puntaje Entre 1 y 10",
	faltanJugadores:"Deben ser 10 jugadores"
};

$(document).ready(function($) {
	mostrarJugadoresPrecargados();
	$("#btnGenerar").on("click", generarEquipos);
	$("#btnAgregarJugador").on("click", nuevoJugador);
});

function nuevoJugador(){
	let nom = $("#txtNom").val();
	let pun = $("#txtPun").val();
	if((!isNaN(parseInt(pun)) && (pun>=1 && pun<=10))&& (nom.length>=3 && nom.length<15) ){
		if(jugSel.length<10){
			jugSel.push({nombre:nom,valor:pun});
			mostrarJugadoresSeleccionados();
		}else{
			alert(errores.cantMaxJugadores);
		}
	}else{
		alert(errores.cantMaxNombre + " y " + errores.cantMaxPuntaje);
	}
	$("#txtNom").val("");
	$("#txtPun").val("");
}

function generarEquipos(){
	if(jugSel.length == 10){
		do{
			var equipo1 = [];
			var equipo2 = [];
			let sel = jugSel.slice();//clonar para eviar referencias
			var cantPunt1 = cantPunt2 =0;
			for (var i = 0; i <5; i++) {
				var randomIndex = Math.floor(Math.random() * sel.length);
				equipo1.push({nombre:sel[randomIndex].nombre,valor:sel[randomIndex].valor});//agrego a equipo1
				cantPunt1 += sel[randomIndex].valor;
				sel.splice(randomIndex,1);//elimino

				randomIndex = Math.floor(Math.random() * sel.length);
				equipo2.push({nombre:sel[randomIndex].nombre,valor:sel[randomIndex].valor});//agrego a equipo2
				cantPunt2 += sel[randomIndex].valor;
				sel.splice(randomIndex,1);//elimino
			}
		} while (Math.abs(cantPunt1-cantPunt1) >3);
		let res = equipo1.concat(equipo2);//uno los dos equipos
		//muestro los equipos resultantes y el puntaje total para cada uno
		mostrarJugadoresSeleccionados(res);
	}else{
		alert(errores.faltanJugadores)
	}
}

function agregarJugador(){
	if(jugSel.length<10){
		let indice = $(this).attr('j');
		jugSel.push(jugPreCar[indice]);
		jugPreCar.splice(indice, 1);
		mostrarJugadoresPrecargados();
		mostrarJugadoresSeleccionados();
	}else{
		alert(errores.cantMaxJugadores);
	}
}
function eliminarJugador(){
	let indice = $(this).attr('j');
	jugPreCar.push(jugSel[indice]);
	jugSel.splice(indice, 1);
	mostrarJugadoresPrecargados();
	mostrarJugadoresSeleccionados();
}

function mostrarJugadoresPrecargados(){
	$("#jugadoresPreCargados").html("");
	jugPreCar.sort((a,b)=>{
		return b.valor - a.valor;
	});
	jugPreCar.forEach(function(valor, indice, array) {
		let html='<tr>';
		html+='<td style="text-align: center;">'+valor.nombre+'</td>';
		html+='<td style="text-align: center;">'+valor.valor+'</td>';
		html+='<td style="text-align: center;"><button class="btn btn-sm btn-primary agregarJugador" j="'+indice+'"><i class="fa fa-plus"></i></button></td>';
		html+='</tr>';
		$("#jugadoresPreCargados").append(html);
	});
	$(".agregarJugador").on("click", agregarJugador);
}

function mostrarJugadoresSeleccionados(equipos = null){
	let equi = jugSel;
	if(equipos!==null){
		equi = equipos;
	}
	$("#equipo1").html("");
	$("#equipo2").html("");
	//ordeno jugadores Seleccionados
	//equi.sort((a,b)=>{return b.valor - a.valor;});
	let pos = 0,nroE = 1;
	let total=0;
	equi.forEach(function(jugador, indice) {
		pos++;
		if(pos==6){
			nroE=2;
			total=0;
		}
		let html='<tr>';
		html+='<td style="text-align: center;">'+jugador.nombre+'</td>';
		html+='<td style="text-align: center;">'+jugador.valor+'</td>';
		html+='<td style="text-align: center;"><button class="btn btn-sm btn-danger eliminarJugador" j="'+indice+'"><i class="fa fa-trash"></i></button></td>';
		html+='</tr>';
		$("#equipo"+nroE).append(html);
		total+=jugador.valor
		$("#totalEquipo"+nroE).html(total);
	});
	$(".eliminarJugador").on("click", eliminarJugador);
}