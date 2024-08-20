Ext.define('Erems.view.rekapstockallreport.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.rekapstockallreportformsearch',
    requires: [],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    generateDockedItems:function(){
        var dockedItems = [
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
                            itemId: 'btnSearch',
                            padding: 5,
                            width: 75,
                            iconCls: 'icon-search',
                            text: 'Process'
                        },
                        {
                            xtype: 'button',
                            action: 'reset',
                            itemId: 'btnReset',
                            padding: 5,
                            width: 75,
                            iconCls: 'icon-reset',
                            text: 'Reset'
                        }
                    ]
                }
            ];
         return dockedItems;
    }
});
