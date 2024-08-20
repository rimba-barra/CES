Ext.define('Erems.view.recommendedtocancel.CancellationFormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.recommendedtocancelcancellationformdata',
    requires: [
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Citycombobox',
        'Erems.library.template.component.Pricetypecombobox',
        'Erems.library.template.component.Cancelreasoncombobox'
    ],
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
    initComponent: function() {
        var me = this;

        function dateOneYear() {
            var x = 12;
            var CurrentDate = new Date();
            CurrentDate.setMonth(CurrentDate.getMonth() + x);
            return CurrentDate;
        }

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'cancellation_id',
                    name: 'cancellation_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_unit_id',
                    name: 'unit_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_customer_id',
                    name: 'customer_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_firstpurchase_date',
                    name: 'firstpurchase_date'
                },
                {xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    items: [
                        {
                            layout: 'hbox',
                            padding: '10px 0 0 0',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'panel', flex: 8,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    anchor: '-5',
                                                    name: 'code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                },
                                                {
                                                    xtype: 'clustercombobox',
                                                    itemId: 'fd_clustercb',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'unit_cluster_id',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Block name',
                                                    anchor: '-5',
                                                    name: 'block_code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'blockcombobox',
                                                    itemId: 'fd_blockcb',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'unit_block_id',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Kavling / Unit No. ',
                                                    anchor: '-5',
                                                    name: 'unit_unit_number',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'button',
                                                    text: 'Browse Unit',
                                                    itemId: 'fd_browse_unit_btn',
                                                    padding: '2px 5px',
                                                    action: 'browse_unit',
                                                    iconCls: 'icon-search',
                                                    style: 'background-color:#FFC000;',
													hidden: true
                                                },
                                                {xtype: 'label', text: '', flex: 2}]
                                        }
                                    ]
                                },
                                {xtype: 'splitter', width: 30},
                                {
                                    xtype: 'panel', flex: 7,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PT Name',
                                                    anchor: '-5',
                                                    name: 'unit_pt_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        /*{
                                         layout: 'hbox',
                                         bodyStyle: 'border:0px',
                                         width: '100%',
                                         items: [{
                                         xtype: 'textfield',
                                         fieldLabel: 'Product Category',
                                         anchor: '-5',
                                         name: 'unit_productcategory',
                                         flex: 1,
                                         readOnly: true,
                                         fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                         }]
                                         },*/
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Type',
                                                    anchor: '-5',
                                                    name: 'unit_type_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Land Size',
                                                    anchor: '-5',
                                                    name: 'unit_land_size',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Long',
                                                    anchor: '-5',
                                                    name: 'unit_long',
                                                    flex: 6,
                                                    readOnly: true,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Building Size',
                                                    anchor: '-5',
                                                    name: 'unit_building_size',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Width',
                                                    anchor: '-5',
                                                    name: 'unit_width',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kelebihan Tanah',
                                                    anchor: '-5',
                                                    name: 'unit_kelebihan',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'label',
                                                    fieldLabel: ' ',
                                                    anchor: '-5',
                                                    flex: 6,
                                                    labelWidth: 30,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: ' ', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        },
                                        /*{
                                         layout: 'hbox',
                                         bodyStyle: 'border:0px',
                                         width: '100%',
                                         items: [{
                                         xtype: 'textfield',
                                         fieldLabel: 'Kelebihan Tanah',
                                         anchor: '-5',
                                         name: 'unit_kelebihan',
                                         flex: 12,
                                         readOnly: true,
                                         fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                         },
                                         {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                         {
                                         xtype: 'splitter', width: 30,
                                         }, {
                                         xtype: 'textfield',
                                         fieldLabel: 'Floor',
                                         anchor: '-5',
                                         name: 'unit_floor',
                                         flex: 6,
                                         labelWidth: 30,
                                         readOnly: true,
                                         fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                         },
                                         {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                         ]
                                         }*/
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /* PURCHASE LETTER INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER INFORMATION', collapsible: true,
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
                                                    fieldLabel: 'Purchase Letter No.',
                                                    anchor: '-5',
                                                    name: 'purchaseletter_no',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Purchase Letter Date',
                                                    anchor: '-5',
                                                    name: 'purchase_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u'
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
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield', //textfield
                                                    fieldLabel: 'Akad Date',
                                                    anchor: '-5',
                                                    name: 'akad_realisasiondate',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u'
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
                                                    name: 'customer_ktp',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'NPWP',
                                                    anchor: '-5',
                                                    name: 'customer_npwp',
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
                                                    xtype: 'citycombobox',
                                                    anchor: '-5',
                                                    itemId: 'fd_city',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldLabel: 'City',
                                                    name: 'customer_city_id',
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_homephone',
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
                                                    fieldLabel: 'Email',
                                                    anchor: '-5',
                                                    name: 'customer_email',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Mobile Phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_mobilephone',
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
                                                    fieldLabel: 'Sales Price',
                                                    anchor: '-5',
                                                    name: 'harga_jual',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'pricetypecombobox',
                                                    anchor: '-5',
                                                    itemId: 'fd_pricetype',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldLabel: 'Price Type',
                                                    name: 'pricetype_id',
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
                                                    fieldLabel: 'Total payment',
                                                    anchor: '-5',
                                                    name: 'total_payment',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Payment percentage (%)',
                                                    anchor: '-5',
                                                    name: 'payment_percentage',
                                                    flex: 1,
                                                    //allowBlank: false,
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
                                                    name: 'bank_bank_name',
                                                    flex: 1,
                                                    //allowBlank: false,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'label',
                                                    fieldLabel: ' ',
                                                    anchor: '-5',
                                                    //  name: 'payment_percentage',
                                                    flex: 1,
                                                    //allowBlank: false,
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
                                                    fieldLabel : 'Notes',
                                                    anchor     : '-5',
                                                    name       : 'notes',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* DETAIL PEMBATALAN Information */
                {xtype: 'panel', bodyPadding: 10, title: 'DETAIL PEMBATALAN', collapsible: true,
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
                                                    fieldLabel: 'Cancellation No',
                                                    anchor: '-5',
                                                    name: 'cancellation_no',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Cancellation date',
                                                    anchor: '-5',
                                                    name: 'cancellation_date',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    value: new Date(),
                                                    format: 'd-m-Y',
                                                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'cancelreasoncombobox',
                                                    anchor: '-5',
                                                    itemId: 'fd_cancelreason',
                                                    flex: 1,
                                                    allowBlank: false,
                                                    fieldLabel: 'Cancellation reason',
                                                    name: 'cancelreason_id'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total pembayaran',
                                                    anchor: '-5',
                                                    name: 'totalpayment',
                                                    flex: 1,
                                                    //allowBlank: false,
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
                                                    fieldLabel: 'Uang ditahan',
                                                    anchor: '-5',
                                                    name: 'lostpayment',
                                                    flex: 1,
                                                    currencyFormat: true,
                                                    enableKeyEvents: true,
                                                    //allowBlank: false,
                                                    maskRe: /[0-9\.]/,
                                                    value: 0.00
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Uang kembali',
                                                    anchor: '-5',
                                                    name: 'returnpayment',
                                                    flex: 1,
                                                    currencyFormat: true,
                                                    //enableKeyEvents: true,
                                                    //allowBlank: false,
                                                    readOnly: true,
                                                    maskRe: /[0-9\.]/,
                                                    value: 0.00,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            xtype: 'splitter', height: 10,
                                        },
                                        {
                                            xtype: 'fieldset',
                                            bodyPadding: 10,
                                            width: '55%',
                                            title: 'Buyback',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    anchor: '100%',
                                                    boxLabel: 'Buy Back',
                                                    name: 'is_buyback',
                                                    inputValue: '1',
                                                    handler: function(field, value) {
                                                        scope: this,
                                                                this.checkValue = field.getValue();
                                                        if (this.checkValue == true) {
                                                            me.down('[name=buyback_installment]').setDisabled(false);
                                                            me.down('[name=buyback_interest_persen]').setDisabled(false);
                                                            me.down('[name=buyback_interest]').setDisabled(false);
                                                            me.down('[name=buyback_denda]').setDisabled(false);
                                                        }
                                                        else if (this.checkValue == false) {
                                                            me.down('[name=buyback_installment]').setDisabled(true);
                                                            me.down('[name=buyback_interest_persen]').setDisabled(true);
                                                            me.down('[name=buyback_interest]').setDisabled(true);
                                                            me.down('[name=buyback_denda]').setDisabled(true);
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '-5',
                                                    fieldLabel: 'Pokok',
                                                    flex: 1,
                                                    name: 'buyback_installment',
                                                    currencyFormat: true,
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9\.]/,
                                                    value: 0.00,
                                                    disabled: true,
                                                    enforceMaxLength:true,
                                                    maxLength:13,
                                                    listeners:{
                                                        change:function(el, v, prev){
                                                            var commaPos = v.indexOf('.')+1,
                                                            strLen = v.length;

                                                            if((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen-2)){
                                                                el.setValue(prev);
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    layout    : 'hbox',
                                                    bodyStyle : 'border:0px',
                                                    width     : '100%',
                                                    items     : [
                                                        {
                                                            xtype           : 'xnumericfieldEST',
                                                            fieldLabel      : 'Bunga',
                                                            anchor          : '-5',
                                                            name            : 'buyback_interest_persen',
                                                            enableKeyEvents : true,
                                                            flex            : 12,
                                                            value           : 0,
                                                            disabled        : true,
                                                            maxLength       : 13,
                                                            listeners       : {
                                                                change:function(el, v, prev){
                                                                    var commaPos = v.indexOf('.')+1,
                                                                    strLen = v.length;

                                                                    if((commaPos <= 0 && v.length > 3) || (commaPos > 0 && commaPos < strLen-2)){
                                                                            if(el.value > 100){
                                                                                el.setValue(100);
                                                                            }else if(el.value < 0){
                                                                                el.setValue(0);
                                                                            }else{
                                                                                el.setValue(prev);
                                                                            }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
                                                        {
                                                            xtype: 'splitter', width: 20,
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: '',
                                                            anchor: '-5',
                                                            name: 'buyback_interest',
                                                            readOnly: true,
                                                            currencyFormat: true,
                                                            flex: 12,
                                                            labelWidth: 30,
                                                            maskRe: /[0-9\.]/,
                                                            value: 0.00,
                                                            disabled: true,
                                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                        },
                                                        {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                                    ]
                                                },
                                                {
                                                    xtype: 'splitter', height: 5,
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    anchor: '-5',
                                                    fieldLabel: 'Denda',
                                                    flex: 1,
                                                    name: 'buyback_denda',
                                                    currencyFormat: true,
                                                    maskRe: /[0-9\.]/,
                                                    value: 0.00,
                                                    disabled: true,
                                                    enforceMaxLength:true,
                                                    maxLength:13,
                                                    listeners:{
                                                        change:function(el, v, prev){
                                                            var commaPos = v.indexOf('.')+1,
                                                            strLen = v.length;

                                                            if((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen-2)){
                                                                el.setValue(prev);
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype            : 'xnotefieldEST',
                                                    fieldLabel       : 'Cancel note',
                                                    anchor           : '-5',
                                                    name             : 'note',
                                                    flex             : 1,
                                                    enforceMaxLength : true,
                                                    maxLength        : 255
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                /* END BIAYA BIAYA */
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
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            },
			/*{
                xtype: 'button',
                action: 'printout',
                itemId: 'btnPrintout',
                padding: 5,
                width: 75,
                iconCls: 'icon-print',
                text: 'Print',
				disabled: true
            },
			{
                xtype: 'button',
                action: 'approve_reject',
                itemId: 'btnApproveReject',
                padding: 5,
                width: 'auto',
                iconCls: 'icon-edit',
                text: 'Approve / Reject',
				disabled: true
            },*/
            ]
        }
        ];
        return x;
    }
	
});