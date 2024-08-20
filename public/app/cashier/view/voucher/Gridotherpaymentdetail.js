Ext.define('Cashier.view.voucher.Gridotherpaymentdetail', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.voucherotherpaymentgrid',
    storeConfig: {
        id: 'OtherPaymentDetailCoaGridStore',
        idProperty: 'paymentdetail_id',
        extraParams: {
            mode_read: 'otherpayment',
            kasbank_id: 0
        },
    },
    height: 200,
    bindPrefixName: 'Voucher',
    itemId: 'Voucherotherpaymentdetail',
    title: 'Other Payment Detail',
    newButtonLabel: 'Add New',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            plugins: [rowEditing],
            viewConfig: {
                stripeRows: true
            },
            features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'paymenttype_paymenttype',
                    hideable: false,
                    text: 'Payment Type',
                    flex: 4,
                    sortable: false,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 200,
                    hideable: false,
                    header: 'Total',
                    sortable: false,
                    summaryType: 'sum',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    flex: 4,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 200,
                    flex: 5,
                    hideable: false,
                    sortable: false,
                    text: 'Description'
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
                        itemId: 'btnCreateOP',
                        iconCls: 'icon-new',
                        text: 'Add new'
                    },
                     {
                        xtype: 'button',
                        action: 'update',
                        itemId: 'btnUpdateOP',
                        iconCls: 'icon-edit',
                        text: 'Edit'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnDeleteOp',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 100,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
            ]
        }

        return ac;

    },
});


