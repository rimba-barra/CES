Ext.define('Erems.view.tunggakanipl.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.tunggakaniplgrid',
	store: 'Tunggakanipl',
	bindPrefixName: 'Tunggakanipl',
	itemId: 'tunggakaniplgrid',
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
					header: 'komisi_permintaan_id',
					dataIndex: 'komisi_permintaan_id',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster',
//					width: 100,
					dataIndex: 'cluster',
					hideable: false,
					text: 'Cluster'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_block',
//					width: 150,
					dataIndex: 'block',
					hideable: false,
					text: 'Block'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					width: 130,
					dataIndex: 'unit_number',
					hideable: false,
					text: 'Unit Number'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchaseletter_no',
					width: 130,
					dataIndex: 'purchaseletter_no',
					hideable: false,
					text: 'Purchaseletter No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchase_date',
					width: 130,
					dataIndex: 'purchase_date',
					format:'d-m-Y',
					hideable: false,
					text: 'Purchaseletter Date'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: 130,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_tunggakan_ipl',
					width: 130,
					dataIndex: 'tunggakan_ipl',
					align: 'right',
					hideable: false,
					text: 'Nilai Tunggakan'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_tunggakan_ipl_note',
//					width: 100,
					dataIndex: 'tunggakan_ipl_note',
					hideable: false,
					text: 'Catatan'
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
						action: 'update',
						disabled: true,
						hidden: true,
						itemId: 'btnEdit',
						margin: '0 5 0 0',
						iconCls: 'icon-edit',
						text: 'Edit',
						bindAction: me.bindPrefixName + 'Update'
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
	},
	generateActionColumn: function () {
		var me = this;
		var ac = {
			xtype: 'actioncolumn',
			hidden: true,
			itemId: 'actioncolumn',
			width: 50,
			resizable: false,
			align: 'right',
			hideable: false,
			items: [
				{
					text: 'Edit',
					iconCls: 'icon-edit',
					bindAction: me.bindPrefixName + 'Update',
					altText: 'Edit',
					tooltip: 'Edit'
				}
			]
		};
		return ac;
	},
});


