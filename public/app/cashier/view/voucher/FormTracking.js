Ext.define('Cashier.view.voucher.FormTracking', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformtracking',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    bindPrefixName: 'Voucher',
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [               
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                bodyBorder: false,
                defaults: {
                    layout: 'fit'
                },
                items: [
                {
                    xtype: 'tabpanel',
                    itemId: 'voucherrequesttab',
                    name: 'voucherrequesttab',
                    width: 950,
                    height: 200,
                    activeTab: 0,
                    defaults: {layout: 'fit'},
                    items: [
                    {
                        title: 'LOG',
                        xtype: 'vouchergriddetaillog',
                        name: 'gridtabvoucherdetaillog',
                        id: 'gridtabvoucherdetaillog',
                        readOnly: false,
                    },

                    ],
                }
                ]
            },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
        var x = [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            padding: '0 0 0 0',
            layout: {
                padding: 6,
                type: 'hbox',
            },
            items: [
            {
                xtype: 'fieldcontainer',
                layout: 'vbox',
                align: 'right',
                bodyBorder: false,
                defaults: {
                    layout: 'fit'
                },
                items: [

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
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    },
                    ]
                },
                ]
            },
            ]
        }
        ];
        return x;
    }
});

