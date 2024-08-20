Ext.define('Hrd.view.leavegiving.GridBandingPhSpecial', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.leavegivingbandingphspecialgrid',
    storeConfig: {
        id: 'LeavegivingGridBandingPhSpecialStore',
        idProperty: 'banding_id',
        extraParams: {}
    },
    bindPrefixName: 'banding',
    newButtonLabel: 'New',
    itemId:'LeavegivingGridBandingPhSpecialID',
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
                   width:100
                },
                {
                   dataIndex: 'holiday_name',
                   text: 'Holiday Name',
                   width:150
                },
                {
                   dataIndex: 'leaveentitlements_rest',
                   text: 'Leave Entitlements',
                   width:150, 
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