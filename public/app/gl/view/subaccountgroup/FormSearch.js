Ext.define('Gl.view.subaccountgroup.FormSearch',{
    extend:'Gl.library.template.view.FormSearch',
    alias:'widget.subaccountgroupformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_kelsub',
                    name: 'kelsub',
                    fieldLabel: 'Group Sub COA',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents : true
                },
		{
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents : true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
