Ext.define('Cashier.view.payment.Gridcoadetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.paymentcoadetailgrid',
    store: 'TPaymentcoadetail',
    bindPrefixName: 'Payment',
    itemId: 'TPaymentcoadetail',
    title: 'Coa Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
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
                    itemId: 'colms_coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    dataIndex: 'coaname',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    dataIndex: 'dataflow',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Data flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingcoadetail',
                width: 360,
                displayInfo: true,
                store: 'TPaymentcoadetail'
            }
        ];
        return dockedItems;
    },
});


