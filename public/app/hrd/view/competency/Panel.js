Ext.define('Hrd.view.competency.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.competency.Grid',
    	'Hrd.view.competency.FormSearch'
    ],
    alias 				: 'widget.competencypanel',
    itemId 				: 'CompetencyPanel',
    gridPanelName 		: 'competencygrid',
    formSearchPanelName : 'competencyformsearch'
});