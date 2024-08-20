Ext.define('Erems.view.mastercustomer.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastercustomerformdata',
    requires: ['Erems.library.template.component.Purposecombobox',
        'Erems.library.template.component.Maritalstatuscombobox',
        'Erems.library.template.component.Nationalitycombobox',
        'Erems.library.template.component.Citycombobox',
        'Erems.library.template.view.combobox.Religion',
        'Erems.library.template.view.combobox.Education'
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
            items: [{xtype: 'panel', bodyPadding: 10, title: 'GENERAL INFORMATION',
                    items: [{layout: 'hbox', bodyStyle: 'border:0px', itemId: 'fd_panel_top',
                            items: [{xtype: 'panel',
                                    itemId: 'fd_panel_top_b',
                                    bodyStyle: 'border:0px',
                                    flex: 6,
                                    items: [
                                        {
                                            // bodyPadding: 10,

                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '95%',
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    itemId: 'fd_id',
                                                    name: 'customer_id'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Code',
                                                    name: 'code',
                                                    itemId: 'fd_code',
                                                    minLength: 2,
                                                    allowBlank: true

                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'checkboxfield',
                                                    itemId: 'fd_temporary_name',
                                                    fieldLabel: 'Temporary name',
                                                    name: 'temporary_name',
                                                    flex: 1,
                                                    inputValue: '1',
                                                    uncheckedValue: '0'
                                                }]
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Customer name',
                                            width: '95%',
                                            labelWidth: 50,
                                            name: 'name',
                                            minLength: 8,
                                            itemId: 'fd_name',
                                            enableKeyEvents: true,
                                            allowBlank: true,
                                            maskRe: /[a-z0-9_ ]/i,
                                            regex: /^[a-zA-Z0-9_ ]+$/,
                                            regexText: 'Only alphanumeric characters allowed'
                                        }, {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Address',
                                            width: '95%',
                                            labelWidth: 50,
                                            name: 'address'
                                        }, {
                                            xtype: 'hiddenfield',
                                            itemId: 'fd_photo_text',
                                            name: 'photo'
                                        }, {
                                            xtype: 'form',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'filefield',
                                                    itemId: 'fd_photo',
                                                    name: 'photo_browse',
                                                    fieldLabel: 'Photo',
                                                    emptyText: 'Select an image',
                                                    buttonText: 'Browse'


                                                }]


                                        },
                                    ]
                                }, {xtype: 'panel',
                                    height:200,
                                    bodyStyle: 'background:none',
                                    itemId: 'photo_image',
                                    html: '',
                                    flex: 2
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'citycombobox',
                                    fieldLabel: 'City',
                                    anchor: '-5',
                                    name: 'city_city_id',
                                    itemId: 'fd_cb_city',
                                    flex: 1,
                                    allowBlank: true
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zip code',
                                    anchor: '-5',
                                    name: 'zipcode',
                                    flex: 1
                                }]
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Home phone',
                                    anchor: '-5',
                                    name: 'home_phone',
                                    flex: 1,
                                    allowBlank: true
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Mobile phone',
                                    anchor: '-5',
                                    name: 'mobile_phone',
                                    flex: 1
                                }]
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Office phone',
                                    anchor: '-5',
                                    name: 'office_phone',
                                    flex: 1
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'FAX',
                                    anchor: '-5',
                                    name: 'fax',
                                    flex: 1
                                }]
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'KTP Number',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'KTP_number',
                            allowBlank: true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'KTP Name',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'KTP_name',
                            allowBlank: true
                        }, {
                            xtype: 'textareafield',
                            fieldLabel: 'KTP Address',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'KTP_address',
                            allowBlank: true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'NPWP Number',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'NPWP'
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Place of birth',
                                    anchor: '-5',
                                    name: 'birthplace',
                                    flex: 1,
                                    allowBlank: true
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: 'Birthdate',
                                    itemId: 'fd_birthdate',
                                    anchor: '-5',
                                    name: 'birthdate',
                                    allowBlank: true,
                                    maxValue: new Date(),
                                    flex: 1
                                }]
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'maritalstatuscombobox',
                                    itemId: 'fd_cb_maritalstatus',
                                    name: 'marital_status',
                                    flex: 1,
                                    anchor: '-5',
                                    allowBlank: true
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Children',
                                    anchor: '-5',
                                    name: 'children',
                                    value: 0,
                                    minValue: 0,
                                    maxValue: 30,
                                    flex: 1
                                }]
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'nationalitycombobox',
                                    itemId: 'fd_cb_nationality',
                                    name: 'nationality',
                                    flex: 1
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'cbreligion',
                                    storeUrl: 'mastercustomer',
                                    anchor: '-5',
                                    name: 'religion_religion_id',
                                    bindPrefixName: "Mastercustomer",
                                    flex: 1
                                }]
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'purposecombobox',
                                    itemId: 'fd_cb_purpose',
                                    name: 'purpose_purpose_id',
                                    flex: 1,
                                    anchor: '-5'
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'cbeducation',
                                    storeUrl: 'mastercustomer',
                                    anchor: '-5',
                                    name: 'education_education_id',
                                    bindPrefixName: "Mastercustomer",
                                    flex: 1
                                }]
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            vtype: 'email',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'email',
                            allowBlank: true
                        }

                    ]
                },
                /* Company Information */
                {xtype: 'panel', title: 'COMPANY INFORMATION', bodyPadding: 10,
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Company name',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'company_name'
                        }, {
                            xtype: 'textareafield',
                            fieldLabel: 'Company Address',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'company_address'
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'citycombobox',
                                    fieldLabel: 'City',
                                    anchor: '-5',
                                    name: 'company_city_id',
                                    itemId: 'fd_cb_company_city',
                                    flex: 1
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zip code',
                                    anchor: '-5',
                                    name: 'company_zipcode',
                                    flex: 1
                                }]
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Phone',
                                    anchor: '-5',
                                    name: 'company_phone',
                                    flex: 1
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ext',
                                    anchor: '-5',
                                    name: 'company_phonext',
                                    flex: 1
                                }]
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'FAX',
                                    anchor: '-5',
                                    name: 'company_fax',
                                    flex: 1
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'label',
                                    text: '',
                                    flex: 1
                                }]
                        }]
                },
                /** EMERGENCY CALL */
                {xtype: 'panel', bodyPadding: 10, title: 'EMERGENCY CALL',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Name',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'emergency_name'
                        }, {
                            xtype: 'textareafield',
                            fieldLabel: 'Address',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'emergency_address'
                        }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Home phone',
                                    anchor: '-5',
                                    name: 'emergency_phone',
                                    flex: 1
                                }, {
                                    xtype: 'splitter', width: 10,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Mobile phone',
                                    anchor: '-5',
                                    name: 'emergency_mobilephone',
                                    flex: 1
                                }]
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Family status',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'emergency_status'
                        }]
                },
                /* LOGIN INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'LOGIN INFORMATION',
                    items: [{
                            bodyPadding: 10,
                            layout: 'hbox',
                            bodyStyle: 'background-color:#FFFF99;border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Username',
                                    name: 'userid',
                                    itemId: 'fd_username',
                                    readOnly: true,
                                    allowBlank: true,
                                    flex: 1

                                }, {
                                    xtype: 'splitter', width: 20,
                                }, {
                                    xtype: 'textfield',
                                    fieldLabel: 'Password',
                                    name: 'password',
                                    allowBlank: true,
                                    inputType: 'password',
                                    readOnly: true,
                                    flex: 1
                                }]
                        }, {
                            xtype: 'textareafield',
                            fieldLabel: 'Description',
                            padding: '10px 0 0 0',
                            width: '100%',
                            labelWidth: 30,
                            name: 'description'
                        }]
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

