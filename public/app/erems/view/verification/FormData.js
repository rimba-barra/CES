Ext.define('Erems.view.verification.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.verificationformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    height: 500,
    initComponent: function() {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'verification_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'unit_unit_id'
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
                                                },
                                                {
                                                    xtype: 'label', flex: 5
                                                }]
                                        },
                                        {
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
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Addredss',
                                                    anchor     : '-5',
                                                    name       : 'customer_address',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'City',
                                                    anchor: '-5',
                                                    name: 'city_city_name',
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
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Home phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_home_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Mobile phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_mobile_phone',
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
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Office phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_office_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'FAX',
                                                    anchor     : '-5',
                                                    name       : 'customer_fax',
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
                                                    xtype: 'textfield',
                                                    fieldLabel: 'NPWP Number',
                                                    anchor: '-5',
                                                    name: 'customer_NPWP',
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
                                                    name       : 'customer_NPWP_address',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
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
                            ]
                        }
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'PURCHASELETTER INFORMATION', collapsible: true,
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
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Purchaseletter Date',
                                                    width: 200,
                                                    anchor: '-5',
                                                    name: 'purchaseletter_purchase_date',
                                                    // flex: 1,
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
                                                    fieldLabel: 'Purchaseletter Number',
                                                    anchor: '-5',
                                                    name: 'purchaseletter_purchaseletter_no',
                                                    width: 500,
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
                                                    fieldLabel: 'Price',
                                                    anchor: '-5',
                                                    name: 'purchaseletter_harga_total_jual',
                                                    width: 400,
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
                                                    fieldLabel: 'Bank',
                                                    anchor: '-5',
                                                    name: 'bank_name',
                                                    width: 200,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    margin: "0px 0px 0px 20px",
                                                    anchor: '-5',
                                                    // name: 'p',
                                                    width: 200,
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
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Note',
                                                    anchor     : '-5',
                                                    name       : 'purchaseletter_notes',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'VERIFICATION INFORMATION', collapsible: true,
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
                                                    xtype: 'dfdatefield',
                                                    fieldLabel: 'Verfication Date',
                                                    width: 200,
                                                    anchor: '-5',
                                                    name: 'verification_date',
                                                    value: new Date(),
                                                    // name: 'p',
                                                    // flex: 1,

                                                    //readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Approve Type',
                                                    anchor: '-5',
                                                    name: 'verification_type',
                                                    value: 'Discount',
                                                    width: 200,
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
                                                    fieldLabel: 'Verification Number',
                                                    anchor: '-5',
                                                    name: 'verification_number',
                                                    width: 400,
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
                                                    fieldLabel: 'Sales',
                                                    anchor: '-5',
                                                    // name: 'p',
                                                    width: 200,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    margin: "0px 0px 0px 20px",
                                                    anchor: '-5',
                                                    // name: 'p',
                                                    width: 200,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Daftar Diskon',
                                            collapsible: true,
                                            defaults: {
                                                labelWidth: 89,
                                                anchor: '100%',
                                                layout: {
                                                    type: 'hbox',
                                                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                                                }
                                            },
                                            items: [
                                                {
                                                    //  bodyPadding: 10,
                                                    itemId : 'boxHargadasar',
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'radiogroup',
                                                            fieldLabel: 'Diskon Harga Dasar',
                                                            width: 300,
                                                            labelWidth: 150,
                                                            // Arrange radio buttons into two columns, distributed vertically
                                                            //itemId: 'status',
                                                            //  vertical: false,
                                                            items: [
                                                                {boxLabel: 'Persen', name: 'diskonhargadasar_jenis', inputValue: 1, checked: true},
                                                                {boxLabel: 'Nilai', name: 'diskonhargadasar_jenis', inputValue: 2},
                                                            ]
                                                        }, {
                                                            xtype: 'xmoneyfield2',
                                                            fieldLabel: '',
                                                            margin: "0px 0px 0px 20px",
                                                            value: 0.0,
                                                            anchor: '-5',
                                                            name: 'diskonhargadasar_nilai',
                                                            width: 200,
                                                        }]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'radiogroup',
                                                            fieldLabel: 'Diskon Harga Tanah',
                                                            width: 300,
                                                            labelWidth: 150,
                                                            // Arrange radio buttons into two columns, distributed vertically
                                                            //itemId: 'status',
                                                            //  vertical: false,
                                                            items: [
                                                                {boxLabel: 'Persen', name: 'diskonhargatanah_jenis', inputValue: 1, checked: true},
                                                                {boxLabel: 'Nilai', name: 'diskonhargatanah_jenis', inputValue: 2},
                                                            ]
                                                        }, {
                                                            xtype: 'xmoneyfield2',
                                                            fieldLabel: '',
                                                            margin: "0px 0px 0px 20px",
                                                            value: 0.0,
                                                            anchor: '-5',
                                                            name: 'diskonhargatanah_nilai',
                                                            width: 200,
                                                        }]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'radiogroup',
                                                            fieldLabel: 'Diskon Harga Bangunan',
                                                            width: 300,
                                                            labelWidth: 150,
                                                            // Arrange radio buttons into two columns, distributed vertically
                                                            //itemId: 'status',
                                                            //  vertical: false,
                                                            items: [
                                                                {boxLabel: 'Persen', name: 'diskonhargabangunan_jenis', inputValue: 1, checked: true},
                                                                {boxLabel: 'Nilai', name: 'diskonhargabangunan_jenis', inputValue: 2},
                                                            ]
                                                        }, {
                                                            xtype: 'xmoneyfield2',
                                                            fieldLabel: '',
                                                            margin: "0px 0px 0px 20px",
                                                            value: 0.0,
                                                            anchor: '-5',
                                                             name: 'diskonhargabangunan_nilai',
                                                            width: 200,
                                                        }]
                                                },
                                            ]
                                        },
                                        
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Note',
                                                    anchor     : '-5',
                                                    name       : 'verification_note',
                                                    flex       : 1,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Submitted By',
                                                    anchor: '-5',
                                                    blankText:'Please enter Email',
                                                    name: 'submitted_by',
                                                    readOnly:true,
                                                    width: 400,
                                                    // readOnly: true,
                                                    //  fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Approve By',
                                                    anchor: '-5',
                                                    blankText:'Please enter Email',
                                                    name: 'approved_by',
                                                    readOnly:true,
                                                    width: 400,
                                                    // readOnly: true,
                                                    //  fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                    ]
                                },
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
                       // hidden: true,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'approve',
                        itemId: 'btnApprove',
                        padding: 5,
                        width: 75,
                        hidden: true,
                        iconCls: 'icon-approve',
                        text: 'Approve'
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
    },
});

