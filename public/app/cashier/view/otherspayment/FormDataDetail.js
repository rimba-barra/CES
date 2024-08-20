Ext.define('Cashier.view.otherspayment.FormDataDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.otherspaymentformdatadetail',
    requires: ['Cashier.library.template.view.combobox.Paymenttype', 'Cashier.template.ComboBoxFields',
        'Cashier.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    initComponent: function() {
        var me = this;

        var cbf = new Cashier.template.ComboBoxFields();

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
                    xtype: 'hiddenfield',
                    itemId: 'fschedule_id',
                    name: 'schedule_id'
                },
                {
                    xtype: 'combobox',
                    queryMode:'local',
                    fieldLabel: 'Payment Type',
                    name: 'paymenttype_paymenttype_id',
                    displayField: cbf.paymenttype.d,
                    valueField: cbf.paymenttype.v,
                    anchor: '-50'

                },
                //me.myField.number('payment', 'Amount'),
                {
                    xtype: 'xmoneyfield',
                    fieldLabel: 'Amount',
                    name: 'payment',
                
                    fieldStyle: 'text-align:right',
                    value: 0.00,
                },
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

