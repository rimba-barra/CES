Ext.define('Hrd.view.personalhistory.GridDinas', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorydinasgrid',
    storeConfig: {
        id: 'PersonalhistoryGridDinasStore',
        idProperty: 'dinas_id',
        extraParams: {
            mode_read: 'dinas',
            employee_id:0
        }
    },
    id: 'PrspshDinasGridID',
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
           
                    dataIndex: 'nomor_surat',
                    text: 'Nomor Surat'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'date',
                    text: 'Tanggal'
                },
                
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});