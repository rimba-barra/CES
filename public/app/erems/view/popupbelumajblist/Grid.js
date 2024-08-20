Ext.define('Erems.view.popupbelumajblist.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.popupbelumajblistgrid',
	store: 'Popupbelumajblist',
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
					text: 'Purchase Letter No.'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchase_date',
					width: 150,
					dataIndex: 'purchase_date',
					hideable: false,
					text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_kode_kawasan',
					width: 100,
//                    align: 'right',
					dataIndex: 'kode_kawasan',
					text: 'Kode Kawasan'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster',
					width: 100,
//                    align: 'right',
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
					itemId: 'colms_type_name',
					width: 150,
					dataIndex: 'type_name',
					hideable: false,
					text: 'Type'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: 150,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_land_size',
					width: 50,
					dataIndex: 'land_size',
					hideable: false,
					text: 'LT'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_building_size',
					width: 50,
					dataIndex: 'building_size',
					hideable: false,
					text: 'LB'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_rencana_serahterima_date',
					width: 150,
					dataIndex: 'rencana_serahterima_date',
					hideable: false,
					text: 'Rencana Serah Terima',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cara_bayar',
					width: 100,
					dataIndex: 'cara_bayar',
					hideable: false,
					text: 'Cara Bayar',
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_no_sppjb',
					width: 100,
					dataIndex: 'no_sppjb',
					hideable: false,
					text: 'No SPPJB',
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_tgl_sppjb',
					width: 150,
					dataIndex: 'tanggal_sppjb',
					hideable: false,
					text: 'Tanggal SPPJB',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_no_hgb',
					width: 100,
					dataIndex: 'no_hgb',
					hideable: false,
					text: 'No HGB',
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_tgl_hgb',
					width: 150,
					dataIndex: 'tanggal_hgb',
					hideable: false,
					text: 'Tanggal HGB',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_no_imb',
					width: 100,
					dataIndex: 'no_imb',
					hideable: false,
					text: 'No IMB',
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_tgl_imb',
					width: 150,
					dataIndex: 'tanggal_imb',
					hideable: false,
					text: 'Tanggal IMB',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_persen_bayar',
					width: 100,
					align: 'right',
					dataIndex: 'persen_bayar',
					text: '% Bayar'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_notes',
					width: 200,
					dataIndex: 'notes',
					text: 'Keterangan'
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
