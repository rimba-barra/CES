Ext.define('Hrd.view.perspectivepercentage.GridDetail', {
    extend          : 'Hrd.library.box.view.Grid',
    alias           : 'widget.perspectivepercentagegriddetail',
    storeConfig     : {
        id              : 'PerspectivepercentageGridDetailStore',
        idProperty      : 'perspective_id',
        extraParams     : {
            mode_read   : 'listdetail'
        }
    },
    bindPrefixName  : 'Perspectivepercentage',
    newButtonLabel  : 'Add',
    
    initComponent   : function() {
        var me = this;

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });

        Ext.applyIf(me, {
            contextMenu     : me.generateContextMenu(),
            plugins         : [cellEditing],
            defaults        : {
                xtype       : 'gridcolumn'
            },
            viewConfig      : {},
            selModel        : Ext.create('Ext.selection.CheckboxModel', {}),
            columns         : [{
                dataIndex   : 'code',
                text        : 'Perspective Code',
                width       : 160,
                name        : 'code',
                sortable    : true
            }, {
                dataIndex   : 'perspective',
                text        : 'Perspective Name',
                width       : 240,
                name        : 'perspective',
                sortable    : true
            }, {
                dataIndex   : 'percentage',
                text        : 'Percentage (%)',
                width       : 100,
                name        : 'percentage',
                sortable    : true
            },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },

    generateActionColumn : function() {
        var me = this;
        var ac = {
            xtype       : 'actioncolumn',
            width       : 60,
            hidden      : false,
            resizable   : false,
            align       : 'center',
            items       : [{
                defaultIcon : 'icon-search',
                action      : 'view',
                iconCls     : 'ux-actioncolumn icon-search act-view',
                altText     : 'View',
                tooltip     : 'View'
            }, {
                defaultIcon : 'icon-delete',
                action      : 'destroy',
                iconCls     : 'ux-actioncolumn icon-delete act-destroy',
                altText     : 'Delete',
                tooltip     : 'Delete'
            }]
        };

        return ac;
    }
});