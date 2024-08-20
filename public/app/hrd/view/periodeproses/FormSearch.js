Ext.define('Hrd.view.periodeproses.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.periodeprosesformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
               /*{
                    name:'periodeproses',
                    fieldLabel:'Periodeproses Name'
                },
                {
                    name:'code',
                    fieldLabel:'Code'
                }*/
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});