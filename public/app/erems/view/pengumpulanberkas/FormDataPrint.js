Ext.define('Erems.view.pengumpulanberkas.FormDataPrint', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.pengumpulanberkasprintformdata',
    requires: [],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 170,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    editedRow: -1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    id:'viewPanelId',
                    html:'Hello'
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
                        action: 'print',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-print',
                        text: 'Print'
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