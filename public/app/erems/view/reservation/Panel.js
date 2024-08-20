Ext.define('Erems.view.reservation.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.reservation.Grid','Erems.view.reservation.FormSearch'],
    alias:'widget.reservationpanel',
    itemId:'ReservationPanel',
    gridPanelName:'reservationgrid',
    formSearchPanelName:'reservationformsearch'
});