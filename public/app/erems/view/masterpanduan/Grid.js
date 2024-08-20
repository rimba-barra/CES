Ext.define('Erems.view.masterpanduan.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterpanduanGridStore',
        idProperty: 'masterpanduan_id',
        extraParams: {}
    },
    alias:'widget.masterpanduangrid',
    
    bindPrefixName:'Masterpanduan',
   // itemId:'',
    newButtonLabel:'New Panduan',
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
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'menu',
                    text: 'Menu'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Description'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'center',
            hideable: false,
            items: [
                {
                    tooltip: 'Download',
                    icon: document.URL+'app/main/images/icons/download.png',
                    handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                            this.fireEvent( 'downloadaction', arguments );
                    }
                }
            ]
        };
        return ac;
    }
});