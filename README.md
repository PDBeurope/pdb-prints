# PDB Prints

[![NPM version](http://img.shields.io/npm/v/pdb-prints.svg)](https://www.npmjs.org/package/pdb-prints) 

A PDBprint for a PDB entry is a collection of PDBlogos displayed in a specific order, where each icon represents a well-defined category of information.

In PDBprints following categories are included:

* Primary citation: has the PDB entry been published?
* Taxonomy: what is the source organism of the biomacromolecule(s) in the entry?
* Sample-production technique: how was the sample of the biomacromolecule(s) obtained?
* Structure-determination method: which experimental technique(s) was used to determine the structure and was the experimental data deposited?
* Protein content: does the entry contain any protein molecules?
* Nucleic acid content: does the entry contain any nucleic acid molecules (DNA, RNA or a hybrid)?
* Heterogen content: does the entry contain any ligands (such as inhibitors, cofactors, ions, metals, etc.)?

It is a <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library" target="_blank">PDB Component Library</a> component.


![PDB Prints](/assets/pdb-prints.png)

## Getting Started
It takes only 3 easy steps to get started with PDB Components.

* Include module files and required dependencies
* Install the component
* Use component as custom element anywhere in the page

>*If you have already installed the <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library" target="_blank">PDB Component Library</a> in your application then you can directly start using the component as custom element (refer step 3
).*

#### **1.** Include module files and dependencies
Download the module javascript and stylesheet files (pdb.prints.min.js and pdb.prints.min.css) stored in the 'build' folder. Include the files in your page &lt;head&gt; section.

You'll also need to include the AngularJS library file (please refer *'bower.json'* file for complete dependencey details).
```html
<!-- minified component css -->
<link rel="stylesheet" type="text/css" href="build/pdb.prints.min.css">

<!-- Dependencey scripts (these can be skipped if already included in page) -->
<script src="bower_components/angular/angular.min.js"></script>

<!-- minified component js -->
<script src="build/pdb.prints.min.js"></script>
```

#### **2.** Installation
As soon as you've got the dependencies and library files included in your application page you just need to include following installation script :

***I)*** If you are developing an AngularJs Application

```html
<script>
angular.module('myModule', ['pdb.prints']);
</script>
```

***II)*** For other Applications

```html
<script>
(function () {
  'use strict';
  angular.element(document).ready(function () {
      angular.bootstrap(document, ['pdb.component.library']);
  });
}());
</script>
```

#### **3.** Use component as custom element anywhere in the page

The component can be used as custom element, attribute or class anywhere in the page.

```html
<!-- component as custom element -->
<pdb-prints pdb-ids="['1cbs']" settings='{"size": 48 }'></pdb-prints>

<!-- component as attribute -->
<div pdb-prints pdb-ids="['1cbs']" settings='{"size": 48 }'></div>

<!-- component as class -->
<div class="pdb-prints" pdb-ids="['1cbs']" settings='{"size": 48 }'></div>

```
## Documentation

| Sr. No.        | Attribute           | Values  | Description |
|:-------------:|:-------------|:-----|:-----|
| 1      | pdb-ids | _Array of pdb ids_ <br>**Mandatory attribute!** |Example : pdb-ids="['1cbs','1tqn']" <br>Please refer the examples to understand different ways of using this attribute |
| 2      | settings | _Object containing custom settings_ <br>*(Optional attribute)* <br> **Available options/settings :** <br>- _orientation_ : vertical / horizontal *(default)* <br>- _size_ : 48 / 64 / 128 / 36*(default)* <br>- _color_ : transparent / embl_green *(default)* <br>- _hideLogo_ : *(array)* - \["PDBeLogo","PrimaryCitation", "Taxonomy", "Expressed", "Experimental", "Protein", "NucleicAcid", "Ligands"\] |Example : settings='{"orientation": "vertical", "size": 36, "color": "embl_green", "hideLogo": ["PDBeLogo","PrimaryCitation"] }' |

*Please refer <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library/doc.html#a_pdbPrints" target="_blank">this link</a> for more documentation, demo and parameters details.*

## Contact
Please <a href="https://github.com/mandarsd/pdb-prints">use github</a> to report **bugs**, discuss potential **new features** or **ask questions** in general. Also you can <a href="http://www.ebi.ac.uk/pdbe/about/contact" target="_blank">contact us here</a> for support, feedback or to report any issues.

## License
The plugin is released under the Apache License Version 2.0. You can find out more about it at http://www.apache.org/licenses/LICENSE-2.0 or within the license file of the repository.

## If you are interested in this plugin...
...you might also want to have a look at the <a href="http://www.ebi.ac.uk/pdbe/pdb-component-library" target="_blank">PDB Component Library</a>.


"# pdb-prints" 
