Ext.define('Hrd.view.competencynames.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.competencynames.Grid',
    	'Hrd.view.competencynames.FormSearch'
    ],
    alias 				: 'widget.competencynamespanel',
    itemId 				: 'CompetencynamesPanel',
    gridPanelName 		: 'competencynamesgrid',
    formSearchPanelName : 'competencynamesformsearch'
});