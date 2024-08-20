Ext.define('Cashier.view.payment.Gridview', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.paymentgridview',
    store: 'TPaymentvendor',
    bindPrefixName: 'Payment',
    itemId: 'Payment',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
              dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
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
                    itemId: 'colms_vendorname',
                    dataIndex: 'vendorname',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vendor Name'
                },               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_invoice',
                    dataIndex: 'invoice',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Invoice'
                },               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_po',
                    dataIndex: 'po',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'PO'
                },               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_do',
                    dataIndex: 'do',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'DO'
                },               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colmsa_amount',
                    dataIndex: 'amount',
                    width: 100,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Principal(%)',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ppn',
                    dataIndex: 'ppn',
                    width: 100,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'PPn(%)',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pph',
                    dataIndex: 'pph',
                    width: 100,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'PPh23(%)',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },               
                
               
            ],
            
        });

        me.callParent(arguments);
    },
     generateDockedItemscustome: function () {
        var dockedItems = [            
              {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});


