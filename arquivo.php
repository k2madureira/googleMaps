<?php


require('spreadsheet-reader-master/php-excel-reader/excel_reader2.php');
require('spreadsheet-reader-master/SpreadsheetReader.php');

	$Reader = new SpreadsheetReader('enderecos.xlsx');


    $cont = 0;
	foreach ($Reader as $Row)
	{
		$enderecos[$cont] = $Row[0];
		
		$cont++;
	}

	$enderecos = json_encode($enderecos);
	echo $enderecos;
//var_dump($xlsx->sheet);


?>