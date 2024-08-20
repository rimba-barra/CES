Ext.define('Erems.view.popupgeneralinformation.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.popupgeneralinformationformdata',
    requires: [
        'Erems.library.template.view.MoneyField',
        'Erems.view.popupgeneralinformation.GridPayment',
        'Erems.view.popupgeneralinformation.GridUtility'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    itemId: 'PopupgiformData',
    // bodyPadding: 10,
    // bodyStyle: 'padding:5px 5px 0;background-color:#ffffff',
    defaults: {
        margin: '0 0 10px 0',
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_id'
                },
                {xtype: 'panel', bodyPadding: 10, title: 'PURCHASELETTER INFORMATION', collapsible: true,
                    width: '100%',
                    defaults: {
                        margin: '0 0 10px 0',
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    margin: '0 10px 0 0',
                                    name: 'cluster_code',
                                    fieldLabel: 'Kawasan'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'unit_unit_number',
                                    fieldLabel: 'Blok'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'unit_land_size',
                                    fieldLabel: 'Luas Tanah'
                                },
                                {
                                    xtype: 'label',
                                    text: 'm2',
                                    width: 30
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'unit_building_size',
                                    fieldLabel: 'Luas Bangunan'
                                },
                                {
                                    xtype: 'label',
                                    text: 'm2',
                                    width: 30
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    margin: '0 10px 0 0',
                                    name: 'type_name',
                                    width: 400,
                                    fieldLabel: 'Tipe'
                                }
                            ]
                        },
                        {
                            xtype      : 'xnamefieldEST',
                            width      : 500,
                            name       : 'customer_name',
                            fieldLabel : 'Pembeli'
                        },
                        {
                            xtype      : 'xaddressfieldEST',
                            name       : 'customer_address',
                            fieldLabel : 'Alamat',
                            width      : 600,
                            rows       : 5
                        },
                        {
                            xtype      : 'xaddressfieldEST',
                            name       : 'customer_KTP_address',
                            fieldLabel : 'Alamat KTP',
                            width      : 600,
                            rows       : 5
                        },
                        {
                            xtype: 'textfield',
                            width: 500,
                            name: 'customer_KTP_number',
                            fieldLabel: 'No. KTP'
                        },
                        {
                            xtype: 'textfield',
                            width: 500,
                            name: 'customer_NPWP',
                            fieldLabel: 'NPWP'
                        },
                        {
                            xtype      : 'xphonenumberfieldEST',
                            width      : 500,
                            name       : 'customer_home_phone',
                            fieldLabel : 'Home Phone'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype      : 'xphonenumberfieldEST',
                                    name       : 'customer_mobile_phone',
                                    fieldLabel : 'Hand Phone'
                                },
                                {
                                    xtype      : 'xphonenumberfieldEST',
                                    name       : 'customer_office_phone',
                                    fieldLabel : 'Office Phone'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'xmoneyfield',
                                    name: 'price_harga_jual',
                                    fieldLabel: 'Harga Jual'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Uang Muka'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name: 'purchase_date',
                                    fieldLabel: 'Tanggal SP'
                                },
                                {
                                    xtype: 'dfdatefield',
                                    name: 'rencana_serahterima_date',
                                    fieldLabel: 'Rencana ST'
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            width: 500,
                            name: 'pricetype_pricetype',
                            fieldLabel: 'Jenis Pembayaran'
                        },
                        {
                            xtype      : 'xnamefieldEST',
                            width      : 500,
                            name       : 'salesman_employee_name',
                            fieldLabel : 'Nama Sales'
                        },
                        {
                            xtype: 'textfield',
                            width: 500,
                            name: 'cac_cac_code',
                            fieldLabel: 'Member'
                        },
                        {
                            xtype: 'textfield',
                            width: 500,
                            name: 'bank_bank_name',
                            fieldLabel: 'Bank KPR'
                        },
                       
                         {
                            xtype      : 'xnotefieldEST',
                            name       : 'notes',
                            fieldLabel : 'Purchaseletter Note',
                            width      : 600,
                            rows       : 5
                        },
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'AFTER SALES INFORMATION', collapsible: true,
                    width: '100%',
                    defaults: {
                        margin: '0 0 10px 0',
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name: 'aftersales_serahterima_date',
                                    fieldLabel: 'S.T'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'aftersales_hunian_status',
                                    fieldLabel: 'Stat. Hunian'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            name: 'aftersales_pinjampakai_status',
                                            boxLabel: 'Pinjam Pakai'
                                        },
                                        {
                                            xtype: 'dfdatefield',
                                            name: 'aftersales_pinjampakai_date',
                                            fieldLabel: 'Tgl Pinjam Pakai'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'ID Pel. Listrik'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Penerimaan',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                margin: '0 10px 0 0',
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    name: 'aftersales_receive_status',
                                                    inputValue: '1',
                                                    boxLabel: 'Sendiri'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    name: 'aftersales_receive_status',
                                                    inputValue: '2',
                                                    boxLabel: 'Sepihak'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    name: 'aftersales_receive_status',
                                                    inputValue: '3',
                                                    boxLabel: 'S. Kuasa'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'dfdatefield',
                                            name: 'aftersales_datang_date',
                                            fieldLabel: 'Tgl. Datang'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'popupgeneralinformationgridutility',
                            height: 200
                        }

                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'COLLECTION INFORMATION', collapsible: true,
                    width: '100%',
                    defaults: {
                        margin: '0 0 10px 0',
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'xmoneyfield',
                                    name: 'total_payment',
                                    fieldLabel: 'Total Bayar'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'persen_payment',
                                    width: 70,
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'label',
                                    text: '%',
                                    width: 30
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name: 'plbankkpr_berkasmasuk_date',
                                    fieldLabel: 'Tgl. Masuk'
                                },
                                {
                                    xtype: 'dfdatefield',
                                    name: 'plbankkpr_appraisalplan_date',
                                    fieldLabel: 'Tgl P.Apprs'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name: 'plbankkpr_berkasbank_date',
                                    fieldLabel: 'Tlg di Bank'
                                },
                                {
                                    xtype: 'dfdatefield',
                                    name: 'plbankkpr_appraisal_date',
                                    fieldLabel: 'Tgl Apprs'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name: 'plbankkpr_interview_date',
                                    fieldLabel: 'Tgl Wawancara'
                                },
                                {
                                    xtype: 'dfdatefield',
                                    name: 'plbankkpr_akad_date',
                                    fieldLabel: 'Tgl Akad'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'xmoneyfield',
                                    name: 'plbankkpr_kpr_realisation',
                                    fieldLabel: 'KPR Real.'
                                },
                                {
                                    xtype: 'dfdatefield',
                                    name: 'plbankkpr_kpr_acc_date',
                                    fieldLabel: 'Tgl Acc'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'plbankkpr_kpr_tenor',
                                    fieldLabel: 'Lama KPR',
                                    width: 150,
                                },
                                {
                                    xtype: 'label',
                                    width: 30,
                                    margin: '0 30px 0 0',
                                    text: 'Tahun'
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 40,
                                    name: 'plbankkpr_kpr_interest',
                                    width: 90,
                                    fieldLabel: 'Bunga'
                                },
                                {
                                    xtype: 'label',
                                    width: 30,
                                    text: '%'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    name: 'plbankkpr_kpr_cicilan',
                                    labelWidth: 40,
                                    width: 150,
                                    fieldLabel: 'Cicilan'
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'collector_employee_name',
                            fieldLabel: 'Kolektor'
                        },
                        {
                            xtype: 'popupgeneralinformationgridpayment',
                            height: 200
                        }


                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'CONSTRUCTION INFORMATION', collapsible: true,
                    width: '100%',
                    defaults: {
                        margin: '0 0 10px 0',
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'unit_progress',
                                    fieldLabel: 'Progress'
                                },
                                {
                                    xtype: 'label',
                                    text: '%',
                                    width: 30
                                },
                                {
                                    xtype: 'dfdatefield',
                                    name: 'aftersales_serahterima1_date',
                                    margin: '0 10px 0 10px',
                                    fieldLabel: 'Tgl S.T 1'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'tgl_',
                                    fieldLabel: 'Tgl. Progress'
                                },
                                {
                                    xtype: 'dfdatefield',
                                    margin: '0 10px 0 50px',
                                    name: 'aftersales_serahterima2_date',
                                    fieldLabel: 'Tgl S.T 2'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 10px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'contractor_contractorname',
                                    fieldLabel: 'Kontraktor'
                                },
                                {
                                    xtype: 'textfield',
                                    margin: '0 10px 0 50px',
                                    width: 300,
                                    name: 'spk_spk_no',
                                    fieldLabel: 'Spk'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Pengawas'
                        },
                    ]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'LEGAL INFORMATION', collapsible: true,
                    width: '100%',
                    defaults: {
                        margin: '0 0 10px 0',
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'sppjb_sppjb_no',
                                    fieldLabel: 'SPPJB'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'buktipemilik_imb_no',
                                    fieldLabel: 'IMB'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name: 'sppjb_sppjb_date',
                                    fieldLabel: 'Tgl. SPPJB'
                                },
                                {
                                    xtype: 'dfdatefield',
                                    name: 'buktipemilik_imb_date',
                                    fieldLabel: 'Tgl. IMB'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'appjb_aktappjb_no',
                                    fieldLabel: 'PPJB'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'total_hgb',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    boxLabel: 'H.G.B'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype: 'dfdatefield',
                                    name: 'appjb_aktappjb_date',
                                    fieldLabel: 'Tgl. PPJB'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'total_ajb',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    boxLabel: 'A.J.B'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            itemId:'pengalihanHakID1',
                              hidden:true,
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype      : 'xnamefieldEST',
                                    name       : 'pengalihanhak_name',
                                    fieldLabel : 'Nama Pengalihan Hak'
                                },
                                {
                                    xtype      : 'xphonenumberfieldEST',
                                    name       : 'pengalihanhak_telephone',
                                    fieldLabel : 'Telp Pengalihan Hak'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                             itemId:'pengalihanHakID2',
                               hidden:true,
                            defaults: {
                                margin: '0 50px 0 0',
                            },
                            items: [
                                {
                                    xtype      : 'xaddressfieldEST',
                                    name       : 'pengalihanhak_address',
                                    fieldLabel : 'Alamat Pengalihan Hak',
                                    width      : '100%'
                                }
                            ]
                        },
                        {
                            xtype    : 'container',
                            layout   : 'hbox',
                            itemId   : 'pengalihanHakID3',
                            hidden   : true,
                            defaults : {
                                margin : '0 50px 0 0',
                            },
                            items : [
                                {
                                    xtype      : 'xnotefieldEST',
                                    name       : 'promo',
                                    fieldLabel : 'Promo',
                                    width      : '100%'
                                }
                            ]
                        },
                    ]
                },
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
                        action: 'kartupiutang',
                    
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-form',
                        text: 'Kartu Piutang'
                        
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