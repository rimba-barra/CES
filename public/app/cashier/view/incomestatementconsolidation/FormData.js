Ext.define('Cashier.view.incomestatementconsolidation.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.incomestatementconsolidationformdata',
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
                            fieldLabel: 'Group',
                            layout: 'hbox',
                            items: [ 
                                    {
                                        xtype: 'consolidationcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select Group',
                                        name: 'consolidation_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    },      
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },                        
                                    {
                                        xtype: 'ptprojectcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select PT',
                                        name: 'pt_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        readOnly: true
                                    }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            padding: '0 0 0 20px',
							hidden: true,
                            layout: 'vbox',
                            items: [
                                {
                                    boxLabel: 'This Month',
                                    xtype: 'radiofield',
                                    name: 'reporttype',
                                    inputValue: '1',
                                    id: 'radio1'
                                },
                                {
                                    boxLabel: 'This Month vs Last Month',
                                    xtype: 'radiofield',
                                    name: 'reporttype',
                                    inputValue: '2',
                                    id: 'radio2',
                                    checked: true,
                                },
                                {
                                    boxLabel: 'This Month vs Budget',
                                    xtype: 'radiofield',
                                    name: 'reporttype',
                                    inputValue: '3',
                                    id: 'radio3'
                                },
                                {
                                    boxLabel: 'This Month vs This Month Last Year',
                                    xtype: 'radiofield',
                                    name: 'reporttype',
                                    inputValue: '4',
                                    id: 'radio4'
                                },
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
                            fieldLabel: 'Level',
                            layout: 'hbox',
                            items: [
                                     {
                                        xtype: 'levelcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select Level',
                                        name: 'level',
                                        allowBlank: false,
                                    }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Periode',
                            layout: 'hbox',
                            items: [
                                     {
                                        xtype: 'monthcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Month',
                                        name: 'monthdata',
                                        allowBlank: false,
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        xtype: 'yearcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Year',
                                        name: 'yeardata',
                                        allowBlank: false,
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
                                       defaultValue: 'DEFAULT',
                                       queryMode:'local',
                                       //store:['DEFAULT','EXCEL'],
                                       store:['DEFAULT'],
                                       autoSelect:true,
                                       listeners: {
                                            afterrender: function() {
                                               this.setValue(this.defaultValue);    
                                            }
                                        },
                                       forceSelection:true
                                    }
                            ]
                        },  
                    ]
                },  
                {
                    xtype: 'tbspacer',
                    height: 20
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
