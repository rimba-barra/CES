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
        'Hrd.view.personal.GridCompany'],
    frame: false,
    autoScroll: true,
    height: 600,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_id'
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
                                                        {xtype: 'textfield', fieldLabel: 'NIK - Name', flex: 4, readOnly: true, name: 'employee_nik'},
                                                        {xtype: 'textfield', flex: 5, name: 'employee_name'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'container', layout: 'hbox',
                                                    defaults: {
                                                        margin: "0 10 15 0"
                                                    },
                                                    items: [
                                                        {xtype: 'datefield', fieldLabel: 'Birth Date/Place', flex: 6, name: "birth_date", format: "d-m-Y", submitFormat: "Y-m-d"},
                                                        {xtype: 'textfield', flex: 5, name: "birth_place"}
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield', fieldLabel: 'KTP Number', width: 400, name: "ktp_number"
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
                                                                    xtype: 'cbreligion', fieldLabel: 'Religion', name: 'religion_religion_id'
                                                                },
                                                                {
                                                                    xtype: 'cbbloodgroup', name: 'bloodgroup_bloodgroup_id', fieldLabel: 'Blood Group'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            flex: 2,
                                                            xtype: 'fieldset',
                                                            title: 'Gender',
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
                                                            title: 'Address',
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
                                                    fieldLabel: 'NIK Group'
                                                },
                                                {
                                                    xtype: 'filefield',
                                                    fieldLabel: 'Photo'
                                                },
                                                {
                                                    margin: '30 30',
                                                    html: 'Photo frame',
                                                    width: 200,
                                                    height: 250
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
                                                {xtype: 'cbeducation', name: 'education_education_id', labelWidth: 90, fieldLabel: 'Education Last'},
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
                                }

                            ]
                        },
                        {
                            title: 'Family',
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
                                                            xtype: 'datefield',
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
                                                            xtype: 'datefield',
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
                                            title: 'Parent and Brother/Sister',
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
                                                            xtype: 'datefield',
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
                                                            xtype: 'datefield',
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
                                                    fieldLabel: 'Address',
                                                    name: 'father_address',
                                                    width: '100%'
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
                                            title: 'Marriage Status',
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
                                                {xtype: 'label', text: '', flex: 1, name: 'skills_8'},
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
                                                {xtype: 'label', text: '', flex: 1, name: 'skills_9'},
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
                        }, {
                            title: 'Job History',
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

                                }
                            ]
                        }, {
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
                                                {fieldLabel: 'Department', flex: 3},
                                                {flex: 5, name: 'department_department_id', xtype: 'cbdepartment', fieldLabel: ''}
                                            ]
                                        },
                                        {
                                            items: [
                                                {fieldLabel: 'Division', flex: 3},
                                                {flex: 5, name: 'division_division_id', xtype: 'cbdivision', fieldLabel: ''}
                                            ]
                                        },
                                        {
                                            items: [
                                                {fieldLabel: 'Group (Golongan)', flex: 3},
                                                {flex: 5, name: 'group_group_id', xtype: 'cbgroup', fieldLabel: ''}
                                            ]
                                        },
                                        {
                                            items: [
                                                {fieldLabel: 'Position Category', flex: 3},
                                                {flex: 5, name: 'groupposition_groupposition_id', xtype: 'cbgroupposition', fieldLabel: ''}
                                            ]
                                        },
                                        {
                                            items: [
                                                {fieldLabel: 'Position', flex: 3},
                                                {flex: 5, name: 'position_position_id', xtype: 'cbposition', fieldLabel: ''}
                                            ]
                                        },
                                        {
                                            items: [
                                                {fieldLabel: 'Allocation Costs', flex: 3},
                                                {flex: 5}
                                            ]
                                        },
                                        {
                                            items: [
                                                {fieldLabel: 'Report To', flex: 3},
                                                {flex: 5}
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
                                                            inputValue: 1,
                                                            margin: '10 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    flex: 2,
                                                    xtype: 'fieldset',
                                                    defaults: {
                                                        xtype: 'datefield',
                                                        flex: 1,
                                                        format: 'd-m-Y',
                                                        submitFormat: 'Y-m-d',
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
                                                    flex: 2,
                                                    xtype: 'fieldset',
                                                    defaults: {
                                                        xtype: 'datefield',
                                                        flex: 1,
                                                        format: 'd-m-Y',
                                                        submitFormat: 'Y-m-d',
                                                        margin: '0 10 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Period',
                                                            name: 'statusinformation_contract_start'
                                                        },
                                                        {
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
                                                    flex: 5,
                                                    defaults: {
                                                        xtype: 'radio',
                                                        margin: '10 10 10 0'
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
                                                    flex: 5,
                                                    xtype: 'fieldset',
                                                    defaults: {
                                                        xtype: 'datefield',
                                                        flex: 1,
                                                        margin: '0 10 0 0',
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
                                                    name: 'employee_active',
                                                    inputValue: 1,
                                                    checked: true,
                                                },
                                                {
                                                    boxLabel: 'Non Active',
                                                    inputValue: 0,
                                                    name: 'employee_active'
                                                },
                                                {
                                                    boxLabel: 'RIP',
                                                    inputValue: 3,
                                                    name: 'employee_active'
                                                },
                                                {
                                                    width: '100%',
                                                    xtype: 'datefield',
                                                    margin: '10 0 0 0',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d',
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
                                                            title: 'Pin Number',
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
                                                                    fieldLabel: '1'

                                                                },
                                                                {
                                                                    fieldLabel: '2'

                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'Finger Machine Code',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'fingerprintcode'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    items: [
                                                        {
                                                            title: 'Phone Ext',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'User LDAP',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'Password LDAP',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield'
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
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
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
                                                                    xtype: 'datefield'

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
                                                                    xtype: 'datefield'

                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Resign Reason',
                                            flex: 2,
                                            items: [
                                                {
                                                    xtype: 'textareafield',
                                                    width: '100%'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }]
                }
            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled:true,
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