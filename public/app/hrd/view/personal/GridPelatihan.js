Ext.define('Hrd.view.personalhistory.GridPelatihan', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorypelatihangrid',
    storeConfig: {
        id: 'PersonalhistoryGridPelatihanStore',
        idProperty: 'training_id',
        extraParams: {
            mode_read: 'training',
            employee_id:0
        }
    },
    id: 'PrsPelatihanGridID',
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
                    dataIndex: 'programtraining_code',
                    text: 'Kode Training'
                },
                {
                    dataIndex: 'programtraining_theme',
                    text: 'Keterangan'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'scheduletraining_end_date',
                    text: 'Tgl. Mulai'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'scheduletraining_start_date',
                    text: 'Tgl. Akhir'
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'programtraining_cost',
                    text: 'Biaya'
                },
                {
                    dataIndex: 'certificate',
                    text: 'Sertifikat'
                },
                {
                    dataIndex: 'training_status',
                    text: 'Lulus'
                },
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});