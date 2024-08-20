Ext.define('Cashier.view.masterfixedasset.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterfixedassetgrid',
    store: 'Masterfixedasset',
    bindPrefixName: 'Masterfixedasset',
    itemId: 'MasterfixedassetGrid',
    title: 'Fixed Asset',
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
                    itemId: 'colms_project_name',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    dataIndex: 'pt_name',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'PT Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    dataIndex: 'voucher_date',
                    titleAlign: 'center',
                    align: 'center',
                    width: 130,
                    hideable: false,
                    text: 'Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'left',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right',
                    width: 130,
                    hideable: false,
                    text: 'Amount'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_month_lifetime',
                    dataIndex: 'month_lifetime',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'Month Lifetime'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    dataIndex: 'status',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sell_date',
                    dataIndex: 'sell_date',
                    titleAlign: 'center',
                    align: 'center',
                    width: 130,
                    hideable: false,
                    text: 'Sell Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
                        text: 'Add Fixed Asset',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Edit',
                        itemId: 'btnEdit',
                        action: 'update',
                        iconCls: 'icon-edit',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDelete',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingmasterfixedasset',
                width: 360,
                displayInfo: true,
                store:'Masterfixedasset'
            }
        ];
        return dockedItems;
    },
     generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text : 'Delete',
                    iconCls: 'icon-delete',
                    action: 'destroy',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }

            ]
        };
        return ac;
    }
});


