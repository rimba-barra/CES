Ext.define('Hrd.view.position.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.positionformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'position',
                    fieldLabel:'Code'
                },
                {
                    name:'description',
                    fieldLabel:'Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});