function classifiedsFactory($http){
	
	function getClassifieds(){
                 return $http.get('data/classifieds.json');
             }
             return {
        	  getClassifieds: getClassifieds
             }
}
angular.module("ngClassifieds")
             .factory("classifiedsFactory",classifiedsFactory);