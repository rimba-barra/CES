Ext.define('Cashier.view.dailytransactionkp.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dailytransactionkpformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    id: 'dailytransactionkpID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: ''
            },
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
                    xtype: 'projectcombobox',
                    fieldLabel:'Project',
                    emptyText: 'Select Project',
                    name: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    margin: '0 0 5 0',
                    width: 400,
                    enforeMaxLength: true,
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
                                        }
                                    }

                                });
                            }
                        },
                        buffer:300
                    }
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    forceSelection: true,
                    width: 400,
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
                {
                    xtype: 'combobox',
                    fieldLabel: 'Data Flow',
                    name: 'dataflow',
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['dataflow', 'label'],
                        data: [
                            {'dataflow': '', 'label': 'ALL'},
                            {'dataflow': 'I', 'label': 'IN'},
                            {'dataflow': 'O', 'label': 'OUT'},
                        ]
                    }),
                    displayField: 'label',
                    valueField: 'dataflow',
                    value: ''
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Department',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'departmentcombobox',
                            fieldLabel: '',
                            emptyText: 'ALL DEPT',
                            name: 'dept_id',
                            margin: '0 0 5 0',
                            enableKeyEvents : true
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Date',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: '',
                            name: 'dateparam',
                            enableKeyEvents: true,
                            store: Ext.create('Ext.data.Store', {
                                fields: ['param', 'label'],
                                data: [
                                    {'param': '1', 'label': 'Submit Date'},
                                    {'param': '2', 'label': 'Due Date'},
                                    {'param': '3', 'label': 'Receipt Date'},
                                    {'param': '4', 'label': 'Voucher Date'},
                                ]
                            }),
                            displayField: 'label',
                            valueField: 'param',
                            value: '1'
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: '',
                            margin: '0 10 0 10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            emptyText: 'From Date',
                            name: 'periodfrom',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl2',
                            text: 'To',
                            margin: '0 10 0 10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            emptyText: 'Until Date',
                            name: 'periodto',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Status',
                    name: 'status',
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['status', 'label'],
                        data: [
                            {'status': '', 'label': 'ALL'},
                            {'status': '1', 'label': 'DRAFT'},
                            {'status': '2', 'label': 'PAID'},
                            {'status': '3', 'label': 'REALIZED'},
                            {'status': '4', 'label': 'POSTED'}
                        ]
                    }),
                    displayField: 'label',
                    valueField: 'status',
                    value: ''
                },
                {
                    xtype: 'paymentmethodcombobox',
                    name: 'paymentmethod_id',
                    fieldLabel: 'Payment Method',
                    margin: '0 0 5 0',
                    allowBlank: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Sort By',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'radiofield',
                            name: 'sortby',
                            boxLabel: 'Date',
                            inputValue: 1,
                            checked: true
                        },
                        {
                            xtype: 'radiofield',
                            name: 'sortby',
                            boxLabel: 'Voucher ID',
                            inputValue: 2,
                            margin: '0 0 0 37'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Print Data',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        // {
                        //     xtype: 'radiogroup',
                        //     fieldLabel: 'Two Columns',
                        //     columns: 2,
                        //     vertical: true,
                        //     items: [
                        //         { boxLabel: 'All Data', name: 'printdata', inputValue: '1', checked: true },
                        //         { boxLabel: 'Selected Data', name: 'printdata', inputValue: '2' }
                        //     ]
                        // },
                        {
                            xtype: 'radiofield',
                            name: 'printdata',
                            boxLabel: 'All Data',
                            inputValue: 1,
                            checked: true
                        },
                        {
                            xtype: 'radiofield',
                            name: 'printdata',
                            boxLabel: 'Selected Data',
                            inputValue: 2,
                            margin: '0 0 0 20'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 290px',
                    bodyStyle: 'background-color:transparent;',
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
                }
            ],
        });
        me.callParent(arguments);
    },
});
