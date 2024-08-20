Ext.define('Hrd.view.matrixcompetency.Panel',{
    extend 				: 'Hrd.library.box.view.Panel',
    requires 			: [
    	'Hrd.view.matrixcompetency.Grid',
    	'Hrd.view.matrixcompetency.FormSearch'
    ],
    alias 				: 'widget.matrixcompetencypanel',
    itemId 				: 'MatrixcompetencyPanel',
    gridPanelName 		: 'matrixcompetencygrid',
    formSearchPanelName : 'matrixcompetencyformsearch'
});