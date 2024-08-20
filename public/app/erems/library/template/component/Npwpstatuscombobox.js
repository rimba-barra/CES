Ext.define('Erems.library.template.component.Npwpstatuscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.npwpstatuscombobox',
    fieldLabel: 'NPWP Status',
    store: new Ext.data.ArrayStore({
        fields: [
            'NPWP_status_id',
            'description'
        ],
        data: [[1, 'PRIBADI'], [2, 'BADAN'], [4, 'SUAMI'], [5, 'ISTRI'], [6, 'ANAK'], [7, 'ORANG TUA'], [3, 'LAIN-LAIN']]
    }),
    displayField: 'description',
    valueField: 'NPWP_status_id',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})