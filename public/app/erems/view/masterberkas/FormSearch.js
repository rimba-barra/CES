Ext.define('Erems.view.masterberkas.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterberkasformsearch',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox'
	],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Code',
                    itemId: 'code',
                    name: 'code',
                    anchor:'-15'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Berkas',
                    itemId: 'berkas',
                    name: 'berkas',
                    anchor:'-15'
                },
  
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
