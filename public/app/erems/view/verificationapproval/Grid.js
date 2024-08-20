Ext.define('Erems.view.verificationapproval.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.verificationapprovalgrid',
	store          : 'Verificationapproval',
	bindPrefixName : 'Verificationapproval',
	newButtonLabel : 'Add New',
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {

			},
			selModel : Ext.create('Ext.selection.CheckboxModel', {
				mode: "SINGLE"
			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					header    : 'verification_approval_id',
					dataIndex : 'verification_approval_id',
					hidden    : true
				},
				{
					xtype     : 'gridcolumn',
					header    : 'is_approve_2',
					dataIndex : 'is_approve_2',
					hidden    : true
				},
				{
					xtype     : 'gridcolumn',
					header    : 'is_reject_2',
					dataIndex : 'is_reject_2',
					hidden    : true
				},
				{
					xtype     : 'gridcolumn',
					header    : 'is_approve',
					dataIndex : 'is_approve',
					hidden    : true
				},
				{
					xtype     : 'gridcolumn',
					header    : 'is_reject',
					dataIndex : 'is_reject',
					hidden    : true
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster_code',
					dataIndex : 'cluster_code',
					hideable  : false,
					text      : 'Cluster Code'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					dataIndex : 'cluster',
					hideable  : false,
					text      : 'Cluster'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					width     : 130,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Unit Number'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_no',
					width     : 130,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchaseletter No'
				},
				{
					xtype     : 'datecolumn',
					itemId    : 'colms_purchaseletter_date',
					width     : 130,
					dataIndex : 'purchaseletter_date',
					hideable  : false,
					text      : 'Purchaseletter Date',
					format    : 'd-m-Y'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_name',
					width     : 130,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Customer Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_verification',
					width     : 130,
					dataIndex : 'verification',
					hideable  : false,
					text      : 'Verification Approval'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_verification_type',
					width     : 130,
					dataIndex : 'verification_type',
					hideable  : false,
					text      : 'Verification Type'
				},
				{
					xtype     :'datecolumn',
					itemId    : 'colms_verification_approval_date',
					width     : 130,
					dataIndex : 'verification_approval_date',
					hideable  : false,
					text      : 'Verification Date',
					format    : 'd-m-Y'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_verification_approval_no',
					width     : 130,
					dataIndex : 'verification_approval_no',
					hideable  : false,
					text      : 'Verification No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_request_by_2_position',
					width     : 130,
					dataIndex : 'request_by_2_position',
					hideable  : false,
					text      : 'Verification Level'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_status',
					width     : 130,
					dataIndex : 'status',
					hideable  : false,
					text      : 'Status'
				},
				{
					xtype     : 'booleancolumn',
					itemId    : 'colms_is_used',
					width     : 100,
					dataIndex : 'is_used',
					hideable  : false,
					text      : 'Used?',
					align     : 'center',
					falseText : 'No',
					trueText  : 'Yes'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_request_by_1_name',
					width     : 130,
					dataIndex : 'request_by_1_name',
					hideable  : false,
					text      : 'Request By'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_request_by_2_name',
					width     : 130,
					dataIndex : 'request_by_2_name',
					hideable  : false,
					text      : 'Request 2 By'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_approved_by_name',
					width     : 130,
					dataIndex : 'approved_by_name',
					hideable  : false,
					text      : 'Approved By'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
	generateDockedItems : function(){
		var me = this;

		var dockedItems = [
			{
				xtype  : 'toolbar',
				dock   : 'top',
				height : 28,
				items  : [
					{
						xtype      : 'button',
						action     : 'create',
						hidden     : true,
						itemId     : 'btnNew',
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName + 'Create',
						text       : me.newButtonLabel
					},
					{
						xtype      : 'button',
						action     : 'update',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnEdit',
						margin     : '0 5 0 0',
						iconCls    : 'icon-edit',
						text       : 'Edit',
						bindAction : me.bindPrefixName + 'Update'
					},
					{
						xtype      : 'button',
						action     : 'destroy',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnDelete',
						bindAction : me.bindPrefixName + 'Delete',
						iconCls    : 'icon-delete',
						text       : 'Delete'
					},
					{
						xtype   : 'button',
						action  : 'prinout',
						margin  : '0 5 0 0',
						iconCls : 'icon-print',
						text    : 'Print'
                    }
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				width       : 360,
				displayInfo : true,
				store       : me.getStore()
			},
			{
				xtype  : 'toolbar',
				dock   : 'bottom',
				layout : {
					padding : 6,
					type    : 'hbox'
				},
				items: [
					{
						xtype     : 'button',
						itemId    : 'approve_2',
						action    : 'approve_2',
						textAlign : 'left',
						value     : 1,
						disabled  : true,
						hidden    : true,
						padding   : 5,
						width     : 120,
						iconCls   : 'icon-approve',
						text      : 'Approve / Un-Approve (2)'
					},
					{
						xtype     : 'button',
						itemId    : 'approve_final',
						action    : 'approve_final',
						textAlign : 'left',
						value     : 1,
						disabled  : true,
						hidden    : true,
						padding   : 5,
						width     : 130,
						iconCls   : 'icon-approve',
						text      : 'Approve / Un-Approve Final'
					},
					{
						xtype     : 'button',
						itemId    : 'reject',
						action    : 'reject',
						textAlign : 'left',
						value     : 1,
						disabled  : true,
						hidden    : true,
						padding   : 5,
						width     : 75,
						iconCls   : 'icon-unapprove',
						text      : 'Reject'
					},
				]
			}
		];
		return dockedItems;
	}
});