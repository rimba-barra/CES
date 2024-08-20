Ext.define('Cashier.view.mastermultiproject.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.mastermultiprojectgrid',
    bindPrefixName: 'MasterMultiProject',
    storeConfig: {
        id: 'MasterMultiProjectGridStore',
        idProperty: 'multiproject_id',
        extraParams: {},

    },
    
    // itemId:'',
    newButtonLabel: 'New Budget Coa ',
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
                    width: 200,
                    dataIndex: 'user_user_fullname',
                    hideable: false,
                    text: 'Full Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'user_user_email',
                    hideable: false,
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project'
                },
               
                {
                    xtype: 'datecolumn',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Addon',
                    format:'d-m-Y H:i:s',
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
                        //disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add User Access'
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


