Ext.define('Hrd.view.trainingcaption.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingcaptionformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'caption',
                    fieldLabel:'Caption'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});