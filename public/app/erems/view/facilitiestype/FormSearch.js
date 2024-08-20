Ext.define('Erems.view.facilitiestype.FormSearch',{
    extend:'Erems.library.box.view.FormSearch',
    alias:'widget.facilitiestypeformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
              
                {
                    name:'code',
                    fieldLabel:'Code',
                    enableKeyEvents: true
                },
                {
                    name:'facilitiestype',
                    fieldLabel:'Name',
                    enableKeyEvents: true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});