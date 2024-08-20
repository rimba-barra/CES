Ext.define('Cashier.view.logautomail.Grid', {
    extend: 'Cashier.library.template.view.GridNoCb',
    alias: 'widget.logautomailgrid',
    store: 'Logautomail',
    bindPrefixName: 'Logautomail',
    itemId: 'Logautomail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            //selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_module',
                    width: 150,
                    dataIndex: 'module_description',
                    hideable: false,
                    text: 'Module',
                     renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_log') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 150,
                    dataIndex: 'type_description',
                    hideable: false,
                    text: 'Type',
                     renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_log') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 120,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Name',
                     renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_log') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sent_to',
                    width: 120,
                    dataIndex: 'send_to',
                    hideable: false,
                    text: 'Sent To',
                     renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_log') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sent_cc',
                    width: 120,
                    dataIndex: 'send_cc',
                    hideable: false,
                    text: 'Sent CC',
                     renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_log') + '" data-qwidth="500px"';
                        return value;
                    }
                },
               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sent_date',
                    width: 100,
                    dataIndex: 'send_date',
                    hideable: false,
                    text: 'Sent Date',
                     renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_log') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 100,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status',
                     renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_log') + '" data-qwidth="500px"';
                        return value;
                    }
                },
              //  me.generateActionColumn()
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
                        action: 'generate',
                        //disabled: true,
                        itemId: 'btnGenerate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Populate from COA',
                        hidden: true,
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
                       // bindAction: me.bindPrefixName + 'Update'
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
                        //bindAction: me.bindPrefixName + 'Delete'
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


