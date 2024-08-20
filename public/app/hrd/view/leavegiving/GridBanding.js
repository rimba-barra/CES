Ext.define('Hrd.view.leavegiving.GridBanding', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.leavegivingbandinggrid',
    storeConfig: {
        id: 'LeavegivingGridBandingStore',
        idProperty: 'banding_id',
        extraParams: {}
    },
    bindPrefixName: 'banding',
    newButtonLabel: 'New',
    itemId:'LeavegivingGridBandingID',
    layout: 'fit',
    initComponent: function() {
        var me = this;

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: me.generateDockedItems(),
            plugins     : [cellEditing],
            defaults: {
                xtype: 'gridcolumn',
                width:775
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'banding',
                   text: 'Banding',
                   width:200
                },
                {
                   dataIndex: 'leaveentitlements_rest',
                   text: 'Leave Entitlements',
                   width:200, 
                   renderer : function(value, meta) {
                      meta.style = "background-color:#ffffcc9c;";
                      return value;
                  },
                   editor: 'textfield', 
                   editable: true,
                   maskRe: /[0-9]/,
                },
                             
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
        ];
        return dockedItems;
    },
   
});