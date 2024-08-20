Ext.define('Hrd.view.banding.Panel',{
	extend 				: 'Hrd.library.box.view.Panel',
	requires 			: [
		'Hrd.view.banding.Grid',
		'Hrd.view.banding.FormSearch'
	],
    alias 				: 'widget.bandingpanel',
    itemId 				: 'BandingPanel',
    gridPanelName 		: 'bandinggrid',
    formSearchPanelName : 'bandingformsearch'
});