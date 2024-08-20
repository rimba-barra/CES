Ext.define('Erems.view.masterupline.FormData', {
	extend: 'Main.library.FormData',
	
	alias: 'widget.MasteruplineFormData',
	itemId: 'MasteruplineFormData',
	
	width: 500,
		
	initComponent: function() {
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'upline_id',
                    name: 'upline_id'
				},
				{
                    xtype: 'textfield',
					fieldLabel: 'Code',
                    itemId: 'code',
                    name: 'code',
					allowBlank: false,                  
					maskRe:/[A-Za-z0-9\s.]/
                },
				{
                    xtype: 'textfield',
					fieldLabel: 'Name',
                    itemId: 'name',
                    name: 'name',
					allowBlank: false,
					enforceMaxLength:true,
					maxLength:50,
					minLength:2,
					maskRe:/[A-Za-z0-9\s.]/
                },
			]
		});
		me.callParent(arguments);
	}
});