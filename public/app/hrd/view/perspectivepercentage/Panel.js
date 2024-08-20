Ext.define('Hrd.view.perspectivepercentage.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.perspectivepercentage.Grid',
    	'Hrd.view.perspectivepercentage.FormSearch'
    ],
    alias 				: 'widget.perspectivepercentagepanel',
    itemId 				: 'MatrixcompetencyPanel',
    gridPanelName 		: 'perspectivepercentagegrid',
    formSearchPanelName : 'perspectivepercentageformsearch'
});