Ext.define('Hrd.view.programtraining.FormData', {
    alias: 'widget.programtrainingformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields','Hrd.library.template.view.MoneyField','Hrd.library.template.view.NumberField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();




        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'programtraining_id'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Kelompok Training',
                    name: 'grouptraining_grouptraining_id',
                    displayField: cbf.grouptraining.d,
                    valueField: cbf.grouptraining.v

                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Kode Training',
                    readOnly: true,
                    size: 30
                },
                {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'Jenis',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'radiofield',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'Training',
                            name: 'trainingtype',
                            checked: true,
                            inputValue: 'T'
                        }, {
                            boxLabel: 'Aktifitas',
                            name: 'trainingtype',
                            inputValue: 'A'
                        },
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
                            xtype: 'nfnumberfield',
                            name: 'days',
                            fieldLabel: 'Lama Training',
                            width:150
                        },
                        {
                            xtype: 'label',
                            text: ' hari'
                        }
                        , {
                            xtype: 'textfield',
                            name: 'duration',
                            fieldLabel: 'Durasi',
                            readOnly: true,
                            size: 30
                        },
                        {
                            xtype: 'label',
                            text: ' hh:mm / hari [format 00:00:00]'
                        }
                    ]
                },
                {
                   xtype:'checkbox',
                   fieldLabel:'Outsourcing',
                   boxLabel:'Yes',
                   name:'is_inhouse',
                   inputValue:1
                },
               /* {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'Outsourcing',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'checkbox',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'In House',
                            name: 'is_inhouse',
                            checked: true,
                            inputValue: 1
                        }, {
                            boxLabel: 'Out House',
                            name: 'is_inhouse',
                            inputValue: 0
                        },
                    ]
                },*/
                {
                    xtype: 'textfield',
                    name: 'organizer',
                    fieldLabel: 'Penyelenggara',
                    readOnly: true,
                    size: 30
                },
                {
                    xtype: 'container',
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            name: 'cost',
                            fieldLabel: 'Biaya Training',
                            readOnly: true,
                            size: 30
                        },
                        {
                            xtype: 'label',
                            text: ' / person'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'theme',
                    fieldLabel: 'Tema Training',
                    readOnly: true,
                    size: 30
                },
                {
                    xtype      : 'fieldcontainer',
                    layout:'hbox',
                    fieldLabel:'Aktif',
                    width:400,
                    bodyStyle: 'background:none;border:0;',
                    defaults: {
                        xtype: 'radiofield',
                        flex:1
                    },
                    items: [
                        {
                            boxLabel: 'Ya',
                            name: 'is_active',
                            checked: true,
                            inputValue: 1
                        }, {
                            boxLabel: 'Tidak',
                            name: 'is_active',
                            inputValue: 0
                        },
                    ]
                }
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});