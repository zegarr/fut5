<?php

$j = array(
	"ariel" => 10 ,
	"jose" => 10 ,
	"enzo" => 10 ,
	"pedro" => 9 ,
	"adrian" => 8 ,
	"rebasti" => 8 ,
	"nico" => 7 ,
	"tanque" => 7 ,
	"ignacio" => 7 ,
	"diegoJp" => 7 ,
	"jp" => 7 ,
	"pelado" => 6 ,
	"federicoAdrian" => 6 ,
	"ema" => 6 ,
	"eze" => 5 ,
	"piyu" => 5 ,
	"guille" => 5 ,
	"botta" => 4 ,
	"facuBarrios" => 4 ,
	"caracas" => 4 ,
	"tubino" => 3 ,
	"gaston" => 2,
);

$total =0;
$totalE1 =0;
$totalE2 =0;
$e1 = $e2 = array();

if(!empty($_POST)){
	do{
		$total =0;
		$totalE1 =0;
		$totalE2 =0;
		$e1 = $e2 = array();

		$seleccionadosSelected = array();
		$seleccionados = array();
		foreach ($_POST["seleccionados"] as $key => $value) {
			$seleccionadosSelected[$value] = $j[$value];
			$seleccionados[$value] = $j[$value];
			$total+= $j[$value];
		}

		$ppe = $total/2;
		$e1 = $e2 = array();
		$count =0;

		while( ($count < 5) && ((array_sum($e1) <= $ppe) and (array_sum($e2) <= $ppe)) ){
			$count++;
			$rand_plyr1 = array_rand($seleccionados);
			$e1 [$rand_plyr1]= $seleccionados[$rand_plyr1];
			$totalE1 += $seleccionados[$rand_plyr1];
			unset($seleccionados[$rand_plyr1]);

			$rand_plyr2 = array_rand($seleccionados);
			$e2 [$rand_plyr2]= $seleccionados[$rand_plyr2];
			$totalE2 += $seleccionados[$rand_plyr2];
			unset($seleccionados[$rand_plyr2]);
		}
	}
	while (abs($totalE1 - $totalE2) > 1); 
}

?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	<title>fut5</title>
	
	<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
	<link rel="stylesheet" href="assets/css/styles.css">
	<link rel="icon" type="image/png" sizes="192x192" href="assets/img/logo.png">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 style="text-align: center;margin: 17px;margin-bottom: 27px;"><em style="color: #888888;">fut</em><strong>5</strong></h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h1 style="text-align: center;margin-bottom: 30px;"><small><em>tabla</em></small><strong>jugadores</strong></h1>
				<div class="table-responsive table-borderless" style="border-radius: 10px;border: 3px solid rgba(0,0,0,0.17) ;">
					<table class="table table-striped table-bordered table-hover table-sm">
						<thead>
							<tr>
								<th style="text-align: center;">Nombre</th>
								<th style="text-align: center;">Puntaje</th>
								<th style="text-align: center;">Seleccionar</th>
							</tr>
						</thead>
						<tbody>
							<?php 
							foreach ($j as $key => $value) {
								?>
								<tr>
									<td style="text-align: center;"><?php echo $key ?></td>
									<td style="text-align: center;"><?php echo $value ?></td>
									<td style="text-align: center;"><input type="checkbox" form='random' value="<?php echo $key ?>"  name="seleccionados[]" <?php if ( (!empty($_POST)) and (array_key_exists($key, $seleccionadosSelected))) { echo "checked=''"; } ?>></td>
								</tr>
								<?php 
							}
							?>
						</tbody>
					</table>
				</div>
			</div>
			<div class="col">
				<form id="random" method="POST" style="text-align: center;">
					<h1 style="text-align: center;margin-bottom: 30px;"><small><em>generar</em></small><strong>equipos&nbsp;</strong><button id="btnRandom" class="btn btn-primary btn-sm" type="submit"><i class="fas fa-random"></i></button></h1>
				</form>

				<div class="row">
					<div class="col-6">
						
						<h3 style="text-align: center;margin-bottom: 30px;"><em>equipo</em><strong>1&nbsp;</strong></h3>
						<div class="table-responsive table-borderless" style="border-radius: 10px;border: 3px solid rgba(0,0,0,0.17);margin-top: 30px;">
							<table class="table table-striped table-bordered table-hover table-sm">
								<thead>
									<tr>
										<th style="text-align: center;">Nombre</th>
										<th style="text-align: center;">Puntaje</th>
									</tr>
								</thead>
								<tbody>
									<?php if (!empty($_POST)): 
										foreach ($e1 as $key => $value) {
											?>
											<tr>
												<td style="text-align: center;"><?php echo $key ?></td>
												<td style="text-align: center;"><?php echo $value ?></td>
											</tr>
										<?php }
									endif ?>
									<tr>
										<td colspan="2" style="text-align: center;"><h5>Puntos Totales: <b><?php echo $totalE1 ?></b></h5></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="col-6">
						<h3 style="text-align: center;margin-bottom: 30px;"><em>equipo</em><strong>2&nbsp;</strong></h3>
						<div class="table-responsive table-borderless" style="border-radius: 10px;border: 3px solid rgba(0,0,0,0.17);margin-top: 30px;">
							<table class="table table-striped table-bordered table-hover table-sm">
								<thead>
									<tr>
										<th style="text-align: center;">Nombre</th>
										<th style="text-align: center;">Puntaje</th>
									</tr>
								</thead>
								<tbody>
									<?php if (!empty($_POST)): 
										foreach ($e2 as $key => $value) {
											?>
											<tr>
												<td style="text-align: center;"><?php echo $key ?></td>
												<td style="text-align: center;"><?php echo $value ?></td>
											</tr>
										<?php }
									endif ?>
									<tr>
										<td colspan="2" style="text-align: center;"><h5>Puntos Totales: <b><?php echo $totalE2 ?></b></h5></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>				
			</div>
		</div>
	</div>
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
	<script>
		$(document).ready(function() {
			$("input[type='checkbox']").on("click", function(){
				console.log("asd");
				if($("input[type='checkbox']:checked").length == 10){
					$("#btnRandom").removeAttr('hidden');
				}else{
					$("#btnRandom").attr('hidden', 'true');
				}
			});
		});
	</script>
</body>

</html>