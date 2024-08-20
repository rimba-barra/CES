Ext.define('Erems.view.expenserequest.FormDataApprove', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.expenserequestformdataapprove',
    requires:['Erems.view.expenserequest.GridDetail',
    'Erems.view.expenserequest.GridDetailUnit',
    'Erems.library.template.component.Departmentcombobox',
    'Erems.library.template.component.Paymentmethodcombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    bodyPadding: 10,
    itemId:'ExReqformApprove',
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    editedRow:-1,
    initComponent: function() {
        var me = this;

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
                        flex: 2,
                        layout: 'vbox',
                        width: '100%',
                        bodyStyle: 'border:0px',
                        items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Approve Date',
                            anchor: '-5',
                            allowBlank:false,
                            name: 'approve_date',
                            format: 'd/m/Y',
                            submitFormat:'Y-m-d',
                            value:new Date(),
                            flex: 1
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Voucher Date',
                            anchor: '-5',
                            allowBlank:false,
                            name: 'voucher_date',
                            format: 'd/m/Y',
                            value:new Date(),
                            submitFormat:'Y-m-d',
                            flex: 1
                        },{
                            xtype:'paymentmethodcombobox',
                            flex:1,
                            name:'paymentmethod_paymentmethod_id',
                            anchor: '-5',
                            allowBlank:false
                        }
                        ]
                    },
                    {
                        xtype: 'splitter', 
                        width: 30
                    },

                    {
                        xtype: 'panel',
                        flex: 3,
                        layout: 'vbox',
                        width: '100%',
                        bodyStyle: 'border:0px',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Voucher Number',
                            anchor: '-5',
                            name: 'voucher_no',
                            allowBlank:false,
                            flex: 1
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Reference Number',
                            anchor: '-5',
                            name: 'reference_no',
                            allowBlank:false,
                            flex: 1
                        }]
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
                                name: 'expense_id',
                                flex: 1,
                                readOnly:true,
                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
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
                               
                                flex: 2,
                                readOnly:true,
                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'

                            }, {
                                xtype: 'splitter', 
                                width: 5
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '',
                                anchor: '-5',
                              
                                name: 'department_department',
                                readOnly:true,
                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;',                 
                                flex: 2
                            }, {
                                xtype: 'splitter', 
                                width: 5
                            }, {
                                xtype: 'button',
                                text: 'Add New',
                                anchor: '-5',
                                flex: 1,
                                hidden:true
                            }
                            ]
                        }


                        ]
                    },
                    {
                        xtype: 'splitter', 
                        width: 30
                    },

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
                                name: 'expense_date',
                                flex: 1,
                                readOnly:true,
                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                            }]
                        }
                        ]
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
                    {
                        xtype:'expenserequestgriddetail',
                        padding: '10px 0 0 0',
                        width:'100%',
                        useActionCol:false,
                        useAddNewButton:false,
                        itemId:'approveGrid'
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
                    {
                        xtype:'expenserequestgriddetailunit',
                        padding: '10px 0 0 0',
                        width:'100%'
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
                    {
                        xtype: 'panel', 
                        flex: 1, 
                        layout: 'vbox', 
                        bodyStyle: 'border:0px',
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
                                flex: 1,
                                readOnly:true,
                                fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                            }]
                        }

                        ]
                    }, {
                        xtype: 'splitter', 
                        width: 20
                    },

                    {
                        xtype: 'panel', 
                        flex: 1, 
                        layout: 'vbox', 
                        bodyStyle: 'border:0px',
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
                                currencyFormat: true,
                              
                                value: 0.00,
                                flex: 1,
                                readOnly:true,
                                fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
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
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});