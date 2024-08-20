Ext.define('Erems.view.aftersalesstatushunianreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.aftersalesstatushunianreportformdata',
    requires: [
        //'Erems.library.template.component.Buildingclasscombobox',
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
                        margin: '10px 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'fieldset',
							height: 75,
							width: '100%',
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									columns: 1,
									fieldLabel: 'Status',
									name: 'radiogroup_statushunian',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Sudah Dihuni',
											name: 'radio_statushunian',
											inputValue: '1',
											itemId: 'sudah_dihuni',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Belum Dihuni',
											name: 'radio_statushunian',
											inputValue: '2', 
											itemId: 'belum_dihuni'
										}
									]
								}
							]
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

