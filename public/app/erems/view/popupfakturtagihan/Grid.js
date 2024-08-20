/// Create by Erwin.S 15042021
Ext.define('Erems.view.popupfakturtagihan.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popupfakturtagihangrid',
    store          : 'Popupfakturtagihan',
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
                    itemId    : 'colms_firstpurchase_date',
                    dataIndex : 'firstpurchase_date',
                    text      : 'FIrstpurchase Date',
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
                    itemId    : 'colms_no_invoice',
                    dataIndex : 'no_invoice',
                    text      : 'No. Invoice',
                    width     : 120,
                },
                {
                    itemId    : 'colms_tanggal_tagihan',
                    dataIndex : 'tanggal_tagihan',
                    text      : 'Tgl. Tagihan',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    itemId    : 'colms_jatuhtempo_date',
                    dataIndex : 'jatuhtempo_date',
                    text      : 'Tgl. Jatuh Tempo',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_tagihan_bulan_berjalan',
                    dataIndex : 'tagihan_bulan_berjalan',
                    text      : 'Tagihan Bulan Berjalan',
                    width     : 150,
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_ppn_tagihan',
                    dataIndex : 'ppn_tagihan',
                    text      : 'PPN Tagihan',
                    width     : 70,
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_tunggakan',
                    dataIndex : 'tunggakan',
                    text      : 'Tunggakan',
                    width     : 70,
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_denda',
                    dataIndex : 'denda',
                    text      : 'Denda',
                    width     : 70,
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_total_tagihan',
                    dataIndex : 'total_tagihan',
                    text      : 'Total Tagihan',
                    width     : 70,
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
