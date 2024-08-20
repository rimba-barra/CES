Ext.define('Hrd.view.firstdayemployee.FormShortcut', {
    alias: 'widget.firstdayemployeeformshortcut',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.firstdayemployee.GridShortcut','Hrd.view.firstdayemployee.GridShortcutEmployee'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype: 'firstdayemployeeshortcutppgrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'firstdayemployeeshortcutemployeeppgrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
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
                        action: 'processshortcut',
                        padding: 5,
                        width: 120,
                        iconCls: 'icon-save',
                        text: 'Tandai Sudah'
                    },
                    {
                        xtype: 'button',
                        action: 'processshortcut_not',
                        padding: 5,
                        width: 120,
                        iconCls: 'icon-save',
                        text: 'Tandai Belum'
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
    }
});