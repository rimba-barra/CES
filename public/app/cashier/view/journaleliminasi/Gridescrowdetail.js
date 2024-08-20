Ext.define('Cashier.view.voucher.Gridescrowdetail', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.voucherescrowdetailgrid',
    storeConfig: {
        id: 'EscrowPaymentDetailCoaGridStore',
        idProperty: 'paymentdetail_id',
        extraParams: {
            mode_read: 'escrowpayment',
            kasbank_id: 0
        },
    },
    height: 200,
    bindPrefixName: 'Voucher',
    itemId: 'Voucherescrowpaymentdetail',
    title: 'Escrow Detail',
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
                    width: 130,
                    dataIndex: 'noAR',
                    hideable: false,
                    text: '#ID',
                    flex: 4,
                    sortable: false,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    hideable: false,
                    sortable: false,
                    text: 'Customer',
                    width: 150,
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
                {
                    xtype: 'datecolumn',
                    dataIndex: 'pencairan_date',
                    text: 'Cair Date',
                    sortable: false,
                    flex: 3,
                    editor: {
                        xtype: 'datefield',
                        allowBlank: true,
                        value:new Date()
                    },
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var cair_date = moment(record.get('pencairan_date')).format("DD-MM-YYYY");
                        var now = moment(new Date()).format("DD-MM-YYYY");
                        if (cair_date == "01-01-1900") {
                            return '';
                        }
                        else {
                            var dt = new Date(cair_date);
                            return cair_date;
                        }

                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 120,
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
                    dataIndex: 'remaining_pay',
                    width: 120,
                    hideable: false,
                    tip: 'Insert payment on first record.',
                    text: 'Pay',
                    summaryType: 'sum',
                    sortable: false,
                    //renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                    flex: 4
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
//                    {
//                        xtype: 'button',
//                        action: 'browseEscrow',
//                        itemId: 'btnGetEscrow',
//                        iconCls: 'icon-search',
//                        text: 'Get Schema from List'
//                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnDelete',
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


