Ext.define('Cashier.view.mastercheque.ChequeHistory', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.chequehistorygrid',
    bindPrefixName: 'Mastercheque',
    storeConfig: {
        id: 'ChequeHistoryGridStore',
        idProperty: 'chequehistory_id',
        extraParams: {
            mode_read: 'chequehistory',
            cheque_id: 0
        },
    },
    // itemId:'',
    height: 150,
    //newButtonLabel: 'New Detail Cheque ',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
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
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
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
            hidden: true,
            itemId: 'actioncolumn',
            width: 100,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
            ]
        };
        return ac;
    },
});


