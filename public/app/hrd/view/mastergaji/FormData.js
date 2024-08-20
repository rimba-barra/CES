Ext.define('Hrd.view.mastergaji.FormData', {
    alias: 'widget.mastergajiformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'leaveentitlements_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'container',
                        layout: 'hbox'
                    },
                    items: [
                        {
                            defaults: {
                                xtype: 'textfield',
                                margin: '5px 5px 0px 0'
                            },
                            items: [
                                {
                                    fieldLabel: 'NIK / Nama',
                                    name: 'employee_employee_nik',
                                    keepRO: true,
                                    width: 200
                                },
                                {
                                    fieldLabel: '',
                                    name: 'employee_employee_name',
                                    keepRO: true,
                                    width: 250
                                },
                                {
                                    xtype: 'button',
                                    action: 'lookup_employee',
                                    text: 'Browse',
                                    width: 100
                                }
                            ]
                        },
                        {
                            defaults: {
                                xtype: 'textfield',
                                margin: '5px 5px 0px 0'
                            },
                            items: [
                                {
                                    fieldLabel: 'Department',
                                    name: 'department_code',
                                    keepRO: true,
                                    width: 200
                                },
                                {
                                    fieldLabel: '',
                                    name: 'department_department',
                                    keepRO: true,
                                    width: 250
                                }
                            ]
                        },
                        {
                            defaults: {
                                xtype: 'textfield',
                                margin: '5px 5px 10px 0'
                            },
                            items: [
                                {
                                    fieldLabel: 'Golongan',
                                    name: 'group_code',
                                    keepRO: true,
                                    width: 200
                                },
                                {
                                    xtype: 'label',
                                    text: '',
                                }
                            ]
                        }
                    ]
                }
                ,
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
                            title: 'Data Payroll',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            margin: '0 5px 0 0',
                                            items: [
                                                {
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'Gaji Pokok',
                                                    name: 'gajix',
                                                    margin: '5px 10px 5px 0'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            width: 170,
                                                            fieldLabel: 'Service C Point',
                                                            margin: '0 5px 0 0',
                                                            name: 'service_point_a'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width: 60,
                                                            name: 'service_point_b',
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: '[ Metode PPh 21]',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: '',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                    //labelWidth: 1,
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    items: [
                                                        {boxLabel: 'Net', name: 'metode_pph21', inputValue: "N", checked: true},
                                                        {boxLabel: 'Gross Up', name: 'metode_pph21', inputValue: "G"},
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        layout: 'vbox',
                                        margin: '5px 5px 5px 0',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            title: '[ Astek ]',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: '',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                    //labelWidth: 1,
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    items: [
                                                        {boxLabel: 'Ya', name: 'is_astek', inputValue: "1"},
                                                        {boxLabel: 'Tidak', name: 'is_astek', inputValue: "0", checked: true},
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    width: 300,
                                                    name: 'astek_no',
                                                    fieldLabel: 'No Peserta'
                                                },
                                                {
                                                    xtype: 'dfdatefield',
                                                    width: 200,
                                                    name: 'astek_date',
                                                    fieldLabel: 'Tgl. Mulai'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'nfnumberfield',
                                                            width: 170,
                                                            fieldLabel: 'G. Pokok',
                                                            name: 'astek_gaji_percent'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '5px 5px 5px 5px',
                                                            width: 15,
                                                            text: '%'
                                                        },
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            name: 'astek_gaji_value',
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'nfnumberfield',
                                                            width: 170,
                                                            name: 'astek_kecelakaan',
                                                            fieldLabel: 'Kecelakaan'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '5px 5px 5px 5px',
                                                            width: 30,
                                                            text: '%'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'nfnumberfield',
                                                            width: 170,
                                                            name: 'astek_kematian',
                                                            fieldLabel: 'Kematian'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '5px 5px 5px 5px',
                                                            width: 30,
                                                            text: '%'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            title: '[ Dana Pensiun ]',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: '',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                    //labelWidth: 1,
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    items: [
                                                        {boxLabel: 'Ya', name: 'is_danapensiun', inputValue: "1"},
                                                        {boxLabel: 'Tidak', name: 'is_danapensiun', inputValue: "0", checked: true},
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    width: 300,
                                                    name: 'danapensiun_no',
                                                    fieldLabel: 'No Peserta'
                                                },
                                                {
                                                    xtype: 'dfdatefield',
                                                    width: 200,
                                                    name: 'danapensiun_date',
                                                    fieldLabel: 'Tgl. Mulai'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    width: 300,
                                                    name: 'danapensiun_no_karyawan',
                                                    fieldLabel: 'No Karyawan'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'nfnumberfield',
                                                            width: 170,
                                                            name: 'danapensiun_gaji_percent',
                                                            fieldLabel: 'G. Pokok'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '5px 5px 5px 5px',
                                                            width: 15,
                                                            text: '%'
                                                        },
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            name: 'danapensiun_gaji_value',
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'nfnumberfield',
                                                            width: 170,
                                                            name: 'danapensiun_perusahaan',
                                                            fieldLabel: 'Perusahaan'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '5px 5px 5px 5px',
                                                            width: 30,
                                                            text: '%'
                                                        },
                                                        {
                                                            xtype: 'nfnumberfield',
                                                            width: 120,
                                                            name: 'danapensiun_karyawan',
                                                            fieldLabel: 'Karyawan',
                                                            labelWidth: 50
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '5px 5px 5px 5px',
                                                            width: 30,
                                                            text: '%'
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        layout: 'vbox',
                                        margin: '5px 5px 5px 0',
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            defaults: {
                                                xtype: 'fieldset',
                                                layout: 'vbox',
                                                width: '100%',
                                                // margin: '5px 5px 5px 0',
                                                flex: 1
                                            },
                                            items: [
                                                {
                                                    title: '[ BPJS Kesehatan ]',
                                                    defaults: {
                                                        xtype: 'textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            fieldLabel: '',
                                                            // Arrange radio buttons into two columns, distributed vertically

                                                            //labelWidth: 1,
                                                            width: '100%',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                margin: '0 7 0 0'
                                                            },
                                                            items: [
                                                                {boxLabel: 'Ya', name: 'is_bpjskesehatan', inputValue: "1"},
                                                                {boxLabel: 'Tidak', name: 'is_bpjskesehatan', inputValue: "0", checked: true},
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width: 300,
                                                            name: 'bpjs_no',
                                                            fieldLabel: 'No Peserta'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            items: [
                                                                {
                                                                    xtype: 'nfnumberfield',
                                                                    width: 170,
                                                                    name: 'bpjsks_perusahaan',
                                                                    fieldLabel: 'Perusahaan'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '5px 5px 5px 5px',
                                                                    width: 30,
                                                                    text: '%'
                                                                },
                                                                {
                                                                    xtype: 'nfnumberfield',
                                                                    width: 120,
                                                                    name: 'bpjsks_karyawan',
                                                                    fieldLabel: 'Karyawan',
                                                                    labelWidth: 50
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '5px 5px 5px 5px',
                                                                    width: 30,
                                                                    text: '%'
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    title: '[ Pensiun ]',
                                                    defaults: {
                                                        xtype: 'textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            fieldLabel: '',
                                                            // Arrange radio buttons into two columns, distributed vertically

                                                            //labelWidth: 1,
                                                            width: '100%',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                margin: '0 7 0 0'
                                                            },
                                                            items: [
                                                                {boxLabel: 'Ya', name: 'is_pensiun', inputValue: "1"},
                                                                {boxLabel: 'Tidak', name: 'is_pensiun', inputValue: "0", checked: true},
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            items: [
                                                                {
                                                                    xtype: 'nfnumberfield',
                                                                    width: 170,
                                                                    name: 'pensiun_perusahaan',
                                                                    fieldLabel: 'Perusahaan'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '5px 5px 5px 5px',
                                                                    width: 30,
                                                                    text: '%'
                                                                },
                                                                {
                                                                    xtype: 'nfnumberfield',
                                                                    width: 120,
                                                                    name: 'pensiun_karyawan',
                                                                    fieldLabel: 'Karyawan',
                                                                    labelWidth: 50
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    margin: '5px 5px 5px 5px',
                                                                    width: 30,
                                                                    text: '%'
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    title: '[ Metode Bayar ]',
                                                    defaults: {
                                                        xtype: 'textfield'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            fieldLabel: '',
                                                            // Arrange radio buttons into two columns, distributed vertically

                                                            //labelWidth: 1,
                                                            width: '100%',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                margin: '0 7 0 0'
                                                            },
                                                            items: [
                                                                {boxLabel: 'Transfer', name: 'metodebayar_tipe', inputValue: "T", checked: true},
                                                                {boxLabel: 'Cash', name: 'metodebayar_tipe', inputValue: "C"},
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            name: 'bank_bank_id',
                                                            valueField: 'bank_id',
                                                            displayField: 'code',
                                                            fieldLabel: 'Bank'
                                                        },
                                                        {
                                                            name: 'bank_cabang',
                                                            fieldLabel: 'Cabang'
                                                        },
                                                        {
                                                            name: 'bank_nama',
                                                            fieldLabel: 'Nama'
                                                        },
                                                        {
                                                            name: 'bank_rekening',
                                                            fieldLabel: 'No. Acc'
                                                        },
                                                        {
                                                            fieldLabel: 'Kode',
                                                            name: 'bank_kode'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            layout: 'vbox',
                                            margin: '5px 5px 5px 0',
                                            flex: 1,
                                            title: 'Alokasi Gaji',
                                            defaults: {
                                                xtype: 'fieldset',
                                                layout: 'vbox'
                                            },
                                            items: [
                                                {
                                                    title: '[1]',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            name: 'cca_costcontrol_id',
                                                            displayField: 'code',
                                                            valueField: 'costcontrol_id'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width: 300
                                                        }
                                                    ]

                                                },
                                                {
                                                    title: '[2]',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            name: 'ccb_costcontrol_id',
                                                            displayField: 'code',
                                                            valueField: 'costcontrol_id'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width: 300
                                                        }
                                                    ]

                                                },
                                                {
                                                    title: '[3]',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            name: 'ccc_costcontrol_id',
                                                            displayField: 'code',
                                                            valueField: 'costcontrol_id'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width: 300
                                                        }
                                                    ]

                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            title: 'Data Pribadi',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        layout: 'hbox'
                                    },
                                    items: [
                                        {
                                            title: 'Status Kawin',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: '',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                    //labelWidth: 1,
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    items: [
                                                        {boxLabel: 'Belum Kawin', name: 'marriagestatus_id', inputValue: "1", checked: true},
                                                        {boxLabel: 'Janda / Duda', name: 'marriagestatus_id', inputValue: "3"},
                                                        {boxLabel: 'Kawin', name: 'marriagestatus_id', inputValue: "2"},
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'child_count',
                                                    width: 50
                                                }
                                            ]

                                        },
                                        {
                                            title: 'Aktif',
                                            margin: '0px 5px 5px 10px',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: '',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                    //labelWidth: 1,
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    items: [
                                                        {boxLabel: 'Ya', name: 'is_active', inputValue: "1"},
                                                        {boxLabel: 'Tidak', name: 'is_active', inputValue: "0", checked: true},
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            title: '&nbsp;',
                                            margin: '0px 5px 5px 10px',
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    inputValue: "1",
                                                    name: 'is_addincome',
                                                    boxLabel: 'Additional Income'
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    inputValue: "1",
                                                    name: 'is_addastek',
                                                    boxLabel: 'Additional Astek'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        layout: 'hbox'
                                    },
                                    items: [
                                        {
                                            title: 'Tanggal',
                                            defaults: {
                                                xtype: 'dfdatefield',
                                                labelWidth: 50,
                                                width: 150,
                                                margin: '0 10px 0 5px'
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Masuk',
                                                    name: 'hire_date'
                                                },
                                                {
                                                    fieldLabel: 'Keluar',
                                                    name: 'resign_date'
                                                }
                                            ]

                                        },
                                        {
                                            title: 'Sex',
                                            margin: '0px 5px 5px 10px',
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: '',
                                                    // Arrange radio buttons into two columns, distributed vertically

                                                    //labelWidth: 1,
                                                    width: '100%',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        margin: '0 7 0 0'
                                                    },
                                                    items: [
                                                        {boxLabel: 'Laki - laki', name: 'sex', inputValue: "M", checked: true},
                                                        {boxLabel: 'Perempuan', name: 'sex', inputValue: "F"},
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        layout: 'hbox'
                                    },
                                    items: [
                                        {
                                            title: 'NPWP',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'npwp_number',
                                                    width: 250
                                                }
                                            ]

                                        },
                                        {
                                            title: 'WNA',
                                            margin: '0px 5px 5px 10px',
                                            items: [
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'is_wna',
                                                    inputValue: "1",
                                                    boxLabel: 'YA'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    width: 200,
                                    title: 'Alamat Rumah untuk Pajak',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            name: 'alamat_pajak',
                                            fieldLabel: ''
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }

            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});