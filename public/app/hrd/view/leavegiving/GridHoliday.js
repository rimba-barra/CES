Ext.define('Hrd.view.leavegiving.GridHoliday', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.leavegivingholidaygrid',
    storeConfig: {
        id: 'LeavegivingGridHolidayStore',
        idProperty: 'banding_id',
        extraParams: {}
    },
    bindPrefixName: 'banding',
    newButtonLabel: 'New',
    itemId:'LeavegivingGridHolidayID',
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
                   dataIndex: 'holiday_name',
                   text: 'Holiday Name',
                   width:250
                },
                {
                  xtype   : 'booleancolumn',
                  text    : 'Cuti PH',
                  dataIndex : 'is_cuti_ph',
                  //trueText  : '&#10003;',
                  falseText : ' ',
                  resizable : false,
                  width   : 55,
                  align   : 'center',
                  renderer  : function(value, metaData, record, rowIndex, colIndex, store) {
                    metaData.tdAttr = 'style="background-color: #ffffcc9c;"';            
                    return value == 1 ? '&#10003;' : '';
                  },
                  editor      : {
                    xtype : 'checkbox',
                    name  : 'is_cuti_ph'
                  }
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