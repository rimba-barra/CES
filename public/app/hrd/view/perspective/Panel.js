Ext.define('Hrd.view.perspective.Panel',{
	extend 				: 'Hrd.library.box.view.Panel',
	requires 			: [
		'Hrd.view.perspective.Grid',
		'Hrd.view.perspective.FormSearch'
	],
    alias 				: 'widget.perspectivepanel',
    itemId 				: 'PerspectivePanel',
    gridPanelName 		: 'perspectivegrid',
    formSearchPanelName : 'perspectiveformsearch'
});