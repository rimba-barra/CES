Ext.define('Erems.view.biayalegalitas.GridDetail', {
    extend  : 'Erems.library.template.view.Grid',
    alias   : 'widget.biayalegalitasgriddetail',
    store   : 'Biayalegalitasdetail',
    height  : 200,
    plugins : [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent : function () {
        var me = this;

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor : 1,
            autoCancel         : false
        });

        Ext.applyIf(me, {
            dockedItems : me.generateDockedItems(),
            viewConfig  : {
            },
            // plugins: [
                // Ext.create('Ext.grid.plugin.CellEditing', {
                //     ptype        : 'cellediting',
                //     clicksToEdit : 1,                    
                //     rowIndex     : -1,

                //     //add by anas 09022021
                //     listeners:{
                //         beforeedit: function(cellEditor, context, eOpts ){
                //             // console.log(context);
                //             rowIndex = context.rowIdx;
                //             // var cell = context.view.getCell(context.record, context.column);
                //             context.column.getEditor().on('focus',function(field){
                //                 // field.ownerCt.alignTo(cell, 'tl-tl');
                //             },this,{delay : 1});
                //         },
                //         'afteredit': function (e, a, b) {
                //             // _Apps.getController('Masterkoefisien').genScheduleOnTheFly();
                //             var mea = _Apps.getController('Biayalegalitas'); 
                //             if(e.context.column.dataIndex == "amount"){ 
                //                 //get amount & remaining balance last row                         
                //                 var validEdit = mea.getRemainingBalance();
                //                 var split = validEdit.split("|");

                //                 var remaining = split[0];
                //                 var last_row_index = split[1] - 1;
                //                 var store = me.getStore();
                //                 var recStore = store.getAt(last_row_index); 

                //                 //set amount & remaining balance at last row index
                //                 recStore.set("amount",remaining);
                //                 recStore.set("remaining_balance",remaining);

                //                 //set remaining balance according to amount at rowindex
                //                 var recStore2 = store.getAt(e.context.rowIdx);
                //                 var amount = recStore2.get("amount");
                //                 recStore2.set("remaining_balance",amount);
                //             }
                //             else
                //             {
                //                 mea.getFormdata().setLoading(false);
                //                 Ext.Msg.alert('Info', 'Edit error, wrong index');
                //                 // console.log('return false');
                //                 a.cancel = true;
                //                 return false;
                //             }
                //         },
                //         'validateedit': function (e, a, b) {

                //             var mea = _Apps.getController('Biayalegalitas'); 
                //             if(e.context.column.dataIndex == "amount"){
                                
                //                 var store = me.getStore();
                //                 var recStore = store.getAt(e.context.rowIdx);
                //                 var amount = recStore.get("amount");
                //                 var remaining_balance = recStore.get("remaining_balance");

                //                 //check amount & remaining per rowindex
                //                 if(amount != remaining_balance)
                //                 {
                //                     mea.getFormdata().setLoading(false);
                //                     Ext.Msg.alert('Info', 'Edit error, cannot change amount');
                //                     a.cancel = true;
                //                     return false;
                //                 }
                //                 else
                //                 {
                //                     return true;
                //                 }
                //             }
                //             else
                //             {
                //                 mea.getFormdata().setLoading(false);
                //                 Ext.Msg.alert('Info', 'Edit error, check amount value');
                //                 // console.log('return false');
                //                 a.cancel = true;
                //                 return false;
                //             }
                //         }
                //     }
                // })
            // ],
            columns : [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_biayalegalitas_schedule_id',
                    dataIndex : 'biayalegalitas_schedule_id',
                    hidden    : true,
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_biayalegalitas_id',
                    dataIndex : 'biayalegalitas_id',
                    hidden    : true,
                },
                {
                    xtype     : 'datecolumn',
                    type      : 'date',
                    itemId    : 'colms_due_date',
                    width     : 90,
                    format    : 'd-m-Y',
                    dataIndex : 'due_date',
                    hideable  : false,
                    text      : 'Due Date',
                    editor    : {
                        xtype      : 'datefield',
                        allowBlank : true,
                        format     : 'd/m/Y',
                    }
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_scheduletype',
                    width     : 150,
                    dataIndex : 'scheduletype',
                    hideable  : false,
                    text      : 'Type',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_termin',
                    width     : 50,
                    dataIndex : 'termin',
                    hideable  : false,
                    text      : 'Index'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_amount',
                    width     : 100,
                    dataIndex : 'amount',
                    hideable  : false,
                    text      : 'Amount',
                    //add by anas 09022021
                    editor : {
                        xtype           : 'numberfield',
                        allowBlank      : true,
                        enableKeyEvents : true,
                        maskRe          : /[0-9\.]/,
                        // listeners       : {
                        //     change: function(view,rec){
                        //         var store = me.getStore();
                        //         var recStore = store.getAt(rowIndex);
                        //         recStore.beginEdit();
                        //         recStore.set("Amount",rec);
                        //         recStore.endEdit();
                        //     }
                        // }
                    },                    
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_balance',
                    width     : 150,
                    dataIndex : 'remaining_balance',
                    hideable  : false,
                    text      : 'Remaining Balance'
                },
                me.generateActionColumn()
            ],

        });

        me.callParent(arguments);
    },

    generateDockedItems: function () {

        var me = this;

        var dockedItems = [
            /*{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    }
                ]
            },*/
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },

    generateActionColumn: function () {

        var me = this;
        var ac = {
            //            xtype: 'actioncolumn',
            //            //hidden: true,
            //            itemId: 'actioncolumn',
            //            width: 50,
            //            resizable: false,
            //            align: 'center',
            //            hideable: false,
            //            items: [
            //                
            //                {   tooltip: 'Edit',
            //					icon: document.URL+'app/main/images/icons/edit.png',
            //					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
            //						this.fireEvent( 'editaction', arguments );
            //						//console.log(arguments);
            //					}
            //                },
            //                
            //                {
            //                    tooltip: 'Delete',
            //					icon: document.URL+'app/main/images/icons/delete.png',
            //					handler: function( view, rowIndex, colIndex, item, e, record, row ) {
            //						this.fireEvent( 'deleteaction', arguments );
            //					}
            //                }
            //            ]
        };
        return ac;
    }


});