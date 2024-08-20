Ext.define('Erems.library.template.view.combobox.KomisiPencairan', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbkomisipencairan',
    mode_read: 'komisi_pencairan',
    storeIdProperty: 'komisi_pencairan_id',
    storeID: 'cbkomisipencairanStore',
    displayField: 'judul_komisi',
    valueField: 'komisi_pencairan_id',
    fieldLabel:"Skema Sales"
});