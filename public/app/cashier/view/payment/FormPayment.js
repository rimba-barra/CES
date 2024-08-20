Ext.define('Cashier.view.payment.FormPayment', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.paymentformpayment',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 120,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'payment_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Payment Date',
                    itemId: 'fd_chequegiro_payment_date',
                    id: 'chequegiro_payment_date_qq',
                    name: 'chequegiro_payment_date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    width: 200,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

