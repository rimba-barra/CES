Ext.define('Hrd.view.ubahstatus.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.ubahstatus.Grid','Hrd.view.ubahstatus.FormSearch','Hrd.view.ubahstatus.FormData'],
    alias:'widget.ubahstatuspanel',
    itemId:'UbahstatusPanel',
    gridPanelName:'ubahstatusgrid',
    formSearchPanelName:'ubahstatusformsearch',
    formDataName:'ubahstatusformdata',
    formDataWidth:'100%',
     fsCollapsed:false,
});