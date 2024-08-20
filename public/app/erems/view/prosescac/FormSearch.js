Ext.define('Erems.view.prosescac.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.prosescacformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                
                {
                    xtype: 'textfield',
                   
                    name: 'cac_name',
                    fieldLabel: 'Member Name'
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
