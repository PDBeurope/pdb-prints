angular.module("template/prints/pdbLogos.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/prints/pdbLogos.html",
    '<div class="pdbLogosWrapper">'+
	  '<div class="widthAuto" ng-class="{\'floatLeft\': config.orientation != \'vertical\'}" style="height:{{config.size}}px;position:relative;" ng-hide="(config.hideLogo.indexOf(\'PDBeLogo\') > -1)">'+
		'<div class="pdbeLogoCol pdbeLogoCol1" style="font-size:{{ (config.size * 4) / (12-1) }}px">'+
		  '<a target="_self" title="{{ [\'pdbeLogo\'] | tooltipFilter }}"'+
		  'href="{{config.domainUrl}}/entry/pdb/{{logoData.PDBeLogo[0]}}/" ng-click="logoClick(\'pdbeLogo\')">'+
			'<font face="Courier New"><b>{{logoData.PDBeLogo[0]}}</b></font>'+
		  '</a>'+
		'</div>'+
		'<div class="pdbeLogoCol1Bottom">'+
		  '<a target="{{config.targetWindow}}" title="pdbe.org" href="{{config.domainUrl}}">'+
			'<img border="0" ng-src="//www.ebi.ac.uk/pdbe/widgets/html/PDBeWatermark_horizontal_{{config.size}}.png">'+
		  '</a>'+
		'</div>'+
	  '</div>'+
	  '<div ng-repeat="category in categories" class="pdbeLogoCol widthAuto" ng-class="{\'floatLeft\': config.orientation != \'vertical\'}" ng-hide="(config.hideLogo.indexOf(category) > -1)" style="height:{{config.size}}px">'+
		'<a target="pdbprints" ng-attr-title="{{ [ category, logoData[category][0], logoData.PDBeLogo[0] ] | tooltipFilter }}" href="{{config.domainUrl}}/entry/pdb/{{logoData.PDBeLogo[0]}}{{categoryUrl[$index]}}">'+
		  '<img class="pdbLogoImg" ng-src="{{config.domainUrl}}/widgets/pdblogos/{{config.color}}/{{config.size}}/{{category}}_{{logoData[category][0]}}.png" border="0">'+
		'</a>'+
	  '</div>'+
	'</div>');
}]);