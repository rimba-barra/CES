Ext.define('Erems.view.masterkaryawan.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterkaryawanformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'xnamefieldEST',
                    name       : 'employee_name',
                    fieldLabel : 'Nama Karyawan',
                    anchor     : '-5'
                },
                {
                    xtype: 'combobox',
                    name: 'position_position_id',
                    fieldLabel: 'Jabatan',
                    store: new Ext.data.ArrayStore({
                        fields: [
                            'position_position_id',
                            'position_position'
                        ],
                        data: [['0','ALL'],[7, 'SALES'],[8, 'COLLECTOR'], [9, 'SVY'],[26,'PENGAWAS'],[263,'UPLINE']]
                    }),
                    displayField: 'position_position',
                    valueField: 'position_position_id',
                    value:'0',
                    anchor: '-5'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
