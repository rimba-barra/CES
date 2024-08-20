Ext.define('Erems.view.opportunitycustomer.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.opportunitycustomerformdata',
    requires: ['Erems.library.template.component.Purposecombobox',
        'Erems.library.template.component.Maritalstatuscombobox',
        'Erems.library.template.component.Nationalitycombobox',
        'Erems.library.template.component.Citycombobox',
        'Erems.library.template.view.combobox.Religion',
        'Erems.library.template.view.combobox.Education',
        'Erems.library.template.view.combobox.City',
        'Erems.library.template.view.combobox.Purpose',
        'Erems.library.template.view.combobox.Downline'
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
                                                    name: 'opportunitycustomer_id'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    width: '100%',
                                                    fieldLabel: 'Code',
                                                    name: 'code',
                                                    readOnly:true,
                                                    flex: 1,
                                                    margin: '0 200px 0 0'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: '',
                                                    name: 'temporary_name',
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
                                            itemId:'fd_name',
                                            enableKeyEvents: true,
                                            allowBlank: false,
                                            maskRe: /[a-z0-9_ ]/i,
                                            regex: /^[a-zA-Z0-9_ ]+$/,
                                            regexText: 'Only alphanumeric characters allowed'
                                        },
                                        {
                                            xtype      : 'xaddressfieldEST',
                                            fieldLabel : 'Address',
                                            name       : 'address',
                                            allowBlank :false,
                                        }, 
                                        {
                                            xtype: 'checkbox',
                                            boxLabel: 'change KTP Address?',
                                            fieldLabel:' ',
                                            name: 'is_change_ktpaddress'
                                        }, 
                                        {
                                            xtype: 'hiddenfield',
                                            itemId: 'fd_photo_text',
                                            name: 'photo'
                                        },
                                        
                                    ]
                                },
                                {
                                    flex: 1,
                                    items: [
                                       
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
                                          //  allowBlank:false,
                                            name: 'city_city_id'
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Home Phone',
                                            name       : 'home_phone',
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Home Phone 2',
                                            name       : 'home_phone2',
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Office Phone',
                                            name       : 'office_phone',
                                        }
                                    ]
                                },
                                {
                                    defaults : {
                                        padding : '5px 0 0 0',
                                        width   : '100%'
                                    },
                                    items : [
                                        {
                                            xtype      : 'xnumericfieldEST',
                                            fieldLabel : 'Zipcode',
                                            name       : 'zipcode',
                                            maxLength  : 10
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Mobile Phone',
                                            name       : 'mobile_phone',
                                            allowBlank : false,
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Mobile Phone 2',
                                            name       : 'mobile_phone2',
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'FAX',
                                            name       : 'fax',
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
                                    xtype      : 'xnumericfieldEST',
                                    fieldLabel : 'KTP Number',
                                    name       : 'KTP_number',
                                },
                                {
                                    xtype      : 'xnamefieldEST',
                                    fieldLabel : 'KTP Name',
                                    name       : 'KTP_name'
                                },
                                {
                                    xtype      : 'xaddressfieldEST',
                                    fieldLabel : 'KTP Address',
                                    name       : 'KTP_address',
                                },
                                {
                                    xtype      : 'xnumericfieldEST',
                                    fieldLabel : 'NPWP Number',
                                    name       : 'NPWP',
                                },
                                {
                                    fieldLabel : 'Email',
                                    name       : 'email',
                                    vtype      :'email',
                                    listeners  : {
                                        'blur' : function (thisField) {
                                            if (!thisField.isValid()) {
                                                this.setValue("");
                                            }
                                        }
                                    }
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
                                          //  allowBlank:false,
                                            name: 'birthplace'
                                        },
                                        {
                                            xtype:'maritalstatuscombobox',
                                            fieldLabel: 'Marital Status',
                                           // allowBlank:false,
                                            name: 'marital_status'
                                        },
                                        {
                                            fieldLabel: 'Nationality',
                                          //  allowBlank:false,
                                            name: 'nationality'
                                        },
                                        {
                                            xtype: 'cbpurpose',
                                            name: 'purpose_purpose_id',
                                          //  allowBlank:false,
                                            fieldLabel: 'Purpose buy'
                                        },

                                        {
                                            xtype: 'cbdownline',
                                            name: 'downline_id',
                                            fieldLabel: 'Downline'
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
                                            xtype:'datefield',
                                            itemId:'fd_birthdate',
                                            format:'d-m-Y',
                                           submitFormat:'Y-m-d H:i:s.u',
                                           // allowBlank:false,
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
                                                    maskRe:/[0-9\s\.\-\/]/,
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
                                           // allowBlank:false,
                                            storeUrl: 'opportunitycustomer',
                                            name: 'religion_religion_id',
                                            bindPrefixName: "Opportunitycustomer"
                                        },
                                        {
                                            fieldLabel: 'Education',
                                            xtype: 'cbeducation',
                                            storeUrl: 'opportunitycustomer',
                                            anchor: '-5',
                                            name: 'education_education_id',
                                            bindPrefixName: "Opportunitycustomer",
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                padding: '5px 0 0 0',
                                width: '100%'
                            },
                            items: [
                                {
                                    xtype      : 'xnotefieldEST',
                                    fieldLabel : 'Catatan',
                                    name       : 'description',
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
                                    xtype      : 'xaddressfieldEST',
                                    fieldLabel : 'Company Address',
                                    name       : 'company_address',
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
                                            margin   : '0 20px 0 110px',
                                            defaults : {
                                                padding : '5px 0 0 0',
                                                width   : '100%'
                                            },
                                            items: [
                                                {
                                                    xtype      : 'cbcity',
                                                    fieldLabel : 'City',
                                                    name       : 'company_city_id',
                                                },
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Phone',
                                                    name       : 'company_phone',
                                                },
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Fax',
                                                    name       : 'company_fax',
                                                }
                                            ]
                                        },
                                        {
                                            defaults : {
                                                padding : '5px 0 0 0',
                                                width   : '100%'
                                            },
                                            items : [
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Zipcode',
                                                    name       : 'company_zipcode',
                                                    maxLength  : 15
                                                },
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Ext',
                                                    name       : 'company_phoneext',
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
                                    xtype      : 'xaddressfieldEST',
                                    fieldLabel : 'Address',
                                    name       : 'emergency_address',
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
                                            margin     : '0 20px 0 110px',
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Home phone',
                                            name       : 'emergency_phone',
                                        },
                                        {
                                            padding    : '0 0 0 0',
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Mobile Phone',
                                            name       : 'emergency_mobilephone',
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
				   /* start added by ahmad riadi */
                {xtype: 'panel', bodyPadding: 10, title: 'Create / Update User information', collapsible: true,
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
                                            margin: '0 0 0 0',
                                            fieldLabel: 'User added by',
                                            name: 'addname',
                                            readOnly: true,
                                        },
                                        {
                                            margin: '0 0 0 0',
                                            fieldLabel: 'User edited by',
                                            name: 'modiname',
                                            readOnly: true,
                                        },
                                    ]
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
                                            padding: '0 0 0 0',
                                            fieldLabel: 'User added date',
                                            name: 'Addon',
                                            readOnly: true,
                                        },
                                        {
                                            padding: '0 0 0 0',
                                            fieldLabel: 'User edited date',
                                            name: 'Modion',
                                            readOnly: true,
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
                 /* end added by ahmad riadi */
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

