Ext.define('Erems.view.popuphasilsurvey.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popuphasilsurvey.Grid','Erems.view.popuphasilsurvey.FormSearch'],
	alias               : 'widget.popuphasilsurveypanel',
	itemId              : 'PopuphasilsurveyPanel',
	gridPanelName       : 'popuphasilsurveygrid',
	formSearchPanelName : 'popuphasilsurveyformsearch'
});