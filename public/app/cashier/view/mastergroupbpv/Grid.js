Ext.define('Cashier.view.mastergroupbpv.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.mastergroupbpvgrid',
    bindPrefixName: 'Mastergroupbpv',
    storeConfig: {
        id: 'MastergroupbpvGridStore',
        idProperty: 'prefix_id',
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
                    itemId: 'colms_prefix',
                    width: 100,
                    dataIndex: 'prefix',
                    hideable: false,
                    text: 'Kode Prefix '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 300,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
 
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'is_cashflow',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'Cashflow'
                },
                

               
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'is_cashier',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 80,
                    hideable: false,
                    text: 'Cashier'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_openmonth',
                    width: 80,
                    dataIndex: 'openmonth',
                    hideable: false,
                    text: 'Open Month'
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
                        text: 'Add New Prefix'
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


