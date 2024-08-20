Ext.define('Cashier.view.voucher.Gridcashbonpayment', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.vouchercashbonpaymentgrid',
    storeConfig: {
        id: 'CashbonPaymentGridStore',
        idProperty: 'kasbon_payment_id',
        extraParams: {
            mode_read: 'cashbonpayment',
            kasbank_id: 0
        },
    },
    height: 200,
    bindPrefixName: 'Voucher',
    itemId: 'Vouchercashbonpayment',
    title: 'Cashbon Payment',
    newButtonLabel: 'Add New',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            plugins: [rowEditing],
            viewConfig: {
                stripeRows: true
            },
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'kasbondept_no',
                    hideable: false,
                    text: 'Cashbon No',
                    flex: 4,
                    sortable: false,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 200,
                    hideable: false,
                    header: 'Amount',
                    sortable: false,
                    summaryType: 'sum',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    flex: 4,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining_amount',
                    dataIndex: 'remaining_amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 200,
                    hideable: false,
                    header: 'Remaining Amount',
                    sortable: false,
                    summaryType: 'sum',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    flex: 4,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pay_amount',
                    dataIndex: 'pay_amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 200,
                    hideable: false,
                    header: 'Pay',
                    sortable: false,
                    summaryType: 'sum',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    flex: 4,
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
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 100,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
            ]
        }

        return ac;

    },
});


