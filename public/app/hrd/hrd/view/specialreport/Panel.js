Ext.define('Hrd.view.specialreport.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.specialreportpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'SpecialReportPanel',
    layout: 'fit',
    autoScroll: true,
    height: '200px',
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        var reportType = [{
                number: 1,
                name: 'Department'
            }, {
                number: 2,
                name: 'Category (Golongan)'
            }, {
                number: 3,
                name: 'Position'
            }, {
                number: 4,
                name: 'Position Group'
            }, {
                number: 5,
                name: 'Religion'
            }, {
                number: 6,
                name: 'Blood Group'
            }, {
                number: 7,
                name: 'Education'
            }, {
                number: 8,
                name: 'Gender'
            }, {
                number: 9,
                name: 'Marital Status'
            }, {
                number: 10,
                name: 'Age'
            }, {
                number: 11,
                name: 'Birth Date'
            }, {
                number: 12,
                name: 'Working Time'
            }, {
                number: 13,
                name: 'Hire Date'
            }, {
                number: 14,
                name: 'Resign Date'
            }, {
                number: 15,
                name: 'Pass Away Employee'
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
            fields: ['gender_id', 'gender'],
            data: based
        });
        
        var gender = [{
                gender_id: 'M',
                gender: 'MALE'
            }, {
                gender_id:'F',
                gender: 'FEMALE'
            }];

        var genderStore = Ext.create('Ext.data.Store', {
            fields: ['gender_id', 'gender'],
            data: gender
        });
        
        
        var monthList = [{
                number: 1,
                name: 'January'
            }, {
                number: 2,
                name: 'February'
            }, {
                number: 3,
                name: 'March'
            }, {
                number: 4,
                name: 'April'
            }, {
                number: 5,
                name: 'May'
            }, {
                number: 6,
                name: 'June'
            }, {
                number: 7,
                name: 'July'
            }, {
                number: 8,
                name: 'August'
            }, {
                number: 9,
                name: 'September'
            }, {
                number: 10,
                name: 'October'
            }, {
                number: 11,
                name: 'November'
            }, {
                number: 12,
                name: 'December'
            }];

        var monthListStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: monthList
        });




        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    bodyPadding: 10,
                    itemId: 'specialReportFormID',
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
                                    fieldLabel: 'List By :',
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
                                            name: 'format',
                                            inputValue: 'R'
                                        }, {
                                            boxLabel: 'Detail',
                                            checked: true,
                                            name: 'format',
                                            inputValue: 'D'
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
                                    fieldLabel: 'Religion',
                                    name: 'religion_id',
                                    displayField: cbf.religion.d,
                                    valueField: cbf.religion.v

                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Department',
                                    name: 'department_id',
                                    displayField: cbf.department.d,
                                    valueField: cbf.department.v

                                },
                                
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Category',
                                    name: 'grade_id',
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Highest Education',
                                    name: 'education_id',
                                    displayField: cbf.education.d,
                                    valueField: cbf.education.v

                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Position',
                                    name: 'position_id',
                                    displayField: cbf.position.d,
                                    valueField: cbf.position.v

                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Blood Group',
                                    name: 'bloodgroup_id',
                                    displayField: cbf.bloodGroup.d,
                                    valueField: cbf.bloodGroup.v

                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Gender',
                                    name: 'gender_id',
                                    store: genderStore,
                                    displayField: cbf.gender.d,
                                    valueField: cbf.gender.v
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Month',
                                    name: 'month',
                                    store: monthListStore,
                                    displayField: 'name',
                                    valueField: 'number'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    itemId:'ageID',
                                    fieldLabel: 'Age',
                                    defaultType: 'textfield',
                                  
                                    defaults: {
                                   
                                        maskRe: /[0-9]/,
                                        size:2,
                                        margin: '0 10px 0 0',
                                        
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            name:'age_bot'
                                        },
                                        {
                                            name:'age_top',
                                            fieldLabel: 'To',
                                        }
                                    ]
                                },{
                                    xtype: 'fieldcontainer',
                                    itemId:'expDateID',
                                    fieldLabel: 'Period',
                                    defaultType: 'datefield',
                                  
                                    defaults: {
                                   
                                        format:'d/m/Y',
                                        submitFormat:'Y-m-d',
                                        margin: '0 10px 0 0',
                                        
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            name:'start_date'
                                        },
                                        {
                                            name:'end_date',
                                            fieldLabel: 'To',
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    itemId:'maritalStatusID',
                                    fieldLabel: 'Marital Status',
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 1,
                                        margin: '0 10px 0 0'
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel: 'Single',
                                            name: 'marriagestatus_id',
                                            checked: true,
                                            inputValue: 1
                                        }, {
                                            boxLabel: 'Married',
                                            
                                            name: 'marriagestatus_id',
                                            inputValue:2
                                        },
                                        {
                                            boxLabel: 'Divorced',
                                            
                                            name: 'marriagestatus_id',
                                            inputValue:3
                                        }
                                    ]
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