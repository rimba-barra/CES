Ext.define('Cashier.view.writeofflimit.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.writeofflimitgrid',
    bindPrefixName: 'Writeofflimit',
    storeConfig: {
        id: 'WriteofflimitGridStore',
        idProperty: 'userrole_id',
        extraParams: {module: 'writeofflimit'},
    },
    // itemId:'',
    newButtonLabel: 'Create',
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
                    width: 150,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'rolename',
                    hideable: false,
                    text: 'Role',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'limittypename',
                    hideable: false,
                    text: 'Limit Type',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'limit_percentage',
                    hideable: false,
                    text: 'Limit Percentage',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'limit_amount',
                    hideable: false,
                    text: 'Limit Amount',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Addon',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'addbyname',
                    hideable: false,
                    text: 'Add By',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'modion',
                    hideable: false,
                    text: 'Modified On',
                    flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'modibyname',
                    hideable: false,
                    text: 'Modified By',
                    flex: 1,
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
                        disabled: false,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Create',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: false,
                        itemId: 'btnUpdate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Update',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'deletes',
                        disabled: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete',
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        width: 360,
                        displayInfo: true,
                        store: this.getStore()
                    },
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
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                

            ]
        };
        return ac;
    },
});


