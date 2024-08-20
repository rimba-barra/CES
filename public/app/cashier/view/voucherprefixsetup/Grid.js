Ext.define('Cashier.view.voucherprefixsetup.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.voucherprefixsetupgrid',
    store: 'Voucherprefixsetup',
    bindPrefixName: 'Voucherprefixsetup',
    itemId: 'Voucherprefixsetup',
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
                    xtype: 'rownumberer',
                    text: 'No.',
                    width: 40,
                    titleAlign: 'center',
                    align: 'center',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptcode',
                    dataIndex: 'projectname',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Company Desc'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    dataIndex: 'prefix',
                    width: 90,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Prefix Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefixdesc',
                    dataIndex: 'prefixdesc',
                    width: 140,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Prefix Code Desc'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_temp_prefix',
                    dataIndex: 'temp_prefix',
                    width: 110,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Prefix Code Temp'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    width: 120,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Acc. Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    dataIndex: 'coaname',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Acc. Code Desc'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_in_out',
                    dataIndex: 'in_out',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_liquid',
                    dataIndex: 'is_liquid',
                    width: 70,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Liquid',
                    renderer: function(value) {
                        if (value == 0) {
                            return 'No';
                        } else {
                            return 'Yes';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cash_bank',
                    dataIndex: 'cash_bank',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Payment Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_no_acc',
                    dataIndex: 'no_acc',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Acc. Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_account_type',
                    dataIndex: 'account_type',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Account Type'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_fixed',
                    dataIndex: 'is_fixed',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 120,
                    hideable: false,
                    text: 'Detail Acc. Fixed'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fixed_coa',
                    dataIndex: 'fixed_coa',
                    width: 150,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Acc Code Fixed'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fixed_account_desc',
                    dataIndex: 'fixed_account_desc',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description Fixed'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fixed_reference_id',
                    dataIndex: 'reference_id',
                    width: 80,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Ref. Prefix'
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
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_posting',
                    dataIndex: 'is_posting',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Flag Posting'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_active',
                    dataIndex: 'active',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Active'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    dataIndex: 'addon',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Add On'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    dataIndex: 'addby',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Add By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    dataIndex: 'modion',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Modi On'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    dataIndex: 'modiby',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Modi By'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_paymentviaid',
                    dataIndex: 'payment_via_name',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Payment Via'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bankid',
                    dataIndex: 'bank_name',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Bank'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_banktype',
                    dataIndex: 'banktype',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Bank Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    dataIndex: 'subgl_code',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Sub Code'
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
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New Prefix',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                    {
                        xtype: 'button',
                        action: 'export',
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-excel',
                        text: 'Export Data',
                        bindAction: me.bindPrefixName + 'Export'
                    },
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
    },
});


