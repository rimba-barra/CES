Ext.define('Erems.view.masterpekerjaankonsumen.FormData', {
	extend: 'Main.library.FormData',
	
	alias: 'widget.MasterpekerjaankonsumenFormData',
	itemId: 'MasterpekerjaankonsumenFormData',
	
	width: 500,
		
	initComponent: function() {
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'pekerjaankonsumen_id',
                    name: 'pekerjaankonsumen_id'
				},
				{
                    xtype: 'textfield',
					fieldLabel: 'Code',
                    itemId: 'code',
                    name: 'code',
					allowBlank: false,
					maskRe:/[A-Za-z0-9/s.]/             
                },
				{
                    xtype: 'textfield',
					fieldLabel: 'Name',
                    itemId: 'name',
                    name: 'name',
					allowBlank: false,
					maskRe:/[A-Za-z0-9\s.]/,
					enforceMaxLength:true,
					minLength:3,
					maxLength:50
                },
			]
		});
		me.callParent(arguments);
	}
});