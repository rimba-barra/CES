Ext.define('Hrd.view.absentrecord.FormOvertime', {
    alias: 'widget.absentrecordformovertime',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.GridOvertimedetail'],
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            items: [
                {
                   xtype:'absentrecordovertimegrid',
                   height:120
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