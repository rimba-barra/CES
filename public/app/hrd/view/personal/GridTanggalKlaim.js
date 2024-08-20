Ext.define('Hrd.view.personalhistory.GridTanggalKlaim', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorytanggalklaimgrid',
    storeConfig: {
        id: 'PersonalhistoryGridTanggalKlaimStore',
        idProperty: 'mutasi_id',
        extraParams: {
            mode_read: 'obattanggalklaim',
            employee_id:0
        }
    },
    id: 'PrsTanggalKlaimGridID',
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
                    format:'d-m-Y',
                    dataIndex: 'claim_date',
                    text: 'Tanggal'
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'total',
                    text: 'Jumlah'
                },
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});