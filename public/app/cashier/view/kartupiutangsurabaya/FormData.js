Ext.define('Cashier.view.kartupiutangsurabaya.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kartupiutangsurabayaformdata',
    requires: ['Cashier.view.kartupiutangsurabaya.GridBillingSchedule',
        'Cashier.view.kartupiutangsurabaya.GridListPayment',
        'Cashier.library.template.view.MoneyField', 
        'Cashier.library.box.view.DateField'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    itemId: 'KarPiuformData',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                /* CUSTOMER INFORMATION */

                {xtype: 'panel', bodyPadding: 10,
                    width: '100%',
                    items: [
                        {
                            layout: 'hbox', bodyStyle: 'border:0px',
                            items: [
                                {xtype: 'panel', flex: 3, layout: 'vbox', bodyStyle: 'border:0px',
                                    defaults: me.textFieldDefault(true),
                                    items: [
                                        {
                                            fieldLabel: 'Purchase Letter No',
                                            name: 'purchaseletter_no',
                                            flex: 1
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            xtype: 'container',
                                            defaults: me.textFieldDefault(true),
                                            layout: 'hbox',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    name: 'cluster_code',
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 5
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    name: 'cluster_cluster',
                                                    flex: 1
                                                }]
                                        }, {
                                            //  bodyPadding: 10,
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: me.textFieldDefault(true),
                                            items: [{
                                                    fieldLabel: 'Block Name',
                                                    name: 'block_code',
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 5
                                                }, {
                                                    fieldLabel: '',
                                                    name: 'block_block',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Kavling / Unit No',
                                            name: 'unit_unit_number',
                                            flex: 1
                                        }


                                    ]
                                }, {xtype: 'splitter', width: 20},
                                {xtype: 'panel', flex: 2, layout: 'vbox', bodyStyle: 'border:0px',
                                    defaults: me.textFieldDefault(true),
                                    items: [
                                        {
                                            xtype:'datefield',
                                            format:'d-m-Y',
                                            fieldLabel: 'Purchase Date',
                                            name: 'purchase_date'
                                        },
                                        {
                                            fieldLabel: 'Type',
                                            name: 'type_name'
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: me.textFieldDefault(true),
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Land Size',
                                                    name: 'unit_land_size',
                                                    flex: 7
                                                }, {
                                                    xtype: 'splitter', width: 5
                                                }, {
                                                    xtype: 'label',
                                                    text: 'm2',
                                                    flex: 1
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: me.textFieldDefault(true),
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Building Size',
                                                    name: 'unit_building_size',
                                                    flex: 7
                                                }, {
                                                    xtype: 'splitter', width: 5
                                                }, {
                                                    xtype: 'label',
                                                    text: 'm2',
                                                    flex: 1
                                                }]
                                        }

                                    ]
                                }

                            ]
                        }

                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'CUSTOMER INFORMATION', collapsible: true,
                    width: '100%',
                    layout: 'vbox',
                    defaults: me.textFieldDefault(true),
                    items: [
                        {
                            fieldLabel: 'Customer Id',
                            name: 'customer_id',
                            width: '30%'
                        },
                        {
                            fieldLabel: 'Customer Name',
                            name: 'customer_name'
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: 'Address',
                            name: 'customer_address'
                        },
                        {
                            //  bodyPadding: 10,
                            xtype: 'container',
                            layout: 'hbox',
                            width: '100%',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox'
                            },
                            items: [{flex: 1,
                                    defaults: me.textFieldDefault(true),
                                    items: [
                                        {
                                            fieldLabel: 'City',
                                            name: 'city_city_name'
                                        },
                                        {
                                            fieldLabel: 'Home Phone',
                                            name: 'customer_home_phone'
                                        },
                                        {
                                            fieldLabel: 'Office Phone',
                                            name: 'customer_office_phone'
                                        },
                                        {
                                            fieldLabel: 'Email Address',
                                            name: 'customer_email'
                                        }
                                    ]
                                }, {
                                    xtype: 'splitter', width: 50
                                }, {flex: 1,
                                    defaults: me.textFieldDefault(true),
                                    items: [
                                        {
                                            fieldLabel: 'Zip Code',
                                            name: 'customer_zipcode'
                                        },
                                        {
                                            fieldLabel: 'Mobile Phone',
                                            name: 'customer_mobile_phone'
                                        },
                                        {
                                            fieldLabel: 'FAX',
                                            name: 'customer_fax'
                                        }
                                    ]


                                }]
                        }
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER REVISION HISTORY', collapsible: true,
                    layout: 'vbox',
                    width: '100%',

                    defaults: {
                        xtype: 'container',
                        layout: 'vbox',
                        width: '100%'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox'
                            },
                            items: [{flex: 1,
                                    defaults: {
                                        xtype: 'textfield',
                                        padding: '5px 0 0 0',
                                        width: '100%',
                                        readOnly: true,
                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right;'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Netto Price',
                                            name: 'price_harga_neto'
                                        },
                                        {
                                            fieldLabel: 'PPN price',
                                            name: 'Customer'
                                        },
                                        {
                                            fieldLabel: 'Biaya Balik Nama',
                                            name: 'price_harga_bbnsertifikat'
                                        },
                                        {
                                            fieldLabel: 'Biaya Akta Jual Beli',
                                            name: 'price_harga_bajb'
                                        },
                                        {
                                            fieldLabel: 'Biaya BPHTB',
                                            name: 'price_harga_bphtb'
                                        },
                                        {
                                            fieldLabel: 'Administration Fee',
                                            name: 'harga_administrasi'
                                        },
                                        {
                                            fieldLabel: 'Administration Subsidi',
                                            name: 'harga_admsubsidi'
                                        },
                                        {
                                            fieldLabel: 'Biaya Paket Tambahan',
                                            name: 'harga_paket_tambahan'
                                        }, {
                                            fieldLabel: 'Harga Jual',
                                            name: 'price_harga_jual'
                                        }, {
                                            fieldLabel: 'Discount Collection',
                                            name: 'harga_salesdisc'
                                        }
                                    ]
                                }, {
                                    xtype: 'splitter', width: 50
                                }, {flex: 1,
                                    defaults: me.textFieldDefault(true),
                                    items: [
                                        {
                                            fieldLabel: 'Salesman',
                                            name: 'salesman_employee_name'
                                        },
                                        {
                                            fieldLabel: 'Member',
                                            name: 'cac_cac_name'
                                        },
                                        {
                                            fieldLabel: 'Member Name',
                                            name: 'clubcitra_member'
                                        },
                                        {
                                            fieldLabel: 'Club Citra Group',
                                            name: 'citraclub_clubname'
                                        },
                                        {
                                            fieldLabel: 'Price Type',
                                            name: 'pricetype_pricetype'
                                        },
                                        {
                                            fieldLabel: 'Pengakuan',
                                            name: 'foo_lunas_date'
                                        },
                                        {
                                            fieldLabel: 'SPPJB Date',
                                            name: 'foo_sppjb_date'
                                        }, {
                                            fieldLabel: 'Sign SPPJG Date',
                                            name: 'foo_tandatangan_date'
                                        },
                                        {
                                            xtype:'dfdatefield',
                                            fieldLabel: 'Legalitas',
                                            name: 'akad_realisasiondate'
                                        },
                                        {
                                            fieldLabel: 'Total price',
                                            name: 'harga_total_jual',
                                            fieldStyle:me.textfieldStyle(true,false)
                                        },
                                        {
                                            fieldLabel: 'Total payment',
                                            name: 'total_payment',
                                            fieldStyle:me.textfieldStyle(true,false)
                                            
                                        }, {
                                            fieldLabel: 'Remaining balance',
                                            name: 'remaining_balance',
                                            fieldStyle:me.textfieldStyle(true,false)
                                        }
                                    ]


                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Billing Schedule',
                            items: [{
                                    xtype: 'kartupiutangsurabayabillingschedulegrid',
                                    width: '100%',
                                    height: 300
                                },
                                {
                                    xtype:'xmoneyfield',
                                    name:'total_piutang',
                                    keepRO:true,
                                    readOnly:true,
                                    textAlign:'right',
                                    width:300,
                                    margin:'10px 0 0 0',
                                    fieldLabel:'Piutang'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Total Payment',
                            items: [
                                {
                                    itemId:'KartupiutangsurabayalistpaymentgridID',
                                    xtype: 'kartupiutangsurabayalistpaymentgrid',
                                    width: '100%',
                                    height: 300
                                },
                                {
                                    xtype:'xmoneyfield',
                                    margin:'10px 0 0 0',
                                    keepRO:true,
                                    width:300,
                                    readOnly:true,
                                    textAlign:'right',
                                    name:'total_pembayaran',
                                    fieldLabel:'Pembayaran'
                                }
                            ]
                        }
                    ]
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});
