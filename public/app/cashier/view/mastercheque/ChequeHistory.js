
Ext.define('Cashier.view.mastercheque.ChequeHistory', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.chequehistorygrid',
    storeConfig: {
        id: 'ChequeHistoryGridStore',
        idProperty: 'chequehistory_id',
        extraParams: {
            mode_read: 'chequehistory',
            cheque_id: 0
        },
    },
     autoScroll: true,
    height: 150,
    bindPrefixName: 'Mastercheque',
    itemId: 'detailcheque',
    title: 'History Cheque',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
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
                    xtype: 'datecolumn',
                    width: 150,
                    dataIndex: 'date',
                    hideable: false,
                    text: 'Tanggal',
                    flex: 1,
                    format: 'd/m/Y',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status', 
                    flex: 1

                },
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    viewConfig: {forceFit: true},
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
           
         
        ];
        return dockedItems;
    },
});


