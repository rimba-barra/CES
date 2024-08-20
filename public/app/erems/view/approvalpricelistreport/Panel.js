Ext.define('Erems.view.approvalpricelistreport.Panel', {
	extend                    : 'Erems.library.template.view.Panel',
	requires                  : ['Erems.view.approvalpricelistreport.Grid', 'Erems.view.approvalpricelistreport.FormSearchheader'],
	alias                     : 'widget.approvalpricelistreportpanel',
	itemId                    : 'ApprovalpricelistreportPanel',
	gridPanelName             : 'approvalpricelistreportgrid',
	formSearchPanelName       : '',
	formSearchheaderPanelName : 'approvalpricelistreportformsearchheader',
});