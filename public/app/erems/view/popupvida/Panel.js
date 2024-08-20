Ext.define('Erems.view.popupvida.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popupvida.Grid','Erems.view.popupvida.FormSearch'],
	alias               : 'widget.popupvidapanel',
	itemId              : 'PopupvidaPanel',
	gridPanelName       : 'popupvidagrid',
	formSearchPanelName : 'popupvidaformsearch'
});