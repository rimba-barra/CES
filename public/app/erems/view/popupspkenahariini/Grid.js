Ext.define('Erems.view.popupspkenahariini.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.popupspkenahariinigrid',
	store: 'Popupspkenahariini',
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
					itemId: 'colms_purchaseletter_no',
					width: 150,
					dataIndex: 'purchaseletter_no',
					hideable: false,
					text: 'Purchase Letter No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchase_date',
//					width: 150,
					dataIndex: 'purchase_date',
					hideable: false,
					text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster',
					width: 100,
					dataIndex: 'cluster',
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
					text: 'Unit'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cust_name',
					width: 120,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_home_phone',
//					width: 120,
					dataIndex: 'customer_homephone',
					hideable: false,
					text: 'Home Phone'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_mobile_phone',
//					width: 120,
					dataIndex: 'customer_mobilephone',
					hideable: false,
					text: 'Mobile Phone'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_duedate',
//					width: 120,
					dataIndex: 'duedate',
					hideable: false,
					text: 'Tanggal Jatuh Tempo',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_amount',
//					width: 120,
					align: 'right',
					dataIndex: 'amount',
					hideable: false,
					text: 'Amount'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_tgl_sp',
//					width: 120,
					dataIndex: 'sp_date',
					hideable: false,
					text: 'Tanggal SP',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
