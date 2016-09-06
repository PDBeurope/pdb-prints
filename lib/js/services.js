(function () {

  'use strict';
  
  angular.module('pdb.prints.services', [])
  .service('printsService', ['$http', '$q', function($http, $q){
    
    this.getPrintsData = function(pdbidsArr){
      
      var searchApiPath = '//www.ebi.ac.uk/pdbe/search/pdb/select?';
      var searchFieldList = 'fl=pdb_id,organism_synonyms,number_of_bound_entities%2C+number_of_protein_chains%2Cexperimental_method%2C+experiment_data_available%2Cexpression_host_sci_name%2C+citation_year%2C+entry_organism_scientific_name,number_of_RNA_chains,number_of_DNA_chains,sample_preparation_method,emdb_id';
  		
  		var groupSearchBy = '&group=true&group.field=pdb_id&group.limit=100&rows=1000';
  		var searchResponceFormat = '&wt=json';
  		var pidForQuery = '&q=pdb_id:('+pdbidsArr.join(' OR ')+')';
  		var defArr = [];
  		var searchUrl = searchApiPath + searchFieldList + groupSearchBy + searchResponceFormat + pidForQuery;
      
      var deferred = $q.defer();
      
      $http.get(searchUrl)
      .then(function(response) {
          
          //if (window.console) console.log('service : success');
          deferred.resolve(response.data);
      
      }, function(response) {
          
          //if (window.console) console.log('service : fail');
          deferred.reject('fail response');
          
      });
      
      return deferred.promise;
    
    };
  	
  }]);
  
}());