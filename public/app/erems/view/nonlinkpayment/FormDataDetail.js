Ext.define('Erems.view.nonlinkpayment.FormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.nonlinkpaymentformdatadetail',
    requires:['Erems.library.template.view.combobox.Paymenttype'],
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
                // me.myField.number('payment','Amount'),
                {
                    xtype: 'textfield',
                    fieldLabel: 'Amount',
                    name: 'payment',
                    itemId: 'payment',
                    // itemId: name + 'Id',
                    maskRe: /[0-9\.]/,
                    currencyFormat: true,
                    fieldStyle: 'text-align:right',
                    // value: 0.00,
                    allowBlank:false,
                    listeners:{
                        change:function(el, v, prev){
                            var commaPos = v.indexOf('.')+1,
                            strLen = v.length;

                            if((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen-2)){
                                el.setValue(prev);
                            }
                        }
                    }
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    allowBlank : true,
                    anchor     : '-5'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

