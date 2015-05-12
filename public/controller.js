var app = angular.module('upload',[]);		
		
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);





app.service('multipartForm', ['$http', function($http){
	
	this.post = function(uploadUrl,data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key,data[key]);
		$http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })

	}
	
		}]);

app.controller('formCtrl',['$scope','multipartForm',function($scope,multipartForm){
$scope.test = "this is working";

$scope.customer = {};
			
			$scope.submit = function(){
				var uploadUrl = '/upload';
				multipartForm.post(uploadUrl,$scope.customer);
				$scope.customer = "";

			}

		}]);

