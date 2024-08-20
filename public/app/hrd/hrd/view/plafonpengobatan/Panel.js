Ext.define('Hrd.view.plafonpengobatan.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.plafonpengobatan.Grid','Hrd.view.plafonpengobatan.FormSearch','Hrd.view.plafonpengobatan.FormData'],
    alias:'widget.plafonpengobatanpanel',
    itemId:'PlafonpengobatanPanel',
    gridPanelName:'plafonpengobatangrid',
    formSearchPanelName:'plafonpengobatanformsearch',
    formDataName:'plafonpengobatanformdata',
    formDataWidth:600
    
});