Ext.define('Erems.view.masterproductcategory.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'MasterProductCategoryGridStore',
        idProperty:'productcategory_id',
        extraParams:{}
    },
    alias:'widget.masterproductcategorygrid',
    bindPrefixName:'Masterproductcategory',
   // itemId:'',
    newButtonLabel:'New Product Category',
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
                    dataIndex: 'productcategory_id',
                    text: 'ID'
                }*/,
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'productcategory',
                    hideable: false,
                    text: 'Product category'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


