Ext.define('Hrd.view.competencycategory.Panel',{
	extend 				: 'Hrd.library.box.view.Panel',
	requires 			: [
		'Hrd.view.competencycategory.Grid',
		'Hrd.view.competencycategory.FormSearch'
	],
    alias 				: 'widget.competencycategorypanel',
    itemId 				: 'CompetencycategoryPanel',
    gridPanelName 		: 'competencycategorygrid',
    formSearchPanelName : 'competencycategoryformsearch'
});