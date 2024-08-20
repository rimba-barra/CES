Ext.define('Hrd.view.shifttype.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.shifttypegrid',
    storeConfig: {
        id: 'ShifttypeGridStore',
        idProperty: 'shifttype_id',
        extraParams: {}
    },
    bindPrefixName: 'Shifttype',
    newButtonLabel: 'New Shift Type',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
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
                    text: 'Code'
                },
                {
                    dataIndex: 'shifttype',
                    text: 'Shift Type Name'
                },
                {
                    dataIndex: 'in_time',
                    text: 'Time in'
                },
                {
                    dataIndex: 'out_time',
                    text: 'Time out'
                },
                {
                    dataIndex: 'different_day',
                    text: 'Different Day',
                    xtype: 'booleancolumn',
                    trueText: 'Yes',
                    falseText: 'No'
                },
                {
                    dataIndex: 'holyday',
                    xtype: 'booleancolumn',
                    trueText: 'Yes',
                    falseText: 'No',
                    width : 60,
                    text: 'Holiday'
                }
                ,

                //added by mike 28/04/2022
                {
                    xtype       : 'booleancolumn',
                    text        : 'Is MoD',
                    dataIndex   : 'is_mod',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 50,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Absen Teams',
                    dataIndex   : 'is_teams',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 80,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Show for Shift Change',
                    dataIndex   : 'is_ess',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 120,
                    resizable   : false,
                    align       : 'center'
                },
                //end added by mike 28/04/2022
                //added by mike 2022-08-24
                {
                    xtype       : 'booleancolumn',
                    text        : 'Auto Change Parameter Shift',
                    dataIndex   : 'is_auto',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 160,
                    resizable   : false,
                    align       : 'center'
                },
                //end added by mike 2022-08-24

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});