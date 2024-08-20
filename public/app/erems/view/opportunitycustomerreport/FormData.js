Ext.define('Erems.view.opportunitycustomerreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.opportunitycustomerreportformdata',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Typecombobox',
		'Erems.library.template.component.Unitstatuscombobox',
		'Erems.library.template.component.Lunasstatuscombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 550,
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
                            xtype: 'datefield',
                            name: 'bot_date',
                            fieldLabel:'Periode',
                            reportParams: true,
                            flex:3
                        },
                        {
                            xtype:'label',
                            width:20,
                            text:'to',
                            margin:'0 5px'
                        },
                        {
                            xtype: 'datefield',
                            name: 'top_date',
                            fieldLabel:'',
                            reportParams: true,
                            flex:2
                        }
                    ]
                },
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
                        text: 'Process'
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

