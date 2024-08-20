Ext.define('Master.view.mastercity.FormSearch', {
    extend: 'Master.library.template.view.FormSearch',
    alias: 'widget.mastercityformsearch',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
           
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Country Name'
                },
             
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
