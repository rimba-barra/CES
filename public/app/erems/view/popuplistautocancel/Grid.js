/// Create by Erwin.S 15042021
Ext.define('Erems.view.popuplistautocancel.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popuplistautocancelgrid',
    store          : 'Popuplistautocancel',
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
                    itemId    : 'colms_firstpurchase_date',
                    dataIndex : 'firstpurchase_date',
                    text      : 'First Purchase Date',
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
                    itemId    : 'colms_pricetype',
                    dataIndex : 'pricetype',
                    text      : 'Price Type'
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
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_amount_tanda_jadi',
                    dataIndex : 'amount_tanda_jadi',
                    text      : 'Amount Tanda Jadi',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_tanda_jadi',
                    dataIndex : 'remaining_tanda_jadi',
                    text      : 'Remaining Tanda Jadi',
                    width     : 120,
                    align     : 'right'
                },
                {
                    itemId    : 'colms_duedate_tanda_jadi',
                    dataIndex : 'duedate_tanda_jadi',
                    text      : 'Due Date Tanda Jadi',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_amount_uang_muka',
                    dataIndex : 'amount_uang_muka',
                    text      : 'Amount Uang Muka',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_uang_muka',
                    dataIndex : 'remaining_uang_muka',
                    text      : 'Remaining Uang Muka',
                    width     : 120,
                    align     : 'right'
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
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_total_jual',
                    dataIndex : 'harga_total_jual',
                    text      : 'Harga Total Jual',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_total_payment',
                    dataIndex : 'total_payment',
                    text      : 'Total Payment',
                    width     : 120,
                    align     : 'right'
                },
                {
                    itemId    : 'colms_duedate_batal',
                    dataIndex : 'duedate_batal',
                    text      : 'Due Date Batal',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
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
