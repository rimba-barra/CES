Ext.define('Cashier.view.kartupiutangacc.FormDataHitungppn', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kartupiutangaccformdatahitungppn',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_kartupiutangaccformdatahitungppn",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ': ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'subgl_id'
                },
                {
                    xtype: 'kartupiutangaccgridppn',
                    fieldLabel: '',
                    height: 350
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
                    action: 'prosesppn',
                    itemId: 'btnProsesppn',
                    padding: 5,
                    iconCls: 'icon-save',
                    text: 'Proses PPN'
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
    },
});

