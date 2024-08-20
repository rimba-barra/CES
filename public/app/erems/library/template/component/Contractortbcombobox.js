Ext.define('Erems.library.template.component.Contractortbcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.contractortbcombobox',
    store: 'Mastercontractor',
    fieldLabel: 'Contractor',
    displayField: 'contractorname',
    valueField: 'contractor_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})