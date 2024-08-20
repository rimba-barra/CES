Ext.define('Erems.view.mastercustomer.FormDataRevision', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastercustomerformdatarevision',
    requires: ['Erems.library.template.component.Purposecombobox',
        'Erems.library.template.component.Maritalstatuscombobox',
        'Erems.library.template.component.Nationalitycombobox',
        'Erems.library.template.component.Citycombobox',
        'Erems.library.template.view.combobox.Religion',
        'Erems.library.template.view.combobox.Education',
        'Erems.library.template.view.combobox.City',
        'Erems.library.template.view.combobox.Purpose',
        /* start added by ahmad riadi */
        'Erems.library.template.view.combobox.Provinsi',
        'Erems.library.template.view.combobox.Documenttype',
        'Erems.library.template.view.combobox.Bentukusaha',
        'Erems.library.template.view.combobox.Instrumentpembayaran',
        'Erems.library.template.component.Kewarganegaraancombobox',
		'Erems.library.template.component.Gendercombobox',
                /* end added by ahmad riadi */
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    height: 500,
    editedRow: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
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
                /* start tab fot general */
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
                                                    itemId: 'fd_tmp_id',
                                                    name: 'customer_tmp_id'
                                                },
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
                                            maskRe: /[a-z0-9_ &]/i,
                                            regex: /^[a-zA-Z0-9_ &]+$/,
                                            regexText: 'Only alphanumeric characters allowed'
                                        },
										{
                                            xtype: 'gendercombobox',
                                            fieldLabel: 'Jenis Kelamin',
                                            name: 'gender',
                                            allowBlank: false,
                                            width: 240,
                                        },
                                        {
                                            xtype      : 'xaddressfieldEST',
                                            fieldLabel : 'Address',
                                            name       : 'address',
                                            allowBlank : false
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: '100%',
                                            fieldLabel: 'Pekerjaan<br>(Sesuai KTP)',
                                            name: 'general_pekerjaan',
                                            readOnly: false,
                                            flex: 1,
                                            margin: '0 100px 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: '100%',
                                            fieldLabel: 'Pekerjaan<br>(Terbaru)',
                                            name: 'general_pekerjaan_baru',
                                            readOnly: false,
                                            flex: 1,
                                            margin: '0 100px 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: '100%',
                                            fieldLabel: 'Bidang Usaha Pekerjaan',
                                            name: 'general_bidang_pekerjaan_baru',
                                            readOnly: false,
                                            flex: 1,
                                            margin: '0 100px 0 0'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    boxLabel: 'change KTP Address?',
                                                    margin: '0px 100px 0px 0px',
                                                    fieldLabel: ' ',
                                                    name: 'is_change_ktpaddress'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Multi Address',
                                                    action: 'multi_address'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'hiddenfield',
                                            itemId: 'fd_photo_text',
                                            name: 'photo'
                                        },
                                        // {
                                        //     xtype: 'filefield',
                                        //     fieldLabel: 'Photo',
                                        //     itemId: 'fd_photo',
                                        //     name: 'photo_browse',
                                        // }
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
                                },
                               
                            ]
                        },
                        {
                            xtype    : 'container',
                            layout   : 'hbox',
                            defaults : {
                                xtype  : 'container',
                                layout : 'vbox',
                                flex   : 1
                            },
                            items : [
                                {
                                    margin   : '0 20px 0 0 0',
                                    defaults : {
                                        padding : '5px 0 0 0',
                                        width   : '100%'
                                    },
                                    items: [
                                         
                                        {
                                            xtype      : 'xgeneralfieldEST',
                                            fieldLabel : 'Gelar',
                                            name       : 'general_gelar',
                                            allowBlank : true,
                                        },
                                        {
                                            xtype          : 'cbprovinsi',
                                            name           : 'general_province_id',
                                            bindPrefixName : "Mastercustomerrevision",
                                            storeUrl       : 'mastercustomertmp',
                                        },
                                        {
                                            xtype      : 'xgeneralfieldEST',
                                            fieldLabel : 'Kecamatan',
                                            name       : 'general_kecamatan',
                                            allowBlank : false,
                                        },
                                        {
                                            xtype      : 'xnumericfieldEST',
                                            fieldLabel : 'RT',
                                            allowBlank : false,
                                            name       : 'general_rt',
                                            maxLength  : 3
                                        },
                                        {
                                            xtype      : 'xnumericfieldEST',
                                            fieldLabel : 'Zipcode',
                                            name       : 'zipcode',
                                            maxLength  : 15
                                        },
                                    ]
                                },
                                {
                                    defaults: {
                                        padding : '5px 0 0 0',
                                        width   : '100%'
                                    },
                                    items: [
                                        {
                                            xtype      : 'xnumericfieldEST',
                                            name       : 'general_virtualaccount_no',
                                            fieldLabel : 'No. Virtual Account',
                                            allowBlank : true,
                                        },
                                        {
                                            xtype      : 'cbcity',
                                            name       : 'city_city_id',
                                            fieldLabel : 'City',
                                            allowBlank : false,
                                        },
                                        {
                                            xtype      : 'xgeneralfieldEST',
                                            name       : 'general_kelurahan',
                                            fieldLabel : 'Kelurahan',
                                            allowBlank : false,
                                        },
                                        {
                                            xtype      : 'xnumericfieldEST',
                                            name       : 'general_rw',
                                            fieldLabel : 'RW',
                                            allowBlank : false,
                                            maxLength  : 3
                                        },
                                    ]
                                }
                            ]
                        },
                        /* start container 1 for general */
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
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Home Phone',
                                            name       : 'home_phone',
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Office Phone',
                                            name       : 'office_phone'
                                        },
                                        {
                                            fieldLabel : 'Place of birth',
                                            name       : 'birthplace'
                                        },
                                        {
                                            xtype: 'maritalstatuscombobox',
                                            fieldLabel: 'Marital Status<br>(Sesuai KTP)',
                                            allowBlank: false,
                                            name: 'marital_status'
                                        },
                                        {
                                            xtype: 'maritalstatuscombobox',
                                            fieldLabel: 'Marital Status<br>(Terbaru)',
                                            allowBlank: false,
                                            name: 'marital_status_baru'
                                        },
                                        {
                                            xtype: 'kewarganegaraancombobox',
                                            fieldLabel: 'Kewarganegaraan',
                                            //allowBlank: false,
                                            name: 'general_kewarganegaraan'
                                        },
                                        {
                                            fieldLabel: 'Nationality',
                                            //allowBlank: false,
                                            name: 'nationality'
                                        },
                                        {
                                            /*note : wajib diisi jika status WNA */
                                            fieldLabel: 'WNA Code',
                                            allowBlank: true,
                                            name: 'general_kodewna'
                                        },                                       
                                        {
                                            xtype: 'cbpurpose',
                                            name: 'purpose_purpose_id',
                                            allowBlank: false,
                                            hidden:true,
                                            fieldLabel: 'Purpose'
                                        },
                                        {
                                            xtype: 'cbpurposebuy',
                                            name: 'purposebuy_purposebuy_id',
                                            allowBlank: false,
                                            fieldLabel: 'Purpose Buy'
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
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Mobile Phone',
                                            name       : 'mobile_phone'
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'FAX',
                                            name       : 'fax'
                                        },
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
                                            //allowBlank: false,
                                            storeUrl: 'mastercustomertmp',
                                            name: 'religion_religion_id',
                                            bindPrefixName: "Mastercustomerrevision"
                                        },
                                        {
                                            fieldLabel: 'Education',
                                            xtype: 'cbeducation',
                                            storeUrl: 'mastercustomertmp',
                                            anchor: '-5',
                                            name: 'education_education_id',
                                            bindPrefixName: "Mastercustomerrevision",
                                        },
                                        {
                                            fieldLabel: 'No. Kartu Keluarga',
                                            xtype: 'textfield',
                                            allowBlank: true,
                                            name: 'KK_number',
                                        }
                                    ]
                                }
                            ]
                        },
                        /* end container 1 for general */

                        /* start container 2 for general */
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
                                    fieldLabel: 'Email',
                                    name: 'email'
                                }
                            ]
                        },
                        /* start container 2 for general */

                    ]
                },
                /* end tab fot general */


                /* start panel identitas */
                {xtype: 'panel', bodyPadding: 10, title: 'IDENTITY DOCUMENT INFORMATION', collapsible: true,
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
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    align: 'right',
                                    bodyBorder: false,
                                    defaults: {
                                        layout: 'fit'
                                    },
                                    items: [
                                        {
                                            xtype: 'cbdocumenttype',
                                            name: 'identitas_documenttype_id',
                                            bindPrefixName: "Mastercustomerrevision",
                                            storeUrl: 'mastercustomertmp',
                                            width: 300,
                                        },
                                    ]
                                },
                                {
                                    fieldLabel: 'Doc Number',
                                    allowBlank: false,
                                    name: 'KTP_number'
                                },
                                {
                                    fieldLabel: 'Doc Name',
                                    name: 'KTP_name'
                                },
                                {
                                    xtype      : 'xaddressfieldEST',
                                    fieldLabel : 'Doc Address',
                                    name       : 'KTP_address'
                                },
                                /*start container 1 */
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'vbox',
                                        flex: 1
                                    },
                                    items: [
                                        /*start left */
                                        {
                                            defaults: {
                                                padding : '5px 0 0 0', // top,right,bottom,left
                                                width   : '100%'
                                            },
                                            items: [
                                                {
                                                    xtype          : 'cbprovinsi',
                                                    name           : 'identitas_province_id',
                                                    bindPrefixName : "Mastercustomerrevision",
                                                    storeUrl       : 'mastercustomertmp',
                                                },
                                                {
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'Kecamatan',
                                                    name       : 'identitas_kecamatan'
                                                },
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'RT',
                                                    name       : 'identitas_rt',
                                                    maxLength  : 3
                                                },
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Kode Pos',
                                                    name       : 'identitas_kodepos',
                                                    maxLength  : 15
                                                },
                                            ]
                                        },
                                        /*end left */
                                        /*start right */
                                        {
                                            defaults : {
                                                padding : '5px 0 0 20px', // top,right,bottom,left
                                                width   : '100%'
                                            },
                                            items : [
                                                {
                                                    xtype      : 'cbcity',
                                                    fieldLabel : 'City',
                                                    allowBlank : false,
                                                    name       : 'identitas_city_id'
                                                },
                                                {
                                                    xtype      : 'xgeneralfieldEST',
                                                    fieldLabel : 'Kelurahan',
                                                    name       : 'identitas_kelurahan'
                                                },
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'RW',
                                                    name       : 'identitas_rw',
                                                    maxLength  : 3
                                                },
                                            ]
                                        },
                                    ]
                                },
                                /*end container 1 */

                            ]

                        },
                    ]
                },
                /* end panel identitas */


                /* start panel npwp */
                {xtype: 'panel', bodyPadding: 10, title: 'NPWP DOCUMENT INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype    : 'container',
                            layout   : 'vbox',
                            defaults : {
                                padding : '5px 0 0 0',
                                width   : '100%'
                            },
                            items : [
                                {
                                    xtype      : 'xnumericfieldEST',
                                    fieldLabel : 'NPWP Number',
                                    name       : 'NPWP',
                                    allowBlank : false, /* added by ahmad riadi 27-12-2016  */
                                },
                                {
                                    xtype      : 'xaddressfieldEST',
                                    fieldLabel : 'NPWP Address',
                                    name       : 'NPWP_address',
                                    allowBlank : false, /* added by ahmad riadi 27-12-2016  */
                                },
                            ]
                        },
                    ]
                },
                /* end panel npwp */


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
                                    xtype: 'checkboxfield',
                                    fieldLabel: 'Badan Hukum',
                                    name: 'ppatk_badanhukum',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                   // checked: true,
                                    width: 20
                                },
                                {
                                    fieldLabel: 'Company Name',
                                    name: 'company_name'
                                },
                                {
                                    fieldLabel: 'Company PIC',
                                    name: 'company_pic'
                                },
                                {
                                    xtype      : 'xaddressfieldEST',
                                    fieldLabel : 'Company Address',
                                    name       : 'company_address'
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
                                            items : [
                                                {
                                                    xtype      : 'cbcity',
                                                    fieldLabel : 'City',
                                                    name       : 'company_city_id',
                                                },
                                                {
                                                    xtype      : 'textfield',
                                                    fieldLabel : 'Email',
                                                    name       : 'company_email'
                                                },
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Phone',
                                                    name       : 'company_phone'
                                                },
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Fax',
                                                    name       : 'company_fax'
                                                }
                                            ]
                                        },
                                        {
                                            defaults: {
                                                padding: '5px 0 0 0',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Zipcode',
                                                    name       : 'company_zipcode',
                                                    maxLength  : 15
                                                },
                                                {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Ext',
                                                    name       : 'company_phoneext'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype      : 'xgeneralfieldEST',
                                    fieldLabel : 'Position',
                                    name       : 'company_position'
                                },
                                /*start container 1 */
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'vbox',
                                        flex: 1
                                    },
                                    items: [
                                        /*start left */
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '5px 0 0 0', // top,right,bottom,left
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Akta Pendirian',
                                                    name: 'company_aktapendirian'
                                                },
                                                {
                                                    fieldLabel: 'Akta Perubahan',
                                                    name: 'company_aktaperubahan'
                                                },
                                                {
                                                    fieldLabel: 'Akta Susunan Pengurus',
                                                    name: 'company_aktasusunanpengurus'
                                                },
                                            ]
                                        },
                                        /*end left */
                                        /*start right */
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                padding: '5px 0 0 20px', // top,right,bottom,left
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    itemId: 'fd_tanggalaktapendirian',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    allowBlank: false,
                                                    fieldLabel: 'Tanggal akta',
                                                    name: 'company_tanggalaktapendirian'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    itemId: 'fd_tanggalaktaperubahan',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    allowBlank: false,
                                                    fieldLabel: 'Tanggal perubahan',
                                                    name: 'company_tanggalaktaperubahan'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    itemId: 'fd_tanggalaktasusunanpengurus',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    allowBlank: false,
                                                    fieldLabel: 'Tanggal pengurus',
                                                    name: 'company_tanggalaktasusunanpengurus'
                                                },
                                            ]
                                        },
                                        /*end right */

                                    ]
                                },
                                /*end container 1 */
                            ]
                        }
                    ]
                },
                     /* start panel ppatk */
                {xtype: 'panel', bodyPadding: 10, title: 'PPATK INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'textfield',
                                padding: '5px 0 0 0', // top,right,bottom,left
                                width: '100%'
                            },
                            items: [
                                 {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
                                    bodyBorder: false,
                                    defaults: {
                                        layout: 'fit',
                                        xtype: 'textfield',
                                        padding: '5px 50px 0 0',// top,right,bottom,left
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'cbbentukusaha',
                                            name: 'ppatk_bentukusaha_id',
                                            bindPrefixName: "Mastercustomerrevision",
                                            storeUrl: 'mastercustomertmp',
                                            width: 300
                                         },
                                          {
                                            fieldLabel: 'Bidang usaha',
                                            name: 'ppatk_bidangusaha',
                                        },
                                        {
                                            fieldLabel: 'Bila lainnya sebutkan',
                                            name: 'ppatk_bilalain',
                                        },
                                       {
                                            xtype: 'cbinstrumentpembayaran',
                                            name: 'ppatk_instrumentpembayaran_id',
                                            bindPrefixName: "Mastercustomerrevision",
                                            storeUrl: 'mastercustomertmp',
                                            width: 300
                                         },
                                          {
                                            fieldLabel: 'No Rek./Wakat yg digunakan',
                                            name: 'ppatk_rekeningwakat_no',
                                        },
                                         {
                                            fieldLabel: 'Rincian Transaksi',
                                            name: 'ppatk_rinciantransaksi',
                                        },
                                         {
                                            fieldLabel: 'Sumber Dana',
                                            name: 'ppatk_sumberdana',
                                        },
                                         {
                                            fieldLabel: 'No.Rekening transaksi',
                                            name: 'ppatk_rekeningtrans_no',
                                        },
                                        {
                                            fieldLabel: 'Nama yang berwenang mewakili',
                                            name: 'ppatk_namawali',
                                        },
                                    ]
                                },
                               
                            ]
                        },
                    ]
                },
                /* end panel ppatk */
                {xtype: 'panel', bodyPadding: 10, title: 'EMERGENCY CALL', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype    : 'container',
                            layout   : 'vbox',
                            defaults : {
                                padding : '5px 0 0 0',
                                width   : '100%'
                            },
                            items: [
                                {
                                    xtype      : 'xnamefieldEST',
                                    fieldLabel : 'Name',
                                    name       : 'emergency_name'
                                },
                                {
                                    xtype      : 'xaddressfieldEST',
                                    fieldLabel : 'Address',
                                    name       : 'emergency_address'
                                },
                                {
                                    xtype    : 'container',
                                    layout   : 'hbox',
                                    defaults : {
                                        padding : '5px 0 0 0',
                                        width   : '100%',
                                        flex    : 1
                                    },
                                    items: [
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            margin     : '0 20px 0 110px',
                                            fieldLabel : 'Home phone',
                                            name       : 'emergency_phone'
                                        },
                                        {
                                            xtype      : 'xphonenumberfieldEST',
                                            padding    : '0 0 0 0',
                                            fieldLabel : 'Mobile Phone',
                                            name       : 'emergency_mobilephone'
                                        }
                                    ]
                                },
                                {
                                    xtype      : 'xgeneralfieldEST',
                                    fieldLabel : 'Family Status',
                                    name       : 'emergency_status',
                                    padding    : '10px 0 0 0',
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
                                    xtype      : 'xnotefieldEST',
                                    padding    : '10px 0 0 0',
                                    width      : '100%',
                                    fieldLabel : 'Description',
                                    name       : 'description'
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
    generateDockedItem: function () {
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
                        hidden: true,
                        padding: 5,
                        width: 85,
                        iconCls: 'icon-approve',
                        text: ' Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'reject',
                        itemId: 'btnReject',
                        hidden: true,
                        padding: 5,
                        width: 85,
                        iconCls: 'icon-cancel',
                        text: ' Reject'
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
                        action: 'loadCurrentData',
                        itemId: 'btnCurrentData',
                        hidden: false,
                        padding: 5,
                        width: 120,
                        iconCls: 'icon-form',
                        text: ' Data Sekarang'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});

