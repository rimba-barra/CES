Ext.define('Hrd.view.klaimpengobatan.GridClaim', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.klaimpengobatanclaimgrid',
    storeConfig: {
        id: 'KlaimPengobatanClaimGridStore',
        idProperty: 'klaimpengobatan_id',
        extraParams: {
            mode_read:'claim'
            
        }
    },
    bindPrefixName: 'Klaimpengobatan',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
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
                    dataIndex:'year',
                    text:'Year',
                    width:50
                },
                {
                    dataIndex: 'jenispengobatan_jenispengobatan',
                    text: 'Type',
                    width:100
                },
                {
                    xtype:'datecolumn',
                    format:'d/m/Y',
                    dataIndex:'claim_date',
                    text:'Date',
                    width:75
                },
                {
                    xtype:'numbercolumn',
           
                    dataIndex:'total',
                    text:'Total',
                    width:75
                }
                
            ]
        });

        me.callParent(arguments);
    },
    
});