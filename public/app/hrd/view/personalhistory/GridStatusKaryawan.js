Ext.define('Hrd.view.personalhistory.GridStatusKaryawan', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorystatuskaryawangrid',
    storeConfig: {
        id: 'PersonalhistoryGridStatusKaryawanStore',
        idProperty: 'promosi_id',
        extraParams: {
            mode_read: 'karirstatus',
            employee_id:0
        }
    },
    id: 'PrsStatusKaryawanGridID',
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
                    dataIndex: 'employeestatus_employeestatus',
                    text: 'Status Karyawan'
                },
                {
                    xtype:'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'effective_date',
                    text: 'Tgl. Efektif'
                },
                {
                    xtype:'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'effective_date',
                    text: 'Tgl. Angkat'
                },
                {
                    xtype:'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'newstatusinformation_contract_start',
                    text: 'Per. Awal'
                },
                {
                    xtype:'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'newstatusinformation_contract_end',
                    text: 'Per. Akhir'
                },
                {
                    
                    dataIndex: 'sk_number',
                    text: 'Nomor SK'
                }
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});