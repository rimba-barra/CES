Ext.define('Hrd.view.absentreport.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.absentreportpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'AbsentReportPanel',
    layout: 'fit',
    autoScroll: true,
    height: '200px',
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        var reportType = [{
                number: 1,
                name: 'Recap Format A'
            }, {
                number: 2,
                name: 'Recap Format B'
            }, {
                number: 3,
                name: 'Recap Format C'
            }, {
                number: 4,
                name: 'Recap Format D'
            }, {
                number: 5,
                name: 'Recap Man Hour Loss'
            }, {
                number: 6,
                name: 'Daily'
            }, {
                number: 7,
                name: 'Daily Weekly'
            }, {
                number: 8,
                name: 'Daily Note Employee'
            }, {
                number: 9,
                name: 'Absent'
            }, {
                number: 10,
                name: 'No Clock In'
            }, {
                number: 11,
                name: 'No Clock Out'
            }, {
                number: 12,
                name: 'Late'
            }, {
                number: 13,
                name: 'Early Out'
            }, {
                number: 14,
                name: 'Attendance Bonus'
            }, {
                number: 15,
                name: 'Man Hour Loss'
            }, {
                number: 16,
                name: 'Activity'
            }, {
                number: 17,
                name: 'Other'
            }];

        var reportTypeStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: reportType
        });
        
        var based = [{
                number: 1,
                name: 'Division'
            }, {
                number: 2,
                name: 'Category ( Golongan )'
            }, {
                number: 3,
                name: 'N.I.K'
            }, {
                number: 4,
                name: 'Group ( Kelompok)'
            }];

        var basedStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: based
        });




        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    bodyPadding: 10,
                    itemId: 'employeeDatasFormID',
                    width: '100%',
                    autoScroll: true,
                    height: '200px',
                    defaults: {
                        xtype: 'combobox',
                        margin: '10px 0'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'project_project_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'project_name'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_pt_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_name'
                        },
                        {
                            xtype: 'container',
                            style: 'border:1px solid #99BCE8;padding:10px;background-color:#D6E3F2;',
                            bodyPadding: '10px',
                            width: '400px',
                            layout: 'vbox',
                            defaults:{
                                 margin:'0 0 10px 0',
                                 flex:1
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Report Type',
                                    name: 'report_type',
                                    store: reportTypeStore,
                                    displayField: 'name',
                                    valueField: 'number'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Format',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 1,
                                        margin: '0 10px 0 0'
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'Rekap',
                                            name: 'size',
                                            inputValue: 'm',
                                            id: 'radio1'
                                        }, {
                                            boxLabel: 'Detail',
                                            checked: true,
                                            name: 'size',
                                            inputValue: 'l',
                                            id: 'radio2'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Based On',
                                    name: 'based',
                                    store: basedStore,
                                    displayField: 'name',
                                    valueField: 'number'
                                },
                                {
                                    xtype:'container',
                                    layout:'hbox',
                                    items: [
                                        {
                                            xtype:'checkboxfield',
                                            boxLabel: 'Get under hour',
                                            name: 'guh_checkbox',
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'',
                                            name:'guh'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '30px'
                        },
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            itemId: 'filterContainerID',
                            defaults:{
                                margin:'0 0 10px 0'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    itemId:'dateContainer',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Period',
                                            name:'date_bot',
                                            submitFormat:'Y-m-d',
                                            format:'d/m/Y'
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 's/d',
                                            labelWidth: 30,
                                            padding: '0 0 0 20px',
                                            format:'d/m/Y',
                                            submitFormat:'Y-m-d',
                                            name:'date_top'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Status',
                                    itemId: 'filterStatusID',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 1,
                                        margin: '0 10px 0 0'
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'Permanent / Contract',
                                            checked: true,
                                            name: 'status',
                                            inputValue: 'P'
                                        }, {
                                            boxLabel: 'Daily',
                                            name: 'status',
                                            inputValue: 'D'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'employee_name',
                                    fieldLabel: 'Employee Name',
                                    width: '300px'
                                },
                                {
                                    xtype: 'button',
                                    itemId:'searchButtonID',
                                    text: 'Search Employee',
                                    action:'search_employee'
                                },
                                
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Category',
                                    name: 'group_id',
                                    displayField: cbf.category.d,
                                    valueField: cbf.category.v

                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Division',
                                    name: 'division_id',
                                    displayField: cbf.division.d,
                                    valueField: cbf.division.v

                                },
                                {
                                    xtype: 'panel',
                                    itemId: 'departmentCheckBoxID',
                                    bodyPadding: '20px',
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Department',
                                            displayField: cbf.department.d,
                                            valueField: cbf.department.v,
                                            defaultType: 'checkboxfield',
                                            items: [
                                                {
                                                    boxLabel: 'Hrd',
                                                    name: 'topping',
                                                    inputValue: '1'
                                                }
                                            ]
                                        }
                                    ],
                                    bbar: [
                                        {
                                            text: 'Select All',
                                            handler: function(el) {
                                                var fc = el.up('panel').down('fieldcontainer');
                                                var items = fc.items.items;

                                                for (var i in items) {

                                                    fc.down('#' + items[i].id).setValue(true);
                                                }

                                            }
                                        },
                                        '-',
                                        {
                                            text: 'Deselect All',
                                            handler: function(el) {
                                                var fc = el.up('panel').down('fieldcontainer');
                                                var items = fc.items.items;

                                                for (var i in items) {

                                                    fc.down('#' + items[i].id).setValue(false);
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    itemId:'employeeListGridID',
                                    columns: [
                                        {text: 'Name', dataIndex: 'employee_name'},
                                        {text: 'Email', dataIndex: 'department_department'}
                                    ]
                                }
                               /* */
                            ]
                        }


                    ],
                    dockedItems: {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout: {
                            padding: 6,
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'button',
                                action: 'view',
                                padding: 5,
                                itemId: 'btnSearch',
                                iconCls: 'icon-save',
                                text: 'View Report'
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});