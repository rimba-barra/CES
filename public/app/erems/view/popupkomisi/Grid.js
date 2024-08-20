Ext.define('Erems.view.popupkomisi.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.popupkomisigrid',
	store: 'Popupkomisi',
	bindPrefixName: 'popupkomisi',
	// itemId:'',
	newButtonLabel: 'New',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {},
			selModel: {}, //Ext.create('Ext.selection.CheckboxModel', {}),
			/*defaults    : {
                xtype : 'gridcolumn',
                width : 100,
            },*/
			columns: [
				{
					xtype: 'gridcolumn',
					itemId: 'colms_no',
					dataIndex: 'no',
					width: 40,
					resizable: true,
					text: 'No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_komisi_klaim_id',
					dataIndex: 'komisi_klaim_id',
					hidden: true,
				},
				/*{
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
				},*/
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
					width: 110,
					dataIndex: 'harga_netto_komisi',
					hideable: false,
					text: 'Harga Netto Komisi'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_payment',
					width: 100,
					dataIndex: 'total_payment',
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
					itemId: 'colms_total_komisi_sudah_cair',
					width: 150,
					dataIndex: 'total_komisi_sudah_cair',
					hideable: false,
					text: 'Total Komisi Sudah Cair'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_komisi_belum_cair',
					width: 150,
					dataIndex: 'total_komisi_belum_cair',
					hideable: false,
					text: 'Total Komisi Belum Cair'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_komisi_harus_cair',
					width: 180,
					dataIndex: 'total_komisi_harus_cair',
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
                    xtype: 'gridcolumn',
                    itemId: 'colms_penerima_komisi',
                    width: 150,
                    dataIndex: 'penerima_komisi',
                    hideable: false,
                    text: 'Penerima Komisi',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_nama_karyawan',
                    width: 150,
                    dataIndex: 'nama_karyawan',
                    hideable: false,
                    text: 'Nama Karyawan'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_presentase_komisi',
                    width: 100,
                    dataIndex: 'persentase_komisi',
                    renderer: Ext.util.Format.numberRenderer('0,000.0000'),
                    hideable: false,
                    text: 'Presentase Komisi'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_ppn',
                    width: 100,
                    dataIndex: 'nilai_ppn',
                    hideable: false,
                    text: 'PPN'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_pph_pt',
                    width: 100,
                    dataIndex: 'nilai_pph_pt',
                    hideable: false,
                    text: 'PPH PT'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_pph_perorangan',
                    width: 100,
                    dataIndex: 'nilai_pph_perorangan',
                    hideable: false,
                    text: 'PPH Perorangan'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_komisi_terima',
                    width: 120,
                    dataIndex: 'total_komisi',
                    hideable: false,
                    text: 'Total Komisi Diterima'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_target_collection',
                    width: 100,
                    dataIndex: 'persen_uangmasuk_coll',
                    hideable: false,
                    text: 'Target Collection'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_pencairan',
                    width: 100,
                    dataIndex: 'persen_pencairan_komisi',
                    hideable: false,
                    text: '% Pencairan'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_komisi_sudah_cair',
                    width: 100,
                    dataIndex: 'komisi_sudah_cair',
                    hideable: false,
                    text: 'Komisi Sudah Cair'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_komisi_belum_cair',
                    width: 100,
                    dataIndex: 'komisi_belum_cair',
                    hideable: false,
                    text: 'Komisi Belum Cair'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_komisi_harus_cair',
                    width: 150,
                    dataIndex: 'komisi_harus_cair',
                    hideable: false,
                    text: 'Komisi yang Harus Dicairkan'
                }
//                me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},

	generateDockedItems: function() {
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


