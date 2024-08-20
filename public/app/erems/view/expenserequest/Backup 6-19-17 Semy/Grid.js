Ext.define('Erems.view.expenserequest.Grid', {
    alias: 'widget.expenserequestgrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ExpenseRequestGridStore',
        idProperty: 'expense_id',
        extraParams: {}
    },
    bindPrefixName: 'Expenserequest',
    newButtonLabel: 'New Expense Request',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'expense_no',
                    text: 'Expense No',
                    width:150
                },
                {
                    dataIndex: 'department_department',
                    text: 'Department',
                    width:70
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'expense_date',
                    text: 'Request Date'
                },
                {
                    dataIndex: 'user_user_fullname',
                    text: 'Request By'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'total_amount',
                    text: 'Amount'
                },
                {
                    dataIndex: 'approved',
                    text: 'Approved',
                    xtype: 'booleancolumn',
                    width:50,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'approve_date',
                    text: 'Approve Date'
                },
                {
                    dataIndex: 'voucher_no',
                    text: 'Voucher Code'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'voucher_date',
                    text: 'Voucher Date'
                },
                {
                    dataIndex: 'paymentmethod_paymentmethod',
                    text: 'Payment Method'
                },
                {
                    dataIndex: 'reference_no',
                    text: 'Reference No'
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
            //  hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            // resizable: false,
            align: 'right',
            // hideable: false,
            defaults: {
                xele: 'lala'
            },
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    className: 'update',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    className: 'delete',
                    tooltip: 'Delete'
                },
                {
                    text: 'Approve',
                    iconCls: 'icon-approve',
                    bindAction: me.bindPrefixName + 'Approve',
                    altText: 'Approve',
                    className: 'approve',
                  //  tooltip: 'Approve'




                },
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    className: 'view',
                    bindAction: me.bindPrefixName + 'View',
                    altText: 'View',
                    tooltip: 'View'
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
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
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
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
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