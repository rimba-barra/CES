Ext.define('Cashier.view.banktransactionreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.banktransactionreportformdata',
    requires: [
        'Cashier.library.template.combobox.Paymentmethodcombobox'
    ],
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'banktransactionreportID',
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
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [         
                       {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'KAS / BANK',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'kasbank_type',
                                       valueField: 'kasbank_type',
                                       queryMode:'local',
                                       dvalue: 'KAS',
                                       store:['KAS','BANK'],
                                       autoSelect:true,
                                       forceSelection:true,
                                           listeners: {
                                            afterrender: function() {
                                               this.setValue(this.dvalue);    
                                            }
                                        }
                                    }
                            ]
                        },
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
                                        enableKeyEvents: true
                                    },
                            ]
                        }, 
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Bank',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'bankcombobox2',
                                    fieldLabel: '',
                                    name: 'bank_id',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'bank_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 5',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Bank Type',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'banktypecombobox',
                                    fieldLabel: '',
                                    name: 'banktype_id',
                                    emptyText: 'ALL',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'banktype_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 5',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },
                            ]
                        },  

                         {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Bank Account',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'prefixcombobox',
                                    fieldLabel: '',
                                    emptyText: 'ALL',
                                    name: 'bank_account',
                                    allowBlank: false,
                                    enableKeyEvents : true,
                                     tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="250px" >',
                                            '<tr class="x-grid-row">',
                                              
                                                 '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                                '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                                                    '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                         '</table>'
                                     ),    
                                }, 
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'prefix_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 5',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },
                            ]
                        }, 
                         {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Account Number',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'accountnumbercombobox',
                                    fieldLabel: '',
                                    name: 'account_number',
                                    emptyText: 'ALL',
                                    allowBlank: false,
                                    //enableKeyEvents : true
                                },
                                 {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'accountnumber_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 5',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },
                            ]
                        },  


                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Department',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'departmentcombobox',
                                    fieldLabel: '',
                                    emptyText: 'ALL',
                                    name: 'dept_id',
                                    allowBlank: false,
                                    enableKeyEvents : true
                                    
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'dept_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 5',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },
                                
                            ]
                        },                                          
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Realization Date',
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
                            ]
                        },   
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Detail COA',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'detail_coa',
                                    inputValue: '0',
                                    id: 'detailcoa0',
                                    checked:true
                                },
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'detail_coa',
                                    inputValue: '1',
                                    id: 'detailcoa1',
                                    margin: '0 0 0 59'
                                }
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
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'is_liquid',
                                    inputValue: '1',
                                    id: 'radioliquid2',
                                    margin: '0 0 0 60'
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'is_liquid',
                                    inputValue: '0',
                                    id: 'radioliquid1',
                                    margin: '0 0 0 60'
                                },
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Payment Type',
                            name: 'fieldPaymentType',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'paymentmethodcombobox',
                                    name: 'paymentmethod_id',
                                    fieldLabel: '',
                                    emptyText: 'ALL'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'paymentmethod_all',
                                    id: 'paymentmethod_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 5',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                            ]
                        },
                        // {
                        //     xtype: 'fieldcontainer',
                        //     fieldLabel: 'Payment Date',
                        //     layout: 'hbox',
                        //     items: [
                        //         {
                        //             xtype: 'datefield',
                        //             fieldLabel: '',
                        //             emptyText: 'From',
                        //             name: 'paymentfromdate',
                        //             allowBlank: false,
                        //             format: 'd-m-Y',
                        //             submitFormat: 'Y-m-d'
                        //         },
                        //         {
                        //             xtype: 'label',
                        //             forId: 'lbl1',
                        //             text: 'To',
                        //             margin: '2 10 0 10'
                        //         },
                        //         {
                        //             xtype: 'datefield',
                        //             fieldLabel: '',
                        //             emptyText: 'Until',
                        //             name: 'paymentuntildate',
                        //             allowBlank: false,
                        //             format: 'd-m-Y',
                        //             submitFormat: 'Y-m-d'
                        //         }
                        //     ]
                        // },
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
                                       store:['DEFAULT','DEFAULT (WITH KASBON NO)','EXCEL'],
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
                            fieldLabel: 'Debit / Kredit',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'All',
                                    xtype: 'radiofield',
                                    name: 'dk',
                                    inputValue: 'ALL',
                                    id: 'radio1',
                                    checked:true
                                },
                                {
                                    boxLabel: 'Debit',
                                    xtype: 'radiofield',
                                    name: 'dk',
                                    inputValue: 'D',
                                    id: 'radio2',
                                    margin: '0 0 0 90'
                                },
                                {
                                    boxLabel: 'Kredit',
                                    xtype: 'radiofield',
                                    name: 'dk',
                                    inputValue: 'K',
                                    id: 'radio3',
                                    margin: '0 0 0 110'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sort By',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Voucher No',
                                    xtype: 'radiofield',
                                    name: 'sort_by',
                                    inputValue: '1',
                                    id: 'sortby_1',
                                    checked:true
                                },
                                {
                                    boxLabel: 'Transaction Date',
                                    xtype: 'radiofield',
                                    name: 'sort_by',
                                    inputValue: '2',
                                    id: 'sortby_2',
                                    margin: '0 0 0 40'
                                },
                                {
                                    boxLabel: 'Amount',
                                    xtype: 'radiofield',
                                    name: 'sort_by',
                                    inputValue: '3',
                                    id: 'sortby_3',
                                    margin: '0 0 0 50'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Show SPK/SOP',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: 'Yes',
                                    xtype: 'radiofield',
                                    name: 'showspksop',
                                    inputValue: '1',
                                    id: 'showspksop_1',
                                },
                                {
                                    boxLabel: 'No',
                                    xtype: 'radiofield',
                                    name: 'showspksop',
                                    inputValue: '0',
                                    id: 'showspksop_2',
                                    margin: '0 0 0 40',
                                    checked:true
                                },
                            ]
                        },
                       
                       
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 200px',
                    bodyStyle: 'background:transparent;',
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
                            margin: '0 0 0 5',
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
