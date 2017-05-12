<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta content="IE=edge" http-equiv="X-UA-Compatible">
		<meta charset="utf-8">
		<meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<meta name="theme-color" content="#000">
		<title>Bioinformática</title>
		<meta name="description" content="Canto noroeste" />
		<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="assets/css/animate.css">
		<link rel="stylesheet" type="text/css" href="assets/css/style.css">
		<link rel="shortcut icon" href="assets/img/favicon.png">
	</head>
	<body class="body">
		<header class="header">
		</header>
		<section class="conteudo">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<div class="title">
							<h1>Bioinformática</h1>
						</div>
					</div>
					<div class="col-xs-12">
						<div class="contain-form">

						</div>

						<!-- <form action="" method="POST" enctype="multipart/form-data">
							<label for="file">Selecione um arquivo .pdb</label>
							<input type="file" name="file" accept=".pdb">
							<input type="submit" name="upload_btn" value="upload">
						</form> -->

						<?php

							// Salva o arquivo .pdb
							// if($_FILES['file']['name']):
							// 	$target_Path = 'files/';
							// 	$target_Path = $target_Path.basename( $_FILES['file']['name'] );
							// 	move_uploaded_file( $_FILES['file']['tmp_name'], $target_Path );
							// endif;



							// Abre o arquivo
							$file = fopen ('1pth.pdb', 'r');

							// Arrays de ligantes e átomos
							$atoms = array();
							$atomsA = array();
							$atomsB = array();
							$ligantes = array();
							$ligantesA = array();
							$ligantesB = array();

							// Lê o arquivo até o fim
							while (!feof ($file)):
								//Lê um alinha do arquivo
								$sentence = fgets($file, 4096);

								// Separa a linha em partes
								$inicio     = preg_replace('/\s+/', '', substr($sentence, 0, 6));
								$serial     = preg_replace('/\s+/', '', substr($sentence, 6, 5));
								$name       = preg_replace('/\s+/', '', substr($sentence, 12, 3));
								$altLoc     = preg_replace('/\s+/', '', substr($sentence, 17, 4));
								$resName    = preg_replace('/\s+/', '', substr($sentence, 20, 2));
								$chainID    = preg_replace('/\s+/', '', substr($sentence, 22, 4));
								$x          = preg_replace('/\s+/', '', substr($sentence, 30, 8));
								$y          = preg_replace('/\s+/', '', substr($sentence, 38, 8));
								$z          = preg_replace('/\s+/', '', substr($sentence, 46, 8));
								$occupancy  = preg_replace('/\s+/', '', substr($sentence, 54, 6));
								$tempFactor = preg_replace('/\s+/', '', substr($sentence, 60, 6));
								$element    = preg_replace('/\s+/', '', substr($sentence, 76, 2));


								if (strpos($inicio, 'ATOM') !== false):

									// if(strpos($resName, 'A') !== false):
									if(strpos($resName, 'A') !== false):
										// Array de átomo
										$atom = array(
											'inicio'     => $inicio,
											'serial'     => $serial,
											'name'       => $name,
											'altLoc'     => $altLoc,
											'resName'    => $resName,
											'chainID'    => $chainID,
											'x'          => $x,
											'y'          => $y,
											'z'          => $z,
											'occupancy'  => $occupancy,
											'tempFactor' => $tempFactor,
											'element'    => $element,
										);
										array_push($atomsA, $atom);

									elseif(strpos($resName, 'B') !== false):
										// Array de átomo
										$atom = array(
											'inicio'     => $inicio,
											'serial'     => $serial,
											'name'       => $name,
											'altLoc'     => $altLoc,
											'resName'    => $resName,
											'chainID'    => $chainID,
											'x'          => $x,
											'y'          => $y,
											'z'          => $z,
											'occupancy'  => $occupancy,
											'tempFactor' => $tempFactor,
											'element'    => $element,
										);
										array_push($atomsB, $atom);
									else:
									endif;

								elseif(strpos($inicio, 'HETATM') !== false):

									if($resName === 'A'):
										// Array de ligante
										$ligante = array(
											'inicio'     => $inicio,
											'serial'     => $serial,
											'name'       => $name,
											'altLoc'     => $altLoc,
											'resName'    => $resName,
											'chainID'    => $chainID,
											'x'          => $x,
											'y'          => $y,
											'z'          => $z,
											'occupancy'  => $occupancy,
											'tempFactor' => $tempFactor,
											'element'    => $element,
										);
										array_push($ligantesA, $ligante);

									elseif($resName === 'B'):
										// Array de ligante
										$ligante = array(
											'inicio'     => $inicio,
											'serial'     => $serial,
											'name'       => $name,
											'altLoc'     => $altLoc,
											'resName'    => $resName,
											'chainID'    => $chainID,
											'x'          => $x,
											'y'          => $y,
											'z'          => $z,
											'occupancy'  => $occupancy,
											'tempFactor' => $tempFactor,
											'element'    => $element,
										);
										array_push($ligantesB, $ligante);

									else:
									endif;
								endif;

							endwhile;

							foreach ($atomsA as $key => $value) {
								echo '<pre>';
									foreach ($value as $k => $v) {
											var_dump($k);

										foreach ($v as $ke => $va) {
										}
									}
								echo '</pre>';
							}

							// array_push($atoms, $atomsA);
							// array_push($atoms, $atomsB);
							// array_push($ligantes, $ligantesA);
							// array_push($ligantes, $ligantesB);

							echo '<pre>';
								// var_dump($atoms);
							echo '</pre>';

							echo '<pre>';
								// print_r($atoms);
							echo '</pre>';

							echo '<pre>';
								// print_r($ligantes);
							echo '</pre>';

							//Fecha o arquivo
							fclose ($file);

