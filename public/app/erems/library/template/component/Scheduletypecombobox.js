Ext.define('Erems.library.template.component.Scheduletypecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.scheduletypecombobox',
    fieldLabel: '',
    store: new Ext.data.ArrayStore({
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'}
        ],
        data: [[5, 'UM'], [3,'INHOUSE']]
    }),
    displayField: 'name',
    valueField: 'id',
    autoLoad:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})