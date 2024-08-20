Ext.define('Erems.view.marketingstock.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.marketingstock.Grid','Erems.view.marketingstock.FormSearch'],
	alias               : 'widget.marketingstockpanel',
	itemId              : 'MarketingstockPanel',
	gridPanelName       : 'marketingstockgrid',
	formSearchPanelName : 'marketingstockformsearch'
});