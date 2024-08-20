Ext.define('Erems.library.template.view.combobox.SpkType', {
    extend: 'Erems.library.component.ComboboxDS',
    alias: 'widget.cbspktype',
    mode_read: 'spktype',
    storeUrl: 'spktype',
    storeIdProperty: 'spktype_id',
    storeID: 'cbSpkttypeStore',
    displayField: 'spktype',
    valueField: 'spktype_id',
    fieldLabel:"Spk Type"
});


