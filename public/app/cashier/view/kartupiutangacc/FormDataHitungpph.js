Ext.define('Cashier.view.kartupiutangacc.FormDataHitungpph', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kartupiutangaccformdatahitungpph',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_kartupiutangaccformdatahitungpph",
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
                    xtype: 'kartupiutangaccgridpph',
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
                    action: 'prosespph',
                    itemId: 'btnProsespph',
                    padding: 5,
                    iconCls: 'icon-save',
                    text: 'Proses PPh'
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

