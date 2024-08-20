Ext.define('Hrd.view.transaksibeasiswa.FormLookup', {
    extend: 'Hrd.library.box.view.FormData',
    alias: 'widget.transaksibeasiswaformlookup',
    requires: ['Hrd.view.transaksibeasiswa.GridChild','Hrd.view.transaksibeasiswa.GridEmployee'],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            
            items: [
                {
                   xtype:'hiddenfield',
                   name:'module'
                },
                {
                    xtype:'transaksibeasiswagridemployee',
                    height:200
                },
                {
                    xtype:'transaksibeasiswachildgrid',
                    height:200
                }
            ],
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});