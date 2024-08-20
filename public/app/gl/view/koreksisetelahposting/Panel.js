//6-11-2-18
//MODUL KOREKSI SETELAH POSTING SUDAH TIDAK DIPAKAI
//LANGSUNG REQUIRES JOURNAL COMPONENT SAJA
//KARENA SAMA PERSIS, HANYA MAIN FILTER
//override by DAVID

Ext.define('Gl.view.koreksisetelahposting.Panel',{
    extend:'Gl.library.template.view.Panel',
    requires:['Gl.view.journal.Grid','Gl.view.journal.FormSearch'],
    alias:'widget.koreksisetelahpostingpanel',
    itemId:'KoreksisetelahpostingPanel',
    id: 'koreksisetelahpostingpanelID',
    gridPanelName:'journalgrid',
    formSearchPanelName:'journalformsearch'
});
