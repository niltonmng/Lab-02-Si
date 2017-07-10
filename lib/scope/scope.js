
      angular.module("catalogoSeries", []);
      angular.module("catalogoSeries").controller("catalogoSeriesCtrl", function($scope, $http){

        $scope.series = [];
        $scope.profile = [];
        $scope.watchList = [];
        $scope.users = [];
        $scope.actualUser = false;

        $scope.registro = function(userName, userEmail, userPassword){
          if(existeUsuario(userName)){
            console.log("Found user!");
            alert("User already exists!");
          }
          else {
            var user = {name: userName, email: userEmail, password: userPassword};
            $scope.users.push(user);
            delete $scope.user;

            console.log("new user registered!");
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
          if($scope.actualUser == false) {
            if(getUsuario(userName).password == userPassword){
              $scope.actualUser = true;
              console.log("Achei user e fiz loggin!");
              alert("Successful login!");
            }
            else {
              console.log("Nao achei!");
              alert("Wrong password! Try again!");
            }
          }
          else {
            alert("User already logged! Try to logout first!");
          }
        }

        $scope.logout = function () {
          if($scope.actualUser == true) {
            $scope.actualUser = false;

            console.log("Fiz logout!");
            alert("Successful logout!");
          }
          else {
            alert("No user logged! Try to loggin first!");
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
