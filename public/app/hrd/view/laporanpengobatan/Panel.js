Ext.define('Hrd.view.laporanpengobatan.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.laporanpengobatanpanel',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.laporanpengobatan.GridEmployee'],
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
                    itemId: 'laporanPengobatansFormID',
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
                                        {boxLabel: 'Format Report RJ', name: 'report_type', inputValue: "2"}
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
                                    layout:'hbox',
                                    items: [
                                        {
                                            xtype: 'dfdatefield',
                                            name: 'start_date',
                                            value:new Date(),
                                            fieldLabel: 'Periode'
                                        },
                                        {
                                            margin:'0 0 5px 20px',
                                            xtype: 'dfdatefield',
                                            value:new Date(),
                                            labelWidth:'30px',
                                            name: 'end_date',
                                            fieldLabel: 's/d'
                                        }
                                    ]
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
                                    //    {boxLabel: 'Capeg', name: 'status', inputValue: "3"},
                                    /*    {boxLabel: 'Harian Tetap', name: 'status', inputValue: "4"},
                                        {boxLabel: 'Harian Kontrak', name: 'status', inputValue: "5"},
                                        {boxLabel: 'Temporary', name: 'status', inputValue: "6"},*/
                                        {boxLabel: 'Seluruh', name: 'status', inputValue: "999", checked: true},
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'alokasibiaya_id',
                                    width: 600,
                                    fieldLabel: 'Alokasi Biaya',
                                    displayField: 'name',
                                    valueField: 'alokasibiaya_id'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'department_id',
                                    width: 400,
                                    fieldLabel: 'Departemen',
                                    displayField: 'department',
                                    valueField: 'department_id'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'employee_id',
                                    fieldLabel: 'Karyawan',
                                    width: 500,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'jenispengobatan_id',
                                    width: 400,
                                    fieldLabel: 'Jenis Pengobatan',
                                    displayField: 'code',
                                    valueField: 'jenispengobatan_id'
                                }
                                /*  {
                                 xtype:'laporanpengobatanemployeegrid',
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