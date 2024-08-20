Ext.define('Erems.view.mastercitraclub.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MastercitraclubGridStore',
        idProperty: 'mastercitraclub_id',
        extraParams: {}
    },
    alias:'widget.mastercitraclubgrid',
    
    bindPrefixName:'Mastercitraclub',
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
                },{
                    xtype: 'gridcolumn',
                    width: 30,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                }
               ,{
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'clubname',
                    hideable: false,
                    text: 'Name'
                },{
                    xtype: 'gridcolumn',
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


