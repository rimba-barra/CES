Ext.define('Hrd.view.masterworklocation.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.masterworklocationformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'worklocation',
                    fieldLabel:'Worklocation Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});