Ext.define('Hrd.view.codeofconduct.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.codeofconductgrid',
    storeConfig: {
        id: 'CodeofconductGridStore',
        idProperty: 'codeofconduct_id',
        extraParams: {}
    },
    bindPrefixName: 'Codeofconduct',
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width: 75
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [	
                {
                    dataIndex: 'project',
                    text: 'Project',
                    width: 150
                },			
		{
                    dataIndex: 'file_name',
                    text: 'File Name',
                    width: 200
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width: 200
                },
                {
                    xtype: 'booleancolumn',
                    text: 'Active',
                    dataIndex: 'active',
                    trueText: '&#10003;',
                    falseText: ' ',
                    resizable: false,
                    width: 50,
                    align: 'center'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [{
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    }, {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    }, {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    }, {
                        xtype: 'button',
                        action: 'check',
                        itemId: 'btnCheck',
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        bindAction: me.bindPrefixName + 'Check',
                        text: 'Employee Acceptance'
                    }, {
                        xtype: 'button',
                        action: 'copy',
                        itemId: 'btnCopy',
                        margin: '0 5 0 0',
                        iconCls: 'icon-copy',
                        bindAction: me.bindPrefixName + 'Copy',
                        text: 'Copy to other Project'
                    }, {
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
                        action: 'export',
                        itemId: 'btnExportCodeofconduct',
                        margin: '0 5 0 0',
                        icon: 'app/main/images/icons/excel.png',
                        bindAction: me.bindPrefixName + 'Check',
                        text: 'Export to excel'
                    },]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

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
            items: [{
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                            // }, {
                            //     text        : 'View',
                            //     iconCls     : 'icon-search',
                            //     // bindAction  : me.bindPrefixName + 'Read',
                            //     altText     : 'View',
                            //     tooltip     : 'View'
                }, {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }]
        };

        return ac;
    }
});