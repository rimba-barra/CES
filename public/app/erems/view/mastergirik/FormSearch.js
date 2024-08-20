Ext.define('Erems.view.mastergirik.FormSearch', {
    extend: 'Main.library.FormSearch',
	
	alias: 'widget.MastergirikFormSearch',
	itemId: 'MastergirikFormSearch',
	
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
					fieldLabel: 'No. Girik',
                    itemId: 'girik_no',
                    name: 'girik_no',
                    enableKeyEvents: true
                },
				{
                    xtype: 'textfield',
					fieldLabel: 'Nama Pemilik',
                    itemId: 'pemilik',
                    name: 'pemilik',
                    enableKeyEvents: true
                },
			]
		});
		me.callParent(arguments);
	}
});