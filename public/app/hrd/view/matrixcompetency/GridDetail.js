Ext.define('Hrd.view.matrixcompetency.GridDetail', {
    extend          : 'Hrd.library.box.view.Grid',
    alias           : 'widget.matrixcompetencygriddetail',
    storeConfig     : {
        id              : 'MatrixcompetencyGridDetailStore',
        idProperty      : 'matrixcompetency_id',
        extraParams     : {
            mode_read   : 'listdetail'
        }
    },
    bindPrefixName  : 'Matrixcompetency',
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
            //     xtype       : 'rownumberer'
            // }, {
                dataIndex   : 'competency_category',
                text        : 'Competency Category',
                width       : 200,
                name        : 'competency_category',
                sortable    : true
            }, {
                dataIndex   : 'competency_name',
                text        : 'Competency Name',
                width       : 250
            }, {
                width       : 120,
                dataIndex   : 'level_category_id',
                hideable    : false,
                text        : 'Level',
                editor      : {
                    xtype       : 'combobox',
                    store       : 'Levelcategory',
                    displayField: 'level_category',
                    valueField  : 'level_category_id'
                },

                renderer    : function(val) {
                    var store = Ext.getStore('Levelcategory');
                    var index = store.findExact('level_category_id', val);
                    // console.log(store);
                    if (index > -1) {
                      var rs = store.getAt(index).data;
                      // console.log(rs);
                      return rs.level_category;
                    }
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