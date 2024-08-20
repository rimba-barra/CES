Ext.define('Erems.library.template.component.Tanggalvalidasicombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.tanggalvalidasicombobox',
    fieldLabel: 'Tanggal',
    store: new Ext.data.ArrayStore({
        fields: [
            'tanggal',
            'tanggal_text'
        ],
        data: [[5, '5'], [15, '15'], [25, '25']]
    }),
    displayField: 'tanggal_text',
    valueField: 'tanggal',

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
        //   return record.get(this.displayField);
        //}
    }
})