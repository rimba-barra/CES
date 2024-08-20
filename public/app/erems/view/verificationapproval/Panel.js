Ext.define('Erems.view.verificationapproval.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.verificationapproval.Grid','Erems.view.verificationapproval.FormSearch'],
	alias               : 'widget.verificationapprovalpanel',
	itemId              : 'VerificationapprovalPanel',
	gridPanelName       : 'verificationapprovalgrid',
	formSearchPanelName : 'verificationapprovalformsearch'
});