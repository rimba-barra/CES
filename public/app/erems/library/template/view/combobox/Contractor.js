Ext.define('Erems.library.template.view.combobox.Contractor', {
    extend: 'Erems.library.component.ComboboxDS',
    alias: 'widget.cbcontractor',
    mode_read: 'contractor',
    storeUrl: 'contractor',
    storeIdProperty: 'contractor_id',
    storeID: 'cbContractorStore',
    displayField: 'contractorname',
    valueField: 'contractor_id',
    fieldLabel:"Contractor"
});


