Ext.define('Erems.view.purchaseletterSH2.FormData', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.library.template.view.combobox.Cluster2',
        // 'Erems.library.template.view.combobox.Block',
        // 'Erems.library.template.view.combobox.Kprstatus',
        // 'Erems.library.template.component.Pricetypecombobox',
        // 'Erems.library.template.view.combobox.Mediapromotion',
        // 'Erems.library.template.view.combobox.Saleslocation',
        // 'Erems.library.template.view.combobox.Bank',
        // 'Erems.library.template.view.combobox.Citraclub',
        // 'Erems.library.template.view.combobox.Salesman',
        // 'Erems.library.template.view.combobox.Collector',
        // 'Erems.library.template.view.FdUnitInformation',
        // 'Erems.library.template.view.combobox.Billingrules',
        // 'Erems.library.box.Mymoneyfield',
        // 'Erems.library.template.view.MoneyField',
        'Erems.library.template.view.combobox.DistributionChannel',
        'Erems.library.template.view.combobox.KomisiPencairan',
        'Erems.view.purchaseletterSH2.Schedulegrid',
        'Erems.view.purchaseletterSH2.Komisigrid'
    ],
    alias: 'widget.purchaseletterSH2formdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    editedRow: -1,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'side_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'unit_unit_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'customer_id'
                },
                {
                    xtype: 'panel', bodyPadding: 10,
                    items: [
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'PT',
                                    name: 'pt_name',
                                    flex: 1,
                                    readOnly: true,
                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel', bodyPadding: 10,
                    items: [
                        {
                            //  bodyPadding: 10,
                            padding: '0 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Nomor SP',
                                    name: 'purchaseletter_no',
                                    flex: 1,
                                    //readOnly: true,
                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                },
                                {
                                    xtype: 'splitter', width: 20
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: 'Tanggal SP',
                                    name: 'purchase_date',
                                    value: new Date(),
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d H:i:s.u',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel', bodyPadding: 10,
                    items: [
                        {
                            //  bodyPadding: 10,
                            padding: '0 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 120,
//                                    allowBlank: false,
                                    fieldLabel: 'First Purchase Date',
                                    name: 'firstpurchase_date',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d H:i:s.u',
                                    // format: 'd/m/Y',
                                    //  submitFormat: 'Y-m-d',
//                                    flex: 1,
                                    width:350,
                                }
                            ]
                        }
                    ]
                },

                {xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: ''
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle: 'background-color:#FFFF99;border:0px;padding:10px 20px',
                                    defaults: {
                                        xtype: 'textfield',
                                        margin: '0 10px 0 0',
                                        fieldStyle: 'background:none;background-color:#F2F2F2;',
                                        labelWidth: 45,
                                        readOnly: true
                                    },
                                    items: [
                                        {
                                            name: 'unitstatus_status',
                                            fieldLabel: 'Status',
                                            flex: 1

                                        },
                                        {
                                            name: 'unit_progress',
                                            fieldLabel: 'Progress',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'label',
                                            text: '%',
                                            width: 20
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '10px 0 0 0',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox',
                                flex: 1,
                                width: '100%'
                            },
                            items: [
                                {
                                    margin: '0 20px 0 0',
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: '100%',
                                        margin: '0 0 10px 0'
                                    },
                                    items: [
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'cluster_code',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    flex: 1,
                                                    readOnly: true,
                                                    margin: '0 5px 0 0'
                                                },
                                                {
                                                    name: 'cluster_cluster',
                                                    fieldLabel: '',
                                                    readOnly: true,
                                                    flex: 1
                                                }
                                            ]

                                        },
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'block_code',
                                                    fieldLabel: 'Block',
                                                    flex: 1,
                                                    readOnly: true,
                                                    margin: '0 5px 0 0'
                                                },
                                                {
                                                    name: 'block_block',
                                                    fieldLabel: '',
                                                    readOnly: true,
                                                    flex: 1
                                                }
                                            ]

                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: '100%',
                                                    name: 'unit_unit_number',
                                                    fieldLabel: 'Unit Number',
                                                    margin: '0 5px 0 0',
                                                    readOnly: true,
                                                    flex: 2
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Browse Unit',
                                                    action: 'browse_unit',
                                                    flex: 1
                                                },
                                                /*
                                                {
                                                    xtype: 'container',
                                                    id: 'new_buttonBrowseID',
                                                    html: '',
                                                    action: 'browse_unit2',
                                                    width: 50
                                                },
                                                */
                                                {
                                                    xtype: 'label',
                                                    text: '',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    margin: '0 20px 0 0',
                                    defaults: {
                                        xtype: 'container',
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'productcategory_productcategory',
                                                    fieldLabel: 'Product Category',
                                                    readOnly: true,
                                                    margin: '0 0 10px 0'
                                                },
                                                {
                                                    name: 'type_name',
                                                    readOnly: true,
                                                    fieldLabel: 'Type',
                                                }
                                            ]

                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                width: '100%',
                                                margin: '0 0 10px 0'
                                            },
                                            items: [
                                                {
                                                    defaults: {
                                                        margin: '0 10px 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'unit_land_size',
                                                            readOnly: true,
                                                            fieldLabel: 'Land Size',
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm2',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'unit_long',
                                                            fieldLabel: 'Long',
                                                            labelWidth: 45,
                                                            readOnly: true,
                                                            flex: 2
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm',
                                                            width: 20,
                                                            margin: '0 0 0 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        margin: '0 10px 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'unit_building_size',
                                                            readOnly: true,
                                                            fieldLabel: 'Building Size',
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm2',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'unit_width',
                                                            readOnly: true,
                                                            fieldLabel: 'Width',
                                                            labelWidth: 45,
                                                            flex: 2
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm',
                                                            width: 20,
                                                            margin: '0 0 0 0'
                                                        }
                                                    ]
                                                },
                                                {
                                                    defaults: {
                                                        margin: '0 10px 0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'unit_kelebihan',
                                                            readOnly: true,
                                                            fieldLabel: 'Kelebihan Tanah',
                                                            flex: 3
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: 'm2',
                                                            width: 30
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'unit_floor',
                                                            readOnly: true,
                                                            fieldLabel: 'Floor',
                                                            labelWidth: 45,
                                                            flex: 2
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            text: '',
                                                            width: 20,
                                                            margin: '0 0 0 0'
                                                        }
                                                    ]
                                                }

                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* CUSTOMER INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'CUSTOMER INFORMATION', collapsible: true,
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
                                                    name: 'customer_customer_id'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer ID',
                                                    anchor: '-5',
                                                    name: 'customer_code',
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
                                                    name: 'customer_name',
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
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Address',
                                                    anchor: '-5',
                                                    name: 'customer_address',
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
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Zip Code',
                                                    anchor: '-5',
                                                    name: 'customer_zipcode',
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
                                                    fieldLabel: 'Home phone',
                                                    anchor: '-5',
                                                    name: 'customer_home_phone',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Mobile phone',
                                                    anchor: '-5',
                                                    name: 'customer_mobile_phone',
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
                                                    fieldLabel: 'Office phone',
                                                    anchor: '-5',
                                                    name: 'customer_office_phone',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'FAX',
                                                    anchor: '-5',
                                                    name: 'customer_fax',
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
                                                    fieldLabel: 'KTP Number',
                                                    anchor: '-5',
                                                    name: 'customer_KTP_number',
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

                                                    xtype : 'maskfield',
                                                    mask: '##.###.###.#-###.###',                                                                                         
                                                    fieldLabel: 'NPWP Number',
                                                    anchor: '-5',
                                                    name: 'customer_NPWP',
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
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'NPWP Address',
                                                    anchor: '-5',
                                                    name: 'customer_NPWP_address',
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
                                                    fieldLabel: 'Email Address',
                                                    anchor: '-5',
                                                    name: 'customer_email',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        }



                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    width: '100%',
                                    padding: '10px 0 0 10px',
                                    bodyStyle: 'border:0px',
                                    items: [
                                        /*  {
                                         xtype: 'panel',
                                         itemId: 'photo_image', flex: 1, height: 200, bodyStyle: 'background:none;background-color:#F2F2F2;',
                                         padding: '0 0 10px 0'},*/
                                        {xtype: 'panel',
                                            height: 200,
                                            bodyStyle: 'background:none',
                                            itemId: 'photo_image',
                                            html: '',
                                            // flex: 1,
                                            width: 160
                                        },
                                        {
                                            xtype: 'button', text: 'Create New Customer',
                                            flex: 1,
                                            padding: 5,
                                            margin: '5px 0',
                                            action: 'create_new_customer',
                                            iconCls: 'icon-add'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'SALES INFORMATION', collapsible: true,
                    width: '100%',
                    itemId: 'salesInformationID',
                    items: [
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'cbdistributionchannel',
                                    fieldLabel: 'Distribution Channel',
                                    anchor: '-5',
                                    name: 'distribution_channel_id',
                                    flex: 3,
                                            itemId: 'distribution_channel_id',
                                    editable:false,
                                    enableKeyEvents: true
                                }
                                ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'cbkomisipencairan',
                                    fieldLabel: 'Skema Sales',
                                    anchor: '-5',
                                    name: 'komisi_pencairan_id',
                                    itemId:'komisi_pencairan_id',
                                    flex: 3,
                                    editable:false,
                                    enableKeyEvents: true
                                }
                                ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [{
                                    xtype: 'purchaseletterSH2komisigrid',
                                    // xtype: 'purchaseletterSH2schedulegrid',
                                    width: '100%',
                                    itemId: 'MyKomisiGrid'

                                }]
                        },
                        /*{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Salesman',
                                    anchor: '-5',
                                    name: 'salesman_employee_nik',
                                    flex: 2,
                                    enableKeyEvents: true
                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'cbsalesman',
                                    fieldLabel: '',
                                    anchor: '-5',
                                    name: 'salesman_employee_id',
                                    flex: 2
                                }, {
                                    xtype: 'label',
                                    flex: 3
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
                                    fieldLabel: 'Member name',
                                    name: 'clubcitra_member',
                                    flex: 1
                                }, {xtype: 'label', width: 100}]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Club Citra Group',
                                    anchor: '-5',
                                    name: 'citraclub_code',
                                    flex: 2,
                                    enableKeyEvents: true
                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'cbcitraclub',
                                    fieldLabel: '',
                                    anchor: '-5',
                                    name: 'citraclub_citraclub_id',
                                    itemId: 'citraclub_cb',
                                    flex: 2
                                }, {
                                    xtype: 'label',
                                    flex: 3
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Code KC',
                                    anchor: '-5',
                                    width: 205,
                                    name: 'upline_employee_name',
                                    //  flex: 2,
                                    enableKeyEvents: true
                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    fieldLabel: '',
                                    width: 205,
                                    anchor: '-5',
                                    margin: '0 20px 0px 0px',
                                    name: 'upline_upline_id',
                                    valueField: 'employee_id',
                                    displayField: 'employee_name',
                                    // flex: 2
                                }, {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',

                                    name: 'is_cac_referall',
                                    //  checked: true,
                                    boxLabel: 'Referall',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    //  margin: '0 5px 0 0',
                                    width: 80
                                            //flex:3
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
                                    fieldLabel: 'Member',
                                    anchor: '-5',
                                    width: 205,
                                    name: 'cac_cac_code',
                                    //  flex: 2,
                                    enableKeyEvents: true
                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'combobox',
                                    queryMode: 'local',
                                    fieldLabel: '',
                                    width: 205,
                                    anchor: '-5',
                                    margin: '0 20px 0px 0px',
                                    valueField: 'cac_id',
                                    displayField: 'cac_name',
                                    name: 'cac_cac_id',
                                    // flex: 2
                                }, {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',

                                    name: 'is_upline_referall',
                                    //  checked: true,
                                    boxLabel: 'Referall',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    //  margin: '0 5px 0 0',
                                    width: 80
                                            //flex:3
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
                                    fieldLabel: 'Sales Location',
                                    anchor: '-5',
                                    enableKeyEvents: true,
                                    name: 'saleslocation_code',
                                    flex: 2
                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'cbsaleslocation',
                                    fieldLabel: '',
                                    anchor: '-5',
                                    itemId: 'saleslocation_cb',
                                    name: 'saleslocation_saleslocation_id',
                                    flex: 2
                                }, {
                                    xtype: 'label',
                                    flex: 3
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Media Promotion',
                                    anchor: '-5',
                                    name: 'mediapromotion_code',
                                    enableKeyEvents: true,
                                    flex: 2

                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'cbmediapromotion',
                                    fieldLabel: '',
                                    anchor: '-5',
                                    itemId: 'mediapromotion_cb',
                                    name: 'mediapromotion_mediapromotion_id',
                                    flex: 2
                                }, {
                                    xtype: 'label',
                                    flex: 3
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [ {
                                    xtype: 'combobox',
                                    fieldLabel: 'Purpose buy',
                                    anchor: '-5',
                                    
                                    name: 'purposebuy_purposebuy_id',
                                  
                                     queryMode: 'local',
                                    displayField: 'purposebuy',
                                    valueField: 'purposebuy_id',
                                    flex: 4
                                }, {
                                    xtype: 'label',
                                    flex: 3
                                }]
                        }
                        */
                    ]
                },
                /*
                {xtype: 'panel', bodyPadding: 10, title: 'OTHER INFORMATION', id: 'PLCONotherInformationID', collapsible: true, collapsed: true,
                    width: '100%'


                },
                {xtype: 'panel', bodyPadding: 10, title: 'STATUS INFORMATION', id: 'PLCONstatusInformationID', collapsible: true, collapsed: true,
                    width: '100%'


                },
                {xtype: 'panel', bodyPadding: 10, title: 'PRICE INFORMATION', collapsible: true,
                    itemId: 'priceInformationBoxId',
                    width: '100%',
                    items: [
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'pricetypecombobox',
                                    queryMode: 'local',
                                    fieldLabel: 'Price Type',
                                    name: 'pricetype_pricetype_id',
                                    disabled: true,
                                    width: 200,
                                }, {xtype: 'splitter', width: 5},
                                {
                                    xtype: 'cbkprstatus',
                                    fieldLabel: '',
                                    name: 'kprstatus_id',
                                    value: 2,
                                    hidden: true,
                                    width: 110,
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'KPP',
                                    hideTrigger: true,
                                    labelWidth: 30,
                                    margin: '0 0 0 20px',
                                    width: 60,
                                    hidden: true,
                                    name: 'kpp',
                                    value: 1,
                                    maxValue: 20,
                                    minValue: 1

                                },
                                {xtype: 'label', flex: 1}
                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Harga Tanah /m2', flex: 3},
                                        {
                                            //  xtype: 'xmoneyfield',
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            name: 'price_tanahpermeter',
                                            // isUang: true,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //  currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00,
                                            flex: 2
                                        },
                                        {xtype: 'label', text: '/m2', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_tanah',
                                    flex: 3,
                                    isUang: true,
                                    readOnly: true,
                                    maskRe: /[0-9\.]/,
                                    // currencyFormat: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;',
                                    padding: '0 25px 0 0',
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Harga Kelebihan Tanah /m2', flex: 3},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            isUang: true,
                                            name: 'price_kelebihantanah',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            // currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00,
                                            flex: 2
                                        },
                                        {xtype: 'label', text: '/m2', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_kelebihantanah',
                                    flex: 3,
                                    isUang: true,
                                    readOnly: true,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Harga Bangunan', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_bangunan',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    isUang: true,
                                    // currencyFormat: true,

                                    value: 0.00
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 2,
                                    items: [
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '',
                                            width: '100%',
                                            height: 2,
                                            padding: '8px 0 0 0',
                                            border: '0 0 2 0',
                                            style: {
                                                borderColor: 'black',
                                                borderStyle: 'solid',
                                            },
                                            flex: 1,
                                            margin: '0 0'
                                        },
                                        {xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
                                    ]
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Harga Jual Dasar', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_jualdasar',
                                    flex: 3,
                                    isUang: true,
                                    readOnly: true,
                                    padding: '0 25px 0 0',
                                    maskRe: /[0-9\.]/,
                                    //   currencyFormat: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Discount harga dasar', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'price_persen_dischargadasar',
                                            //  enableKeyEvents: true,
                                            keepRO: true,
                                            readOnly: true,
                                            maskRe: /[0-9\.]/,
                                            //    currencyFormat: true,
                                            fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;',
                                            //fieldStyle: 'text-align:right',
                                            value: 0.00,
                                            flex: 1
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_dischargadasar',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    // enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    keepRO: true,
                                    readOnly: true,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;',
                                    //   currencyFormat: true,
                                    // fieldStyle: 'text-align:right',
                                    value: 0.00

                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Discount harga tanah', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'price_persen_dischargatanah',
                                            flex: 1,
                                            //  enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //    currencyFormat: true,
                                            keepRO: true,
                                            readOnly: true,
                                            fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    //  xtype: 'xmoneyfield',
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'price_harga_dischargatanah',
                                    flex: 3,
                                    //  isUang: true,
                                    padding: '0 25px 0 0',
                                    //enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //   currencyFormat: true,
                                    keepRO: true,
                                    readOnly: true,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;',
                                    value: 0.00

                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Discount harga bangunan', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'price_persen_dischargabangunan',
                                            flex: 1,
                                            // enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //   currencyFormat: true,
                                            keepRO: true,
                                            readOnly: true,
                                            fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    //  xtype: 'xmoneyfield',
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'price_harga_dischargabangunan',
                                    flex: 3,
                                    // isUang: true,
                                    padding: '0 25px 0 0',
                                    // enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    // currencyFormat: true,
                                    keepRO: true,
                                    readOnly: true,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;',
                                    value: 0.00

                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 2,
                                    items: [
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '',
                                            width: '100%',
                                            height: 2,
                                            padding: '8px 0 0 0',
                                            border: '0 0 2 0',
                                            style: {
                                                borderColor: 'black',
                                                borderStyle: 'solid',
                                            },
                                            flex: 1,
                                            margin: '0 0'
                                        },
                                        {xtype: 'label', text: '-', width: 20, padding: '0 0 0 10px'}
                                    ]
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Harga Netto', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_neto',
                                    flex: 3,
                                    // isUang: true,
                                    padding: '0 25px 0 0',
                                    readOnly: true,
                                    // maskRe: /[0-9\.]/,
                                    //   currencyFormat: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'PPN Tanah', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'price_persen_ppntanah',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //    currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_ppntanah',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00

                                }


                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'PPN Bangunan', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'price_persen_ppnbangunan',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //     currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_ppnbangunan',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00

                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'PPNBM', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'price_persen_ppnbm',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //     currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_ppnbm',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00

                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'PPH22', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'price_persen_pph22',
                                            flex: 1,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //     currencyFormat: true,
                                            fieldStyle: 'text-align:right',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_pph22',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00

                                }

                            ]
                        }

                        ,
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya balik nama',itemId:'labelbbn', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_bbnsertifikat',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya perolehan hak',itemId:'labelbphtb', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_bphtb',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //   currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya Akta Jual Beli',itemId:'labelajb', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_bajb',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },

                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya P. Mutu', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'harga_pmutu',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },

                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 2,
                                    items: [
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '',
                                            width: '100%',
                                            height: 2,
                                            padding: '8px 0 0 0',
                                            border: '0 0 2 0',
                                            style: {
                                                borderColor: 'black',
                                                borderStyle: 'solid',
                                            },
                                            flex: 1,
                                            margin: '0 0'
                                        },
                                        {xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
                                    ]
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'HARGA JUAL', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'price_harga_jual',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    readOnly: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya Administrasi', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'harga_administrasi',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    // currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya Paket tambahan', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'harga_paket_tambahan',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },

                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya Administrasi Subsidi', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'harga_admsubsidi',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Biaya Asuransi', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'biaya_asuransi',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },

                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Discount Sales', flex: 6},
                                        {
                                            xtype: 'xmoneyfield',
                                            fieldLabel: '',
                                            name: 'persen_salesdisc',
                                            flex: 1,
                                            readOnly: true,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            //  currencyFormat: true,
                                            fieldStyle: 'background:#ebebe4;text-align:right',
                                            value: 0.00
                                        },
                                        {xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'harga_salesdisc',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.]/,
                                    //  currencyFormat: true,
                                    readOnly: true,
                                    fieldStyle: 'background:#ebebe4;text-align:right',
                                    value: 0.00

                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'Harga Pembulatan', flex: 1},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'harga_pembulatan',
                                    flex: 3,
                                    isUang: true,
                                    padding: '0 25px 0 0',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9\.-]/,
                                    //currencyFormat: true,
                                    fieldStyle: 'text-align:right',
                                    value: 0.00
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 2,
                                    items: [
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '',
                                            width: '100%',
                                            height: 2,
                                            padding: '8px 0 0 0',
                                            border: '0 0 2 0',
                                            style: {
                                                borderColor: 'black',
                                                borderStyle: 'solid',
                                            },
                                            flex: 1,
                                            margin: '0 0'
                                        },
                                        {xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
                                    ]
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    flex: 7,
                                    items: [
                                        {xtype: 'label', text: 'HARGA TRANSAKSI', flex: 1, style: 'font-weight:bold;font-size:14px;'},
                                    ]
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: '',
                                    name: 'harga_total_jual',
                                    flex: 3,
                                    padding: '0 25px 0 0',
                                    readOnly: true,
                                    maskRe: /[0-9\.]/,
                                    // currencyFormat: true,
                                    value: 0.00,
                                    fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
                                }

                            ]
                        },

                    ]
                }, // end sub panel
                {xtype: 'panel', bodyPadding: 10, title: 'BILLING INFORMATION', collapsible: true,
                    itemId: 'billingInformationBoxId',
                    width: '100%',
                    items: [
                        {
                            layout: 'hbox', bodyStyle: 'border:0px',
                            items: [
                                {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'BANK KPR',
                                                    name: 'bank_bank_name',
                                                    enableKeyEvents: true,
                                                    readOnly: true,
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 5
                                                }, {
                                                    xtype: 'cbbank',
                                                    fieldLabel: '',
                                                    itemId: 'bank_cb',
                                                    name: 'bank_bank_id',
                                                    readOnly: true,
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'cbbillingrules',
                                                    fieldLabel: 'Billing Rules',
                                                    name: 'billingrules_billingrules_id',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'Tanda Jadi',
                                                    name: 'billingrules_term_tandajadi',
                                                    flex: 1,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9\.]/,
                                                    // currencyFormat: true,
                                                    fieldStyle: 'text-align:right',
                                                    value: 0.00
                                                }, {
                                                    xtype: 'label', text: ' / ', width: 40, padding: '0 5px'
                                                }, {
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: '',
                                                    name: 'billingrules_tandajadi',
                                                    flex: 1,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9\.]/,
                                                    // currencyFormat: true,
                                                    fieldStyle: 'text-align:right',
                                                    value: 0.00

                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'Uang muka',
                                                    name: 'billingrules_term_uangmuka',
                                                    flex: 1,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9]/,
                                                    //  currencyFormat: true,
                                                    fieldStyle: 'text-align:right',
                                                    value: 0.00

                                                }, {
                                                    xtype: 'label', text: ' / ', width: 40, padding: '0 5px'
                                                }, {
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: '',
                                                    name: 'billingrules_uangmuka',
                                                    flex: 1,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9\.]/,
                                                    //  currencyFormat: true,
                                                    fieldStyle: 'text-align:right',
                                                    value: 0.00

                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'Sisa',
                                                    name: 'billingrules_term_angsuran',
                                                    flex: 1,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9]/,
                                                    //  currencyFormat: true,
                                                    fieldStyle: 'text-align:right',
                                                    value: 0.00

                                                }, {
                                                    xtype: 'label', text: ' / ', width: 40, padding: '0 5px'
                                                }, {
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: '',
                                                    name: 'billingrules_angsuran',
                                                    flex: 1,
                                                    readOnly: true,
                                                    //  currencyFormat: true,
                                                    fieldStyle: 'text-align:right',
                                                    value: 0.00

                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: '&nbsp;',
                                                    name: 'company',
                                                    flex: 1,
                                                }, {
                                                    xtype: 'label',
                                                    text: 'APPROVAL',
                                                    flex: 1,
                                                    padding: '0 0 0 10px'


                                                }, {
                                                    xtype: 'button',
                                                    text: 'GENERATE',
                                                    action: 'genschedule',
                                                    flex: 1
                                                }]
                                        }

                                    ]
                                }, {xtype: 'splitter', width: 20},
                                {xtype: 'panel', flex: 1, layout: 'vbox', bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Estimasi Serah Terima',
                                                    name: 'rencana_serahterima',
                                                    allowBlank: false,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9]/,
                                                    labelWidth: 200,
                                                    // minValue:1,
                                                    value: 0,
                                                    flex: 6,
                                                }, {
                                                    xtype: 'label',
                                                    text: 'bulan',
                                                    flex: 1,
                                                    padding: '0 0 0 10px'


                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'datefield',
                                                    labelWidth: 200,
                                                    allowBlank: false,
                                                    fieldLabel: 'Tanggal Estimasi Serah Terima',
                                                    name: 'rencana_serahterima_date',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    // format: 'd/m/Y',
                                                    //  submitFormat: 'Y-m-d',
                                                    flex: 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'cbcollector',
                                                    fieldLabel: 'Collector',
                                                    name: 'collector_employee_id',
                                                    flex: 1
                                                }]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [{
                                    xtype: 'purchaseletterschedulegrid',
                                    width: '100%',
                                    itemId: 'MyScheduleGrid'

                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    name: 'balance_value',
                                    readOnly: true,
                                    width: '300px'
                                }]
                        }
                        ,
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [{
                                    xtype: 'textareafield',
                                    fieldLabel: 'Notes',
                                    name: 'notes',
                                    flex: 1,
                                }]
                        },
                        //edited by Rizal 28 Feb 2019
                         {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Auto Send SMS',
                            name: 'is_auto_sms',
                            itemId: 'is_auto_sms',
                            inputValue: '1',
                            hidden: true,
                            uncheckedValue: '0',
                            //  margin: '0 5px 0 0',
                            width: '100%'
                                    //flex:3
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Not Allowed to Send SP',
                            name: 'is_not_allowed_sp',
                            itemId: 'is_not_allowed_sp',
                            inputValue: '1',
                            hidden: true,
                            uncheckedValue: '0',
                            //  margin: '0 5px 0 0',
                            width: '100%'
                                    //flex:3
                        },
                        //endedited
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [{
                                    xtype: 'textareafield',
                                    fieldLabel: 'Promo',
                                    hidden: true,
                                    itemId: 'promo',
                                    name: 'promo',
                                    flex: 1
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            hidden: true,
                            itemId:'rewardsalesPanelID',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Reward Sales',
                                    anchor: '-5',
                                    name: 'rewardsales_code',
                                    readOnly:true,
                                    keepRO:true,
                                    flex: 2

                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: '',
                                    anchor: '-5',
                                    queryMode: 'local',
                                     displayField: 'name',
                                    valueField: 'reward_id',
                                    name: 'rewardsales_reward_id',
                                    flex: 2
                                }, {
                                    xtype: 'label',
                                    flex: 3
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            itemId:'rewardtambahanPanelID',
                            hidden: true,
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Reward Tambahan',
                                    anchor: '-5',
                                    readOnly:true,
                                    keepRO:true,
                                    
                                    name: 'rewardtambahan_code',
                                    flex: 2

                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: '',
                                    anchor: '-5',
                                    queryMode: 'local',
                                     displayField: 'name',
                                    valueField: 'reward_id',
                                    name: 'rewardtambahan_reward_id',
                                    flex: 2
                                }, {
                                    xtype: 'label',
                                    flex: 3
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            hidden: true,
                            itemId:'rewardcustomerPanelID',
                            bodyStyle: 'border:0px',
                            items: [{
                                    xtype: 'textfield',
                                    fieldLabel: 'Reward Customer',
                                    anchor: '-5',
                                    name: 'rewardcustomer_code',
                                    readOnly:true,
                                    keepRO:true,
                                    flex: 2

                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'combobox',
                                    fieldLabel: '',
                                    anchor: '-5',
                                    queryMode: 'local',
                                    name: 'rewardcustomer_reward_id',
                                    displayField: 'name',
                                    valueField: 'reward_id',
                                    flex: 2
                                }, {
                                    xtype: 'label',
                                    flex: 3
                                }]
                        },
                        {
                          //added by iqbal 06 mei 2019
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{

                                    xtype: 'checkboxfield',
                                    fieldLabel: 'Repeat Order',
                                    name: 'is_repeat_order',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    width: 80



                                }]
                        }, // end
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            id: 'testModalID',
                            html: ''
                        }
                    ]
                } /// end sub panel
                */
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
                        disabled: true,
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        hidden: true,
                        text: 'Save'
                    },
                    // {
                    //     xtype: 'button',
                    //     action: 'save',
                    //     itemId: 'btnSaveFromDraft',
                    //     hidden: true,
                    //     padding: 5,
                    //     width: 75,
                    //     iconCls: 'icon-save',
                    //     text: 'Save To '
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
                    }, {
                        xtype: 'button',
                        action: 'authorize',
                        itemId: 'btnAuthorize',
                        hidden: true,
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-save',
                        text: 'Authorize'
                    },
                    {
                        xtype: 'button',
                        action: 'printout',
                        itemId: 'btnPrintout',
                        disabled: true,
                        hidden:true,
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-print',
                        text: 'Printout'
                    },
                    {
                        xtype: 'button',
                        action: 'printsch',
                        itemId: 'btnPrintPaySch',
                        padding: 5,
                        hidden:true,
                        width: 130,
                        iconCls: 'icon-print',
                        text: 'Payment Scheme'
                    },
                    {
                        xtype: 'button',
                        action: 'setaci',
                        itemId: 'btnAci',
                        align: 'center',
                        padding: 5,
                        hidden:true,
                        width: 100,
                        //iconCls: '&#10003',
                        text: '&#10003; ACI',
                        name: 'apiaci'

                    },
                    {
                        xtype: 'button',
                        action: 'flashprint',
                        disabled: true,
                        hidden:true,
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-flash',
                        text: 'Flash print'
                    },
                    //add by hadi 21082019
                    {
                        xtype: 'button',
                        action: 'saveDraft',
                        itemId: 'btnSaveDraft',
                        disabled: true,
                        hidden:true,
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-save',
                        text: 'Save Draft'
                    }
                    //add by hadi 21082019
                ]
            }
        ];
        return x;
    }
});