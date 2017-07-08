
      angular.module("catalogoSeries", []);
      angular.module("catalogoSeries").controller("catalogoSeriesCtrl", function($scope, $http){

        $scope.series = [];
        $scope.profile = [];
        $scope.watchList = [];
        $scope.users = [];

        $scope.registro = function(userName, userEmail, userPassword){
          if(existeUsuario(userName)){
            alert("User already exists!");
          } else {
            var user = {name: userName, email: userEmail, password: userPassword};
            $scope.users.push(user);

            delete $scope.user;
            alert("Successful Registration!");
          }
        }

        var existeUsuario = function(userName) {
              for(var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].name == userName) {
                  return true;
                }
              }
              return false;
        };
        var getUsuario = function(userName) {
              for(var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].name == userName) {
                  return $scope.users[i];
                }
              }
              return null;
        };

        $scope.login = function (userName, userPassword) {
          if(getUsuario(userName).password == userPassword){
            alert("Successful login!");
          } else {
            alert("Wrong password!");
          }
        }

        $scope.buscaSeries = function(nomeSerie){
           $http.get('https://omdbapi.com\t?s='+ nomeSerie + '&type=series&apikey=93330d3c').then(function (response) {
           $scope.series = response.data.Search;
           })
         }

        $scope.addSerieWatchlist = function (serie) {
          console.log("fiz");
          if(existeSerieWatchList(serie)){
            alert("Already in your WatchList!");
          }else{
            $scope.watchList.push(angular.copy(serie));
          }
        }

        $scope.addSerieProfile = function (serie) {
          console.log("fiz");
        	let serieID = $scope.profile.map(function (serie){
        	return serie.imdbID;
            });
       	 	let serieIndex = serieID.indexOf(serie.imdbID);
        	if(serieIndex == -1){
        	   $http.get('https://omdbapi.com/?i=' + serie.imdbID +'&plot=full&apikey=93330d3c').then(function (response) {
        		     $scope.profile.push(angular.copy(response.data));
           	})
          } else {
          	alert("Already in your Profile!");
          }
        }

        $scope.removeSerieProfile = function (serie) {
          console.log("fiz");
           let index = $scope.profile.indexOf(serie);
           if (index > -1) {
             $scope.profile.splice(index, 1);
          }
        }

        $scope.removeSerieWatchList = function (serie) {
          console.log("fiz");
           let index = $scope.watchList.indexOf(serie);
           if (index > -1) {
             $scope.watchList.splice(index, 1);
          }
        }

        var existeSerieWatchList = function(serie) {
              for(i = 0; i < $scope.watchList.length; i++) {
                if(serie.imdbID == $scope.watchList[i].imdbID) {
                  return true;
                }
              }
              return false;
        };


        $scope.guardarClassificacao = function (serie, episodio, classificacao) {
          console.log("fiz");
          serie.classificacao = classificacao;
          serie.episodio = episodio;
          delete $scope.episodio;
          delete $scope.classificacao;
        };

      });
