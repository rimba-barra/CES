Ext.define('Hrd.view.employeeparameter.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.employeeparameterpanel',
    itemId: 'EmployeeparameterPanel',
    gridPanelName: 'employeeparametergrid',
    formSearchPanelName: 'employeeparameterformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'background:none;border:0;',
                    id: 'formEmployeeparameterID',
                    layout: 'hbox',
                    margin: '5px 0 0 5px',
                    defaults: {
                        xtype: 'container',
                        layout: 'vbox',
                        width: 260,
                        margin: '0 5px 0 0'
                    },
                    items: [
                        {
                            defaults: {
                                xtype: 'fieldset',
                                width: '100%'

                            },
                            items: [
                                {
                                    title: 'NIK Parameters',
                                    defaults: {
                                        margin: '0 0 5px 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: '',
                                            // Arrange radio buttons into two columns, distributed vertically
                                            itemId: 'statusEmployee',
                                            labelWidth: 1,
                                            width: '100%',
                                            layout: 'hbox',
                                            defaults: {
                                                margin: '0 7 0 0'
                                            },
                                            flex: 3,
                                            items: [
                                                {boxLabel: 'Permanent/Temporary', name: 'status', inputValue: "P", checked: true},
                                                {boxLabel: 'Daily', name: 'status', inputValue: "D"},
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            name:'nik_number',
                                            fieldLabel: 'Employee Number'
                                        }
                                    ]
                                },
                                {
                                    title: 'Attendance Parameters',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'attendance_hours',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Working Hour Total',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: ' / day',
                                                    width: 30,
                                                    margin: '5px 0 0 5px'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Attendance Bonus',
                                            defaults: {
                                                xtype: 'textfield'
                                            },
                                            items: [
                                                {
                                                    name:'bonus_zero',
                                                    fieldLabel: 'Full'
                                                },
                                                {
                                                    name:'bonus_1',
                                                    fieldLabel: 'Absent 1 Day'
                                                },
                                                {
                                                    name:'bonus_2',
                                                    fieldLabel: 'Absent 2 Days'
                                                },
                                                {
                                                    name:'bonus_3',
                                                    fieldLabel: 'Absent 3 Days'
                                                },
                                                {
                                                    name:'bonus_4',
                                                    fieldLabel: 'Absent > 3 days '
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Overtime Parameters',
                            defaults: {
                                xtype: 'fieldset',
                                width: '100%',
                                layout: 'vbox',
                                defaults: {
                                    xtype: 'container',
                                    width: '100%',
                                    margin: '0 0 5px 0'
                                }
                            },
                            items: [
                                {
                                    title: 'Normal Leave',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'nleave_quota',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Leave Quota',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: ' days',
                                                    width: 35,
                                                    margin: '5px 0 0 5px'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'nleave_limit',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Leave Limit',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: ' month',
                                                    width: 35,
                                                    margin: '5px 0 0 5px'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'nleave_available',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Available',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: ' year',
                                                    width: 35,
                                                    margin: '5px 0 0 5px'
                                                }
                                            ]
                                        }

                                    ]
                                },
                                {
                                    title: 'Big Leave',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'bleave_quota',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Leave Quota',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: ' days',
                                                    width: 35,
                                                    margin: '5px 0 0 5px'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'bleave_limit',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Leave Limit',
                                                    flex: 1

                                                },
                                                {
                                                    
                                                    xtype: 'label',
                                                    text: ' month',
                                                    width: 35,
                                                    margin: '5px 0 0 5px'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'bleave_available_1',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Available Leave 1',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: ' year',
                                                    width: 35,
                                                    margin: '5px 0 0 5px'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    name:'bleave_available_2',
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Available Leave 2',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    text: ' year',
                                                    width: 35,
                                                    margin: '5px 0 0 5px'
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                }


            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarEmployeeparameterID',
                    height: 28,
                    defaults: [
                        {
                            xtype: 'button',
                            margin: '0 5 0 0'
                        }
                    ],
                    items: [
                        {
                            action: 'create',
                            iconCls: 'icon-new',
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            text: 'Edit'
                        },
                        {
                            action: 'save',
                            text: 'Save',
                            iconCls: 'icon-save',
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});