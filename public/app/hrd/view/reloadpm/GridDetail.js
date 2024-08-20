Ext.define('Hrd.view.reloadpm.GridDetail', {
    extend          : 'Hrd.library.box.view.Grid',
    alias           : 'widget.reloadpmgriddetail',
    storeConfig     : {
        id              : 'ReloadpmGridDetailStore',
        idProperty      : 'reloadpm_id',
        extraParams     : {
            mode_read   : 'listdetail'
        }
    },
    bindPrefixName  : 'Reloadpm',
    newButtonLabel  : 'Add',
    
    initComponent   : function() {
        var me = this;

        /*var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });*/

        Ext.applyIf(me, {
            contextMenu     : me.generateContextMenu(),
            //plugins         : [cellEditing],
            defaults        : {
                xtype       : 'gridcolumn'
            },
            viewConfig      : {},
            columns         : [
            {
                    dataIndex   : 'jenisdokumen_code',
                    text        : 'Code',
                    width       : 100,
                    name        : 'code'
                }, {
                    dataIndex   : 'bobot',
                    text        : 'Bobot',
                    width       : 150
                }
                ],
                bbar: [
                '',
                {
                    xtype: 'tbfill'
                },
                '',
                {
                    xtype: 'tbfill'
                }/*,
                {
                    xtype: 'button',
                    hidden: false,
                    itemId: 'btnAddDetail',
                    margin: '0 5 0 0',
                    action: 'addDetail',
                    iconCls: 'icon-new',
                    text: 'Add New',
                }*/
            ]
        });

        me.callParent(arguments);
    }
});