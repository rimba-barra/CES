Ext.define('Cashier.view.vendor.GridEmailview', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vendoremailviewgrid',
    store: 'Vendoremailview',
    bindPrefixName: 'VendoremailviewGrid',
    itemId: 'VendoremailviewGrid',
    title: 'Email',
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
                    itemId: 'colms_email',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'email',
                    hideable: false,
                    text: 'Email Address'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    dataIndex: 'remarks',
                    titleAlign: 'left',
                    align: 'left',
                    width: 300,
                    hideable: false,
                    text: 'Notes'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_active',
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
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingvendoremailview',
                width: 360,
                displayInfo: true,
                store:'Vendoremailview'
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


