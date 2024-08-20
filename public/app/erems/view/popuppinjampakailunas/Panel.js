Ext.define('Erems.view.popuppinjampakailunas.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popuppinjampakailunas.Grid','Erems.view.popuppinjampakailunas.FormSearch'],
	alias               : 'widget.popuppinjampakailunaspanel',
	itemId              : 'PopuppinjampakailunasPanel',
	gridPanelName       : 'popuppinjampakailunasgrid',
	formSearchPanelName : 'popuppinjampakailunasformsearch'
});