function editClassified($scope,$state,$mdSidenav,$timeout,$mdDialog,classifiedsFactory,$mdToast){

            var vm = this;
            vm.closeSideBar = closeSideBar;
            vm.saveEdit = saveEdit;
            vm.classified = $state.params.classified;
            $timeout(function(){
                $mdSidenav('left').open();
            },1000);

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
      
      function saveEdit(){
            $scope.$emit('saveEdit', 'edit Saved!!');
            vm.sidenavOpen = false;       
      }
}

angular.module("ngClassifieds")
            .controller("editClassified",editClassified);