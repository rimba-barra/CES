Ext.define('Erems.view.masterdiscountmarketing.FormData', {
	extend: 'Main.library.FormData',
	
	alias: 'widget.MasterdiscountmarketingFormData',
	itemId: 'MasterdiscountmarketingFormData',
	
	width: 500,
		
	initComponent: function() {
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'discountmarketing_id',
                    name: 'discountmarketing_id'
				},
				{
                    xtype: 'textfield',
					fieldLabel: 'Code',
                    itemId: 'code',
                    name: 'code',
					allowBlank: false                   
                },
				{
                    xtype: 'textfield',
					fieldLabel: 'Name',
                    itemId: 'name',
                    name: 'name',
					allowBlank: false                   
                },
				{
                    xtype: 'textfield',
					fieldLabel: 'Disc Nilai',
                    itemId: 'disc_nilai',
                    name: 'disc_nilai',
					allowBlank: false,
					maskRe: /[0-9\.]/,
					currencyFormat: true           
                }
			]
		});
		me.callParent(arguments);
	}
});