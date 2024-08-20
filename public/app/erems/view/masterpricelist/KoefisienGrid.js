Ext.define('Erems.view.masterpricelist.KoefisienGrid', {
    extend      : 'Erems.library.template.view.FormData',
    alias       : 'widget.masterpricelistkoefisiengrid',
    requires    : [ 'Erems.view.masterpricelist.KoefisienGridDetail' ],
    store       : 'Masterpricelistkoefisiengriddetail',
    frame       : true,
    autoScroll  : true,
    anchorSize  : 100,
    height      : 600,
    bodyBorder  : true,
    bodyPadding : 10,
    bodyStyle   : 'padding:5px 5px 0;',//overflow-y: hidden !important;
    defaults    : {
        border : false,
        xtype  : 'panel',
        flex   : 1,
        layout : ''
    },
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            items : [
                {
                    xtype : 'hiddenfield',
                    name  : 'unit_unit_id'
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '10px 0 0 0',
                    defaults : {
                        xtype  : 'container',
                        layout : 'vbox',
                        flex   : 1,
                        width  : '100%'
                    },
                    items : [
                        {
                            margin   : '0 20px 0 0',
                            defaults : {
                                xtype  : 'container',
                                layout : 'hbox',
                                width  : '100%',
                                margin : '0 0 10px 0'
                            },
                            items : [
                                {
                                    defaults : {
                                        xtype : 'textfield',
                                        width : '100%'
                                    },
                                    items : [
                                        {
                                            name       : 'cluster_code',
                                            fieldLabel : 'Kawasan / Cluster',
                                            flex       : 1,
                                            readOnly   : true,
                                            fieldCls   : 'readonly',
                                            margin     : '0 5px 0 0'
                                        },
                                        {
                                            name       : 'cluster_cluster',
                                            fieldLabel : '',
                                            readOnly   : true,
                                            fieldCls   : 'readonly',
                                            flex       : 1
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        xtype : 'textfield',
                                        width : '100%'
                                    },
                                    items : [
                                        {
                                            name       : 'block_code',
                                            fieldLabel : 'Block',
                                            flex       : 1,
                                            readOnly   : true,
                                            fieldCls   : 'readonly',
                                            margin     : '0 5px 0 0'
                                        },
                                        {
                                            name       : 'block_block',
                                            fieldLabel : '',
                                            readOnly   : true,
                                            fieldCls   : 'readonly',
                                            flex       : 1
                                        }
                                    ]
                                },
                                {
                                    items : [
                                        {
                                            xtype      : 'textfield',
                                            width      : '100%',
                                            name       : 'unit_unit_number',
                                            fieldLabel : 'Unit Number',
                                            margin     : '0 5px 0 0',
                                            readOnly   : true,
                                            fieldCls   : 'readonly',
                                            flex       : 2
                                        },
                                        {
                                            xtype  : 'button',
                                            text   : 'Browse Unit',
                                            action : 'browse_unit',
                                            flex   : 1
                                        },
                                        {
                                            xtype : 'label',
                                            text  : '',
                                            width : 50
                                        }
                                    ]
                                },
                                {
                                    items : [
                                        {
                                            xtype      : 'textfield',
                                            width      : '100%',
                                            name       : 'purpose_purpose',
                                            fieldLabel : 'Purpose',
                                            margin     : '0 5px 0 0',
                                            readOnly   : true,
                                            fieldCls   : 'readonly',
                                            flex       : 2,
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            margin   : '0 20px 0 0',
                            defaults : {
                                xtype : 'container',
                                width : '100%'
                            },
                            items: [
                                {
                                    layout   : 'vbox',
                                    defaults : {
                                        xtype : 'textfield',
                                        width : '100%'
                                    },
                                    items : [
                                        {
                                            name       : 'type_name',
                                            readOnly   : true,
                                            fieldCls   : 'readonly',
                                            fieldLabel : 'Type',
                                        }
                                    ]
                                },
                                {
                                    xtype    : 'container',
                                    layout   : 'vbox',
                                    defaults : {
                                        xtype  : 'container',
                                        layout : 'hbox',
                                        width  : '100%',
                                        margin : '0 0 10px 0'
                                    },
                                    items : [
                                        {
                                            defaults : {
                                                margin : '0 10px 0 0'
                                            },
                                            items: [
                                                {
                                                    xtype      : 'textfield',
                                                    name       : 'unit_land_size',
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    fieldLabel : 'Land Size',
                                                    flex       : 3
                                                },
                                                {
                                                    xtype : 'label',
                                                    text  : 'm2',
                                                    width : 30
                                                },
                                                {
                                                    xtype      : 'textfield',
                                                    name       : 'unit_long',
                                                    fieldLabel : 'Long',
                                                    labelWidth : 45,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    flex       : 2
                                                },
                                                {
                                                    xtype  : 'label',
                                                    text   : 'm',
                                                    width  : 20,
                                                    margin : '0 0 0 0'
                                                }
                                            ]
                                        },
                                        {
                                            defaults: {
                                                margin : '0 10px 0 0'
                                            },
                                            items : [
                                                {
                                                    xtype      : 'textfield',
                                                    name       : 'unit_building_size',
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    fieldLabel : 'Building Size',
                                                    flex       : 3
                                                },
                                                {
                                                    xtype : 'label',
                                                    text  : 'm2',
                                                    width : 30
                                                },
                                                {
                                                    xtype      : 'textfield',
                                                    name       : 'unit_width',
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    fieldLabel : 'Width',
                                                    labelWidth : 45,
                                                    flex       : 2
                                                },
                                                {
                                                    xtype  : 'label',
                                                    text   : 'm',
                                                    width  : 20,
                                                    margin : '0 0 0 0'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '10px 0 0 0',
                    defaults : {
                        xtype  : 'container',
                        layout : 'vbox',
                        flex   : 1,
                        width  : '100%'
                    },
                    items: [
                        {
                            xtype    : 'fieldset',
                            layout   : 'hbox',
                            title    : 'Harga Tanah / m2 - @luasan saleable',
                            width    : 372,
                            margin   : '0 0 0 0',
                            defaults : {
                                xtype  : 'container',
                                layout : 'vbox',
                                flex   : 1,
                                width  : '100%'
                            },
                            items : [
                                {
                                    margin   : '0 0 0 0',
                                    itemId   : 'form_saleable_tanah',
                                    defaults : {
                                        xtype  : 'container',
                                        layout : 'hbox',
                                        width  : '100%',
                                        margin : '0 0 0 0'
                                    },
                                    items: [
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Mentah',
                                                    name       : 'harga_tanahmentahpermeter',
                                                    allowBlank : false,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Dev Cost',
                                                    name       : 'harga_tanahdevcostpermeter',
                                                    allowBlank : false,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'HPP',
                                                    name       : 'harga_tanahhpp',
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Harga Jual',
                                                    name       : 'harga_tanahpermeter',
                                                    allowBlank : false,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Gross Margin %',
                                                    name       : 'margin_persen_tanah',
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    value      : 0.00,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype      : 'fieldset',
                            layout     : 'hbox',
                            title      : 'Harga Bangunan / m2 - @luasan saleable',
                            margin     : '0 0 0 0',
                            autoHeight : true,
                            width      : 372,
                            defaults   : {
                                xtype  : 'container',
                                layout : 'vbox',
                                flex   : 1,
                                width  : '100%'
                            },
                            items: [
                                {
                                    margin   : '0 0 0 0',
                                    itemId   : 'form_saleable_bangunan',
                                    defaults : {
                                        xtype  : 'container',
                                        layout : 'hbox',
                                        width  : '100%',
                                        margin : '0 0 0 0',
                                    },
                                    items: [
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'HPP',
                                                    name       : 'harga_bangunanhpp',
                                                    allowBlank : false,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Harga Jual',
                                                    name       : 'harga_bangunanpermeter',
                                                    allowBlank : false,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Gross Margin %',
                                                    name       : 'margin_persen_bangunan',
                                                    value      : 0.00,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '10px 0 0 0',
                    defaults : {
                        xtype  : 'container',
                        layout : 'vbox',
                        flex   : 1,
                        width  : '100%'
                    },
                    items: [
                        {
                            xtype    : 'fieldset',
                            title    : 'Total Tanah',
                            layout   : 'hbox',
                            width    : 372,
                            margin   : '0 0 0 0',
                            defaults : {
                                xtype  : 'container',
                                layout : 'vbox',
                                flex   : 1,
                                width  : '100%'
                            },
                            items : [
                                {
                                    margin   : '0 0 0 0',
                                    defaults : {
                                        xtype  : 'container',
                                        layout : 'hbox',
                                        width  : '100%',
                                        margin : '0 0 0 0'
                                    },
                                    items : [
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Total Harga Tanah',
                                                    name       : 'total_hargatanah',
                                                    labelWidth : 125,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Total HPP Tanah',
                                                    name       : 'total_tanah_hpp',
                                                    labelWidth : 125,
                                                    hidden     : true,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Margin Tanah',
                                                    name       : 'harga_tanah_margin',
                                                    labelWidth : 125,
                                                    hidden     : true
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Margin Tanah %',
                                                    name       : 'harga_tanah_margin_persen',
                                                    labelWidth : 125,
                                                    hidden     : true,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype    : 'fieldset',
                            title    : 'Total Bangunan',
                            layout   : 'hbox',
                            width    : 372,
                            margin   : '0 0 0 0',
                            defaults : {
                                xtype  : 'container',
                                layout : 'vbox',
                                flex   : 1,
                                width  : '100%'
                            },
                            items : [
                                {
                                    margin   : '0 0 0 0',
                                    defaults : {
                                        xtype  : 'container',
                                        layout : 'hbox',
                                        width  : '100%',
                                        margin : '0 0 0 0'
                                    },
                                    items : [
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Total Harga Bangunan',
                                                    name       : 'total_hargabangunan',
                                                    labelWidth : 125,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Total HPP Bangunan',
                                                    name       : 'total_bangunan_hpp',
                                                    labelWidth : 125,
                                                    hidden     : true,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Margin Bangunan',
                                                    name       : 'harga_bangunan_margin',
                                                    labelWidth : 125,
                                                    hidden     : true,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Margin Bangunan %',
                                                    name       : 'harga_bangunan_margin_persen',
                                                    labelWidth : 125,
                                                    hidden     : true,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '10px 0 0 0',
                    defaults : {
                        xtype  : 'container',
                        layout : 'vbox',
                        flex   : 1,
                        width  : '100%'
                    },
                    items: [
                        {
                            xtype    : 'fieldset',
                            title    : 'Total',
                            layout   : 'hbox',
                            margin   : '0 0 1px 0',
                            defaults : {
                                xtype  : 'container',
                                layout : 'vbox',
                                flex   : 1,
                                width  : '100%'
                            },
                            items : [
                                {
                                    margin   : '0 20px 0 0',
                                    defaults : {
                                        xtype  : 'container',
                                        layout : 'hbox',
                                        width  : '100%',
                                        margin : '0 0 0 0'
                                    },
                                    items: [
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Total Harga Cash Bottom',
                                                    name       : 'harga_netto',
                                                    itemId     : 'harga_netto',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly'
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'textfield',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    xtype          : 'checkboxfield',
                                                    fieldLabel     : 'Gross Up',
                                                    name           : 'is_grossup',
                                                    itemId         : 'is_grossup',
                                                    inputValue     : 1,
                                                    uncheckedValue : 0,
                                                    fieldStyle     : 'text-align:right',
                                                    labelWidth     : 170
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel      : 'Gross Up %',
                                                    name            : 'grossup_persen',
                                                    itemId          : 'grossup_persen',
                                                    labelWidth      : 170,
                                                    value           : 0.00,
                                                    hidden          : true // added by rico 08022023
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel      : 'Total Harga Cash Bottom Gross Up',
                                                    itemId          : 'harga_netto_grossup',
                                                    name            : 'harga_netto_grossup',
                                                    labelWidth      : 170,
                                                    value           : 0.00,
                                                    hidden          : true,
                                                    readOnly        : true,
                                                    fieldCls        : 'readonly',
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'textfield',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    xtype      : 'textfield',
                                                    fieldLabel : 'Genco',
                                                    itemId     : 'genco_grossup',
                                                    name       : 'genco_grossup',
                                                    labelWidth : 170,
                                                    hidden     : true,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'textfield',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    xtype      : 'textfield',
                                                    fieldLabel : 'Genco',
                                                    itemId     : 'genco_tanah',
                                                    name       : 'genco_tanah',
                                                    labelWidth : 170,
                                                    hidden     : true,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'textfield',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    xtype      : 'textfield',
                                                    fieldLabel : 'Genco',
                                                    itemId     : 'genco_grossup_persen',
                                                    name       : 'genco_grossup_persen',
                                                    labelWidth : 170,
                                                    hidden     : true,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly',
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Total HPP Tanah & Bangunan',
                                                    name       : 'total_hpptanahbangunan',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly'
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Gross Margin %',
                                                    name       : 'persentase_margin',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly'
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Spare %',
                                                    name       : 'spare',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Total Harga Jual',
                                                    name       : 'total_harga_jual',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly'
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Margin Total',
                                                    name       : 'total_margin',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                    readOnly   : true,
                                                    fieldCls   : 'readonly'
                                                }
                                            ]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            width     : '60%',
                                            items     : [
                                                {
                                                    xtype          : 'checkboxfield',
                                                    itemId         : 'is_bphtb',
                                                    name           : 'is_bphtb',
                                                    inputValue     : 1,
                                                    uncheckedValue : 0,
                                                    boxLabel       : 'Include BPHTB',
                                                    anchor         : '1',
                                                    flex           : 1
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 5,
                                                }, 
                                                {
                                                    xtype          : 'checkboxfield',
                                                    itemId         : 'is_bbn',
                                                    name           : 'is_bbn',
                                                    inputValue     : 1,
                                                    uncheckedValue : 0,
                                                    boxLabel       : 'Include BBN',
                                                    anchor         : '1',
                                                    flex           : 1
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 5,
                                                }, 
                                                {
                                                    xtype          : 'checkboxfield',
                                                    itemId         : 'is_ajb',
                                                    name           : 'is_ajb',
                                                    inputValue     : 1,
                                                    uncheckedValue : 0,
                                                    boxLabel       : 'Include AJB',
                                                    anchor         : '1',
                                                    flex           : 1
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items : [
                                                {
                                                    fieldLabel : 'Markup',
                                                    name       : 'markup',
                                                    itemId     : 'markup',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                        {
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'textfield',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    xtype           : 'textfield',
                                                    fieldLabel      : 'Action Field',
                                                    name            : 'action_field',
                                                    itemId          : 'action_field',
                                                    fieldStyle      : 'text-align:right',
                                                    labelWidth      : 170,
                                                    enableKeyEvents : true,
                                                    hidden          : true
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    layout    : 'hbox',
                    margin    : '10px 0 0 0',
                    bodyStyle : 'border:0px',
                    items     : [{
                        xtype  : 'masterpricelistkoefisiengriddetail',
                        width  : '100%',
                        itemId : 'MyMasterpricelistkoefisiengriddetail'
                    }]
                }
                ,
                {
                    xtype  : 'container',
                    layout : 'hbox',
                    margin : '10px 0 0 0',
                    items  : [
                        {
                            xtype  : 'container',
                            layout : 'vbox',
                            flex   : 1,
                            width  : '100%',
                            items  : [
                                {
                                    xtype      : 'xnotefieldEST',
                                    width      : '100%',
                                    name       : 'keterangan_unit',
                                    fieldLabel : 'Keterangan Unit'
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
});