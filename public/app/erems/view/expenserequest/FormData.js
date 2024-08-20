Ext.define('Erems.view.expenserequest.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.expenserequestformdata',
    requires:['Erems.view.expenserequest.GridDetail',
        'Erems.library.template.component.Departmentcombobox',
        'Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    itemId:'ExReqformData',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();
        //var faf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            
            items: [{
                xtype: 'panel',
                layout: 'vbox',
                bodyStyle: 'border:1px solid black;',
                items: [
                    {
                        xtype: 'panel',
                        flex: 2,
                        width: '100%',
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        items: [
                            {
                                xtype: 'panel',
                                flex: 3,
                                layout: 'vbox',
                                bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Expense ID',
                                                anchor: '-5',
                                                readOnly:true,
                                                name: 'expense_id',
                                                flex: 1
                                            }]
                                    },
                                    {
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                                xtype: 'textfield',
                                                anchor: '-5',
                                                name: 'department_code',
                                                enableKeyEvents:true,
                                                flex: 2,
                                                hidden:true,
                                            }, {
                                                xtype: 'combobox',
                                                fieldLabel: 'Department',
                                                anchor: '-5',
                                                allowBlank:false,
                                                displayField: cbf.department.d,
                                                valueField: cbf.department.v,
                                                name: 'department_department_id',
                                                queryMode:'local',
                                                flex: 2
                                            }
                                        ]
                                    }


                                ]
                            },
                            {xtype: 'splitter', width: 30},
                            {
                                xtype: 'panel',
                                flex: 2,
                                layout: 'vbox',
                                bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Expense Date',
                                                anchor: '-5',
                                                allowBlank:false,
                                                name: 'expense_date',
                                                format: 'd-m-Y',
                                                submitFormat:'Y-m-d H:i:s.u',
                                                value:new Date(),
                                                editable:false,
                                                flex: 1
                                            }]
                                    },
                                    {
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Payment Method',
                                                anchor: '-5',
                                                name: 'paymentmethod_paymentmethod_code',
                                                enableKeyEvents:true,
                                                flex: 2,
                                                listeners: {
                                                'keyup': function(){
                                                  var storepm = me.up().down("[name=paymentmethod_paymentmethod_id]").getStore();
                                                  var selected = me.up().down("[name=paymentmethod_paymentmethod_code]").getValue();
                                                    storepm.each(function(rec) {
                                                    
                                                //    if(ReloadTable._items[rec.get("id")])    /* do something*/{break;}
                                                    if(rec.get("code") === selected) {
                                                     me.up().down("[name=paymentmethod_paymentmethod_id]").setValue(rec.get("paymentmethod_id"));
                                                    }
                                                    
                                                    // console.log(this.getValue());
                                                    // console.log(this.me.value);
                                                   
                                                });
                                                }
                                            }
                                            }, {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'combobox',
                                                fieldLabel: '',
                                                anchor: '-5',
                                                allowBlank:false,
                                                displayField: cbf.paymentmethod.d,
                                                valueField: cbf.paymentmethod.v,
                                                name: 'paymentmethod_paymentmethod_id',
                                                queryMode:'local',
                                                flex: 2,
                                                 listeners: {
                                                'change': function(){
                                                   
                                                    var storepm = me.up().down("[name=paymentmethod_paymentmethod_id]").getStore();
                                                    var selected = me.up().down("[name=paymentmethod_paymentmethod_id]").getValue();
                                                    storepm.each(function(rec) {
                                                    if(rec.get("paymentmethod_id") === selected) {
                                                     me.up().down("[name=paymentmethod_paymentmethod_code]").setValue(rec.get("code"));
                                                    }    
                                                     
                                                    });
                                                }
                                            }
                                            },
                                        ]
                                    }
                                ]
                            }
                            
                           
                        ]
                    },
                    {
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        flex:3,
                                        width: '100%',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Voucher Number',
                                                anchor: '-5',
                                                name: 'voucher_no',
                                                enableKeyEvents:true,
                                                enforceMaxLength:true,
                                                maxLength:30,
                                                maskRe: /[A-Za-z0-9]/,
                                                flex: 1
                                                
                                            }, {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'textfield',
                                                fieldLabel: 'Reference Number',
                                                anchor: '-5',
                                                name: 'reference_no',
                                                enableKeyEvents:true,
                                                enforceMaxLength:true,
                                                maxLength:30,
                                                maskRe: /[A-Za-z0-9]/,
                                                flex:1
                                            }
                                        ]
                                    },
                    {
                        xtype: 'panel',
                        flex: 2,
                        width: '100%',
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        items: [
                            {xtype:'expenserequestgriddetail',
                            padding: '10px 0 0 0',
                            width:'100%'}
                           ]
                    },
                    {
                        xtype: 'panel',
                        flex: 2,
                        width: '100%',
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        items: [
                            {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                items: [
                                    {
                                        padding   : '10px 0 0 0',
                                        layout    : 'hbox',
                                        bodyStyle : 'border:0px',
                                        width     : '100%',
                                        items     : [{
                                                xtype      : 'xnotefieldEST',
                                                fieldLabel : 'Notes',
                                                name       : 'note',
                                                flex       : 1
                                            }]
                                    }

                                ]
                            }, {xtype: 'splitter', width: 20},
                            {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                                xtype: 'textfield',
                                            fieldLabel: 'TOTAL PAYMENT',
                                            name: 'total_amount',
                                            enableKeyEvents: false,
                                            maskRe: /[0-9\.]/,
                                            readOnly:true,
                                           // currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00,
                                            flex: 1
                                            }]
                                    }

                                ]
                            }

                        ]
                    }
                    //////// bagian bawah ///

                ]
            }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});