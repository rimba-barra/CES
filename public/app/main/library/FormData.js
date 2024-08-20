Ext.define('Main.library.FormData', {
    extend: 'Ext.form.Panel',
	
	frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 5,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	trackResetOnLoad: true,
	width: 500,
	
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
						'<small style="color:#777777;"><span style="color:#ff0000;">*</span> required fields</small>',
						'->',
                        {
                            xtype: 'button',
							text: 'Save',
                            itemId: 'btnSave',
							iconCls: 'icon-save',
                            padding: 5,
                            width: 75
                        },
                        {
                            xtype: 'button',
							text: 'Cancel',
                            itemId: 'btnCancel',
							iconCls: 'icon-cancel',
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
				labelWidth: 80,				
				anchor: '100%'
			},		
			me.defaults || {}
		);		
		me.callParent(arguments);
    }
});