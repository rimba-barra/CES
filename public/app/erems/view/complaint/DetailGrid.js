Ext.define('Erems.view.complaint.DetailGrid', {
	extend         : 'Ext.grid.Panel',
	alias          : 'widget.complaintdetailgrid',
	store          : 'Complaintdetail',
	bindPrefixName : 'Complaintdetail',
	newButtonLabel : 'Add New Complaint',
	height         : 200,
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			columns     : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_complaint_no',
					width     : 150,
					dataIndex : 'complaint_no',
					hideable  : false,
					text      : 'Complaint No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_complaint_date',
					width     : 100,
					dataIndex : 'complaint_date',
					hideable  : false,
					text      : 'Complaint Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_start_date',
					width     : 100,
					dataIndex : 'start_date',
					hideable  : false,
					text      : 'Start Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_end_date',
					width     : 100,
					dataIndex : 'end_date',
					hideable  : false,
					text      : 'End Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_estimation',
					width     : 100,
					dataIndex : 'estimation',
					hideable  : false,
					align     : 'right',
					text      : 'Estimation Days'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_complainttype',
					width     : 100,
					dataIndex : 'complainttype',
					hideable  : false,
					text      : 'Complaint Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pengawas_name',
					width     : 100,
					dataIndex : 'pengawas_name',
					hideable  : false,
					text      : 'Pengawas'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_contractor',
					width     : 150,
					dataIndex : 'contractorname',
					hideable  : false,
					text      : 'Contractor'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_detail_complaint',
					width     : 150,
					dataIndex : 'detail_complaint',
					hideable  : false,
					text      : 'Detail Complaint'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_respon_date',
					width     : 100,
					dataIndex : 'respon_date',
					hideable  : false,
					text      : 'Last Respon Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_respon_user',
					width     : 150,
					dataIndex : 'respon_user',
					hideable  : false,
					text      : 'User Respon'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_respon_note',
					width     : 150,
					dataIndex : 'respon_note',
					hideable  : false,
					text      : 'Respon Note'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_complaintstatus',
					width     : 150,
					dataIndex : 'complaintstatus',
					hideable  : false,
					text      : 'Status'
				},

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},

	generateDockedItems: function() {

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
						bindAction : me.bindPrefixName+'Create',
						text       : me.newButtonLabel
					}
				]
			}
		];
		return dockedItems;
	},
	generateActionColumn: function() {
		var me = this;
		var ac = {
			xtype     : 'actioncolumn',
			hidden    : true,
			itemId    : 'actioncolumn',
			width     : 50,
			resizable : false,
			align     : 'right',
			hideable  : false,
			items     : [
				{
					text       : 'Respon',
					iconCls    : 'icon-add',
					bindAction : me.bindPrefixName+'Createrespon',
					altText    : 'Respon',
					tooltip    : 'Respon Complaint'
				},
				{
					text       : 'Images',
					iconCls    : 'icon-copy',
					bindAction : me.bindPrefixName+'Createimages',
					altText    : 'Images',
					tooltip    : 'Images Complaint'
				},
				{
					text       : 'Edit',
					iconCls    : 'icon-edit',
					bindAction : me.bindPrefixName+'Update',
					altText    : 'Edit',
					tooltip    : 'Update Complaint'
				},
				{
					text       : 'Delete',
					iconCls    : 'icon-delete',
					bindAction : me.bindPrefixName+'Delete',
					altText    : 'Delete',
					tooltip    : 'Delete Complaint'
				}
			]
		};
		return ac;
	}

});
