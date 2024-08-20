Ext.define('Hrd.view.plafonkaryawan.FormData', {
    alias: 'widget.plafonkaryawanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields','Hrd.library.template.view.MoneyField'],
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
                                    inputValue:1,
                                    name: 'is_global',
                                },
                                {
                                    xtype: 'xmoneyfield',
                                    name: 'yearly_global',
                                    
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
                                    name: 'is_global',
                                    inputValue:2,
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
                                xtype: 'xmoneyfield',
                                readOnly:true
                            },
                            items: [
                                {
                                    name: 'yearly_obat',
                                    fieldLabel: 'Obat'
                                },
                                {
                                    name: 'yearly_dokter',
                                    fieldLabel: 'Dokter'
                                },
                                {
                                    name: 'yearly_gigi',
                                    fieldLabel: 'Gigi'
                                },
                                {
                                    name: 'yearly_lab',
                                    fieldLabel: 'Lab'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        xtype: 'xmoneyfield',
                        readOnly:true
                    },
                    items: [
                        {
                            xtype:'textfield',
                            name: 'year',
                            fieldLabel: 'Tahun'
                        },
                        {
                            name: 'rawat_inap',
                            fieldLabel: 'Rawat Inap'
                        },
                        {
                            name: 'persalinan_normal',
                            fieldLabel: 'Persalinan Normal'
                        },
                        {
                            name: 'persalinan_abnormal',
                            fieldLabel: 'Persalinan AbNormal'
                        },
                        {
                            name: 'kehamilan',
                            fieldLabel: 'Kehamilan'
                        },
                        {
                            name: 'keluarga_berencana',
                            fieldLabel: 'Keluarga Berencana'
                        },
                        {
                            name: 'checkup',
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
                            name: 'lainlain',
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