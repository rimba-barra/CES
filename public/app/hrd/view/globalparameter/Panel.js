Ext.define('Hrd.view.globalparameter.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.globalparameter.Grid','Hrd.view.globalparameter.FormSearch','Hrd.view.globalparameter.FormData'],
    alias:'widget.globalparameterpanel',
    itemId:'GlobalparameterPanel',
    gridPanelName:'globalparametergrid',
    formSearchPanelName:'globalparameterformsearch',
    formDataName:'globalparameterformdata',
});