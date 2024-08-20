Ext.define('Erems.view.popupbayarpersenharilalu.Grid', {
	extend: 'Erems.library.template.view.GridDS2',
	alias: 'widget.popupbayarpersenharilalugrid',
	storeConfig: {
		id: 'PopupbayarpersenharilaluGridStore',
		idProperty: 'payment_id',
		extraParams: {}
	},
	bindPrefixName: 'Popupbayarpersenharilalu',
	newButtonLabel: 'New Form Order AJB',
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
					xtype: 'rownumberer',
					width: 30
				},
				{
					xtype: 'gridcolumn',
					width: 100,
					align: 'right',
					dataIndex: 'cluster_cluster',
					text: 'Kawasan'
				}, {
					xtype: 'gridcolumn',
					width: 70,
					dataIndex: 'unit_unit_number',
					hideable: false,
					text: 'Unit Number'
				}, {
					xtype: 'gridcolumn',
					width: 70,
					dataIndex: 'type_name',
					hideable: false,
					text: 'Type'
				}, {
					xtype: 'datecolumn',
					width: 100,
					dataIndex: 'purchase_date',
					format: 'd-m-Y',
					hideable: false,
					text: 'Tanggal Pesanan'
				}, {
					xtype: 'gridcolumn',
					width: 120,
					dataIndex: 'purchaseletter_no',
					hideable: false,
					text: 'Nomor Pesanan'
				}, {
					xtype: 'numbercolumn',
					width: 100,
					dataIndex: 'harga_total_jual',
					hideable: false,
					align: 'right',
					text: 'Harga Jual'
				},{
					xtype: 'numbercolumn',
					width: 100,
					dataIndex: 'total_payment',
					hideable: false,
					align: 'right',
					text: 'Total Payment'
				},{
					xtype: 'datecolumn',
					width: 100,
					dataIndex: 'payment_payment_date',
					format: 'd-m-Y',
					hideable: false,
					text: 'Tgl Terakhir Bayar'
				},{
					xtype: 'gridcolumn',
					width: 100,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				}, {
					xtype: 'gridcolumn',
					itemId: 'colms_sales_name',
					width: 100,
					dataIndex: 'salesman_employee_name',
					hideable: false,
					text: 'Sales Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_member_name',
					width: 100,
					dataIndex: 'clubcitra_member',
					hideable: false,
					text: 'Member Name'
				},
				{
					dataIndex: 'api_aci',
					text: 'ACI',
					xtype: 'booleancolumn',
					width: 50,
					align: 'center',
					falseText: ' ',
					trueText: '&#10003;'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_is_lunas',
					width: 100,
					dataIndex: 'is_lunas',
					hideable: false,
					text: 'Status Lunas'
				},
				{
					xtype: 'datecolumn',
					width: 100,
					dataIndex: 'lunas_date',
					format: 'd-m-Y',
					hideable: false,
					text: 'Tanggal Lunas'
				},
				{
					xtype: 'datecolumn',
					width: 100,
					dataIndex: 'Addon',
					format: 'd-m-Y',
					hideable: false,
					text: 'Tanggal Input'
				},
						//  me.generateActionColumn()
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
			},
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
			items: []
		};
		return ac;
	},
});
