Ext.define('Cashier.view.consolesupport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.consolesupportformdata',
    requires: ['Cashier.library.template.combobox.Coagrid'],
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'consolesupportID',
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
                            fieldLabel: 'Group Console',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'consolesupportcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Please Select',
                                        name: 'consolidation_access_id',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    },
                                    
                            ]
                        },  
                          {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'COA',
                            layout: 'hbox',
                            items: [
                                     {
                                        xtype: 'coacombogrid',
                                        fieldLabel:'',
                                        emptyText: 'Select COA',
                                        name: 'from_coa_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        typeAhead: true,
                                        forceSelection: true,
                                        listeners: {
                                            keyup: function (field) {
                                                var me = this;
                                                var c = 0;
                                                var searchString = field.getValue().toLowerCase();
                                                var store = field.getPicker().getStore();
                                                if (searchString) {

                                                    store.filterBy(function (record, id) {
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
                                        fieldLabel:'',
                                        emptyText: 'Select COA',
                                        name: 'until_coa_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        typeAhead: true,
                                        forceSelection: true,
                                        listeners: {
                                            keyup: function (field) {
                                                var c = 0;
                                                var searchString = field.getValue().toLowerCase();
                                                var store = field.getPicker().getStore();
                                                if (searchString) {
                                                    store.filterBy(function (record, id) {
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
                                    }
                            ]
                        },  
                          {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Periode',
                            layout: 'hbox',
                            items: [
                                    {
                                        xtype: 'datefield',
                                        fieldLabel:'',
                                        emptyText: 'From Date',
                                        name: 'fromdate',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d',
                                        altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
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
                                        submitFormat: 'Y-m-d',
                                        altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                                    }
                            ]
                        },  
                          {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'COA Header',
                           // padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'headerdata',
                                    inputValue: '1',
                                    id: 'tb_headeryes'
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
                                    id: 'tb_headerno',
                                    checked:true
                                }
                            ]
                        },
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
                                    id: 'tb_detailyes',
                                   
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
                                    id: 'tb_detailno',
                                    checked:true
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
                                  
                              
                            ]
                        }
                    ]
                },                 
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '15px 0 0 200px',
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
