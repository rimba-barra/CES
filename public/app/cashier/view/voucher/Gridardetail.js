Ext.define('Cashier.view.voucher.Gridardetail', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.voucherardetailgrid',
    storeConfig: {
        id: 'ArDetailCoaGridStore',
        idProperty: 'paymentdetail_id',
        extraParams: {
            mode_read: 'arpayment',
            kasbank_id: 0
        },
    },
    height: 200,
    bindPrefixName: 'Voucher',
    itemId: 'Voucherarpaymentdetail',
    title: 'AR Detail',
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
                    xtype: 'datecolumn',
                    dataIndex: 'duedate',
                    text: 'Due Date',
                    sortable: false,
                    flex: 3,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    hideable: false,
                    sortable: false,
                    text: 'Customer',
                    width: 250,
                    flex: 4,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 200,
//                    flex: 6,
                    hideable: false,
                    sortable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    style: 'text-align:left',
                    width: 150,
                    hideable: false,
                    header: 'Total',
                    sortable: false,
                    summaryType: 'sum',
                    //renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var rb = record.get('oppaid');
                        var amount = record.get('amount');
                        var paymentdetail_id = record.get('paymentdetail_id');
                        rb = accounting.unformat(rb);
                        if (!paymentdetail_id) {
                            if (rb === 0) {
                                return accounting.formatMoney(amount);
                            }
                            else {

                                return accounting.formatMoney(rb);
                            }
                        } else {
                            return accounting.formatMoney(amount);
                        }
                    },
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    flex: 4,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'remaining_pay',
                    width: 150,
                    hideable: false,
                    tip: 'Insert payment on first record.',
                    text: 'Pay',
                    summaryType: 'sum',
                    align:'right',
                    sortable: false,
                    fieldStyle: 'text-align:right',
                    //renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                        return 0;
                    },
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        //currencyFormat: true,
                        fieldStyle: 'text-align:right'
                    },
                    flex: 4
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'final',
                    sortable: false,
                    width: 120,
                    hideable: false,
                    text: 'Final',
                    emptyText: '0.00',
                    summaryType: 'sum',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');

                    },
                    fieldStyle: 'text-align:right',
                    flex: 4
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'debitnote',
                    hideable: false,
                    sortable: false,
                    text: 'Debit Note',
                    width: 250,
                    flex: 4,
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                        return 0;
                    },
                },
//                {
//                    xtype: 'gridcolumn',
//                    dataIndex: 'is_debitnote',
//                    sortable: false,
//                    hideable: false,
//                    text: 'Is Debit Note?',
//                    flex: 6,
////                    renderer: function (value, metaData, record, row, col, store, gridView) {
////                        var is_debitnote = record.get('is_debitnote');
////                        var islastschedule = record.get('islastschedule');
////                        if(islastschedule==1){
////                            if(is_debitnote==1){
////                                return '<input type="checkbox" name="is_debitnote" value="1" checked="true">';
////                            }else{
////                                return '<input type="checkbox" name="is_debitnote" value="1">';
////                            }
////                        }
////                    },
//                    editor: {
//                        xtype: 'checkboxfield',
//                        padding: '0 0 0 0',
//                        margin: '0 0 0 0',
//                        boxLabelCls: 'x-form-cb-label small',
//                        inputValue: '1',
//                        uncheckedValue: '0',
//                    },
//                },
                {
                    editor: {
                        xtype: 'checkbox',
                        cls: 'x-grid-checkheader-editor',
                        inputValue: 1,
                        id:'checkboxDN',
                        uncheckedValue: 0
                    },
                    text: 'Is Debit Note?',
                    dataIndex: 'is_debitnote',
                    renderer: function(value, metadata, record, rowIndex, colIndex, store) {
                        var tempVal = '',
                            me = this;
                        if (value == 1 || value==true) {
                            tempVal = 'checked';
                        }
                        return "<input name='is_debitnote' type='checkbox' " + tempVal + ">";
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'tax',
                    sortable: false,
                    hideable: false,
                    text: 'Tax',
                    flex: 1,
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        return '<input type="checkbox" checked="true">';
                    },
                },
                me.generateActionColumn()
            ],
            viewConfig : {
                listeners: {
                    cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                        if (e.target.type && e.target.type === 'checkbox') {
                            var checkVal = e.target.checked ? 1 : 0;
                            record.set('is_debitnote', checkVal);
                        }
                    },
                }
            },
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
                        action: 'browseSchedule',
                        itemId: 'btnGetAr',
                        iconCls: 'icon-search',
                        text: 'Get AR from List'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnDelete',
                       // bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'xmoneyfield',
                        itemId: 'paymentallId',
                        id: 'paymentallId',
                        name: 'paymentall',
                        disabled: false,
                        fieldLabel: 'Payment helper ',
                        width: 250,
//                        hidden:true
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


