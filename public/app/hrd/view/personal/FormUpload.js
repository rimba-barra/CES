Ext.define('Hrd.view.personal.FormUpload', {
    alias: 'widget.personalformupload',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                   xtype:'hiddenfield',
                   name:'mode_name'
                }, 
                {
                    
                    xtype: 'filefield',
                    fieldLabel: 'File',
                    itemId: 'file_id',
                    name: 'file_name',
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
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
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