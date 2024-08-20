Ext.define('Erems.library.template.component.Rangebagihasilcombobox', {
   // extend: 'Ext.form.field.ComboBox',
   extend: 'Erems.library.component.Combobox',
    queryMode: 'local',
    alias: 'widget.rangebagihasilcombobox',
   // requires:['Erems.store.Masterrangebagihasil'],
    store: 'Masterrangebagihasil',
    fieldLabel: 'Range Bagi Hasil',
    displayField: 'name',
    valueField: 'rangebagihasil_id',
    //addBlankValue:true,
    initComponent: function(config) {
        var me = this;

        me.callParent(config);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})