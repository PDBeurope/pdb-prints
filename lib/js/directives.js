;(function () {
  
  'use strict';
  
  angular.module('pdb.prints', ['pdb.prints.filters','pdb.prints.services', 'template/prints/pdbLogos.html'])
	.directive('pdbPrints', ['printsService', '$compile', '$filter', function(printsService, $compile, $filter){
    
		return{
		  restrict: 'EAC',
		  scope: {
			pdbIds : '=',
			settings: '@'
		  },
		  link: function (scope, element, attrs) {
			  
			  //default configurations
			  scope.config= {picstype: 'jslogos', orientation: 'horizontal', size: 36, color: 'embl_green', targetWindow: '_self', 'domainUrl': '//www.ebi.ac.uk/pdbe', hideLogo : []};
			  
			  //extend default configurations with provided settings in the 'settings' attribute
			  if( typeof scope.settings != 'undefined' && scope.settings){
				angular.extend(scope.config, JSON.parse(scope.settings));
			  }
			  
			  //If pdbids are more than 20. Group the data request in clusters of 20 pdbids
			  var pdbGroups = [], size = 20;
			  var idArrToSplice = scope.pdbIds.slice(); //used slice() to retain the pdbids in scope
			  
			  while (idArrToSplice.length > 0)
				  pdbGroups.push(idArrToSplice.splice(0, size));
			  
			  //Iterating the groups and making search API request
			  angular.forEach(pdbGroups, function(pdbIdsGrpArr, pdbIdsGrpKey) {
				
				//Show loading message. check if element with class 'pdbprints_{pdbid}' is present in the dom and add loading message
				var loadingEleSelector = angular.element(document.getElementsByClassName('pdbprints_'+pdbIdsGrpArr[0]));
				if ( loadingEleSelector.length ) {
				  loadingEleSelector.html('PDBprints loading....');
				}
				
				//Call Search API for data
				var searchApiData1 = printsService.getPrintsData(pdbIdsGrpArr).then(function(data) {
					// promise fulfilled
					if(angular.isUndefined(data.responseHeader.error)){ //no error data in response
					  if(!angular.isUndefined(data.grouped.pdb_id.groups) && data.grouped.pdb_id.groups){
						angular.forEach(data.grouped.pdb_id.groups, function(value, key) {
						  
						  var formattedModel = $filter('printsDataModelFilter')(value,scope.config);
						  var template = '<pdb-logos logo-data=\''+JSON.stringify(formattedModel)+'\' config-data="config" click-action="'+scope.clickAction+'"></pdb-logos>';
						  var content =  $compile(template)(scope);
						  
						  //check if ele with class 'pdbprints_{pdbid}' is present in the dom or create it
						  //var eleSelector = angular.element(document.getElementsByClassName('pdbprints_'+formattedModel.PDBeLogo[0]));
						  var eleSelector = angular.element(element[0].querySelector('.pdbprints_'+formattedModel.PDBeLogo[0]));
						  if ( eleSelector.length ) {
							eleSelector.html('').append(content);
						  }else{
							element.append(content);  
						  }
						  
						});
					  }
					}else{
					  if(window.console){ console.log('Error data in API response. Error: '+ data.responseHeader.error) }
					}
				}, function(error) {
					// promise rejected, could log the error with: console.log('error', error);
					if(window.console){ console.log('API request failed. Error: '+ error) }
				});
			  
			  });
		 
		  }
		}
	}])
	.directive('pdbLogos', ['printsService', '$filter', function(printsService, $filter){
    
		return{
		  restrict: 'EA',
		  scope: {
			logoData1 : '@logoData',
			config : '=configData'
		  },
		  templateUrl: "template/prints/pdbLogos.html",
		  link: function (scope, element, attrs) {
			scope.logoData = JSON.parse(scope.logoData1);
			scope.categories = [ "PrimaryCitation", "Taxonomy", "Expressed", "Experimental", "Protein", "NucleicAcid", "Ligands" ];
			scope.categoryUrl = [ "/citations", "/analysis", "/analysis", "/experiment", "/analysis", "/analysis", "/ligands" ];
		  }
		  
		}
	}])
  
  
}());