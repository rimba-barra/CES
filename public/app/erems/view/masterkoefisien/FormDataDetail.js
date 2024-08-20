Ext.define('Erems.view.masterkoefisien.FormDataDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterkoefisienformdatadetail',
    store: 'Masterkoefisienformdatadetail',
    bindPrefixName:'Masterkoefisienformdatadetail',
    requires: [
        'Erems.library.template.component.ScheduletypecomboboxinGrid'
    ],
    minHeight: 503,
    autoScroll: true,
    autoWidth:true,
    features: [{
        ftype: 'summary'
    }],
    tbar: [
        {
            xtype: 'button',
            iconCls: 'icon-new',
            text: 'Create',
            handler: function () {
                var me = _myAppGlobal.getController('Masterkoefisien');
                var dStore = me.getFormdatadetail().getStore();
                var grid = me.getFormdatadetail();
                var countdStore = dStore.getCount();

                var r = {
                    scheduletype_id: 5,
                    type_name: 'UM',
                    termin: countdStore+1,
                    um_inh_persen: 0,
                    npv: 0
                };

                dStore.add(r);

                // var dataDetail = me.genScheduleOnTheFly();
                // dStore.removeAll();
                // for(var i =0;i<dataDetail.length;i++){
                //     if(i == dataDetail.length-2){
                //         dStore.add(r);
                //     }
                //     else{
                //         dStore.add(dataDetail[i]);   
                //     }
                // }

                // console.log('rowEditing');
                // console.log(rowEditing);
                // rowEditing.startEditByPosition({
                //     row: 0,
                //     column: 2
                // });
                // console.log('dStore');
                // console.log(dStore);
                // grid.plugins[0].startEditByPosition({row:countdStore,column:2})
                grid.getSelectionModel().select(countdStore,true);
                // grid.getView().scrollBy(0, 999999, true);
                grid.getView().refresh();
                // grid.getEl().down('.x-grid-view').scroll('bottom', 100, true);
                // var validEdit = me.genScheduleOnTheFly();
                // var dStore = me.getFormdatadetail().getStore();
                // dStore.removeAll();
                // for(var i =0;i<validEdit.length;i++){
                //     dStore.add(validEdit[i]);
                // }
                // rowEditing.startEdit(r, 0);
                
                // grid.getSelectionModel().select(r);
                // grid.getView().focusRow(3);
            }
        },
        {
            xtype: 'button',
            iconCls: 'icon-delete',
            text: 'Delete',
            handler: function () {
                var me = _myAppGlobal.getController('Masterkoefisien');
                var grid = me.getFormdatadetail();
                var sm = grid.getSelectionModel();
                // grid.plugins[0].cancelEdit();
                var dStore = me.getFormdatadetail().getStore();
                dStore.remove(sm.getSelection());
                if (dStore.getCount() > 0) {
                    // sm.select(0);
                    sm.select(0,true);
                }
                // var dataDetail = [];
                var dataDetail = me.genScheduleOnTheFly();
                // console.log('dataDetail');
                // console.log(dataDetail);
                // dStore.each(function (record, idx) {
                //     console.log(record);
                //     dataDetail.push(record.data);
                // });
                // var dStore = me.getFormdatadetail().getStore();
                dStore.removeAll();
                for(var i =0;i<dataDetail.length;i++){
                    dStore.add(dataDetail[i]);
                }
                grid.getView().refresh();
                // console.log('validEdit');
                // console.log(validEdit);
                // for(var i =0;i<dataDetail.length;i++){
                //     dStore.add(dataDetail[i]);
                // }
            }
        }
    ],
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    alias: 'widget.masterkoefisienformdatadetailcellediting',
                    clicksToEdit: 1,
                    rowIndex: -1,
                    listeners:{
                        beforeedit: function(cellEditor, context, eOpts ){
                            // console.log(context.rowIdx);
                            rowIndex = context.rowIdx;
                            // var cell = context.view.getCell(context.record, context.column);
                            context.column.getEditor().on('focus',function(field){
                                // field.ownerCt.alignTo(cell, 'tl-tl');
                            },this,{delay : 1});
                        },
                        'afteredit': function (e, a, b) {
                            // _myAppGlobal.getController('Masterkoefisien').genScheduleOnTheFly();
                            if(e.context.column.dataIndex == "um_inh_persen"){
                                var me = _myAppGlobal.getController('Masterkoefisien');
                                var validEdit = me.genScheduleOnTheFly();
                                // console.log('validEdit');
                                // console.log(validEdit);
                                var dStore = me.getFormdatadetail().getStore();
                                dStore.removeAll();
                                for(var i =0;i<validEdit.length;i++){
                                    dStore.add(validEdit[i]);
                                }
                                var grid = me.getFormdatadetail();
                                grid.getView().refresh();
                            }
                        },
                        'validateedit': function (e, a, b) {
                            if(e.context.column.dataIndex == "um_inh_persen"){
                                var me = _myAppGlobal.getController('Masterkoefisien');
                                me.getFormdata().setLoading('Sedang memproses schedule');
                                var validEdit = me.genScheduleOnTheFly();
                                var dStore = me.getFormdatadetail().getStore();
                                
                                // console.log('validEdit');
                                // console.log(validEdit);
                                // console.log('a.value');
                                // console.log(a.value);
                                if(validEdit){
                                    // var dStore = me.getFormdatadetail().getStore();
                                    // dStore.removeAll();
                                    // for(var i =0;i<validEdit.length;i++){
                                    //     dStore.add(validEdit[i]);
                                    // }
                                    // console.log(dStore);
                                    me.getFormdata().setLoading(false);
                                    // console.log('return true');
                                    // a.record.commit();
                                    // console.log('a.record');
                                    // console.log(a.record.commit());
                                    a.record.commit();
                                    return true;
                                }
                                else{
                                    me.getFormdata().setLoading(false);
                                    Ext.Msg.alert('Info', 'Edit error, check nilai persentase');
                                    // console.log('return false');
                                    a.cancel = true;
                                    return false;
                                }
                            }
                        }
                     }
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_koefisien_id_detail',
                    dataIndex: 'koefisien_detail_id',
                    hidden:true
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    // width: 80,
                    width: 155,
                    dataIndex: 'type_name',
					hideable: false,
                    text: 'Type',
                    summaryType: function(records){
                        return '<b>Total</b>';
                    },
                    editor: {
                        xtype: 'scheduletypecomboboxinGrid',
                        itemId: 'scheduletypeingrid',
                        allowBlank: false,
                        editable:false,
                        listeners: {
                            beforequery: function(record){
                                record.query = new RegExp(record.query, 'i');
                                record.forceAll = true;
                            },
                            change: function(view,rec){
                                var store = me.getStore();
                                var scheduletype_id = 1;
                                switch(rec){
                                    case 'UM':
                                        scheduletype_id = 5;
                                        break;
                                    case 'INH':
                                        scheduletype_id = 3;
                                        break;
                                    case 'KPR':
                                        scheduletype_id = 2;
                                        break;
                                    case 'SIP':
                                        scheduletype_id = 1;
                                        break;
                                    default :
                                        break;
                                }
                                var recStore = store.getAt(rowIndex);
                                recStore.beginEdit();
                                recStore.set("scheduletype_id",scheduletype_id);
                                recStore.endEdit();
                            }
                        }
                    }
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_termin',
                    dataIndex: 'termin',
                    hideable: false,
                    width: 60,
                    summaryType: 'count',
                    text: 'Termin'
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_um_inh_persen',
                    width: 55,
                    dataIndex: 'um_inh_persen',
                    hideable: false,
                    text: '%',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank:true,
                        enableKeyEvents: true,
                        maskRe: /[0-9\.]/,
                        listeners: {
                            change: function(view,rec){
                                var store = me.getStore();
                                var recStore = store.getAt(rowIndex);
                                recStore.beginEdit();
                                recStore.set("um_inh_persen",rec);
                                recStore.endEdit();
                                // console.log(rec);
                            }
                        }
                    },
                    summaryType: function(records){
                        var totals = records.reduce(function(sums, record){
                            return [sums[0] + parseFloat(record.data.um_inh_persen)];
                        }, [0,0]);
                        return totals[0].toFixed(2);
                    }
                },
                {
                    xtype: 'numbercolumn',
                    align:'right',
                    itemId: 'colms_npv',
                    width: 100,
                    dataIndex: 'npv',
                    hideable: false,
                    text: 'NPV',
                    summaryType: function(records){
                        var totals = records.reduce(function(sums, record){
                            return [sums[0] + parseFloat(record.data.npv)];
                        }, [0,0]);
                        return totals[0].toFixed(2);
                    }
                }
                // ,
                // me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function() {},
    // inlineEditGabungan: function (val, meta, record, rowIndex, colIndex, store) {
    //     console.log('fired');
    //     // name = 'is_gabungan';
    //     // return this.comboBoxFieldGen(name, record, true);  
    // },
});