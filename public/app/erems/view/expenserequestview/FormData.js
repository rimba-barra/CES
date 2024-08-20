Ext.define('Erems.view.expenserequestview.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.expenserequestviewformdata',
    requires:['Erems.view.expenserequestview.GridDetail','Erems.library.template.component.Departmentcombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    itemId:'ExReqViewformData',
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
                                                readOnly:true, 
                                                flex: 2

                                            }, {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'departmentcombobox',
                                                fieldLabel: '',
                                                anchor: '-5',
                                                allowBlank:false,
                                                readOnly:true, 
                                                name: 'department_id',
                                                
                                                flex: 2
                                            }, {
                                                xtype: 'splitter', width: 5,
                                            }, {
                                                xtype: 'label',
                                                text: '',
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
                                                readOnly:true, 
                                                flex: 1
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
                            {xtype:'expenserequestviewgriddetail',
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
                            {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        width: '100%',
                                        items: [{
                                                xtype      : 'xnotefieldEST',
                                                fieldLabel : 'Notes',
                                                name       : 'note',
                                                readOnly   : true, 
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
                                
                                       
                                            maskRe: /[0-9\.]/,
                                            currencyFormat: true,
                                            fieldStyle: 'text-align:right;',
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
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
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