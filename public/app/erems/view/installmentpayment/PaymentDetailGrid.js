Ext.define('Erems.view.installmentpayment.PaymentDetailGrid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.installmentpaymentpaymentdetailgrid',
    //store: 'Paymentdetail',
    storeConfig: {
        id: 'PaymentDetailGridStore',
        idProperty: 'schedule_id',
        extraParams: {
            purchaseletter_id: 0,
            mode_read: 'tagihan',
            data_request: 'tagihan'
        }
    },
    bindPrefixName: 'Installmentpayment',
    height: 200,
    columnLines: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            //   dockedItems: me.generateDockedItems(),
            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    width: 80,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Due Date'

                },
                {
                    xtype: 'gridcolumn',
                    width: 30,
                    dataIndex: 'scheduletype_scheduletype',
                    hideable: false,
                    text: 'Type'

                },
                {
                    xtype: 'gridcolumn',
                    width: 40,
                    dataIndex: 'termin',
                    hideable: false,
                    text: 'Termin',
                    align: 'center'

                },
                {
                   // xtype: 'numbercolumn',
                    itemId: 'colms_ke',
                    width: 120,
                    dataIndex: 'amount',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', 2);
                    },
                    hideable: false,
                    text: 'Amount',
                    align: 'right'

                },
                {
                    // xtype: 'numbercolumn',
                    // decimalPrecision:4,
                    width: 120,
                    dataIndex: 'remaining_balance',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', 2);
                    },
                    hideable: false,
                    text: 'Remaining Balance',
                    align: 'right'

                },
                {
                  //  xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'payment_payment',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', 2);
                    },
                    hideable: false,
                    text: 'Payment',
                    align: 'right'

                },
                {
                   // xtype: 'numbercolumn',
                    itemId: 'colms_denda',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', 2);
                    },
                    width: 120,
                    dataIndex: 'remaining_denda',
                    hideable: false,
                    text: 'Denda',
                    align: 'right'

                }


                //   me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});