Ext.define('Cashier.view.vendor.GridNoteview', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vendornoteviewgrid',
    store: 'Vendornoteview',
    bindPrefixName: 'VendorNote',
    itemId: 'VendorNoteview',
    title: 'Transaction Note',
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
                    itemId: 'colms_code_view',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_note_view',
                    dataIndex: 'note',
                    titleAlign: 'left',
                    align: 'left',
                    width: 300,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_active_view',
                    dataIndex: 'active',
                    titleAlign: 'center',
                    align: 'center',
                    width: 70,
                    hideable: false,
                    text: 'Active',
                    renderer: function(value, meta, record) {
                        var val = record.get('active');
                        if (val == 1) {
                            return 'Yes';
                        } else {
                            return 'No';
                        }
                    }
                },
                // me.generateActionColumn()
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
                        text: 'Add Note',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    }

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingnoteview',
                width: 360,
                displayInfo: true,
                store:'Vendornoteview'
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


