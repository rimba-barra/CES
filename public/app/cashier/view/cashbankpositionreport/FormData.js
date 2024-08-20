Ext.define('Cashier.view.cashbankpositionreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashbankpositionreportformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename:'_fcashbankpositionreport',
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
                    id: 'hideparam',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            boxLabel: 'Report By Grup Konsol Project',
                            name: 'bykonsol',
                            inputValue: 1,
                            margin: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    id: 'fieldprojectid',
                    items: [
                        {
                            xtype: 'projectcombobox',
                            fieldLabel: 'Project',
                            name: 'project_id',
                            allowBlank: false,
                            width: 400,
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="500px" >',
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
                                            if (record.get('projectname') == null ) {
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
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    id: 'fieldptid',
                    items: [
                        {
                            xtype: 'ptcombobox',
                            fieldLabel: 'PT',
                            name: 'pt_id',
                            allowBlank: false,
                            width: 400,
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="500px" >',
                                    '<tr class="x-grid-row">',
                                        '<th width="30px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                        '<th width="200px"><div class="x-column-header x-column-header-inner">Pt</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                                        '</tr>',
                                    '</tpl>',
                                '</table>'
                            ),
                            enableKeyEvents: true,
                            forceSelection: true,
                            rowdata: null,
                            listeners: {
                                keyup: function (field) {
                                    var searchString = field.getRawValue().toString().toLowerCase();
                                    if(searchString == null){
                                        return false;
                                    }
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('ptname') == null || record.get('ptcode')) {
                                                return false;
                                            }else{
                                                if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
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
                    layout: 'hbox',
                    width: '100%',
                    id: 'fieldconsolidationid',
                    items: [
                        {
                            xtype: 'consolidationcombobox',
                            fieldLabel: 'Group Konsol',
                            name: 'consolidation_id',
                            allowBlank: true,
                            width: 400
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    fieldLabel: 'Realization Date',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'realization_date_from',
                            width: 100,
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From'
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '0 10 0 10'
                        },
                        {
                            xtype: 'datefield',
                            name: 'realization_date_until',
                            width: 100,
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    fieldLabel: 'COA',
                    items: [
                        {
                            xtype: 'coacombobox',
                            fieldLabel: '',
                            name: 'coa_from',
                            width: 100,
                            allowBlank: false,
                            emptyText: 'From',
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="500px" >',
                                    '<tr class="x-grid-row">',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                        '<th width="400px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                        '</tr>',
                                    '</tpl>',
                                '</table>'
                            ),  
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '0 10 0 10'
                        },
                        {
                            xtype: 'coacombobox',
                            fieldLabel: '',
                            name: 'coa_until',
                            width: 100,
                            allowBlank: false,
                            emptyText: 'Until',
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="500px" >',
                                    '<tr class="x-grid-row">',
                                        '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                        '<th width="400px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                        '</tr>',
                                    '</tpl>',
                                '</table>'
                            ), 
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    layout: 'anchor',
                    autoHeight: true,
                    border: true,
                    title: 'Opition',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Cash/Bank',
                                    name: 'type_report',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['param', 'label'],
                                        data: [
                                            {'param': 'K', 'label': 'Cash'},
                                            {'param': 'B', 'label': 'Bank'}
                                        ]
                                    }),
                                    displayField: 'label',
                                    valueField: 'param',
                                    width: '200',
                                    emptyText: 'All'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'All',
                                    name: 'type_report_all',
                                    inputValue: 1,
                                    margin: '0 0 0 5',
                                    checked: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '100%',
                            margin: '0 0 20 0',
                            items: [
                                {
                                    xtype: 'prefixcombobox',
                                    fieldLabel: 'Prefix',
                                    name: 'prefix_id',
                                    allowBlank: true,
                                    width: '200',
                                    emptyText: 'All',
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                                '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                                '<th width="400px"><div class="x-column-header x-column-header-inner">Description</div></th>',
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
                                    boxLabel: 'All',
                                    name: 'prefix_all',
                                    inputValue: 1,
                                    margin: '0 0 0 5',
                                    checked: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    width: '70%',
                                    fieldLabel: 'Data',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Header Only',
                                            name: 'data_option',
                                            inputValue: 2,
                                            checked: true,
                                            width: '150'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Detail Only',
                                            name: 'data_option',
                                            inputValue: 3,
                                            margin: '0 0 0 10',
                                            width: '150'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Header & Detail',
                                            name: 'data_option',
                                            inputValue: 1,
                                            margin: '0 0 0 10',
                                            width: '150'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    width: '30%',
                                    fieldLabel: 'Payment Type',
                                    margin: '0 0 0 40',
                                    items: [
                                        {
                                            xtype: 'paymentmethodcombobox',
                                            fieldLabel: '',
                                            name: 'paymentmethod_id',
                                            width: 150,
                                            emptyText: 'All'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'All',
                                            name: 'paymenttype_all',
                                            inputValue: 1,
                                            margin: '0 0 0 5',
                                            checked: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    width: '70%',
                                    fieldLabel: 'D/C',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'All',
                                            name: 'trans_type',
                                            inputValue: 'All',
                                            checked: true,
                                            width: '150'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Debet',
                                            name: 'trans_type',
                                            inputValue: 'D',
                                            margin: '0 0 0 10',
                                            width: '150'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Credit',
                                            name: 'trans_type',
                                            inputValue: 'C',
                                            margin: '0 0 0 10',
                                            width: '150'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    width: '30%',
                                    fieldLabel: 'Department',
                                    margin: '0 0 0 40',
                                    items: [
                                        {
                                            xtype: 'departmentcombobox',
                                            fieldLabel: '',
                                            name: 'department_id',
                                            width: 150,
                                            emptyText: 'All',
                                            enforceMaxLength: true,
                                            matchFieldWidth: false
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'All',
                                            name: 'department_all',
                                            inputValue: 1,
                                            margin: '0 0 0 5',
                                            checked: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    width: '70%',
                                    fieldLabel: 'Liquid',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'All',
                                            name: 'is_liquid',
                                            inputValue: 2,
                                            checked: true,
                                            width: '150'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Liquid',
                                            name: 'is_liquid',
                                            inputValue: 1,
                                            margin: '0 0 0 10',
                                            width: '150'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Non Liquid',
                                            name: 'is_liquid',
                                            inputValue: 0,
                                            margin: '0 0 0 10',
                                            width: '150'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    width: '30%',
                                    fieldLabel: 'Bank Type',
                                    margin: '0 0 0 40',
                                    items: [
                                        {
                                            xtype: 'banktypecombobox',
                                            fieldLabel: '',
                                            name: 'banktype_id',
                                            width: 150,
                                            emptyText: 'All'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'All',
                                            name: 'banktype_all',
                                            inputValue: 1,
                                            margin: '0 0 0 5',
                                            checked: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '100%',
                            fieldLabel: 'Sort By',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Voucher No',
                                    name: 'sort',
                                    inputValue: 1,
                                    checked: true,
                                    width: '150'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Transaction Date',
                                    name: 'sort',
                                    inputValue: 2,
                                    margin: '0 0 0 10',
                                    width: '150'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Amount',
                                    name: 'sort',
                                    inputValue: 2,
                                    margin: '0 0 0 10',
                                    width: '150'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            width: '100%',
                            fieldLabel: 'Data Source',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Journal',
                                    name: 'datasource',
                                    inputValue: 1,
                                    checked: true,
                                    width: '150'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Kas Bank',
                                    name: 'datasource',
                                    inputValue: 2,
                                    margin: '0 0 0 10',
                                    width: '150'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Format',
                    name: 'format',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['param', 'label'],
                        data: [
                            {'param': 'EXCEL', 'label': 'EXCEL'},
                            {'param': 'EXCEL - SUMMARY ONLY', 'label': 'EXCEL - SUMMARY ONLY'},
                            {'param': 'EMAIL TO DIRECTOR', 'label': 'EMAIL TO DIRECTOR'}
                        ]
                    }),
                    enforceMaxLength: true,
                    matchFieldWidth: true,
                    displayField: 'label',
                    valueField: 'param',
                    width: '300',
                    value: 'EXCEL - SUMMARY ONLY'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    name: 'notes',
                    width: 500,
                    hidden: true
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: '100%',
                    margin: '10 0 0 0',
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
                            margin: '0 0 0 5',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                },
                 
            ],
        });
        me.callParent(arguments);
    },
});
