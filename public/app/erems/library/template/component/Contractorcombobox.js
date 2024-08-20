Ext.define('Erems.library.template.component.Contractorcombobox', {
    extend: 'Erems.library.component.ComboboxDS',
    alias: 'widget.contractorcombobox',
    fieldLabel: 'Contractor',
    displayField: 'contractorname',
    valueField: 'contractor_id',
    mode_read:'contractor',
    storeUrl:'spk',
    storeIdProperty:'contractor_id',
    storeID:'ContractorStore',
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});