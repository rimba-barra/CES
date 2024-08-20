Ext.define('Hrd.view.personalhistory.GridMutasi', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorymutasigrid',
    storeConfig: {
        id: 'PersonalhistoryGridMutasiStore',
        idProperty: 'mutasi_id',
        extraParams: {
            mode_read: 'karirmutasi',
            employee_id:0
        }
    },
    id: 'PrsMutasiGridID',
    bindPrefixName: 'Personalhistory',
    newButtonLabel: '',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems:[],
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype:'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'effective_date',
                    text: 'Tgl. Efektif'
                },
                {
                    dataIndex: 'department_code',
                    text: 'Dept. Lama'
                },
                {
                    dataIndex: 'position_position',
                    text: 'Jabatan Lama'
                },
                {
                    dataIndex: 'group_code',
                    text: 'Gol. Lama'
                },
                {
                    dataIndex: 'newdepartment_code',
                    text: 'Dept. Baru'
                },
                {
                    dataIndex: 'newposition_position',
                    text: 'Jabatan Baru'
                },
                {
                    dataIndex: 'newgroup_code',
                    text: 'Gol. Baru'
                },
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});