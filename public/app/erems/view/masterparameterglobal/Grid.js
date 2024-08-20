Ext.define('Erems.view.masterparameterglobal.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterparameterglobalgrid',
    store: 'Masterparameterglobal',
    bindPrefixName: 'Masterparameterglobal',
    newButtonLabel: 'New Parameter',
    initComponent: function() {
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
                    itemId: 'colms_id',
                    width: 240,
                    dataIndex: 'parametername',
                    text: 'Parameter name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_codea',
                    width: 64,
                    dataIndex: 'value',
                    hideable: false,
                    align:'center',
                    text: 'Value'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_codeb',
                    width: 100,
                    dataIndex: 'datatype',
                    hideable: false,
                    text: 'Data type'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_codes',
                    width: 240,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
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
                    },
                    {
                        xtype: 'button',
                        action: 'genxml',
                        hidden:false,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text:'Create XML File'
                    },
                    {
                        xtype: 'button',
                        action: 'gendata',
                        hidden:true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text:'Generate From XML'
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