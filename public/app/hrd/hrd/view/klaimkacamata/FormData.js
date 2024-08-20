Ext.define('Hrd.view.klaimkacamata.FormData', {
    alias: 'widget.klaimkacamataformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.klaimkacamata.GridRecord', 'Hrd.view.klaimkacamata.GridRecordFrame'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        var yearStore = Ext.create('Ext.data.ArrayStore', {
            fields: ['number', 'name'],
            id: 0,
            data: []
        });


        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_id'
                },
                {
                    xtype: 'textfield',
                    name: 'employee_nik',
                    fieldLabel: 'N.I.K',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    readOnly: true,
                    size: 100
                },
                {
                    xtype: 'tabpanel',
                    activeTab: 0, // index or id

                    items: [
                        /* PERSONAL */
                        {
                            title: 'Lens',
                            itemId: 'lensTabPanel',
                            items: [
                                {
                                    xtype: 'form',
                                    itemId:'formOldStatusID',
                                    bodyStyle: 'background:none;border:0;',
                                    layout: 'hbox',
                                    padding: '10px',
                                    items: [
                                        {
                                            xtype: 'klaimkacamatarecordgrid',
                                            height: 200,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                flex: 1
                                            },
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'klaimkacamata_id'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d',
                                                    name: 'tanggal_klaim',
                                                    fieldLabel: 'Claim Date'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'total_klaim',
                                                    fieldLabel: 'Claim Total'
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'status_bayar',
                                                    fieldLabel: 'Paid',
                                                    inputValue: 1,
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    fieldLabel: 'Type',
                                                    defaultType: 'radiofield',
                                                    defaults: {
                                                        flex: 1,
                                                        margin: '0 0 0 10px'
                                                    },
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            boxLabel: 'SPH',
                                                            name: 'tipe_klaim_lensa',
                                                            inputValue: 'SPH',
                                                            checked: true,
                                                        }, {
                                                            boxLabel: 'CYL',
                                                            name: 'tipe_klaim_lensa',
                                                            inputValue: 'CYL',
                                                        }, {
                                                            boxLabel: 'AXIS',
                                                            name: 'tipe_klaim_lensa',
                                                            inputValue: 'AXIS',
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'ukuran',
                                                    fieldLabel: 'Size'
                                                },
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            title: 'Frame',
                            items: [
                                {
                                    xtype: 'form',
                                    itemId:'formNewStatusID',
                                    bodyStyle: 'background:none;border:0;',
                                    layout: 'hbox',
                                    padding: '10px',
                                    items: [
                                        {
                                            xtype: 'klaimkacamatarecordframegrid',
                                            height: 200,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'vbox',
                                            defaults: {
                                                flex: 1
                                            },
                                            items: [
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'klaimkacamata_id'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d',
                                                    name: 'tanggal_klaim',
                                                    fieldLabel: 'Claim Date'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'total_klaim',
                                                    fieldLabel: 'Claim Total'
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'status_bayar',
                                                    fieldLabel: 'Paid',
                                                    inputValue: 1,
                                                },
                                            ]
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                }

            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});