(function($) {

	/* Variáveis globais */
	var demanda, estoque, clicou = 0;

    $(document).ready(function(){});

	function createTable2(demanda, estoque){
		setTimeout(function(){

		},1000);
	}

	/* Realiza o caĺcúlo de custo */
	function calcula(rows, cols){
	  	var estoqueArray = [], somaEst = 0; // Uso
	  	var demandaArray = [], somaDem = 0; // Uso
	  	var custoList = {}, seletor;
	  	var selecteds = new Array(), indice = 0; //Uso
	  	var cust = new Array();

		$('tr td:last-child input').each(function(){
	    	estoqueArray.push(this.value);
		});

		$('tr:last-child td input').each(function(){
	    	demandaArray.push(this.value);
		});

		// Salva os custos
		var plus, indica = 0;
		for (var x = 1; x <= rows; x++) {
			for (var y = 1; y <= cols; y++) {
	  			seletor = $('#cel'+x+y+' input');
				$(seletor).each(function(){
			  		custoList[this.name.toString()] = this.value;
			  		plus = this.value.toString();
			  		cust[indica] = 'cel'+x+y+'-'+plus;
			  		indica++;
				});
			}
		}

		// Verifica se não existe valores iguais a 0 nos estoques e nas demandas
		for (var x = 0; x <= rows; x++) {
			for (var y = 0; y <= cols; y++) {
				if (estoqueArray[x] == 0 || demandaArray[y] == 0) {
					alert('Demanda e estoque não podem ter valores menores que 1');
					return false;
				}
			}
		}

		// Zera todas as células após conferência de estoque e demanda acima
		for (var x = 0; x <= rows; x++) {
			for (var y = 0; y <= cols; y++) {
	  			seletor = $('#cel'+x+y+' input');
				seletor.val(0);
			}
		}


	  	console.log(estoqueArray);
	  	console.log(demandaArray);

	  	for (var i in estoqueArray){
			somaEst = somaEst + parseInt(estoqueArray[i]);
	   	}
	   	for (var j in demandaArray) {
	   		somaDem = somaDem + parseInt(demandaArray[j]);
  		}

  		if(somaEst && somaDem){
	  		$('#result-est').text(somaEst);
	  		$('#result-dem').text(somaDem);
	  		if (somaDem != somaEst) {
	  			rows++; cols++;
	  			alert('É preciso normalizar a tabela.\n Seção ainda não implementada!');

	  			if (somaDem > somaEst) {

	  			}else{

	  			}
	  		}else{
	  			$('#basicTable').after('<div id="bx-result"><span id="tipo" class="equilibrada">Distiribuição equilibrada</span></div>');
	  			var i = 0, j = 0, valRow, valCol, auxRow, auxCol;

				auxRow = parseInt(estoqueArray[i]);
				auxCol = parseInt(demandaArray[j]);
				i++;
				j++;
				seletor = $('#cel'+i+j+' input');

				// Resolução célula (1,1)
				if (auxCol < auxRow) {
					seletor.val(auxCol);
					seletor.addClass('used');
					selecteds[indice] = 'cel'+i+j;
					indice++;
					valCol = 0;
					valRow = auxRow - auxCol;
					j++;

				}else if(auxCol > auxRow) {
					seletor.val(auxRow);
					seletor.addClass('used');
					selecteds[indice] = 'cel'+i+j;
					indice++;
					valRow = 0;
					valCol = auxCol - auxRow;
					i++;

				}else if(auxCol == auxRow){
					seletor.val(auxRow);
					seletor.addClass('used');
					selecteds[indice] = 'cel'+i+j;
					indice++;
					valRow = 0;
					valCol = 0;
					i++;
					j++;
				}

	  			console.log('Célula: 1-1 já foi ');

	  			for(i; i <= rows; i++){
	  				for(j; j <= cols; j++){
	  					seletor = $('#cel'+i+j+' input');
	  					console.log('0. (i,j): '+i, j);

	  					if (valRow == 0  && valCol == 0) {
	  						console.log('1. Equals: '+valRow, valCol);
		  					auxRow = parseInt(estoqueArray[i-1]);
							auxCol = parseInt(demandaArray[j-1]);
							console.log('2. Atribuiu valores aux: '+auxRow, auxCol);

		  					if (auxCol < auxRow) {
		  						console.log('3. auxCol < auxCol: '+auxRow, auxCol);
								seletor.val(auxCol);
								seletor.addClass('used');
								selecteds[indice] = 'cel'+i+j;
								indice++;
								valRow = auxRow - auxCol;
								valCol = 0;
								console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
								if (j < cols && j != 0){
									console.log('5. Mantém (i,j): '+i,j);
								}else{
									j--;
									console.log('5. j--: '+j);
								}

							}else if(auxCol > auxRow) {
		  						console.log('3. auxCol > auxCol: '+auxRow, auxCol);
								seletor.val(auxRow);
								seletor.addClass('used');
								selecteds[indice] = 'cel'+i+j;
								indice++;
								valRow = 0;
								valCol = auxCol - auxRow;
								console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
								if (i < rows){
									i++;
									console.log('5. i++: '+i);

								}else{
									i--;
									console.log('5. i--: '+i);
								}
								if (j > 0) {
									j--;
									console.log('5. j--: '+j);
								}

							}else if(auxCol == auxRow){
		  						console.log('3. auxCol == auxCol: '+auxRow, auxCol);
								seletor.val(auxRow);
								seletor.addClass('used');
								selecteds[indice] = 'cel'+i+j;
								indice++;
								valRow = 0;
								valCol = 0;
								console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
								if (j < cols && i < rows){
									i++;
									console.log('5. i++: '+i);
								}
							}

	  					}else{
	  						console.log('1. Diferent: '+valRow, valCol);
							console.log('2. Valores aux: '+auxRow, auxCol);

		  					if (valCol < valRow) {
		  						if (valCol == 0) {
									auxCol = parseInt(demandaArray[j-1]);
		  							valCol = auxCol;
		  							console.log('3. valCol < valRow: '+valCol, valRow);

		  						}else{
		  							console.log('3. valCol < valRow: '+valCol, valRow);

		  						}

		  						if (valRow == valCol) {
									seletor.val(valRow);
									seletor.addClass('used');
									selecteds[indice] = 'cel'+i+j;
									indice++;
									valRow = 0;
									valCol = 0;
									console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
									if (j < cols && i < rows){
										i++;
										console.log('5. i++: '+i);
									}

		  						}else if(valCol < valRow){
									seletor.val(valCol);
									seletor.addClass('used');
									selecteds[indice] = 'cel'+i+j;
									indice++;
									valRow = valRow - valCol;
									valCol = 0;
									console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
									if (j < cols && valCol != 0){
										j++;
										console.log('5. j++: '+j);
									}else if (j == cols){
										j = j-2 ;
										console.log('5. j--: '+j);
									}

		  						}else if(valRow < valCol){
		  							if(valRow == 0){
		  								auxRow == estoqueArray[i-1];
		  								valCol == auxRow;
		  							}
		  							seletor.val(valRow);
									seletor.addClass('used');
									selecteds[indice] = 'cel'+i+j;
									indice++;
		  							valCol = valCol - valRow;
		  							valRow = 0;
									console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
									if (i < rows){
										i++;
										j--;
										console.log('5. i++ && j--: '+i, j);
									}else{
										i--;
										console.log('5. i--: '+i);
									}
		  						}

							}else if(valCol > valRow) {
		  						if (valRow == 0) {
		  							auxRow = estoqueArray[i-1];
		  							valRow = auxRow;
		  							console.log('3. valCol > valRow: '+valCol, valRow);

		  						}else{
		  							console.log('3. valCol > valRow: '+valCol, valRow);

		  						}

								if (valRow == valCol) {
									seletor.val(valRow);
									seletor.addClass('used');
									selecteds[indice] = 'cel'+i+j;
									indice++;
									auxRow = estoqueArray[i-1];
									auxCol = demandaArray[j-1];

									valRow = auxRow;
									valCol = auxCol;
									console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
									if (j < cols && i < rows){
										i++;
										console.log('5. i++: '+i);
									}



		  						}else if(valCol < valRow){
									seletor.val(valCol);
									seletor.addClass('used');
									selecteds[indice] = 'cel'+i+j;
									indice++;
									valRow = valRow - valCol;
									valCol = 0;
									console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
									if (j < cols && valCol != 0){
										j++;
										console.log('5. j++: '+j);
									}else if (j == cols){
										j = j-2 ;
										console.log('5. j-2: '+j);
									}

		  						}else if(valRow < valCol){
		  							if(valRow == 0){
		  								auxRow == estoqueArray[i-1];
		  								valCol == auxRow;
		  							}
		  							seletor.val(valRow);
									seletor.addClass('used');
									selecteds[indice] = 'cel'+i+j;
									indice++;
		  							valCol = valCol - valRow;
		  							valRow = 0;
									console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
									if (i < rows){
										i++;
										j--;
										console.log('5. i++ && j--: '+i, j);
									}else{
										i--;
										console.log('5. i--: '+i);
									}
		  						}

							}else if(valCol == valRow){
		  						console.log('3. valCol == valCol: '+valRow, valCol);
								seletor.val(valRow);
								seletor.addClass('used');
								selecteds[indice] = 'cel'+i+j;
								indice++;
								valRow = 0;
								valCol = 0;
								console.log('4. Novos valores valRow, valCol: '+valRow, valCol);
								if (j < cols || i < rows){
									i++;
									j++;
									console.log('5. i++ && j++: '+i, j);
								}
							}
	  					}
			  			console.log('------------');
	  				}
	  			}

	  			var soma = 0, ind, values, compare;

	  			for(var x = 0; x < indice; x++){
	  				ind = selecteds[x].toString();
	  				for(var y  = 0; y < indica; y++){
		  				values = cust[y].split('-');
		  				compare = values[0].toString();

		  				if (ind.localeCompare(compare) == 0){
		  					console.log(values[0], values[1]);
		  					soma = soma + parseInt(values[1]);
		  				}
	  				}
	  			}
	  			console.log(soma);
	  			$('#tipo').after('<span id="cust-total">Custo: '+soma+'</span>');
	  		}
  		}else{
  			alert('Não existem valores para o cálculo');
  		}
	}

	/* Função cria a tabela */
	function createTable(rows, cols){
		// Verifica se a tabela já existe
		if(clicou == 0){
			mytable = $('<table></table>').attr({ id: "basicTable" });
			rows++;
			cols++;
			var tr = [];
			var idrow, idcel;

			for (var i = 0; i <= rows; i++) {
				idrow = 'row-'+i;
				var row = $('<tr></tr>').attr({ id: [idrow].join(' ') }).appendTo(mytable);
				for (var j = 0; j <= cols; j++) {

					idcel = 'cel'+i+j;

					if (i == 0) {
						if (i == 0 && j == 0){
							$('<td></td>').attr({ id: [idcel].join(' ') }).text(' ').appendTo(row);
						}else if (i == 0 && j == cols){
							$('<td></td>').attr({ id: [idcel].join(' ') }).text('Estoque').appendTo(row);
						}else{
							$('<td></td>').attr({ id: [idcel].join(' ') }).text('O'+j).appendTo(row);
						}
					}else if (i == rows){
						if (i == rows && j == cols) {
							$('<td></td>').attr({ id: [idcel].join(' ') }).html('<p><span id="result-dem"></span><span id="result-est"></span></p>').appendTo(row);
						}else if (j == 0){
							$('<td></td>').attr({ id: [idcel].join(' ') }).text('Demanda').appendTo(row);
						}else{
							$('<td></td>').attr({ id: [idcel].join(' ') }).html('<input name="'+idcel+'" type="number"></input>').appendTo(row);
						}
					}else{
						if (j == 0) {
							$('<td></td>').attr({ id: [idcel].join(' ') }).text('D'+i).appendTo(row);
						}else if(j == cols){
							$('<td></td>').attr({ id: [idcel].join(' ') }).html('<input name="'+idcel+'"  type="number"></input>').appendTo(row);
						}else{
							$('<td></td>').attr({ id: [idcel].join(' ') }).html('<input name="'+idcel+'"  type="number"></input>').appendTo(row);
							// $('<td></td>').attr({ id: [idcel].join(' ') }).text(0).appendTo(row);
						}
					}
				}
			}

			//console.log("Tabela: "+mytable.html());
			mytable.appendTo("#box");
			clicou++;
		}else{
			alert('A tabela já existe');
		}
	}

	/* Verifica se a tecla esc foi pressionada e fecha o relatório*/
	$(document).keyup(function(e) {
	     if (e.keyCode == 27) {
			$('.conteudo').removeClass('show');
	    }
	});


	/*
	Ação dos botões
	*/

	/* Calcula o custo conforme a demanda e estoque */
	$('#calc-noroeste a').click(function(e){
		e.preventDefault();
		if ($('#bx-result').length ) {
			$('#bx-result').remove();
			console.log('Box de resultado removido!');
		}
		calcula(estoque, demanda);
	});

	/* Exclui a tabela */
	$('#exclui-tabela a').click(function(e){
		e.preventDefault();
		$('#exclui-tabela').addClass('hidden');
		$('#calc-noroeste').addClass('hidden');
		$('#create-table').removeClass('hidden');
		$('#basicTable').remove();
		$('#bx-result').remove();
		$('#box').removeClass('exists');
		$('#row').val('');
		$('#col').val('');
		clicou = 0;
	});

	/* Exibe o relatório */
	$('.info').click(function(e){
		e.preventDefault();
		$('.conteudo').toggleClass('show');
	});

	/* Cria a tabela */
	$('#create-table a').click(function(e){
		e.preventDefault();

		estoque = $('#row').val();
		demanda = $('#col').val();

		//Tratamento de input de linha e coluna
		if (demanda == '' || estoque == '' || demanda <= 0 || estoque <= 0) {
			if(demanda == '' && estoque == ''){
				alert('Os inputs de estoque e demanda devem conter algum valor');
			}else if(demanda == ''){
				alert('O input de estoque deve conter algum valor');
			}else if(estoque == ''){
				alert('O input de demanda deve conter algum valor');
			}else if(demanda <= 0 && estoque <= 0){
				alert('Os inputs de estoque e demanda devem conter um valor maior que 0');
			}else if(demanda <= 0){
				alert('O input de estoque deve conter um valor maior que 0');
			}else if(estoque <= 0){
				alert('O input de demanda deve conter um valor maior que 0');
			}
		}else{
			$('#box').addClass('exists');
			createTable(estoque, demanda);
			$('#create-table').addClass('hidden');
			$('#exclui-tabela').removeClass('hidden');
			$('#calc-noroeste').removeClass('hidden');

		}
	});

})(jQuery);