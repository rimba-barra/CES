Ext.define('Hrd.view.personalhistory.GridJenisKlaim', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistoryjenisklaimgrid',
    storeConfig: {
        id: 'PersonalhistoryJenisKlaimStore',
        idProperty: 'mutasi_id',
        extraParams: {
            mode_read: 'obatjenisklaim',
            employee_id:0
        }
    },
    id: 'PrsJenisKlaimGridID',
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
                    dataIndex: 'jenispengobatan_code',
                    text: 'Jenis Klaim'
                }
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});