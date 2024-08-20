Ext.define('Cashier.library.template.component.Penandatangancombobox', {
   // extend: 'Ext.form.field.ComboBox',
   extend: 'Cashier.library.component.Combobox',
    queryMode: 'local',
    alias: 'widget.penandatangancombobox',
   // requires:['Cashier.store.Masterpenandatangan'],
    store: 'Masterpenandatangan',
    fieldLabel: 'Penandatangan',
    displayField: 'name',
    valueField: 'penandatangan_id',
    allowBlank: false,
    blankText: 'This should not be blank!',
    //addBlankValue:true,
    initComponent: function(config) {
        var me = this;

        me.callParent(config);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})