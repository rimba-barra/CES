Ext.define('Hrd.view.reloadpm.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.reloadpm.Grid',
    	'Hrd.view.reloadpm.FormSearch'
    ],
    alias 				: 'widget.reloadpmpanel',
    itemId 				: 'ReloadpmPanel',
    gridPanelName 		: 'reloadpmgrid',
    formSearchPanelName : 'reloadpmformsearch'
});