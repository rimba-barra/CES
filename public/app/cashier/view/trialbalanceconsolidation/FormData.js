Ext.define('Cashier.view.trialbalanceconsolidation.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.trialbalanceconsolidationformdata',
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
                                        width: 260,
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
                            fieldLabel: 'From',
                            layout: 'hbox',
                            items: [
									 {
                                        xtype: 'monthcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Month',
                                        name: 'monthdatafrom',
                                        allowBlank: false,
                                     },
                                     {
                                        xtype: 'splitter',
                                        width: '10'
                                     },
                                     {
                                        xtype: 'levelcombobox',
                                        fieldLabel:'Level ',
                                        emptyText: 'All',
                                        width: 160,
                                        name: 'level'
                                    },
                                   
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'To',
                            layout: 'hbox',
                            items: [
                                     {
                                        xtype: 'monthcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Month',
                                        name: 'monthdatauntil',
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
                            fieldLabel: 'Coa Header',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'header',
                                       valueField: 'header',
                                       queryMode:'local',
                                       //store:['DEFAULT','EXCEL'],
                                       value: 'NO',
                                       store:['YES','NO'],
                                       autoSelect:true,
                                       forceSelection:true
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
                                       //store:['DEFAULT','EXCEL'],
                                       value: 'DEFAULT',
                                       store:['DEFAULT', 'ELIMINASI-ALL', 'ELIMINASI-PER-KONSOL'],
                                       autoSelect:true,
                                       forceSelection:true
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        fieldLabel: '',
                                        itemId: 'fd_typeheader'+me.uniquename,
                                        name: 'typeheader',
                                        boxLabel: 'Change PT To Code',
                                        padding: '0 0 0 0',
                                        boxLabelCls: 'x-form-cb-label small',
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        checked: false
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
