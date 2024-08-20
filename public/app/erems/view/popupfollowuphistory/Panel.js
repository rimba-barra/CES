Ext.define('Erems.view.popupfollowuphistory.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popupfollowuphistory.Grid','Erems.view.popupfollowuphistory.FormSearch'],
	alias               : 'widget.popupfollowuphistorypanel',
	itemId              : 'PopupfollowuphistoryPanel',
	gridPanelName       : 'popupfollowuphistorygrid',
	formSearchPanelName : 'popupfollowuphistoryformsearch'
});