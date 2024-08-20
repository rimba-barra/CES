Ext.define('Erems.view.masterposisi.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'position_id',
        extraParams: {}
    },
    alias:'widget.masterposisigrid',
    
    bindPrefixName:'Masterposisi',
   // itemId:'',
    newButtonLabel:'New Master Position',
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
               /* {
                    xtype: 'gridcolumn',
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'position_id',
                    text: 'ID'
                }*/,{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 150,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'position',
                    hideable: false,
                    text: 'Position'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createdby',
                    width: 110,
                    dataIndex: 'user_name',
                    hideable: false,
                    text: 'Created By'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createddate',
                    width: 110,
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Created Date'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    width: 110,
                    dataIndex: 'modi_user_name',
                    hideable: false,
                    text: 'Last Edit By'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    width: 110,
                    dataIndex: 'Modion',
                    hideable: false,
                    text: 'Last Edit Date'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    renderCluster:function(value){
        console.log(value);
        var msc = this.loadedStore.Mastercluster;
        var idof = msc.indexOfId(value);
        if(idof  > -1){
            return msc.getAt(idof).get('cluster');
        }
        
    }
});


