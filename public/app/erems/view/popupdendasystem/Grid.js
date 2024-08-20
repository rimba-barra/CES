/// Create by Erwin.S 15042021
Ext.define('Erems.view.popupdendasystem.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popupdendasystemgrid',
    store          : 'Popupdendasystem',
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
                    text      : 'Customer Name'
                },
                {
                    itemId    : 'colms_cluster_code',
                    dataIndex : 'cluster_code',
                    text      : 'Cluster Code',
                    width     : 80,
                },
                {
                    itemId    : 'colms_cluster',
                    dataIndex : 'cluster',
                    text      : 'Cluster'
                },
                {
                    itemId    : 'colms_block',
                    dataIndex : 'block',
                    text      : 'Block',
                    width     : 80,
                },
                {
                    itemId    : 'colms_unit_number',
                    dataIndex : 'unit_number',
                    text      : 'Unit Number',
                    width     : 80,
                },
                {
                    itemId    : 'colms_scheduletype',
                    dataIndex : 'scheduletype',
                    text      : 'Schedule Type',
                },
                {
                    itemId    : 'colms_termin',
                    dataIndex : 'termin',
                    text      : 'Termin'
                },
                {
                    itemId    : 'colms_duedate',
                    dataIndex : 'duedate',
                    text      : 'Due Date',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_amount',
                    dataIndex : 'amount',
                    text      : 'Amount',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_balance',
                    dataIndex : 'remaining_balance',
                    text      : 'Remaining Balance',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_total_payment_denda',
                    dataIndex : 'total_payment_denda',
                    text      : 'Total Payment Denda',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_denda_erems',
                    dataIndex : 'denda_erems',
                    text      : 'Denda EREMS',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_denda_erems',
                    dataIndex : 'remaining_denda_erems',
                    text      : 'Remaining Denda<br/>EREMS',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_denda_generate',
                    dataIndex : 'denda_generate',
                    text      : 'Denda Generate',
                    width     : 120,
                    align     : 'right'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_denda_generate',
                    dataIndex : 'remaining_denda_generate',
                    text      : 'Remaining Denda<br>Generate',
                    width     : 120,
                    align     : 'right'
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
