Ext.define('Hrd.view.trainingschedule.FormBanding', {
    alias: 'widget.trainingscheduleformbanding',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingschedule.GridBanding'],
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
                    xtype: 'trainingschedulebandinggrid',
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
                        action: 'save_trainingbanding',
                        padding: 5,
                        iconCls: 'icon-save',
                        text: 'Add Banding'
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