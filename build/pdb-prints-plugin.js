"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PdbPrintsPlugin = /** @class */ (function () {
    function PdbPrintsPlugin() {
        this.defaultOptions = {
            entryId: undefined,
            orientation: 'horizontal',
            color: 'embl_green',
            size: '36',
            hideLogo: [],
            errorStyle: 'border:1px solid #696969; text-align:center; font-weight:bold; padding: 5px; display:inline-block;'
        };
    }
    PdbPrintsPlugin.prototype.displayError = function (errType) {
        var errtxt = "Error: Data not available!";
        if (errType == 'param')
            errtxt = "Error: Invalid Parameters!";
        if (this.targetEle)
            this.targetEle.innerHTML = "<div style=\"" + this.options.errorStyle + "\">" + errtxt + "</div>";
    };
    PdbPrintsPlugin.prototype.updateParams = function (options) {
        this.options.entryId = options.entryId;
        if (typeof options.orientation != 'undefined')
            this.options.orientation = options.orientation;
        if (typeof options.color != 'undefined')
            this.options.color = options.color;
        if (typeof options.size != 'undefined')
            this.options.size = options.size;
        if (typeof options.hideLogo != 'undefined')
            this.options.hideLogo = options.hideLogo;
        this.oldOptions = __assign({}, options);
    };
    PdbPrintsPlugin.prototype.render = function (target, options) {
        var _this = this;
        if (options && typeof options.errorStyle != 'undefined' && options.errorStyle != null)
            this.options.errorStyle += options.errorStyle;
        this.targetEle = target;
        if (this.targetEle)
            this.targetEle.innerHTML = '';
        if (!target || !options || !options.entryId) {
            this.displayError('param');
            return;
        }
        //set default param values
        this.options = __assign({}, this.defaultOptions);
        if (this.oldOptions && this.oldOptions.entryId == options.entryId) {
            if (this.oldOptions.orientation !== options.orientation || this.oldOptions.color !== options.color || this.oldOptions.size !== options.size || this.oldOptions.hideLogo !== options.hideLogo) {
                this.updateParams(options);
                if (this.formattedApiResult)
                    this.createTemplate(this.formattedApiResult);
            }
            return;
        }
        this.updateParams(options);
        this.getApiData(options.entryId.toLowerCase()).then(function (resultData) {
            if (typeof resultData != 'undefined' && typeof resultData.responseHeader.error == 'undefined') { //no error data in response
                if (typeof resultData.grouped != 'undefined' && typeof resultData.grouped.pdb_id.groups != 'undefined') {
                    resultData.grouped.pdb_id.groups.forEach(function (value) {
                        _this.formattedApiResult = _this.formatApiData(value);
                        _this.createTemplate(_this.formattedApiResult);
                    });
                }
                else {
                    _this.displayError();
                }
            }
            else {
                _this.displayError();
            }
        });
    };
    PdbPrintsPlugin.prototype.getApiData = function (entryId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = "https://www.ebi.ac.uk/pdbe/search/pdb/select?fl=pdb_id,organism_synonyms,number_of_bound_entities%2C+number_of_protein_chains%2Cexperimental_method%2C+experiment_data_available%2Cexpression_host_sci_name%2C+citation_year%2C+entry_organism_scientific_name,number_of_RNA_chains,number_of_DNA_chains,sample_preparation_method,emdb_id&group=true&group.field=pdb_id&group.limit=100&rows=1000&wt=json&q=pdb_id:" + entryId;
                        return [4 /*yield*/, fetch(url)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        console.log("API request failed. Error: ", e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PdbPrintsPlugin.prototype.checkIFOrganismsAreIdentical = function (scientificNameArr) {
        var nameObj = [];
        scientificNameArr.forEach(function (SciName, sciIndex) {
            var sciNameStr = SciName.toLowerCase().split('|')[0];
            if (nameObj.indexOf(sciNameStr) == -1) {
                nameObj.push(sciIndex);
            }
        });
        if (nameObj.length > 1) {
            return false;
        }
        else {
            return true;
        }
    };
    PdbPrintsPlugin.prototype.formatApiData = function (respData) {
        var _this = this;
        var pdbId = '';
        var recDataObj = { "PDBeLogo": [], "PrimaryCitation": [], "Protein": [], "Ligands": [], "NucleicAcid": [], "Expressed": [], "Experimental": [], "Taxonomy": [] };
        var mixedExpressionFlag = false;
        var sampleData = '';
        var multipleOrganismFlag = false;
        // let OrganismData = '';
        var OrganismSciName = '';
        var organismSynonymsFlag = false;
        respData.doclist.docs.forEach(function (docsVal) {
            pdbId = docsVal['pdb_id'];
            //Pdb logo
            recDataObj["PDBeLogo"][0] = pdbId;
            //check for primary citation
            if (typeof docsVal['citation_year'] != 'undefined' && docsVal['citation_year']) {
                recDataObj["PrimaryCitation"][0] = "published";
            }
            else {
                recDataObj["PrimaryCitation"][0] = "unpublished";
            }
            //check for protein
            if (typeof docsVal['number_of_protein_chains'] != 'undefined' && docsVal['number_of_protein_chains']) {
                recDataObj["Protein"][0] = "present";
            }
            else {
                recDataObj["Protein"][0] = "absent";
            }
            //check for ligands
            if (typeof docsVal['number_of_bound_entities'] != 'undefined' && docsVal['number_of_bound_entities']) {
                recDataObj["Ligands"][0] = "present";
            }
            else {
                recDataObj["Ligands"][0] = "absent";
            }
            //check for nucleic acid
            if ((typeof docsVal['number_of_RNA_chains'] != 'undefined' && docsVal['number_of_RNA_chains']) ||
                (typeof docsVal['number_of_DNA_chains'] != 'undefined' && docsVal['number_of_DNA_chains'])) {
                recDataObj["NucleicAcid"][0] = "present";
            }
            else {
                recDataObj["NucleicAcid"][0] = "absent";
            }
            //check for expression
            if (typeof docsVal['sample_preparation_method'] != 'undefined' && docsVal['sample_preparation_method']) {
                //set sampleData
                var totalSpMethods = docsVal['sample_preparation_method'].length;
                for (var spmi = 0; spmi < totalSpMethods; spmi++) {
                    if (sampleData === '') {
                        sampleData = docsVal['sample_preparation_method'][spmi];
                    }
                    //check if it changes
                    if (docsVal['sample_preparation_method'][spmi] !== sampleData) {
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
            }
            else {
                var elseExpType = '';
                var chkPattern = new RegExp("Synthetic construct", "i"); //pattern to check organism for synthetic
                if (typeof docsVal['entry_organism_scientific_name'] != 'undefined' && chkPattern.test(docsVal['entry_organism_scientific_name'])) {
                    recDataObj["Expressed"][0] = elseExpType = "synthetic";
                }
                else {
                    recDataObj["Expressed"][0] = "CGIlogoUnknown";
                }
                //check if sampleData to mark it multiple
                if (recDataObj["Expressed"][0] !== sampleData) {
                    mixedExpressionFlag = true;
                    elseExpType = 'other';
                }
                //set sampleData
                if (sampleData === '') {
                    sampleData = elseExpType;
                }
                //check if sampleData to mark it multiple
                if (respData.doclist.docs.length > 1 && recDataObj["Expressed"][1] !== sampleData) {
                    mixedExpressionFlag = true;
                }
            }
            //check for experimental
            if (typeof docsVal['experimental_method'] != 'undefined' && docsVal['experimental_method']) {
                var noExpData = true;
                if (typeof docsVal['experiment_data_available'] == 'object' && docsVal['experiment_data_available'][0] == 'y') {
                    noExpData = false;
                }
                else if (typeof docsVal['experiment_data_available'] == "string" && docsVal['experiment_data_available'] == 'y') {
                    noExpData = false;
                }
                if (docsVal['experimental_method'].length === 1) {
                    if (docsVal['experimental_method'][0].toLowerCase() === 'x-ray diffraction') {
                        recDataObj["Experimental"][0] = "xray";
                        if (noExpData) {
                            recDataObj["Experimental"][0] = "xrayNoData";
                        }
                    }
                    else if (docsVal['experimental_method'][0].toLowerCase() === 'solution nmr' || docsVal['experimental_method'][0].toLowerCase() === 'solid-state nmr') {
                        recDataObj["Experimental"][0] = "nmr";
                        if (noExpData) {
                            recDataObj["Experimental"][0] = "nmrNoData";
                        }
                    }
                    else if (docsVal['experimental_method'][0].toLowerCase() === 'electron microscopy') {
                        recDataObj["Experimental"][0] = "em";
                        if (noExpData && !docsVal['emdb_id']) {
                            recDataObj["Experimental"][0] = "emNoData";
                        }
                    }
                    else {
                        recDataObj["Experimental"][0] = "other";
                    }
                }
                else {
                    recDataObj["Experimental"][0] = "hybrid";
                    if (noExpData) {
                        recDataObj["Experimental"][0] = "hybridNoData";
                    }
                }
            }
            else {
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
            if (typeof docsVal['entry_organism_scientific_name'] != 'undefined' && docsVal['entry_organism_scientific_name']) { //organism scientific name data check
                OrganismSciName = docsVal['entry_organism_scientific_name'];
                //Set multiple flag
                if (docsVal['entry_organism_scientific_name'].length > 1) {
                    var identicalOrganismsFlag = _this.checkIFOrganismsAreIdentical(docsVal['entry_organism_scientific_name']);
                    if (identicalOrganismsFlag == false) {
                        multipleOrganismFlag = true;
                    }
                    else {
                        var sciNameStr = docsVal['entry_organism_scientific_name'][0].split('|')[0];
                        if (sciNameStr in organismMap) {
                            recDataObj["Taxonomy"][0] = organismMap[sciNameStr];
                        }
                    }
                }
                else {
                    var sciNameStr = docsVal['entry_organism_scientific_name'][0].split('|')[0];
                    if (sciNameStr in organismMap) {
                        recDataObj["Taxonomy"][0] = organismMap[sciNameStr];
                    }
                }
                var chkPattern = new RegExp("Synthetic construct", "i"); //pattern to check organism for synthetic
                if (chkPattern.test(docsVal['entry_organism_scientific_name'])) {
                    recDataObj["Taxonomy"][0] = "artificial";
                }
            }
            if (!recDataObj["Taxonomy"][0] && typeof docsVal['organism_synonyms'] != 'undefined' && docsVal['organism_synonyms']) { //organism synonyms data check
                organismSynonymsFlag = true; //set Organism synonyms flag for image
                //Get tax id from organism synonyms
                var totOrgSynonyms = docsVal['organism_synonyms'].length;
                for (var synIndex = 0; synIndex < totOrgSynonyms; synIndex++) {
                    if (docsVal['organism_synonyms'][synIndex] in organismMap) {
                        recDataObj["Taxonomy"][0] = organismMap[docsVal['organism_synonyms'][synIndex]];
                        break;
                    }
                }
                ;
                if (!recDataObj["Taxonomy"][0]) {
                    recDataObj["Taxonomy"][0] = "other";
                }
            }
        });
        //check for multiple expression
        if (mixedExpressionFlag) {
            recDataObj["Expressed"][0] = "multiple";
        }
        //check for synthetic organism
        if (recDataObj["Expressed"][1] === "synthetic") {
            var chkPattern = new RegExp("Synthetic construct", "i"); //pattern to check organism for synthetic
            if (OrganismSciName !== '' && !chkPattern.test(OrganismSciName)) {
                //If organism is present then don't mark it as artificial or synthetic
            }
            else {
                recDataObj["Taxonomy"][0] = "artificial";
                if (organismSynonymsFlag) { //if synonyms data present
                    recDataObj["Taxonomy"][0] = "other";
                }
            }
        }
        //check for multiple organism
        if (multipleOrganismFlag) {
            recDataObj["Taxonomy"][0] = "multiple";
        }
        return recDataObj;
    };
    PdbPrintsPlugin.prototype.createTemplate = function (logoData) {
        var _this = this;
        this.targetEle.innerHTML = "<div class=\"pdbLogosWrapper\">\n          <div class=\"pdbeLogoCol widthAuto " + (this.options.orientation == 'vertical' ? '' : 'floatLeft') + "\" style=\"height:" + this.options.size + "px;position:relative;\">\n              <div class=\"pdbeLogoCol pdbeLogoCol1\" style=\"font-size:" + (+this.options.size * 4) / (12 - 1) + "px\">\n                  <a target=\"_self\" href=\"https://www.ebi.ac.uk/pdbe/entry/pdb/entry/pdb/" + logoData.PDBeLogo[0] + "\" title=\"For more information about key features of this entry, click on the individual icons.\">\n                      <font face=\"Courier New\"><b>" + logoData.PDBeLogo[0] + "</b></font>\n                  </a>\n              </div>\n              <div class=\"pdbeLogoCol1Bottom\">\n                  <a _target=\"blank\" title=\"pdbe.org\" href=\"https://pdbe.org\">\n                      <img border=\"0\" src=\"https://www.ebi.ac.uk/pdbe/widgets/html/PDBeWatermark_horizontal_" + this.options.size + ".png\">\n                  </a>\n              </div>\n          </div>\n          <div class=\"pdbLogos\"></div>\n      </div>";
        if (this.options.hideLogo.indexOf('PDBeLogo') > -1)
            this.targetEle.querySelector('.pdbeLogoCol').style.display = 'none';
        var categories = ["PrimaryCitation", "Taxonomy", "Expressed", "Experimental", "Protein", "NucleicAcid", "Ligands"];
        var categoryUrl = ["citations", "analysis", "analysis", "experiment", "analysis", "analysis", "ligands"];
        var logosArr = [];
        categories.forEach(function (category, index) {
            if (_this.options.hideLogo && _this.options.hideLogo.indexOf(category) == -1) {
                var hrefUrl = "target=\"pdbprints\" href=\"https://www.ebi.ac.uk/pdbe/entry/pdb/" + logoData.PDBeLogo[0] + "/" + categoryUrl[index] + "\"";
                if (category == 'Ligands' && logoData[category][0] == 'absent')
                    hrefUrl = '';
                logosArr.push("<div class=\"pdbeLogoCol widthAuto " + (_this.options.orientation == 'vertical' ? '' : 'floatLeft') + "\" style=\"height:" + _this.options.size + "px\">\n                  <a " + hrefUrl + " title=\"" + _this.getTitle([category, logoData[category][0], logoData.PDBeLogo[0]]) + "\">\n                      <img class=\"pdbLogoImg\" src=\"https://www.ebi.ac.uk/pdbe/widgets/pdblogos/" + _this.options.color + "/" + _this.options.size + "/" + category + "_" + logoData[category][0] + ".png\" border=\"0\">\n                  </a>\n              </div>");
            }
        });
        if (logosArr.length > 0) {
            this.targetEle.querySelector('.pdbLogos').innerHTML = logosArr.join('');
        }
    };
    PdbPrintsPlugin.prototype.getTitle = function (titleForEle) {
        var title = '';
        switch (titleForEle[0]) {
            case 'PrimaryCitation':
                switch (titleForEle[1]) {
                    case 'published':
                        title = 'A paper describing this entry has been published.';
                        break;
                    case 'unpublished':
                        title = 'The PDB does not have any information about a published paper describing this entry.';
                        break;
                    case 'CGIlogoUnknown':
                        title = 'This icon conveys information about whether or not a paper describing this entry has been published.';
                        break;
                }
                break;
            case 'Taxonomy':
                switch (titleForEle[1]) {
                    case 'artificial':
                        title = 'The biomacromolecules in this entry were artificially designed.';
                        break;
                    case 'other':
                        title = 'Information about the source organism of the biomacromolecules in this entry can be obtained by clicking on the icon.';
                        break;
                    case 'multiple':
                        title = 'The biomacromolecules in this entry derive from multiple organisms.';
                        break;
                    case 'fly':
                        title = 'The source organism of the biomacromolecules in this entry is fruit-fly.';
                        break;
                    case 'CGIlogoUnknown':
                        title = 'This icon conveys information about the source organism of the biomacromolecules in this entry.';
                        break;
                    default:
                        title = 'The source organism of the biomacromolecules in this entry is ' + titleForEle[1] + '.';
                }
                break;
            case 'Expressed':
                switch (titleForEle[1]) {
                    case 'expressed':
                        title = 'The sample of the biomacromolecules in this entry was obtained by expression and purification.';
                        break;
                    case 'synthetic':
                        title = 'The sample of the biomacromolecules in this entry was obtained by chemical synthesis.';
                        break;
                    case 'purified':
                        title = 'The sample of the biomacromolecules in this entry was extracted and purified from a biological source.';
                        break;
                    case 'multiple':
                        title = 'The sample of the biomacromolecules in this entry was obtained using multiple techniques.';
                        break;
                    case 'other':
                        title = 'The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.';
                        break;
                    case 'CGIlogoUnknown':
                        title = 'This icon conveys information about the production techniques used to obtain the biomacromolecular samples for this entry.';
                        break;
                }
                break;
            case 'Experimental':
                switch (titleForEle[1]) {
                    case 'xray':
                        title = 'The structure was determined using X-ray crystallography and experimental data is available.';
                        break;
                    case 'nmr':
                        title = 'The structure was determined using NMR spectroscopy and experimental data is available.';
                        break;
                    case 'em':
                        title = 'The structure was determined using Electron Microscopy and experimental data is available.';
                        break;
                    case 'multiple':
                        title = 'The structure was determined using Electron Crystallography and experimental data is available.';
                        break;
                    case 'extal':
                        title = 'The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.';
                        break;
                    case 'hybrid':
                        title = 'The structure was determined using a hybrid technique and experimental data is available.';
                        break;
                    case 'other':
                        title = 'The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof and experimental data is available.';
                        break;
                    case 'xrayNoData':
                        title = 'The structure was determined using X-ray crystallography (no experimental data available).';
                        break;
                    case 'nmrNoData':
                        title = 'The structure was determined using NMR spectroscopy (no experimental data available).';
                        break;
                    case 'emNoData':
                        title = 'The structure was determined using Electron Microscopy (no experimental data available).';
                        break;
                    case 'extalNoData':
                        title = 'The structure was determined using Electron Crystallography (no experimental data available).';
                        break;
                    case 'hybridNoData':
                        title = 'The structure was determined using a hybrid technique (no experimental data available).';
                        break;
                    case 'otherNoData':
                        title = 'The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof (no experimental data available).';
                        break;
                    case 'extalNoData':
                        title = 'This icon conveys information about the structure-determination technique for this entry.';
                        break;
                }
                break;
            case 'Protein':
                switch (titleForEle[1]) {
                    case 'present':
                        title = 'This entry contains protein.';
                        break;
                    case 'absent':
                        title = 'This entry does not contain protein.';
                        if (titleForEle[2].substring(0, 3) === "EMD")
                            title = 'Presence of protein is not annotated for this EMDB entry.';
                        break;
                    case 'CGIlogoUnknown':
                        title = 'This icon conveys information about the presence of protein in the entry.';
                        break;
                }
                break;
            case 'NucleicAcid':
                switch (titleForEle[1]) {
                    case 'present':
                        title = 'This entry contains nucleic acid (DNA, RNA).';
                        break;
                    case 'absent':
                        title = 'This entry does not contain nucleic acid (DNA, RNA).';
                        if (titleForEle[2].substring(0, 3) === "EMD")
                            title = 'Presence of DNA or RNA is not annotated for this EMDB entry.';
                        break;
                    case 'CGIlogoUnknown':
                        title = 'This icon conveys information about the presence of nucleic acid (DNA, RNA) in the entry.';
                        break;
                }
                break;
            case 'Ligands':
                switch (titleForEle[1]) {
                    case 'present':
                        title = 'This entry contains one or more ligands.';
                        break;
                    case 'absent':
                        title = 'This entry does not contain any ligands.';
                        break;
                    case 'CGIlogoUnknown':
                        title = 'This icon conveys information about the presence of ligands in the entry.';
                        break;
                }
                break;
        }
        return title;
    };
    return PdbPrintsPlugin;
}());
window.PdbPrintsPlugin = PdbPrintsPlugin;
//# sourceMappingURL=pdb-prints-plugin.js.map