Ext.define('Erems.view.approvalpricelistopen.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.approvalpricelistopengrid',
    store          : 'Approvalpricelistopen',
    bindPrefixName : 'Approvalpricelistopen',
    newButtonLabel : 'New',
    initComponent  : function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : {},
            columns     : [
                {
                    text  : 'No.',
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'project_name',
                    text      : 'Project',
                    width     : 200
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'keterangan',
                    text      : 'Description',
                    width     : 250
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'status',
                    text      : 'Status',
                    width     : 200
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype     : 'actioncolumn',
            hidden    : true,
            itemId    : 'actioncolumn',
            width     : '50px',
            resizable : false,
            align     : 'center',
            hideable  : false,
            items     : [
                {
                    text    : 'View Detail',
                    iconCls : 'icon-search',
                    altText : 'View Detail',
                    tooltip : 'View Detail',
                }
            ]
        };
        return ac;
    },
	generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype       : 'pagingtoolbar',
                dock        : 'bottom',
                width       : 360,
                displayInfo : true,
                store       : this.getStore()
            }
        ];
        return dockedItems;
    }
});