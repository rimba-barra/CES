Ext.define('Erems.view.popuplistautocancel.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popuplistautocancel.Grid','Erems.view.popuplistautocancel.FormSearch'],
	alias               : 'widget.popuplistautocancelpanel',
	itemId              : 'PopuplistautocancelPanel',
	gridPanelName       : 'popuplistautocancelgrid',
	formSearchPanelName : 'popuplistautocancelformsearch'
});