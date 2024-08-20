Ext.define('Erems.library.template.view.combobox.PerhitunganKomisi', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbperhitungankomisi',
    mode_read: 'perhitungan_komisi',
    storeIdProperty: 'perhitungan_komisi_id',
    storeID: 'cbperhitungankomisiStore',
    displayField: 'judul_perhitungan_komisi',
    valueField: 'perhitungan_komisi_id',
    fieldLabel:"Pilih Perhitungan Komisi"
});