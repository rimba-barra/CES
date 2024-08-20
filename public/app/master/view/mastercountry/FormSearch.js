Ext.define('Master.view.mastercountry.FormSearch', {
    extend: 'Master.library.template.view.FormSearch',
    alias: 'widget.mastercountryformsearch',
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