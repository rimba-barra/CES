Ext.define('Hrd.view.trainingname.FormCopy', {
    alias: 'widget.trainingnameformcopy',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingname.GridCopy'],
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
                    xtype: 'trainingnamecopygrid',
                    height: 250,
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
                        action: 'processcopy_trainingname',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Copy'
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