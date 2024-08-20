Ext.define('Erems.view.followup.FormDataView', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.followupformdataview',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    height: 400,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'followup_id'
                },
                {
                    xtype: 'container',
                    margin:'5px 0 0 0',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 30px 0 0',
                        readOnly:true
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name:'unit_unit_number',
                            fieldLabel: 'Blok/Kavling'
                        },
                        {
                            xtype: 'textfield',
                            name:'purchase_date',
                            fieldLabel: 'Tgl SP',
                            width: 170,
                            labelWidth: 60
                        },
                        {
                            xtype: 'textfield',
                            name:'pricetype_pricetype',
                            fieldLabel: 'Pembelian',
                            width: 120,
                            labelWidth: 60
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin:'5px 0 0 0',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 30px 0 0',
                        readOnly:true
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name:'type_name',
                            fieldLabel: 'Tipe'
                        },
                        {
                            xtype: 'textfield',
                            width: 120,
                            margin: '0 5px 0 0',
                            name:'unit_land_size',
                            margin: '0 100px 0 0',
                            labelWidth: 60,
                            fieldLabel: 'L.T'
                        },
                        {
                            xtype: 'textfield',
                            width: 120,
                            name:'unit_building_size',
                            labelWidth: 60,
                            fieldLabel: 'L.B'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin:'5px 0 0 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            width: 350,
                            defaults: {
                                width: '100%',
                                readOnly:true
                            },
                            margin: '0 10px 0 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name:'customer_name',
                                    fieldLabel: 'Nama'
                                },
                                {
                                    xtype      : 'xaddressfieldEST',
                                    name       : 'customer_address',
                                    fieldLabel : 'Alamat',
                                },
                                {
                                    xtype      : 'xphonenumberfieldEST',
                                    name       :'customer_homephone',
                                    fieldLabel : 'Telp Rumah'
                                },
                                {
                                    xtype      : 'xphonenumberfieldEST',
                                    name       :'customer_officephone',
                                    fieldLabel : 'Telp Kantor'
                                },
                                {
                                    xtype      : 'xphonenumberfieldEST',
                                    name       :'customer_mobilephone',
                                    fieldLabel : 'Handphone'
                                },
                            ]
                        },
                        {
                            width: 225,
                            xtype: 'container',
                            defaults: {
                                width: '100%',
                                labelWidth: 70,
                                align:'right',
                                readOnly:true
                            },
                            items: [
                                {
                                    xtype: 'xmoneyfield',
                                    name:'harga_total_jual',
                                    fieldLabel: 'Harga'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    name:'dp',
                                    fieldLabel: 'DP'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    name:'total_bayar',
                                    fieldLabel: 'Total Bayar'
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
             
                    layout: 'hbox',
                    defaults: {
                        margin: '0 30px 0 0',
                        readOnly:true
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name:'tgl_surat',
                            fieldLabel: 'Tgl Surat'
                        },
                        {
                            xtype: 'textfield',
                            name:'nomor_surat',
                            fieldLabel: 'No Surat',
                            width: 250,
                            labelWidth: 60
                        }
                    ]
                },
                {
                    margin     : '5px 0 0 0',
                    xtype      : 'xnotefieldEST',
                    width      : 550,
                    name       : 'catatan',
                    fieldLabel : 'Catatan',
                    readOnly   : true
                },
                {
                    margin:'5px 0 0 0',
                    width: 650,
                    name:'print_preview',
                    fieldLabel: 'Print Preview',
                    readOnly:true
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
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
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

