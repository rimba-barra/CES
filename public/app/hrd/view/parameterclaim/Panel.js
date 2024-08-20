Ext.define('Hrd.view.parameterclaim.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.parameterclaim.Grid',
    	'Hrd.view.parameterclaim.FormSearch'
    ],
    alias 				: 'widget.parameterclaimpanel',
    itemId 				: 'ParameterclaimPanel',
    gridPanelName 		: 'parameterclaimgrid',
    formSearchPanelName : 'parameterclaimformsearch'
});