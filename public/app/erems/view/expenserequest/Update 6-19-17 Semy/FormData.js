Ext.define('Erems.view.expenserequest.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.expenserequestformdata',
    requires:['Erems.view.expenserequest.GridDetail',
        'Erems.library.template.component.Departmentcombobox',
        'Erems.template.ComboBoxFields',
        'Erems.library.template.component.Paymentmethodcombobox'],
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
                                                fieldLabel: 'Department',
                                                anchor: '-5',
                                                name: 'department_code',
                                                enableKeyEvents:true,
                                                flex: 2

                                            }, {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'combobox',
                                                fieldLabel: '',
                                                anchor: '-5',
                                                allowBlank:false,
                                                displayField: cbf.department.d,
                                                    valueField: cbf.department.v,
                                                name: 'department_department_id',
                                                
                                                flex: 2
                                            }, {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'button',
                                                text: 'Add New',
                                                anchor: '-5',
                                                flex: 1
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
                                                flex: 1
                                            }]
                                    },
                                    {
                                        xtype:'combobox',
                                        flex:1,
                                        fieldLabel: 'Payment Method',
                                        name:'paymentmethod_paymentmethod_id',
                                        anchor: '-5',
                                        padding: '10px 0 0 0',
                                        allowBlank:true,
                                        displayField: cbf.paymentmethod.d,
                                        valueField: cbf.paymentmethod.v
                                        
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
                                                flex: 1
                                                
                                            }, {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'textfield',
                                                fieldLabel: 'Reference Number',
                                                anchor: '-5',
                                                name: 'reference_no',
                                                enableKeyEvents:true,
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
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                                xtype: 'textareafield',
                                                fieldLabel: 'Notes',
                                                name: 'note',
                                                flex: 1
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