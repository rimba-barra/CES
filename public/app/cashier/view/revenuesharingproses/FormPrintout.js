Ext.define('Cashier.view.revenuesharingproses.FormPrintout', {
    extend       : 'Cashier.library.template.view.FormData',
    requires     : [],
    alias        : 'widget.revenuesharingprosesformprintout',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    height       : 200,
    bodyBorder   : true,
    bodyStyle    : 'padding:5px 5px 0',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [

                {
                    xtype         : 'radiogroup',
                    fieldLabel    : '',
                    name          : 'rg_print',
                    id            : 'template',
                    labelSeparator: '',
                    itemCls       : 'x-check-group-alt',
                    columns       : 1,
                    items         : [
                        {
                            xtype     : 'radiofield',
                            boxLabel  : 'Detil RS',
                            name      : 'rg_print',
                            inputValue: 'detail_rs',
                            checked   : true
                        },
                        {
                            xtype     : 'radiofield',
                            boxLabel  : 'Rekap RS',
                            name      : 'rg_print',
                            inputValue: 'rekap_rs',
                        },
                        {
                            xtype     : 'radiofield',
                            boxLabel  : 'Detil Terjual',
                            name      : 'rg_print',
                            inputValue: 'detail_terjual',
                        },
                        {
                            xtype     : 'radiofield',
                            boxLabel  : 'Rekap Terjual',
                            name      : 'rg_print',
                            inputValue: 'rekap_terjual',
                        }
                    ]

                }

            ],
            dockedItems: me.generateDockedItem()
        });




        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype : 'toolbar',
                dock  : 'bottom',
                ui    : 'footer',
                layout: {
                    padding: 6,
                    type   : 'hbox'
                },
                items: [
                    {
                        xtype  : 'button',
                        action : 'print',
                        padding: 5,
                        width  : 130,
                        iconCls: 'icon-print',
                        text   : 'Process to Excel'
                    },
                    {
                        xtype  : 'button',
                        action : 'cancel',
                        padding: 5,
                        width  : 75,
                        iconCls: 'icon-cancel',
                        text   : 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }

                ]
            }
        ];
        return x;
    }
});