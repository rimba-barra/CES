Ext.define('Hrd.view.companycherry.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.companycherrygrid',
    storeConfig:{
        id:'CompanycherryGridStore',
        idProperty:'Companycherry_id',
        extraParams:{}
    },
    bindPrefixName: 'Companycherry',
    newButtonLabel: 'New Companycherry',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
                 xtype: 'gridcolumn',
                 
                 
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },{
                   dataIndex: 'company_code',
                   text: 'Company code',
                   width:300
                },{
                   dataIndex: 'ptpt_name',
                   text: 'PT Name',
                   width:300
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
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                // {
                //     text: 'Edit',
                //     iconCls: 'icon-edit',
                //     bindAction: me.bindPrefixName + 'Update',
                //     altText: 'Edit',
                //     tooltip: 'Edit'
                // },
                // {
                //     text: 'Delete',
                //     action: 'remove',
                //     iconCls: 'icon-delete',
                //     bindAction: me.bindPrefixName + 'Delete',
                //     altText: 'Delete',
                //     tooltip: 'Delete',
                //     itemId: 'btnDeleteOne'
                // }
            ]
        };
        return ac;
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
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: 'New Companycherry'
                    },
                    // {
                    //     xtype: 'button',
                    //     action: 'update',
                    //     disabled: true,
                    //     hidden: true,
                    //     itemId: 'btnEdit',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-edit',
                    //     text: 'Edit',
                    //     bindAction: me.bindPrefixName + 'Update'
                    // },
                    {
                        xtype: 'button',
                        // action: 'destroy',
                        action: 'remove',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
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