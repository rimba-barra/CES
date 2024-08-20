Ext.define('Erems.view.progressunit.FormDataGenerateTargetKontruksi', {
    extend: 'Erems.library.template.view.FormData',
    requires: [],
    alias: 'widget.progressunitformdatageneratetargetkontruksi',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'unit_id'
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
                        action: 'generateSelection',
                        itemId: 'btnGenerateSelection',
                        padding: 5,
                        width: 125,
                        disabled: true,
                        iconCls: 'icon-add',
                        text: 'Generate Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'generateAll',
                        itemId: 'btnGenerateAll',
                        padding: 5,
                        width: 175,
                        disabled: true,
                        iconCls: 'icon-add',
                        text: 'Generate to All in Cluster'
                    },
                    {
                        xtype: 'button',
                        action: 'generateAllSPK',
                        itemId: 'btnGenerateAllSPK',
                        padding: 5,
                        width: 175,
                        disabled: true,
                        iconCls: 'icon-add',
                        text: 'Generate to All Unit in SPK'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        align: 'right',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});