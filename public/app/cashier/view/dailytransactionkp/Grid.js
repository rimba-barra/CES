Ext.define('Cashier.view.dailytransactionkp.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.dailytransactionkpgrid',
    store: 'Dailytransactionkp',
    bindPrefixName: 'Dailytransactionkp',
    itemId: 'Dailytransactionkp',
    height: 600,
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },           
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 35
                },
                {
                    itemId: 'colms_kasbank_id',
                    dataIndex: 'kasbank_id',
                    hidden: true
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'colms_submit_date',
                    width: 100,
                    dataIndex: 'submit_date',
                    hideable: false,
                    text: 'Submit Date',
                    align: 'center',
                    format: 'd-m-Y'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_id',
                    width: 160,
                    dataIndex: 'voucher_id',
                    hideable: false,
                    text: 'Voucher ID',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 300,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description',
                    align: 'left'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer',
                    width: 200,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Supplier / Customer',
                    align: 'left'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    width: 100,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    align: 'right',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(record.get('amount'), '0,000.00')
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 100,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status',
                    align: 'center'
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
                        action: 'print',
                        hidden: false,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Generate Report'
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'tmp_selected_kasbank_id',
                        id: 'tmp_selected_kasbank_id'
                    }
                ]
            }
        ];
        return dockedItems;
    },
});


