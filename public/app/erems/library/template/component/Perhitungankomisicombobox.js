Ext.define('Erems.library.template.component.Perhitungankomisicombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.perhitungankomisicombobox',
    store: 'Masterperhitungankomisi',
    fieldLabel: 'Perhitungan Komisi',
    displayField: 'judul',
    valueField: 'komisi_perhitungan_id',
    //addBlankValue:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})