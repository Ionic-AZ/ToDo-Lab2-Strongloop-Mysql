angular
	.module('todoApp')
	.controller('AuthController', AuthController);

AuthController.$inject = ['$scope', '$state', '$http', '$rootScope', 'ApiEndpoint'];
function AuthController($scope, $state, $http, $rootScope, ApiEndpoint) {
	$scope.formData = {};
	$scope.newUser = {};
	$scope.loginError = false;
	$scope.loginErrorText = '';

	var baseUrl = ApiEndpoint.url;

	$scope.login = function () {
		console.log('AuthController.login');
		var credentials = {
			email: $scope.formData.email,
			password: $scope.formData.password
		}

		console.log('credentials', credentials);
		$http.post(baseUrl + '/appusers/login', credentials).then(function (data) {
			console.log('auth', data);
			$rootScope.user = data.data;
			$scope.loginError = false;
			$scope.loginErrorText = '';
			$state.go('app.tasks');
		}, function (error) {
			console.log('auth.error', error);
			$scope.loginError = true;
			$scope.loginErrorText = error.data.error;

		});
	}

	$scope.register = function () {

		console.log('register');
		console.log('newUser', $scope.newUser);
    $http.post(baseUrl + '/appusers', $scope.newUser)
      .success(function (data) {
        $scope.formData.email = $scope.newUser.email;
        $scope.formData.password = $scope.newUser.password;
        $scope.login();
      });

	};
};
