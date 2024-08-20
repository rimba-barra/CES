Ext.define('Erems.view.templatechecklist.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'TemplatechecklistGridStore',
        idProperty: 'checklist_bangunan_id',
        extraParams: {}
    },
    alias:'widget.templatechecklistgrid',
    
    bindPrefixName:'Templatechecklist',
   // itemId:'',
    newButtonLabel:'New Template',
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
                    width: 200,
                    dataIndex: 'type',
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
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


