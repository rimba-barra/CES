Ext.define('Hrd.view.registertrainingbytype.FormData', {
    alias: 'widget.registertrainingbytypeformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.registertrainingbytype.GridEmployee', 'Hrd.view.registertrainingbytype.GridDetailDate'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();


        var gradeStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: [{
                    number: 1, name: '1. Poor'
                }, {
                    number: 2, name: '2. Enought'
                }, {
                    number: 3, name: '3. Good'
                }, {
                    number: 4, name: '4. Very Good'
                }, {
                    number: 5, name: '5. None'
                }]
        });


        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'training_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'scheduletraining_scheduletraining_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Training Information',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                xtype: 'textfield',
                                readOnly: true,
                                size: 30,
                                margin: '0 10px 10px 0',
                            },
                            items: [
                                {
                                    name: 'programtraining_code', fieldLabel: 'Training Code',
                                    keepRO: true,
                                    width: 300,
                                    flex: null
                                }, {
                                    xtype: 'button',
                                    text: 'Browse',
                                    action: 'browse',
                                    disabled: true,
                                    flex: null,
                                    width: 100
                                }, {
                                    name: 'programtraining_theme',
                                    keepRO: true,
                                    fieldLabel: '',
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                readOnly: true,
                                size: 30,
                                margin: '0 10px 10px 0',
                            },
                            items: [
                                {
                                    name: 'scheduletraining_start_date', fieldLabel: 'Period',
                                    keepRO: true,
                                }, {
                                    name: 'scheduletraining_end_date',
                                    fieldLabel: 'to',
                                    keepRO: true,
                                }, {
                                    name: 'effective_date',
                                    submitFormat: 'Y-m-d',
                                    fieldLabel: 'Effective Date',
                                }
                            ]
                        },
                        {
                            name: 'programtraining_theme2',
                            readOnly: true,
                            xtype: 'textfield',
                            keepRO: true,
                            fieldLabel: 'Theme',
                            width: 500
                        },
                        {
                            xtype: 'textfield',
                            name: 'programtraining_cost',
                            readOnly: true,
                            keepRO: true,
                            fieldLabel: 'Cost'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Employee Information',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container'
                       
                    },
                    items: [
                        {
                            width:400,
                            items: [
                                {
                                    xtype: 'registertrainingbytypeemgrid',
                                    height: 300,
                                    flex: 1
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Training Information',
                                    width: 400,
                                    margin: '10px',
                                    items: [
                                        {
                                            xtype: 'registertrainingbytypeddgrid',
                                            height: 200
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            flex:1,
                            margin:'0 0 0 10px',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        readOnly: true,
                                        size: 30,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            name: 'employee_employee_nik', 
                                            fieldLabel: ' N.I.K',
                                            keepRO: true,
                                            width: 300,
                                            flex: null
                                        }, {
                                            name: 'employee_employee_name',
                                            keepRO: true,
                                            fieldLabel:'Name'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        readOnly: true,
                                        size: 30,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            name: 'department_code', fieldLabel: 'Department',
                                            keepRO: true,
                                        }, {
                                            name: 'group_code',
                                            keepRO: true,
                                            fieldLabel: 'Category (Golongan)',
                                        },
                                    ]
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Certificate',
                                    name: 'certificate',
                                    inputValue: '1',
                                    uncheckedValue:'0'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    fieldLabel: 'Status',
                                    width: 400,
                                    bodyStyle: 'background:none;border:0;',
                                    defaults: {
                                        xtype: 'radiofield',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            boxLabel: 'Completed',
                                            name: 'training_status',
                                            checked: true,
                                            inputValue: '1'
                                        }, {
                                            boxLabel: 'Remedial',
                                            name: 'training_status',
                                            inputValue: '2'
                                        }, {
                                            boxLabel: 'Unstatus',
                                            name: 'training_status',
                                            inputValue: '3'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        readOnly: true,
                                        size: 30,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            name: 'point', fieldLabel: 'Point',
                                        }, {
                                            name: 'duration',
                                            fieldLabel: 'Duration',
                                        }, {
                                            xtype: 'label',
                                            text: 'hh:mm / day'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        flex: 1,
                                        readOnly: true,
                                        margin: '0 10px 10px 0',
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            store: gradeStore,
                                            displayField: 'name',
                                            valueField: 'number',
                                            name: 'grade', fieldLabel: 'Training evaluate',
                                        }, {
                                            xtype: 'checkbox',
                                            name: 'is_updateattendance',
                                            boxLabel: 'Update attendance',
                                            inputValue: '1'
                                        },
                                    ]
                                }
                            ]
                        }
                        



                    ]
                }
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});