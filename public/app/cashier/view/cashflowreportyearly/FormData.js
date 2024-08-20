Ext.define('Cashier.view.cashflowreportyearly.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowreportyearlyformdata',
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
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'combobox',
                        name: 'report_type',
                        fieldLabel: 'Report Type',
                        allowBlank: false,
                        editable: false,
                        valueField: 'report_type',
                        queryMode:'local',
                        dvalue: 'YEARLY',
                        store:['YEARLY', 'PERIOD'],
                        autoSelect:true,
                        forceSelection:true,
                        listeners: {
                            afterrender: function() {
                                this.setValue(this.dvalue);    
                            }
                        },
                        margin: '0 10 0 0'
                    },
                    {
                        xtype: 'combobox',
                        name: 'budget_type',
                        queryMode: 'local',
                        emptyText: 'Budget Type',
                        valueField: 'budget_type',
                        value: 'RAKER',
                        editable:false,
                        forceSelection: true,
                        displayField: 'txt',
                        store: new Ext.data.JsonStore({
                            fields: ['budget_type', 'txt'],
                            data: [
                            {budget_type: 'RAKER', txt: 'RAKER'},
                            {budget_type: 'MIDRAKER', txt: 'MIDRAKER'},
                            {budget_type: 'RAKER BOD', txt: 'RAKER BOD'},
                            {budget_type: 'RAKER PROJECT', txt: 'RAKER PROJECT'},
                            {budget_type: 'MIDRAKER BOD', txt: 'MIDRAKER BOD'},
                            {budget_type: 'MIDRAKER PROJECT', txt: 'MIDRAKER PROJECT'},
                            {budget_type: 'ALL', txt: 'ALL'},

                            ]
                        }),
                        autoSelect:true,
                        forceSelection:true,
                        listeners: {
                            afterrender: function() {
                                this.setValue(this.value);    
                            }
                        },
                    },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'combobox',
                        name: 'pt_pt_id',
                        fieldLabel: 'Company',
                        displayField: 'name',
                        valueField: 'pt_id',
                        id: 'ptcashflowreport',
                        itemId: 'ptcashflowreport',
                        forceSelection: true,
                        allowBlank: false,
                        readOnly: false,
                        enforceMaxLength: true,
                        queryMode: 'local',
                        flex: 3,
                        rowdata: null,
                        matchFieldWidth: false,
                        tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px">',
                            '<tr class="x-grid-row">',
                            '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                        margin: '0 10 0 0',
                        enableKeyEvents : true,
                        listeners: {
                            keyup: function (field) {
                                var searchString = field.getRawValue().toString().toLowerCase();
                                if(searchString == null){
                                    return false;
                                }
                                if (searchString) {
                                    this.store.filterBy(function (record, id) {
                                        if (record.get('name') == null || record.get('code') == null) {
                                            return false;
                                        }else{
                                            if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
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
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: '',
                        name: 'recalculate',
                        boxLabel: 'Re-Calculate',
                        padding: '0 0 0 0',
                        margin: '0 0 0 0',
                        boxLabelCls: 'x-form-cb-label small',
                        inputValue: '1',
                        uncheckedValue: '0',
                        checked: false
                    },
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: '',
                        name: 'iscashflow',
                        boxLabel: 'Cashflow',
                        padding: '0 0 0 0',
                        margin: '0 0 0 20px',
                        boxLabelCls: 'x-form-cb-label small',
                        inputValue: 1,
                        uncheckedValue: 0,
                        checked: false
                    },
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'department_department_id',
                    fieldLabel: 'Dept',
                    displayField: 'name',
                    valueField: 'department_id',
                    width: '300',
                    hidden: true,
                    forceSelection: true,
                    allowBlank: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Period',
                    layout: 'hbox',
                    name: 'field_period',
                    items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: '',
                        name: 'month',
                        editable: false,
                        enableKeyEvents : true,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['param', 'label', 'month'],
                            data: [
                            {'param': 'Jan', 'label': 'January', 'month': 1},
                            {'param': 'Feb', 'label': 'February', 'month': 2},
                            {'param': 'Mar', 'label': 'March', 'month': 3},
                            {'param': 'Apr', 'label': 'April', 'month': 4},
                            {'param': 'May', 'label': 'May', 'month': 5},
                            {'param': 'Jun', 'label': 'June', 'month': 6},
                            {'param': 'Jul', 'label': 'July', 'month': 7},
                            {'param': 'Aug', 'label': 'August', 'month': 8},
                            {'param': 'Sep', 'label': 'September', 'month': 9},
                            {'param': 'Oct', 'label': 'October', 'month': 10},
                            {'param': 'Nov', 'label': 'November', 'month': 11},
                            {'param': 'Dec', 'label': 'December', 'month': 12},
                            ]
                        }),
                        displayField: 'label',
                        valueField: 'param',
                        listeners: {
                            afterrender: function() {
                                var current_date = new Date();
                                var current_month = Ext.Date.format(current_date, 'M');
                                this.setValue(current_month);    
                            }
                        },
                        margin: '0 10 0 0'
                    },
                    {
                        xtype: 'yearcombobox',
                        fieldLabel:'',
                        emptyText: 'Year',
                        name: 'yeardata',
                        allowBlank: false
                    },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Report Format',
                    layout: 'hbox',
                    items: [
                    {
                        xtype:'combobox',
                        name:'formatreport',
                        valueField: 'formatreport',
                        queryMode:'local',
                        width: 250,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['param', 'label'],
                            data: [
                            {'param': 'DEFAULT - NO COA', 'label': 'DEFAULT - NO COA'},
                            {'param': 'DEFAULT - WITH COA', 'label': 'DEFAULT - WITH COA'},
                            {'param': 'DEFAULT - WITH COA WITH GROUP', 'label': 'DEFAULT - WITH COA WITH GROUP'},
                            {'param': 'BY-DEPARTMENT', 'label': 'BY-DEPARTMENT'},
                            {'param': 'BY-CASHFLOW', 'label': 'BY-CASHFLOW'},
                            ]
                        }),
                        displayField: 'label',
                        valueField: 'param',
                        default: 'DEFAULT - NO COA',
                        autoSelect:true,
                        enforceMaxLength: true,
                        editable: false,
                        forceSelection:true,
                        listeners: {
                            afterrender: function() {
                                this.setValue('DEFAULT - NO COA');    
                            }
                        }
                    },

                    ]
                }, 
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Bulan',
                    hidden: true,
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'monthcombobox',
                        fieldLabel:'',
                        emptyText: 'Month',
                        name: 'monthdata',
                        allowBlank: true,
                    },
                    {
                        xtype: 'monthcombobox',
                        fieldLabel:'',
                        emptyText: 'Month',
                        name: 'monthdatauntil',
                        allowBlank: false,
                    }
                    ]
                }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                border: false,
                padding: '0 0 0 10px',
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
