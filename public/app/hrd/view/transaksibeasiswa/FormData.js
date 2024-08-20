Ext.define('Hrd.view.transaksibeasiswa.FormData', {
    alias: 'widget.transaksibeasiswaformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType', 'Hrd.view.transaksibeasiswa.GridBeasiswa',
        'Hrd.view.transaksibeasiswa.GridMasukSekolah'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;


        var jenjangx = [{
                number: 1,
                name: 'SD'
            }, {
                number: 2,
                name: 'SMP'
            }, {
                number: 3,
                name: 'SMA'
            },{
                number: 4,
                name: 'SMU'
            },{
                number: 5,
                name: 'SMK'
            },{
                number: 6,
                name: 'UC'
            }];

        var jenjangxStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: jenjangx
        });

        var jenjangx2Store = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: jenjangx
        });


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'beasiswatran_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'child_relation_id'
                },
                {
                    xtype: 'tabpanel',
                    activeTab: 0, // index or id
                    itemId: 'bmskIdTabpanel',
                    items: [
                   
                        {
                            title: 'Beasiswa',
                            itemId: 'bmskIdTabpanel1',
                            defaults: {
                                xtype: 'textfield',
                                margin: '5px 10px 0 10px'
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    name:'is_freetext',
                                    checked:true,
                                    boxLabel: 'Ambil Data Dari Karyawan',
                                    fieldLabel:' '
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    itemId:'beasiswaOrangTuaContainerID',
                                    defaults: {
                                        xtype: 'textfield'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Nama Orang Tua',
                                            name: 'employee_employee_nik',
                                            readOnly:true,
                                            keepRO:true,
                                            width: '200px'

                                        },
                                        {
                                            margin: '0 0 0 5px',
                                            name: 'employee_employee_name',
                                            readOnly:true,
                                            keepRO:true,
                                            fieldLabel: '',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 20px',
                                            action: 'lookupemployee',
                                            text: 'BROWSE',
                                            width: '100px'
                                        }
                                    ]
                                },
                                {
                                    fieldLabel: 'Nama Orang Tua',
                                    name: 'nama_orangtua',
                                    hidden:true,
                                    width: 350
                                },
                                {
                                    fieldLabel: 'Nomor KTP',
                                    name: 'ktp_orangtua',
                                    hidden:true,
                                    width: 350
                                },
                                {
                                    fieldLabel: 'Nama Anak',
                                    name: 'nama_anak',
                                    width: 350
                                },
                                {
                                    xtype: 'combobox',
                                    //store: jenjangxStore,
                                    fieldLabel: 'Jenjang Pendidikan',
                                    name: 'jenjang',
                                    displayField: 'jenjangpendidikan',
                                    valueField: 'jenjangpendidikan_id'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'nfnumberfield',
                                        width: 150,
                                        margin: '0 0 0 10px'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Kelas',
                                            name: 'kelas'
                                        },
                                        {
                                            fieldLabel: 'Semester',
                                            name: 'semester'
                                        },
                                        {
                                            fieldLabel: 'Rangking',
                                            name: 'rangking'
                                        }
                                    ]
                                }
                                ,
                                {
                                    fieldLabel: 'Nama Sekolah',
                                    name: 'nama_sekolah',
                                    width: 400
                                },
                                {
                                    xtype: 'dfdatefield',
                                    fieldLabel: 'Tanggal Pemberian',
                                    name: 'date'
                                },
                                {
                                    xtype: 'checkboxgroup',
                                    fieldLabel: 'Persyaratan',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'groupBy',
                                    layout: 'vbox',
                                    items: [
                                        {boxLabel: 'Surat Keterangan dari Sekolah', name: 'syarat_surat_sekolah', inputValue: 1},
                                        {boxLabel: 'Foto Copy Raport Terakhir', name: 'syarat_fotocopy_raport', inputValue: 1},
                                        {boxLabel: 'Kartu Keluarga', name: 'syarat_kartu_keluarga', inputValue: 1}
                                    ]
                                },
                                {
                                    xtype: 'transaksibeasiswabeasiswagrid',
                                    height: 200
                                }
                            ]
                        },
                        {
                            title: 'Masuk Sekolah',
                            itemId: 'bmskIdTabpanel2',
                            defaults: {
                                xtype: 'textfield',
                                margin: '5px 10px 0 10px'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'textfield'
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Nama Orang Tua',
                                            width: '200px',
                                            name: 'x_employee_employee_nik'


                                        },
                                        {
                                            margin: '0 0 0 5px',
                                            fieldLabel: '',
                                            flex: 1,
                                            name: 'x_employee_employee_name'
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 20px',
                                            action: 'x_lookupemployee',
                                            text: 'BROWSE',
                                            width: '100px'
                                        }
                                    ]
                                },
                                {
                                    fieldLabel: 'Nama Anak',
                                    name: 'x_child_name'
                                },
                                {
                                    xtype: 'combobox',
                                   // store: jenjangx2Store,
                                    fieldLabel: 'Jenjang Pendidikan',
                                    name: 'x_jenjang',
                                    displayField: 'jenjangpendidikan',
                                    valueField: 'jenjangpendidikan_id'
                                },
                                {
                                    fieldLabel: 'Kelas',
                                    name: 'x_kelas'
                                },
                                ,
                                        {
                                            fieldLabel: 'Nama Sekolah',
                                            name: 'x_nama_sekolah'
                                        },
                                {
                                    xtype: 'dfdatefield',
                                    fieldLabel: 'Tanggal Pemberian',
                                    name: 'x_date'
                                },
                                {
                                    xtype: 'checkboxgroup',
                                    fieldLabel: 'Persyaratan',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'groupBy',
                                    layout: 'vbox',
                                    items: [
                                        {boxLabel: 'Surat Keterangan dari Sekolah', name: 'x_syarat_surat_sekolah', inputValue: 1},
                                        {boxLabel: 'Foto Copy Raport Terakhir', name: 'x_syarat_fotocopy_raport', inputValue: 1},
                                        {boxLabel: 'Kartu Keluarga', name: 'x_syarat_kartu_keluarga', inputValue: 1}
                                    ]
                                },
                                {
                                    xtype: 'transaksibeasiswamasuksekolahgrid',
                                    height: 200
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