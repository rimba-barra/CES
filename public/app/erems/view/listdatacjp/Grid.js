Ext.define('Erems.view.listdatacjp.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listdatacjpgrid',
    store: 'Listdatacjp',
    bindPrefixName: 'Listdatacjp',
    itemId: 'Listdatacjp',
    title: 'List Data Upload Ciputra Life',
    uniquename: '_listdatacjpgrid',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
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
                    itemId: 'colms_status_aplikasi',
                    width: 100,
                    dataIndex: 'status_aplikasi',
                    hideable: false,
                    text: 'Status Aplikasi'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_nama_nasabah',
                    width: 180,
                    dataIndex: 'nama_nasabah',
                    hideable: false,
                    text: 'Nama Nasabah'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_spt_no',
                    width: 160,
                    dataIndex: 'spt_no',
                    hideable: false,
                    text: 'Nomor SPT'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 90,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 120,
                    dataIndex: 'pricetype',
                    hideable: false,
                    text: 'Status Pembayaran'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sertifikat_polis_no',
                    width: 120,
                    dataIndex: 'sertifikat_polis_no',
                    hideable: false,
                    text: 'Nomor Polis'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_code',
                    width: 90,
                    dataIndex: 'customer_code',
                    hideable: false,
                    text: 'Kode Customer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 180,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Nama Customer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jenis_kelamin',
                    width: 100,
                    dataIndex: 'jenis_kelamin',
                    hideable: false,
                    text: 'Jenis Kelamin'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_lahir',
                    width: 100,
                    dataIndex: 'tanggal_lahir',
                    hideable: false,
                    text: 'Tanggal Lahir',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_identitas_documenttype',
                    width: 100,
                    dataIndex: 'identitas_documenttype',
                    hideable: false,
                    text: 'Dokument Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Nomor Unit'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_name',
                    width: 100,
                    dataIndex: 'cluster_name',
                    hideable: false,
                    text: 'Kawasan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_nama_sales',
                    width: 180,
                    dataIndex: 'nama_sales',
                    hideable: false,
                    text: 'Nama Sales'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_masa_pertanggungan_bulan',
                    width: 160,
                    dataIndex: 'masa_pertanggungan_bulan',
                    hideable: false,
                    text: 'Masa Pertanggungan bulan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_masa_pertanggungan_tahun',
                    width: 160,
                    dataIndex: 'masa_pertanggungan_tahun',
                    hideable: false,
                    text: 'Masa Pertanggungan Tahun'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_mulai_pertanggungan',
                    width: 180,
                    dataIndex: 'tanggal_mulai_pertanggungan',
                    hideable: false,
                    text: 'Tanggal Mulai Pertanggungan',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_akhir_pertanggungan',
                    width: 180,
                    dataIndex: 'tanggal_akhir_pertanggungan',
                    hideable: false,
                    text: 'Tanggal Akhir Pertanggungan',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_uang_pertanggungan',
                    width: 140,
                    dataIndex: 'uang_pertanggungan',
                    hideable: false,
                    text: 'Uang Pertanggungan',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_premi_standard',
                    width: 140,
                    dataIndex: 'premi_standard',
                    hideable: false,
                    text: 'Premi Standard',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_premi_extra',
                    width: 140,
                    dataIndex: 'premi_extra',
                    hideable: false,
                    text: 'Premi Extra',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_premi_total',
                    width: 140,
                    dataIndex: 'premi_total',
                    hideable: false,
                    text: 'Premi Total',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
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
                        action: 'export',
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
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
    },
});




