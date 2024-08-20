Ext.define('Erems.view.masterperiodecutoff.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.masterperiodecutoff.Grid', 'Erems.view.masterperiodecutoff.FormSearch'],
	alias               : 'widget.masterperiodecutoffpanel',
	itemId              : 'MasterperiodecutoffPanel',
	gridPanelName       : 'masterperiodecutoffgrid',
	formSearchPanelName : 'masterperiodecutoffformsearch'
});