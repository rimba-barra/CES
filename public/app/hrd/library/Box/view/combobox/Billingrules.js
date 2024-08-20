Ext.define('Erems.library.template.view.combobox.Billingrules', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbbillingrules',
    mode_read: 'billingrules',
    storeIdProperty: 'billingrules_id',
    storeID: 'cbBillingRulesStore',
    displayField: 'description',
    valueField: 'billingrules_id',
    fieldLabel:"Billing Rule"
});


