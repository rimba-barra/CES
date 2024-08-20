Ext.define('Erems.view.gantinama.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.gantinamaformdata',
    requires: ['Erems.library.template.view.combobox.Changenamereason', 
        'Erems.library.box.Config', 'Erems.template.ComboBoxFields',
        'Erems.library.box.Mymoneyfield',
        'Erems.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    editedRow: -1,
    initComponent: function() {
        var me = this;

        var cfg = new Erems.library.box.Config();

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    name: 'unit_id'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_purchaseletter_id'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_customer_old_id',
                    name: 'customer_old_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'changename_id'
                },
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'UNIT INFORMATION',
                    collapsible: true,
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
                                            readOnly: true,
                                            flex: 1

                                        },
                                        {
                                            name: 'unit_progress',
                                            fieldLabel: 'Progress',
                                            readOnly: true,
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
                                                    xtype: 'textfield',
                                                    name: 'pt_name',
                                                    width: 340,
                                                    fieldLabel: 'PT',
                                                    keepRO: true,
                                                    readOnly: true,
                                                    defaultMargins: {top: 0, right: 0, bottom: 5, left: 0}

                                                },
                                                {
                                                    name: 'cluster_code',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    readOnly: true,
                                                    flex: 1,
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
                                                    readOnly: true,
                                                    flex: 1,
                                                    margin: '0 5px 0 0'
                                                },
                                                {
                                                    name: 'block_block',
                                                    readOnly: true,
                                                    fieldLabel: '',
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
                                                    readOnly: true,
                                                    margin: '0 5px 0 0',
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
                                                            readOnly: true,
                                                            fieldLabel: 'Long',
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
                                                            name: 'unit_building_size',
                                                            fieldLabel: 'Building Size',
                                                            readOnly: true,
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
                                                            fieldLabel: 'Width',
                                                            readOnly: true,
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
                                                            fieldLabel: 'Kelebihan Tanah',
                                                            readOnly: true,
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
                                                            fieldLabel: 'Floor',
                                                            readOnly: true,
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
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'CURRENT CUSTOMER INFORMATION',
                    collapsible: true,
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
                                                    itemId: 'fdms_id_customer',
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
                                                    xtype: 'splitter',
                                                    width: 5,
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 5
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
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Address',
                                                    anchor     : '-5',
                                                    name       : 'customer_address',
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
                                                    fieldLabel: 'City',
                                                    anchor: '-5',
                                                    name: 'city_city_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
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
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Home phone',
                                                    name       : 'customer_home_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Mobile phone',
                                                    name       : 'customer_mobile_phone',
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
                                                    name       : 'customer_office_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
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
                                        {
                                            xtype: 'panel',
                                            itemId: 'photo_image',
                                            flex: 1,
                                            height: 200,
                                            bodyStyle: 'background:none',
                                            padding: '0 0 10px 0'
                                        },
                                        /*
                                        {
                                            xtype: 'button',
                                            text: 'Create New Customer',
                                            flex: 1,
                                            padding: 5,
                                            action: 'create_new_customer',
                                            iconCls: 'icon-add'
                                        }
                                        */
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'NEW CUSTOMER INFORMATION',
                    collapsible: true,
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
                                                    itemId: 'fdms_id_customer',
                                                    name: 'customernew_customer_id'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer ID',
                                                    anchor: '-5',
                                                    name: 'customernew_code',
                                                    flex: 3,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 5,
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Browse Customer',
                                                    action: 'browse_customer',
                                                    flex: 1

                                                },
                                                {
                                                    xtype: 'label',
                                                    width: 150
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
                                                    readOnly: true,
                                                    anchor: '-5',
                                                    name: 'customernew_name',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Address',
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                    name       : 'customernew_address',
                                                    flex       : 1
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
                                                    fieldLabel: 'City',
                                                    readOnly: true,
                                                    anchor: '-5',
                                                    name: 'customernew_city',
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Zip Code',
                                                    readOnly: true,
                                                    anchor: '-5',
                                                    name: 'customernew_zipcode',
                                                    flex: 1
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
                                                    name       : 'customernew_home_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Mobile phone',
                                                    name       : 'customernew_mobile_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
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
                                                    name       : 'customernew_office_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'FAX',
                                                    name       : 'customernew_fax',
                                                    readOnly   : true,
                                                    flex       : 1,
                                                    anchor     : '-5',
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
                                                    readOnly: true,
                                                    anchor: '-5',
                                                    name: 'customernew_KTP_number',
                                                    flex: 1
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
                                                    readOnly: true,
                                                    anchor: '-5',
                                                    name: 'customernew_NPWP',
                                                    flex: 1
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
                                                    readOnly: true,
                                                    anchor: '-5',
                                                    name: 'customernew_email',
                                                    flex: 1
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
                                        {
                                            xtype: 'panel',
                                            itemId: 'photonew_image',
                                            flex: 1,
                                            height: 200,
                                            bodyStyle: 'background:none',
                                            padding: '0 0 10px 0'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Create New Customer',
                                            flex: 1,
                                            padding: 5,
                                            action: 'create_new_customer2',
                                            iconCls: 'icon-add'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'REASON CHANGE',
                    collapsible: true,
                    width: '100%',
                    items: [
                        {
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 3,
                                    layout: 'vbox',
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'dfdatefield',
                                                    fieldLabel: 'Purchase Letter Date',
                                                    readOnly: true,
                                                    width:180,
                                                    name: 'purchaseletter_purchase_date',
                                                 //   flex: 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Purchase Letter No. ',
                                                    readOnly: true,
                                                    name: 'purchaseletter_purchaseletter_no',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Change No. ',
                                                    readOnly: true,
                                                    name: 'changename_no',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Reason Change',
                                                    name: 'reasonchgname_code',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2;'
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 5
                                                }, {
                                                    xtype: 'combobox',
                                                    fieldLabel: '',
                                                    displayField: cbf.reasonchgname.d,
                                                    valueField: cbf.reasonchgname.v,
                                                    name: 'reasonchgname_reasonchgname_id',
                                                    flex: 1
                                                }]
                                        }


                                    ]
                                }, {
                                    xtype: 'splitter',
                                    width: 20
                                },
                                {
                                    xtype: 'panel',
                                    flex: 2,
                                    layout: 'vbox',
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: 200,
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Revision Index',
                                                    name: 'company',
                                                    readOnly: true,
                                                    flex: 1
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
                                                    fieldLabel: 'Change Date',
                                                    format: cfg.DATE_FORMAT,
                                                    submitFormat: cfg.DATE_SUBMITFORMAT,
                                                    name: 'changename_date',
                                                    value: new Date(),
                                                    flex: 1
                                                }]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            padding   : '10px 0 0 0',
                            layout    : 'hbox',
                            bodyStyle : 'border:0px',
                            width     : '100%',
                            items     : [{
                                    xtype      : 'xnotefieldEST',
                                    fieldLabel : 'Notes',
                                    name       : 'changename_note',
                                    flex       : 1,
                                }]
                        },
                        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            width: 300,
                            items: [{
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Administration Fee',
                                  //  maskRe: /[0-9\.]/,
                                    name: 'administration_fee',
                                    flex: 1
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
                                    xtype: 'checkboxfield',
                                    fieldLabel: 'Satu KK',
                                    name: 'is_satukk',
                                    itemId: 'is_satukk',
                                    inputValue: '1',
                                    hidden: false,
                                    uncheckedValue: '0',
                                    //  margin: '0 5px 0 0',
                                    flex:1
                                }, {
                                    xtype: 'splitter',
                                    width: 5,
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'No Doc Pengalihan Hak. ',
                                    readOnly: false,
                                    name: 'nomor_dokumen_pengalihanhak',
                                    itemId: 'nomor_dokumen_pengalihanhak',
                                    flex: 1
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Cara Bayar PPH',
                                    store: new Ext.data.ArrayStore({
                                        fields: [
                                            'cara_pembayaran_pph',
                                            'cara_pembayaran_pph_name'
                                        ],
                                        data: [['sendiri', 'Sendiri'], ['project', 'Project']]
                                    }),
                                    name:'cara_pembayaran_pph',
                                    itemId: 'cara_pembayaran_pph',
                                    displayField: 'cara_pembayaran_pph_name',
                                    valueField: 'cara_pembayaran_pph',
                                    flex:1
                                }, {
                                    xtype: 'splitter',
                                    width: 5,
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nomor Setor Pajak. ',
                                    readOnly: false,
                                    hidden: true,
                                    name: 'nomor_setor_pajak',
                                    itemId: 'nomor_setor_pajak',
                                    flex: 1
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    fieldLabel: 'Nominal Pembayaran PPH. ',
                                    readOnly: false,
                                    hidden: true,
                                    name: 'nominal_pembayaran_pph',
                                    itemId: 'nominal_pembayaran_pph',
                                    flex: 1
                                }]
                        },
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
                        action: 'approve',
                        itemId: 'btnApprove',
                        padding: 5,
                        //width: 75,
                        iconCls: 'icon-approve',
                        text: 'Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'approvecoll',
						itemId: 'btnApproveColl',
                        hidden:true,
                        padding: 5,
                      //  width: 105,
                        iconCls: 'icon-approve',
                        text: 'Approve Coll'
                    },
                    {
                        xtype: 'button',
                        action: 'reject',
                        disabled:true,
                        itemId: 'btnReject',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-unapprove',
                        text: 'Reject'
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