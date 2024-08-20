Ext.define('Hrd.view.uom.Panel',{
	extend 				: 'Hrd.library.box.view.Panel',
	requires 			: [
		'Hrd.view.uom.Grid',
		'Hrd.view.uom.FormSearch'
	],
    alias 				: 'widget.uompanel',
    itemId 				: 'UomPanel',
    gridPanelName 		: 'uomgrid',
    formSearchPanelName : 'uomformsearch'
});