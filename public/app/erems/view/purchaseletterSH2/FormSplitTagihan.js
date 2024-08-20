Ext.define('Erems.view.purchaseletter.FormSplitTagihan', {
    extend: 'Erems.library.template.view.FormData',
    requires: [],
    alias: 'widget.purchaseletterformsplittagihan',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function() {
        var me = this;


        Ext.applyIf(me, {
          
            items: [
                
                
                {
                    xtype: 'xmoneyfield',
                    fieldLabel: 'Tagihan yang telah terbayar',
                    name:'tagihan'

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