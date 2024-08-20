Ext.define('Erems.library.template.component.Notifikasimodulecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.notifikasimodulecombobox',
    store: 'Notifikasimodule',
    fieldLabel: 'Module',
    displayField: 'module_name',
    valueField: 'notifikasi_module_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})