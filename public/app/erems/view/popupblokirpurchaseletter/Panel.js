Ext.define('Erems.view.popupblokirpurchaseletter.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popupblokirpurchaseletter.Grid','Erems.view.popupblokirpurchaseletter.FormSearch'],
	alias               : 'widget.popupblokirpurchaseletterpanel',
	itemId              : 'PopupblokirpurchaseletterPanel',
	gridPanelName       : 'popupblokirpurchaselettergrid',
	formSearchPanelName : 'popupblokirpurchaseletterformsearch'
});