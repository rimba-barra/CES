Ext.define('Erems.view.klaimkomisinew.GridDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.klaimkomisinewgriddetail',
    store: 'Klaimkomisinewdetail',
    //bindPrefixName: 'Bankkprakad',
    //newButtonLabel: 'Add New Confirmation',
    height: 200,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_berkas_id',
                    dataIndex: 'berkas_surat_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_berkas_id',
                    dataIndex: 'berkas_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    dataIndex: 'berkas_code',
                    hidden: true,
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
                    width: 100,
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
                    width: 100,
                    dataIndex: 'komisi_harus_cair',
                    hideable: false,
                    text: 'Komisi yang Harus Dicairkan'
                },

                //		me.generateActionColumn()
            ],
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
                        action: 'cetak_kwitansi',
                        itemId: 'btnCetak',
                        margin: '0 5 0 0',
                        //iconCls: 'icon-setting',
                        text: 'Cetak Kwitansi',
                        disabled: true,
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
    }


});