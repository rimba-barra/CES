Ext.define('Cashier.library.template.component.Rangeapprovecombobox', {
   // extend: 'Ext.form.field.ComboBox',
   extend: 'Cashier.library.component.Combobox',
    queryMode: 'local',
    alias: 'widget.rangeapprovecombobox',
   // requires:['Cashier.store.Rangeapprove'],
    store: 'Rangeapprove',
    fieldLabel: 'Range Amount',
    allowBlank: false,
    blankText: 'This should not be blank!',
    displayField: 'range',
    valueField: 'rangeapprove_id',
    //addBlankValue:true,
    initComponent: function(config) {
        var me = this;

        me.callParent(config);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})