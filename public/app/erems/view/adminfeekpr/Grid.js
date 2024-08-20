/// Create by Erwin.S 15042021
Ext.define('Erems.view.adminfeekpr.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.adminfeekprgrid',
    store          : 'Adminfeekpr',
    bindPrefixName : '',
    newButtonLabel : 'New',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : {},
            defaults    : {
                xtype : 'gridcolumn',
                width : 100,
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    itemId    : 'colms_cluster',
                    dataIndex : 'cluster',
                    text      : 'Cluster',
                    width     : 120,
                },
                {
                    itemId    : 'colms_unit_number',
                    dataIndex : 'unit_number',
                    text      : 'Unit',
                    width     : 80,
                },
                {
                    itemId    : 'colms_purchase_date',
                    dataIndex : 'purchase_date',
                    text      : 'Purchase Date',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    itemId    : 'colms_customer_name',
                    dataIndex : 'customer_name',
                    text      : 'Customer Name'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_netto',
                    dataIndex : 'harga_netto',
                    text      : 'Harga Netto',
                    width     : 120,
                    align     : 'right'
                },
                {
                    itemId    : 'colms_pricetype',
                    dataIndex : 'pricetype',
                    text      : 'Cara Bayar',
                    width     : 80,
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_persen_bayar',
                    dataIndex : 'persen_bayar',
                    text      : 'Persentase Bayar',
                    width     : 150,
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_plafon_kpr',
                    dataIndex : 'plafon_kpr',
                    text      : 'Plafon KPR',
                    width     : 70,
                },
                {
                    itemId    : 'colms_bank_name',
                    dataIndex : 'bank_name',
                    text      : 'Nama Bank',
                    width     : 70,
                },
                {
                    itemId    : 'colms_tgl_akad',
                    dataIndex : 'tgl_akad',
                    text      : 'Tgl. Akad',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_nilai_fee',
                    dataIndex : 'nilai_fee',
                    text      : 'Nilai Fee',
                    width     : 70,
                    align     : 'right'
                },
                  {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_dpp',
                    dataIndex : 'dpp',
                    text      : 'DPP',
                    width     : 70,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_ppn_fee_kpr',
                    dataIndex : 'ppn_fee_kpr',
                    text      : 'PPN',
                    width     : 90,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_pph',
                    dataIndex : 'pph',
                    text      : 'PPh',
                    width     : 90,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_biaya_admin',
                    dataIndex : 'biaya_admin',
                    text      : 'Biaya Admin',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_nilai_transfer',
                    dataIndex : 'nilai_transfer',
                    text      : 'Nilai Transfer',
                    width     : 120,
                    align     : 'right'
                },
                {
                    itemId    : 'colms_tanggal_cair_fee_kpr',
                    dataIndex : 'tanggal_cair_fee_kpr',
                    text      : 'Tgl. Cair Fee KPR',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    itemId    : 'colms_notes_fee_kpr',
                    dataIndex : 'notes_fee_kpr',
                    text      : 'Notes Fee KPR',
                    width     : 120,
                },
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
