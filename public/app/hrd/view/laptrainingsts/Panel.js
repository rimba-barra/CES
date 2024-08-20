Ext.define('Hrd.view.laptrainingsts.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.laptrainingstspanel',
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
                                            boxLabel: 'Daftar Statistik Karyawan', name: 'report_type', inputValue: "laporan", checked: true
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
                                    xtype: 'radiogroup',
                                    fieldLabel: 'In House',
                                    // Arrange radio buttons into two columns, distributed vertically
                                  //  itemId: 'activeID',
                                    //  labelWidth: 1,
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 30 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'IN', name: 'is_inhouse', inputValue: "1", checked: true},
                                        {boxLabel: 'OUT', name: 'is_inhouse', inputValue: "0"},
                                        {boxLabel: 'SEMUA', name: 'is_inhouse', inputValue: "999"},
                                        ,
                                    ]
                                },
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
                                            name: 'start_date'
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
                                            width: 150
                                        },
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'grouptraining_id',
                                    fieldLabel: 'Kelompok Training',
                                    displayField: 'code',
                                    valueField: 'grouptraining_id',
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