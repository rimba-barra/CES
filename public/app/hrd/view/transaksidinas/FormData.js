Ext.define('Hrd.view.transaksidinas.FormData', {
    alias: 'widget.transaksidinasformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.transaksidinas.GridLeave', 'Hrd.view.transaksidinas.GridDate', 'Hrd.library.template.view.MoneyField'],
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
                    name: 'dinas_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                }
                ,
                {
                    xtype: 'hiddenfield',
                    name: 'tujuan_proyek'
                },
                {
                    xtype: 'transaksidinasleavegrid',
                    height: 150,
                    width:800

                },
                {
                    xtype: 'tabpanel',
                    activeTab: 0, // index or id,
                    width:800,
                    height: 350,
                    defaults: {
                        autoScroll: true,
                        padding: '10px'
                                // height:'100%'
                    },
                    items: [
                        {
                            title: 'Data Perjalanan Dinas',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            name: 'employee_name',
                                            readOnly: true,
                                            keepRO: true,
                                            width: 400,
                                            xtype: 'textfield',
                                            fieldLabel: 'Nama Karyawan'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                margin: '5px 10px 0 0',
                                                readOnly: true,
                                                keepRO: true
                                            },
                                            items: [
                                                {
                                                    name: 'group_group',
                                                    fieldLabel: 'Golongan', hidden:true
                                                },
                                                {
                                                    name: 'position_position',
                                                    fieldLabel: 'Jabatan'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                margin: '5px 10px 0 0'
                                            },
                                            items: [
                                                {
                                                    name: 'date',
                                                    xtype: 'dfdatefield',
                                                    fieldLabel: 'Tanggal'
                                                },
                                                {
                                                    name: 'nomor_surat',
                                                    fieldLabel: 'Nomor Surat',
                                                    readOnly: true,
                                                    keepRO: true,
                                                    width: 300
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Tujuan Tugas',
                                            width:700,
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    margin: '0 0 0 10',
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            fieldLabel: '',
                                                            // Arrange radio buttons into two columns, distributed vertically

                                                            labelWidth: 1,
                                                            width: '100%',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                margin: '0 7 0 0'
                                                            },
                                                            flex: 3,
                                                            items: [
                                                                {boxLabel: 'Daftar Proyek', name: 'is_daftarproyek', inputValue: "1", checked: true},
                                                                {boxLabel: 'Proyek Lain', name: 'is_daftarproyek', inputValue: "0"},
                                                            ]
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '5px 5px 5px 0'
                                                    },
                                                    items: [
                                                        {
                                                            fieldLabel: 'Proyek',
                                                            name: 'project_code',
                                                            readOnly: true,
                                                            keepRO: true,
                                                            width: 200
                                                        },
                                                        {
                                                            fieldLabel: '',
                                                            name: 'project_name',
                                                            readOnly: true,
                                                            keepRO: true,
                                                            width: 400
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            text: 'BROWSE',
                                                            action: 'lookup_project'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    width: 600,
                                                    readOnly: true,
                                                    keepRO: true,
                                                    name: 'tujuan_proyek_lain',
                                                    fieldLabel: 'Proyek Lain'
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Deskripsi',
                                                    cols:80
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'xmoneyfield',
                                                margin: '5px 10px 0 0'
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Uang Muka'
                                                },
                                                {
                                                    fieldLabel: 'Kendaraan'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            width:700,
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Berangkat',
                                                    flex: 1,
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                xtype: 'textfield',
                                                                margin: '5px 10px 0 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'dfdatefield',
                                                                    name: 'berangkat',
                                                                    width:200,
                                                                    fieldLabel: 'Tanggal'
                                                                },
                                                                {
                                                                    name: 'berangkat_jam',
                                                                    fieldLabel: 'Jam',
                                                                    width: 60,
                                                                    labelWidth: 25
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Kembali',
                                                    flex: 1,
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            defaults: {
                                                                xtype: 'textfield',
                                                                margin: '5px 10px 0 0'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'dfdatefield',
                                                                    name: 'kembali',
                                                                    width:200,
                                                                    fieldLabel: 'Tanggal'
                                                                },
                                                                {
                                                                    name: 'kembali_jam',
                                                                    fieldLabel: 'Jam',
                                                                    width: 60,
                                                                    labelWidth: 25
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Tugas',
                                            layout: 'hbox',
                                            width:700,
                                            defaults: {
                                                xtype: 'radiofield',
                                                margin: '5px 10px 5px 0',
                                                name: 'tugas',
                                            },
                                            items: [
                                                {
                                                    boxLabel: 'PULK 1 Bulan',
                                                    checked: true,
                                                    inputValue: 1
                                                },
                                                {
                                                    boxLabel: 'PULK > 1 Bulan',
                                                    inputValue: 2
                                                },
                                                {
                                                    boxLabel: 'PPLK 1 Bulan',
                                                    inputValue: 3
                                                },
                                                {
                                                    boxLabel: 'PPLK > 1 Bulan',
                                                    inputValue: 4
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'GENERATE RINCIAN BIAYA',
                                            action: 'generate',
                                            width: 200
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: 'Rincian Biaya',
                            // itemId:'rincianBiayaIdPanel',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'textfield'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '5px 10px 5px 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'dfdatefield',
                                                            readOnly: true,
                                                            keepRO: true,
                                                            name: 'dinasdetail_date',
                                                            fieldLabel: 'Tanggal'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            action: 'updatedate',
                                                            text: 'UPDATE'
                                                        }
                                                    ]
                                                },
                                                {
                                                    readOnly: true,
                                                    keepRO: true,
                                                    name: 'dinasdetail_hari',
                                                    fieldLabel: 'Hari'
                                                },
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'dinasdetail_uang_saku',
                                                    fieldLabel: 'Uang Saku',
                                                    readOnly: true,
                                                    keepRO: true
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 10px 5px 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            name: 'dinasdetail_uang_makan',
                                                            fieldLabel: 'Uang Makan',
                                                            readOnly: true,
                                                            keepRO: true
                                                        },
                                                        {
                                                            name: 'dinasdetail_uang_makan_potong',
                                                            fieldLabel: 'Potongan',
                                                            labelWidth: 50,
                                                            width: 100
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'dinasdetail_transportasi',
                                                    fieldLabel: 'Transportasi'
                                                },
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'dinasdetail_pengeluaran_makan',
                                                    fieldLabel: 'Pengeluaran Makan'
                                                },
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'dinasdetail_airport_tax',
                                                    fieldLabel: 'Airport Tax'
                                                },
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'dinasdetail_biaya_telepon',
                                                    fieldLabel: 'Biaya Telepon'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '5px 10px 5px 0'
                                                    },
                                                    items: [
                                                        {
                                                            name: 'dinasdetail_tinggal_di_rumah',
                                                            xtype: 'checkbox',
                                                            boxLabel: 'Tinggal di rumah'
                                                        },
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            name: 'dinasdetail_tinggal_di_rumah_uang',
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'dinasdetail_biaya_lainnya',
                                                    fieldLabel: 'Biaya Lainnya'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'transaksidinasdategrid',
                                            height: 150

                                        },
                                        /*{
                                         xtype: 'grid',
                                         height: 200
                                         
                                         }*/
                                    ]

                                },
                                {
                                    xtype: 'textareafield',
                                    width: 400,
                                    name: 'dinasdetail_keterangan',
                                    fieldLabel: 'Keterangan Pengeluaran'
                                },
                                {
                                    xtype: 'textareafield',
                                    width: 400,
                                    name: 'dinasdetail_tujuan',
                                    fieldLabel: 'Tujuan / Di mana Diadakan'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'fieldset',
                                        defaults: {
                                            xtype: 'textfield',
                                            fieldLabel: '',
                                            keepRO: true,
                                            readOnly: true
                                        },
                                    },
                                    items: [
                                        {
                                            title: 'Total Uang Saku',
                                            items: [
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'total_uang_saku',
                                                }
                                            ]

                                        },
                                        {
                                            title: 'Total Uang Makan',
                                            items: [
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'total_uang_makan',
                                                }
                                            ]

                                        },
                                        {
                                            title: 'TOTAL',
                                            items: [
                                                {
                                                    xtype: 'xmoneyfield',
                                                    name: 'total_uang',
                                                }
                                            ]

                                        }
                                    ]
                                }
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