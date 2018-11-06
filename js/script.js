



	//var enderecos = new Array();
	var cidades2;
	wait = true;
    setTimeout("wait = true", 2000);


      function initMap() {
      	 var myLatlng = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {

        	
          geocodeAddress(geocoder, map);
        });



        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Click to zoom'
        });

        map.addListener('center_changed', function() {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          window.setTimeout(function() {
            map.panTo(marker.getPosition());
          }, 3000);
        });

        marker.addListener('click', function() {
          map.setZoom(8);
          map.setCenter(marker.getPosition());
        });


        

      }

      

      function geocodeAddress(geocoder, resultsMap) {
        //var address = document.getElementById('address').value;




        var msg = '1';
        	var enderecos;	

        	$.ajax({
				type:"POST",
				data: {msg:msg},
				url: "arquivo.php",
				datatype: "json",
  				async: false,
				success:function(data){
					
					
					enderecos= data;
				}


			});
        	cidades2 = enderecos;
        	console.log(enderecos);






        var x = new Array();
        var json_cidades = new	Array();
        var cont =0;

        var cidades = ['salvador','Rio de janeiro','recife','catu, BA'];
	      for (var i = 0; i < cidades.length; i++) {


	      	    var address = cidades[i];
		        
		        geocoder.geocode({'address': address}, function(results, status) {
		          if (status === 'OK') {
		            resultsMap.setCenter(results[0].geometry.location);

		            var latitude  = results[0].geometry.location.lat();
		            var longitude = results[0].geometry.location.lng();


		            var marker = new google.maps.Marker({
		              map: resultsMap,
		              position: results[0].geometry.location
		            });
		           
        			json_cidades.push([cidades[cont],latitude,longitude]);
        			cont++;
		            
		            
		          } else {
		            alert('Geocode was not successful for the following reason: ' + status);
		          }
		        });

		       
	      		
	      }
	      var obj = new Object();
	      obj = json_cidades;
	     console.log(obj);

        
      }








// ====== Geocoding ======
  function getAddress(search, next) {
    geo.geocode({address:search}, function (results,status)
      { 
        // If that was successful
        if (status == google.maps.GeocoderStatus.OK) {
          // Lets assume that the first marker is the one we want
          var p = results[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          // Output the data
            var msg = 'address="' + search + '" lat=' +lat+ ' lng=' +lng+ '(delay='+delay+'ms)<br>';
            document.getElementById("messages").innerHTML += msg;
          // Create a marker
          createMarker(search,lat,lng);
        }
        // ====== Decode the error status ======
        else {
          // === if we were sending the requests to fast, try this one again and increase the delay
          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          } else {
            var reason="Code "+status;
            var msg = 'address="' + search + '" error=' +reason+ '(delay='+delay+'ms)<br>';
            document.getElementById("messages").innerHTML += msg;
          }   
        }
        next();
      }
    );
  }
















function Send(){

	var msg = $("#mensagem").val();
	
	if(!msg){

		var vanish = document.querySelector(".aviso");

			vanish.classList.remove("vanish");

			setTimeout(function(){

				vanish.classList.add("vanish");

			},3000);
	}else{
		sendPhp(msg);
	}

}

function sendPhp(msg){

	var type="add";
	
	$.ajax({
		type:"POST",
		data: {msg:msg, type:type},
		url: "php/saveMsg.php",
		success:function(data){
			
			document.getElementById('box-show-msg').innerHTML = location.reload();
		}


	});


};

function limpa(){

	var type ='clean';

	$.ajax({
		type:"POST",
		data:{type:type},
		url:"php/saveMsg.php",
		success:function(data){

			document.getElementById('box-show-msg').innerHTML = location.reload();
		}
	});
}