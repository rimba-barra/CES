Ext.define('Erems.view.complaint.Panel',{
	extend              :'Erems.library.template.view.Panel',
	requires            :['Erems.view.complaint.Grid','Erems.view.complaint.FormSearch'],
	alias               :'widget.complaintpanel',
	itemId              :'ComplaintPanel',
	gridPanelName       :'complaintgrid',
	formSearchPanelName :'complaintformsearch'
});