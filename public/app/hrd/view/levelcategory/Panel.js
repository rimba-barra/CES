Ext.define('Hrd.view.levelcategory.Panel',{
	extend 				: 'Hrd.library.box.view.Panel',
	requires 			: [
		'Hrd.view.levelcategory.Grid',
		'Hrd.view.levelcategory.FormSearch'
	],
    alias 				: 'widget.levelcategorypanel',
    itemId 				: 'LevelcategoryPanel',
    gridPanelName 		: 'levelcategorygrid',
    formSearchPanelName : 'levelcategoryformsearch'
});