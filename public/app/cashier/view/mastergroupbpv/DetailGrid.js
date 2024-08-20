Ext.define('Cashier.view.mastergroupbpv.DetailGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.mastergroupbpvdetailgrid',
    bindPrefixName: 'Mastergroupbpv',
    height: 200,
    storeConfig: {
        id: 'MastergroupbpvDetailGridStore',
        idProperty: 'multiprojectdetail_id',
        extraParams: {mode_read: 'detailpt'},
    },
    // itemId:'',
    newButtonLabel: 'Detail Company',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
               
                //checkOnly : true // for prevent clicked grid row and canceled all check box checked status
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                
//                {
//                    xtype: 'booleancolumn',
//                    header: 'Active',
//                    dataIndex: 'is_used',
//                    align: 'center',
//                    width: 50,
//                    trueText: '<input type="checkbox" checked="true">',
//                    falseText: '<input type="checkbox" checked="false">',
//                    editor: {
//                        xtype: 'checkbox',
//                    },
//                    listeners: {
//                        checkchange: function (column, rowIdx, checked, eOpts) {
//                            console.log(checked);
//                            console.log(checked);
//                            console.log(checked);
//                            console.log(checked);
//                        }
//                    }
//                },
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'Company Name'
                },
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                }

            ]
        };
        return ac;
    },
});


