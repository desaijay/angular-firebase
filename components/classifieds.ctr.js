function classifiedsCtrl($http,$state,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog){
	
	var vm = this;
             vm.openSideBar      = openSideBar;
             vm.closeSideBar     = closeSideBar;
             vm.saveClassified  = saveClassified;
             vm.editClassified    = editClassified;
             vm.saveEdit             = saveEdit;
             vm.deleteClassified  = deleteClassified;
             vm.classifieds;
             vm.categories;
             vm.editing;

	classifiedsFactory.getClassifieds().then(function(classifieds){
		// console.log(classifieds);
		vm.classifieds = classifieds.data;
		vm.categories = getCategories(vm.classifieds);
	});
            function openSideBar() {
                 $state.go('classifieds.new');
            }

           function closeSideBar() {
      	  vm.classified = {};
               $mdSidenav('left').close();
            }
            function editClassified(classified){
            	      vm.editing = true;
            	     openSideBar();
            	      vm.classified = classified;
            //	   classified.title = classified.title; 
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