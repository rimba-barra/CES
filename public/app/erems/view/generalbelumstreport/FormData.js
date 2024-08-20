Ext.define('Erems.view.generalbelumstreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.generalbelumstreportformdata',
    requires: [
		
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 600,
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
							itemId: 'periode_startdate',
							name: 'periode_startdate',
							fieldLabel: 'Purchase Letter Date',
							labelSeparator:'',
							labelWidth: '50%',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'periode_enddate',
							name: 'periode_enddate',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						}
                    ]
                },
                {
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					width: '100%',
					items: [{
							xtype      : 'xnumericfieldEST',
							fieldLabel : 'Collection Progress',
							name       : 'coll_start',
							labelWidth : '53%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
						{xtype: 'splitter', width: 1}, 
						{
							xtype      : 'xnumericfieldEST',
							fieldLabel : 'to',
							name       : 'coll_end',
							labelWidth : '20%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					width: '100%',
					items: [{
							xtype      : 'xnumericfieldEST',
							fieldLabel : 'Construction Progress',
							name       : 'cp_start',
							labelWidth : '53%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
						{xtype: 'splitter', width: 1}, 
						{
							xtype      : 'xnumericfieldEST',
							fieldLabel : 'to',
							name       : 'cp_end',
							labelWidth : '20%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
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

