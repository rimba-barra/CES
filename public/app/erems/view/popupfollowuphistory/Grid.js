/// Create by Erwin.S 15042021
Ext.define('Erems.view.popupfollowuphistory.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.popupfollowuphistorygrid',
	store: 'Popupfollowuphistory',
	bindPrefixName: '',
	newButtonLabel: 'New',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {},
			selModel: {},
			defaults: {
				xtype: 'gridcolumn',
				width: 100,
			},
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					itemId: 'colms_cluster_code',
					dataIndex: 'cluster_code',
					text: 'Cluster Code',
					width: 80,
				},
				{
					itemId: 'colms_cluster',
					dataIndex: 'cluster',
					text: 'Cluster',
					width: 100,
				},
				{
					itemId: 'colms_unit_number',
					dataIndex: 'unit_number',
					text: 'Unit Number',
					width: 80,
				},
				{
					itemId: 'colms_type_name',
					dataIndex: 'type_name',
					text: 'Type',
					width: 70,
				},
				{
					itemId: 'colms_firstpurchase_date',
					dataIndex: 'firstpurchase_date',
					text: 'First<br>Purchase Date',
					width: 80,
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					itemId: 'colms_purchase_date',
					dataIndex: 'purchase_date',
					text: 'Purchase Date',
					width: 80,
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					itemId: 'colms_purchaseletter_no',
					dataIndex: 'purchaseletter_no',
					text: 'Purchaseletter Number',
					width: 150,
				},
				{
					itemId: 'colms_customer_name',
					dataIndex: 'customer_name',
					text: 'Customer Name'
				},
				{
					itemId: 'colms_pricetype',
					dataIndex: 'pricetype',
					text: 'Price Type',
					width: 70,
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_land_size',
					dataIndex: 'land_size',
					text: 'Luas Tanah',
					width: 70,
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_building_size',
					dataIndex: 'building_size',
					text: 'Luas Bangunan',
					width: 90,
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_netto',
					dataIndex: 'harga_netto',
					text: 'Harga Netto',
					width: 120,
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_total_jual',
					dataIndex: 'harga_total_jual',
					text: 'Harga Total Jual',
					width: 120,
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_payment',
					dataIndex: 'total_payment',
					text: 'Total Payment',
					width: 120,
					align: 'right'
				},
				{
					itemId: 'colms_last_payment_date',
					dataIndex: 'last_payment_date',
					text: 'Last<br>Payment Date',
					width: 80,
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_persen_bayar',
					dataIndex: 'persen_bayar',
					text: 'Persentase<br>Pembayaran (%)',
					align: 'center'
				},
				{
					itemId: 'colms_sp1_date',
					dataIndex: 'sp1_date',
					text: 'SP1 Date',
					width: 80,
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					itemId: 'colms_sp1_no',
					dataIndex: 'sp1_no',
					text: 'SP1 No',
					width: 80,
				},
				{
					xtype: 'actioncolumn',
//					fixed: true,
					//hidden: true,
					itemId: 'actioncolumn_sp1',
					text: 'SP1 Print',
//					resizable: false,
					align: 'center', //'right',
//					hideable: false,
					renderer: function (value, metadata, record) {
						if (record.get('sp1_print') > 0) {
							this.items[1].disabled = false;
						} else {
							this.items[1].disabled = true;
						}
					},
					items: [
						{},
						{
							tooltip: 'SP1 Print',
							itemCls: 'sp1_print',
							hidden: true,
							icon: document.URL + 'app/main/images/icons/printer.png',
							handler: function (view, rowIndex, colIndex, item, e, record, row) {
								this.fireEvent('printsp', arguments);
//								console.log(arguments);
							},

						},
						{}
					]
				},
				{
					itemId: 'colms_sp2_date',
					dataIndex: 'sp2_date',
					text: 'SP2 Date',
					width: 80,
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					itemId: 'colms_sp2_no',
					dataIndex: 'sp2_no',
					text: 'SP2 No',
					width: 80,
				},
				{
					xtype: 'actioncolumn',
//					fixed: true,
					//hidden: true,
					itemId: 'actioncolumn_sp2',
					text: 'SP2 Print',
//					resizable: false,
					align: 'center', //'right',
//					hideable: false,
					renderer: function (value, metadata, record) {
						if (record.get('sp2_print') > 0) {
							this.items[1].disabled = false;
						} else {
							this.items[1].disabled = true;
						}
					},
					items: [
						{},
						{
							tooltip: 'SP2 Print',
							itemCls: 'sp2_print',
							icon: document.URL + 'app/main/images/icons/printer.png',
							handler: function (view, rowIndex, colIndex, item, e, record, row) {
								this.fireEvent('printsp', arguments);
//								console.log(arguments);
							}
						},
						{}
					]
				},
				{
					itemId: 'colms_sp3_date',
					dataIndex: 'sp3_date',
					text: 'SP3 Date',
					width: 80,
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					itemId: 'colms_sp3_no',
					dataIndex: 'sp3_no',
					text: 'SP3 No',
					width: 80,
				},
				{
					xtype: 'actioncolumn',
//					fixed: true,
					//hidden: true,
					itemId: 'actioncolumn_sp3',
					text: 'SP3 Print',
//					resizable: false,
					align: 'center', //'right',
//					hideable: false,
					renderer: function (value, metadata, record) {
						if (record.get('sp3_print') > 0) {
							this.items[1].disabled = false;
						} else {
							this.items[1].disabled = true;
						}
					},
					items: [
						{},
						{
							tooltip: 'SP3 Print',
							itemCls: 'sp3_print',
							icon: document.URL + 'app/main/images/icons/printer.png',
							handler: function (view, rowIndex, colIndex, item, e, record, row) {
								this.fireEvent('printsp', arguments);
//								console.log(arguments);
							}
						},
						{}
					]
				},
				{
					itemId: 'colms_sp4_date',
					dataIndex: 'sp4_date',
					text: 'SP4 Date',
					width: 80,
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					itemId: 'colms_sp4_no',
					dataIndex: 'sp4_no',
					text: 'SP4 No',
					width: 80,
				},
				{
					xtype: 'actioncolumn',
//					fixed: true,
					//hidden: true,
					itemId: 'actioncolumn_sp4',
					text: 'SP4 Print',
//					resizable: false,
					align: 'center', //'right',
//					hideable: false,
					renderer: function (value, metadata, record) {
						if (record.get('sp4_print') > 0) {
							this.items[1].disabled = false;
						} else {
							this.items[1].disabled = true;
						}
					},
					items: [
						{},
						{
							tooltip: 'SP4 Print',
							itemCls: 'sp4_print',
							icon: document.URL + 'app/main/images/icons/printer.png',
							handler: function (view, rowIndex, colIndex, item, e, record, row) {
								this.fireEvent('printsp', arguments);
//								console.log(arguments);
							}
						},
						{}
					]
				},
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
						itemId: 'btnExport',
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
