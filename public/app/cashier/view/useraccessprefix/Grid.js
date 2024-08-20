Ext.define('Cashier.view.useraccessprefix.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.useraccessprefixgrid',
    store: 'Useraccessprefix',
    bindPrefixName: 'Useraccessprefix',
    itemId: 'Useraccessprefix',
    newButtonLabel: 'Add New',
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
                    itemId: 'colms_projectname',
                    width: 200,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 200,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_user_name',
                    width: 150,
                    dataIndex: 'user_name',
                    hideable: false,
                    text: 'Username'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_user_fullname',
                    width: 200,
                    dataIndex: 'user_fullname',
                    hideable: false,
                    text: 'User Fullname'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_prefix_id',
                    width: 100,
                    dataIndex: 'voucher_prefix_id',
                    hideable: false,
                    text: 'Voucher prefix id'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    width: 100,
                    dataIndex: 'prefix',
                    hideable: false,
                    text: 'Prefix'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 100,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_in_out',
                    width: 100,
                    dataIndex: 'in_out',
                    hideable: false,
                    text: 'Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cash_bank',
                    width: 100,
                    dataIndex: 'cash_bank',
                    hideable: false,
                    text: 'Cash /Bank'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_no_acc',
                    width: 100,
                    dataIndex: 'no_acc',
                    hideable: false,
                    text: 'No Acc.'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_limitdate',
                    dataIndex: 'is_limitdate',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Flag limit date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fixed_limitdate',
                    dataIndex: 'limitdate',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'limit date transaction'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_limitamount',
                    dataIndex: 'is_limitamount',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Flag limit amount'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_limit_min',
                    dataIndex: 'limit_min',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'limit min amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_limit_max',
                    dataIndex: 'limit_max',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'limit max amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


