Ext.define('Hrd.view.tipepinjaman.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.tipepinjaman.Grid','Hrd.view.tipepinjaman.FormSearch','Hrd.view.tipepinjaman.FormData'],
    alias:'widget.tipepinjamanpanel',
    itemId:'TipepinjamanPanel',
    gridPanelName:'tipepinjamangrid',
    formSearchPanelName:'tipepinjamanformsearch',
    formDataName:'tipepinjamanformdata',
});