Ext.define('Hrd.view.leavegiving.GridBandingEo', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.leavegivingbandingeogrid',
    storeConfig: {
        id: 'LeavegivingGridBandingEoStore',
        idProperty: 'banding_id',
        extraParams: {}
    },
    bindPrefixName: 'banding',
    newButtonLabel: 'New',
    itemId:'LeavegivingGridBandingEoID',
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