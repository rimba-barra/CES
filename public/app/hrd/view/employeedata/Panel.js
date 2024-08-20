Ext.define('Hrd.view.employeedata.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.employeedatapanel',
    requires: ['Hrd.template.ComboBoxFields','Hrd.view.employeedata.GridEmployee'],
    itemId: 'AbsentReportPanel',
    layout: 'fit',
    autoScroll: true,
    height: '200px',
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        

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
                                    itemId: 'sexID',
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Daftar', name: 'report_type', inputValue: "1", checked: true},
                                        {boxLabel: 'Daftar Pribadi', name: 'report_type', inputValue: "2"},
                                        {boxLabel: 'Data Keluarga', name: 'report_type', inputValue: "3"},
                                        {boxLabel: 'Potensi Diri dan Organisasi', name: 'report_type', inputValue: "4"},
                                        {boxLabel: 'Riwayat Kerja Sebelumnya', name: 'report_type', inputValue: "5"},
                                        {boxLabel: 'Kursus Sebelumnya', name: 'report_type', inputValue: "6"},
                                        {boxLabel: 'Staffing Resume  Berdasarkan Departemen', name: 'report_type', inputValue: "7"},
                                        {boxLabel: 'Staffing Resume  Berdasarkan Jabatan', name: 'report_type', inputValue: "8"},
                                        {boxLabel: 'Staffing Resume  Berdasarkan Golongan', name: 'report_type', inputValue: "9"},
                                        {boxLabel: 'Riwayat Pendidikan', name: 'report_type', inputValue: "10"},
                                        {boxLabel: 'Asuransi', name: 'report_type', inputValue: "11"},
                                        {boxLabel: 'Pajak', name: 'report_type', inputValue: "12"},
                                        {boxLabel: 'Terminasi', name: 'report_type', inputValue: "13"},
                                        {boxLabel: 'Masa Kerja', name: 'report_type', inputValue: "14"},
                                        {boxLabel: 'Koresponden', name: 'report_type', inputValue: "15"},
                                        ,
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
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Format',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'formatID',
                                  //  labelWidth: 1,
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 30 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Detil', name: 'format', inputValue: "detil", checked: true},
                                        {boxLabel: 'Rekap', name: 'format', inputValue: "rekap"},
                                      
                                        ,
                                    ]
                                },
                                {
                                   xtype:'dfdatefield',
                                   name:'periode',
                                   fieldLabel:'Periode'
                                },
                                
                                
                                
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Aktif',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'activeID',
                                  //  labelWidth: 1,
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 30 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Ya', name: 'is_active', inputValue: "1", checked: true},
                                        {boxLabel: 'Tidak', name: 'is_active', inputValue: "0"},
                                        {boxLabel: 'Semua', name: 'is_active', inputValue: "999"}
                                    ]
                                },
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Status',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    itemId: 'StatusID',
                                  //  labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 30 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Tetap', name: 'status', inputValue: "1"},
                                        {boxLabel: 'Kontrak', name: 'status', inputValue: "2"},
                                        {boxLabel: 'Capeg', name: 'status', inputValue: "3"},
                                        {boxLabel: 'Harian Tetap', name: 'status', inputValue: "4"},
                                        {boxLabel: 'Harian Kontrak', name: 'status', inputValue: "5"},
                                        {boxLabel: 'Temporary', name: 'status', inputValue: "6"},
                                        {boxLabel: 'Seluruh', name: 'status', inputValue: "999",checked: true},
                             
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'department_id',
                                    width:400,
                                    fieldLabel: 'Departemen',
                                    displayField: 'department',
                                    valueField: 'department_id'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'employee_id',
                                    fieldLabel: 'Karyawan',
                                    width:500,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id'
                                },
                              /*  {
                                    xtype:'employeedataemployeegrid',
                                    height:200,
                                    width:500
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
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});