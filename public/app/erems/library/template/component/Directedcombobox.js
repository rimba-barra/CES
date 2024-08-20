Ext.define('Erems.library.template.component.Directedcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.directedcombobox',
    fieldLabel: 'Assign to',
    store: new Ext.data.ArrayStore({
        fields: [
            'user_id',
            'name'
        ],
        data: [
            ['0', 'MIS (Kantor Pusat)'], 
            ['4', 'Jerry Petter'], 
            ['5', 'Arif Iradat'],
            ['6', 'Tirtha Brata'],
            ['8', 'Arman Djohan'],
            ['11', 'Tommy Toban'],
            ['1474', 'Ignatius Samuel Megis'],
            ['1478', 'David Prasetyo Budi Arianto']
        ]
    }),
    displayField: 'name',
    valueField: 'user_id',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})