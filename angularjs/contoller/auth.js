app.controller("authController", authController);
function authController($scope, $http, $state, $stateParams, $rootScope) {
    $scope.msg = "hello";


    $scope.submit = function () {
        console.log("Within submit function");
        $scope.msge = "Employee Register pass and cpass feild matched";
        console.log("pass", $scope.newregi.pass);
        console.log("ccpass", $scope.newregi.cpass);
        if ($scope.newregi.pass === $scope.newregi.cpass) {
            $scope.msge = "valid password and confirmpassword";
            $http.post("http://localhost:4000/regi/", $scope.newregi).then(function (res) {
                console.log(res);
                console.log("password:", res.data.doc.pass);

                console.log('source String = ' + res.data.doc.pass);
            });
        }
        else {
            $scope.msge = "password and confirm password feild are not matched";
        }
        $state.go("login");
    }

}
