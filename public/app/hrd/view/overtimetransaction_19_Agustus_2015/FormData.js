Ext.define('Hrd.view.overtimetransaction.FormData', {
    alias: 'widget.overtimetransactionformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;

        var statusStore = Ext.create('Ext.data.Store', {
            fields: ['status_id', 'status_name'],
            data: [{
                    status_id:1,
                    status_name:'Before time in'
            },{
                    status_id:2,
                    status_name:'After time out'
            },{
                    status_id:3,
                    status_name:'Both'
            },{
                    status_id:4,
                    status_name:'Holiday / OFF'
            },{
                    status_id:5,
                    status_name:'Short Holiday'
            }]
        });



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                  xtype:'hiddenfield',
                  name:'overtimeheader_id'
                },
                {
                  xtype:'hiddenfield',
                  name:'employee_employee_id'
                },
                {
                    xtype:'hiddenfield',
                    name:'before_overtime_id'
                },
                {
                  xtype:'hiddenfield',
                  name:'after_overtime_id' 
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'container',
                        layout: 'hbox',
                        width: '100%',
                        defaults: {
                            xtype: 'textfield',
                            margin: '0 5 5 0'

                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'NIK / Name',
                                    name: 'employee_employee_nik',
                                    readOnly: true,
                                    flex: 2
                                },
                                {
                                    fieldLabel: '',
                                    name: 'employee_employee_name',
                                    readOnly: true,
                                    flex: 3
                                },
                                {
                                    xtype: 'button',
                                    border: 1,
                                    text: 'BROWSE..',
                                    action: 'lookup_employee',
                                    width: 100
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Department',
                                    name: 'employee_department_code',
                                    readOnly: true,
                                    flex: 2
                                },
                                {
                                    fieldLabel: '',
                                    name: 'employee_department_department',
                                    readOnly: true,
                                    flex: 3
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Date / Day',
                                    xtype: 'datefield',
                                    name:'date',
                                    value: new Date(),
                                    flex: 3
                                },
                                {
                                    fieldLabel: '',
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    fieldLabel: 'Shift Code',
                                    name: 'shifttype_code',
                                    labelWidth: 70,
                                    readOnly: true,
                                    flex: 2
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Work Hour',
                                    readOnly: true,
                                    flex: 6
                                },
                                {
                                    fieldLabel: 'To',
                                    labelWidth: 30,
                                    readOnly: true,
                                    flex: 4
                                },
                                {
                                    fieldLabel: '==>',
                                    labelWidth: 70,
                                    readOnly: true,
                                    flex: 5
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Overtime Reason',
                            name:'reason'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Overtime Status',
                            name:'status',
                            displayField: 'status_name',
                            valueField: 'status_id',
                            
                            store: statusStore
                        }
                    ]
                },
                
                {
                    xtype: 'fieldset',
                    title: 'Overtime Plan',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'fieldset',
                        layout: 'hbox',
                        margin: '0 5 0 0',
                        flex: 1,
                        defaults: {
                            xtype: 'textfield',
                        }
                    },
                    items: [
                        {
                            title: 'Before Time In',
                            items: [
                                {
                                    flex: 4,
                                    name: 'plan_before_start',
                                    enableKeyEvents: true,
                                    margin: '0 5 0 0',
                                },
                                {
                                    fieldLabel: 'To',
                                    name: 'plan_before_end',
                                    enableKeyEvents: true,
                                    labelWidth: 20,
                                    flex: 5
                                }
                            ]
                        },
                        {
                            title: 'After Time Out',
                            items: [
                                {
                                    flex: 4,
                                    name: 'plan_after_start',
                                    enableKeyEvents: true,
                                    value: '00:00:00',
                                    margin: '0 5 0 0',
                                },
                                {
                                    fieldLabel: 'To',
                                    name: 'plan_after_end',
                                    enableKeyEvents: true,
                                    labelWidth: 20,
                                    flex: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Overtime Implementation',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'fieldset',
                        width: '100%'
                    },
                    items: [
                        {
                            title: 'Before Time In',
                            flex: 2,
                            layout: 'vbox',
                            height: '100%',
                            defaults: {
                                xtype: 'fieldset',
                                width: '100%',
                                defaults: {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 5 0',
                                    width: '100%',
                                    defaults: {
                                        xtype: 'textfield',
                                        width: '100%',
                                        readOnly: true
                                    }
                                },
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'hbox',
                                    defaults:{
                                        xtype:'textfield'
                                    },
                                    items: [
                                        {
                                            flex: 4,
                                            name: 'exec_time_in_start',
                                            enableKeyEvents: true,
                                            value: '00:00:00',
                                            margin: '0 5 10 0',
                                        },
                                        {
                                            fieldLabel: 'To',
                                            name: 'exec_time_in_end',
                                            enableKeyEvents: true,
                                            labelWidth: 20,
                                            margin:'0 0 10 0',
                                            flex: 5
                                        }
                                    ]
                                },
                                {
                                    title: 'Total Hours',
                                    items: [
                                        {
                                            items: [
                                                {
                                                    width: 50,
                                                    name:'before_duration_text',
                                                    margin: '0 5 0 0',
                                                    readOnly: true
                                                },
                                                {
                                                    fieldLabel: '==>',
                                                    name:'before_net_hours',
                                                    flex: 3,
                                                    labelWidth: 60,
                                                    readOnly: true

                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 50,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: 'Breaktime',
                                                    flex: 3,
                                                    name:'before_break_duration',
                                                    labelWidth: 60,
                                                    readOnly: true
                                                }
                                            ]

                                        },
                                        {
                                            border: '1 0 0 0',
                                            style: {
                                                borderColor: 'black',
                                                borderStyle: 'solid',
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 2,
                                                    margin: '5 5 0 0'
                                                },
                                                {
                                                    margin: '5 0 0 0',
                                                    fieldLabel: '',
                                                    flex: 1,
                                                    name:'before_total_hours',
                                                    labelWidth: 60,
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: 'Factor',
                                    items: [
                                        {
                                            items: [
                                                {
                                                    flex: 1,
                                                    fieldLabel: '1',
                                                    name:'before_factor_factor1',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: 'X',
                                                    flex: 1,
                                                    name:'before_factor_value1',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    name:'before_factor_result1',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    flex: 1,
                                                    fieldLabel: '2',
                                                    name:'before_factor_factor2',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: 'X',
                                                    flex: 1,
                                                    name:'before_factor_value2',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    name:'before_factor_result2',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: 'After Time Out',
                            flex: 2,
                            layout: 'vbox',
                            defaults: {
                                xtype: 'fieldset',
                                width: '100%',
                                defaults: {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 5 0',
                                    width: '100%',
                                    defaults: {
                                        xtype: 'textfield',
                                        width: '100%',
                                    }
                                },
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'hbox',
                                    defaults:{
                                        xtype:'textfield'
                                    },
                                    items: [
                                        {
                                            flex: 4,
                                            name: 'exec_time_out_start',
                                            enableKeyEvents: true,
                                            value: '00:00:00',
                                            margin: '0 5 10 0',
                                        },
                                        {
                                            fieldLabel: 'To',
                                            name: 'exec_time_out_end',
                                            enableKeyEvents: true,
                                            labelWidth: 20,
                                            margin:'0 0 10 0',
                                            flex: 5
                                        }
                                    ]
                                },
                                {
                                    title: 'Total Hours',
                                    items: [
                                        {
                                            items: [
                                                {
                                                    width: 50,
                                                    margin: '0 5 0 0',
                                                    name:'after_duration_text',
                                                    readOnly: true
                                                },
                                                {
                                                    fieldLabel: '==>',
                                                    name:'after_net_hours',
                                                    flex: 3,
                                                    readOnly: true,
                                                    labelWidth: 60,
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 50,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: 'Breaktime',
                                                    flex: 3,
                                                    readOnly: true,
                                                    name:'after_break_duration',
                                                    labelWidth: 60,
                                                }
                                            ]

                                        },
                                        {
                                            border: '1 0 0 0',
                                            style: {
                                                borderColor: 'black',
                                                borderStyle: 'solid',
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 2,
                                                    margin: '5 5 0 0'
                                                },
                                                {
                                                    margin: '5 0 0 0',
                                                    fieldLabel: '',
                                                    name:'after_total_hours',
                                                    flex: 1,
                                                    readOnly: true,
                                                    labelWidth: 60,
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: 'Factor',
                                    items: [
                                        {
                                            items: [
                                                {
                                                    flex: 1,
                                                    fieldLabel: '1',
                                                    labelWidth: 10,
                                                    name:'after_factor_factor1',
                                                    readOnly: true,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: 'X',
                                                    flex: 1,
                                                    name:'after_factor_value1',
                                                    readOnly: true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    name:'after_factor_result1',
                                                    readOnly: true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    flex: 1,
                                                    fieldLabel: '2',
                                                    name:'after_factor_factor2',
                                                    labelWidth: 10,
                                                    readOnly: true,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: 'X',
                                                    flex: 1,
                                                    name:'after_factor_value2',
                                                    readOnly: true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    readOnly: true,
                                                    name:'after_factor_result2',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    flex: 1,
                                                    fieldLabel: '3',
                                                    labelWidth: 10,
                                                    name:'after_factor_factor3',
                                                    readOnly: true,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: 'X',
                                                    flex: 1,
                                                    name:'after_factor_value3',
                                                    readOnly: true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    name:'after_factor_result3',
                                                    readOnly: true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: '---',
                            flex: 1,
                            layout: 'vbox',
                            width: '100%',
                            defaults: {
                                xtype: 'textfield',
                                labelAlign: 'top',
                                width: '100%',
                                readOnly: true,
                                margin: '0 0 25 0'
                            },
                            items: [
                                {
                                    xtype:'button',
                                    text:'PROCESS',
                                    action:'process'
                                },
                                {
                                    fieldLabel: 'Overtime Basic',
                                    name:'basic_value'
                                },
                                {
                                    fieldLabel: 'Work Hour',
                                    name:'work_hour'
                                },
                                {
                                    fieldLabel: 'Overtime Value',
                                    name:'value'
                                },
                                {
                                    fieldLabel: 'Extra Meal',
                                    name:'extra_meail'
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});