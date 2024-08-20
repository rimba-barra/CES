Ext.define('Hrd.view.transferdata.FormKomponen', {
    alias: 'widget.transferdataformkomponen',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.transferdata.GridKomponen'],
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;



        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'transferdatagridkomponen',
                            height: 300,
                            flex: 1
                        }
                        
                        
                    ]
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
                        text: 'Select'
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