Ext.define('Erems.view.statuspembayaranreport.FormData', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.statuspembayaranreportformdata',
    frame         : true,
    autoScroll    : true,
    bodyBorder    : true,
    width         : 600,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems : me.generateDockedItems(),
            items       : [
                {
                    xtype    : 'fieldset',
                    layout   : 'vbox',
                    maxWidth : 250,
                    margin   : '0 0 5px 0',
                    items    : [
                        {
                            xtype      : 'radiofield',
                            boxLabel   : 'Sudah Bayar',
                            name       : 'radio_status_bayar',
                            inputValue : 'sudah_bayar', 
                            itemId     : 'sudah_bayar'
                        },
                        {
                            xtype      : 'radiofield',
                            boxLabel   : 'Belum Bayar',
                            name       : 'radio_status_bayar',
                            inputValue : 'belum_bayar', 
                            itemId     : 'belum_bayar'
                        },
                        {
                            xtype      : 'radiofield',
                            boxLabel   : 'Belum Jatuh Tempo',
                            name       : 'radio_status_bayar',
                            inputValue : 'belum_jatuh_tempo', 
                            itemId     : 'belum_jatuh_tempo'
                        },
                        {
                            xtype      : 'xnumericfieldEST',
                            name       : 'angsuran_ke',
                            itemId     : 'angsuran_ke',
                            fieldLabel : 'Angsuran Ke',
                            labelWidth : 80,
                            width      : 150,
                            disabled   : true,
                        }
                    ]
                },
                {
                    xtype  : 'fieldset',
                    layout : 'vbox',
                    border : false,
                    items  : [
                        {
                            xtype      : 'radiofield',
                            boxLabel   : 'Sudah Akad Kredit',
                            name       : 'radio_status_bayar',
                            inputValue : 'sudah_akad_kredit', 
                            itemId     : 'sudah_akad_kredit'
                        },
                        {
                            xtype      : 'radiofield',
                            boxLabel   : 'Sudah Lunas',
                            name       : 'radio_status_bayar',
                            inputValue : 'sudah_lunas', 
                            itemId     : 'sudah_lunas'
                        },
                        {
                            xtype      : 'radiofield',
                            boxLabel   : 'Belum Akad Kredit - Sudah Lunas DP',
                            name       : 'radio_status_bayar',
                            inputValue : 'belum_akad_kredit_sudah_lunas_dp', 
                            itemId     : 'belum_akad_kredit_sudah_lunas_dp'
                        },
                        {
                            xtype      : 'radiofield',
                            boxLabel   : 'ALL',
                            name       : 'radio_status_bayar',
                            inputValue : 'all', 
                            itemId     : 'all',
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    padding : 6,
                    type    : 'hbox'
                },
                items: [
                    {
                        xtype   : 'button',
                        action  : 'excel',
                        itemId  : 'btnSearch',
                        padding : 5,
                        width   : 120,
                        iconCls : 'icon-excel',
                        text    : 'Process to Excel'
                    },
                    {
                        xtype   : 'button',
                        action  : 'reset',
                        itemId  : 'btnReset',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-reset',
                        text    : 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

