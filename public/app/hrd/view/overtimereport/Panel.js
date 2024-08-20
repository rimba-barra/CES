Ext.define('Hrd.view.overtimereport.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.overtimereportpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'OvertimereportPanel',
    layout: 'fit',
    autoScroll: true,
    height: '200px',
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
                    itemId: 'employeeDatasFormID',
                    width: '100%',
                    autoScroll: true,
                    height: '200px',
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
                                    //itemId: 'sexID', // comment by Wulan Sari 2018.05.11
                                    itemId: 'overtimereport_reporttypeID', // added by Wulan Sari 2018.05.11
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        //{boxLabel: 'Slip Lembur (Normal)', name: 'report_type', inputValue: "sliplembur_n", checked: true},
                                        //{boxLabel: 'Slip Lembur (Khusus)', name: 'report_type', inputValue: "sliplembur_k"},
                                        //{boxLabel: 'Rekap Lembur (Rp)', name: 'report_type', inputValue: "rekap_rp"},
                                        //{boxLabel: 'Rekap Per Departemen (%)', name: 'report_type', inputValue: "rekap_persen"},
                                        {boxLabel: 'Rekap Lembur', name: 'report_type', inputValue: "rekap_jam"},
                                        {xtype: 'label', html: '(Jam kerja sebelum kali faktor)<br><br>'},
                                        //{boxLabel: 'Detil Lembur', name: 'report_type', inputValue: "detil"},
                                        {boxLabel: 'Transaksi Lembur', name: 'report_type', inputValue: "transaksi"},
                                        {xtype: 'label', html: '(Jam kerja setelah kali faktor)<br><br>'},
                                        {boxLabel: 'Transaksi Lembur Per Faktor', name: 'report_type', inputValue: "transaksi_faktor"},
                                        {xtype: 'label', html: '(Jam kerja setelah kali faktor)'}
                                        
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
                                        },
                                        {
                                            xtype: 'checkbox',
                                            margin: '0 20px 0 0',
                                            boxLabel: 'Per bulan'
                                        }
                                    ]
                                },
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
                                            fieldLabel: 'Periode Process',
                                            name:'start_date_process',
                                            format: 'd/m/Y',
                                            // value:new Date(),
                                            submitFormat: 'Y-m-d H:i:s.u'
                                        },
                                        {
                                            xtype: 'datefield',
                                            labelWidth: 30,
                                            name:'end_date_process',
                                            //value:new Date(),
                                            fieldLabel: 's/d',
                                            format: 'd/m/Y',
                                            submitFormat: 'Y-m-d H:i:s.u'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Status Karyawan',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'statusKaryawanID',
                                    width: '100%',
                                    layout: 'hbox',
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
                                    width:500,
                                    displayField: cbf.department.d,
                                    valueField: cbf.department.v
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'group_id',
                                    displayField: cbf.category.d,
                                    valueField: cbf.category.v,
                                    fieldLabel: 'Golongan', hidden:true
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'employee_id',
                                    fieldLabel: 'Employee',
                                    width:500,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id', hidden:true
                                },
                              /*  {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Karyawan',
                                    name:'employee_name'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'NIK',
                                    name:'employee_nik'
                                } */
                                

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
                            },
                            {
                                xtype: 'tbfill',
                            },                            
                            {
                                xtype: 'button',
                                action: 'export',
                                padding: 5,
                                itemId: 'btnExportOvertime',
                                iconCls: 'icon-save',
                                text: 'Export to Excel for Payroll'
                            }
                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});