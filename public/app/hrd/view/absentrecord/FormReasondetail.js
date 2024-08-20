Ext.define('Hrd.view.absentrecord.FormReasondetail', {
    alias: 'widget.absentrecordformreasondetail',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.GridReasondetail'],
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            items: [
                {
                   xtype:'absentrecordreasondetailgrid',
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