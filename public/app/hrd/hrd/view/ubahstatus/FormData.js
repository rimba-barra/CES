Ext.define('Hrd.view.ubahstatus.FormData', {
    alias: 'widget.ubahstatusformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.ubahstatus.GridStatusInfo'],
    frame: false,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();




        Ext.applyIf(me, {
            defaults: {},
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ubahstatus_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {// container Form kanan
                            flex: 3,
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'form',
                                    itemId:'formOldStatusID',
                                    bodyStyle: 'background:none;border:0;',
                                    items: [
                                        
                                        {// form atas 
                                            xtype: 'fieldset',
                                            title: 'Employee Status',
                                            margin: 0,
                                            width: 500,
                                            defaults: {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                width: '100%',
                                                defaults: {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    width: '100%'
                                                }
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Hire Date',
                                                            format: 'd-m-Y',
                                                            submitFormat: 'Y-m-d',
                                                            name: 'hire_date',
                                                            readOnly: true,
                                                            width: 200,
                                                            margin: '0 0 10px 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            flex: 1,
                                                            items: [
                                                                {
                                                                    xtype: 'radio',
                                                                    boxLabel: 'Permanent',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    readOnly: true,
                                                                    inputValue: 1,
                                                                    margin: '10 0'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 3,
                                                            xtype: 'fieldset',
                                                            defaults: {
                                                                xtype: 'datefield',
                                                                flex: 1,
                                                                format: 'd-m-Y',
                                                                readOnly: true,
                                                                submitFormat: 'Y-m-d',
                                                                margin: '0 10 0 0'
                                                            },
                                                            items: [
                                                                {
                                                                    fieldLabel: 'Assignation Date',
                                                                    name: 'statusinformation_assignation_date'

                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            flex: 1,
                                                            layout: 'vbox',
                                                            defaults: {
                                                                xtype: 'radio',
                                                                margin: '5 10 0 0',
                                                                readOnly: true,
                                                            },
                                                            items: [
                                                                {
                                                                    boxLabel: 'Contract',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    checked: true,
                                                                    inputValue: 2,
                                                                },
                                                                {
                                                                    boxLabel: 'Candidate',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 3,
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 3,
                                                            xtype: 'fieldset',
                                                            defaults: {
                                                                xtype: 'datefield',
                                                                format: 'd-m-Y',
                                                                submitFormat: 'Y-m-d',
                                                                margin: '0 10 0 0',
                                                                readOnly: true,
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    fieldLabel: '#',
                                                                    width: 40,
                                                                    labelWidth: 10,
                                                                    name: 'statusinformation_contract_ke'
                                                                },
                                                                {
                                                                    flex: 1,
                                                                    fieldLabel: 'Period',
                                                                    labelWidth: 30,
                                                                    name: 'statusinformation_contract_start'
                                                                },
                                                                {
                                                                    flex: 1,
                                                                    fieldLabel: 'to',
                                                                    labelWidth: 30,
                                                                    name: 'statusinformation_contract_end'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            flex: 1,
                                                            layout: 'vbox',
                                                            defaults: {
                                                                xtype: 'radio',
                                                                margin: '5 10 0 0',
                                                                readOnly: true,
                                                            },
                                                            items: [
                                                                {
                                                                    boxLabel: 'Daily Permanent',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 4,
                                                                },
                                                                {
                                                                    boxLabel: 'Daily Contract',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 5,
                                                                },
                                                                {
                                                                    boxLabel: 'Temporary',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 6,
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 3,
                                                            xtype: 'fieldset',
                                                            padding: '25px 10px',
                                                            defaults: {
                                                                xtype: 'datefield',
                                                                flex: 1,
                                                                margin: '0 10 0 0',
                                                                format: 'd-m-Y',
                                                                readOnly: true,
                                                                submitFormat: 'Y-m-d'
                                                            },
                                                            items: [
                                                                {
                                                                    fieldLabel: 'Hire Date',
                                                                    flex: 1,
                                                                    labelWidth: 50,
                                                                    name: 'statusinformation_temporary_start'

                                                                },
                                                                {
                                                                    flex: 1,
                                                                    fieldLabel: 'to',
                                                                    labelWidth: 30,
                                                                    name: 'statusinformation_temporary_end'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]

                                        }
                                    ]
                                },
                                {
                                    xtype: 'form',
                                    itemId:'formNewStatusID',
                                    bodyStyle: 'background:none;border:0;',
                                    items: [
                                        {
                                          xtype:'hiddenfield',
                                          name:'employee_employee_id'
                                        },
                                        {
                                          xtype:'hiddenfield',
                                          name:'statuschange_id'
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Employee Status Change',
                                            margin: 0,
                                            width: 500,
                                            defaults: {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                width: '100%',
                                                defaults: {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    width: '100%'
                                                }
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            flex: 1,
                                                            items: [
                                                                {
                                                                    xtype: 'radio',
                                                                    boxLabel: 'Permanent',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 1,
                                                                    margin: '10 0',
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 3,
                                                            xtype: 'fieldset',
                                                            defaults: {
                                                                xtype: 'datefield',
                                                                flex: 1,
                                                                format: 'd-m-Y',
                                                                submitFormat: 'Y-m-d',
                                                                readOnly: true,
                                                                margin: '0 10 0 0'
                                                            },
                                                            items: [
                                                                {
                                                                    fieldLabel: 'Assignation Date',
                                                                    name: 'statusinformation_assignation_date'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            flex: 1,
                                                            layout: 'vbox',
                                                            defaults: {
                                                                xtype: 'radio',
                                                                margin: '5 10 0 0'
                                                            },
                                                            items: [
                                                                {
                                                                    boxLabel: 'Contract',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    checked: true,
                                                                    inputValue: 2,
                                                                },
                                                                {
                                                                    boxLabel: 'Candidate',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 3,
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 3,
                                                            xtype: 'fieldset',
                                                            defaults: {
                                                                xtype: 'datefield',
                                                                format: 'd-m-Y',
                                                                readOnly: true,
                                                                submitFormat: 'Y-m-d',
                                                                margin: '0 10 0 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    fieldLabel: 'Ke',
                                                                    width: 40,
                                                                    labelWidth: 10,
                                                                    name: 'statusinformation_contract_ke'
                                                                },
                                                                {
                                                                    flex: 1,
                                                                    fieldLabel: 'Period',
                                                                    labelWidth: 30,
                                                                    name: 'statusinformation_contract_start'
                                                                },
                                                                {
                                                                    flex: 1,
                                                                    fieldLabel: 'to',
                                                                    labelWidth: 30,
                                                                    name: 'statusinformation_contract_end'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            flex: 1,
                                                            layout: 'vbox',
                                                            defaults: {
                                                                xtype: 'radio',
                                                                margin: '5 10 0 0'
                                                            },
                                                            items: [
                                                                {
                                                                    boxLabel: 'Daily Permanent',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 4,
                                                                },
                                                                {
                                                                    boxLabel: 'Daily Contract',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 5,
                                                                },
                                                                {
                                                                    boxLabel: 'Temporary',
                                                                    name: 'employeestatus_employeestatus_id',
                                                                    inputValue: 6,
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 3,
                                                            xtype: 'fieldset',
                                                            padding: '25px 10px',
                                                            defaults: {
                                                                xtype: 'datefield',
                                                                flex: 1,
                                                                margin: '0 10 0 0',
                                                                readOnly: true,
                                                                format: 'd-m-Y',
                                                                submitFormat: 'Y-m-d'
                                                            },
                                                            items: [
                                                                {
                                                                    fieldLabel: 'Hire Date',
                                                                    flex: 1,
                                                                    labelWidth: 50,
                                                                    name: 'statusinformation_temporary_start'

                                                                },
                                                                {
                                                                    flex: 1,
                                                                    fieldLabel: 'to',
                                                                    labelWidth: 30,
                                                                    name: 'statusinformation_temporary_end'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]

                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Approval',
                                            layout: 'hbox',
                                            defaults:{
                                                margin:'0 0 0 10px'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    name:'approved',
                                                    
                                                    inputValue:'1',
                                                    boxLabel: 'Yes'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    readOnly: true,
                                                    name:'sk_number',
                                                    labelWidth:50,
                                                    fieldLabel: 'No. SK'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    flex: 1,
                                                    name:'effective_date',
                                                    readOnly: true,
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d',
                                                    fieldLabel: 'Effective Date'
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            flex: 2,
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'ubahstatusinfogrid',
                                    height: 300
                                }
                            ]
                        }
                    ]
                },
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});