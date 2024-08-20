Ext.define('Erems.library.template.component.Projectptcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.projectptcombobox',
    store: 'Masterdata.store.Projectpt',
    fieldLabel: 'PT Name',
    displayField: 'pt_name',
    valueField: 'pt_id',
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})