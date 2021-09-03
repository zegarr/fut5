let jugSel = [];
let jugPreCar = [
{"nombre" : "enzo", "valor" : 10 },
{"nombre" : "pedro", "valor": 9} ,
{"nombre" : "adrian", "valor" : 7} ,
{"nombre" : "rebasti", "valor" : 8} ,
{"nombre" : "nico", "valor" : 7} ,
{"nombre" : "tanque", "valor" : 7} ,
{"nombre" : "ignacio", "valor" : 7} ,
{"nombre" : "diegoJp", "valor" : 7 },
{"nombre" : "jp", "valor" : 7} ,
{"nombre" : "pelado", "valor" : 6} ,
{"nombre" : "federicoAdrian", "valor" : 6} ,
{"nombre" : "ema", "valor" : 2} ,
{"nombre" : "eze", "valor" : 5} ,
{"nombre" : "piyu", "valor" : 5} ,
{"nombre" : "emiliano", "valor" : 5} ,
{"nombre" : "botta", "valor" : 4} ,
{"nombre" : "facuBarrios", "valor" : 4} ,
{"nombre" : "caracas", "valor" : 3} ,
{"nombre" : "guille", "valor" : 3} ,
{"nombre" : "tubino", "valor" : 3} ,
{"nombre" : "gaston", "valor" : 2}
];

$(document).ready(function($) {
	mostrarJugadoresPrecargados();
	$("#btnGenerar").on("click", generarEquipos);
});

function generarEquipos(){

}

function agregarJugador(){
	if(jugSel.length<10){
		let indice = $(this).attr('j');
		jugSel.push(jugPreCar[indice]);
		jugPreCar.splice(indice, 1);
		mostrarJugadoresPrecargados();
		mostrarJugadoresSeleccionados();
	}else{
		alert("capo, en fut5 son 10 jugadores maximo");
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

function mostrarJugadoresSeleccionados(){
	$("#equipo1").html("");
	$("#equipo2").html("");
	//ordeno jugadores Seleccionados
	jugSel.sort((a,b)=>{return b.valor - a.valor;});
	let pos = 0,nroE = 1;
	jugSel.forEach(function(valor, indice, array) {
		pos++;
		if(pos>5){
			nroE=2;
		}
		let html='<tr>';
		html+='<td style="text-align: center;">'+valor.nombre+'</td>';
		html+='<td style="text-align: center;">'+valor.valor+'</td>';
		html+='<td style="text-align: center;"><button class="btn btn-sm btn-danger eliminarJugador" j="'+indice+'"><i class="fa fa-trash"></i></button></td>';
		html+='</tr>';
		$("#equipo"+nroE).append(html);
	});
	$(".eliminarJugador").on("click", eliminarJugador);
}