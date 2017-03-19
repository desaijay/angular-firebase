function newClassified($scope,$state,$mdSidenav,$timeout,$mdDialog,classifiedsFactory,$mdToast){

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveClassified = saveClassified;
            $timeout(function(){
                $mdSidenav('left').open();
            },2000);

            $scope.$watch('vm.sidenavOpen', function(sidenav){
            		if(sidenav === false){
            		       $mdSidenav('left').close()
            		       		          .then(function(){	
                     					$state.go('classifieds');
            		       		          });
            		}
            });
             
             function closeSideBar(){
             	vm.sidenavOpen = false;
             }

             function saveClassified(classified){
             	if(classified){
             	    $scope.$emit('newClassified', classified);
             	     $scope.sidenavOpen = false;
                         }
             }
}

angular.module("ngClassifieds")
            .controller("newClassified",newClassified);