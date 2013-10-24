
var webApp = angular.module('webApp',['ui.router']);

webApp.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: 'appController',
    })
    // For any unmatched url, redirect to /state1
     $urlRouterProvider.otherwise("/");

});
webApp.factory('appSession', function($http){
    return {
        convertToPDF: function(URLText) {
          return $http.post('converter.php',{
            type    : 'convertToPDF',
            URLText     : URLText
          });
        }
    }
});
//controller
webApp.controller('appController', function($scope, $location, appSession){
        
        $scope.URLText;
        $scope.showDownloadLink = false;
        $scope.showProcessingIcon = false;
        $scope.showErrorConsole = false;
        $scope.ErrorMessage='';
        $scope.displaySuccess = function(data, status){
            $scope.showProcessingIcon = false;
            
            if(data['status'] == 1){
              $scope.showDownloadLink = true;
            }
            else{
              $scope.showErrorConsole = true;
              $scope.ErrorMessage = data['status'];
            }
            console.log(data);
        };
        $scope.displayError = function(data, status){
            $scope.showProcessingIcon = false;
            console.log(data);
            $scope.showErrorConsole = true;
            $scope.ErrorMessage = data;
        };

        $scope.convertPDF = function(){
        
          $scope.showProcessingIcon = true;
          appSession.convertToPDF($scope.URLText).success($scope.displaySuccess).error($scope.displayError);
        };
       
          //Initializer
        init();
        function init(){
            console.log($location.path());
                
        };

});

