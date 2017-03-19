function classifiedsCtrl($scope,$http,$state,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog){
	var vm = this;
             vm.categories;
	vm.classifieds;
	vm.editing;
	vm.closeSideBar      = closeSideBar;
	vm.deleteClassified = deleteClassified;
	vm.editClassified     = editClassified; 
             vm.openSideBar       = openSideBar;
             vm.saveClassified   = saveClassified;
             vm.saveEdit             = saveEdit;
        
	classifiedsFactory.getClassifieds().then(function(classifieds){
		// console.log(classifieds);
		vm.classifieds = classifieds.data;
		vm.categories = getCategories(vm.classifieds);
	});
            function openSideBar() {
                 // $mdSidenav('left').open();
                 $state.go('classifieds.new');
            }
            $scope.$on('newClassified',function(event, classified){
                console.log(classified);
                classified.id = vm.classifieds.length  + 1;
                vm.classifieds.push(classified);
                showToast('classified saved');
            });
            $scope.$on('saveEdit', function(){
                showToast('Edit Saved!');
            });

           function closeSideBar() {
      	  vm.classified = {};
               $mdSidenav('left').close();
            }
            function editClassified(classified){
                $state.go('classifieds.edit',{
                     id: classified.id,
                     classified:classified
                }); 
            }

            function saveEdit(classified){
            	vm.editing = false;
            	vm.classified = {};
            	closeSideBar();
            	showToast("Edited classified");
            }

            function showToast(message){
            	   $mdToast.show(
	          	$mdToast.simple()
	          	        .content(message)
	          	        .position('top, right')
	          	        .hideDelay(3000)
	          	);
            }
        function saveClassified(classified) {
	        if(classified) {
	          vm.classifieds.push(classified);
	          vm.classified = {};
	          closeSideBar(); 
	          showToast("Saved classified");
	        }
         }
         function deleteClassified(event, classified){
         	var confirm = $mdDialog.confirm()
         	                                         .title('Are you sure yo want to delete  ' +classified.title)
         	                                         .ok('Yes')
         	                                         .cancel('No')
         	                                         .targetEvent(event)
         	     $mdDialog.show(confirm).then(function(){
         	     	var index = vm.classifieds.indexOf(classified);
         	     	vm.classifieds.splice(index, 1);
         	     },function(){

         	     })   
             }
             function getCategories(classifieds){
             	var categories = [];
             	angular.forEach(classifieds, function(item){
             		angular.forEach(item.categories, function(category){
             			categories.push(category);
             		});
             	});
                  return _.uniq(categories);
             }
}
angular.module("ngClassifieds")
            .controller("classifiedsCtrl",classifiedsCtrl);