Ext.define('Hrd.view.approvalmatrix.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.approvalmatrix.Grid',
    	'Hrd.view.approvalmatrix.FormSearch'
    ],
    alias 				: 'widget.approvalmatrixpanel',
    itemId 				: 'ApprovalmatrixPanel',
    gridPanelName 		: 'approvalmatrixgrid',
    formSearchPanelName : 'approvalmatrixformsearch'
});