Ext.define('Cashier.view.cashflowconsolidation.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowconsolidationformdata',
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
                                        forceSelection : true,
                                        enableKeyEvents: true,
                                        matchFieldWidth: true,
                                        listeners: {
                                            keyup: function (field) {
                                                var searchString = field.getRawValue().toString().toLowerCase();
                                                if(searchString == null){
                                                    return false;
                                                }
                                                if (searchString) {
                                                    this.store.filterBy(function (record, id) {
                                                        if (record.get('group_consolidation') == null ) {
                                                            return false;
                                                        }else{
                                                            if (record.get('group_consolidation').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                            }    
                                                        }
        
                                                    });
                                                }
                                            },
                                            buffer:300
                                        }
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
                            fieldLabel: 'Year',
                            layout: 'hbox',
                            items: [
                                    {
                                        xtype: 'yearcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Year',
                                        name: 'yeardata',
                                        allowBlank: false,
                                        editable : false,
                                    },
                                     {
                                        xtype: 'splitter',
                                        width: '10'
                                     },
                                     {
                                        xtype: 'levelcombobox',
                                        fieldLabel:'Level ',
                                        emptyText: 'All',
                                        hidden:true,
                                        width: 160,
                                        name: 'level'
                                    }
                            ]
                        },  
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
                                        editable : false,
                                        forceSelection:true
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: ' to:  ',
                                        margin: '2 10 0 10'
                                    },
                                     {
                                        xtype: 'monthcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Month',
                                        name: 'monthdatauntil',
                                        allowBlank: false,
                                        editable : false,
                                        forceSelection:true
                                    },
                                    
                                    // {
                                    //     xtype: 'yearcombobox',
                                    //     fieldLabel:'',
                                    //     emptyText: 'Year',
                                    //     name: 'yeardata',
                                    //     allowBlank: false,
                                    // }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Coa Header',
                            layout: 'hbox',
                            hidden:true,
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
                                       store:[
                                            'DEFAULT', 
                                            'ELIMINASI-ALL'
                                            // 'ELIMINASI-PER-KONSOL'
                                        ],
                                       autoSelect:true,
                                       editable : false,
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
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-search',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
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
