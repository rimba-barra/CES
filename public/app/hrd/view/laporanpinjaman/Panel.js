Ext.define('Hrd.view.laporanpinjaman.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.laporanpinjamanpanel',
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
                            title: 'Tipe Laporan',
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
                                            boxLabel: 'Daftar Pinjaman', name: 'report_type', inputValue: "daftar", checked: true
                                        },
                                        {
                                            boxLabel: 'Histori Pinjaman', name: 'report_type', inputValue: "histori"
                                        }
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
                                    xtype: 'textfield',
                                    width: 250,
                                    fieldLabel: 'Periode Bulan/Tahun',
                                    name: 'date'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 500,
                                    fieldLabel: 'Nama karyawan',
                                    name: 'employee_name'
                                },
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Status Pinjaman',
                                    // Arrange radio buttons into two columns, distributed vertically
                      
                                  //  labelWidth: 1,
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 30 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Lunas', name: 'lunas', inputValue: "1", checked: true},
                                        {boxLabel: 'Belum Bayar', name: 'lunas', inputValue: "0"},
                                        {boxLabel: 'Semua', name: 'lunas', inputValue: "999"},
                                      
                                        ,
                                    ]
                                },
                            ]
                        },
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