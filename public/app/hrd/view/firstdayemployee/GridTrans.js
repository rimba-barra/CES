Ext.define('Hrd.view.firstdayemployee.GridTrans', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.firstdayemployeetransgrid',
    storeConfig: {
        id: 'FirstdayemployeeGridTransStore',
        idProperty: 'firstdayform_answer_id',
        extraParams: {}
    },
    bindPrefixName: 'Firstdayemployee',
    newButtonLabel: 'New',
    itemId:'FirstdayemployeeGridtransID',
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
                width:75
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
                    dataIndex: 'question',
                    text: 'Question',
                    
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Answer',
                    dataIndex   : 'answer',
                    //trueText  : '&#10003;',
                    falseText   : ' ',
                    resizable   : false,
                    width       : 55,
                    align       : 'center',
                    renderer    : function(value, metaData, record, rowIndex, colIndex, store) {
                        metaData.tdAttr = 'style="background-color: #FFC;"';                        
                        return value == 1 ? '&#10003;' : '';
                    },
                    editor      : {
                        xtype   : 'checkbox',
                        name    : 'answer'
                    }
                },
                
               
              // me.generateActionColumn()
                
            ]
        });

        me.callParent(arguments);
    },
    // generateActionColumn: function () {
    //     var me = this;
    //     var ac = {
    //         xtype: 'actioncolumn',
    //         width: 50,
    //         hidden: false,
    //         resizable: false,
    //         align: 'center',
    //         items: [
    //             {
    //                 defaultIcon: 'icon-delete',
    //                 action: 'destroy',
    //                 iconCls: 'ux-actioncolumn icon-delete act-destroy',
    //                 altText: 'Delete',
    //                 tooltip: 'Delete'
    //             }
    //         ]
    //     };

    //     return ac;
    // },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         {
            //             xtype: 'button',
            //             action: 'attenddate',
            //             iconCls: 'icon-new',
            //             text: 'Attend'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'notattenddate',
            //             iconCls: 'icon-delete',
            //             text: 'Not Attend'
            //         }
            //     ]
            // },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
   
});
