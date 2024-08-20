Ext.define('Erems.view.popuplistpembatalan.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popuplistpembatalan.Grid','Erems.view.popuplistpembatalan.FormSearch'],
	alias               : 'widget.popuplistpembatalanpanel',
	itemId              : 'PopuplistpembatalanPanel',
	gridPanelName       : 'popuplistpembatalangrid',
	formSearchPanelName : 'popuplistpembatalanformsearch'
});