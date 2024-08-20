Ext.define('Hrd.view.klaimpengobatan.FormData', {
    alias: 'widget.klaimpengobatanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.klaimpengobatan.GridClaim','Hrd.library.template.view.MoneyField'],
    frame: false,
    autoScroll: true,
    height:570,
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
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'klaimpengobatan_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Informasi Karyawan',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 50px 0 0',
                                readOnly: true,
                            },
                            items: [
                                {
                                    name: 'employee_name',
                                    fieldLabel: 'Nama Karyawan',
                                    stayReadOnly:true
                                },
                                {
                                    name: 'group_code',
                                    labelWidth: 150,
                                    fieldLabel: 'Golongan',
                                    stayReadOnly:true
                                },
                                {
                                    name: 'ptkp_claim_code',
                                    labelWidth: 150,
                                    fieldLabel: 'PTKP Claim',
                                    stayReadOnly:true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 50px 0 0',
                                readOnly: true,
                            },
                            items: [
                                {
                                    name: 'hire_date',
                                    xtype: 'datefield',
                                    format: 'd/m/Y',
                                    fieldLabel: 'Tanggal Masuk',
                                    stayReadOnly:true
                                },
                                {
                                    name: 'year',
                                    labelWidth: 150,
                                    fieldLabel: 'Tahun Plafon',
                                    stayReadOnly:true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Claim',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container'
                    },
                    items: [
                        {
                            flex: 2,
                            items: [
                                {
                                    xtype: 'klaimpengobatanclaimgrid',
                                    id:'klaimpengobatanclaimgridID',
                                    height: 200
                                }
                            ]
                        },
                        {
                            margin: '0 0 0 10px',
                            flex: 3,
                            width: '100%',
                            defaults: {
                                xtype: 'textfield',
                                width: 500
                            },
                            items: [
                                {
                                    xtype:'dfdatefield',
                                    name: 'addon',
                                    keepRO:true,
                                    readOnly:true,
                                    width:250,
                                    fieldLabel: 'Tanggal Input'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        
                                        xtype: 'textfield',
                                        margin: '5px 10px 0 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            width:250,
                                            name: 'jenispengobatan_jenispengobatan_id',
                                            fieldLabel: 'Jenis Klaim',
                                            displayField: cbf.jenispengobatan.d,
                                            valueField: cbf.jenispengobatan.v
                                        },
                                        {
                                            name: 'jenispengobatan_jenispengobatan',
                                            width:240,
                                            readOnly:true,
                                            
                                            fieldLabel: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'datefield',
                                        format: 'd/m/Y',
                                        submitFormat: 'Y-m-d',
                                        margin: '5px 50px 5px 0'
                                    },
                                    items: [
                                        {
                                            name: 'claim_date',
                                            fieldLabel: 'Tanggal Klaim'
                                        },
                                        {
                                            name: 'kwitansi_date',
                                            labelWidth: 100,
                                            fieldLabel: 'Tanggal Kwitansi'
                                        }
                                    ]
                                },
                                {
                                    name: 'docter_name',
                                    fieldLabel: 'Nama Dokter'
                                },
                                {
                                    name: 'hospital_name',
                                    fieldLabel: 'Nama Rumah Sakit'
                                },
                                {
                                    name: 'apotic_name',
                                    fieldLabel: 'Nama Apotik'
                                },
                                {
                                    xtype:'textareafield',
                                    cols:20,
                                    name: 'description',
                                    fieldLabel: 'Keterangan <br/> (Diagnosa)'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        xtype: 'textfield',
                                        margin: '0 10px 0 0'
                                    },
                                    items: [
                                        {
                                            maskRe: /[0-9]/,
                                            width:140, 
                                            name: 'rawat_inap',
                                            fieldLabel: 'Rawat Inap'
                                        },
                                        {
                                            
                                            xtype: 'label',
                                            text: 'Hari'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype:'xmoneyfield',
                                        margin: '5px 50px 0 0'
                                    },
                                    items: [
                                        {
                                            
                                            name: 'plafon',
                                            fieldLabel: 'Plafon',
                                           
                                            keepRO:true,
                                            readOnly:true
                                        },
                                        {
                                            name: 'total',
                                            labelWidth: 50,
                                            fieldLabel: 'Nilai Kwitansi'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        margin: '5px 50px 0 0'
                                    },
                                    items: [
                                        {
                                            fieldStyle: 'text-align:right',
                                            keepRO:true,
                                            readOnly:true,
                                            fieldLabel: 'Persentase Penggantian',
                                            name:'percent_pengganti',
                                            align:"right"
                                        },
                                        {
                                            xtype:'xmoneyfield',
                                            
                                            keepRO:true,
                                            readOnly:true,
                                            fieldLabel: 'Amount Penggantian',
                                            name:'amount_pengganti'
                                        }
                                        
                                        
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        margin: '5px 50px 0 0'
                                    },
                                    items: [
                                        {
                                            xtype:'label',
                                            text:''
                                        },
                                        {
                                            xtype:'xmoneyfield',
                                            name: 'claim_value',
                                            keepRO:true,
                                            readOnly:true,
                                            fieldLabel: 'Penggantian'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    defaults: {
                                        flex: 1,
                                        xtype: 'textfield',
                                        margin: '5px 50px 0 0'
                                    },
                                    items: [
                                        {
                                            xtype:'xmoneyfield',
                                            name: 'total_klaim',
                                           
                                            keepRO:true,
                                            readOnly:true,
                                            fieldLabel: 'Total Penggantian'
                                        },
                                        {
                                            xtype:'xmoneyfield',
                                            keepRO:true,
                                            readOnly:true,
                                            name: 'saldo',
                                            labelWidth: 50,
                                            
                                            fieldLabel: 'Saldo'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Klaim Untuk',
                                    layout: 'hbox',
                                    width: 400,
                                    defaults: {
                                        flex: 1,
                                        xtype: 'radiofield',
                                        name: 'claim_subject'
                                    },
                                    items: [
                                        {
                                            boxLabel: 'Sendiri',
                                            checked: true,
                                            inputValue: "S"
                                        },
                                        {
                                            boxLabel: 'Isteri / Suami',
                                            inputValue: "W"
                                        },
                                        {
                                            boxLabel: 'Anak',
                                            inputValue: "D"
                                        }
                                    ]
                                },
                                {
                                    name:'paid',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    fieldLabel: 'Status Bayar',
                                    boxLabel: 'Ya',
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
                                            width: 220,
                                            readOnly: false,
                                            allowBlank: true,
                                            enforceMaxLength: true,
                                            enableKeyEvents: true,
                                            rowdata: null
                                        },
                                    ]
                                },
                                {
                                    name:'dengan_keterangan',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    fieldLabel: 'Dengan Keterangan',
                                    boxLabel: 'Ya',
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