Ext.define('Cashier.view.mastercheque.DetailChequeGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.detailchequegrid',
    bindPrefixName: 'Mastercheque',
    storeConfig: {
        id: 'DetailChequeGridStore',
        idProperty: 'kasbank_id',
        extraParams: {
            mode_read: 'detailcheque',
            cheque_id: 0,
        },
    },
    // itemId:'',
    height: 200, autoScroll: true,
    // newButtonLabel: 'New Detail Cheque ',
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
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'kasbank_voucherID',
                    hideable: false,
                    text: 'ID Voucher',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'kasbank_customer_name',
                    hideable: false,
                    text: 'From / To',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'cheque_amount',
                    hideable: false,
                    emptyText: 0,
                    text: 'Amount',
                    align: 'right',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'kasbank_description',
                    hideable: false,
                    text: 'Description',
                    flex: 2,
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


