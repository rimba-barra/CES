Ext.define('Gl.view.asset.FormSearch',{
    extend:'Gl.library.template.view.FormSearch',
    alias:'widget.assetformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_asset_account',
                    name: 'asset_account',
                    fieldLabel: 'Account',
                    enforceMaxLength: true,
                    maxLength: 50
                },
	        {
                    xtype: 'textfield',
                    itemId: 'fsms_asset_name',
                    name: 'asset_name',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    maxLength: 50
                },
	        {
                    xtype: 'textfield',
                    itemId: 'fsms_asset_note',
                    name: 'asset_note',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    maxLength: 50
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
