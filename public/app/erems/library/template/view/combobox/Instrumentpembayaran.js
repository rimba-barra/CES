Ext.define('Erems.library.template.view.combobox.Instrumentpembayaran', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbinstrumentpembayaran',
    mode_read: 'detail',
    storeIdProperty: 'instrumentpembayaran_id',
    storeID: 'cbInstrumentpembayaranStore',
    displayField: 'instrumentpembayaran',
    valueField: 'instrumentpembayaran_id',
    fieldLabel: "Instrument Pembayaran"
});


