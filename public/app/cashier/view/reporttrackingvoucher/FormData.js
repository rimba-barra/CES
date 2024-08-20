Ext.define('Cashier.view.reporttrackingvoucher.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reporttrackingvoucherformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'reporttrackingvoucherID',
    initComponent: function() {
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
                        fieldLabel: '',
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
                        fieldLabel: '',
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
                    fieldLabel: 'Department',
                    layout: 'hbox',
                    items : [
                    {
                        xtype: 'departmentcombobox',
                        id: 'department_id',
                        name: 'department_id',
                        fieldLabel: '',
                        emptyText: 'ALL',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                    }
                    ],
                }, 
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Voucher Maker',
                    layout: 'hbox',
                    items : [
                    {
                        xtype: 'vouchermakercombobox',
                        id: 'addby',
                        name: 'addby',
                        fieldLabel: '',
                        emptyText: 'ALL',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                    }
                    ],
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
                            {'datetypeid': '1', 'datetypename': 'Voucher Date'},
                            {'datetypeid': '2', 'datetypename': 'Send Date'},
                            {'datetypeid': '3', 'datetypename': 'Receive Date'},
                            ]
                        }),
                        autoSelect:true,
                        forceSelection:true,
                        allowBlank: false
                    },
                    {
                        xtype: 'label',
                        text: 'From',
                        margin: '2 10 2 10'
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
                        // margin: '0 0 0 10',
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
                    fieldLabel: 'Condition',
                    layout: 'hbox',
                    items : [
                    {
                        xtype:'combobox',
                        id: 'condition',
                        name:'condition',
                        fieldLabel:'',
                        store: {
                            fields : ['val', 'name'],
                            data : [
                            { 'val': '0', 'name' : 'ALL' },
                            { 'val': '1', 'name' : 'Revise but not approve again' },
                            ]
                        },
                        dvalue: '',
                        emptyText: 'ALL',
                        queryMode:'local',
                        displayField: 'name',
                        valueField: 'val',
                    },
                    {
                        xtype: 'label',
                        margin: '2 5 2 10'
                    },
                    {
                        xtype: 'checkboxfield',
                        itemId: 'is_tkb',
                        name: 'is_tkb',
                        boxLabel: 'TKB',
                        inputValue: '1',
                        uncheckedValue: '0',
                        width: 100
                    }
                ],
            },  ]
        }, 
        {
            xtype: 'panel',
            layout: 'hbox',
            border: false,
            padding: '0 0 0 250px',
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
                handler: function() {
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