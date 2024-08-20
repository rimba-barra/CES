Ext.define('Cashier.view.cashflowreportdept.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowreportdeptformdata',
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
                            xtype: 'hiddenfield',
                            name: 'formatreport',
                            value: 'SIMPLE'
                        },    
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_pt_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'project_id',
                        },
                        {
                                xtype: 'combobox',
                                name: 'projectpt_id',
                                fieldLabel: 'Company',
                                displayField: 'name',
                                valueField: 'pt_projectpt_id',
                                id: 'ptcashflowreport',
                                itemId: 'ptcashflowreport',
                                forceSelection: true,
                                allowBlank: false,
                                readOnly: false,
                                enforceMaxLength: true,
                                queryMode: 'local',
                                flex: 2,
                                rowdata: null,
                                matchFieldWidth: false,
                                enableKeyEvents: true,
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
                            // {
                            //     xtype: 'fieldcontainer',
                            //     layout: 'hbox',
                            //     items: [        
                            //         {
                            //             xtype: 'combobox',
                            //             name: 'department_department_id',
                            //             displayField: 'name',
                            //             fieldLabel: 'Dept',
                            //             emptyText: 'Select Department',
                            //             valueField: 'department_id',
                            //             width: '300',
                            //             forceSelection: true,
                            //             allowBlank: false
                            //         },
                            //         {
                            //             xtype: 'checkboxfield',
                            //             fieldLabel: '',
                            //             name: 'alldept',
                            //             boxLabel: 'All Dept',
                            //             padding: '0 0 0 0',
                            //             margin: '0 0 0 0',
                            //             boxLabelCls: 'x-form-cb-label small',
                            //             inputValue: '1',
                            //             uncheckedValue: '0',
                            //             checked: false,
                            //             enableKeyEvents: true
                            //         },
                            //     ]
                            // },
                            {
                                xtype: 'hiddenfield',
                                name: 'alldept',
                                value: '1'
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Year',
                                layout: 'hbox',
                                items: [
                                        {
                                            xtype: 'yearcombobox',
                                            fieldLabel:'',
                                            emptyText: 'Year',
                                            name: 'yeardata',
                                            allowBlank: false,
                                        }
                                ]
                            }, 
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Period',
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
                                            fieldLabel:' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Until',
                                            emptyText: 'Month',
                                            name: 'monthdatauntil',
                                            allowBlank: true,
                                        }
                                ]
                            } ,
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
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: '   ',
                                        margin: '2 10 0 10'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        fieldLabel: '',
                                        name: 'notdetail',
                                        boxLabel: 'No Detail',
                                        padding: '0 0 0 0',
                                        margin: '0 0 0 0',
                                        boxLabelCls: 'x-form-cb-label small',
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        checked: false
                                    },
                                    {
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: '   ',
                                        margin: '2 10 0 10'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        fieldLabel: '',
                                        name: 'iscashflow',
                                        boxLabel: 'Is Cashflow',
                                        padding: '0 0 0 0',
                                        margin: '0 0 0 0',
                                        boxLabelCls: 'x-form-cb-label small',
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        checked: false
                                    }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '10px 0 0 10px',
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
                            width: '10'
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
