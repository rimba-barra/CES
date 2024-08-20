Ext.define('Erems.view.popupdiscountcollection.Panel',{
	extend              : 'Erems.library.template.view.Panel',
	requires            : ['Erems.view.popupdiscountcollection.Grid','Erems.view.popupdiscountcollection.FormSearch'],
	alias               : 'widget.popupdiscountcollectionpanel',
	itemId              : 'PopupdiscountcollectionPanel',
	gridPanelName       : 'popupdiscountcollectiongrid',
	formSearchPanelName : 'popupdiscountcollectionformsearch'
});