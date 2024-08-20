Ext.define('Cashier.view.vouchertransactionreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.vouchertransactionreportformdata',
    // layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'vouchertransactionreportID',
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
                            fieldLabel: 'Project',
                            layout: 'hbox',
                            items: [                               
                                {
                                    xtype: 'projectcombobox',
                                    fieldLabel:'',
                                    emptyText: 'Select Project',
                                    name: 'project_id',
                                    allowBlank: false,
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
                                    enableKeyEvents : true,
                                    queryMode: 'local',
                                    forceSelection: true,
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
                            fieldLabel: 'Company',
                            layout: 'hbox',
                            items: [ 
                                {
                                    xtype: 'ptprojectcombobox',
                                    fieldLabel:'',
                                    emptyText: 'Select PT',
                                    name: 'pt_id',
                                    allowBlank: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
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
                            fieldLabel: 'Report Type',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'reporttype',
                                       valueField: 'reporttype',
                                       queryMode:'local',
                                       dvalue:'FORMAT 1',
                                       store:['FORMAT 1','FORMAT 2', 'VOUCHER TITIPAN', 'VOUCHER TITIPAN UNPORCESSED', 'REPORT KWITANSI'],
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
                            fieldLabel: 'Date',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype:'combobox',
                                    name:'datetype',
                                    id:'datetype',
                                    valueField: 'datetypeid',
                                    displayField: 'datetypename',
                                    emptyText: 'Date type',
                                    queryMode:'local',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['datetypeid', 'datetypename'],
                                        data: [
                                            {'datetypeid': '1', 'datetypename': 'Realization Date'},
                                            {'datetypeid': '2', 'datetypename': 'Submit Date'},
                                            {'datetypeid': '3', 'datetypename': 'Due Date'},
                                        ]
                                    }),
                                    autoSelect:true,
                                    forceSelection:true,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'From Date',
                                    name: 'from_date',
                                    id: 'form_date',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    margin: '0 0 0 10',
                                    listeners: {
                                        change: function(dp, date) {
                                            var untildate = Ext.getCmp('until_date');
                                            untildate.setMinValue(date);
                                            untildate.setValue('');
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: 'To',
                                    margin: '2 10 2 10'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    emptyText: 'Until Date',
                                    name: 'until_date',
                                    id: 'until_date',
                                    allowBlank: false,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    margin: '0 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Voucher Type',
                            id:'vtrVoucherType',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype:'combobox',
                                    name:'vouchertype',
                                    valueField: 'vouchertypeid',
                                    displayField: 'vouchertypename',
                                    queryMode:'local',
                                    dvalue: '',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['vouchertypeid', 'vouchertypename'],
                                        data: [
                                            {'vouchertypeid': '', 'vouchertypename': 'ALL'},
                                            {'vouchertypeid': 'I', 'vouchertypename': 'IN'},
                                            {'vouchertypeid': 'O', 'vouchertypename': 'OUT'},
                                        ]
                                    }),
                                    autoSelect:true,
                                    forceSelection:true,
                                    listeners: {
                                        afterrender: function() {
                                           this.setValue(this.dvalue);    
                                        }
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Voucher Status',
                            id:'vtrVoucherStatus',
                            padding: '0 0 0 20px',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype:'combobox',
                                    name:'voucherstatus',
                                    valueField: 'voucherstatus',
                                    queryMode:'local',
                                    dvalue: 'ALL',
                                    store:['ALL','DRAFT','PAID','REALIZED','POSTED'],
                                    autoSelect:true,
                                    forceSelection:true,
                                    listeners: {
                                        afterrender: function() {
                                           this.setValue(this.dvalue);    
                                        }
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Vendor From',
                            id:'vtrVendorForm',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'vendorcombobox',
                                    fieldLabel: '',
                                    emptyText: 'Type Vendor Name...',
                                    name: 'fromvendor_id',
                                    allowBlank: false,
                                    enableKeyEvents : true
                                    
                                },
                                
                                {
                                    xtype: 'label',
                                    forId: 'lbl1',
                                    text: 'To',
                                    margin: '2 10 0 10'
                                },
                                {
                                    xtype: 'vendorcomboboxV2',
                                    fieldLabel: '',
                                    emptyText: 'Type Vendor Name...',
                                    name: 'untilvendor_id',
                                    allowBlank: false,
                                    enableKeyEvents : true
                                },
                            ]
                        },
                         {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'COA',
                            layout: 'hbox',
                            id:'vtrCOA',
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
                            fieldLabel: 'No. SPK',
                            layout: 'hbox',
                            id:'vtrNoSPK',
                            items: [ 
                                {
                                    xtype: 'textfield',
                                    fieldLabel:'',
                                    emptyText: 'Manual Input',
                                    name: 'no_spk',
                                    allowBlank: true,
                                },
                            ]
                        },            
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '20px 0 0 250px',
                    bodyStyle: 'background: transparent',
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
                            margin: '0 0 0 10',
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
