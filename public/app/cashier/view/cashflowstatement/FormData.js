Ext.define('Cashier.view.cashflowstatement.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowstatementformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'cashflowstatementID',
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
                    xtype: 'hiddenfield',
                    name: 'paramfromcoa',
                    value: ''
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'paramfromcoa_id',
                    value: '0'
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'paramuntilcoa',
                    value: ''
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'paramuntilcoa_id',
                    value: '0'
                },
               
              /* {
                    xtype: 'tbspacer',
                    height: 20
                },
                */
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [         
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Project',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'projectcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select Project',
                                        name: 'project_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="250px" >',
                                          '<tr class="x-grid-row">',

                                          '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                          '</tr>',
                                          '<tpl for=".">',
                                          '<tr class="x-boundlist-item">',
                                          '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                          '</tr>',
                                          '</tpl>',
                                          '</table>'
                                          ),   
                                        listeners: {
                                            keyup: function (field) {
                                                var searchString = field.getRawValue().toString().toLowerCase();
                                                if(searchString == null){
                                                    return false;
                                                }
                                                if (searchString) {
                                                    this.store.filterBy(function (record, id) {
                                                        if (record.get('projectname') == null) {
                                                            return false;
                                                        }else{
                                                            if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else {
                                                                return false;
                                                                this.store.clearFilter(true);
                                                            }    
                                                        }

                                                    });
                                                }
                                            },
                                            buffer:300
                                        }
                                    },
                            ]
                        },              
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'PT',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'ptprojectcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select PT',
                                        name: 'pt_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        listeners: {
                                            keyup: function (field) {
                                                var searchString = field.getRawValue().toString().toLowerCase();
                                                if(searchString == null){
                                                    return false;
                                                }
                                                if (searchString) {
                                                    this.store.filterBy(function (record, id) {
                                                        if (record.get('ptname') == null || record.get('code') == null) {
                                                            return false;
                                                        }else{
                                                            if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else {
                                                                return false;
                                                                this.store.clearFilter(true);
                                                            }    
                                                        }

                                                    });
                                                }
                                            },
                                            buffer:300
                                        }
                                    },
                            ]
                        }, 

                      
                      
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Transaction Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'From Date',
                                    name: 'subfromdate',
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
                                    fieldLabel: '',
                                    emptyText: 'Until Date',
                                    name: 'subuntildate',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'COA',
                            layout: 'hbox',
                            items: [

                                {
                                    xtype: 'coacombogrid',
                                    fieldLabel: '',
                                    emptyText: 'From COA',
                                    name: 'sub_coa_from_id',
                                    allowBlank: false,
                                    enableKeyEvents : true,
                                    typeAhead: true,
                                    forceSelection: true,
                                    listeners: {
                                        keyup: function (field) {
                                            var me = this;
                                            var c = 0;
                                            var searchString = field.getValue().toLowerCase();
                                            var store = field.getPicker().getStore();
                                            if (searchString) {

                                                field.getStore().filterBy(function (record, id) {
                                                    if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                        return true;
                                                        store.clearFilter(true);
                                                    } else if (record.get('coa').indexOf(searchString) > -1) {
                                                        return true;
                                                        store.clearFilter(true);
                                                    } else {
                                                        return false;
                                                        store.clearFilter(true);
                                                    }
                                                });
                                            }
                                        },
                                        buffer: 300,
                                    },
                                },
                                
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'coacombogrid',
                                    fieldLabel: '',
                                    emptyText: 'Until COA',
                                    name: 'sub_coa_until_id',
                                    allowBlank: false,
                                    enableKeyEvents : true,
                                    typeAhead: true,
                                    forceSelection: true,
                                    listeners: {
                                        keyup: function (field) {
                                            var me = this;
                                            var c = 0;
                                            var searchString = field.getValue().toLowerCase();
                                            var store = field.getPicker().getStore();
                                            if (searchString) {

                                                field.getStore().filterBy(function (record, id) {
                                                    if (record.get('name').toLowerCase().indexOf(searchString) > -1) {
                                                        return true;
                                                        store.clearFilter(true);
                                                    } else if (record.get('coa').indexOf(searchString) > -1) {
                                                        return true;
                                                        store.clearFilter(true);
                                                    } else {
                                                        return false;
                                                        store.clearFilter(true);
                                                    }
                                                });
                                            }
                                        },
                                        buffer: 300,
                                    },
                                },
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
                                        itemId: 'is_spk',
                                        name: 'is_spk',
                                        boxLabel: 'SPK',
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        width: 100,
                                        checked:true
                                    }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 15
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
                                    name: 'detail',
                                    inputValue: 1,
                                    id: 'radio1',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'detail',
                                    inputValue: 0,
                                    id: 'radio2'
                                },
                            ]
                        },
                    
                       
                       
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '20px 0 0 200px',
                    bodyStyle:'background-color:#dfe8f5', 
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
