Ext.define('Hrd.view.jobfamily.Panel',{
	extend 				: 'Hrd.library.box.view.Panel',
	requires 			: [
		'Hrd.view.jobfamily.Grid',
		'Hrd.view.jobfamily.FormSearch'
	],
    alias 				: 'widget.jobfamilypanel',
    itemId 				: 'JobfamilyPanel',
    gridPanelName 		: 'jobfamilygrid',
    formSearchPanelName : 'jobfamilyformsearch'
});