Ext.define('Hrd.view.absentreport.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.absentreportpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'AbsentReportPanel',
    layout: 'fit',
    autoScroll: true,
    height: '300px',
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        var reportType = [{
                number: 1,
                name: 'Recap Format A'
            }, {
                number: 2,
                name: 'Recap Format B'
            }, {
                number: 3,
                name: 'Recap Format C'
            }, {
                number: 4,
                name: 'Recap Format D'
            }, {
                number: 18,
                name: 'Recap Format E'
            },{
                number: 5,
                name: 'Recap Man Hour Loss'
            }, {
                number: 6,
                name: 'Daily'
            }, {
                number: 7,
                name: 'Daily Weekly'
            }, {
                number: 8,
                name: 'Daily Note Employee'
            }, {
                number: 9,
                name: 'Absent'
            }, {
                number: 10,
                name: 'No Clock In'
            }, {
                number: 11,
                name: 'No Clock Out'
            }, {
                number: 12,
                name: 'Late'
            }, {
                number: 13,
                name: 'Early Out'
            }, {
                number: 14,
                name: 'Attendance Bonus'
            }, {
                number: 15,
                name: 'Man Hour Loss'
            }, {
                number: 16,
                name: 'Activity'
            }, {
                number: 17,
                name: 'Other'
            }, {
                number: 17,
                name: 'DailyB'
            }];

        var reportTypeStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: reportType
        });

        var based = [{
                number: 1,
                name: 'Division'
            }, {
                number: 2,
                name: 'Category ( Golongan )'
            }, {
                number: 3,
                name: 'N.I.K'
            }, {
                number: 4,
                name: 'Group ( Kelompok)'
            }];

        var basedStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: based
        });




        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    bodyPadding: 10,
                    itemId: 'employeeAbsentDatasFormID',
                    width: '100%',
                    autoScroll: true,
                    height: '300px',
                    defaults: {
                        xtype: 'combobox',
                        margin: '10px 0'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'project_project_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'project_name'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_pt_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_name'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Report Type',
                            labelWidth: 100,
                            margin: '0 20px 0 0',
                            layout: 'vbox',
                            width: 200,
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'sexID',
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Rekap Format A', name: 'report_type', inputValue: "format_a", checked: true},
                                        {boxLabel: 'Rekap Format A (Izin PM)', name: 'report_type', inputValue: "izin_pm"},
                                        //{boxLabel: 'Rekap Format B', name: 'report_type', inputValue: "format_b"},
                                        //{boxLabel: 'Rekap Format C', name: 'report_type', inputValue: "format_c"},
                                        //{boxLabel: 'Rekap Format D', name: 'report_type', inputValue: "format_d"},
                                        {boxLabel: 'Rekap Format E', name: 'report_type', inputValue: "format_e"},
                                        //{boxLabel: 'Rekap Man Hour Loss', name: 'report_type', inputValue: "rekapmanhourloss"},
                                        {boxLabel: 'Harian', name: 'report_type', inputValue: "harian"},
                                        {boxLabel: 'Harian (MHL)', name: 'report_type', inputValue: "harianmhl"},
                                        {boxLabel: 'Harian Format B', name: 'report_type', inputValue: "harianb"},
                                        //{boxLabel: 'Harian Format C', name: 'report_type', inputValue: "harianc"}, // edited by wulan sari 20190308
                                        //{boxLabel: 'Harian Mingguan', name: 'report_type', inputValue: "mingguan"},
                                        //{boxLabel: 'Catatan Harian Karyawan', name: 'report_type', inputValue: "catatan"},
                                        //{boxLabel: 'Tidak Masuk', name: 'report_type', inputValue: "tidakmasuk"},
                                        //{boxLabel: 'Absen Tidak Lengkap', name: 'report_type', inputValue: "tidaklengkap"},
                                        //{boxLabel: 'Tidak Absen Masuk', name: 'report_type', inputValue: "no_absen_masuk"},
                                        //{boxLabel: 'Tidak Absen Pulang', name: 'report_type', inputValue: "no_absen_pulang"},
                                        {boxLabel: 'Terlambat', name: 'report_type', inputValue: "terlambat"},
                                        {boxLabel: 'Kehadiran', name: 'report_type', inputValue: "kehadiran"}, // added by wulan sari 20200710
                                        //{boxLabel: 'Pulang Cepat', name: 'report_type', inputValue: "pulang_cepat"},
                                        //{boxLabel: 'Bonus Kehadiran', name: 'report_type', inputValue: "bonus_kehadiran"},
                                        //{boxLabel: 'Man Hour Loss', name: 'report_type', inputValue: "manhourloss"},
                                        //{boxLabel: 'Aktivitas', name: 'report_type', inputValue: "aktivitas"},
                                        //{boxLabel: 'Lain - lain', name: 'report_type', inputValue: "lainlain"},
                                        //{boxLabel: 'Data Konsultan', name: 'report_type', inputValue: "datakonsultan"}

                                        //added by Michael 2021-08-24
                                        {boxLabel: 'Sick Leave', name: 'report_type', inputValue: "sickleave"},
                                        {boxLabel: 'Sick Leave with Attachment', name: 'report_type', inputValue: "sickleaveattach"},
                                        {boxLabel: 'Sanksi Keterlambatan', name: 'report_type', inputValue: "sanksiketerlambatan"},
                                        {boxLabel: 'Permit', name: 'report_type', inputValue: "permit"},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Parameters',
                            flex: 1,
                            layout: 'vbox',
                            margin: '0 20px 0 0',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        flex: 1,
                                        margin: '0 10px 0 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Periode',
                                            name:'start_date',
                                            format: 'd/m/Y',
                                            value:new Date(),
                                            submitFormat: 'Y-m-d H:i:s.u'
                                        },
                                        {
                                            xtype: 'datefield',
                                            labelWidth: 30,
                                            name:'end_date',
                                            value:new Date(),
                                            fieldLabel: 's/d',
                                            format: 'd/m/Y',
                                            submitFormat: 'Y-m-d H:i:s.u'
                                        }/*,
                                        {
                                            xtype: 'checkbox',
                                            margin: '0 20px 0 0',
                                            boxLabel: 'Split Periode'
                                        }*/
                                    ]
                                },
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Status Karyawan',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'statusKaryawanID',
                                    width: '100%',
                                    layout: 'hbox', 
                                    hidden:true,
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    items: [
                                        {boxLabel: 'Tetap / Kontrak', name: 'status_karyawan', inputValue: "T", checked: true},
                                        {boxLabel: 'Harian', name: 'status_karyawan', inputValue: "H"},
                                        ,
                                    ]
                                },
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Format Laporan',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'formatLaporanID',
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    items: [
                                        {boxLabel: 'Detail', name: 'format_laporan', inputValue: "D", checked: true},
                                        {boxLabel: 'Rekap', name: 'format_laporan', inputValue: "R"},
                                        ,
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'department_id',
                                    fieldLabel: 'Departemen',
                                    displayField: cbf.department.d,
                                    valueField: cbf.department.v
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'group_id',
                                    displayField: cbf.category.d,
                                    valueField: cbf.category.v,
                                    fieldLabel: 'Golongan', 
                                    hidden:true
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'employee_id',
                                    fieldLabel: 'Employee',
                                    width:500,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id'
                                },/*
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'checkbox',
                                            boxLabel: 'Masuk di bawah jam',
                                            margin: '0 20px 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: ''
                                        }
                                    ]
                                },*/
                                {
                                    xtype: 'fieldset',
                                    title: '',
                                    labelWidth: 100,
                                    margin: '0 20px 0 0',
                                    layout: 'vbox',
                                    width: 200,
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
                                            flex: 3,
                                            items: [
                                                {
                                                    boxLabel: 'General', name: 'per_type', inputValue: 1, checked: true
                                                },
                                                {
                                                    boxLabel: 'Per Department', name: 'per_type', inputValue: 0
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Include Other',
                                    margin: '0 20px 0 0',
                                    name: 'include_other'
                                }
                            ]
                        }
                    ],
                    dockedItems: {
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
                                action: 'view',
                                padding: 5,
                                itemId: 'btnSearch',
                                iconCls: 'icon-save',
                                text: 'View Report'
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});