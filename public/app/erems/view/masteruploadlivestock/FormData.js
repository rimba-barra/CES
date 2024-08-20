Ext.define('Erems.view.masteruploadlivestock.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masteruploadlivestockformdata',
    requires: [
	
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 500,
	//height: 300,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
						{
							xtype: 'filefield',
							itemId: 'excel_filename',
							emptyText: 'Select File',
							fieldLabel: 'Excel File',
							name: 'excel_filename',
							buttonText: 'Browse',
							allowBlank: false
						}
                    ]
                }
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Upload'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

