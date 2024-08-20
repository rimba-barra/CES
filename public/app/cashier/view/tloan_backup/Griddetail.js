Ext.define('Cashier.view.tloan.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tloangriddetail',
    store: 'Tloanpayment',
    bindPrefixName: 'Tloan',
    itemId: 'Tloanpayment',
    title: 'lOAN PAYMENT',
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
                    itemId: 'colms_payment_date',
                    width: 120,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'payment_date',
                    hideable: false,
                    text: 'Payment Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_payment_no',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'payment_no',
                    hideable: false,
                    text: 'Payment No.'
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type'
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 250,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
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
                store: 'Tloanpayment'
            }
        ];
        return dockedItems;
    },
});


