Ext.define('Erems.view.mastercustomer.FormData_10012017', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastercustomerformdata_10012017',
    requires: ['Erems.library.template.component.Purposecombobox',
        'Erems.library.template.component.Maritalstatuscombobox',
        'Erems.library.template.component.Nationalitycombobox',
        'Erems.library.template.component.Citycombobox',
        'Erems.library.template.view.combobox.Religion',
        'Erems.library.template.view.combobox.Education',
        'Erems.library.template.view.combobox.City',
        'Erems.library.template.view.combobox.Purpose'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    height: 500,
    editedRow: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {xtype: 'panel', bodyPadding: 10, title: 'GENERAL INFORMATION', collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox'
                            },
                            items: [
                                {
                                    flex: 3,
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%'
                                    },
                                    margin: '0 20px 0 0',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    itemId: 'fd_id',
                                                    name: 'customer_id'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    width: '100%',
                                                    fieldLabel: 'Code',
                                                    name: 'code',
                                                    readOnly: true,
                                                    flex: 1,
                                                    margin: '0 200px 0 0'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: '',
                                                    name: 'is_temporary',
                                                    inputValue: '1',
                                                    uncheckedValue: '0',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Temporary Name',
                                                    width: 100
                                                }
                                            ]
                                        },
                                        {
                                            fieldLabel: 'Customer Name',
                                            name: 'name',
                                            itemId: 'fd_name',
                                            enableKeyEvents: true,
                                            allowBlank: false,
                                            maskRe: /[a-z0-9_ ]/i,
                                            regex: /^[a-zA-Z0-9_ ]+$/,
                                            regexText: 'Only alphanumeric characters allowed'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Address',
                                            name: 'address',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    boxLabel: 'change KTP Address?',
                                                    margin:'0px 100px 0px 0px',
                                                    fieldLabel: ' ',
                                                    name: 'is_change_ktpaddress'
                                                },
                                                {
                                                    xtype:'button',
                                                    text:'Multi Address',
                                                    action:'multi_address'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            itemId: 'fd_photo_text',
                                            name: 'photo'
                                        },
                                        {
                                            xtype: 'filefield',
                                            fieldLabel: 'Photo',
                                            itemId: 'fd_photo',
                                            name: 'photo_browse',
                                        }
                                    ]
                                },
                                {
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 140,
                                            height: 170,
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
                            layout: 'hbox',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox',
                                flex: 1
                            },
                            items: [
                                {
                                    margin: '0 20px 0 110px',
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'cbcity',
                                            fieldLabel: 'City',
                                            allowBlank: false,
                                            name: 'city_city_id'
                                        },
                                        {
                                            fieldLabel: 'Home Phone',
                                            allowBlank: false,
                                            name: 'home_phone',
                                        },
                                        {
                                            fieldLabel: 'Office Phone',
                                            name: 'office_phone'
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Zipcode',
                                            name: 'zipcode'
                                        },
                                        {
                                            fieldLabel: 'Mobile Phone',
                                            name: 'mobile_phone'
                                        },
                                        {
                                            fieldLabel: 'FAX',
                                            name: 'fax'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'textfield',
                                padding: '5px 0 0 0',
                                width: '100%'
                            },
                            items: [
                                {
                                    fieldLabel: 'KTP Number',
                                    allowBlank: false,
                                    name: 'KTP_number'
                                },
                                {
                                    fieldLabel: 'KTP Name',
                                    name: 'KTP_name'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'KTP Address',
                                    name: 'KTP_address'
                                },
                                {
                                    xtype      : 'xnumericfieldEST',
                                    fieldLabel : 'NPWP Number',
                                    name       : 'NPWP',
                                    allowBlank : false, /* added by ahmad riadi 27-12-2016  */
                                },
                                {
                                    xtype      : 'textareafield',
                                    fieldLabel : 'NPWP Address',
                                    name       : 'NPWP_address',
                                    allowBlank : false, /* added by ahmad riadi 27-12-2016  */
                                },
                                {
                                    fieldLabel: 'Email',
                                    name: 'email'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox',
                                flex: 1
                            },
                            items: [
                                {
                                    margin: '0 20px 0 0',
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Place of birth',
                                            allowBlank: false,
                                            name: 'birthplace'
                                        },
                                        {
                                            xtype: 'maritalstatuscombobox',
                                            fieldLabel: 'Marital Status',
                                            allowBlank: false,
                                            name: 'marital_status'
                                        },
                                        {
                                            fieldLabel: 'Nationality',
                                            allowBlank: false,
                                            name: 'nationality'
                                        },
                                        {
                                            xtype: 'cbpurpose',
                                            name: 'purpose_purpose_id',
                                            allowBlank: false,
                                            fieldLabel: 'Purpose buy'
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'fd_birthdate',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d H:i:s.u',
                                            allowBlank: false,
                                            fieldLabel: 'Birthdate',
                                            name: 'birthdate'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: '100%',
                                                    fieldLabel: 'Children',
                                                    name: 'children',
                                                    flex: 1,
                                                    margin: '0 20px 0 0'
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'person',
                                                    width: 50

                                                }
                                            ]
                                        },
                                        {
                                            fieldLabel: 'Religion',
                                            xtype: 'cbreligion',
                                            allowBlank: false,
                                            storeUrl: 'mastercustomer',
                                            name: 'religion_religion_id',
                                            bindPrefixName: "Mastercustomer"
                                        },
                                        {
                                            fieldLabel: 'Education',
                                            xtype: 'cbeducation',
                                            storeUrl: 'mastercustomer',
                                            anchor: '-5',
                                            name: 'education_education_id',
                                            bindPrefixName: "Mastercustomer",
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* CUSTOMER INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'COMPANY INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'textfield',
                                padding: '5px 0 0 0',
                                width: '100%'
                            },
                            items: [
                                {
                                    fieldLabel: 'Company Name',
                                    name: 'company_name'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Company Address',
                                    name: 'company_address'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'vbox',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            margin: '0 20px 0 110px',
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '5px 0 0 0',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'cbcity',
                                                    fieldLabel: 'City',
                                                    name: 'company_city_id',
                                                },
                                                {
                                                    fieldLabel: 'Phone',
                                                    name: 'company_phone'
                                                },
                                                {
                                                    fieldLabel: 'Fax',
                                                    name: 'company_fax'
                                                }
                                            ]
                                        },
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '5px 0 0 0',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Zipcode',
                                                    name: 'company_zipcode'
                                                },
                                                {
                                                    fieldLabel: 'Ext',
                                                    name: 'company_phoneext'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    fieldLabel: 'Position',
                                    name: 'company_position'
                                }
                            ]
                        }
                    ]


                },
                {xtype: 'panel', bodyPadding: 10, title: 'EMERGENCY CALL', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'textfield',
                                padding: '5px 0 0 0',
                                width: '100%'
                            },
                            items: [
                                {
                                    fieldLabel: 'Name',
                                    name: 'emergency_name'
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Address',
                                    name: 'emergency_address'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            margin: '0 20px 0 110px',
                                            fieldLabel: 'Home phone',
                                            name: 'emergency_phone'
                                        },
                                        {
                                            padding: '0 0 0 0',
                                            fieldLabel: 'Mobile Phone',
                                            name: 'emergency_mobilephone'
                                        }
                                    ]
                                },
                                {
                                    padding: '10px 0 0 0',
                                    fieldLabel: 'Family Status',
                                    name: 'emergency_status'
                                }
                            ]
                        }
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'LOGIN INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Please make sure customer name have minimum 8 characters and Date of Birth is filled to get generated default username and password',
                                    width: '100%',
                                    style: {
                                        fontSize: '10px',
                                        color: "#9E9E9E",
                                        margin: '10px 0'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    width: '100%',
                                    bodyStyle: 'border:1px solid red;padding:10px 20px;background-color:#FFFF99',
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            margin: '0 20px 0 0',
                                            fieldLabel: 'Username',
                                            name: 'userid',
                                            itemId: 'fd_username',
                                            allowBlank: false
                                        },
                                        {
                                            padding: '0',
                                            fieldLabel: 'Password',
                                            name: 'password',
                                            allowBlank: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textareafield',
                                    padding: '10px 0 0 0',
                                    width: '100%',
                                    fieldLabel: 'Description',
                                    name: 'description'
                                }
                            ]
                        }
                    ]

                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
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
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'documents',
                        itemId: 'btnDocuments',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-archive',
                        text: 'Documents'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});

