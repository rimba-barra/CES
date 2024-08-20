Ext.define('Cashier.view.voucher.FormPemutihan', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.voucherformpemutihan',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    bodyBorder   : true,
    bodyPadding  : 10,
    kosongGa     : -1,
    uniquename   : '_voucherpemutihan',
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'payment_id',
                },
                {
                    xtype: 'hiddenfield',
                    name : 'kasbank_id',
                },
                {
                    xtype     : 'xmoneyfield',
                    name      : 'amount',
                    fieldLabel: 'Amount ',
                    emptyText : 'Amount',
                    anchor    : '-5',
                    maskRe    : /[0-9\-\.]/,
                    allowBlank: false,
                    fieldStyle: 'text-align:right;align:right',
                    readOnly  : true,
                },
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
                        action : 'save',
                        itemId : 'btnSave',
                        padding: 5,
                        width  : 75,        iconCls: 'icon-save',
                        text   : 'Process'
                    },
                    {
                        xtype  : 'button',
                        action : 'close',
                        itemId : 'btnClose',
                        padding: 5,
                        width  : 75,
                        iconCls: 'icon-cancel',
                        text   : 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

