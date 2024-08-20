Ext.define('Erems.view.masterpanduan.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.masterpanduanformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    name: 'menu',
                    fieldLabel: 'Menu'
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});