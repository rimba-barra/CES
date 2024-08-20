Ext.define('Hrd.view.personal.FormData', {
    alias: 'widget.personalformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.Religion', 'Hrd.template.combobox.Education',
        'Hrd.template.combobox.MarriageStatus', 'Hrd.template.combobox.BloodGroup',
        'Hrd.template.combobox.Department', 'Hrd.template.combobox.Division',
        'Hrd.template.combobox.Position', 'Hrd.template.combobox.Group', 'Hrd.template.combobox.Groupposition',
        'Hrd.view.personal.GridChild',
        'Hrd.view.personal.GridSaudara',
        'Hrd.view.personal.GridEducation',
        'Hrd.view.personal.GridCourse',
        'Hrd.view.personal.GridOrganization',
        'Hrd.view.personal.GridCompany',
        'Hrd.view.personal.GridEmergencyContact',
        'Hrd.view.personal.GridTandaKasih',
	'Hrd.view.personal.GridEmployeemultiposition',
	'Hrd.view.personal.GridEmployeeTransfer',

	],
    frame: false,
    autoScroll: true,
    height: 600,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var tpl = new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item" >{division} {division_id}</div></tpl>');

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'reportto_reportto'
                },
                {
                    xtype: 'tabpanel',
                    activeTab: 0, // index or id
                    items: [
                        /* PERSONAL */
                        {
                            title: 'Personal',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [{
                                            xtype: 'container',
                                            flex: 3,
                                            margin: '10 10',
                                            defaults: {
                                            },
                                            items: [
                                                
                                                {
                                                    xtype: 'container', layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0"
                                                    },
                                                    items: [
                                                        {xtype: 'textfield', fieldLabel: 'NIK - Name <span style="color:red;font-weight:bold">*</span>', flex: 4, readOnly: false, name: 'employee_nik'},
                                                        {xtype: 'textfield', flex: 5, name: 'employee_name'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'container', layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0"
                                                    },
                                                    items: [
                                                        {xtype: 'dfdatefield', fieldLabel: 'Birth Date/Place <span style="color:red;font-weight:bold">*</span>', flex: 6, name: "birth_date"},
                                                        {xtype: 'textfield', flex: 5, name: "birth_place"}
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield', fieldLabel: 'KTP Number <span style="color:red;font-weight:bold">*</span>', width: 400, name: "ktp_number"
                                                },
                                                {
                                                    xtype: 'container', layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0",
                                                        flex: 1,
                                                        width: '100%'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container', layout: 'vbox',
                                                            flex: 3,
                                                            defaults: {
                                                                margin: "0 10 15 0",
                                                                width: '100%'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'cbreligion', fieldLabel: 'Religion <span style="color:red;font-weight:bold">*</span>', name: 'religion_religion_id'
                                                                },
                                                                {
                                                                    xtype: 'cbbloodgroup', name: 'bloodgroup_bloodgroup_id', fieldLabel: 'Blood Group'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 2,
                                                            xtype: 'fieldset',
                                                            title: 'Gender <span style="color:red;font-weight:bold">*</span>',
                                                            defaultType: 'radio', // each item will be a radio button
                                                            layout: 'hbox',
                                                            defaults: {
                                                                flex: 1
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    fieldLabel: '',
                                                                    // Arrange radio buttons into two columns, distributed vertically
                                                                    itemId: 'sexID',
                                                                    labelWidth: 1,
                                                                    width: '100%',
                                                                    layout: 'hbox',
                                                                    defaults: {
                                                                        margin: '0 7 0 0'
                                                                    },
                                                                    flex: 3,
                                                                    items: [
                                                                        {boxLabel: 'Male', name: 'sex', inputValue: "M", checked: true},
                                                                        {boxLabel: 'Female', name: 'sex', inputValue: "F"},
                                                                    ]
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                }

                                                ,
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Marriage Status',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        flex: 1
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            fieldLabel: '',
                                                            // Arrange radio buttons into two columns, distributed vertically
                                                            itemId: 'marriageStatusID',
                                                            labelWidth: 1,
                                                            width: '100%',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                margin: '0 20 0 0'
                                                            },
                                                            flex: 3,
                                                            items: [
                                                                {boxLabel: 'Single', name: 'marriagestatus_marriagestatus_id', inputValue: 1, checked: true},
                                                                {boxLabel: 'Married', name: 'marriagestatus_marriagestatus_id', inputValue: 2},
                                                                {boxLabel: 'Janda / Duda', name: 'marriagestatus_marriagestatus_id', inputValue: 3}
                                                            ]
                                                        }
                                                        , {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Child',
                                                            readOnly: true,
                                                            name: 'child_count',
                                                            flex: 1,
                                                            labelWidth: 30
                                                        }]
                                                },
                                                {
                                                    xtype: 'tabpanel',
                                                    activeTab: 0, // index or id
                                                    margin: '0 0 10 0',
                                                    items: [{
                                                            title: 'Address <span style="color:red;font-weight:bold">*</span>',
                                                            items: [
                                                                {
                                                                    xtype: 'textareafield',
                                                                    name: 'address',
                                                                    width: '100%'
                                                                }
                                                            ]
                                                        }, {
                                                            title: 'Address in KTP',
                                                            items: [
                                                                {
                                                                    xtype: 'textareafield',
                                                                    name: 'ktp_address',
                                                                    width: '100%'
                                                                }
                                                            ]
                                                        }]
                                                }

                                            ]

                                        }, {
                                            xtype: 'container',
                                            margin: 10,
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'nik_group',
                                                    readOnly: true,
                                                    fieldLabel: 'NIK Group',
                                                    // added by Michael 2021.08.27
                                                    // margin: '35 0 0 0'
                                                    // end added by Michael 2021.08.27
                                                },
                                                /*
                                                 {
                                                 xtype: 'filefield',
                                                 fieldLabel: 'Photo',
                                                 itemId: 'file_foto',
                                                 name: 'foto_browse',
                                                 },
                                                 */
                                                {
                                                    xtype: 'button',
                                                    text: 'UPLOAD PHOTO',
                                                    action: 'upload_foto'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    margin: '30 30',
                                                    width: 200,
                                                    height: 250,
                                                    bodyStyle: 'background:none',
                                                    itemId: 'photo_image',
                                                    html: ''
                                                }

                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '10',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 10 0',
                                            defaults: {
                                                flex: 1,
                                                labelWidth: 70,
                                                margin: '0 10px 0 0'
                                            },
                                            items: [
                                                {xtype: 'cbeducation', name: 'education_education_id', labelWidth: 90, fieldLabel: 'Education Last', allowBlank:false},
                                                {xtype: 'textfield', fieldLabel: 'NPWP', name: 'npwp'},
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 10 0',
                                            defaults: {
                                                flex: 1,
                                                labelWidth: 70,
                                                margin: '0 10px 0 0'
                                            },
                                            items: [
                                                {xtype: 'textfield', fieldLabel: 'Phone', name: 'phone_number'},
                                                {xtype: 'textfield', fieldLabel: 'Handphone', name: 'hp_number'}
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 10 0',
                                            defaults: {
                                                flex: 1,
                                                labelWidth: 70,
                                                margin: '0 10px 0 0'
                                            },
                                            items: [
                                                {xtype: 'textfield', fieldLabel: 'Email', name: 'email'},
                                                {xtype: 'textfield', fieldLabel: 'Passport', name: 'passport_number'}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Emergency Contact <span style="color:red;font-weight:bold">*</span>',
                                    items: [
                                        {
                                            xtype: 'personalemegergencycontactgrid',
                                            height: 200
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Rekening',
                                    layout: 'vbox',
                                    margin: '10 10',
                                    items: [
                                        {
                                            flex: 1,
                                            labelWidth: 140,
                                            margin: '0 40px 10px 0',
                                            xtype: 'textfield',
                                            name: 'bank_rekening',
                                            fieldLabel: 'Bank'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                flex: 1,
                                                labelWidth: 140,
                                                margin: '0 40px 0 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'nomor_rekening',
                                                    fieldLabel: 'Nomor Rekening'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    width:400,
                                                    name: 'nama_rekening',
                                                    fieldLabel: 'Nama di Rekening'
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    labelWidth: 70,
                                    fieldLabel: 'Notes', 
                                    xtype: 'textareafield',
                                    name: 'notes',
                                    margin: '10 10',
                                    width:500
                                }

                            ]
                        },
                        {
                            title: 'Status / Position',
                            margin: 10,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    defaults: {
                                        xtype: 'container', layout: 'hbox',
                                        width: '100%',
                                        defaults: {
                                            margin: "0 10 10 0",
                                            xtype: 'textfield'
                                        },
                                    },
                                    items: [                                       
                                        {
                                            items: [
                                                {flex: 4, name: 'banding_banding_id',
                                                    xtype: 'combobox', fieldLabel: 'Banding <span style="color:red;font-weight:bold">*</span>', displayField: 'code',
                                                     queryMode: 'local',
                                                    valueField: 'banding_id',
                                                    listConfig: {
                                                        itemTpl: '{code} - {banding}'
                                                    }
                                                },
                                                {fieldLabel: '', flex: 4, readOnly: true, name: 'banding_banding'},
                                            ]
                                        },
                                        {
                                            items: [
                                                {flex: 4, name: 'group_group_id', xtype: 'combobox',
                                                    queryMode: 'local',
                                                    // fieldLabel: 'Group (Golongan)', 
                                                    fieldLabel: 'Group (Golongan) <span style="font-size:8px">according to access rights</span>',
                                                    displayField: 'code',
                                                    valueField: 'group_id',
                                                    listConfig: {
                                                        itemTpl: '{code} - {group}'
                                                    },
                                                    // readOnly:true, //updated by anas 14032022
                                                    editable:false,
                                                    allowBlank:true,
                                                    hidden:true
                                                },
                                                {flex: 4, 
                                                    fieldLabel: 'Group (Golongan)',
                                                    name: 'group_code', xtype: 'textfield',
                                                    readOnly:true,
                                                    editable:false,
                                                    allowBlank:true
                                                },
                                                {fieldLabel: '', flex: 4, allowBlank:true, readOnly: true, name: 'group_group'},
                                            ]
                                        },
                                        {
                                            items: [
                                                {flex: 4, name: 'division_division_id',
                                                    xtype: 'combobox', fieldLabel: 'Business Unit',
                                                     queryMode: 'local',
                                                    displayField: 'code',
                                                    listConfig: {
                                                        itemTpl: '{code} - {division}'
                                                    },
                                                    valueField: 'division_id'},
                                                {fieldLabel: '', flex: 4, readOnly: true, name: 'division_division'},
                                            ]
                                        },
                                        {
                                            items: [
                                                {flex: 6, name: 'worklocationprojectpt_id',
                                                    xtype: 'combobox', fieldLabel: 'Work Location',
                                                     queryMode: 'local',
                                                    displayField: 'worklocation',
                                                    listConfig: {
                                                        itemTpl: '{worklocation} - {project_name} - {pt_name}'
                                                    },
                                                    valueField: 'worklocationprojectpt_id'},
                                                {fieldLabel: '', flex: 3, readOnly: true, name: 'worklocationprojectpt_worklocationprojectpt_project'},
                                                {fieldLabel: '', flex: 3, readOnly: true, name: 'worklocationprojectpt_worklocationprojectpt_pt'},
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            flex: 1,
                                            items: [
                                                {
                                                    fieldLabel: 'Working Days <span style="color:red;font-weight:bold">*</span>',
                                                    xtype: 'radio',
                                                    boxLabel: '5 Days &nbsp; &nbsp; &nbsp;',
                                                    labelWidth: 100,
                                                    name: 'hari_kerja_perminggu',
                                                    itemId: 'hkpID5',
                                                    inputValue: 5,
                                                },
                                                {
                                                    xtype: 'radio',
                                                    boxLabel: '6 Days',
                                                    name: 'hari_kerja_perminggu',
                                                    itemId: 'hkpID6',
                                                    inputValue: 6,
                                                }
                                            ]
                                        },
					{
                                        title: 'Section',
                                        itemId: 'pSectionTabID',
                                        margin: 10,
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                title: 'Multiposition',
                                                width: '100%',
                                                items: [
                                                    {
                                                        xtype: 'personalemployeemultipositiongrid',
                                                        height: 200
                                                    }
                                                ]

                                            }
                                        	]
                                        },
                                        
                                        {
                                            items: [
                                                {flex: 4, name: 'department_department_id',
                                                    xtype: 'combobox', fieldLabel: 'Department <span style="color:red;font-weight:bold">*</span>', displayField: 'code',
                                                     queryMode: 'local',
                                                    valueField: 'department_id',
                                                    readOnly: true,
                                                    listConfig: {
                                                        itemTpl: '{code} - {department}'
                                                    },
                                                },
                                                {fieldLabel: '', flex: 4, readOnly: true, name: 'department_department'},
                                            ]
                                        },
                                        {
                                            items: [
                                                {flex: 4, name: 'jobfunction_jobfunction_id',
                                                    xtype: 'combobox', fieldLabel: 'Job Function', displayField: 'code',
                                                     queryMode: 'local',
                                                    valueField: 'jobfunction_id',
						      hidden:true,	
                                                    listConfig: {
                                                        itemTpl: '{code} - {jobfunction}'
                                                    }
                                                },
                                                {fieldLabel: '', flex: 4, hidden:true, readOnly: true, name: 'jobfunction_jobfunction'},
                                            ]
                                        },
                                        /* start added by ahmad riadi 21-06-2017 */
                                        {
                                            items: [
                                                {flex: 4, name: 'jobfamily_jobfamily_id',
                                                    xtype: 'combobox', fieldLabel: 'Job Family <span style="color:red;font-weight:bold">*</span>', displayField: 'code',
                                                     queryMode: 'local',
                                                    valueField: 'jobfamily_id',
                                                    readOnly: true,
                                                    listConfig: {
                                                        itemTpl: '{code} - {jobfamily}'
                                                    }
                                                },
                                                {fieldLabel: '', flex: 4, readOnly: true, name: 'jobfamily_jobfamily'},
                                            ]
                                        },
                                        
                                         /* end added by ahmad riadi 21-06-2017 */
                                        
                                        {
                                            items: [
                                                {flex: 4, name: 'groupposition_groupposition_id',
                                                    xtype: 'combobox', fieldLabel: 'Position Category',
                                                     queryMode: 'local',
                                                    displayField: 'code',
						     hidden:true,
                                                    valueField: 'groupposition_id',
                                                    listConfig: {
                                                        itemTpl: '{code} - {groupposition}'
                                                    }
                                                },
                                                {fieldLabel: '', flex: 4, hidden:true, readOnly: true, name: 'groupposition_groupposition'},
                                            ]
                                        },
                                        {
                                            items: [
                                                {flex: 4, name: 'position_position_id', xtype: 'combobox',
                                                     queryMode: 'local',
                                                    fieldLabel: 'Position <span style="color:red;font-weight:bold">*</span>', displayField: 'position',
                                                    valueField: 'position_id',
                                                    readOnly: true,
                                                    listConfig: {
                                                        itemTpl: '{position} - {description}'
                                                    }
                                                },
                                                {fieldLabel: '', flex: 4, readOnly: true, name: 'position_description'},
                                            ]
                                        },
                                        {
                                            items: [
                                                {flex: 4, name: 'alokasibiaya_alokasibiaya_id',
                                                    xtype: 'combobox', displayField: 'code',
                                                     queryMode: 'local',
                                                    valueField: 'alokasibiaya_id',
                                                    readOnly: true,
                                                    listConfig: {
                                                        itemTpl: '{code} - {name}'
                                                    },
                                                    fieldLabel: 'Allocation Costs'
                                                },
                                                {fieldLabel: '', flex: 4, readOnly: true, name: 'alokasibiaya_name'},
                                            ]
                                        },
                                        {
                                            items: [
                                                {fieldLabel: 'Select Report To', flex: 3,name: 'reportto_nik', readOnly: true},
                                                {flex: 5, name: 'reportto_name', readOnly: true},
                                                {
                                                    xtype: 'button', text: 'Browse', action: 'lookupreportto',hidden:true,
                                                }
                                            ]
                                        }

                                    ]

                                }
                                ,
                                {
                                    xtype: 'fieldset',
                                    title: 'Employee Status',
                                    width: '100%',
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
                                                            itemId: 'esID1',
                                                            inputValue: 1,
                                                            margin: '10 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    flex: 2,
                                                    xtype: 'fieldset',
                                                    defaults: {
                                                        xtype: 'dfdatefield',
                                                        flex: 1,
                                                     
                                                        margin: '0 10 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Hire Date',
                                                            name: 'statusinformation_hire_date'
                                                        },
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
                                                    defaults: {
                                                        xtype: 'radio',
                                                        margin: '10 10 10 0'
                                                    },
                                                    items: [
                                                        {
                                                            boxLabel: 'Contract <span style="color:red;font-weight:bold">*</span>',
                                                            name: 'employeestatus_employeestatus_id',
                                                            itemId: 'esID2',
                                                            checked: true,
                                                            inputValue: 2,
                                                        },
                                                        {
                                                            boxLabel: 'Candidate',
                                                            name: 'employeestatus_employeestatus_id',
                                                            itemId: 'esID3',
                                                            inputValue: 3, hidden:true
                                                        }
                                                    ]
                                                },
                                                {
                                                    width: 70,
                                                    xtype: 'fieldset',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            labelWidth: 10,
                                                            name: 'statusinformation_contract_ke',
                                                            fieldLabel: 'ke'
                                                        }

                                                    ]
                                                },
                                                {
                                                    flex: 2,
                                                    xtype: 'fieldset',
                                                    defaults: {
                                                        xtype: 'dfdatefield',
                                                        flex: 1,
                                                       
                                                        margin: '0 10 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Period',
                                                            labelWidth: 50,
                                                            name: 'statusinformation_contract_start'
                                                        },
                                                        {
                                                            fieldLabel: 'to',
                                                            labelWidth: 30,
                                                            name: 'statusinformation_contract_end'
                                                        },
                                                        {
                                                            xtype: 'checkbox',
                                                            name:'is_pensiun',
                                                            margin:'0 10px 0 0',
                                                            inputValue:'1',
                                                            boxLabel: 'Pasca Pensiun',
                                                        },
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    flex: 1,
                                                    defaults: {
                                                        xtype: 'radio',
                                                        margin: '10 10 10 0'
                                                    },
                                                    items: [
                                                        {
                                                            boxLabel: 'Consultant <span style="color:red;font-weight:bold">*</span>',
                                                            name: 'employeestatus_employeestatus_id',
                                                            itemId: 'esID7',
                                                            inputValue: 7,
                                                        },
                                                    ]
                                                },
                                                {
                                                    width: 70,
                                                    xtype: 'fieldset',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            labelWidth: 10,
                                                            name: 'statusinformation_consultant_ke',
                                                            fieldLabel: 'ke'
                                                        }

                                                    ]
                                                },
                                                {
                                                    flex: 2,
                                                    xtype: 'fieldset',
                                                    defaults: {
                                                        xtype: 'dfdatefield',
                                                        flex: 1,
                                                       
                                                        margin: '0 10 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Period',
                                                            labelWidth: 50,
                                                            name: 'statusinformation_consultant_start'
                                                        },
                                                        {
                                                            fieldLabel: 'to',
                                                            labelWidth: 30,
                                                            name: 'statusinformation_consultant_end'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    flex: 5,
                                                    defaults: {
                                                        xtype: 'radio',
                                                        margin: '10 10 10 0'
                                                    },
                                                    items: [
                                                        {
                                                            boxLabel: 'Daily Permanent',
                                                            itemId: 'esID4',
                                                            name: 'employeestatus_employeestatus_id',
                                                            inputValue: 4, hidden:true
                                                        },
                                                        {
                                                            boxLabel: 'Daily Contract',
                                                            itemId: 'esID5',
                                                            name: 'employeestatus_employeestatus_id',
                                                            inputValue: 5, hidden:true
                                                        },
                                                        {
                                                            boxLabel: 'Temporary',
                                                            itemId: 'esID6',
                                                            name: 'employeestatus_employeestatus_id',
                                                            inputValue: 6, hidden:true
                                                        }
                                                    ]
                                                },
                                                {
                                                    width: 70,
                                                    xtype: 'fieldset', hidden:true,
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            labelWidth: 10,
                                                            name: 'statusinformation_temporary_ke',
                                                            fieldLabel: 'ke'
                                                        }

                                                    ]
                                                },
                                                {
                                                    flex: 5,
                                                    xtype: 'fieldset', hidden:true,
                                                    defaults: {
                                                        xtype: 'dfdatefield',
                                                        flex: 1,
                                                        margin: '0 10 0 0'
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
                                    title: 'Usia & Masa Kerja',
                                    width: '100%',
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
                                                            xtype: 'checkbox',
                                                            name:'is_kompensasi',
                                                            margin: '10 0',
                                                            inputValue:'1',
                                                            boxLabel: 'Kompensasi',
                                                        }
                                                    ]
                                                },
                                                {
                                                    flex: 2,
                                                    xtype: 'fieldset',
                                                    defaults: {
                                                        xtype: 'dfdatefield',
                                                        flex: 1,
                                                     
                                                        margin: '0 10 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Usia Kerja (Start Date)',
                                                            name: 'usia_kerja_start_date',
                                                            // format: 'd-m-Y',
                                                            // submitFormat: 'Y-m-d',
                                                        },
                                                        {
                                                            fieldLabel: 'Masa Kerja (Start Date)',
                                                            name: 'masa_kerja_start_date',
                                                            // format: 'd-m-Y',
                                                            // submitFormat: 'Y-m-d',
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                    ]

                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        layout: 'vbox',
                                        margin: '0 10 0 0'
                                    },
                                    items: [
                                        {
                                            title: 'Aktif',
                                            flex: 1,
                                            defaults: {
                                                xtype: 'radio',
                                            },
                                            items: [
                                                {
                                                    boxLabel: 'Active',
                                                    name: 'employee_active_byuser',
                                                    inputValue: 1,
                                                    checked: true,
                                                },
                                                {
                                                    boxLabel: 'Non Active',
                                                    inputValue: 0,
                                                    name: 'employee_active_byuser'
                                                },
                                                {
                                                    boxLabel: 'RIP',
                                                    inputValue: 3,
                                                    name: 'employee_active_byuser'
                                                },
                                                {
                                                    width: '100%',
                                                    xtype: 'dfdatefield',
                                                    margin: '10 0 0 0',
                                                
                                                    name: 'nonactive_date',
                                                    labelAlign: 'top',
                                                    fieldLabel: 'Non Active Date'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 3,
                                            layout: 'vbox',
                                            width: '100%',
                                            defaults: {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                width: '100%',
                                                defaults: {
                                                    flex: 1,
                                                    xtype: 'fieldset',
                                                    margin: '0 10 0 0'
                                                }
                                            },
                                            items: [
                                                {
                                                    items: [
                                                        {
                                                            title: 'Finger ID',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    labelWidth: 0,
                                                                    name: 'fingerprintcode'
                                                                },
                                                                {
                                                                    fieldLabel: '2',
                                                                    hidden:true

                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'Finger Machine Code',
                                                            hidden:true,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'Phone Ext',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            title: 'User LDAP',
                                                            hidden:true,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'Password LDAP',
                                                            hidden:true,
                                                            items: [
                                                                {
                                                                    xtype: 'textfield'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        
                                                        {
                                                            title: 'Email Kantor Ciputra <span style="color:red;font-weight:bold">*</span>',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    width:300,
                                                                    name:'email_ciputra'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },                               
                                                // added by wulan sari 20200603
                                                // {
                                                //     xtype: 'fieldset',
                                                //     title: 'PTKP Status',
                                                //     flex: 1,
                                                //     margin: '0 10 0 0',
                                                //     width:250,
                                                //     items: [
                                                //         {
                                                //             xtype: 'ptkpcombobox',
                                                //             readOnly:true,
                                                //             labelWidth: 0,
                                                //             fieldLabel: '',
                                                //             name:'ptkp_id', 
                                                //         }
                                                //     ]
                                                // },
                                                //added by Michael 2021.08.27
                                                {
                                                    items: [
                                                            {
                                                                xtype: 'fieldset',
                                                                title: 'PTKP Status',
                                                                flex: 1,
                                                                margin: '0 10 0 0',
                                                                width:250,
                                                                items: [
                                                                    {
                                                                        xtype: 'ptkpcombobox',
                                                                        readOnly:true,
                                                                        labelWidth: 0,
                                                                        fieldLabel: '',
                                                                        name:'ptkp_id', 
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'fieldset',
                                                                title: 'PTKP Claim Status',
                                                                flex: 1,
                                                                margin: '0 10 0 0',
                                                                width:250,
                                                                items: [
                                                                    {
                                                                        xtype: 'ptkpclaimcombobox',
                                                                        readOnly:true,
                                                                        labelWidth: 0,
                                                                        fieldLabel: '',
                                                                        name:'ptkp_claim_id', 
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                title: "Don't count as an employee",
                                                                items: [
                                                                    {
                                                                        xtype: 'checkbox', 
                                                                        boxLabel: "Do not count", 
                                                                        readOnly: false, 
                                                                        name: 'is_child', 
                                                                        uncheckedValue: '0', 
                                                                        inputValue: '1',
                                                                        margin: "0 0 0 0"
                                                                    }
                                                                ]
                                                            }
                                                    ]
                                                },
                                                
                                                // {
                                                //     xtype: 'container', layout: 'hbox',
                                                //     defaults: {
                                                //         margin: "0 10 15 0"
                                                //     },
                                                //     items: [
                                                //         {xtype: 'checkbox', fieldLabel:'&nbsp;', boxLabel: 'Do not count as an employee', flex:5, readOnly: false, name: 'is_child', uncheckedValue: '0', inputValue: '1'},
                                                //     ]
                                                // },

                                                //end added by Michael 2021.08.27
                                            ]
                                        }
                                    ]
                                },   
                                // added by wulan sari 20181210
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'Resign Reason',
                                        flex: 1,
                                        margin: '0 10 0 0', 
                                        width:330,
                                        items: [
                                            {
                                                xtype: 'alasanresigncombobox',
                                                fieldLabel: 'Select',
                                                name:'alasanresign_id',
                                                displayField: 'description',
                                                valueField: 'alasanresign_id',
                                                width: '100%',
                                                labelWidth: 50, 
                                                width:300
                                            },
                                            {
                                                xtype: 'textareafield',
                                                name: 'alasan_resign',
                                                width:300,
                                                readOnly:true
                                            },
                                        ]
                                    }
                                    ]
                                }
                                /*                   
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                flex: 1,
                                                xtype: 'fieldset',
                                                layout: 'vbox',
                                                margin: '0 10 0 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 3,
                                                    layout: 'vbox',
                                                    width: '100%',
                                                    defaults: {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        width: '100%',
                                                        defaults: {
                                                            flex: 1,
                                                            xtype: 'fieldset',
                                                            margin: '0 10 0 0'
                                                        }
                                                    },
                                                    items: [                                                
                                                        {
                                                            items: [
                                                                {
                                                                    title: 'Dana Pensiun',
                                                                    layout: 'hbox',
                                                                    width: '100%',
                                                                    defaults: {
                                                                        flex: 1,
                                                                        xtype: 'textfield',
                                                                        labelWidth: 20,
                                                                        margin: '0 10 0 0'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            fieldLabel: 'No'

                                                                        },
                                                                        {
                                                                            fieldLabel: 'Tgl',
                                                                            xtype: 'dfdatefield'

                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {
                                                                    title: 'Jamsostek',
                                                                    layout: 'hbox',
                                                                    width: '100%',
                                                                    defaults: {
                                                                        flex: 1,
                                                                        xtype: 'textfield',
                                                                        labelWidth: 20,
                                                                        margin: '0 10 0 0'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            fieldLabel: 'No'

                                                                        },
                                                                        {
                                                                            fieldLabel: 'Tgl',
                                                                            xtype: 'dfdatefield'

                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        
                                    ]
                                },            
                                */            
                                                       
                            ]
                        },
                        {
                            title: 'Family',
                            itemId: 'pFamilyTabID',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    activeTab: 0, // index or id
                                    margin: '0 0 10 0',
                                    items: [{
                                            title: 'Wife/Husband and Children',
                                            layout: 'vbox',
                                            margin: 10,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0",
                                                        xtype: 'textfield'
                                                    },
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            margin: "0 0 0 0",
                                                            flex: 0,
                                                            xtype: 'hiddenfield',
                                                            name: 'spouse_relation_id'
                                                        },
                                                        {
                                                            fieldLabel: 'Spouse Name',
                                                            name: 'spouse_name',
                                                            flex: 8,
                                                        },
                                                        {
                                                            xtype: 'dfdatefield',
                                                            name: 'marriage_date',
                                                            fieldLabel: 'Marriage Date',
                                                            flex: 5
                                                        },
                                                        {
                                                            fieldLabel: 'Child',
                                                            name: 'spouse_child',
                                                            readOnly: true,
                                                            labelWidth: 70,
                                                            flex: 3
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0",
                                                        xtype: 'textfield',
                                                        flex: 1
                                                    },
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            fieldLabel: 'Birth Place',
                                                            name: 'spouse_birth_place'
                                                        },
                                                        {
                                                            xtype: 'dfdatefield',
                                                            fieldLabel: 'Birth Date',
                                                            name: 'spouse_birth_date'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0",
                                                        xtype: 'textfield',
                                                        flex: 1
                                                    },
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            fieldLabel: 'Phone Number',
                                                            name: 'spouse_phone_number'
                                                        },
                                                        {
                                                            xtype: 'cbeducation',
                                                            name: 'spouse_last_education',
                                                            fieldLabel: 'Education Last',
                                                        }
                                                    ]
                                                }

                                                ,
                                                {
                                                    xtype: 'textfield',
                                                    name: 'spouse_job',
                                                    fieldLabel: 'Occupation'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'spouse_company_name',
                                                    fieldLabel: 'Company'
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    name: 'spouse_company_address',
                                                    fieldLabel: 'Company Address',
                                                    width: '100%'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'spouse_company_line_of_business',
                                                    fieldLabel: 'Line of Business'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'spouse_company_phone',
                                                    fieldLabel: 'Phone'
                                                },
                                                {
                                                    xtype: 'dfdatefield',
                                                    name: 'spouse_rip_date',
                                                    fieldLabel: 'R.I.P Date'
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Children',
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            xtype: 'personalchildgrid',
                                                            height: 200
                                                        }
                                                    ]

                                                }
                                            ]
                                        }, {
                                            title: "Parents and Siblings",
                                            margin: 10,
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0",
                                                        xtype: 'textfield',
                                                        flex: 1
                                                    },
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            margin: "0 0 0 0",
                                                            flex: 0,
                                                            xtype: 'hiddenfield',
                                                            name: 'father_relation_id'
                                                        },
                                                        {
                                                            fieldLabel: 'Father',
                                                            name: 'father_name'
                                                        },
                                                        {
                                                            xtype: 'dfdatefield',
                                                            fieldLabel: 'Birthdate',
                                                            name: 'father_birth_date'
                                                        },
                                                        {
                                                            fieldLabel: 'Occupation',
                                                            labelWidth: 70,
                                                            name: 'father_job'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0",
                                                        xtype: 'textfield',
                                                        flex: 1
                                                    },
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            margin: "0 0 0 0",
                                                            flex: 0,
                                                            xtype: 'hiddenfield',
                                                            name: 'mother_relation_id'
                                                        },
                                                        {
                                                            fieldLabel: 'Mother',
                                                            name: 'mother_name'
                                                        },
                                                        {
                                                            xtype: 'dfdatefield',
                                                            fieldLabel: 'Birthdate',
                                                            name: 'mother_birth_date'
                                                        },
                                                        {
                                                            fieldLabel: 'Occupation',
                                                            labelWidth: 70,
                                                            name: 'mother_job'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    fieldLabel: "Father's Address",
                                                    name: 'father_address',
                                                    width: '100%'
                                                },
						{
                                                    xtype: 'textareafield',
                                                    fieldLabel: "Mother's Address",
                                                    name: 'mother_address',
                                                    width: '100%'
                                                },
                                                {
                                                    xtype: 'dfdatefield',
                                                    fieldLabel: 'Father RIP Date',
                                                    name: 'father_rip_date'
                                                },
                                                {
                                                    xtype: 'dfdatefield',
                                                    fieldLabel: 'Mother RIP Date',
                                                    name: 'mother_rip_date'
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Brothers/Sisters',
                                                    width: '100%',
                                                    items: [
                                                        {
                                                            xtype: 'personalsaudaragrid',
                                                            height: 200
                                                        }
                                                    ]

                                                }
                                            ]
                                        }]
                                }
                            ]
                        }, {
                            title: 'Education and Training',
                            itemId: 'pEducationTabID',
                            margin: 10,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Education History from Senior High School',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: 'personaleducationgrid',
                                            height: 200
                                        }
                                    ]

                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Training or Courses',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: 'personalcoursegrid',
                                            height: 200
                                        }
                                    ]

                                }
                            ]
                        }, {
                            title: 'Potency and Organization',
                            itemId: 'pPotencyTabID',
                            margin: 10,
                            defaults: {
                                xtype: 'fieldset',
                                width: '100%',
                            },
                            items: [
                                {
                                    title: 'Skills',
                                    items: [
                                        {
                                            xtype: 'container',
                                            title: '',
                                            defaultType: 'checkbox', // each item will be a radio button
                                            layout: 'hbox',
                                            defaults: {
                                                flex: 1
                                            },
                                            items: [{
                                                    boxLabel: 'Teaching',
                                                    name: 'skills_1'
                                                }, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_1_id'
                                                }, {
                                                    boxLabel: 'Selling',
                                                    name: 'skills_2'
                                                }, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_2_id'
                                                }, {
                                                    boxLabel: 'Writing',
                                                    name: 'skills_3'
                                                }, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_3_id'
                                                }, {
                                                    boxLabel: 'Computer',
                                                    name: 'skills_4'
                                                }, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_4_id'
                                                }]
                                        },
                                        {
                                            xtype: 'container', layout: 'hbox',
                                            defaults: {
                                                margin: "10 10 10 0"
                                            },
                                            items: [
                                                {xtype: 'checkbox', boxLabel: 'electronics', flex: 1, name: 'skills_5'},
                                                {xtype: 'textfield', flex: 4, name: 'skills_5_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_5_id'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container', layout: 'hbox',
                                            defaults: {
                                                margin: "0 0 10 0"
                                            },
                                            items: [
                                                {xtype: 'checkbox', boxLabel: 'Others', flex: 1, name: 'skills_6'},
                                                {xtype: 'textfield', flex: 4, name: 'skills_6_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_6_id'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container', layout: 'hbox',
                                            defaults: {
                                                margin: "0 10 10 0",
                                                xtype: 'radio'
                                            },
                                            items: [
                                                {xtype: 'checkbox', boxLabel: 'Language', flex: 1, name: 'skills_7'},
                                                {xtype: 'textfield', flex: 4, name: 'skills_7_list'},
                                                {boxLabel: 'Aktif', flex: 1, name: 'skills_7_active', inputValue: 1},
                                                {boxLabel: 'Pasif', checked: true, flex: 1, name: 'skills_7_active', inputValue: 0}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_7_id'
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'container', layout: 'hbox',
                                            defaults: {
                                                margin: "0 10 10 0",
                                                xtype: 'radio'
                                            },
                                            items: [
                                                //{xtype: 'label', text: '', flex: 1, name: 'skills_8'},
						{xtype: 'hiddenfield', text: '', flex: 1, name: 'skills_8'}, /* edited by ahmad riadi 07-07-2017 */
                                                {xtype: 'textfield', flex: 4, name: 'skills_8_list'},
                                                {boxLabel: 'Aktif', flex: 1, name: 'skills_8_active', inputValue: 1},
                                                {boxLabel: 'Pasif', checked: true, flex: 1, name: 'skills_8_active', inputValue: 0}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_8_id'
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'container', layout: 'hbox',
                                            defaults: {
                                                margin: "0 10 10 0",
                                                xtype: 'radio'
                                            },
                                            items: [
                                                //{xtype: 'label', text: '', flex: 1, name: 'skills_9'},
						{xtype: 'hiddenfield', text: '', flex: 1, name: 'skills_9'}, /* edited by ahmad riadi 07-07-2017 */
                                                {xtype: 'textfield', flex: 4, name: 'skills_9_list'},
                                                {boxLabel: 'Aktif', flex: 1, name: 'skills_9_active', inputValue: 1},
                                                {boxLabel: 'Pasif', checked: true, flex: 1, name: 'skills_9_active', inputValue: 0}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_9_id'
                                                }

                                            ]
                                        }
                                    ]

                                },
                                {
                                    title: 'Hobies',
                                    defaults: {
                                        margin: '0 0 10 0',
                                        xtype: 'container', layout: 'hbox',
                                        defaults: {
                                            flex: 1,
                                            margin: '0 10 0 0'
                                        }
                                    },
                                    items: [
                                        {
                                            items: [
                                                {xtype: 'checkbox', boxLabel: 'Sport', name: 'skills_10'},
                                                {xtype: 'textfield', flex: 2, name: 'skills_10_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_10_id'
                                                },
                                                {xtype: 'checkbox', boxLabel: 'Painting', name: 'skills_11'},
                                                {xtype: 'textfield', flex: 2, name: 'skills_11_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_11_id'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {xtype: 'checkbox', boxLabel: 'Music', name: 'skills_12'},
                                                {xtype: 'textfield', flex: 2, name: 'skills_12_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_12_id'
                                                },
                                                {xtype: 'checkbox', boxLabel: 'Culinary', name: 'skills_13'},
                                                {xtype: 'textfield', flex: 2, name: 'skills_13_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_13_id'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {xtype: 'checkbox', boxLabel: 'Dance', name: 'skills_14'},
                                                {xtype: 'textfield', flex: 2, name: 'skills_14_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_14_id'
                                                },
                                                {xtype: 'checkbox', boxLabel: 'Others', name: 'skills_15'},
                                                {xtype: 'textfield', flex: 2, name: 'skills_15_list'}, {
                                                    xtype: 'hiddenfield',
                                                    name: 'skills_15_id'
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    title: 'Interest to company',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            width: '100%',
                                            name: 'skills_16_list'
                                        }, {
                                            xtype: 'hiddenfield',
                                            name: 'skills_16_id'
                                        }
                                    ]

                                },
                                {
                                    title: 'Organization Contribution',
                                    items: [
                                        {
                                            xtype: 'personalorganizationgrid',
                                            height: 200
                                        }
                                    ]

                                }
                            ]
                        }, 
                        {
                            title: 'Job History',
                            itemId: 'pJobsTabID',
                            margin: 10,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Company before Ciputra Group',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: 'personalcompanygrid',
                                            height: 200
                                        }
                                    ]

                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Internal Company Ciputra Group',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: 'personalemployeetransfergrid',
                                            height: 180
                                        }
                                    ]

                                }
                            ]
                        },
                        /*
                        {
                            title: 'Documents',
                            itemId: 'pDocumentTabID',
                            margin: 10,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_kk'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'KK :',
                                            width: 100
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_kk',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_kk'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_npwp'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'NPWP :',
                                            width: 100
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_npwp',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_npwp'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_ktp'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'KTP :',
                                            width: 100
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_ktp',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_ktp'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_jamsostek'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'JAMSOSTEK :',
                                            width: 100
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_jamsostek',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_jamsostek'
                                        }
                                    ]
                                },
                            ]
                        } */

			  /* start untuk dokumen upload */
                        {
                            title: 'Documents',
                            itemId: 'pDocumentTabID',
                            margin: 10,
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'export_document',
                                    text: 'Export File',
                                    margin: '0 0 20px 0'
                                },
                                 {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_bpjs_pp'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'BPJS Jaminan Pensiun :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_bpjs_pp',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_bpjs_pp'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_bpjs_pp',
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_bpjs_k'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'BPJS Kesehatan :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_bpjs_k',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_bpjs_k'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_bpjs_k',
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_bpjs_kk'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'BPJS Ketenagakerjaan :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_bpjs_kk',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_bpjs_kk'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_bpjs_kk',
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_ijazah'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'IJAZAH :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_ijazah',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_ijazah'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_ijazah',
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_kk'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'KK :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_kk',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_kk'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_kk',
                                            width: 400
                                        }
                                    ]
                                },
                                 {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_ktp'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'KTP :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_ktp',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_ktp'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            readOnly: true,
                                            name: 'no_ktp',
                                            width: 400
                                        }
                                    ]
                                },
                                 {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_manulife_p'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'MANULIFE :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_manulife_p',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_manulife_p'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_manulife_p',
                                            width: 400
                                        }
                                    ]
                                },
                                 {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_rekening'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'REKENING :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_rekening',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_rekening'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            readOnly:true,
                                            name: 'no_rekening',
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_npwp'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'NPWP :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_npwp',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_npwp'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            readOnly:true,
                                            name: 'no_npwp',
                                            width: 400
                                        }
                                    ]
                                }, 
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_asuransi'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Asuransi Swasta (dari perusahaan) :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_asuransi',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_asuransi'
                                        },
                                        // wulan add 2020 05 18
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_asuransi',
                                            width: 400
                                        }
                                    ]
                                },
                                //added by michael 09/08/2021
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_vaksin1'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Vaksin Covid 1 :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_vaksin1',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_vaksin1'
                                        },
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_vaksin1',
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_vaksin2'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Vaksin Covid 2 :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_vaksin2',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_vaksin2'
                                        },
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_vaksin2',
                                            width: 400
                                        }
                                    ]
                                },
                                //end added by michael 09/08/2021

                                //added by anas 10022022
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_vaksin3'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Vaksin Covid 3 :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_vaksin3',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_vaksin3'
                                        },
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_vaksin3',
                                            width: 400
                                        }
                                    ]
                                },
                                //end added by anas
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_pas_foto'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Pas Foto :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_pas_foto',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_pas_foto'
                                        },
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_pas_foto',
                                            width: 400
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_stnk'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'STNK :',
                                            width: 150
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_stnk',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_stnk'
                                        },
                                        {
                                            fieldLabel:' &nbsp; No',
                                            labelWidth:30,
                                            xtype: 'textfield',
                                            name: 'no_stnk',
                                            width: 400
                                        }
                                    ]
                                },
                                /*
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'dokumen_jamsostek'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'JAMSOSTEK :',
                                            width: 100
                                        },
                                        {
                                            xtype: 'button',
                                            action: 'upload_file_jamsostek',
                                            text: 'Upload File',
                                            margin: '0 20px 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Lihat dokumen',
                                            action: 'lihatdokumen_jamsostek'
                                        }
                                    ]
                                },
                                */
                            ]
                        },
                          /* end untuk dokumen upload */

			 /* start untuk check data */
                        {
                            title: 'Data Already Valid/ Approved',
                            itemId: 'pCheckAccurateID',
                            margin: 10,
                            items: [
                               {
                                    xtype: 'textfield',
                                    fieldLabel: 'Last Update by User',
                                    itemId: 'fd_last_update_by_user',
                                    id: 'last_update_by_user',
                                    name: 'last_update_by_user',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Last Update by Admin',
                                    itemId: 'fd_last_update_by_admin',
                                    id: 'last_update_by_admin',
                                    name: 'last_update_by_admin',
                                    emptyText: 'Auto Value',
                                    width: 300,
                                    readOnly: true,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                               
                            ]
                        },
                          /* end untuk check data */
			

                    ]
                }
            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled: true,
                    action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'

            ]
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                buttonAlign: 'right',
                layout: {
                    padding: '2px 6px',
                    type: 'hbox'
                },
                items: [
                    {
                        align: 'right',
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: '3px 5px',
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    }

                ]
            }
        ];
        return x;
    }
});