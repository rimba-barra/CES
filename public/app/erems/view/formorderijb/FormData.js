Ext.define('Erems.view.formorderijb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.formorderijbformdata',
    requires: [ 'Erems.library.template.view.combobox.City','Erems.library.box.Config', 'Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    editedRow: -1,
    initComponent: function() {
        var me = this;

        var cfg = new Erems.library.box.Config();

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    name: 'unit_unit_id'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_formorderijb_id',
                    name: 'formorderijb_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_purchaseletter_id'
                },
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'UNIT INFORMATION',
                    collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '10px 0 0 0',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox',
                                flex: 1,
                                width: '100%'
                            },
                            items: [
                                {
                                    margin: '0 20px 0 0',
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: '100%',
                                        margin: '0 0 10px 0'
                                    },
                                    items: [
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'formorderijb_no',
                                                    fieldLabel: 'IJB No.',
                                                    keepRO: false,
                                                    readOnly: false,
                                                    flex: 1,
                                                    allowBlank:true,
                                                    readOnly:true,
                                                    enforceMaxLength:true,
                                                    minlength:1,
                                                    maxLength:50,
                                                    maskRe:/[A-Za-z0-9-/]/

                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'IJB Date',
                                                    anchor: '-5',
                                                    allowBlank: false,
                                                    name: 'formorderijb_date',
                                                    format: 'd-m-Y',
                                                    submitFormat: 'Y-m-d H:i:s.u',
                                                    flex: 1,
                                                    maskRe:/[0-9-]/,

                                                    enforceMaxLength:true,
                                                    maxLength:10,
                                                    listeners: {
                                                        blur: function(field) {
                                                            var today = new Date();
                                                            if(!field.isValid()) {
                                                                Ext.Msg.alert('Info', 'Date is invalid!');
                                                                field.setValue(today);
                                                            }
                                                        }
                                                    }
                                                }
                                            ]

                                        },
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'cluster_cluster',
                                                    fieldLabel: 'Cluster',
                                                    readOnly: true,
                                                    flex: 1,
                                                    margin: '0 5px 0 0'
                                                },
                                                {
                                                    name: 'block_block',
                                                    readOnly: true,
                                                    fieldLabel: '',
                                                    flex: 1
                                                }
                                            ]

                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: '100%',
                                                    name: 'unit_unit_number',
                                                    fieldLabel: 'Unit Number',
                                                    readOnly: true,
                                                    margin: '0 5px 0 0',
                                                    flex: 2
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Browse Unit',
                                                    action: 'browse_unit',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* CUSTOMER INFORMATION */
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'CUSTOMER INFORMATION',
                    collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer Name',
                                                    anchor: '-5',
                                                    name: 'pengalihanhak_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Address',
                                                    anchor     : '-5',
                                                    name       : 'pengalihanhak_address',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                }
                                            ]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [ {
                                                    xtype: 'combobox',
                                                    queryMode:'local',
                                                    fieldLabel: 'City',
                                                    name: 'pengalihanhak_city',
                                                    displayField: cbf.city.d,
                                                    valueField: cbf.city.v,
                                                    anchor: '-5',
													readOnly: true,
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Email Address',
                                                    anchor: '-5',
                                                    name: 'pengalihanhak_email',
                                                    flex: 1,
                                                    readOnly: true,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Phone',
                                                    name       : 'pengalihanhak_mobilephone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'FAX',
                                                    name       : 'pengalihanhak_fax',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: []
                                        }



                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* Syarat IJB */
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'SYARAT IJB',
                    collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'LUNAS',
                                                name: 'is_lunas',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'SUDAH SERAH TERIMA',
                                                name: 'is_sudahserahterima',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    fieldLabel: 'BIAYA SPLITZING SERTIFIKAT',
                                                    name: 'is_biaya_splitzing',
                                                    inputValue: '1',
                                                    hidden: false,
                                                    uncheckedValue: '0',
                                                    //  margin: '0 5px 0 0',
                                                    width: '100%'
                                                            //flex:3
                                                }
                                            ]
                                        },{
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    bodyStyle: 'border:0px;padding:10px 20px',
                                                    defaults: {
                                                        xtype: 'numberfield',
                                                        margin: '0 10px 0 0',
                                                        fieldStyle: 'background:none;',
                                                        labelWidth: 80,
                                                        // readOnly: false
                                                    },
                                                    items: [
                                                        {
                                                            name: 'biaya_splitz',
                                                            fieldLabel: 'Biaya Splitzing (Rp.)',
                                                            flex: 1

                                                        },
                                                    ]
                                                }]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'TERBIT (SHGB)',
                                                name: 'is_terbitshgb',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'PBB',
                                                name: 'is_pbb',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    bodyStyle: 'border:0px;padding:10px 20px',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 10px 0 0',
                                                        fieldStyle: 'background:none;',
                                                        labelWidth: 80,
                                                        readOnly: false
                                                    },
                                                    items: [
                                                        {
                                                            name: 'shgb_no',
                                                            fieldLabel: 'Nomor',
                                                            flex: 1,
                                                            enforceMaxLength:true,
                                                            maxLength:50
                                                        },
                                                        {
                                                            name: 'shgb_luas',
                                                            fieldLabel: 'Luas (m2)',
                                                            value: 0,
                                                            flex: 1,
                                                            maskRe:/[0-9.]/
                                                        }
                                                        ,
                                                        {
                                                            xtype      : 'xgeneralfieldEST',
                                                            name       : 'shgb_kelurahan',
                                                            fieldLabel : 'Kelurahan',
                                                            flex       : 1,
                                                            maxLength  : 50
                                                        },
                                                    ]
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 80,
                                                },{
                                                    xtype: 'panel',
                                                    layout: 'vbox',
                                                    bodyStyle: 'border:0px;padding:10px 20px',
                                                    defaults: {
                                                        xtype: 'textfield',
                                                        margin: '0 10px 0 0',
                                                        fieldStyle: 'background:none;',
                                                        labelWidth: 80,
                                                        readOnly: false
                                                    },
                                                    items: [
                                                        {
                                                            xtype      : 'xnumericfieldEST',
                                                            name       : 'pbb_tahun',
                                                            fieldLabel : 'Tahun',
                                                            flex       : 1,
                                                            maxLength  :10
                                                        },
                                                        {
                                                            name: 'pbb_njop',
                                                            fieldLabel: 'NJOP (Rp.)',
                                                            flex: 1,
                                                            maskRe:/[A-Za-z0-9\s]/
                                                        }
                                                        ,
                                                        {
                                                            name: 'pbb_luastanah',
                                                            fieldLabel: 'Luas Tanah (m2)',
                                                            value: 0,
                                                            flex: 1,
                                                            maskRe:/[0-9.]/
                                                        },{
                                                            name: 'pbb_luasbangunan',
                                                            fieldLabel: 'Luas Bangunan (m2)',
                                                            value: 0,
                                                            maskRe:/[0-9.]/,
                                                            flex: 1
                                                        },
                                                    ]
                                                }]
                                        },
                                        
                                    ]
                                }
                            ]
                        }
                    ]
                },{
                
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'KELENGKAPAN IJB',
                    collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'KTP Suami',
                                                name: 'is_ktpsuami',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'KTP Istri',
                                                name: 'is_ktpistri',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'KSK atau KK',
                                                name: 'is_kskkk',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                flex:1
                                            }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'Akta kawin atau Surat Keterangan Belum Menikah (Asli dari Kelurahan)',
                                                name: 'is_aktakawin',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'NPWP',
                                                name: 'is_npwp',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'Ganti Nama dan atau WNI',
                                                name: 'is_gantinama',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'Retribusi',
                                                name: 'is_retribusi',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                anchor: '-5',
                                                flex: 1,
                                            }, {
                                                xtype: 'textfield',
                                                fieldLabel: 's.d Periode : ',
                                                name: 'retirbusi_periode',
                                                hidden: false,
                                                anchor: '-5',
                                                flex:2,
                                                enforceMaxLength:true,
                                                maxLength:50
                                            }, {
                                                xtype: 'label',
                                                flex: 3
                                            }]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'SPT (Surat Pemesanan Tanah)',
                                                name: 'is_spt',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                xtype: 'checkboxfield',
                                                fieldLabel: 'SPPJB',
                                                name: 'is_sppjb',
                                                inputValue: '1',
                                                hidden: false,
                                                uncheckedValue: '0',
                                                //  margin: '0 5px 0 0',
                                                flex:1
                                            }]
                                        },{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            width     : '100%',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Catatan',
                                                    name       : 'note',
                                                    flex       : 1,
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },{
                
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'YANG MENYERAHKAN',
                    collapsible: true,
                    width: '50%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '50%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Nama',
                                                name       : 'pemberi_name',
                                                hidden     : false,
                                                flex       : 1,
                                            },]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Selaku',
                                                name       : 'pemberi_jabatan',
                                                hidden     : false,
                                                flex       : 1,
                                            },]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xphonenumberfieldEST',
                                                fieldLabel : 'No.Telp',
                                                name       : 'pemberi_telp',
                                                hidden     : false,
                                                flex       : 1,
                                            },]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },{
                
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'YANG MENERIMA',
                    collapsible: true,
                    width: '50%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '50%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Nama',
                                                name       : 'penerima_name',
                                                hidden     : false,
                                                flex       : 1,
                                            },]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Tanggal',
                                                name: 'penerima_date',
                                                hidden: false,
                                                flex:1,
                                                format: 'd-m-Y',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                maskRe:/[0-9-]/,
                                                enforceMaxLength:true,
                                                maxLength:10,
                                                listeners: {
                                                    blur: function(field) {
                                                        var today = new Date();
                                                        if(!field.isValid()) {
                                                            Ext.Msg.alert('Info', 'Date is invalid!');
                                                            field.setValue(today);
                                                        }
                                                    }
                                                }
                                            },]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },{
                
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'PENGIRIMAN KE NOTARIS',
                    collapsible: true,
                    width: '50%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '50%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'textfield',
                                                fieldLabel: 'Yang Menyerahkan CPS',
                                                name: 'kirimnotaris_cps',
                                                hidden: false,
                                                flex:1,
                                                maskRe:/[A-Za-z0-9\s]/,
                                                enforceMaxLength:true,
                                                maxLength:50
                                            },]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype      : 'xnamefieldEST',
                                                fieldLabel : 'Yang Menerima Notaris',
                                                name       : 'kirimnotaris_penerima',
                                                hidden     : false,
                                                flex       : 1,
                                            },]
                                        },{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                xtype: 'datefield',
                                                fieldLabel: 'Tanggal',
                                                name: 'kirimnotaris_date',
                                                hidden: false,
                                                flex:1,
                                                maskRe:/[0-9-]/,
                                                format: 'd-m-Y',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                enforceMaxLength:true,
                                                maxLength:10,
                                                listeners: {
                                                    blur: function(field) {
                                                        var today = new Date();
                                                        if(!field.isValid()) {
                                                            Ext.Msg.alert('Info', 'Date is invalid!');
                                                            field.setValue(today);
                                                        }
                                                    }
                                                }
                                            },]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },{
                
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'UPDATE POSISI BERKAS IJB',
                    collapsible: true,
                    width: '100%',
					hidden: true, //add by TB on 2019-07-18
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [ {
                                                xtype: 'label',
                                                forId: 'posisiberkascs_date_textid',
                                                text: 'Berkas Masih di CS Legal mulai tanggal : ',
                                                flex: 1
                                            },{
                                                xtype: 'datefield',
                                                fieldLabel: '',
                                                name: 'posisiberkascs_date',
                                                hidden: false,
                                                flex:1,
                                                maskRe:/[0-9-]/,
                                                enforceMaxLength:true,
                                                format: 'd-m-Y',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                maxLength:10,
                                                listeners: {
                                                    blur: function(field) {
                                                        var today = new Date();
                                                        if(!field.isValid()) {
                                                            Ext.Msg.alert('Info', 'Date is invalid!');
                                                            field.setValue(today);
                                                        }
                                                    }
                                                }
                                            },]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [ {
                                                xtype: 'label',
                                                forId: 'posisiberkasbackoffice_date_textid',
                                                text: 'Berkas Ada di Back Office Legal mulai tanggal : ',
                                                flex: 1
                                            },{
                                                xtype: 'datefield',
                                                fieldLabel: '',
                                                name: 'posisiberkasbackoffice_date',
                                                hidden: false,
                                                flex:1,
                                                maskRe:/[0-9-]/,
                                                enforceMaxLength:true,
                                                format: 'd-m-Y',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                maxLength:10,
                                                listeners: {
                                                    blur: function(field) {
                                                        var today = new Date();
                                                        if(!field.isValid()) {
                                                            Ext.Msg.alert('Info', 'Date is invalid!');
                                                            field.setValue(today);
                                                        }
                                                    }
                                                }
                                            },]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [ {
                                                xtype: 'label',
                                                forId: 'posisiberkascekfinance_date_textid',
                                                text: 'Checklist Keuangan mulai tanggal : ',
                                                flex: 1
                                            },{
                                                xtype: 'datefield',
                                                fieldLabel: '',
                                                name: 'posisiberkascekfinance_date',
                                                hidden: false,
                                                flex:1,
                                                maskRe:/[0-9-]/,
                                                format: 'd-m-Y',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                enforceMaxLength:true,
                                                maxLength:10,
                                                listeners: {
                                                    blur: function(field) {
                                                        var today = new Date();
                                                        if(!field.isValid()) {
                                                            Ext.Msg.alert('Info', 'Date is invalid!');
                                                            field.setValue(today);
                                                        }
                                                    }
                                                }
                                            },]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [ {
                                                xtype: 'label',
                                                forId: 'posisiberkasambilsertifikat_date_textid',
                                                text: 'Order Ambil Sertifikat Asli mulai tanggal : ',
                                                flex: 1
                                            },{
                                                xtype: 'datefield',
                                                fieldLabel: '',
                                                name: 'posisiberkasambilsertifikat_date',
                                                hidden: false,
                                                flex:1,
                                                maskRe:/[0-9-]/,
                                                enforceMaxLength:true,
                                                format: 'd-m-Y',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                maxLength:10,
                                                listeners: {
                                                    blur: function(field) {
                                                        var today = new Date();
                                                        if(!field.isValid()) {
                                                            Ext.Msg.alert('Info', 'Date is invalid!');
                                                            field.setValue(today);
                                                        }
                                                    }
                                                }
                                            },]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [ {
                                                xtype: 'label',
                                                forId: 'posisiberkaskirimnotaris_date_textid',
                                                text: 'Berkas Sudah di Kirim ke Notaris mulai tanggal : ',
                                                flex: 1
                                            },{
                                                xtype: 'datefield',
                                                fieldLabel: '',
                                                name: 'posisiberkaskirimnotaris_date',
                                                hidden: false,
                                                flex:1,
                                                maskRe:/[0-9-]/,
                                                format: 'd-m-Y',
                                                submitFormat: 'Y-m-d H:i:s.u',
                                                enforceMaxLength:true,
                                                maxLength:10,
                                                listeners: {
                                                    blur: function(field) {
                                                        var today = new Date();
                                                        if(!field.isValid()) {
                                                            Ext.Msg.alert('Info', 'Date is invalid!');
                                                            field.setValue(today);
                                                        }
                                                    }
                                                }
                                            },]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
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
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});