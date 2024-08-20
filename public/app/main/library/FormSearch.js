Ext.define('Main.library.FormSearch', {
    extend: 'Ext.form.Panel',
	
	frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	
	selfName: null,
	
	initComponent: function() {
        var me = this;
		
		me.selfName = me.self.getName().split('.',3)[2];
		
        Ext.applyIf(me, {			
			dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        padding: 3,
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
							text: 'Search',
                            itemId: 'btnSearch',
							iconCls: 'icon-search',
                            padding: 5,
                            width: 75                            
                        },
                        {
                            xtype: 'button',
							text: 'Reset',
                            itemId: 'btnReset',
							iconCls: 'icon-reset',
                            padding: 5,
                            width: 75                                                        
                        }
                    ]
                }
            ],
			items: []
		});
		me.defaults = Ext.merge(
			{
				maxLength: 50,
				enforceMaxLength: true,				
                maskRe: /[^\`\"\']/,                
                labelSeparator: ' ',
                labelClsExtra: 'small',                
				labelAlign: 'top',
                anchor: '100%',
				style: 'margin-bottom:10px;'
			},		
			me.defaults || {}
		);
        me.callParent(arguments);
    }
});