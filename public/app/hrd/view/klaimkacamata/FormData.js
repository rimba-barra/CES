Ext.define('Hrd.view.klaimkacamata.FormData', {
    alias: 'widget.klaimkacamataformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.klaimkacamata.GridRecord', 'Hrd.view.klaimkacamata.GridRecordFrame', 'Hrd.library.template.view.MoneyField'],
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
                    itemId: 'tabPanelKacamataID',
                    items: [
                        /* PERSONAL */
                        {
                            title: 'Lens',
                            itemId: 'lensTabPanel',
                            items: [
                                {
                                    xtype: 'form',
                                    itemId: 'formLensID',
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
                                                    xtype: 'container',
                                                    margin:'0 0 5px 0',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'dfdatefield',
                                                       
                                                            name: 'tanggal_klaim',
                                                            fieldLabel: 'Tanggal Klaim'
                                                        },
                                                        {
                                                            xtype: 'dfdatefield',
                                                         
                                                             margin: '0 0 5px 30px',
                                                            name: 'tanggal_kwitansi',
                                                            fieldLabel: 'Tanggal Kwitansi'
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            fieldLabel: 'Plafon',
                                                            name: 'plafon',
                                                            keepRO: true,
                                                            readOnly: true,
                                                            margin: '0 30px 5px 0'
                                                        },
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            name: 'total_klaim',
                                                            fieldLabel: 'Nilai Kwitansi'
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            hidden:true,
                                                            name: 'percent_pengganti',
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Persentase Penggantian'
                                                        },
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            hidden:true,
                                                            margin: '0 0 5px 30px',
                                                            xtype: 'xmoneyfield',
                                                            name: 'amount_pengganti',
                                                            fieldLabel: 'Amount Penggantian'
                                                        },
                                                        
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype:'label',
                                                            text:'',
                                                            margin:'0 280px 0 0'
                                                        },
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            fieldLabel: 'Penggantian',
                                                            name: 'claim_value',
                                                            margin: '0 0 10px 0',
                                                            keepRO: true,
                                                            readOnly: true,
                                                        },
                                                       
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            xtype: 'xmoneyfield',
                                                            name: 'total_total_klaim',
                                                            fieldLabel: 'Total Penggantian',
                                                            margin: '0 30px 5px 0'
                                                        },
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            name: 'saldo',
                                                            xtype: 'xmoneyfield',
                                                            fieldLabel: 'Saldo'
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'status_bayar',
                                                    fieldLabel: 'Lunas',
                                                    inputValue: 1,
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: 'hbox',
                                                    align: 'right',
                                                    bodyBorder: false,
                                                    defaults: {
                                                        layout: 'fit'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Tanggal Bayar',
                                                            itemId: 'pay_date',
                                                            id: 'pay_date',
                                                            name: 'pay_date',
                                                            format: 'd-m-Y',
                                                            submitFormat: 'Y-m-d',
                                                            emptyText: 'Tanggal Bayar',
                                                            width: 300,
                                                            readOnly: false,
                                                            allowBlank: true,
                                                            enforceMaxLength: true,
                                                            enableKeyEvents: true,
                                                            rowdata: null
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'rekomendasi_dokter',
                                                    fieldLabel: 'Rekomendasi Dokter',
                                                    inputValue: 1,
                                                },
                                                {
                                                    xtype:'textareafield',
                                                    name: 'keterangan',
                                                    fieldLabel: 'Keterangan',
                                                    cols:70,
                                                    rows:6
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
                                                        },
                                                        {
                                                            boxLabel: 'PROGRESIVE',
                                                            name: 'tipe_klaim_lensa',
                                                            inputValue: 'PROGRESIVE',
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Ukuran',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'vbox',
                                                            defaults: {
                                                                margin: '0 7 5 0',
                                                                xtype: 'textfield'
                                                            },
                                                            items: [
                                                                {name: 'ki_minus', fieldLabel: 'Kiri Minus'},
                                                                {name: 'ki_plus', fieldLabel: 'Kiri Plus'},
                                                                {name: 'ki_silinder', fieldLabel: 'Kiri Silinder'},
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            layout: 'vbox',
                                                            defaults: {
                                                                margin: '0 7 5 0',
                                                                xtype: 'textfield'
                                                            },
                                                            items: [
                                                                {name: 'ka_minus', fieldLabel: 'Kanan Minus'},
                                                                {name: 'ka_plus', fieldLabel: 'Kanan Plus'},
                                                                {name: 'ka_silinder', fieldLabel: 'Kanan Silinder'},
                                                            ]
                                                        },
                                                    ]
                                                }
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
                                    itemId: 'formFrameID',
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
                                               /* {
                                                    xtype: 'datefield',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d',
                                                    name: 'tanggal_klaim',
                                                    fieldLabel: 'Tanggal klaim'
                                                },
                                                */
                                               {
                                                    xtype: 'container',
                                                    margin:'0 0 5px 0',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            format: 'd-m-Y',
                                                            submitFormat: 'Y-m-d',
                                                            name: 'tanggal_klaim',
                                                            fieldLabel: 'Tanggal Klaim'
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            format: 'd-m-Y',
                                                             margin: '0 0 5px 30px',
                                                            submitFormat: 'Y-m-d',
                                                            name: 'tanggal_kwitansi',
                                                            fieldLabel: 'Tanggal Kwitansi'
                                                        },
                                                    ]
                                                },
                                               
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            fieldLabel: 'Plafon',
                                                            name: 'plafon',
                                                            keepRO: true,
                                                            readOnly: true,
                                                            margin: '0 30px 5px 0'
                                                        },
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            name: 'total_klaim',
                                                            fieldLabel: 'Nilai Kwitansi'
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            name: 'percent_pengganti',
                                                            hidden:true,
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Persentase Penggantian'
                                                        },
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            hidden:true,
                                                            xtype: 'xmoneyfield',
                                                             margin: '0 0 5px 30px',
                                                            name: 'amount_pengganti',
                                                            fieldLabel: 'Amount Penggantian'
                                                        },
                                                        
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            margin:'0 280px 0 0',
                                                            text:'',
                                                        },
                                                        {
                                                            xtype: 'xmoneyfield',
                                                            fieldLabel: 'Penggantian',
                                                            name: 'claim_value',
                                                            margin: '0 0 10px 0',
                                                            keepRO: true,
                                                            readOnly: true,
                                                        },
                                                       
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            xtype: 'xmoneyfield',
                                                            name: 'total_total_klaim',
                                                            fieldLabel: 'Total Penggantian',
                                                            margin: '0 30px 5px 0'
                                                        },
                                                        {
                                                            keepRO: true,
                                                            readOnly: true,
                                                            name: 'saldo',
                                                            xtype: 'xmoneyfield',
                                                            fieldLabel: 'Saldo'
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'status_bayar',
                                                    fieldLabel: 'Lunas',
                                                    inputValue: 1,
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: 'hbox',
                                                    align: 'right',
                                                    bodyBorder: false,
                                                    defaults: {
                                                        layout: 'fit'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            fieldLabel: 'Tanggal Bayar',
                                                            itemId: 'pay_date',
                                                            id: 'pay_date',
                                                            name: 'pay_date',
                                                            format: 'd-m-Y',
                                                            submitFormat: 'Y-m-d',
                                                            emptyText: 'Tanggal Bayar',
                                                            width: 300,
                                                            readOnly: false,
                                                            allowBlank: true,
                                                            enforceMaxLength: true,
                                                            enableKeyEvents: true,
                                                            rowdata: null
                                                        },
                                                    ]
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'rekomendasi_dokter',
                                                    fieldLabel: 'Rekomendasi Dokter',
                                                    inputValue: 1,
                                                },
                                                {
                                                    xtype:'textareafield',
                                                    name: 'keterangan',
                                                    fieldLabel: 'Keterangan',
                                                    cols:70,
                                                    rows:6
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