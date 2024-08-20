Ext.define('Cashier.view.financepositionreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.financepositionreportformdata',
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
                            fieldLabel: 'Project / PT',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'ptprojectcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select PT',
                                        name: 'pt_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    },
                            ]
                        },  
                        
                                            
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'Report Date',
                                    name: 'report_date',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                },
                                // {
                                //     xtype: 'label',
                                //     forId: 'lbl1',
                                //     text: 'To',
                                //     margin: '2 10 0 10'
                                // },
                                // {
                                //     xtype: 'datefield',
                                //     fieldLabel: '',
                                //     emptyText: 'Until Date',
                                //     name: 'until_date',
                                //     allowBlank: false,
                                //     format: 'd-m-Y',
                                //     submitFormat: 'Y-m-d'
                                // }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Liquid',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'All',
                                    xtype: 'radiofield',
                                    name: 'is_liquid',
                                    inputValue: '2',
                                    id: 'radioliquid3',
                                    checked:true 
                                },
                                {
                                    xtype: 'splitter',
                                    width: '60'
                                },
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'is_liquid',
                                    inputValue: '1',
                                    id: 'radioliquid2'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '60'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'is_liquid',
                                    inputValue: '0',
                                    id: 'radioliquid1'
                                },
                            ]
                        },
                        
                   
                      
                        
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
                            fieldLabel: 'Report Type',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'reporttype',
                                       valueField: 'reporttype',
                                       queryMode:'local',
                                       dvalue: 'DEFAULT',
                                       store:['DEFAULT','EXCEL'],
                                       autoSelect:true,
                                       forceSelection:true,
                                           listeners: {
                                            afterrender: function() {
                                               this.setValue(this.dvalue);    
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '30'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        fieldLabel: '',
                                        name: 'showzerovalue', // untuk nampilin value SALDO <= 0
                                        boxLabel: 'Tampilkan data kurang dari 0',
                                        padding: '0 0 0 0',
                                        margin: '0 0 0 0',
                                        boxLabelCls: 'x-form-cb-label small',
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        checked: false,
                                        enableKeyEvents: true
                                    },
                            ]
                        }

                    ]
                },
              /* {
                    xtype: 'tbspacer',
                    height: 20
                },
                */
               
               /* {
                    xtype: 'tbspacer',
                    height: 15
                },
                */
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '20px 0 0 200px',
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-print',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
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
