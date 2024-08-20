Ext.define('Hrd.view.perjalanandinas.FormData', {
    alias: 'widget.perjalanandinasformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'perjalanandinas_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'group_group_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'employee_employee_name',
                            keepRO: true,
                            readOnly: true,
                            width: 400,
                            margin: '0 10px 10px 0',
                            fieldLabel: 'Nama Karyawan'
                        },
                        {
                            width: 75,
                            xtype: 'button',
                            disabled:true,
                            text: 'BROWSE',
                            action: 'browse'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    width: 500,
                    keepRO: true,
                    readOnly: true,
                    name: 'department_code',
                    fieldLabel: 'Department'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            margin: '0 10px 10px 0',
                            width: 300,
                            keepRO: true,
                            readOnly: true,
                            name: 'position_position',
                            //  name:'mastersk_tanggal',
                            fieldLabel: 'Jabatan'
                        },
                        {
                            xtype: 'textfield',
                            width: 200,
                            keepRO: true,
                            readOnly: true,
                            name: 'group_code',
                            //  name:'mastersk_tanggal',
                            fieldLabel: 'Gol'
                        }
                    ]
                },
                
                {
                    xtype: 'dfdatefield',
                    name: 'perjalanandinas_date',
                    fieldLabel: 'Tanggal'
                },
                {
                    xtype: 'combobox',
                    name: 'negaratujuan_negaratujuan_id',
                    displayField: 'negaratujuan',
                    valueField: 'negaratujuan_id',
                    //   margin: '0 10px 10px 0',
                    width: 500,
                    fieldLabel: 'Negara Tujuan '
                },
                {
                    xtype: 'textfield',
                    name: 'perjalanandinas_nomor',
                    width:400,
                    keepRO:true,
                    readOnly:true,
                    fieldLabel: 'Nomor'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Status Perjalanan',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'perjalanandinas_statusid',
                    layout: 'hbox',
                    items: [
                        {boxLabel: 'PU (Penugasan Umum)', name: 'perjalanandinas_status', inputValue: 0, checked: true},
                        {boxLabel: 'PP (Penugasan Project)', name: 'perjalanandinas_status', inputValue: 1},
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Lama Perjalanan',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'perjalanandinas_lamaid',
                    layout: 'hbox',
                    items: [
                        {boxLabel: '<= 1 bulan', name: 'perjalanandinas_lama', inputValue: 1, checked: true},
                        {boxLabel: '> 1 bulan', name: 'perjalanandinas_lama', inputValue: 0},
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            margin: '0 0 5px 0',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Bertugas Ke',
                                    width: 110,
                                },
                                {
                                    xtype: 'radiofield',
                                    name: 'perjalanandinas_is_project',
                                    inputValue: 1,
                                    checked: true,
                                    boxLabel: 'Project',
                                    width: 90,
                                },
                                {
                                    xtype: 'combobox',
                                    labelWidth: 5,
                                    fieldLabel: ' ',
                                    width: 500,
                                    name: 'perjalanandinas_project_id',
                                    displayField: 'name',
                                    valueField: 'project_id',
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5px 0',
                            items: [
                                {
                                    xtype: 'label',
                                    text: '     ',
                                    width: 110,
                                },
                                {
                                    xtype: 'radiofield',
                                    name: 'perjalanandinas_is_project',
                                    inputValue: 0,
                                    width: 90,
                                    boxLabel: 'Non Project'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'perjalanandinas_nonproject',
                                    labelWidth: 5,
                                    width: 500,
                                    fieldLabel: ' '
                                }
                            ]
                        }
                    ]
                },
                
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'uangmuka_currency_id',
                            displayField: 'currency_name',
                    valueField: 'currency_id',
                            margin: '0 10px 10px 0',
                            fieldLabel: 'Uang Muka'
                        },
                        {
                            xtype: 'xmoneyfield',
                            labelWidth: 5,
                            name: 'uangmuka_amount',
                            fieldLabel: ' '
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            displayField: 'currency_name',
                            valueField: 'currency_id',
                            name: 'uangkendaraan_currency_id',
                            
                            margin: '0 10px 10px 0',
                            fieldLabel: 'Uang Kendaraan'
                        },
                        {
                            xtype: 'xmoneyfield',
                            labelWidth: 5,
                            name: 'uangkendaraaan_amount',
                            fieldLabel: ' '
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'dfdatefield',
                            name: 'tanggal_berangkat',
                            displayField: 'nomor',
                            valueField: 'mastersk_id',
                            margin: '0 10px 30px 0',
                            fieldLabel: 'Tanggal Berangkat'
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 20,
                            name: 'jam_berangkat',
                            fieldLabel: 'Jam'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'dfdatefield',
                            name: 'tanggal_kembali',
                            displayField: 'nomor',
                            valueField: 'mastersk_id',
                            margin: '0 10px 30px 0',
                            fieldLabel: 'Tanggal Kembali'
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 20,
                            name: 'jam_kembali',
                            fieldLabel: 'Jam'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'approval_employee_id',
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                    width: 500,
                    fieldLabel: 'Approval To'
                },
                {
                    xtype: 'combobox',
                    name: 'cc_employee_id',
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                    width: 500,
                    fieldLabel: 'CC'
                },
                {
                    xtype: 'textareafield',
                    cols: 70,
                    name: 'notes',
                    rows: 3,
                    fieldLabel: 'Keperluan'
                },
                {
                    xtype: 'fieldset',
                    title: 'Rincian Biaya',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'xmoneyfield',
                                    name: 'exchange_rate',
                                    margin: '0 10px 5px 0',
                                    fieldLabel: 'Exchange Rate'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    displayField: 'currency_name',
                                    valueField: 'currency_id',
                                  //  xtype: 'textfield',
                                    margin: '0 10px 5px 0',
                                    keepRO: true,
                                    readOnly: true,
                                    name: 'rincian_uangmakan_currency_id',
                                    fieldLabel: 'Uang Makan'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    keepRO: true,
                                    readOnly: true,
                                    name: 'rincian_uangmakan_amount',
                                    margin: '0 10px 5px 0',
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'label',
                                    text: 'x',
                                    width: 15
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'rincian_uangmakan_durasi',
                                    width: 30,
                                    margin: '0 10px 5px 0',
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    labelWidth: 40,
                                    keepRO: true,
                                    readOnly: true,
                                    name: 'rincian_uangmakan_total',
                                    fieldLabel: ' Hari = '
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                   // xtype: 'textfield',
                                   xtype: 'combobox',
                                    displayField: 'currency_name',
                                    valueField: 'currency_id',
                                    margin: '0 10px 5px 0',
                                    keepRO: true,
                                    readOnly: true,
                                    name: 'rincian_uangsaku_currency_id',
                                    fieldLabel: 'Uang Saku'
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    keepRO: true,
                                    readOnly: true,
                                    name: 'rincian_uangsaku_amount',
                                    margin: '0 10px 5px 0',
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'label',
                                    text: 'x',
                                    width: 15
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'rincian_uangsaku_durasi',
                                    width: 30,
                                    margin: '0 10px 5px 0',
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    keepRO: true,
                                    readOnly: true,
                                    name: 'rincian_uangsaku_total',
                                    labelWidth: 40,
                                    fieldLabel: ' Hari = '
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: ' ',
                                    width: 480,
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    keepRO: true,
                                    readOnly: true,
                                    name: 'total',
                                    labelWidth: 40,
                                    fieldLabel: 'Total = '
                                }
                            ]
                        },
                    ]
                },
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});