Ext.define('Erems.view.masterdiscountmarketing.FormSearch', {
    extend: 'Main.library.FormSearch',
	
	alias: 'widget.MasterdiscountmarketingFormSearch',
	itemId: 'MasterdiscountmarketingFormSearch',
	
	initComponent: function(){
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'textfield',
					fieldLabel: 'Code',
                    itemId: 'code',
                    name: 'code',
                    enableKeyEvents: true
                },							
                {
                    xtype: 'textfield',
					fieldLabel: 'Name',
                    itemId: 'name',
                    name: 'name',
                    enableKeyEvents: true
                },
			]
		});
		me.callParent(arguments);
	}
});