Ext.define('Cashier.view.voucher.Griddetaillog', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.vouchergriddetaillog',
    bindPrefixName: 'Voucher',
    itemId: 'Voucherdetaillog',
    storeConfig: {
        id: 'DetailVoucherLogGridStore',
        idProperty: 'action_id',
        extraParams: {
            mode_read: 'kasbanklog',
            kasbank_id: 0
        }
    },
    height: 180,
    title: 'Log Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
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
                itemId: 'colms_transaction_no',
                width: 120,
                titleAlign: 'center',
                align: 'left',
                dataIndex: 'transaction_no',
                hideable: false,
                text: 'Voucher No'
            },
            {
                xtype: 'gridcolumn',
                itemId: 'colms_action',
                width: 150,
                titleAlign: 'left',
                align: 'left',
                dataIndex: 'action',
                hideable: false,
                text: 'Action',

            },
            {
                xtype: 'gridcolumn',
                itemId: 'colms_user_fullname',
                width: 150,
                titleAlign: 'center',
                align: 'left',
                dataIndex: 'user_fullname',
                hideable: false,
                text: 'User'
            },
            {
                xtype: 'gridcolumn',
                itemId: 'colms_addon',
                width: 130,
                titleAlign: 'center',
                align: 'left',
                dataIndex: 'addon',
                hideable: false,
                text: 'Transaction Date'
            },
            {
                xtype: 'gridcolumn',
                itemId: 'colms_module',
                width: 150,
                titleAlign: 'left',
                align: 'left',
                dataIndex: 'module',
                hideable: false,
                text: 'Type',

            },              
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
        {

        },
        {

        }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {

        }

        return ac;

    },
});