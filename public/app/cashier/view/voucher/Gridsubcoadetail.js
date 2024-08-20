Ext.define('Cashier.view.voucher.Gridsubcoadetail', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.vouchersubcoadetailgrid',
    storeConfig: {
        id: 'SubCoaDetailCoaGridStore',
        idProperty: 'voucherdetailsub_id',
        extraParams: {
            mode_read: 'subdetailcoa',
        }
    },
    height: 200,
    bindPrefixName: 'Voucher',
    itemId: 'Vouchersubcoadetail',
    title: 'Sub Coa Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
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
                    itemId: 'colms_subglcode',
                    width: 50,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'kelsub_kelsub',
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subcode',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'subgl_code',
                    hideable: false,
                    text: 'Sub Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code1',
                    hideable: false,
                    text: 'Code 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code2',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code2',
                    hideable: false,
                    text: 'Code 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'subgl_code3',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code3',
                    hideable: false,
                    text: 'Code 3'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code4',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code4',
                    hideable: false,
                    text: 'Code 4'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 160,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_description',
                    hideable: false,
                    text: 'Sub Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 100,
                    hideable: false,
                    text: 'Amount',
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },

                    /*	
                     renderer: Ext.util.Format.numberRenderer('0,000.00'),
                     summaryType: 'sum',
                     summaryRenderer: function (value, summaryData, dataIndex) {
                     var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                     return  "Sum Total : " + summaryvalue;
                     }*/
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
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'asd',
//                    width: 50,
//                    titleAlign: 'center',
//                    align: 'center',
//                    dataIndex: 'Edited',
//                    hideable: false,
//                    text: 'Edited',
//                    renderer: function (value, metaData, record, row, col, store, gridView) {
//                        var payment_paymentflag_id = record.get('payment_paymentflag_id');
//                        if (payment_paymentflag_id) {
//                            return '&#10003';
//                        }
//                    },
//                },
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
                        hidden: false,
                        disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New Sub ',
                        bindAction: me.bindPrefixName + 'Create'
                    },

                    {
                        xtype: 'button',
                        action: 'update',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        hidden: false,
                        disabled: true,
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

});


