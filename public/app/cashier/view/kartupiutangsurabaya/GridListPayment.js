 Ext.define('Cashier.view.kartupiutangsurabaya.GridListPayment', {
    extend:'Cashier.library.template.view.GridDS2',
    alias: 'widget.kartupiutangsurabayalistpaymentgrid',
    // store:'Kartupiutangsurabaya',
    storeConfig:{
        id:'KartuPiutangPaymentListGridStore',
        idProperty:'payment_id',
        extraParams:{
            mode_read:'paymentlist'
        }
    },
    bindPrefixName: 'Kartupiutangsurabaya',
    newButtonLabel: 'New Expense_no',
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: {},
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'payment_no',
                    text: 'Payment No'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'payment_date',
                    text: 'Payment Date'
                },
                {
                    dataIndex: 'paymentmethod_paymentmethod',
                    text: 'Payment Method'
                },
                {
                    dataIndex: 'block_block',
                    text: 'Clearing Date'
                },
                {
                    dataIndex: 'note',
                    text: 'Description'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'total_payment',
                    text: 'Amount'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            itemId: 'actioncolumn',
            width: 25,
            resizable: false,
         
            hideable: false,
            items: [
                {
                    iconCls: ' ux-actioncolumn icon-search act-show',
                   text:'View Images',
                    action: 'show',
                    altText: 'Show Detail',
                    tooltip: 'Show Detail'
                }
            ]
        };
        return ac;
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-form',
                        bindAction: me.bindPrefixName + 'View',
                        text: 'View'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
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
