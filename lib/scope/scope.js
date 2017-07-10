
      angular.module("catalogoSeries", []);
      angular.module("catalogoSeries").controller("catalogoSeriesCtrl", function($scope, $http){

        $scope.series = [];
        $scope.users = [];
        $scope.actualUser = null;

        $scope.registro = function(userName, userEmail, userPassword){
          if(existeUsuario(userName)){
            console.log("Found user!");
            alert("User already exists!");
          }
          else {
            var user = new Object();
            user.name = userName;
            user.email = userEmail;
            user.password = userPassword;
            user.profile = [];
            user.watchList = [];;


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
          if($scope.actualUser == null) {
            if(getUsuario(userName).password == userPassword){
              $scope.actualUser = getUsuario(userName);
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
          if($scope.actualUser != null) {
            $scope.actualUser = null;

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
            $scope.actualUser.watchList.push(angular.copy(serie));
          }
        }

        $scope.addSerieProfile = function (serie) {
          console.log("fiz");
        	let serieID = $scope.actualUser.profile.map(function (serie){
        	return serie.imdbID;
            });
       	 	let serieIndex = serieID.indexOf(serie.imdbID);
        	if(serieIndex == -1){
        	   $http.get('https://omdbapi.com/?i=' + serie.imdbID +'&plot=full&apikey=93330d3c').then(function (response) {
        		     $scope.actualUser.profile.push(angular.copy(response.data));
           	})
          } else {
          	alert("Already in your Profile!");
          }
        }

        $scope.removeSerieProfile = function (serie) {
          console.log("fiz");
           let index = $scope.actualUser.profile.indexOf(serie);
           if (index > -1) {
             $scope.actualUser.profile.splice(index, 1);
          }
        }

        $scope.removeSerieWatchList = function (serie) {
          console.log("fiz");
           let index = $scope.actualUser.watchList.indexOf(serie);
           if (index > -1) {
             $scope.actualUser.watchList.splice(index, 1);
          }
        }

        var existeSerieWatchList = function(serie) {
              for(i = 0; i < $scope.actualUser.watchList.length; i++) {
                if(serie.imdbID == $scope.actualUser.watchList[i].imdbID) {
                  return true;
                }
              }
              return false;
        };


        $scope.guardarClassificacao = function (serie, episodio, classificacao) { // falta CONCERTAR este metodo
          console.log("fiz");
          serie.classificacao = classificacao;
          serie.episodio = episodio;
          delete $scope.episodio;
          delete $scope.classificacao;
        };

      });
