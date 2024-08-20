Ext.define('Erems.view.pindahkavling.FormDataSettings', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.pindahkavlingformdatasettings',
    requires: ['Erems.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '&nbsp;',
                    boxLabel:'Pembulatan PPN',
                    name: 'bulat_ppn',
             
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        width: 125,
                        iconCls: 'icon-save',
                        text: 'Save Settings'
                    },

                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
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