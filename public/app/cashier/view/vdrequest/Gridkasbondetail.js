Ext.define('Cashier.view.vdrequest.Gridkasbondetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.vdrequestgridkasbondetail',
    store: 'VDRequestkasbondetail',
    bindPrefixName: 'VDRequestkasbonDetail',
    itemId: 'VDRequestkasbondetail',
    title: 'COA',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            plugins: [rowEditing],
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                //me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 70,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'kasbon_date',
                    hideable: false,
                    text: 'Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 90,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'CA No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'remarks',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 90,
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining_amount',
                    dataIndex: 'remaining_amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 90,
                    hideable: false,
                    text: 'Amount Remaining',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pay_amount',
                    dataIndex: 'pay_amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 90,
                    hideable: false,
                    text: 'Pay',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_final_amount',
                    dataIndex: 'final_amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 90,
                    hideable: false,
                    text: 'Final',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add multi kasbon',
                        itemId: 'btnAddkasbon',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingvoucherrequestdetail',
                width: 360,
                displayInfo: true,
                store: 'VDRequestkasbondetail',
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        if (tbar.hideRefresh) {
                            tbar.down('#refresh').hide();
                        }
                    }

                }
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
            ]
        }

        return ac;

    },
});


