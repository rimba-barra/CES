Ext.define('Hrd.view.setparampayroll.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.setparampayrollpanel',
    itemId: 'SetparampayrollPanel',
    gridPanelName: 'setparampayrollgrid',
    requires: ['Hrd.view.setparampayroll.GridPtkp', 'Hrd.view.setparampayroll.GridPajak', 'Hrd.view.setparampayroll.GridTunjangan', 'Hrd.view.setparampayroll.GridBayar', 'Hrd.library.template.view.MoneyField'],
    formSearchPanelName: 'setparampayrollformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'background:none;border:0;',
                    id: 'formSetparampayrollID',
                    layout: 'hbox',
                    margin: '5px 0 0 5px',
                    height: '100%',
                    items: [
                        {
                            xtype: 'tabpanel',
                            width: 800,
                            height: 400,
                            defaults: {
                                autoScroll: true,
                                padding: '10px',
                                width: '100%',
                            },
                            activeTab: 0, // index or id
                            items: [
                                {
                                    title: 'Lain lain',
                                    defaults: {
                                        xtype: 'textfield'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'nfnumberfield',
                                                    width: 170,
                                                    fieldLabel: 'Biaya Jabatan',
                                                    name: 'biaya_jabatan'
                                                }, {
                                                    xtype: 'label',
                                                    padding: '0 0 0 5px',
                                                    text: '%'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'xmoneyfield',
                                                    width: 200,
                                                    fieldLabel: 'Max. Biaya Jabatan',
                                                    name: 'max_biaya_jabatan'
                                                }, {
                                                    xtype: 'label',
                                                    padding: '0 0 0 5px',
                                                    text: 'Per Bulan'
                                                }, {
                                                    padding: '0 0 0 20px',
                                                    xtype: 'xmoneyfield',
                                                    labelWidth: 170,
                                                    fieldLabel: 'Max. Biaya Pensiun Karyawan',
                                                    name: 'max_biaya_pensiun_karyawan'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'nfnumberfield',
                                                    width: 200,
                                                    fieldLabel: 'Astek',
                                                    readOnly:true,
                                                    keepRO:true,
                                                    name: 'astek'
                                                }, {
                                                    xtype: 'label',
                                                    padding: '0 0 0 5px',
                                                    text: '%'
                                                }, {
                                                    xtype: 'nfnumberfield',
                                                    padding: '0 0 0 25px',
                                                    width: 130,
                                                    labelWidth: 60,
                                                    fieldLabel: 'Karyawan',
                                                    name: 'karyawan'
                                                }, {
                                                    xtype: 'label',
                                                    padding: '0 0 0 5px',
                                                    text: '%'
                                                }, {
                                                    xtype: 'nfnumberfield',
                                                    padding: '0 0 0 25px',
                                                    width: 130,
                                                    labelWidth: 60,
                                                    fieldLabel: 'Perusahaan',
                                                    name: 'perusahaan'
                                                }, {
                                                    xtype: 'label',
                                                    padding: '0 0 0 5px',
                                                    text: '%'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'nfnumberfield',
                                                    width: 200,
                                                    fieldLabel: 'Lembur',
                                                    name: 'lembur'
                                                }, {
                                                    xtype: 'label',
                                                    padding: '0 0 0 5px',
                                                    text: 'Jam /Per Bulan'
                                                }, {
                                                    padding: '0 0 0 20px',
                                                    xtype: 'xmoneyfield',
                                                    labelWidth: 100,
                                                    fieldLabel: 'Min Lembur (Rp)',
                                                    name: 'min_lembur'
                                                },
                                            ]
                                        },
                                        {
                                            fieldLabel: 'Kode Perusahaan (BCA)',
                                            name: 'kode_perusahaan'
                                        },
                                        {
                                            fieldLabel: 'No. Rekening BCA',
                                            name: 'no_rekening'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'container',
                                                layout: 'vbox'
                                            },
                                            items: [
                                                {
                                                    defaults: {
                                                        xtype: 'xmoneyfield'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'UMP',
                                                            name: 'ump'
                                                        },
                                                        {
                                                            fieldLabel: 'Min. Upah DTP',
                                                            name: 'min_upah'
                                                        },
                                                        {
                                                            fieldLabel: 'Max. Upah DTP',
                                                            name: 'max_upah'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    items: [
                                                        {
                                                            width: 300,
                                                            margin: '0 0 0 10',
                                                            items: [
                                                                {
                                                                    xtype: 'radiogroup',
                                                                    fieldLabel: '',
                                                                    // Arrange radio buttons into two columns, distributed vertically

                                                                    labelWidth: 1,
                                                                    width: '100%',
                                                                    layout: 'vbox',
                                                                    defaults: {
                                                                        margin: '0 7 0 0'
                                                                    },
                                                                    items: [
                                                                        {boxLabel: 'Tanpa potongan', name: 'opsi_dtp', inputValue: "1", checked: true},
                                                                        {boxLabel: 'DTP Berdasarkan UMP', name: 'opsi_dtp', inputValue: "2"},
                                                                        {boxLabel: 'DTP Berdasarkan KMK No. 486/2003', name: 'opsi_dtp', inputValue: "3"},
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                }

                                            ]
                                        },
                                        , {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: 250,
                                                    fieldLabel: 'ttd Approved',
                                                    name: 'ttd_approved'
                                                }, {
                                                    padding: '0 0 0 20px',
                                                    xtype: 'textfield',
                                                    labelWidth: 100,
                                                    fieldLabel: 'ttd Reviewed',
                                                    name: 'ttd_reviewed'
                                                },
                                            ]
                                        }, {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: 250,
                                                    fieldLabel: 'ttd Prepared',
                                                    name: 'ttd_prepared'
                                                }, {
                                                    padding: '0 0 0 20px',
                                                    xtype: 'textfield',
                                                    labelWidth: 100,
                                                    fieldLabel: 'ttd Pajak',
                                                    name: 'ttd_pajak'
                                                },
                                            ]
                                        }, {
                                            fieldLabel: 'Nama Perusahaan',
                                            width: 600,
                                            name: 'nama_perusahaan'
                                        }, {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Alamat Perusahaan',
                                            width: 600,
                                            name: 'alamat_perusahaan'
                                        }, {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '5px 0 5px 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: 250,
                                                    fieldLabel: 'Kota',
                                                    name: 'kota'
                                                }, {
                                                    padding: '0 0 0 20px',
                                                    xtype: 'textfield',
                                                    labelWidth: 100,
                                                    fieldLabel: 'NPWP',
                                                    name: 'npwp'
                                                },
                                            ]
                                        }, {
                                            fieldLabel: 'Nama Kuasa SPT',
                                            name: 'nama_kuasa_spt'
                                        }, {
                                            fieldLabel: 'NPWP Kuasa',
                                            name: 'npwp_kuasa'
                                        }

                                    ]
                                },
                                {
                                    title: 'P T K P',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ptkpBoxID',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PTKP #',
                                                    name: 'ptkp_code'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Description',
                                                    name: 'ptkp_description'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Value',
                                                    name: 'ptkp_value'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'setparampayrollptkpgrid',
                                            height: 300
                                        }]
                                },
                                {
                                    title: 'Parameter Pajak',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'pajakBoxID',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: ' >= ',
                                                    name: 'pajak_value'
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Pajak (%) ',
                                                    name: 'pajak_percent'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'setparampayrollpajakgrid',
                                            height: 300
                                        }]
                                },
                                 {
                                    title: 'Bayar di muka',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'bayarBoxID',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: ' Kode #',
                                                    displayField: 'code',
                                                    valueField: 'komponengaji_id',
                                                    name: 'bayar_komponengaji_komponengaji_id'
                                                }, 
                                                {
                                                    xtype:'checkbox',
                                                    fieldLabel: 'Bayar di muka',
                                                    name:'bayar_is_dimuka',
                                                    inputValue:1
                                                }
                                                /*{
                                                    width: 300,
                                                    margin: '0 0 10px 0',
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            fieldLabel: 'Bayar di muka',
                                                            // Arrange radio buttons into two columns, distributed vertically

                                                            // labelWidth: 1,
                                                            width: '100%',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                margin: '0 7 0 0'
                                                            },
                                                            items: [
                                                                {boxLabel: 'Iya', name: 'bayar_is_dimuka', inputValue: "1"},
                                                                {boxLabel: 'Tidak', name: 'bayar_is_dimuka', inputValue: "0", checked: true},
                                                            ]
                                                        }

                                                    ]
                                                }*/
                                            ]
                                        },
                                        {
                                            xtype: 'setparampayrollbayargrid',
                                            height: 300
                                        }]
                                },
                                {
                                    title: 'Tunjangan',
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'tunjanganBoxID',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Golongan',
                                                    displayField:'code',
                                                    valueField:'group_id',
                                                    name: 'tujago_group_group_id'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Tunjangan',
                                                    displayField:'code',
                                                    valueField:'komponengaji_id',
                                                    name: 'tujago_komponengaji_komponengaji_id'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Value',
                                                    name: 'tujago_value'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'setparampayrolltunjangangrid',
                                            height: 300
                                        }]
                                },
                               
                            ]
                        }

                    ]
                }


            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarSetparampayrollID',
                    height: 28,
                    defaults: [
                        {
                            xtype: 'button',
                            margin: '0 5 0 0'
                        }
                    ],
                    items: [
                        {
                            action: 'create',
                            iconCls: 'icon-new',
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            text: 'Edit'
                        },
                        {
                            action: 'save',
                            text: 'Save',
                            iconCls: 'icon-save',
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});