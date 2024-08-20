Ext.define('Cashier.view.masteroffbalancesheet.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masteroffbalancesheetgrid',
    store: 'Masteroffbalancesheet',
    bindPrefixName: 'Masteroffbalancesheet',
    itemId: 'MasteroffbalancesheetGrid',
    title: 'Bank Type',
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
                    width: 300,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'projectpt_name',
                    text: 'PT'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'banktype',
                    titleAlign: 'left',
                    align: 'left',
                    width: 250,
                    text: 'Bank Type'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'bank_name',
                    titleAlign: 'left',
                    align: 'left',
                    width: 250,
                    text: 'Bank Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'bank_acc_no',
                    titleAlign: 'left',
                    align: 'center',
                    width: 250,
                    text: 'Bank ACC No'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'opening_balance',
                    titleAlign: 'left',
                    align: 'right',
                    maskRe: /[^\`\"\']/,
                    width: 100,
                    text: 'Opening Balance'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'debit',
                    titleAlign: 'left',
                    align: 'right',
                    width: 100,
                    text: 'Debit'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'credit',
                    titleAlign: 'left',
                    align: 'right',
                    width: 100,
                    text: 'Credit'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'closing_balance',
                    titleAlign: 'left',
                    align: 'right',
                    width: 100,
                    text: 'Closing Balance'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'periode',
                    titleAlign: 'left',
                    align: 'center',
                    width: 200,
                    text: 'Periode',
                    renderer: function(value, meta, record) {
                        return Ext.Date.format(record.data.date_from, 'd M Y') + ' - ' + Ext.Date.format(record.data.date_until, 'd M Y');
                    }
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
                        text: 'Add Off Balance Sheet',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Edit',
                        itemId: 'btnEdit',
                        action: 'update',
                        iconCls: 'icon-edit',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDelete',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                    {
                        text: 'Copy',
                        itemId: 'btnCopy',
                        iconCls: 'icon-copy',
                        action: 'showcopy',
                        // disabled: true,
                        // bindAction: me.bindPrefixName + 'Delete'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingmasteroffbalancesheet',
                width: 360,
                displayInfo: true,
                store:'Masteroffbalancesheet'
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
                },
                {
                    text : 'Delete',
                    iconCls: 'icon-delete',
                    action: 'destroy',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }

            ]
        };
        return ac;
    }
});


