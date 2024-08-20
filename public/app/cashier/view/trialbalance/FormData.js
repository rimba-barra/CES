Ext.define('Cashier.view.trialbalance.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.trialbalanceformdata',
    requires: ['Cashier.library.template.combobox.Coagrid'],
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Detail',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'detaildata',
                                    inputValue: '1',
                                    id: 'detailyes',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'detaildata',
                                    inputValue: '2',
                                    id: 'detailno'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Header',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'headerdata',
                                    inputValue: '1',
                                    id: 'headeryes'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'headerdata',
                                    inputValue: '2',
                                    id: 'headerno',
                                    checked:true
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',                   
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                         {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'PT',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'ptcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select PT',
                                        name: 'pt_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    }
                            ]
                          },
                          {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Kode Account',
                            layout: 'hbox',
                            items: [
                                    
                                     {
                                        xtype: 'coacombogrid',
                                        fieldLabel:'',
                                        emptyText: 'Select COA',
                                        name: 'from_coa_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    },
                                    {
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: 'To',
                                        margin: '2 10 0 10'
                                    },                                   
                                    {
                                        xtype: 'coacombogrid',
                                        fieldLabel:'',
                                        emptyText: 'Select COA',
                                        name: 'until_coa_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Tanggal Transaksi',
                            layout: 'hbox',
                            items: [
                                    {
                                        xtype: 'datefield',
                                        fieldLabel:'',
                                        emptyText: 'From Date',
                                        name: 'fromdate',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d'
                                    },
                                    {
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: 'To',
                                        margin: '2 10 0 10'
                                    },
                                   
                                    {
                                        xtype: 'datefield',
                                        fieldLabel:'',
                                        emptyText: 'Until Date',
                                        name: 'untildate',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d'
                                    }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'reporttype',
                                       valueField: 'reporttype',
                                       queryMode:'local',
                                       store:['DEFAULT','EXCEL'],
                                       autoSelect:true,
                                       forceSelection:true
                                    }
                            ]
                        }
                    ]
                },                 
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 200px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-submit',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
