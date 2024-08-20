Ext.define('Erems.view.masterdocumentcustomer.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterdocumentcustomerformdata',
    requires: [
        'Erems.library.template.component.Purposecombobox',
        'Erems.library.template.component.Purposebuycombobox',
        'Erems.library.template.component.Maritalstatuscombobox',
        'Erems.library.template.component.Nationalitycombobox',
        'Erems.library.template.component.Citycombobox',
        'Erems.library.template.view.combobox.Religion',
        'Erems.library.template.view.combobox.Education',
        'Erems.library.template.view.combobox.City',
        'Erems.library.template.view.combobox.Purpose',
        'Erems.library.template.view.combobox.Purposebuy',
        /* start added by ahmad riadi */
        'Erems.library.template.view.combobox.Provinsi',
        'Erems.library.template.view.combobox.Documenttype',
        'Erems.library.template.view.combobox.Bentukusaha',
        'Erems.library.template.view.combobox.Instrumentpembayaran',
        'Erems.library.template.component.Kewarganegaraancombobox',
		'Erems.library.template.component.Gendercombobox',
                /* end added by ahmad riadi */
        'Erems.library.template.view.combobox.NPWP_KLU',
        'Erems.library.template.view.combobox.NPWP_Klasifikasiusaha',
        'Erems.library.template.component.Npwpstatuscombobox',


        'Erems.library.template.view.combobox.NPWP_KLU',

        // 'Erems.view.masterdocumentcustomer.GridDocument'
        'Erems.view.masterdocumentcustomer.GridDocument',
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
            /* CUSTOMER INFORMATION */
            {
                xtype: 'panel', bodyPadding: 10, title: 'CUSTOMER INFORMATION', collapsible: true,
                width: '100%',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        items: [
                            {
                                xtype: 'panel',
                                width: '100%',
                                flex: 3,
                                bodyStyle: 'border:0px',
                                items: [
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'hiddenfield',
                                            name: 'customer_id'
                                        }, 
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Customer ID',
                                            anchor: '-5',
                                            name: 'code',
                                            flex: 3,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2;'
                                        }, {
                                            xtype: 'splitter', width: 5,
                                        }, {
                                            xtype: 'button',
                                            text: 'Browse Customer',
                                            width: 120,
                                            padding: '2px 5px',
                                            itemId: 'fd_browse_customer_btn',
                                            action: 'browse_customer',
                                            iconCls: 'icon-search',
                                            style: 'background-color:#FFC000;'
                                        },
                                        {
                                            xtype: 'label', flex: 5
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Customer Name',
                                            anchor: '-5',
                                            name: 'name',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'xaddressfieldEST',
                                            fieldLabel: 'Alamat Koresponden',
                                            anchor: '-5',
                                            name: 'address',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'combobox',
                                            fieldLabel: 'City',
                                            anchor: '-5',
                                            name: 'city_city_name',
                                            displayField: 'city_name',
                                            valueField: 'city_id',
                                            queryMode: 'local',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                            editable: false
                                        }, {
                                            xtype: 'splitter', width: 20,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Zip Code',
                                            anchor: '-5',
                                            name: 'zipcode',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Home phone',
                                            name       : 'home_phone',
                                            flex       : 1,
                                            readOnly   : true,
                                            anchor     : '-5',
                                            fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                        }, {
                                            xtype: 'splitter', width: 20,
                                        }, {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Mobile phone',
                                            name       : 'mobile_phone',
                                            flex       : 1,
                                            readOnly   : true,
                                            anchor     : '-5',
                                            fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'Office phone',
                                            name       : 'office_phone',
                                            flex       : 1,
                                            readOnly   : true,
                                            anchor     : '-5',
                                            fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                        }, {
                                            xtype: 'splitter', width: 20,
                                        }, {
                                            xtype      : 'xphonenumberfieldEST',
                                            fieldLabel : 'FAX',
                                            anchor     : '-5',
                                            name       : 'fax',
                                            flex       : 1,
                                            readOnly   : true,
                                            fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'KTP Number',
                                            anchor: '-5',
                                            name: 'KTP_number',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        padding   : '10px 0 0 0',
                                        layout    : 'hbox',
                                        bodyStyle : 'border:0px',
                                        items     : [
                                            {
                                                xtype      : 'xaddressfieldEST',
                                                fieldLabel : 'KTP Address',
                                                anchor     : '-5',
                                                name       : 'KTP_address',
                                                flex       : 1,
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                            }
                                        ]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{

                                            xtype: 'maskfield',
                                            mask: '##.###.###.#-###.###',
                                            fieldLabel: 'NPWP Number',
                                            anchor: '-5',
                                            name: 'NPWP',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'NPWP Name',
                                            anchor: '-5',
                                            name: 'NPWP_name',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    {
                                        padding   : '10px 0 0 0',
                                        layout    : 'hbox',
                                        bodyStyle : 'border:0px',
                                        items     : [
                                            {
                                                xtype      : 'xaddressfieldEST',
                                                fieldLabel : 'NPWP Address',
                                                anchor     : '-5',
                                                name       : 'NPWP_address',
                                                flex       : 1,
                                                readOnly   : true,
                                                fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                            }
                                        ]
                                    },
                                    {
                                        //  bodyPadding: 10,
                                        padding: '10px 0 0 0',
                                        layout: 'hbox',
                                        bodyStyle: 'border:0px',
                                        items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Email Address',
                                            anchor: '-5',
                                            name: 'email',
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                    },
                                    // {
                                    //     //  bodyPadding: 10,
                                    //     padding: '10px 0 0 0',
                                    //     layout: 'hbox',
                                    //     bodyStyle: 'border:0px',
                                    //     items: [{
                                    //         xtype: 'checkboxfield',
                                    //         fieldLabel: '',
                                    //         name: 'is_more_customer',
                                    //         boxLabel: 'Add More Customer',
                                    //         inputValue: '1',
                                    //         uncheckedValue: '0',
                                    //         //                                                        hidden: true
                                    //         //  margin: '0 5px 0 0',
                                    //         //                                                        width: 80
                                    //     }]
                                    // },
                                ]
                            },
                            // {
                            //     xtype: 'panel',
                            //     flex: 1,
                            //     width: '100%',
                            //     padding: '10px 0 0 10px',
                            //     bodyStyle: 'border:0px',
                            //     items: [
                            //         /*  {
                            //          xtype: 'panel',
                            //          itemId: 'photo_image', flex: 1, height: 200, bodyStyle: 'background:none;background-color:#F2F2F2;',
                            //          padding: '0 0 10px 0'},*/
                            //         {
                            //             xtype: 'panel',
                            //             height: 200,
                            //             bodyStyle: 'background:none',
                            //             itemId: 'photo_image',
                            //             html: '',
                            //             // flex: 1,
                            //             width: 160
                            //         },
                            //         {
                            //             xtype: 'button', text: 'Create New Customer',
                            //             flex: 1,
                            //             padding: 5,
                            //             margin: '5px 0',
                            //             action: 'create_new_customer',
                            //             iconCls: 'icon-add'
                            //         }
                            //     ]
                            // }
                        ]
                    },
                    // {
                    //     //  bodyPadding: 10,
                    //     padding: '10px 0 0 0',
                    //     layout: 'hbox',
                    //     bodyStyle: 'border:0px',
                    //     width: '100%',
                    //     items: [{
                    //         xtype: 'mastercustomergriddocument',
                    //         width: '100%',
                    //         itemId: 'CGrid',
                    //         // hidden: true,

                    //     }]
                    // },
                ]
            },

            {
                xtype: 'panel', bodyPadding: 10, title: 'DOCUMENT CUSTOMER', collapsible: true,
                width: '100%',
                items: [
                    {
                        //  bodyPadding: 10,
                        // padding: '10px 0 0 0',
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        width: '100%',
                        items: [{
                            xtype: 'masterdocumentcustomergriddocument',
                            width: '100%',
                            itemId: 'MyScheduleGrid'

                        }]
                    },
                ]
            },

            {
                xtype: 'panel', bodyPadding: 10, title: 'DOWNLOAD DOCUMENT HISTORY', collapsible: true,
                width: '100%',
                items: [
                    {
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        width: '100%',
                        items: [{
                            xtype: 'masterdocumentcustomergriddocumenthistory',
                            width: '100%',
                            itemId: 'MyScheduleGrid'

                        }]
                    },
                ]
            },

            {
                xtype: 'panel', bodyPadding: 10, title: 'PHONE CUSTOMER', collapsible: true,
                width: '100%',
                items: [
                    {
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        width: '100%',
                        items: [{
                            xtype: 'masterdocumentcustomergriddocumentphone',
                            width: '100%',
                            itemId: 'MyScheduleGrid'

                        }]
                    },
                ]
            },

            {
                xtype: 'panel', bodyPadding: 10, title: 'LOG KOMUNIKASI CUSTOMER', collapsible: true,
                width: '100%',
                items: [
                    {
                        layout: 'hbox',
                        bodyStyle: 'border:0px',
                        width: '100%',
                        items: [{
                            xtype: 'masterdocumentcustomergriddocumentkomunikasi',
                            width: '100%',
                            itemId: 'MyScheduleGrid'

                        }]
                    },
                ]
            },

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
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    // {
                    //     xtype: 'button',
                    //     action: 'documents',
                    //     itemId: 'btnDocuments',
                    //     padding: 5,
                    //     width: 100,
                    //     iconCls: 'icon-archive',
                    //     text: 'Documents'
                    // },
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