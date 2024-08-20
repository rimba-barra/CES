Ext.define('Erems.library.template.component.Departmentcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.departmentcombobox',
    fieldLabel: 'Department',
    store: new Ext.data.ArrayStore({
        fields: [
            'department_id',
            'code',
            'department'
        ],
        data: [[1,'ARSTK', 'ARSITEK'], [2,'AUDIT','INTERNAL AUDIT'],[3,'BD','BUSSINESS DEVELOPMENT'], [4,'FIN/ACC','FINANCE AND ACCOUNTING']]
    }),
    displayField: 'department',
    valueField: 'department_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
})