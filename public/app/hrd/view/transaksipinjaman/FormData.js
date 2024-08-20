Ext.define('Hrd.view.transaksipinjaman.FormData', {
    alias: 'widget.transaksipinjamanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType', 'Hrd.view.transaksipinjaman.GridAngsuran',
        'Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;

        var statusStore = Ext.create('Ext.data.Store', {
            fields: ['status_id', 'status_name'],
            data: [{
                    status_id: 1,
                    status_name: 'Sebelum Jam Masuk'
                }, {
                    status_id: 2,
                    status_name: 'Sesudah Jam Pulang'
                }, {
                    status_id: 3,
                    status_name: 'Keduanya'
                }, {
                    status_id: 4,
                    status_name: 'Hari Libur / OFF'
                }, {
                    status_id: 5,
                    status_name: 'Hari Libur Pendek'
                }]
        });



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'overtime_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'tabpanel',
                    activeTab: 0, // index or id
                    defaults: {
                        padding: '10px'
                    },
                    items: [
                        {
                            title: 'Pengajuan Pinjaman',
                            itemId: 'pengajuanPanelID',
                            defaults: {
                                xtype: 'fieldset'

                            },
                            items: [
                                {
                                    title: 'Data Peminjam',
                                    defaults: {
                                        xtype: 'textfield',
                                        keepRO: true,
                                        readOnly: true
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                keepRO: true,
                                                readOnly: true
                                            },
                                            items: [
                                                {
                                                    name:'employee_employee_nik',
                                                    fieldLabel: 'N.I.K/Nama',
                                                    margin: '0 5px 5px 0',
                                                    width: '200px'
                                                },
                                                {
                                                    name:'employee_employee_name',
                                                    fieldLabel: '',
                                                    margin: '0 5px 5px 0',
                                                    flex: 1
                                                },
                                                {
                                                    xtype:'button',
                                                    text:'BROWSE',
                                                    action:'lookup',
                                                    width:'200px'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'textfield',
                                                keepRO: true,
                                                readOnly: true
                                            },
                                            items: [
                                                {
                                                    name:'employee_hire_date',
                                                    fieldLabel: 'Tgl. Masuk',
                                                    margin: '0 10px 5px 0',
                                                    width: '250px'
                                                },
                                                {
                                                    name:'marriagestatus_marriagestatus',
                                                    fieldLabel: 'Status Kawin',
                                                    flex: 1
                                                },
                                            ]
                                        },
                                        {
                                            name:'department_code',
                                            fieldLabel: 'Departemen'
                                        },
                                        {
                                            name:'group_code',
                                            fieldLabel: 'Golongan'
                                        },
                                    ]
                                },
                                {
                                    title: 'Data Pinjaman',
                                    defaults: {
                                        xtype: 'textfield'
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
                                                    readOnly:true,
                                                    keepRO:true,
                                                    name:'tipepinjaman_code',
                                                    fieldLabel: 'Jenis Pinjaman',
                                                    margin: '0 10px 5px 0',
                                                    width: '250px'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    name: 'tipepinjaman_tipepinjaman_id',
                                                    displayField: 'name',
                                                    valueField: 'tipepinjaman_id',
                                                    fieldLabel: '',
                                                    flex: 1
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'textfield'
                                            },
                                            items: [
                                                {
                                                    xtype:'xmoneyfield',
                                                    name:'nilai',
                                                    enableKeyEvents:true,
                                                    fieldLabel: 'Nilai Pinjaman',
                                                    margin: '0 10px 5px 0',
                                                    width: '300px',
                                                },
                                                {
                                                    name:'bunga',
                                                    enableKeyEvents:true,
                                                    fieldLabel: 'Bunga Pinjaman',
                                                    margin: '0 10px 5px 0',
                                                    width: '200px',
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '%',
                                                    width: '50px'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'textfield'
                                            },
                                            items: [
                                                {
                                                    
                                                    enableKeyEvents:true,
                                                    name:'lama_angsuran',
                                                    fieldLabel: 'Lama Angsuran',
                                                    margin: '0 10px 5px 0',
                                                    width: '300px',
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Bulan',
                                                    width: '50px'
                                                },
                                                {
                                                    enableKeyEvents:true,
                                                    name:'interval',
                                                    fieldLabel: 'Interval',
                                                    margin: '0 10px 5px 0',
                                                    width: '200px',
                                                },
                                                {
                                                    xtype:'xmoneyfield',
                                                    name:'nilai_angsuran',
                                                    readOnly:true,
                                                    keepRO:true,
                                                    fieldLabel: 'Nilai Angsuran',
                                                    margin: '0 10px 5px 0',
                                                    width: '200px',
                                                }
                                            ]
                                        },
                                        {
                                            name:'keterangan',
                                            xtype: 'textareafield',
                                            fieldLabel: 'Keterangan'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults: {
                                                xtype: 'textfield',
                                            },
                                            items: [
                                                {
                                                    xtype:'dfdatefield',
                                                    name:'date',
                                                    fieldLabel: 'Tgl. Pinjaman',
                                                    margin: '0 10px 5px 0',
                                                    width: '250px'
                                                },
                                                {
                                                    xtype:'dfdatefield',
                                                    name:'start_date',
                                                    fieldLabel: 'Tgl. Mulai',
                                                    margin: '0 10px 5px 0',
                                                    width: '250px'
                                                },
                                                {
                                                    xtype:'button',
                                                    action:'proses',
                                                    text:'Buat Jadwal Angsuran',
                                                    width:'250px'
                                                }
                                            ]
                                        },
                                    ]
                                }

                            ]
                        },
                        {
                            title: 'Jadwal Angsuran',
                            itemId: 'jadwalAngsPanelID',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Jadwal Angsuran',
                                    items: [
                                        {
                                            xtype: 'transaksipinjamanangsurangrid',
                                            height: 200
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