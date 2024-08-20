Ext.define('Cashier.view.agingcashadvancereport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.agingcashadvancereportformdata',
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
                                        forceSelection: true,
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
                                        forceSelection: true,
                                        listeners: {
                                            keyup: function (field) {
                                                var searchString = field.getRawValue().toString().toLowerCase();
                                                if(searchString == null){
                                                    return false;
                                                }
                                                if (searchString) {
                                                    this.store.filterBy(function (record, id) {
                                                        if (record.get('ptname') == null || record.get('code') == null || record.get('projectname') == null) {
                                                            return false;
                                                        }else{
                                                            if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                                                return true;
                                                                this.store.clearFilter(true);
                                                            } else if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
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
                                    xtype: 'splitter',
                                    width: '5'
                                },
                                 {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'dept_all',
                                    boxLabel: 'All',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: false
                                },
                                
                            ]
                        }, 
                        {
                            xtype: 'combobox',
                            name: 'reference_date',
                            fieldLabel: 'Reference Date',
                            queryMode: 'local',
                            valueField: 'status',
                            forceSelection: true,
                            displayField: 'description',
                            value: 1,
                            store: new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data: [
                                    {status: 1, description: 'Claim Date'},
                                    {status: 2, description: 'Project Claim Date'},
                                ]
                            }),
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
                                }
                              
                            ]
                        },
                        {
                            xtype: 'combobox',
                            name: 'amount_type',
                            fieldLabel: 'Amount',
                            queryMode: 'local',
                            valueField: 'status',
                            forceSelection: true,
                            displayField: 'description',
                            value: 1,
                            store: new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data: [
                                    {status: 1, description: 'Request Amount'},
                                    {status: 2, description: 'Remaining Amount'},
                                ]
                            }),
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            fieldLabel: 'COA Prefix',
                            items: [
                                {
                                    xtype: 'voucherprefixcashcombobox',
                                    fieldLabel: '',
                                    itemId: 'fd_prefixcash'+me.uniquename,
                                    id: 'prefixcash'+me.uniquename,
                                    name: 'prefixcash',
                                    emptyText: 'ALL',
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    rowdata: null,
                                    valueField: "coa_id",
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">{coa}</tpl>'
                                    )
                                },
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    name: 'prefix_all',
                                    boxLabel: 'All',
                                    margin: '0 0 0 5',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
                                },
                            ]
                        },
                        {
                            xtype: 'combobox',
                            name: 'typereport',
                            fieldLabel: 'Type Report',
                            queryMode: 'local',
                            valueField: 'status',
                            forceSelection: true,
                            displayField: 'description',
                            value: 0,
                            store: new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data: [
                                    {status: 0, description: 'DEFAULT'},
                                    {status: 1, description: 'FORMAT-1'},
                                    {status: 2, description: 'FORMAT-2'},
                                ]
                            }),
                        }, 
                    ]
                },                
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 200px',
                    margin: '5 0 0 0',
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
