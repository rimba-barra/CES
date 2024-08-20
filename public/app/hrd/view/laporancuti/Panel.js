Ext.define('Hrd.view.laporancuti.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.laporancutipanel',
    requires: ['Hrd.template.ComboBoxFields'],
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
                                        {boxLabel: 'Hak / Sisa Cuti', name: 'report_type', inputValue: "hak", checked: true},
                                        {boxLabel: 'Transaksi Cuti', name: 'report_type', inputValue: "transaksi"}/*,
                                        {boxLabel: 'Daftar Cuti', name: 'report_type', inputValue: "daftar"}*/
                                      
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
                                        {boxLabel: 'Tetap / Kontrak / Consultant', name: 'status_karyawan', inputValue: "T", checked: true},
                                        {boxLabel: 'Harian', name: 'status_karyawan', inputValue: "H"},
                                        ,
                                    ]
                                },

                                //added by anas 06112023 | nambah filter berdasarkan department / kelompok absensi
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Report By',
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    items: [
                                        {boxLabel: 'Department', name: 'pilihan_filter', inputValue: "Department", checked: true},
                                        {boxLabel: 'Kelompok', name: 'pilihan_filter', inputValue: "Kelompok"},
                                        ,
                                    ]
                                },
                                //end added by anas
                                
                                {
                                    xtype: 'combobox',
                                    name: 'department_id',
                                    width:300,
                                    fieldLabel: 'Departemen',
                                    displayField: cbf.department.d,
                                    valueField: cbf.department.v
                                },
                                
                                // added by anas 06112023 | nambah dropdown kelompok absensi
                                {
                                    xtype: 'combobox',
                                    name: 'kelompokabsensi_id',
                                    width:300,
                                    fieldLabel: 'Kelompok',
                                    displayField: cbf.kelompokabsensi.d,
                                    valueField: cbf.kelompokabsensi.v,
                                    hidden: true
                                },
                                //end added by anas

                                {
                                    xtype: 'combobox',
                                    name: 'group_id',
                                    width:250,
                                    displayField: cbf.category.d,
                                    valueField: cbf.category.v,
                                    fieldLabel: 'Golongan'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'employee_id',
                                    fieldLabel: 'Employee',
                                    width:500,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id'
                                },
                             /*   {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nama Karyawan'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'NIK'
                                }
                                */

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