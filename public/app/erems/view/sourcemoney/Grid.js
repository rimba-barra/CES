Ext.define('Erems.view.sourcemoney.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSourcemoneyGridStore',
        idProperty: 'sourcemoney_id',
        extraParams: {}
    },
    alias:'widget.sourcemoneygrid',
    
    bindPrefixName:'Sourcemoney',
   // itemId:'',
    newButtonLabel:'New',
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
               ,{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 200,
                    dataIndex: 'sourcemoney',
                    hideable: false,
                    text: 'Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 300,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
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


