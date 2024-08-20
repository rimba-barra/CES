Ext.define('Erems.library.template.component.Buildingclasscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.buildingclasscombobox',
    fieldLabel: 'Builiding class',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'name'
        ],
        data: [['RS', 'RS'], ['RE', 'RE']]
    }),
    displayField: 'name',
    valueField: 'name',
    forceSelection : true,
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})