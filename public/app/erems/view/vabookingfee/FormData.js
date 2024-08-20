Ext.define('Erems.view.vabookingfee.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.vabookingfeeformdata',
    // requires: ['Erems.library.template.component.Bookingfeecombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow:-1,
    initComponent: function() {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'bookingfee_id',
                    name: 'bookingfee_id'
                },
                {
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    margin: '5px 0 0 0',
                    items: [{
                            xtype: 'textfield',
                            width: '100%',
                            fieldLabel: 'No. VA BCA',
                            itemId: 'nomor_va',
                            name: 'nomor_va',
                            readOnly:true       
                        }],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
                {
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    margin: '5px 0 0 0',
                    items: [{
                            xtype: 'textfield',
                            width: '100%',
                            fieldLabel: 'No. VA Mandiri',
                            itemId: 'nomor_vamandiri',
                            name: 'nomor_vamandiri',
                            readOnly:true       
                        }],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
                {
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    margin: '5px 0 0 0',
                    items: [{
                            xtype      : 'xnamefieldEST',
                            width      : '100%',
                            allowBlank : false,
                            fieldLabel : 'Customer Name',
                            itemId     : 'customer_name',
                            name       : 'customer_name',
                            listeners:{
                                afterrender: {
                                    buffer: 200,
                                    fn: function(){
                                        var payDate = me.down("[name=payment_date]").getRawValue();
                                        if(payDate !=""){
                                            me.down("[name=customer_name]").setReadOnly(true);
                                            me.down("[name=amount_type]").setReadOnly(true);
                                            me.down("[name=amount]").setReadOnly(true);
                                            me.down("[name=receipt_no]").setReadOnly(true);
                                        }
                                    }
                                }
                            }
                            // readOnly:true       
                        }],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
                {
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    margin: '5px 0 0 0',
                    items: [{
                            xtype: 'bookingfeecombobox',
                            fieldLabel: 'Amount',
                            anchor: '-5',
                            name: 'amount_type',
                            itemId: 'amount_type',
                            flex: 7,
                            editable:false,
                            listeners:{
                                select: function(el){
                                    var res = Ext.util.Format.number((el.value * 1000000), '0,000.00');
                                    var amount = me.down("[name=amount]");

                                    amount.setValue(res);
                                }
                            },
                        },
                        {xtype: 'splitter', width: 10}, 
                        {
                            xtype: 'xmoneyfield',
                            fieldLabel: '',
                            itemId: 'amount',
                            name: 'amount',
                            readOnly:true,
                            flex: 12,
                            enableKeyEvents: true,
                            currencyFormat: true,
                            maskRe:/[0-9.]/,
                            listeners:{
                                afterrender: {
                                    buffer: 500,
                                    fn: function(){
                                        var amount = me.down("[name=amount]");
                                        var res = Ext.util.Format.number((amount.getValue()), '0,000.00');

                                        amount.setValue(res);

                                    }
                                }
                            }
                        },
                    ],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
                {
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    margin: '5px 0 0 0',
                    items: [
                        {
                            xtype: 'datefield',
                            width: '100%',
                            fieldLabel: 'Payment Date',
                            itemId: 'payment_date',
                            name: 'payment_date',
                            value        : new Date(),
                            format       : 'd-m-Y',
                            submitFormat : 'Y-m-d H:i:s.u',
                            // readOnly:true    
                        }
                    ],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
                {
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    margin: '5px 0 0 0',
                    items: [
                    {
                        xtype: 'paymentmethodcombobox',
                        fieldLabel: 'Payment Method',
                        anchor: '-5',
                        name: 'paymentmethod',
                        itemId: 'paymentmethod',
                        flex: 1,
                        editable:false,
                        hidden:true
                    }],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
                {
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    margin: '5px 0 0 0',
                    items: [{
                            xtype: 'textfield',
                            width: '100%',
                            allowBlank:false,
                            fieldLabel: 'Receipt No.',
                            itemId: 'receipt_no',
                            name: 'receipt_no',
                            maskRe:/[0-9a-zA-Z\s]/
                            // readOnly:true       
                        }],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
                {
                    layout    : 'hbox',
                    bodyStyle : 'border:0px',
                    width     : '100%',
                    margin    : '5px 0 0 0',
                    items     : [{
                        xtype      : 'xnotefieldEST',
                        width      : '100%',
                        allowBlank : false,
                        fieldLabel : 'Notes',
                        itemId     : 'notes',
                        name       : 'notes',
                    }],
                    bodyStyle: 'background-color:#dfe9f6;border:0;',
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

