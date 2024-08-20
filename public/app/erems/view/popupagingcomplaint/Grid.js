Ext.define('Erems.view.popupagingcomplaint.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.popupagingcomplaintgrid',
	store: 'Popupagingcomplaint',
	bindPrefixName: '',
	newButtonLabel: 'New',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {
			},
			selModel: Ext.create('Ext.selection.CheckboxModel', {
			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster',
					width: 150,
					dataIndex: 'cluster',
					hideable: false,
					text: 'Cluster'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_block',
					width: 60,
					dataIndex: 'block',
					hideable: false,
					text: 'Block'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					width: 60,
					dataIndex: 'unit_number',
					hideable: false,
					text: 'Unit No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_complaint_no',
					width: 180,
					dataIndex: 'complaint_no',
					hideable: false,
					text: 'Complaint No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_complaintdate',
//					width: 120,
					dataIndex: 'complaint_date',
					hideable: false,
					text: 'Complaint Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_complaint_type',
					width: 100,
					dataIndex: 'complainttype',
					hideable: false,
					text: 'Complaint Type'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_contractor',
					width: 60,
					dataIndex: 'contractorname',
					hideable: false,
					text: 'Contractor'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_estimation',
					width: 60,
					dataIndex: 'estimation',
					hideable: false,
					text: 'Working Estimation'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_startdate',
					dataIndex: 'start_date',
					hideable: false,
					text: 'Start Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_enddate',
					dataIndex: 'end_date',
					hideable: false,
					text: 'End Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_aging',
					dataIndex: 'aging',
					hideable: false,
					text: 'Aging (per hari ini)',
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_status',
					width: 120,
					dataIndex: 'complaintstatus',
					hideable: false,
					text: 'Complaint Status'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},

	generateDockedItems: function () {
		var me = this;

		var dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 28,
				items: [
					{
						xtype: 'button',
						action: 'export_excel',
						itemId: 'btnPrint',
						margin: '0 5 0 0',
						iconCls: 'icon-print',
						text: 'Export Excel'
					}
				]
			},
			{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				width: 360,
				displayInfo: true,
				store: this.getStore()
			}
		];
		return dockedItems;
	}
});
