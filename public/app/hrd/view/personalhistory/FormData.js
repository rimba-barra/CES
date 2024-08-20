Ext.define('Hrd.view.personalhistory.FormData', {
    alias: 'widget.personalhistoryformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.personalhistory.GridTandaKasih',
        'Hrd.view.personalhistory.GridMutasi',
        'Hrd.view.personalhistory.GridPromosi',
        'Hrd.view.personalhistory.GridRotasi',
        'Hrd.view.personalhistory.GridStatusKaryawan',
        'Hrd.view.personalhistory.GridPelatihan',
        'Hrd.view.personalhistory.GridJenisKlaim',
        'Hrd.view.personalhistory.GridTanggalKlaim',
        'Hrd.view.personalhistory.GridDinas',
        'Hrd.view.personalhistory.GridBiayaJalan',
        'Hrd.view.personalhistory.GridBiayaTrans',
        'Hrd.view.personalhistory.GridBiayaEnt',
        'Hrd.view.personalhistory.GridSp',
    ],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        var count = 13;
        var listNamaBulan = ['Januari', 'Februari', 'Maret', 'April',
            'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        var listAbsent = [];
        listAbsent.push({
            xtype: 'container',
            margin: '0 0 10px 0',
            style: 'background-color:#e6e6e6;',
            layout: 'hbox',
            defaults: {
                xtype: 'label',
                fieldLabel: ' ',
                labelWidth: '0px',
                margin: '0 20px 0 0',
                style: 'font-weight:bold;',
                width: '50px'
            },
            items: [
                {
                    text: 'Bulan',
                },
                {
                    text: 'Total Hadir'
                },
                {
                    text: 'Hadir Normal'
                },
                {
                    text: 'Hadir Libur'
                },
                {
                    text: 'Cuti'
                },
                {
                    text: 'Alpha'
                },
                {
                    text: 'Sakit'
                },
                {
                    text: 'Ijin'
                },
                {
                    text: 'Terlambat'
                }
            ]
        });
        for (var i = 1; i <= count; i++) {
            listAbsent.push({
                xtype: 'container',
                margin: '0 0 10px 0',
                layout: 'hbox',
                defaults: {
                    xtype: 'textfield',
                    fieldLabel: ' ',
                    labelWidth: '0px',
                    margin: '0 20px 0 0',
                    width: '50px'
                },
                items: [
                    {
                        xtype: 'label',
                        text: listNamaBulan[i - 1]
                    },
                    {
                        name: 'total_hadir_' + i
                    },
                    {
                        name: 'hadir_normal_' + i
                    },
                    {
                        name: 'hadir_libur_' + i
                    },
                    {
                        name: 'cuti_' + i
                    },
                    {
                        name: 'alpha_' + i
                    },
                    {
                        name: 'sakit_' + i
                    },
                    {
                        name: 'ijin_' + i
                    },
                    {
                        name: 'terlambat_' + i
                    }
                ]
            });
        }

        var date = new Date();

        /* TAHUN STORE*/
        var tahuns = [];
        for (i = 2005; i <= 2025; i++) {

            // temp = i < 10 ? '0' + i : i;

            tahuns.push({
                "number": i, "name": i
            });
        }

        var tahunStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: tahuns
        });

        var tahunObatStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: tahuns
        });
        /* /TAHUN STORE*/


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    itemId:'tabPanelPersonalHistoryId',
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
                            title: 'Pemberian Tanda Kasih',
                            itemId: 'tandakasihTabId',
                            items: [
                                {
                                    xtype: 'personalhistorytandakasihgrid'
                                }
                            ]
                        },
                        {
                            title: 'Perjalanan Dinas',
                            itemId: 'dinasTabId',
                            items: [
                                {
                                    xtype: 'container',
                                    
                                    layout: 'hbox',
                                    margin:'0 0 10px 0',
                                    items: [
                                        {
                                            xtype: 'personalhistorydinasgrid',
                                            margin: '0 10px 0 0',
                                            height: 160
                                        },
                                        {
                                            xtype: 'container',
                                       
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                   
                                                    margin: '0 0 10px 0',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '0 10px 0 0',
                                                             name:'dinas_group_code',
                                                            fieldLabel: 'Golongan', 
                                                            hidden:true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width:200,
                                                             name:'dinas_position_position',
                                                            fieldLabel: 'Jabatan'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 10px 0',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '0 10px 0 0',
                                                            name:'dinas_tugas',
                                                            fieldLabel: 'Tugas'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width:200,
                                                            name:'dinas_uang_muka',
                                                            fieldLabel: 'Uang Muka'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name:'dinas_tujuan',
                                                    fieldLabel: 'Tujuan'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                     name:'dinas_kendaraan',
                                                    fieldLabel: 'Kendaraan'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 10px 0',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            margin: '0 10px 0 0',
                                                            name:'dinas_berangkat',
                                                            fieldLabel: 'Tgl Pergi'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width:200,
                                                            name:'dinas_kembali',
                                                            fieldLabel: 'Tgl Kembali'
                                                        }
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tabpanel',
                                    width: 600,
                              
                                    defaults: {
                                        autoScroll: true,
                                        padding: '10px',
                                        width: '100%',
                                    },
                                    activeTab: 0, // index or id
                                    items: [
                                        {
                                            title:'Rincian Biaya Perjalanan',
                                            items:[
                                                {
                                                    xtype:'personalhistorybiayajalangrid',
                                                    height:200
                                                }
                                            ]
                                        },
                                        {
                                            title:'Rincian Biaya Transportasi',
                                            items:[
                                                {
                                                    xtype:'personalhistorybiayatransgrid',
                                                    height:200
                                                },
                                                {
                                                    xtype:'container',
                                                    defaults:{
                                                       margin:'10px 10px 0 0', 
                                                    },
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype:'label',
                                                            text:'Biaya Dibuat oleh',
                                                            width:100,
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            fieldLabel:'Nama'
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            fieldLabel:'Disetujui oleh',
                                                            width:200
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype:'container',
                                                    defaults:{
                                                       margin:'10px 10px 0 0', 
                                                    },
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype:'label',
                                                            text:' ',
                                                            width:100,
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            fieldLabel:'Tanggal'
                                                        },
                                                        {
                                                            xtype:'label',
                                                            text:' '
                                                        },
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            title:'Rincian Biaya Entertainment',
                                            items:[
                                                
                                                {
                                                    xtype:'personalhistorybiayaentgrid',
                                                    height:200
                                                },
                                                {
                                                    xtype:'container',
                                                    defaults:{
                                                       margin:'10px 10px 0 0', 
                                                    },
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype:'label',
                                                            text:'Biaya Dibuat oleh',
                                                            width:100,
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            fieldLabel:'Nama'
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            fieldLabel:'Disetujui oleh',
                                                            width:200
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype:'container',
                                                    defaults:{
                                                       margin:'10px 10px 0 0', 
                                                    },
                                                    layout:'hbox',
                                                    items:[
                                                        {
                                                            xtype:'label',
                                                            text:' ',
                                                            width:100,
                                                        },
                                                        {
                                                            xtype:'textfield',
                                                            fieldLabel:'Tanggal'
                                                        },
                                                        {
                                                            xtype:'label',
                                                            text:' '
                                                        },
                                                    ]
                                                }
                                            
                                            ]
                                        }
                                    ]
                                }
                                /// xxx
                            ]
                        },
                        {
                            title: 'Pengobatan',
                            itemId: 'pengobatanTabId',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            margin: '0 20px 0 0',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    labelWidth: '70px',
                                                    width: 150,
                                                    name: 'tahun_obat',
                                                    store: tahunObatStore,
                                                    value: date.getFullYear(),
                                                    displayField: 'name',
                                                    valueField: 'number',
                                                    fieldLabel: 'Tahun',
                                                },
                                                {
                                                    xtype: 'personalhistoryjenisklaimgrid',
                                                    height: 150,
                                                    width: 200,
                                                    margin: '0 0 10px 0'
                                                },
                                                {
                                                    xtype: 'personalhistorytanggalklaimgrid',
                                                    height: 150,
                                                    width: 200,
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                readOnly: true
                                            },
                                            items: [
                                                {
                                                    margin: '20px 0 5px 0',
                                                    xtype: 'dfdatefield',
                                                    name: 'claim_date',
                                                    fieldLabel: 'Tanggal',
                                                },
                                                {
                                                    name: 'docter_name',
                                                    fieldLabel: 'Nama Dokter',
                                                    width: 400,
                                                },
                                                {
                                                    fieldLabel: 'Nama Rumah Sakit',
                                                    width: 400,
                                                },
                                                {
                                                    name: 'apotic_name',
                                                    fieldLabel: 'Nama Apotik',
                                                    width: 400,
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    cols: 50,
                                                    name: 'description',
                                                    rows: 5,
                                                    fieldLabel: 'Keterangan'
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '0 0 5px 0',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'plafon',
                                                            readOnly: true,
                                                            margin: '0 10px 5px 0',
                                                            fieldLabel: 'Plafon'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'obat_group_code',
                                                            readOnly: true,
                                                            fieldLabel: 'Golongan', 
                                                            hidden:true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '0 0 5px 0',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            readOnly: true,
                                                            name: 'total',
                                                            margin: '0 10px 5px 0',
                                                            fieldLabel: 'Jumlah'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'total_klaim',
                                                            readOnly: true,
                                                            fieldLabel: 'Total Klaim'
                                                        }
                                                    ]
                                                },
                                                {
                                                    readOnly: true,
                                                    name: 'saldo',
                                                    fieldLabel: 'Sisa Plafon'
                                                },
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            title: 'Personal Data',
                            itemId: 'personalDataTabId',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                readOnly: true,
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'N.I.K',
                                                    name: 'employee_nik'
                                                },
                                                {
                                                    fieldLabel: 'Tempat Lahir',
                                                    name: 'birth_place'
                                                },
                                                {
                                                    fieldLabel: 'Jenis Kelamin',
                                                    name: 'sex'
                                                },
                                                {
                                                    fieldLabel: 'Agama',
                                                    name: 'religion_religion'
                                                },
                                                {
                                                    fieldLabel: 'Golongan Darah',
                                                    name: 'bloodgroup_bloodgroup'
                                                },
                                                {
                                                    fieldLabel: 'No. Telepon',
                                                    name: 'hp_number'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            margin: '0 0 0 10px',
                                            defaults: {
                                                xtype: 'textfield',
                                                readOnly: true,
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Nama Lengkap',
                                                    name: 'employee_name'
                                                },
                                                {
                                                    fieldLabel: 'Tanggal Lahir',
                                                    name: 'birth_date'
                                                },
                                                {
                                                    fieldLabel: 'No KTP',
                                                    name: 'ktp_number'
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Alamat',
                                                    name: 'address',
                                                    cols: 60,
                                                    rows: 5
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Status Kawin',
                                            layout: 'vbox',
                                            width: 500,
                                            defaults: {
                                                xtype: 'textfield',
                                                readOnly: true,
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Status',
                                                    name: 'marriagestatus_marriagestatus'
                                                },
                                                {
                                                    fieldLabel: 'Jumlah Anak',
                                                    name: 'child_count'
                                                },
                                                {
                                                    fieldLabel: 'Nama Istri / Suami',
                                                    name: 'spouse_name'
                                                },
                                                {
                                                    fieldLabel: 'Nama Anak',
                                                    name: 'anak1'
                                                },
                                                {
                                                    fieldLabel: ' ',
                                                    name: 'anak2'
                                                },
                                                {
                                                    fieldLabel: ' ',
                                                    name: 'anak3'
                                                }

                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Foto',
                                            margin: '0 0 0 10px',
                                            defaults: {
                                                xtype: 'textfield'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    margin: '30 30',
                                                    width: 200,
                                                    height: 250,
                                                    bodyStyle: 'background:none',
                                                    itemId: 'photo_image',
                                                    html: ''
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                readOnly: true,
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Tanggal Masuk',
                                                    name: 'hire_date'
                                                },
                                                {
                                                    fieldLabel: 'Pendidikan Akhir',
                                                    name: 'education_education'
                                                },
                                                {
                                                    fieldLabel: 'Divisi',
                                                    name: 'division_code'
                                                },
                                                {
                                                    fieldLabel: 'Departemen',
                                                    name: 'department_code'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            margin: '0 0 0 10px',
                                            defaults: {
                                                xtype: 'textfield',
                                                readOnly: true,
                                            },
                                            items: [
                                                {
                                                    fieldLabel: 'Tanggal Keluar',
                                                    name: 'nonactive_date'
                                                },
                                                {
                                                    fieldLabel: 'Golongan',
                                                    name: 'group_code', 
                                                            hidden:true
                                                },
                                                {
                                                    fieldLabel: 'Status Karyawan',
                                                    name: 'employeestatus_employeestatus'
                                                },
                                                {
                                                    fieldLabel: 'Jabatan',
                                                    name: 'position_position'
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            title: 'Absen dan Cuti',
                            itemId: 'absentCutiTabId',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            margin: '40px 0 0 0',
                                            name: 'tahun_absencuti',
                                            store: tahunStore,
                                            value: date.getFullYear(),
                                            displayField: 'name',
                                            valueField: 'number',
                                            fieldLabel: 'Tahun',
                                        },
                                        {
                                            xtype: 'label',
                                            text: '',
                                            width: '200px'
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Sisa Cuti',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 10px 0',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Cuti Tahunan',
                                                            name: 'jc_tahunan_absencuti',
                                                            width: '150px'
                                                        },
                                                        {
                                                            margin: '0 0 0 10px',
                                                            xtype: 'label',
                                                            text: 'Hari'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Cuti 5 Tahun',
                                                            name: 'jc_limatahunan_absencuti',
                                                            width: '150px'
                                                        },
                                                        {
                                                            margin: '0 0 0 10px',
                                                            xtype: 'label',
                                                            text: 'Hari'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items: listAbsent
                                }
                            ]
                        },
                        {
                            title: 'Penilaian',
                            items: [
                            ]
                        },
                        {
                            title: 'Pelatihan / Kursus',
                            itemId:'trainingTabId',
                            items: [
                                {
                                    xtype: 'personalhistorypelatihangrid',
                                    height:300
                                }
                            ]
                        },
                        {
                            title: 'Karir',
                            itemId: 'karirTabId',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    width: 750,
                                    height: 300,
                                    defaults: {
                                        autoScroll: true,
                                        padding: '10px',
                                        width: '100%',
                                    },
                                    activeTab: 0, // index or id
                                    items: [
                                        {
                                            title: 'Promosi',
                                            items: [
                                                {
                                                    xtype: 'personalhistorypromosigrid'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Mutasi',
                                            items: [
                                                {
                                                    xtype: 'personalhistorymutasigrid'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Rotasi',
                                            items: [
                                                {
                                                    xtype: 'personalhistoryrotasigrid'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Status Karyawan',
                                            items: [
                                                {
                                                    xtype: 'personalhistorystatuskaryawangrid'
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            title: 'SP',
                            itemId:'spTabId',
                            items: [
                                {
                                    xtype: 'personalhistoryspgrid',
                                    height:300
                                }
                            ]
                        },
                    ]
                }
            ],
            dockedItems: []
        });
        me.callParent(arguments);
    }
});