Ext.define('Erems.view.klaimkomisinew.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.klaimkomisinewgrid',
	store: 'Klaimkomisinew',
	bindPrefixName: 'Klaimkomisinew',
	// itemId:'',
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
					xtype: 'rownumberer',
					width: 40,
					resizable: true
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_komisi_permintaan_id',
					dataIndex: 'komisi_permintaan_id',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchaseletter_id',
					dataIndex: 'purchaseletter_id',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_pricetype_id',
					dataIndex: 'pricetype_id',
					hidden: true,
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
					width: 100,
					dataIndex: 'block',
					hideable: false,
					text: 'Block'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					width: 80,
					dataIndex: 'unit_number',
					hideable: false,
					text: 'Unit No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchaseletter_no',
					width: 120,
					dataIndex: 'purchaseletter_no',
					hideable: false,
					text: 'Purchaseletter No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_nama_customer',
					width: 150,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_pricetype',
					width: 80,
					dataIndex: 'pricetype',
					hideable: false,
					text: 'Pricetype'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_netto',
					width: 100,
					dataIndex: 'harga_netto',
					hideable: false,
					text: 'Harga Netto'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_netto_komisi',
					width: 100,
					dataIndex: 'harga_netto_komisi',
					hideable: false,
					text: 'Harga Netto Komisi'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_payment',
					width: 100,
					dataIndex: 'payment',
					hideable: false,
					text: 'Total Payment'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_persen_bayar',
					width: 150,
					dataIndex: 'persen_bayar',
					hideable: false,
					text: 'Presentase Pembayaran (%)'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_komisi_sudah_cair',
					width: 150,
					dataIndex: 'komisi_sudah_cair',
					hideable: false,
					text: 'Total Komisi Sudah Cair'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_komisi_belum_cair',
					width: 150,
					dataIndex: 'komisi_belum_cair',
					hideable: false,
					text: 'Total Komisi Belum Cair'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_komisi_harus_cair',
					width: 180,
					dataIndex: 'komisi_harus_cair',
					hideable: false,
					text: 'Total Komisi yang Harus Dicairkan'
				},
				{
					xtype: 'datecolumn',
					itemId: 'colms_sppjb_date',
					width: 100,
					dataIndex: 'sppjb_date',
					hideable: false,
					text: 'SPPJB Date'
				},
				{
					xtype: 'datecolumn',
					itemId: 'colms_sppjb_sign_date',
					width: 100,
					dataIndex: 'tandatangan_date',
					hideable: false,
					text: 'SPPJB Sign Date'
				},
				{
					xtype: 'datecolumn',
					itemId: 'colms_added_date',
					width: 100,
					dataIndex: 'addon',
					hideable: false,
					text: 'Created On'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_added_by',
					width: 100,
					dataIndex: 'adduser',
					hideable: false,
					text: 'Created By'
				},
//                me.generateActionColumn()
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
						action: 'proses_klaim',
						itemId: 'btnProses',
						margin: '0 5 0 0',
						text: 'Proses Klaim Komisi',
						disabled: true,
					},
					{
						xtype: 'button',
						action: 'destroy',
						disabled: true,
						margin: '0 5 0 0',
						itemId: 'btnDelete',
						bindAction: me.bindPrefixName + 'Delete',
						iconCls: 'icon-delete',
						text: 'Delete Selected'
					},
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

});


