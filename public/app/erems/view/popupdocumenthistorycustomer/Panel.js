Ext.define('Erems.view.popupdocumenthistorycustomer.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popupdocumenthistorycustomer.Grid','Erems.view.popupdocumenthistorycustomer.FormSearch'],
	alias               : 'widget.popupdocumenthistorycustomerpanel',
	itemId              : 'PopupdocumenthistorycustomerPanel',
	gridPanelName       : 'popupdocumenthistorycustomergrid',
	formSearchPanelName : 'popupdocumenthistorycustomerformsearch'
});