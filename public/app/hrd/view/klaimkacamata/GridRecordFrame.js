Ext.define('Hrd.view.klaimkacamata.GridRecordFrame', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.klaimkacamatarecordframegrid',
    storeConfig:{
        id:'KlaimkacamataRecordFrameStore',
        idProperty:'klaimkacamata_id',
        extraParams:{
            mode_read: 'frame',
            employee_id:0
        }
    },
    id: 'KKChildFrameGridID',
    bindPrefixName: 'Klaimkacamata',
    newButtonLabel: 'New',
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
                   xtype:'datecolumn',
                   dataIndex: 'tanggal_klaim',
                   format:'d/m/Y',
                   text: 'Tanggal'
                },
                {  xtype:'numbercolumn',
                   dataIndex: 'claim_value',
                   text: 'Klaim'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [];
        return dockedItems;
    }
});