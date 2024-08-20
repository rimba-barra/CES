Ext.define('Erems.view.informasitagihan.Panel',{
	extend   : 'Erems.library.template.view.Panel',
	requires : [
		'Erems.view.informasitagihan.Grid',
		'Erems.view.informasitagihan.GridDetail',
		'Erems.view.informasitagihan.GridDetailSchedule',
		'Erems.view.informasitagihan.FormSearch'
	],
	alias                   : 'widget.informasitagihanpanel',
	itemId                  : 'InformasitagihanPanel',
	gridPanelName           : 'informasitagihangrid',
	gridPaneldetail         : 'informasitagihangriddetail',
	gridPaneldetailschedule : 'informasitagihangriddetailschedule',
	formSearchPanelName     : 'informasitagihanformsearch',
	initComponent           : function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype       : me.formSearchPanelName,
					region      : 'west',
					split       : true,
					maxWidth    : 500,
					minWidth    : 300,
					width       : 300,
					collapsed   : true,
					collapsible : true,
					iconCls     : 'icon-search',
					title       : 'Search'
                },
                {
					xtype  : 'container',
					layout : 'vbox',
					region : 'center',
					height : '100%',
					flex   : 1,
					items  : [
                        {
							xtype  : 'fieldset',
							flex   : 1,
							width  : '100%',
							height : '70%',
							layout : 'hbox',
							items  : [
								{
									xtype    : me.gridPanelName,
									height   : '100%',
									maxWidth : 380,
									flex     : 1,
									itemId   : me.gridPanelName
                                },
								{
									xtype : 'splitter', 
									width : 10,
								},
                                {
									xtype  : me.gridPaneldetail,
									height : '100%',
									flex   : 2,
									itemId : me.gridPaneldetail
                                }
                            ]
                        },
                        {
							xtype  : 'fieldset',
							width  : '100%',
							height : '30%',
							flex   : 1,
							layout : 'hbox',
							items  : [
                                {
									xtype    : me.gridPaneldetailschedule,
									height   : '100%',
									maxWidth : 900,
									flex     : 3,
									itemId   : me.gridPaneldetailschedule
                                }
                            ]
                        },
                    ]
                }
			]
		});

		me.callParent(arguments);
	}
});