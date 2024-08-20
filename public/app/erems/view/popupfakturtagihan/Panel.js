Ext.define('Erems.view.popupfakturtagihan.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popupfakturtagihan.Grid','Erems.view.popupfakturtagihan.FormSearch'],
	alias               : 'widget.popupfakturtagihanpanel',
	itemId              : 'PopupfakturtagihanPanel',
	gridPanelName       : 'popupfakturtagihangrid',
	formSearchPanelName : 'popupfakturtagihanformsearch'
});