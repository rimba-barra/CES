Ext.define('Hrd.view.perspectivepercentage.GridDetail', {
    extend          : 'Hrd.library.box.view.Grid',
    alias           : 'widget.perspectivepercentagegriddetail',
    storeConfig     : {
        id              : 'PerspectivepercentageGridDetailStore',
       // idProperty      : 'perspective_percentage_id',
       idProperty : 'perspective_percentage_detail_id',
        extraParams     : {
            mode_read   : 'perspectivelist'
           // mode_read : 'updatedetail'
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
                dataIndex   : 'perspective_code',
                text        : 'Perspective Code',
                width       : 100,
                name        : 'perspective_code',
                sortable    : true
            }, {
                dataIndex   : 'perspective_perspective',
                text        : 'Perspective Name',
                width       : 250,
                name        : 'perspective_perspective',
                sortable    : true
            }, {
                width       : 120,
                dataIndex   : 'percentage',
                hideable    : false,
                text        : 'Percentage (%)',
                editor      : {
                    xtype           : 'numberfield',
                    name            : 'percentage',
                    value           : 0,
                    minValue        : 0,
                    maxValue        : 100,
                    stepValue       : 5
                },

                renderer    : function(val) {
                    
                    return val;
                }
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
            //     defaultIcon : 'icon-search',
            //     action      : 'view',
            //     iconCls     : 'ux-actioncolumn icon-search act-view',
            //     altText     : 'View',
            //     tooltip     : 'View'
            // }, {
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