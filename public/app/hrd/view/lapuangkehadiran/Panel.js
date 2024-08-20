Ext.define('Hrd.view.lapuangkehadiran.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.lapuangkehadiranpanel',
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
                            title: 'Format Laporan',
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
                                            boxLabel: 'Daftar', name: 'report_type', inputValue: "daftar", checked: true
                                        }/*,
                                        {
                                            boxLabel: 'Slip', name: 'report_type', inputValue: "slip"
                                        },*/
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
                                        xtype: 'dfdatefield',
                                        width: 250
                                    },
                                    items: [
                                        {
                                            fieldLabel: 'Periode',
                                            name: 'start_date',
                                            value:new Date()
                                        },
                                        {
                                            xtype: 'label',
                                            text: 's/d',
                                            margin: '0 10px',
                                            width: 30
                                        },
                                        {
                                            fieldLabel: '',
                                            name: 'end_date',
                                            width: 150,
                                            value:new Date()
                                        },
                                    ]
                                },
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: 'Status Karyawan',
                              
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 30 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Tetap', name: 'employeestatus_group', inputValue: "1", checked: true},
                                        {boxLabel: 'Harian', name: 'employeestatus_group', inputValue: "2"},
                                        ,
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'alokasibiaya_id',
                                    fieldLabel: 'Alokasi Biaya',
                                    width:400,
                                    displayField: 'name',
                                    valueField: 'alokasibiaya_id',
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'department_id',
                                    fieldLabel: 'Department',
                                    width:400,
                                    displayField: 'department',
                                    valueField: 'department_id',
                                },
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
                                                    boxLabel: 'Per Department', name: 'per_type', inputValue: 1, checked: true
                                                },
                                                {
                                                    boxLabel: 'Per PT', name: 'per_type', inputValue: 0
                                                },
                                            ]
                                        }
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
                            },
                            {
                                xtype: 'tbfill',
                            },                            
                            {
                                xtype: 'button',
                                action: 'export',
                                padding: 5,
                                itemId: 'btnExport',
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