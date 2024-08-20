Ext.define('Erems.view.masterkoefisien.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterkoefisienformdata',
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    frame:true,
    bodyBorder: true,
    // autoWidth:true,
    // bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;background:none;',
    requires: [
        'Erems.library.template.component.Pricetypecombobox',
        'Erems.view.masterkoefisien.FormDataDetail',
    ],
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'container',
                        layout: 'vbox'
                    },
                    items: [
                        {
                            defaults: {
                                xtype: 'container',
                                layout: 'hbox',
                                width: 260,
                                margins:'5 0 0 0'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'koefisien_id'
                                },
                                {
                                    xtype: 'pricetypecombobox',
                                    fieldLabel: 'Price Type',
                                    name: 'pricetype_id',
                                    editable: false,
                                    allowBlank: false,
                                    width: 255,
                                    listeners:{
                                        beforequery: function(record){
                                            record.query = new RegExp(record.query, 'i');
                                            record.forceAll = true;
                                        }
                                    }
                                    // anchor:'-15'
                                }, 
                                {
                                    xtype: 'textfield',
                                    name: 'pricelist',
                                    allowBlank: false,
                                    width: 255,
                                    fieldLabel: 'Pricelist'
                                }, 
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: 'Asuransi',
                                            name: 'group_asuransi_nominal_persen',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Nominal',
                                                    name: 'asuransi_nominal_persen',
                                                    inputValue: '1',
                                                    width:80,
                                                    itemId: 'asuransi_nominal_persen_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Persen',
                                                    name: 'asuransi_nominal_persen',
                                                    inputValue: '2',
                                                    itemId: 'asuransi_nominal_persen_2'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'splitter', width: 105,
                                        },
                                        {
                                            xtype: 'textfield',
                                            bodyStyle: 'margin-left: 5px;',
                                            // fieldLabel: 'Asuransi',
                                            anchor: '-5',
                                            width: 135,
                                            itemId:'biaya_asuransi',
                                            name: 'biaya_asuransi',
                                            allowBlank:true,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/
                                        },{
                                            xtype: 'checkboxfield',
                                            fieldLabel: '',
                                            name: 'is_biaya_asuransi',
                                            checked: true,
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            width: 80,
                                            listeners: {
                                                change: function() {
                                                    var txt = me.down('[name=biaya_asuransi]');
                                                    if(this.checked){
                                                        txt.allowBlank = false;
                                                    } else {
                                                        txt.allowBlank = true;
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: 'BPHTB',
                                            name: 'group_bphtb_nominal_persen',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Nominal',
                                                    name: 'bphtb_nominal_persen',
                                                    inputValue: '1',
                                                    width:80,
                                                    itemId: 'bphtb_nominal_persen_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Persen',
                                                    name: 'bphtb_nominal_persen',
                                                    inputValue: '2',
                                                    itemId: 'bphtb_nominal_persen_2',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'splitter', width: 105,
                                        },{
                                            xtype: 'textfield',
                                            bodyStyle: 'margin-left: 5px;',
                                            // fieldLabel: 'BPHTB',
                                            anchor: '-5',
                                            width: 135,
                                            itemId:'biaya_bphtb',
                                            name: 'biaya_bphtb',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            allowBlank:true
                                        },{
                                            xtype: 'checkboxfield',
                                            fieldLabel: '',
                                            name: 'is_biaya_bphtb',
                                            checked: true,
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            width: 80,
                                            listeners: {
                                                change: function() {
                                                    var txt = me.down('[name=biaya_bphtb]');
                                                    if(this.checked){
                                                        txt.allowBlank = false;
                                                    } else {
                                                        txt.allowBlank = true;
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: 'BBN',
                                            name: 'group_bbn_nominal_persen',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Nominal',
                                                    name: 'bbn_nominal_persen',
                                                    inputValue: '1',
                                                    width:80,
                                                    itemId: 'bbn_nominal_persen_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Persen',
                                                    name: 'bbn_nominal_persen',
                                                    inputValue: '2',
                                                    itemId: 'bbn_nominal_persen_2',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'splitter', width: 105,
                                        },{
                                            xtype: 'textfield',
                                            bodyStyle: 'margin-left: 5px;',
                                            // fieldLabel: 'BPHTB',
                                            anchor: '-5',
                                            width: 135,
                                            itemId:'biaya_bbn',
                                            name: 'biaya_bbn',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            allowBlank:true
                                        },{
                                            xtype: 'checkboxfield',
                                            fieldLabel: '',
                                            name: 'is_biaya_bbn',
                                            checked: true,
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            width: 80,
                                            listeners: {
                                                change: function() {
                                                    var txt = me.down('[name=biaya_bbn]');
                                                    if(this.checked){
                                                        txt.allowBlank = false;
                                                    } else {
                                                        txt.allowBlank = true;
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: 'AJB',
                                            name: 'group_ajb_nominal_persen',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Nominal',
                                                    name: 'ajb_nominal_persen',
                                                    inputValue: '1',
                                                    width:80,
                                                    itemId: 'ajb_nominal_persen_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Persen',
                                                    name: 'ajb_nominal_persen',
                                                    inputValue: '2',
                                                    itemId: 'ajb_nominal_persen_2',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'splitter', width: 105,
                                        },{
                                            xtype: 'textfield',
                                            bodyStyle: 'margin-left: 5px;',
                                            // fieldLabel: 'BPHTB',
                                            anchor: '-5',
                                            width: 135,
                                            itemId:'biaya_ajb',
                                            name: 'biaya_ajb',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            allowBlank:true
                                        },{
                                            xtype: 'checkboxfield',
                                            fieldLabel: '',
                                            name: 'is_biaya_ajb',
                                            checked: true,
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            width: 80,
                                            listeners: {
                                                change: function() {
                                                    var txt = me.down('[name=biaya_ajb]');
                                                    if(this.checked){
                                                        txt.allowBlank = false;
                                                    } else {
                                                        txt.allowBlank = true;
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: 'Biaya Administratsi',
                                            name: 'group_administrasi_nominal_persen',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Nominal',
                                                    name: 'administrasi_nominal_persen',
                                                    inputValue: '1',
                                                    width:80,
                                                    itemId: 'administrasi_nominal_persen_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Persen',
                                                    name: 'administrasi_nominal_persen',
                                                    inputValue: '2',
                                                    itemId: 'administrasi_nominal_persen_2',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'splitter', width: 105,
                                        },{
                                            xtype: 'textfield',
                                            bodyStyle: 'margin-left: 5px;',
                                            // fieldLabel: 'BPHTB',
                                            anchor: '-5',
                                            width: 135,
                                            itemId:'biaya_administrasi',
                                            name: 'biaya_administrasi',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            allowBlank:true
                                        },{
                                            xtype: 'checkboxfield',
                                            fieldLabel: '',
                                            name: 'is_biaya_administrasi',
                                            checked: true,
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            width: 80,
                                            listeners: {
                                                change: function() {
                                                    var txt = me.down('[name=biaya_administrasi]');
                                                    if(this.checked){
                                                        txt.allowBlank = false;
                                                    } else {
                                                        txt.allowBlank = true;
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: 'Tanda Jadi',
                                            name: 'group_tandajadi_nominal_persen',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Nominal',
                                                    name: 'tandajadi_nominal_persen',
                                                    inputValue: '1',
                                                    width:80,
                                                    itemId: 'tandajadi_nominal_persen_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'Persen',
                                                    name: 'tandajadi_nominal_persen',
                                                    inputValue: '2',
                                                    itemId: 'tandajadi_nominal_persen_2',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'splitter', width: 105,
                                        },{
                                            xtype: 'textfield',
                                            bodyStyle: 'margin-left: 5px;',
                                            anchor: '-5',
                                            width: 150,
                                            itemId:'tandajadi',
                                            name: 'tandajadi',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            allowBlank:true
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    hidden:true,
                                    items: [
                                        {
                                            xtype:'label',
                                            text:'Biaya Administratsi Subsidi',
                                            width:100,
                                        },
                                        {
                                            layout: 'vbox',
                                            bodyStyle: 'border:0px;background:none',
                                            width:150,
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    name: 'group_admsubsidi_nominal_persen',
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Nominal',
                                                            name: 'admsubsidi_nominal_persen',
                                                            inputValue: '1',
                                                            width:80,
                                                            itemId: 'admsubsidi_nominal_persen_1',
                                                            checked: true
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Persen',
                                                            name: 'admsubsidi_nominal_persen',
                                                            inputValue: '2',
                                                            itemId: 'admsubsidi_nominal_persen_2',
                                                        }
                                                    ]
                                                },
                                                {
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px;background:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            bodyStyle: 'margin-left: 5px;',
                                                            // fieldLabel: 'BPHTB',
                                                            anchor: '-5',
                                                            width: 135,
                                                            itemId:'biaya_admsubsidi',
                                                            name: 'biaya_admsubsidi',
                                                            enableKeyEvents: true,
                                                            maskRe: /[0-9\.]/,
                                                            allowBlank:true,
                                                            value:0
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: '',
                                                            name: 'is_biaya_admsubsidi',
                                                            // checked: true,
                                                            inputValue: '1',
                                                            uncheckedValue: '0',
                                                            width: 15,
                                                            listeners: {
                                                                change: function() {
                                                                    var txt = me.down('[name=biaya_admsubsidi]');
                                                                    if(this.checked){
                                                                        txt.allowBlank = false;
                                                                    } else {
                                                                        txt.allowBlank = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    hidden:true,
                                    items: [
                                        {
                                            xtype:'label',
                                            text:'Biaya Pengendalian Mutu',
                                            width:100,
                                        },
                                        {
                                            layout: 'vbox',
                                            bodyStyle: 'border:0px;background:none',
                                            width:150,
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    name: 'group_pmutu_nominal_persen',
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Nominal',
                                                            name: 'pmutu_nominal_persen',
                                                            inputValue: '1',
                                                            width:80,
                                                            itemId: 'pmutu_nominal_persen_1',
                                                            checked: true
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Persen',
                                                            name: 'pmutu_nominal_persen',
                                                            inputValue: '2',
                                                            itemId: 'pmutu_nominal_persen_2',
                                                        }
                                                    ]
                                                },
                                                {
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px;background:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            bodyStyle: 'margin-left: 5px;',
                                                            // fieldLabel: 'BPHTB',
                                                            anchor: '-5',
                                                            width: 135,
                                                            itemId:'biaya_pmutu',
                                                            name: 'biaya_pmutu',
                                                            enableKeyEvents: true,
                                                            maskRe: /[0-9\.]/,
                                                            allowBlank:true
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: '',
                                                            name: 'is_biaya_pmutu',
                                                            // checked: true,
                                                            inputValue: '1',
                                                            uncheckedValue: '0',
                                                            width: 15,
                                                            listeners: {
                                                                change: function() {
                                                                    var txt = me.down('[name=biaya_pmutu]');
                                                                    if(this.checked){
                                                                        txt.allowBlank = false;
                                                                    } else {
                                                                        txt.allowBlank = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    hidden:true,
                                    items: [
                                        {
                                            xtype:'label',
                                            text:'Biaya Paket Tambahan',
                                            width:100,
                                        },
                                        {
                                            layout: 'vbox',
                                            bodyStyle: 'border:0px;background:none',
                                            width:150,
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    name: 'group_paket_tambahan_nominal_persen',
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Nominal',
                                                            name: 'paket_tambahan_nominal_persen',
                                                            inputValue: '1',
                                                            width:80,
                                                            itemId: 'paket_tambahan_nominal_persen_1',
                                                            checked: true
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Persen',
                                                            name: 'paket_tambahan_nominal_persen',
                                                            inputValue: '2',
                                                            itemId: 'paket_tambahan_nominal_persen_2',
                                                        }
                                                    ]
                                                },
                                                {
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px;background:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            bodyStyle: 'margin-left: 5px;',
                                                            // fieldLabel: 'BPHTB',
                                                            anchor: '-5',
                                                            width: 135,
                                                            itemId:'biaya_paket_tambahan',
                                                            name: 'biaya_paket_tambahan',
                                                            enableKeyEvents: true,
                                                            maskRe: /[0-9\.]/,
                                                            allowBlank:true
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            fieldLabel: '',
                                                            name: 'is_biaya_paket_tambahan',
                                                            // checked: true,
                                                            inputValue: '1',
                                                            uncheckedValue: '0',
                                                            width: 15,
                                                            listeners: {
                                                                change: function() {
                                                                    var txt = me.down('[name=biaya_paket_tambahan]');
                                                                    if(this.checked){
                                                                        txt.allowBlank = false;
                                                                    } else {
                                                                        txt.allowBlank = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: 'Jenis Cicilan',
                                            name: 'group_um_inh_scheduletype',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'UM',
                                                    name: 'um_inh_scheduletype',
                                                    inputValue: '1',
                                                    width:80,
                                                    itemId: 'um_inh_scheduletype_1',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'INH',
                                                    name: 'um_inh_scheduletype',
                                                    inputValue: '2',
                                                    itemId: 'um_inh_scheduletype_2',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // {
                                //     layout: 'hbox',
                                //     bodyStyle: 'border:0px;background:none;',
                                //     height:30,
                                //     items: [
                                        // {
                                        //     xtype: 'splitter', width: 105,
                                        // },
                                        // {   
                                        //     xtype: 'label', text: '% '
                                        // }, 
                                        // {
                                        //     xtype: 'splitter', width: 10,
                                        // }, 
                                        // {
                                        //     xtype: 'label', text: ' X '
                                        // }, 
                                        // {
                                        //     xtype: 'textfield',
                                        //     width: 80,
                                        //     value: 0,
                                        //     itemId:'um_inh_termin',
                                        //     name: 'um_inh_termin',
                                        //     enableKeyEvents: true,
                                        //     maskRe: /[0-9\.]/,
                                        //     allowBlank:true
                                        // }
                                //     ]
                                // },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    height:25,
                                    items: [
                                        {   
                                            xtype: 'textfield',
                                            fieldLabel: 'Persentase DP',
                                            width: 150,
                                            itemId:'persentase_dp',
                                            name: 'persentase_dp',
                                            value: 0,
                                            enableKeyEvents: true,
                                            maskRe: /[0-9\.]/,
                                            allowBlank:true
                                        },
                                        {
                                            xtype: 'label', text: ' %',width: 20
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            boxLabel: 'DP Awal',
                                            name: 'is_dp_awal',
                                            itemId:'is_dp_awal',
                                            checked: false,
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            width: 80
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    height:25,
                                    items: [
                                        {
                                            xtype           : 'xnumericfieldEST',
                                            fieldLabel      : 'Termin',
                                            width           : 150,
                                            value           : 0,
                                            itemId          : 'um_inh_termin',
                                            name            : 'um_inh_termin',
                                            enableKeyEvents : true,
                                            allowBlank      : true
                                        },
                                        {
                                            xtype: 'label', text: ' X'
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    height:25,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            width: 150,
                                            fieldLabel: 'Persentase',
                                            itemId:'um_inh_persen',
                                            name: 'um_inh_persen',
                                            value: 0,
                                            readOnly: true,
                                            allowBlank:true
                                        },
                                        {
                                            xtype: 'label', text: ' %'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'disc_pembayaran',
                                    itemId:'disc_pembayaran',
                                    decimalPrecision:2,
                                    width: 170,
                                    step:0.1,
                                    value: 1,
                                    minValue: 0.01,
                                    fieldLabel: 'Disc Pembayaran',
                                    hidden:true // added by rico 08022023
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'collection_fee',
                                    itemId:'collection_fee',
                                    decimalPrecision:2,
                                    width: 170,
                                    step:0.1,
                                    value: 1,
                                    minValue: 0.01,
                                    fieldLabel: 'Collection Fee',
                                    hidden:true // added by rico 08022023
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'koefisien',
                                    itemId:'koefisien',
                                    allowBlank: false,
                                    decimalPrecision:2,
                                    width: 170,
                                    step:0.1,
                                    value: 1,
                                    minValue: 0.01,
                                    readOnly: true,
                                    fieldLabel: 'Koefisien'
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px;background:none;',
                                    items: [
                                        {
                                            xtype: 'label', text: ' X ', itemId:'discountRateYear'
                                        }, 
                                        {
                                            xtype: 'splitter', width: 74
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Generate',
                                            action: 'generate_schedule'
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            defaults: {
                                xtype: 'container',
                                layout: 'hbox',
                                width: 540
                            },
                            items: [
                                {
                                    xtype: 'masterkoefisienformdatadetail',
                                    width: 490,
                                    bodyStyle: 'overflow-x: hidden; overflow-y: auto;', 
                                    itemId: 'MyMasterkoefisienformdatadetail'
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    }
});