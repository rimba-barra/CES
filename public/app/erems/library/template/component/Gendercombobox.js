Ext.define('Erems.library.template.component.Gendercombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.gendercombobox',
    fieldLabel: 'Jenis Kelamin',
    store: new Ext.data.ArrayStore({
        fields: [
            'gender',
            'description'
        ],
        data: [['L', 'Laki-laki'], ['P', 'Perempuan']]
    }),
    displayField: 'description',
    valueField: 'gender',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})