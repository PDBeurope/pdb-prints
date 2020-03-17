/**
 * pdb-prints
 * @version 2.0.0
 * @link https://github.com/PDBeurope/pdb-prints
 * @license Apache 2.0
 */
/**
 * Copyright 2020-2021 Mandar Deshpande <mandar@ebi.ac.uk>
 * European Bioinformatics Institute (EBI, http://www.ebi.ac.uk/)
 * European Molecular Biology Laboratory (EMBL, http://www.embl.de/)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and 
 * limitations under the License.
 */
/**
 * pdb-prints
 * @version 2.0.0
 * @link https://github.com/PDBeurope/pdb-prints
 * @license Apache 2.0
 */
/**
 * Copyright 2020-2021 Mandar Deshpande <mandar@ebi.ac.uk>
 * European Bioinformatics Institute (EBI, http://www.ebi.ac.uk/)
 * European Molecular Biology Laboratory (EMBL, http://www.embl.de/)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and 
 * limitations under the License.
 */
"use strict";var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,i=1,a=arguments.length;i<a;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},__awaiter=this&&this.__awaiter||function(e,r,s,c){return new(s=s||Promise)(function(i,t){function a(e){try{o(c.next(e))}catch(e){t(e)}}function n(e){try{o(c.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?i(e.value):((t=e.value)instanceof s?t:new s(function(e){e(t)})).then(a,n)}o((c=c.apply(e,r||[])).next())})},__generator=this&&this.__generator||function(i,a){var n,o,r,e,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,o&&(r=2&t[0]?o.return:t[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,t[1])).done)return r;switch(o=0,r&&(t=[2&t[0],r.value]),t[0]){case 0:case 1:r=t;break;case 4:return s.label++,{value:t[1],done:!1};case 5:s.label++,o=t[1],t=[0];continue;case 7:t=s.ops.pop(),s.trys.pop();continue;default:if(!(r=0<(r=s.trys).length&&r[r.length-1])&&(6===t[0]||2===t[0])){s=0;continue}if(3===t[0]&&(!r||t[1]>r[0]&&t[1]<r[3])){s.label=t[1];break}if(6===t[0]&&s.label<r[1]){s.label=r[1],r=t;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(t);break}r[2]&&s.ops.pop(),s.trys.pop();continue}t=a.call(i,s)}catch(e){t=[6,e],o=0}finally{n=r=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}},PdbPrintsPlugin=function(){function e(){this.defaultOptions={entryId:void 0,orientation:"horizontal",color:"embl_green",size:"36",hideLogo:[],errorStyle:"border:1px solid #696969; text-align:center; font-weight:bold; padding: 5px; display:inline-block;"}}return e.prototype.displayError=function(e){var t="Error: Data not available!";"param"==e&&(t="Error: Invalid Parameters!"),this.targetEle&&(this.targetEle.innerHTML='<div style="'+this.options.errorStyle+'">'+t+"</div>")},e.prototype.updateParams=function(e){this.options.entryId=e.entryId,void 0!==e.orientation&&(this.options.orientation=e.orientation),void 0!==e.color&&(this.options.color=e.color),void 0!==e.size&&(this.options.size=e.size),void 0!==e.hideLogo&&(this.options.hideLogo=e.hideLogo),this.oldOptions=__assign({},e)},e.prototype.render=function(e,t){var i=this;t&&void 0!==t.errorStyle&&null!=t.errorStyle&&(this.options.errorStyle+=t.errorStyle),this.targetEle=e,this.targetEle&&(this.targetEle.innerHTML=""),e&&t&&t.entryId?(this.options=__assign({},this.defaultOptions),this.oldOptions&&this.oldOptions.entryId==t.entryId?this.oldOptions.orientation===t.orientation&&this.oldOptions.color===t.color&&this.oldOptions.size===t.size&&this.oldOptions.hideLogo===t.hideLogo||(this.updateParams(t),this.formattedApiResult&&this.createTemplate(this.formattedApiResult)):(this.updateParams(t),this.getApiData(t.entryId.toLowerCase()).then(function(e){void 0!==e&&void 0===e.responseHeader.error&&void 0!==e.grouped&&void 0!==e.grouped.pdb_id.groups?e.grouped.pdb_id.groups.forEach(function(e){i.formattedApiResult=i.formatApiData(e),i.createTemplate(i.formattedApiResult)}):i.displayError()}))):this.displayError("param")},e.prototype.getApiData=function(i){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return e.trys.push([0,3,,4]),[4,fetch("https://www.ebi.ac.uk/pdbe/search/pdb/select?fl=pdb_id,organism_synonyms,number_of_bound_entities%2C+number_of_protein_chains%2Cexperimental_method%2C+experiment_data_available%2Cexpression_host_sci_name%2C+citation_year%2C+entry_organism_scientific_name,number_of_RNA_chains,number_of_DNA_chains,sample_preparation_method,emdb_id&group=true&group.field=pdb_id&group.limit=100&rows=1000&wt=json&q=pdb_id:"+i)];case 1:return[4,e.sent().json()];case 2:return[2,e.sent()];case 3:return t=e.sent(),console.log("API request failed. Error: ",t),[3,4];case 4:return[2]}})})},e.prototype.checkIFOrganismsAreIdentical=function(e){var a=[];return e.forEach(function(e,t){var i=e.toLowerCase().split("|")[0];-1==a.indexOf(i)&&a.push(t)}),!(1<a.length)},e.prototype.formatApiData=function(h){var p=this,d="",u={PDBeLogo:[],PrimaryCitation:[],Protein:[],Ligands:[],NucleicAcid:[],Expressed:[],Experimental:[],Taxonomy:[]},m=!1,b="",y=!1,f="",g=!1;if(h.doclist.docs.forEach(function(e){if(d=e.pdb_id,u.PDBeLogo[0]=d,void 0!==e.citation_year&&e.citation_year?u.PrimaryCitation[0]="published":u.PrimaryCitation[0]="unpublished",void 0!==e.number_of_protein_chains&&e.number_of_protein_chains?u.Protein[0]="present":u.Protein[0]="absent",void 0!==e.number_of_bound_entities&&e.number_of_bound_entities?u.Ligands[0]="present":u.Ligands[0]="absent",void 0!==e.number_of_RNA_chains&&e.number_of_RNA_chains||void 0!==e.number_of_DNA_chains&&e.number_of_DNA_chains?u.NucleicAcid[0]="present":u.NucleicAcid[0]="absent",void 0!==e.sample_preparation_method&&e.sample_preparation_method)for(var t=e.sample_preparation_method.length,i=0;i<t;i++)switch(""===b&&(b=e.sample_preparation_method[i]),e.sample_preparation_method[i]!==b&&(m=!0),e.sample_preparation_method[i]){case"Engineered":u.Expressed[0]="expressed";break;case"Synthetic":u.Expressed[0]="synthetic";break;case"Natural":u.Expressed[0]="purified";break;default:u.Expressed[0]="other"}else{var a="",n=new RegExp("Synthetic construct","i");void 0!==e.entry_organism_scientific_name&&n.test(e.entry_organism_scientific_name)?u.Expressed[0]=a="synthetic":u.Expressed[0]="CGIlogoUnknown",u.Expressed[0]!==b&&(m=!0,a="other"),""===b&&(b=a),1<h.doclist.docs.length&&u.Expressed[1]!==b&&(m=!0)}if(void 0!==e.experimental_method&&e.experimental_method){var o=!0;("object"==typeof e.experiment_data_available&&"y"==e.experiment_data_available[0]||"string"==typeof e.experiment_data_available&&"y"==e.experiment_data_available)&&(o=!1),1===e.experimental_method.length?"x-ray diffraction"===e.experimental_method[0].toLowerCase()?(u.Experimental[0]="xray",o&&(u.Experimental[0]="xrayNoData")):"solution nmr"===e.experimental_method[0].toLowerCase()||"solid-state nmr"===e.experimental_method[0].toLowerCase()?(u.Experimental[0]="nmr",o&&(u.Experimental[0]="nmrNoData")):"electron microscopy"===e.experimental_method[0].toLowerCase()?(u.Experimental[0]="em",o&&!e.emdb_id&&(u.Experimental[0]="emNoData")):u.Experimental[0]="other":(u.Experimental[0]="hybrid",o&&(u.Experimental[0]="hybridNoData"))}else u.Experimental[0]="CGIlogoUnknown";var r={Dinophyceae:"algae",Embryophyta:"plant",Streptophyta:"plant","Saccharomyces cerevisiae":"yeast",Saccharomyces:"yeast",Drosophila:"fly","Gallus gallus":"chicken","Homo sapiens":"human","Sus scrofa":"pig","Bos taurus":"cow","Mus musculus":"mouse",Rattus:"rat",Rat:"rat",Mammalia:"mammal",Fungi:"fungi",Ascomycota:"fungi",Viruses:"virus",Bacteria:"bacteria",Archaea:"archaea",Eukaryota:"eukaryote"};if(void 0!==e.entry_organism_scientific_name&&e.entry_organism_scientific_name){var s;if(f=e.entry_organism_scientific_name,1<e.entry_organism_scientific_name.length)if(0==p.checkIFOrganismsAreIdentical(e.entry_organism_scientific_name))y=!0;else(s=e.entry_organism_scientific_name[0].split("|")[0])in r&&(u.Taxonomy[0]=r[s]);else(s=e.entry_organism_scientific_name[0].split("|")[0])in r&&(u.Taxonomy[0]=r[s]);(n=new RegExp("Synthetic construct","i")).test(e.entry_organism_scientific_name)&&(u.Taxonomy[0]="artificial")}if(!u.Taxonomy[0]&&void 0!==e.organism_synonyms&&e.organism_synonyms){g=!0;for(var c=e.organism_synonyms.length,l=0;l<c;l++)if(e.organism_synonyms[l]in r){u.Taxonomy[0]=r[e.organism_synonyms[l]];break}u.Taxonomy[0]||(u.Taxonomy[0]="other")}}),m&&(u.Expressed[0]="multiple"),"synthetic"===u.Expressed[1]){var e=new RegExp("Synthetic construct","i");""!==f&&!e.test(f)||(u.Taxonomy[0]="artificial",g&&(u.Taxonomy[0]="other"))}return y&&(u.Taxonomy[0]="multiple"),u},e.prototype.createTemplate=function(a){var n=this;this.targetEle.innerHTML='<div class="pdbLogosWrapper">\n          <div class="pdbeLogoCol widthAuto '+("vertical"==this.options.orientation?"":"floatLeft")+'" style="height:'+this.options.size+'px;position:relative;">\n              <div class="pdbeLogoCol pdbeLogoCol1" style="font-size:'+4*this.options.size/11+'px">\n                  <a target="_self" href="https://www.ebi.ac.uk/pdbe/entry/pdb/entry/pdb/'+a.PDBeLogo[0]+'" title="For more information about key features of this entry, click on the individual icons.">\n                      <font face="Courier New"><b>'+a.PDBeLogo[0]+'</b></font>\n                  </a>\n              </div>\n              <div class="pdbeLogoCol1Bottom">\n                  <a _target="blank" title="pdbe.org" href="https://pdbe.org">\n                      <img border="0" src="https://www.ebi.ac.uk/pdbe/widgets/html/PDBeWatermark_horizontal_'+this.options.size+'.png">\n                  </a>\n              </div>\n          </div>\n          <div class="pdbLogos"></div>\n      </div>',-1<this.options.hideLogo.indexOf("PDBeLogo")&&(this.targetEle.querySelector(".pdbeLogoCol").style.display="none");var o=["citations","analysis","analysis","experiment","analysis","analysis","ligands"],r=[];["PrimaryCitation","Taxonomy","Expressed","Experimental","Protein","NucleicAcid","Ligands"].forEach(function(e,t){if(n.options.hideLogo&&-1==n.options.hideLogo.indexOf(e)){var i='target="pdbprints" href="https://www.ebi.ac.uk/pdbe/entry/pdb/'+a.PDBeLogo[0]+"/"+o[t]+'"';"Ligands"==e&&"absent"==a[e][0]&&(i=""),r.push('<div class="pdbeLogoCol widthAuto '+("vertical"==n.options.orientation?"":"floatLeft")+'" style="height:'+n.options.size+'px">\n                  <a '+i+' title="'+n.getTitle([e,a[e][0],a.PDBeLogo[0]])+'">\n                      <img class="pdbLogoImg" src="https://www.ebi.ac.uk/pdbe/widgets/pdblogos/'+n.options.color+"/"+n.options.size+"/"+e+"_"+a[e][0]+'.png" border="0">\n                  </a>\n              </div>')}}),0<r.length&&(this.targetEle.querySelector(".pdbLogos").innerHTML=r.join(""))},e.prototype.getTitle=function(e){var t="";switch(e[0]){case"PrimaryCitation":switch(e[1]){case"published":t="A paper describing this entry has been published.";break;case"unpublished":t="The PDB does not have any information about a published paper describing this entry.";break;case"CGIlogoUnknown":t="This icon conveys information about whether or not a paper describing this entry has been published."}break;case"Taxonomy":switch(e[1]){case"artificial":t="The biomacromolecules in this entry were artificially designed.";break;case"other":t="Information about the source organism of the biomacromolecules in this entry can be obtained by clicking on the icon.";break;case"multiple":t="The biomacromolecules in this entry derive from multiple organisms.";break;case"fly":t="The source organism of the biomacromolecules in this entry is fruit-fly.";break;case"CGIlogoUnknown":t="This icon conveys information about the source organism of the biomacromolecules in this entry.";break;default:t="The source organism of the biomacromolecules in this entry is "+e[1]+"."}break;case"Expressed":switch(e[1]){case"expressed":t="The sample of the biomacromolecules in this entry was obtained by expression and purification.";break;case"synthetic":t="The sample of the biomacromolecules in this entry was obtained by chemical synthesis.";break;case"purified":t="The sample of the biomacromolecules in this entry was extracted and purified from a biological source.";break;case"multiple":t="The sample of the biomacromolecules in this entry was obtained using multiple techniques.";break;case"other":t="The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.";break;case"CGIlogoUnknown":t="This icon conveys information about the production techniques used to obtain the biomacromolecular samples for this entry."}break;case"Experimental":switch(e[1]){case"xray":t="The structure was determined using X-ray crystallography and experimental data is available.";break;case"nmr":t="The structure was determined using NMR spectroscopy and experimental data is available.";break;case"em":t="The structure was determined using Electron Microscopy and experimental data is available.";break;case"multiple":t="The structure was determined using Electron Crystallography and experimental data is available.";break;case"extal":t="The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.";break;case"hybrid":t="The structure was determined using a hybrid technique and experimental data is available.";break;case"other":t="The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof and experimental data is available.";break;case"xrayNoData":t="The structure was determined using X-ray crystallography (no experimental data available).";break;case"nmrNoData":t="The structure was determined using NMR spectroscopy (no experimental data available).";break;case"emNoData":t="The structure was determined using Electron Microscopy (no experimental data available).";break;case"extalNoData":t="The structure was determined using Electron Crystallography (no experimental data available).";break;case"hybridNoData":t="The structure was determined using a hybrid technique (no experimental data available).";break;case"otherNoData":t="The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof (no experimental data available).";break;case"extalNoData":t="This icon conveys information about the structure-determination technique for this entry."}break;case"Protein":switch(e[1]){case"present":t="This entry contains protein.";break;case"absent":t="This entry does not contain protein.","EMD"===e[2].substring(0,3)&&(t="Presence of protein is not annotated for this EMDB entry.");break;case"CGIlogoUnknown":t="This icon conveys information about the presence of protein in the entry."}break;case"NucleicAcid":switch(e[1]){case"present":t="This entry contains nucleic acid (DNA, RNA).";break;case"absent":t="This entry does not contain nucleic acid (DNA, RNA).","EMD"===e[2].substring(0,3)&&(t="Presence of DNA or RNA is not annotated for this EMDB entry.");break;case"CGIlogoUnknown":t="This icon conveys information about the presence of nucleic acid (DNA, RNA) in the entry."}break;case"Ligands":switch(e[1]){case"present":t="This entry contains one or more ligands.";break;case"absent":t="This entry does not contain any ligands.";break;case"CGIlogoUnknown":t="This icon conveys information about the presence of ligands in the entry."}}return t},e}();window.PdbPrintsPlugin=PdbPrintsPlugin;
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}([function(t,e){function n(e,o){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,o)}t.exports=n},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}t.exports=function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){var o=n(8),r=n(9);t.exports=function(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?r(t):e}},function(t,e,n){var o=n(0);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}},function(t,e,n){var o=n(1),r=n(0),i=n(10),u=n(11);function c(e){var n="function"==typeof Map?new Map:void 0;return t.exports=c=function(t){if(null===t||!i(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return u(t,arguments,o(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r(e,t)},c(e)}t.exports=c},function(t,e,n){"use strict";n.r(e);var o=n(3),r=n.n(o),i=n(4),u=n.n(i),c=n(1),f=n.n(c),s=n(2),l=n.n(s),a=n(5),p=n.n(a),y=n(6),h=function(t){function e(){return r()(this,e),u()(this,f()(e).call(this))}return p()(e,t),l()(e,null,[{key:"observedAttributes",get:function(){return["entry-id","orientation","color","size","hideLogo"]}}]),l()(e,[{key:"validateParams",value:function(){return void 0!==this.entryId&&null!=this.entryId}},{key:"invokePlugin",value:function(){if(this.validateParams()){var t={entryId:this.entryId};void 0!==this.orientation&&null!==this.orientation&&(t.orientation=this.orientation),void 0!==this.color&&null!==this.color&&(t.color=this.color),void 0!==this.size&&null!==this.size&&(t.size=this.size),void 0!==this.hideLogo&&null!==this.hideLogo&&(t.hideLogo=this.hideLogo.split(",")),void 0===this.pluginInstance&&(this.pluginInstance=new PdbPrintsPlugin),this.pluginInstance.render(this,t)}}},{key:"attributeChangedCallback",value:function(){this.entryId=this.getAttribute("entry-id"),this.orientation=this.getAttribute("orientation"),this.color=this.getAttribute("color"),this.size=this.getAttribute("size"),this.hideLogo=this.getAttribute("hideLogo"),this.invokePlugin()}}]),e}(n.n(y)()(HTMLElement));e.default=h,customElements.define("pdb-prints",h)},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e){t.exports=function(t){return-1!==Function.toString.call(t).indexOf("[native code]")}},function(t,e,n){var o=n(0);function r(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function i(e,n,u){return r()?t.exports=i=Reflect.construct:t.exports=i=function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i},i.apply(null,arguments)}t.exports=i}]);
//# sourceMappingURL=pdb-prints-component-build-2.0.0.js.map