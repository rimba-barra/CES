Ext.define('Hrd.view.ubahstatus.GridStatusInfo', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.ubahstatusinfogrid',
    storeConfig: {
        id: 'UbahstatusInfoGridStore',
        idProperty: 'statuschange_id',
        extraParams: {
            mode_read:'statuschange'
            
        }
    },
    bindPrefixName: 'Ubahstatus',
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
                    dataIndex:'employeestatus_employeestatus',
                    text:'Emplyoee Status',
                    width:75
                },
                {
                    dataIndex: 'code',
                    text: 'SK Number',
                    width:150
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex:'value',
                    text:'Effective Date',
                    width:75
                }
                
            ]
        });

        me.callParent(arguments);
    },
    
});