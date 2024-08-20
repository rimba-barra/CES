Ext.define('Hrd.view.periodeproses.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.periodeprosesgrid',
    storeConfig:{
        id:'PeriodeprosesGridStore',
        idProperty:'periodeproses_id',
        extraParams:{}
    },
    bindPrefixName: 'Periodeproses',
    newButtonLabel: 'New Periode Proses',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
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
                   dataIndex: 'statusperiode',
                   text: 'Status Periode',
                   width:150,
                },
                {
                   dataIndex: 'tahun',
                   text: 'Tahun',
                   width:100
                },
				{
                   dataIndex: 'start_periode',
                   text: 'Periode Awal',
                   width:100,
				   renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },
				{
                   dataIndex: 'end_periode',
                   text: 'Periode Akhir',
                   width:100,
				   renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});