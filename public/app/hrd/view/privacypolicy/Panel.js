Ext.define('Hrd.view.privacypolicy.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.privacypolicy.Grid','Hrd.view.privacypolicy.FormSearch'],
    alias:'widget.privacypolicypanel',
    itemId:'PrivacypolicyPanel',
    gridPanelName:'privacypolicygrid',
    formSearchPanelName:'privacypolicyformsearch'
});