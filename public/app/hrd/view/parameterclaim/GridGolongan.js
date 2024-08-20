Ext.define('Hrd.view.parameterclaim.GridGolongan', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.parameterclaimgridgolongan',
    storeConfig: {
        id: 'ParameterclaimGridGolonganStore',
        idProperty: 'group_id',
        extraParams: {}
    },
    bindPrefixName: 'group',
    newButtonLabel: 'New',
    itemId:'ParameterclaimGridGolonganID',
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
                   dataIndex: 'code',
                   text: 'Group',
                   width:100
                },
                {
                   dataIndex: 'min_age',
                   text: 'Min Umur',
                   width:100, 
                   renderer : function(value, meta) {
                      meta.style = "background-color:#ffffcc9c;";
                      return value;
                  },
                   editor: 'textfield', 
                   editable: true,
                   maskRe: /[0-9]/,
                },
                {
                   dataIndex: 'frequently_inmonth',
                   text: 'Frequently (dalam bulan)',
                   width:135, 
                   renderer : function(value, meta) {
                      meta.style = "background-color:#ffffcc9c;";
                      return value;
                  },
                   editor: 'textfield', 
                   editable: true,
                   maskRe: /[0-9]/,
                },
                {
                   dataIndex: 'min_age_special',
                   text: 'Min Umur (Special Case)',
                   width:150, 
                   renderer : function(value, meta) {
                      meta.style = "background-color:#ffffcc9c;";
                      return value;
                  },
                   editor: 'textfield', 
                   editable: true,
                   maskRe: /[0-9]/,
                },
                {
                   dataIndex: 'frequently_inmonth_special',
                   text: 'Frequently (dalam bulan) (Special Case)',
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