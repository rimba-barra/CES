Ext.define('Master.view.masterprovinsi.FormSearch', {
    extend: 'Master.library.template.view.FormSearch',
    alias: 'widget.masterprovinsiformsearch',
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
