Ext.define('Erems.library.template.view.combobox.NPWP_Klasifikasiusaha', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbnpwpklasifikasiusaha',
    mode_read: 'detail',
    storeIdProperty: 'NPWP_klasifikasiusaha_id',
    storeID: 'cbNpwpklasifikasiusahaStore',
    valueField: 'npwp_klasifikasiusaha_id',
    displayField: 'klasifikasiusaha',
    fieldLabel: "klasifikasiusaha"
});


