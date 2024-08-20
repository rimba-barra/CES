Ext.define('Erems.view.popuplunasumbelumakad.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popuplunasumbelumakadgrid',
    store          : 'Popuplunasumbelumakad',
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
                    itemId    : 'colms_cluster_code',
                    dataIndex : 'cluster',
                    text      : 'Cluster Code',
                    width     : 100,
                },
                {
                    itemId    : 'colms_unit_number',
                    dataIndex : 'unit_number',
                    text      : 'Unit Number',
                    width     : 80,
                },
                {
                    itemId    : 'colms_type_name',
                    dataIndex : 'type_name',
                    text      : 'Type Name',
                    width     : 100,
                },
                {
                    itemId    : 'colms_firstpurchase_date',
                    dataIndex : 'firstpurchase_date',
                    text      : 'First<br>Purchase Date',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
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
                    itemId    : 'colms_purchaseletter_no',
                    dataIndex : 'purchaseletter_no',
                    text      : 'Purchaseletter Number',
                    width     : 150,
                },
                {
                    itemId    : 'colms_customer_name',
                    dataIndex : 'customer_name',
                    text      : 'Customer Name',
                    width     : 100,
                },
                {
                    itemId    : 'colms_pricetype',
                    dataIndex : 'pricetype',
                    text      : 'Price Type',
                    width     : 70,
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
                    itemId    : 'colms_total_um',
                    dataIndex : 'total_um',
                    text      : 'Total UM',
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
                    itemId    : 'colms_billingrules',
                    dataIndex : 'billingrules',
                    text      : 'Billing Rules',
                    width     : 100,
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
