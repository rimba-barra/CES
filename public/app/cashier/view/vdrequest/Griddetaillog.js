Ext.define('Cashier.view.vdrequest.Griddetaillog', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdrequestgriddetaillog',
    store: 'VDRequestdetaillog',
    bindPrefixName: 'VDRequest',
    itemId: 'VDRequestdetaillog',
    title: 'TEST ',
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