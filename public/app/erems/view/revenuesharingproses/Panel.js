Ext.define('Erems.view.revenuesharingproses.Panel', {
	extend: 'Erems.library.template.view.Panel',
	requires: ['Erems.view.revenuesharingproses.Grid',
		'Erems.view.revenuesharingproses.GridMainDetail',
		'Erems.view.revenuesharingproses.GridMainProsesDate',
		'Erems.view.revenuesharingproses.FormSearch'],
	alias: 'widget.revenuesharingprosespanel',
	itemId: 'revenuesharingprosesPanel',
	gridPanelName: 'revenuesharingprosesgrid',
	formSearchPanelName: 'revenuesharingprosesformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype: me.formSearchPanelName,
					region: 'west',
					split: true,
					maxWidth: 500,
					minWidth: 300,
					width: 300,
					collapsed: true,
					collapsible: true,
					iconCls: 'icon-search',
					title: 'Search'
				},
				{
					xtype: 'container',
					layout: 'vbox',
					region: 'center',
					height: '100%',
					flex: 1,
					items: [
						{
							xtype: 'fieldset',
							title: 'Revenue Sharing - Proses',
							width: '100%',
							flex: 1,
							layout: 'hbox',
							items: [
								{
									xtype: me.gridPanelName,
									height: '100%',
									flex: 1
								}
							]
						},
						{
							xtype: 'fieldset',
							title: 'Detail Process',
							flex: 1,
							width: '100%',
							layout: 'hbox',
							items: [
								{
									xtype: 'revenuesharingprosesdategrid',
									height: '100%',
									flex: 2,
									itemId: 'revenuesharingprosesdateGrid'
								},
								{
									xtype: 'splitter', width: 10,
								},
								{
									xtype: 'revenuesharingprosesdetailgrid',
									height: '100%',
									flex: 5,
									itemId: 'revenuesharingprosesDetailGrid'
								}
							]
						}
					]
				}
			]
		});

		me.callParent(arguments);
	}
});
