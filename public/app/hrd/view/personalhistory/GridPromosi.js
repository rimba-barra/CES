Ext.define('Hrd.view.personalhistory.GridPromosi', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorypromosigrid',
    storeConfig: {
        id: 'PersonalhistoryGridPromosiStore',
        idProperty: 'promosi_id',
        extraParams: {
            mode_read: 'karirpromosi',
            employee_id:0
        }
    },
    id: 'PrsPromosiGridID',
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
                    dataIndex: 'group_code',
                    text: 'Golongan lama'
                },
                {
                    dataIndex: 'position_position',
                    text: 'Jabatan Lama'
                },
                {
                    dataIndex: 'newgroup_code',
                    text: 'Golongan Baru'
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