Ext.define('Cashier.view.nonlinkpayment.FormDataDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.nonlinkpaymentformdatadetail',
    requires:['Cashier.library.template.view.combobox.Paymenttype'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow:-1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'paymentdetail_id'
                },
               {
                    xtype: 'cbpaymenttype',
                    name: 'paymenttype_paymenttype_id',
                    anchor:'-50'
                 
                },
                me.myField.number('payment','Amount'),
                {
                    xtype: 'textareafield',
                    height: 60,
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255,
                    anchor: '-5'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

