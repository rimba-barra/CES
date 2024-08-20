Ext.define('Cashier.view.listuserrole.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.listuserrolegrid',
    bindPrefixName: 'Listuserrole',
    store: 'Listuserrole',
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: null,
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'group_user_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'user_name',
                    text: 'User Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'user_fullname',
                    text: 'User Full Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'group_name',
                    text: 'Role Name'
                },
                {
                    xtype: 'datecolumn',
                    width: 150,
                    dataIndex: 'addon',
                    text: 'Add On',
                    align: 'center',
                    format: 'd-m-Y H:i:s'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'addby',
                    text: 'Add By'
                }
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
                        disabled: true,
                        hidden: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New'
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
                        hidden: true,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-excel',
                        text: 'Export Data',
                        bindAction: me.bindPrefixName + 'Export'
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
                }

            ]
        };
        return ac;
    },
});


