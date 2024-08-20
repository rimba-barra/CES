Ext.define('Erems.view.masterblock.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterBlockGridStore',
        idProperty: 'block_id',
        extraParams: {}
    },
    alias:'widget.masterblockgrid',
   
    bindPrefixName:'Masterblock',
   // itemId:'',
    newButtonLabel:'New Master Block',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                }
                /*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'block_id',
                    text: 'ID'
                }*/,
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 65,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 150,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 165,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 130,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster \/ Tower'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createdby',
                    width: 90,
                    dataIndex: 'user_user_fullname',
                    hideable: false,
                    text: 'Created By'
                },{
                     xtype:'datecolumn',
                    format:'d-m-Y',
                    width: 90,
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Created Date'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    width: 90,
                    dataIndex: 'usermodi_user_fullname',
                    hideable: false,
                    text: 'Last Edit By'
                },{
                     xtype:'datecolumn',
                    format:'d-m-Y',
                    width:90,
                    dataIndex: 'Modion',
                    hideable: false,
                    text: 'Last Edit Date'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


