Ext.define('Cashier.view.vendor.GridBankview', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vendorbankviewgrid',
    store: 'Vendorbankview',
    bindPrefixName: 'VendorbankviewGrid',
    itemId: 'VendorbankviewGrid',
    title: 'Bank Information',
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
                    itemId: 'colms_bank_name',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'bank_name',
                    hideable: false,
                    text: 'Bank'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bank_account_name',
                    dataIndex: 'bank_account_name',
                    titleAlign: 'center',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Account Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bank_account_no',
                    dataIndex: 'bank_account_no',
                    titleAlign: 'center',
                    align: 'left',
                    width: 150,
                    hideable: false,
                    text: 'Account No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_currency',
                    dataIndex: 'currency_word',
                    titleAlign: 'center',
                    align: 'right',
                    width: 130,
                    hideable: false,
                    text: 'Currency'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    dataIndex: 'remarks',
                    titleAlign: 'center',
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
                id: 'pagingvendorbankview',
                width: 360,
                displayInfo: true,
                store:'Vendorbankview'
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


