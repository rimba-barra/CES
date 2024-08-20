Ext.define('Hrd.view.personalhistory.GridRotasi', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistoryrotasigrid',
    storeConfig: {
        id: 'PersonalhistoryGridRotasiStore',
        idProperty: 'rotasi_id',
        extraParams: {
            mode_read: 'karirrotasi',
            employee_id:0
        }
    },
    id: 'PrsRotasiGridID',
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
                    text: 'Departemen Lama'
                },
                {
                    dataIndex: 'position_position',
                    text: 'Jabatan Lama'
                },
                {
                    dataIndex: 'newdepartment_code',
                    text: 'Departemen Baru'
                },
                {
                    dataIndex: 'newposition_position',
                    text: 'Jabatan Baru'
                }
                
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});