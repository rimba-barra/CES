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
                    status_name:'Sebelum Jam Masuk'
            },{
                    status_id:2,
                    status_name:'Sesudah Jam Pulang'
            },{
                    status_id:3,
                    status_name:'Keduanya'
            },{
                    status_id:4,
                    status_name:'Hari Libur / OFF'
            },{
                    status_id:5,
                    status_name:'Hari Libur Pendek'
            }]
        });



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                  xtype:'hiddenfield',
                  name:'overtime_id'
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
                                    fieldLabel: 'NIK / Nama',
                                    name: 'employee_employee_nik',
                                    readOnly: true,
                                    keepRO:true,
                                    flex: 2
                                },
                                {
                                    fieldLabel: '',
                                    name: 'employee_employee_name',
                                    readOnly: true,
                                    keepRO:true,
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
                                    fieldLabel: 'Departemen',
                                    name: 'department_code',
                                    keepRO:true,
                                    readOnly: true,
                                    flex: 2
                                },
                                {
                                    fieldLabel: '',
                                    name: 'department_department',
                                    readOnly: true,
                                    keepRO:true,
                                    flex: 3
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Tanggal / Hari',
                                    xtype: 'datefield',
                                    name:'date',
                                    value: new Date(),
                                    format:'d-m-Y',
                                    submitFormat:'Y-m-d',
                                    flex: 3
                                },
                                {
                                    fieldLabel: '',
                                    name:'day_name',
                                    readOnly: true,
                                    keepRO:true,
                                    flex: 1
                                },
                                {
                                    fieldLabel: 'Kode Shift',
                                    name: 'shifttype_code',
                                    labelWidth: 70,
                                    readOnly: true,
                                    keepRO:true,
                                    flex: 2
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Jam Kerja',
                                    readOnly: true,
                                    name:"in_time",
                                    keepRO:true,
                                    flex: 6
                                },
                                {
                                    fieldLabel: 'To',
                                    labelWidth: 30,
                                    name:"out_time",
                                    readOnly: true,
                                    keepRO:true,
                                    flex: 4
                                },
                                {
                                    fieldLabel: '==>',
                                    name:"work_hour_text",
                                    labelWidth: 70,
                                    keepRO:true,
                                    readOnly: true,
                                    flex: 5
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Alasan Lembur',
                            name:'reason'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status Lembur',
                            name:'status',
                            displayField: 'status_name',
                            valueField: 'status_id',
                            
                            store: statusStore
                        }
                    ]
                },
                
                {
                    xtype: 'fieldset',
                    title: 'Rencana Lembur',
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
                            title: 'Sebelum Jam Masuk',
                            items: [
                                {
                                    flex: 4,
                                    name: 'plan_before_start',
                                    enableKeyEvents: true,
                                    keepRO:true,
                                    margin: '0 5 0 0',
                                },
                                {
                                    fieldLabel: ' s/d ',
                                    name: 'plan_before_end',
                                    enableKeyEvents: true,
                                    keepRO:true,
                                    labelWidth: 20,
                                    flex: 5
                                }
                            ]
                        },
                        {
                            title: 'Setelah Jam Pulang',
                            items: [
                                {
                                    flex: 4,
                                    name: 'plan_after_start',
                                    enableKeyEvents: true,
                                    keepRO:true,
                                    value: '00:00:00',
                                    margin: '0 5 0 0',
                                },
                                {
                                    fieldLabel: ' s/d ',
                                    name: 'plan_after_end',
                                    keepRO:true,
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
                    title: 'Pelaksanaan Lembur',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'fieldset',
                        width: '100%'
                    },
                    items: [
                        {
                            title: 'Sebelum Jam Masuk',
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
                                        keepRO:true,
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
                                            format:'H:i:s',
                                            value: '00:00:00',
                                            margin: '0 5 10 0',
                                        },
                                        {
                                            fieldLabel: 'To',
                                            name: 'exec_time_in_end',
                                            enableKeyEvents: true,
                                            format:'H:i:s',
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
                                                    width: 80,
                                                    name:'before_duration_text',
                                                    margin: '0 5 0 0',
                                                    readOnly: true,
                                                    keepRO:true,
                                                },
                                                {
                                                    fieldLabel: '==>',
                                                    name:'before_net_hours',
                                                    flex: 3,
                                                    keepRO:true,
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
                                                    keepRO:true,
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
                                                    keepRO:true,
                                                    readOnly: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: 'Faktor',
                                    items: [
                                        {
                                            items: [
                                                {
                                                    fieldLabel: '1',
                                                    flex: 1,
                                                    name:'before_factor_value1',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    flex: 1,
                                                    fieldLabel: 'X',
                                                    name:'before_factor_factor1',
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
                                                    fieldLabel: '2',
                                                    flex: 1,
                                                    name:'before_factor_value2',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    flex: 1,
                                                    fieldLabel: 'X',
                                                    name:'before_factor_factor2',
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
                            title: 'Setelah Jam Pulang',
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
                                                    width: 80,
                                                    margin: '0 5 0 0',
                                                    name:'after_duration_text',
                                                    readOnly: true,
                                                    keepRO:true
                                                },
                                                {
                                                    fieldLabel: '==>',
                                                    name:'after_net_hours',
                                                    flex: 3,
                                                    readOnly: true,
                                                    labelWidth: 60,
                                                    keepRO:true
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
                                                    
                                                    keepRO:true,
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
                                                    
                                                    keepRO:true,
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
                                                    fieldLabel: '1',
                                                    flex: 1,
                                                    name:'after_factor_value1',
                                                    readOnly: true,
                                                    keepRO:true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    flex: 1,
                                                    fieldLabel: 'X',
                                                    labelWidth: 10,
                                                    name:'after_factor_factor1',
                                                    readOnly: true,
                                                    keepRO:true,
                                                    margin: '0 5 0 0'
                                                },
                                                
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    name:'after_factor_result1',
                                                    readOnly: true,
                                                    keepRO:true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    fieldLabel: '2',
                                                    flex: 1,
                                                    name:'after_factor_value2',
                                                    readOnly: true,
                                                    keepRO:true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    flex: 1,
                                                    fieldLabel: 'X',
                                                    name:'after_factor_factor2',
                                                    labelWidth: 10,
                                                    readOnly: true,
                                                    keepRO:true,
                                                    margin: '0 5 0 0'
                                                },
                                                
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    readOnly: true,
                                                    keepRO:true,
                                                    name:'after_factor_result2',
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    fieldLabel: '3',
                                                    flex: 1,
                                                    name:'after_factor_value3',
                                                    readOnly: true,
                                                    keepRO:true,
                                                    labelWidth: 10,
                                                    margin: '0 5 0 0'
                                                },
                                                {
                                                    flex: 1,
                                                    fieldLabel: 'X',
                                                    labelWidth: 10,
                                                    name:'after_factor_factor3',
                                                    readOnly: true,
                                                    keepRO:true,
                                                    margin: '0 5 0 0'
                                                },
                                                
                                                {
                                                    fieldLabel: '=',
                                                    flex: 1,
                                                    name:'after_factor_result3',
                                                    readOnly: true,
                                                    keepRO:true,
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
                                keepRO:true,
                                margin: '0 0 25 0'
                            },
                            items: [
                                {
                                    xtype:'button',
                                    text:'PROCESS',
                                    action:'process'
                                },
                                {
                                    fieldLabel: 'Dasar Lembur',
                                    name:'basic_value',
                                    
                                },
                                {
                                    fieldLabel: 'Jam Kerja',
                                    name:'jam_kerja'
                                },
                                {
                                    fieldLabel: 'Nilai Lembur',
                                    name:'nilai_lembur'
                                },
                                {
                                    fieldLabel: 'Makan Extra',
                                    name:'makan_extra'
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});