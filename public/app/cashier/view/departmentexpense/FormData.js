Ext.define('Cashier.view.departmentexpense.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.departmentexpenseformdata',
    requires: ['Cashier.library.template.combobox.Coagrid'],
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'departmentexpenseID',
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
                            fieldLabel: 'PT',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        // xtype: 'ptprojectcombobox',
                                        xtype: 'projectptcombobox',
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
                            fieldLabel: 'Kode Account',
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
                            fieldLabel: 'Department',
                            layout: 'hbox',
                            items: [
                                    {
                                        xtype: 'departmentbyusercombobox',
                                        fieldLabel: '',
                                        emptyText: 'Department',
                                        name: 'department_id',
                                        allowBlank: true,
                                        enableKeyEvents : true,
                                        width: 160
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        fieldLabel: '',
                                        name: 'all_dept',
                                        boxLabel: 'All Dept',
                                        padding: '0 0 0 0',
                                        margin: '0 0 0 0',
                                        boxLabelCls: 'x-form-cb-label small',
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        checked: true
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
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '70'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'detaildata',
                                    inputValue: '2',
                                    id: 'tb_detailno'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Grouping',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Department',
                                    xtype: 'radiofield',
                                    name: 'headerdata',
                                    inputValue: '1',
                                    checked:true,
                                    id: 'type_dept'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '45'
                                },
                                {
                                    boxLabel: 'Expense',
                                    xtype: 'radiofield',
                                    name: 'headerdata',
                                    inputValue: '2',
                                    id: 'type_expense',
                                    
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Show Sub',
                            hidden: true,
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'subdata',
                                    inputValue: '1',
                                    id: 'subyes'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'subdata',
                                    inputValue: '2',
                                    id: 'subno',
                                    checked:true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Template',
                            hidden: true,
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'TB 01',
                                    xtype: 'radiofield',
                                    name: 'templatedata',
                                    inputValue: '1',
                                    id: 'template01'
                                },
                                {
                                    xtype: 'splitter',
                                    width: '38'
                                },
                                {
                                    boxLabel: 'TB 02',
                                    xtype: 'radiofield',
                                    name: 'templatedata',
                                    inputValue: '2',
                                    id: 'template02',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '38'
                                },
                                {
                                    boxLabel: 'TB Not Balance',
                                    xtype: 'radiofield',
                                    name: 'templatedata',
                                    inputValue: '3',
                                    id: 'template03'
                                }
                            ]
                        },
                         {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Voucher Sort',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            hidden: true,
                            items: [
                                {
                                    boxLabel: 'Asc',
                                    xtype: 'radiofield',
                                    name: 'sortdata',
                                    inputValue: '1',
                                    id: 'sort01',
                                    checked:true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '50'
                                },
                                {
                                    boxLabel: 'Desc',
                                    xtype: 'radiofield',
                                    name: 'sortdata',
                                    inputValue: '2',
                                    id: 'sort02'
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
