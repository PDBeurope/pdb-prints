;(function () {

  'use strict';
  
  //Filter to convert the response data into required data model format
  angular.module('pdb.prints.filters', [])
  .filter('printsDataModelFilter', function(){
    return function(respData,config){
      var pdbId = '';
  		var recDataObj = {"PDBeLogo": [], "PrimaryCitation": [], "Protein": [], "Ligands": [], "NucleicAcid": [], "Expressed": [], "Experimental": [], "Taxonomy": []};
  		var mixedExpressionFlag = false;
  		var sampleData = '';
  		var multipleOrganismFlag = false;
  		var OrganismData = '';
  		var OrganismSciName = '';
  		var organismSynonymsFlag = false;
  		
  		angular.forEach(respData.doclist.docs, function(docsVal, docsKey) {
  			
  			pdbId = docsVal['pdb_id'];
  			
  			//Pdb logo
  			recDataObj["PDBeLogo"][0] = pdbId;
  			
  			//check for primary citation
  			if(!angular.isUndefined(docsVal['citation_year']) && docsVal['citation_year']){
  				recDataObj["PrimaryCitation"][0] = "published";
  			}else{
  				recDataObj["PrimaryCitation"][0] = "unpublished";
  			}
  			
  			//check for protein
  			if(!angular.isUndefined(docsVal['number_of_protein_chains']) && docsVal['number_of_protein_chains']){
  				recDataObj["Protein"][0] = "present";
  			}else{
  				recDataObj["Protein"][0] = "absent";
  			}
  			
  			//check for ligands
  			if(!angular.isUndefined(docsVal['number_of_bound_entities']) && docsVal['number_of_bound_entities']){
  				recDataObj["Ligands"][0] = "present";
  			}else{
  				recDataObj["Ligands"][0] = "absent";
  			}
  			
  			//check for nucleic acid
  			if((!angular.isUndefined(docsVal['number_of_RNA_chains']) && docsVal['number_of_RNA_chains']) || 
  				(!angular.isUndefined(docsVal['number_of_DNA_chains']) && docsVal['number_of_DNA_chains'])) {
  				recDataObj["NucleicAcid"][0] = "present";
  			}else{
  				recDataObj["NucleicAcid"][0] = "absent";
  			}
  			
  			//check for expression
  			if(!angular.isUndefined(docsVal['sample_preparation_method']) && docsVal['sample_preparation_method']) {
  				
  				//set sampleData
				var totalSpMethods = docsVal['sample_preparation_method'].length;
				for(var spmi = 0; spmi < totalSpMethods; spmi++){
					if(sampleData === ''){
						sampleData = docsVal['sample_preparation_method'][spmi];
					}
					
					//check if it changes
					if(docsVal['sample_preparation_method'][spmi] !== sampleData) {
						mixedExpressionFlag = true;
					}
					
					//set image
					switch (docsVal['sample_preparation_method'][spmi]) {
						case "Engineered":
							recDataObj["Expressed"][0] = "expressed";
							break;
						case "Synthetic":
							recDataObj["Expressed"][0] = "synthetic";
							break;
						case "Natural":
							recDataObj["Expressed"][0] = "purified";
							break;
						default: 
							recDataObj["Expressed"][0] = "other";
					}
				}
  				
  			}else{
  				
  				var elseExpType = '';
  				var chkPattern = new RegExp("Synthetic construct", "i"); //pattern to check organism for synthetic
  				if(!angular.isUndefined(docsVal['entry_organism_scientific_name']) && chkPattern.test(docsVal['entry_organism_scientific_name'])) {
  					recDataObj["Expressed"][0] = elseExpType = "synthetic";
  				}else{
  					recDataObj["Expressed"][0] = "CGIlogoUnknown";
  				}
  				
  				//check if sampleData to mark it multiple
  				if(recDataObj["Expressed"][0] !== sampleData) {
  					mixedExpressionFlag = true;
  					elseExpType = 'other';
  				}
  				
  				//set sampleData
  				if(sampleData === ''){
  					sampleData = elseExpType;
  				}
  				
  				//check if sampleData to mark it multiple
  				if(respData.doclist.docs.length > 1 && recDataObj["Expressed"][1] !== sampleData) {
  					mixedExpressionFlag = true;
  				}
  				
  			}
  			
  			//check for experimental
  			if(!angular.isUndefined(docsVal['experimental_method']) && docsVal['experimental_method']) {
  				
  				if(docsVal['experimental_method'].length === 1){
  					if(docsVal['experimental_method'][0].toLowerCase() === 'x-ray diffraction') {
  						recDataObj["Experimental"][0] = "xray";
  						if(docsVal['experiment_data_available'] !== "y"){
  							recDataObj["Experimental"][0] = "xrayNoData" 
  						}
  					}else if(docsVal['experimental_method'][0].toLowerCase() === 'solution nmr' || docsVal['experimental_method'][0].toLowerCase() === 'solid-state nmr') {
  						recDataObj["Experimental"][0] = "nmr";
  						if(docsVal['experiment_data_available'] !== "y"){
  							recDataObj["Experimental"][0] = "nmrNoData"
  						}
  					}else if(docsVal['experimental_method'][0].toLowerCase() === 'electron microscopy') {
  						recDataObj["Experimental"][0] = "em";
  						if(docsVal['experiment_data_available'] !== "y" && !docsVal['emdb_id']){
  							recDataObj["Experimental"][0] = "emNoData"
  						}
  					}else {
  						recDataObj["Experimental"][0] = "other";
  					}
  				}else{
  					recDataObj["Experimental"][0] = "hybrid";
  					if(docsVal['experiment_data_available'] !== "y"){
  					   recDataObj["Experimental"][0] = "hybridNoData"
  					}
  				}
  			
  				
  			}else{
  				recDataObj["Experimental"][0] = "CGIlogoUnknown";
  			}
  			
  			//Check Taxanomy
  			var organismMap = {
  				 "Dinophyceae": "algae",
  				 "Embryophyta": "plant",
  				 "Streptophyta": "plant",
  				 "Saccharomyces cerevisiae": "yeast",
  				 "Saccharomyces": "yeast",
  				 "Drosophila": "fly",
  				 "Gallus gallus": "chicken",
  				 "Homo sapiens": "human",
  				 "Sus scrofa": "pig",
  				 "Bos taurus": "cow",
  				 "Mus musculus": "mouse",
  				 "Rattus": "rat",
  				 "Rat": "rat",
  				 "Mammalia": "mammal",
					 "Fungi": "fungi",
  				 "Ascomycota": "fungi",
					 "Viruses": "virus",
					 "Bacteria": "bacteria",
  				 "Archaea": "archaea",
  				 "Eukaryota": "eukaryote",
  			};
				
				var checkIFOrganismsAreIdentical = function(scientificNameArr){
					var nameObj = [];
					
					angular.forEach(scientificNameArr, function(SciName, sciIndex) {
  					var sciNameStr = SciName.toLowerCase().split('|')[0];
						if (nameObj.indexOf(sciNameStr) == -1){
							nameObj.push(sciIndex);
						}
  				});
					
					if(nameObj.length > 1){
						return false;	
					}else{
						return true
					}
					
				}
				
				if(!angular.isUndefined(docsVal['entry_organism_scientific_name']) && docsVal['entry_organism_scientific_name']) { //organism scientific name data check
  				
  				OrganismSciName = docsVal['entry_organism_scientific_name'];
  				
  				//Set multiple flag
  				if(docsVal['entry_organism_scientific_name'].length > 1){
						
  					var identicalOrganismsFlag = checkIFOrganismsAreIdentical(docsVal['entry_organism_scientific_name']);
						
						if(identicalOrganismsFlag == false){
							multipleOrganismFlag = true;
						}else{
							
							
							var sciNameStr = docsVal['entry_organism_scientific_name'][0].split('|')[0]
							if(sciNameStr in organismMap){
  							recDataObj["Taxonomy"][0] = organismMap[sciNameStr];
  						}
  						
						}
						
  				}else{
						var sciNameStr = docsVal['entry_organism_scientific_name'][0].split('|')[0]
						if(sciNameStr in organismMap){
							recDataObj["Taxonomy"][0] = organismMap[sciNameStr];
						}
					}
  				
  				var chkPattern = new RegExp("Synthetic construct", "i"); //pattern to check organism for synthetic
  				if(chkPattern.test(docsVal['entry_organism_scientific_name'])) {
  					recDataObj["Taxonomy"][0] = "artificial";
  				}
  			}
				
				if(!recDataObj["Taxonomy"][0] && !angular.isUndefined(typeof docsVal['organism_synonyms']) && docsVal['organism_synonyms']) { //organism synonyms data check
  				organismSynonymsFlag = true; //set Organism synonyms flag for image
  				//Get tax id from organism synonyms
  				//angular.forEach(docsVal['organism_synonyms'], function(SynName, synInd) {
					var totOrgSynonyms = docsVal['organism_synonyms'].length;
					for(var synIndex=0; synIndex < totOrgSynonyms; synIndex++){
  					if(docsVal['organism_synonyms'][synIndex] in organismMap){
  						recDataObj["Taxonomy"][0] = organismMap[docsVal['organism_synonyms'][synIndex]];
  						break;
  					}
  				};
  				
  				if(!recDataObj["Taxonomy"][0]){
  				  recDataObj["Taxonomy"][0] = "other";
  				}
  				
  			}
  			
  		});
  			
  		//check for multiple expression
  		if(mixedExpressionFlag){
  			recDataObj["Expressed"][0] = "multiple";
  		}
  		
  		//check for synthetic organism
  		if(recDataObj["Expressed"][1] === "synthetic"){
  			
  			var chkPattern = new RegExp("Synthetic construct", "i"); //pattern to check organism for synthetic
  			if(OrganismSciName !== '' && !chkPattern.test(OrganismSciName)) {
  				//If organism is present then don't mark it as artificial or synthetic
  			}else{
    			recDataObj["Taxonomy"][0] = "artificial";
    			if(organismSynonymsFlag){ //if synonyms data present
    				recDataObj["Taxonomy"][0] = "other";
    			}
  			}
  		}
  		
  		//check for multiple organism
  		if(multipleOrganismFlag){
  			recDataObj["Taxonomy"][0] = "multiple";
  		}
  		
  		return recDataObj;
  		
    }
  })
  .filter('tooltipFilter', function(){
    
    return function(titleForEle){
      var title = '';
      switch(titleForEle[0]){
        
        case 'pdbeLogo' :
          title = 'For more information about key features of this entry, click on the individual icons.';
          break;
          
        case 'PrimaryCitation' :
          switch(titleForEle[1]){
            case 'published' :
              title = 'A paper describing this entry has been published.';
              break;
            case 'unpublished' :
              title = 'The PDB does not have any information about a published paper describing this entry.';
              break;
            case 'CGIlogoUnknown' :
              title = 'This icon conveys information about whether or not a paper describing this entry has been published.';
              break;
          }
          break;
          
        case 'Taxonomy' :
          switch(titleForEle[1]){
            case 'artificial' :
              title = 'The biomacromolecules in this entry were artificially designed.';
              break;
            case 'other' :
              title = 'Information about the source organism of the biomacromolecules in this entry can be obtained by clicking on the icon.';
              break;
            case 'multiple' :
              title = 'The biomacromolecules in this entry derive from multiple organisms.';
              break;
            case 'fly' :
              title = 'The source organism of the biomacromolecules in this entry is fruit-fly.';
              break;
            case 'CGIlogoUnknown' :
              title = 'This icon conveys information about the source organism of the biomacromolecules in this entry.';
              break;
            default :
              title = 'The source organism of the biomacromolecules in this entry is ' + titleForEle[1] + '.';
          }
          break;
        
        case 'Expressed' :
          switch(titleForEle[1]){
            case 'expressed' :
              title = 'The sample of the biomacromolecules in this entry was obtained by expression and purification.';
              break;
            case 'synthetic' :
              title = 'The sample of the biomacromolecules in this entry was obtained by chemical synthesis.';
              break;
            case 'purified' :
              title = 'The sample of the biomacromolecules in this entry was extracted and purified from a biological source.';
              break;
            case 'multiple' :
              title = 'The sample of the biomacromolecules in this entry was obtained using multiple techniques.';
              break;
            case 'other' :
              title = 'The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.';
              break;
            case 'CGIlogoUnknown' :
              title = 'This icon conveys information about the production techniques used to obtain the biomacromolecular samples for this entry.';
              break;
          }
          break;
        
        case 'Experimental' :
          switch(titleForEle[1]){
            case 'xray' :
              title = 'The structure was determined using X-ray crystallography and experimental data is available.';
              break;
            case 'nmr' :
              title = 'The structure was determined using NMR spectroscopy and experimental data is available.';
              break;
            case 'em' :
              title = 'The structure was determined using Electron Microscopy and experimental data is available.';
              break;
            case 'multiple' :
              title = 'The structure was determined using Electron Crystallography and experimental data is available.';
              break;
            case 'extal' :
              title = 'The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.';
              break;
            case 'hybrid' :
              title = 'The structure was determined using a hybrid technique and experimental data is available.';
              break;
            case 'other' :
              title = 'The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof and experimental data is available.';
              break;
            case 'xrayNoData' :
              title = 'The structure was determined using X-ray crystallography (no experimental data available).';
              break;
            case 'nmrNoData' :
              title = 'The structure was determined using NMR spectroscopy (no experimental data available).';
              break;
            case 'emNoData' :
              title = 'The structure was determined using Electron Microscopy (no experimental data available).';
              break;
            case 'extalNoData' :
              this.title = 'The structure was determined using Electron Crystallography (no experimental data available).';
              break;
            case 'hybridNoData' :
              title = 'The structure was determined using a hybrid technique (no experimental data available).';
              break;
            case 'otherNoData' :
              title = 'The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof (no experimental data available).';
              break;
            case 'extalNoData' :
              title = 'This icon conveys information about the structure-determination technique for this entry.';
              break;
          }
          break;
        
        case 'Protein' :
          switch(titleForEle[1]){
            case 'present' :
              title = 'This entry contains protein.';
              break;
            case 'absent' :
              title = 'This entry does not contain protein.';
              if(titleForEle[2].substring(0,3) === "EMD")
                this.title = 'Presence of protein is not annotated for this EMDB entry.';
              break;
            case 'CGIlogoUnknown' :
              title = 'This icon conveys information about the presence of protein in the entry.';
              break;
          }
          break;
        
        case 'NucleicAcid' :
          switch(titleForEle[1]){
            case 'present' :
              title = 'This entry contains nucleic acid (DNA, RNA).';
              break;
            case 'absent' :
              title = 'This entry does not contain nucleic acid (DNA, RNA).';
              if(titleForEle[2].substring(0,3) === "EMD")
                title = 'Presence of DNA or RNA is not annotated for this EMDB entry.';
              break;
            case 'CGIlogoUnknown' :
              title = 'This icon conveys information about the presence of nucleic acid (DNA, RNA) in the entry.';
              break;
          }
          break;
        
        case 'Ligands' :
          switch(titleForEle[1]){
            case 'present' :
              title = 'This entry contains one or more ligands.';
              break;
            case 'absent' :
              title = 'This entry does not contain any ligands.';
              break;
            case 'CGIlogoUnknown' :
              title = 'This icon conveys information about the presence of ligands in the entry.';
              break;
          }
          break;
      }
      
      return title; 
      
    };
    
  });

}());