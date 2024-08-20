Ext.define('Cashier.view.otherspayment.PaymentDetailGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.otherspaymentpaymentdetailgrid',
  //  store: 'Paymentdetail',
    storeConfig:{
        id:'OPdetailGridStore',
        idProperty:'paymentdetail_id',
        extraParams:{
            mode_read:"paymentdetail"
        }
    },
    itemId:'PaymentDetailGridID',
    bindPrefixName: 'Otherspayment',
    height: 200,
    columnLines: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),

            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_due_date',
                    width: 120,
                    dataIndex: 'paymenttype_paymenttype',
                    hideable: false,
                    text: 'Type'

                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_type',
                    width: 120,
                    dataIndex: 'payment',
                    hideable: false,
                    text: 'Amount',
                    align: 'right'

                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ke',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'

                },
                {
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
                            tooltip: 'Delete',
                        }
                    ]
                    
                }


                //   me.generateActionColumn()
            ],
            bbar: [
                '',
                {xtype: 'tbfill'},
                '',
                {xtype: 'tbfill'},
                {
                    xtype: 'button',
                    hidden: false,
                    itemId: 'btnAddNew',
                    margin: '0 5 0 0',
                    action: 'addNewDetail',
                    iconCls: 'icon-new',
                    text: 'AddNew'
                }
            ],
        });

        me.callParent(arguments);
    }
    
});