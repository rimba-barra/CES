Ext.define('Hrd.view.level.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.level.Grid',
    	'Hrd.view.level.FormSearch'
    ],
    alias 				: 'widget.levelpanel',
    itemId 				: 'LevelPanel',
    gridPanelName 		: 'levelgrid',
    formSearchPanelName : 'levelformsearch'
});