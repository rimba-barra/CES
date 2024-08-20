Ext.define('Erems.view.complaint.DetailGridUtility', {
	extend        : 'Ext.grid.Panel',
	alias         : 'widget.complaintdetailgridutility',
	store         : 'Utilitydetail',
	requires      : [],
	height        : 150,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			columns: [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_utilitytype',
					width     : 100,
					dataIndex : 'utilitytype',
					hideable  : false,
					text      : 'Utility Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_installment_no',
					width     : 100,
					dataIndex : 'installment_no',
					hideable  : false,
					text      : 'Utility No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_request_date',
					width     : 100,
					dataIndex : 'request_date',
					hideable  : false,
					text      : 'Request Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_installment_date',
					width     : 100,
					dataIndex : 'installment_date',
					hideable  : false,
					text      : 'Installment Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_followup_date',
					width     : 100,
					dataIndex : 'followup_date',
					hideable  : false,
					text      : 'Followup Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_meter_no',
					width     : 100,
					dataIndex : 'meter_no',
					hideable  : false,
					text      : 'Meter No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_utilitystatus',
					width     : 100,
					dataIndex : 'utilitystatus',
					hideable  : false,
					text      : 'Status'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_power',
					width     : 100,
					dataIndex : 'power',
					hideable  : false,
					text      : 'Daya'
				}
			]
		});

		me.callParent(arguments);
	}
});