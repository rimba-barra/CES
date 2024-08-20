Ext.define('Hrd.view.allemployee.FormSearch', {
    extend:'Hrd.library.template.view.FormSearch',  
    alias: 'widget.allemployeeformsearch',
    itemId: 'allemployeeformsearch', 
    initComponent: function(){
            var me = this;

            var genderStore = Ext.create('Ext.data.Store', {
                fields: ['ID', 'name'],
                data: [{
                    "ID": "M",
                    "name": "Male"
                }, {
                    "ID": "F",
                    "name": "Female"
                }]
            });

            var empStatusStore = Ext.create('Ext.data.Store', {
                fields: ['ID', 'name'],
                data: [{
                    "ID": "1",
                    "name": "Permanent"
                }, {
                    "ID": "2",
                    "name": "Contract"
                }, {
                    "ID": "7",
                    "name": "Consultant"
                }]
            });

            var empActiveStore = Ext.create('Ext.data.Store', {
                fields: ['ID', 'name'],
                data: [{
                    "ID": "1",
                    "name": "Active"
                }, {
                    "ID": "0",
                    "name": "Nonactive"
                }]
            });

            var empPensiunStore = Ext.create('Ext.data.Store', {
                fields: ['ID', 'name'],
                data: [{
                    "ID": "0",
                    "name": "Belum Pensiun"
                }, {
                    "ID": "1",
                    "name": "Pensiun"
                }]
            });

            Ext.applyIf(me, {
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Subholding',                    
                    itemId: 'fd_subholding',
                    name: 'subholding_id',
                    displayField: 'name',
                    valueField: 'subholding_id',        
                    multiSelect: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Project',                    
                    itemId: 'fd_project',
                    name: 'project_id',
                    displayField: 'name',
                    valueField: 'code',        
                    multiSelect: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'PT',
                    itemId: 'fd_pt',
                    name: 'pt_id',
                    displayField: 'name',
                    valueField: 'code',
                    multiSelect: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Employee Name',
                    itemId: 'employee_name',
                    name: 'employee_name'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Gender',
                    name: 'sex',
                    queryMode:'local',
                    displayField: 'name',
                    valueField: 'ID',
                    store: genderStore,
                },
                {
                    xtype: 'fieldcontainer',
                    itemId: 'ageID',
                    fieldLabel: 'Age',
                    defaultType: 'textfield',
                    defaults: {
                        xtype: 'textfield'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            maskRe: /[0-9]/,
                            name: 'age_bot',
                            width: 80
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            margin: '0 10'
                        },
                        {
                            maskRe: /[0-9]/,
                            name: 'age_top',
                            width: 80
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Last Education',
                    itemId: 'fd_education_id',
                    name: 'last_education',
                    displayField: 'education',
                    valueField: 'education_id',
                    multiSelect: true,
                },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Department',
                //     name: 'department_id',
                //     displayField: 'description',
                //     valueField: 'department_id',
                // },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Position',
                //     itemId: 'fd_position_id',
                //     name: 'position_id',
                //     displayField: 'description',
                //     valueField: 'position_id',
                // },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Banding',
                    itemId: 'fd_banding_id',
                    name: 'banding_id',
                    displayField: 'banding',
                    valueField: 'banding_id',       
                    multiSelect: true,
                },
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Golongan',
                //     itemId: 'fd_golongan_id',
                //     name: 'group_id',
                //     displayField: 'group',
                //     valueField: 'group_id',
                // },                
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee Status',
                    itemId: 'fd_empstatus_id',
                    name: 'employeestatus_id',
                    queryMode:'local',
                    store: empStatusStore,
                    displayField: 'name',
                    valueField: 'ID',       
                    multiSelect: true,
                    // displayField: 'employeestatus',
                    // valueField: 'employeestatus_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee Pensiun',
                    name: 'is_pensiun',
                    queryMode:'local',
                    displayField: 'name',
                    valueField: 'ID',
                    store: empPensiunStore,
                    //value: '1'                    
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee Active',
                    name: 'employee_active',
                    queryMode:'local',
                    displayField: 'name',
                    valueField: 'ID',
                    store: empActiveStore,
                    value: '1'                    
                },
                // {
                //     xtype: 'datefield',
                //     fieldLabel: 'Hire Date (cutoff)',
                //     name: 'hire_date',
                //     format: 'd-m-Y',
                //     submitFormat: 'Y-m-d',
                //     emptyText: 'dd-mm-yyyy',
                //     width: 120
                // },
                // {
                //     xtype: 'datefield',
                //     fieldLabel: 'Assignation Date (cutoff)',
                //     name: 'assignation_date',
                //     format: 'd-m-Y',
                //     submitFormat: 'Y-m-d',
                //     emptyText: 'dd-mm-yyyy',
                //     width: 120
                // },
                // {
                //     xtype: 'datefield',
                //     fieldLabel: 'Contract End Date (cutoff)',
                //     name: 'contractend_date',
                //     format: 'd-m-Y',
                //     submitFormat: 'Y-m-d',
                //     emptyText: 'dd-mm-yyyy',
                //     width: 120
                // },
                // {
                //     xtype: 'datefield',
                //     fieldLabel: 'Nonactive Date (cutoff)',
                //     name: 'nonactive_date',
                //     format: 'd-m-Y',
                //     submitFormat: 'Y-m-d',
                //     emptyText: 'dd-mm-yyyy',
                //     width: 120
                // },


                {
                    xtype: 'fieldcontainer',
                    itemId: 'hire_date',
                    fieldLabel: 'Hire Date',
                    defaultType: 'datefield',
                    defaults: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        emptyText: 'dd-mm-yyyy',
                    },
                    layout: 'hbox',
                    items: [
                        {
                            name: 'hire_date_start',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            margin: '0 10'
                        },
                        {
                            name: 'hire_date_end',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    itemId: 'assignation_date',
                    fieldLabel: 'Assignation Date',
                    defaultType: 'datefield',
                    defaults: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        emptyText: 'dd-mm-yyyy',
                    },
                    layout: 'hbox',
                    items: [
                        {
                            name: 'assignation_date_start',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            margin: '0 10'
                        },
                        {
                            name: 'assignation_date_end',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    itemId: 'contractend_date',
                    fieldLabel: 'Contract End Date',
                    defaultType: 'datefield',
                    defaults: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        emptyText: 'dd-mm-yyyy',
                    },
                    layout: 'hbox',
                    items: [
                        {
                            name: 'contractend_date_start',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            margin: '0 10'
                        },
                        {
                            name: 'contractend_date_end',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    itemId: 'nonactive_date',
                    fieldLabel: 'Nonactive Date',
                    defaultType: 'datefield',
                    defaults: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        emptyText: 'dd-mm-yyyy',
                    },
                    layout: 'hbox',
                    items: [
                        {
                            name: 'nonactive_date_start',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            margin: '0 10'
                        },
                        {
                            name: 'nonactive_date_end',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    itemId: 'masakerjaID',
                    fieldLabel: 'Masa Kerja (dalam tahun)',
                    defaultType: 'textfield',
                    defaults: {
                        xtype: 'textfield'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            maskRe: /[0-9]/,
                            name: 'masa_kerja_bot',
                            width: 80
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            margin: '0 10'
                        },
                        {
                            maskRe: /[0-9]/,
                            name: 'masa_kerja_top',
                            width: 80
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    itemId: 'usiakerjaID',
                    fieldLabel: 'Usia Kerja (dalam tahun)',
                    defaultType: 'textfield',
                    defaults: {
                        xtype: 'textfield'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            maskRe: /[0-9]/,
                            name: 'usia_kerja_bot',
                            width: 80
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            margin: '0 10'
                        },
                        {
                            maskRe: /[0-9]/,
                            name: 'usia_kerja_top',
                            width: 80
                        }
                    ]
                },
            ]
            });
            me.callParent(arguments);
    }
});