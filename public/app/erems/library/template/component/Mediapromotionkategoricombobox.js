Ext.define('Erems.library.template.component.Mediapromotionkategoricombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.mediapromotionkategoricombobox',
    store: 'Masterpromotionmediakategori',
    fieldLabel: 'Media Promotion Kategori',
    displayField: 'mediapromotion_kategori',
    valueField: 'mediapromotion_kategori_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})