// [inicio] => ATOM
// [serial] => 1
// [name] => N
// [altLoc] => VAL
// [resName] => A
// [chainID] => 33
// [x] => 23.325
// [y] => 10.492
// [z] => 177.722
// [occupancy] => 1.00
// [tempFactor] => 40.58
// [simbolo] => N

// ATOM      1  N   VAL A  33      23.325  10.492 177.722  1.00 40.58           N




//  1 -  6        Record name   "ATOM  "
//  7 - 11        Integer       serial       Atom  serial number.
// 13 - 16        Atom          name         Atom name.
// 17             Character     altLoc       Alternate location indicator.
// 18 - 20        Residue name  resName      Residue name.
// 22             Character     chainID      Chain identifier.
// 23 - 26        Integer       resSeq       Residue sequence number.
// 27             AChar         iCode        Code for insertion of residues.

// 31 - 38        Real(8.3)     x            Orthogonal coordinates for X in Angstroms.
// 39 - 46        Real(8.3)     y            Orthogonal coordinates for Y in Angstroms.
// 47 - 54        Real(8.3)     z            Orthogonal coordinates for Z in Angstroms.
// 55 - 60        Real(6.2)     occupancy    Occupancy.
// 61 - 66        Real(6.2)     tempFactor   Temperature  factor.
// 77 - 78        LString(2)    element      Element symbol, right-justified.
// 79 - 80        LString(2)    charge       Charge  on the atom.








function euclidian() {

}







						?>

					</div>
				</div>
			</div>
			<span class="info">
				<strong class="access">i</strong>
				<strong class="close">x</strong>
			</span>
			<div class="desc-info">
				<h2>Aula bioinformática</h2>
				<h3>Exercício em sala de Bioinformática - Sistemas de informação - UniBH</h3>
				<ul>
					<li>Desenvolvedor: Davidson Silva - 11424797</li>
					<li>Professora: valdete</li>
				</ul>

			</div>
			<div class="rights">
				<!-- PHP YEAR
				<span>Davidson UNIBH - <?php echo date('Y'); ?> </span>
				-->
				<span>Davidson UNIBH - 2017</span>
			</div>
		</section>
		<footer class="footer">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
					</div>
				</div>
			</div>
		</footer>
		<!-- <script type="text/javascript" src="assets/js/jquery.min.js"></script> -->
		<!-- <script type="text/javascript" src="assets/js/wow.js"></script> -->
		<!-- <script type="text/javascript" src="assets/js/scripts.js"></script> -->
	</body>
</html>

