Ext.define('Hrd.view.plafonkaryawan.FormData', {
    alias: 'widget.plafonkaryawanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: false,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        


        Ext.applyIf(me, {
            defaults: {},
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'plafonkaryawan_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Yearly',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            width: 250,
                            defaults: {
                                flex: 1,
                                readOnly:true
                            },
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Global',
                                    checked:true,
                                    inputValue:'g',
                                    name: 'yearly',
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'global',
                                    
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                flex: 1
                            },
                            items: [
                                {
                                    xtype: 'radiofield',
                                    name: 'yearly',
                                    inputValue:'d',
                                    boxLabel: 'Detail',
                                },
                                {
                                    xtype: 'label',
                                    text: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'textfield',
                                readOnly:true
                            },
                            items: [
                                {
                                    name: 'obat',
                                    fieldLabel: 'Obat'
                                },
                                {
                                    name: 'dokter',
                                    fieldLabel: 'Dokter'
                                },
                                {
                                    name: 'gigi',
                                    fieldLabel: 'Gigi'
                                },
                                {
                                    name: 'lab',
                                    fieldLabel: 'Lab'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        xtype: 'textfield',
                        readOnly:true
                    },
                    items: [
                        {
                            name: 'rawat_inap',
                            fieldLabel: 'Rawat Inap'
                        },
                        {
                            name: 'salin_normal',
                            fieldLabel: 'Persalinan Normal'
                        },
                        {
                            name: 'salin_abnormal',
                            fieldLabel: 'Persalinan AbNormal'
                        },
                        {
                            name: 'hamil',
                            fieldLabel: 'Kehamilan'
                        },
                        {
                            name: 'kb',
                            fieldLabel: 'Keluarga Berencana'
                        },
                        {
                            name: 'cekup',
                            fieldLabel: 'CheckUp'
                        },
                        {
                            name: 'lensa',
                            fieldLabel: 'Lensa'
                        },
                        {
                            name: 'frame',
                            fieldLabel: 'Frame'
                        },
                        {
                            name: 'lain_lain',
                            fieldLabel: 'Lain - lain'
                        }
                    ]
                }
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});