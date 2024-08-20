Ext.define('Erems.controller.Masterformula', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Masterformula',
    views: ['masterformula.Panel', 'masterformula.Grid', 'masterformula.FormSearch', 'masterformula.FormData', 'masterformula.BalloonGrid', 'masterformula.FormAddDetail'],
    stores: ['Masterformula', 'Masterformulaballoon'],
    models: ['Masterformula', 'Masterformulaballoon'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterformulagrid'
        },
        {
            ref: 'griddetail',
            selector: "masterformulaballoongrid"
        },
        {
            ref: 'formsearch',
            selector: 'masterformulaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterformulaformdata'
        },
        {
            ref: 'formdatadetail',
            selector: 'masterformulaformadddetail'
        }
        
    ],
    controllerName: 'masterformula',
    fieldName: 'code',
    bindPrefixName:'Masterformula',
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'masterformulapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterformulagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterformulagrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterformulagrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterformulagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterformulagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterformulagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterformulaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterformulaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterformulaformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterformulaformdata button[action=save]': {
                click: this.dataSave
            },
            'masterformulaformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterformulaformdata [name=is_balloon]': {
                change: function(el) {
                    this.BalloonOnSelect(el);
                }
            },
            'masterformulaformdata button[action=value_add]': {
                click: function(el, act) {
                    me.formDataShow(el, act, 'value_add');
                }
            },
            'masterformulaformadddetail': {
                afterrender: this.formDataAddValueAfterRender
            },
            'masterformulaformadddetail button[action=save]': {
                click: function(f, a) {
                    //me.formbuttonAction('addValue', f, a);
                    me.detailUpdate();
                }
            },
            'masterformulaballoongrid actioncolumn': {
                click: this.valuegridActionColumnClick
            },
            'masterformulaformdata [name=is_jeda]': {
                change: function(el) {
                    this.JedaOnSelect(el);
                }
            },
        
        });
    },
    detailUpdate: function(){
        var me=this;
        var formVal = me.getFormdatadetail().getForm().getValues();
        var store = me.getGriddetail().getStore();
        var grid = me.getGriddetail();
        var val = {
                term_angsuran: formVal.term_angsuran, 
                persen: formVal.persen, 
                periode_angsuran: formVal.periode_angsuran, 
                type_periode_angsuran: formVal.type_periode_angsuran, 
                schedule_type_balloon: formVal.schedule_type_balloon
        };
        var win = me.getFormdatadetail().up('window');
        if (win.state == 'create') {
                store.add(val);

        } else {

                var rec = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                rec.beginEdit();
                rec.set(val);
                rec.endEdit();

        }
        win.close();
    },
    BalloonOnSelect: function(el) {
        var me = this;
        var val = el.getValue();
        var fs = me.getFormdata().down("#DetailBalloonFieldSet");
        if (!val) {
            fs.hide();
        } else {
            fs.show();
        }
    },
    dataReset: function() {
        var me = this;
        me.getFormsearch().getForm().reset();

        var el = me.getFormsearch();
        el.down('#fs_pricetype_id').setValue('');
     
        me.dataSearch();
    },
    formDataAddValueAfterRender: function(el) {
        var me = this;
        var grid = me.getFormdata().down('#masterformulaballoon_grid');
        var store = grid.getStore();
        if (el.up('window').state == 'create') {
            
        } else if (el.up('window').state == 'update') {
            
//            console.log(grid.getSelectionModel().getSelection()[0]);
            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            el.loadRecord(record);
//            console.log(record);
            el.down("[name=type_periode_angsuran]").setValue(me.tools.intval(record.get('type_periode_angsuran')));
            el.down("[name=schedule_type_balloon]").setValue(me.tools.intval(record.get('schedule_type_balloon')));
            var form = el;
        }
    },
    valuegridActionColumnClick: function(view, cell, row, col, e) {
        var me = this;
        var grid = view.up('grid');
        var record = grid.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'update':
                    me.formDataShow(null, null, 'value_edit');
                    break;
                case 'destroy':
//                    me.dataValueDestroy(grid);
//                    me.dataDetailDelete(record);
//                console.log(record);
//                console.log(grid.getStore());
                    record.set("deleted", true);
        grid.getStore().filterBy(function (recod) {
            return recod.data.deleted == false;
        });
                    break;
            }
        }
    },
    dataValueDestroy: function(grid) {
        var me = this;
        var rows = grid.getSelectionModel().getSelection();
        var valueData = null;
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = grid.getStore();
            valueData = store.getAt(store.indexOf(rows[0]));
            if (rows.length == 1) {
                var selectedRecord = '[' + valueData.get('billingrulesballoon_id') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        grid.up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }
                    if (rows.length == 1) {
                        if (parseInt(valueData.get('billingrulesballoon_id')) < 1) {
                            return;
                        }
                    }
                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            grid.up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();

                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function() {
                            grid.up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    formbuttonControl: function(mode) {
        var myAction = {store: null, createProcess: null, updateProcess: null};
        var me = this;
        switch (mode) {
            case 'addValue':
                myAction.store = me.getMasterformulaballoonStore(); /// set store here
                myAction.createProcess = function() {

                };
                myAction.updateProcess = function() {

                };
                break;
        }
        return myAction;
    },
    formDataShow: function(el, act, action) {
        var me = this;
        var state = "";
        if (action === me.bindPrefixName + 'Create') {
            state = 'create';
        } else if (action === me.bindPrefixName + 'Update') {
            state = "update";
        } else {
            state = action;
        }

        var formtitle, formicon;
        var mypanel = 'FormData';
        var winId = 'win-holidayformdata';
        var newState = state;
        switch (state) {
            case 'create':
                formtitle = 'Add New Master Formula';
                formicon = 'icon-form-add';
                winId = 'win-holidayformdata';

                break;
            case 'update':
                formtitle = 'Edit Master Formula';
                formicon = 'icon-form-edit';
                winId = 'win-holidayformdata';
                break;
            case 'value_add':
                formtitle = 'Add Detail Balloon Formula';
                formicon = 'icon-form-add';
                mypanel = 'FormAddDetail';
                winId = 'win-valueformdata';
                newState = 'create';
                break;
            case 'value_edit':
                formtitle = 'Edit Detail Balloon Formula';
                formicon = 'icon-form-edit';
                mypanel = 'FormAddDetail';
                winId = 'win-valueformdata';
                newState = 'update';
                break;
        }
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 500,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Erems.view.' + me.controllerName + '.' + mypanel),
                state: newState
            });
        }
        win.show();
    },
    fdar: function() {

        var me = this;

        var x = {
            init: function() {

            },
            create: function() {
                me.BalloonOnSelect(me.getFormdata().down("[name=is_balloon]"));
                me.getGriddetail().getStore().loadData([],false);
            },
            update: function() {
                	
               var rec = me.getGrid().getSelectedRecord();
                var fs = me.getFormdata().down("#DetailBalloonFieldSet");
                if (rec.data.is_balloon === 0) {
                    fs.hide();
                } else {
                    fs.show();
                    var detailStore = me.getGriddetail().getStore();
                    detailStore.removeAll();
                    detailStore.load({params: {billingrules_id: rec.data.billingrules_id, mode_read: 'detail'}});
                }
                me.getFormdata().loadRecord(rec);
                me.getGriddetail().getStore().loadData([],false);
                
                var typeScheduleBalloon = me.getFormdata().down("[name=schedule_type_balloon]");
                var typeAngsuran = me.getFormdata().down("[name=type_periode_angsuran]");
                var typePeriode = me.getFormdata().down("[name=type_periode_uangmuka]");
                typeAngsuran.setValue(parseInt(rec.get("type_periode_angsuran")));
                typePeriode.setValue(parseInt(rec.get("type_periode_uangmuka")));
//                typeScheduleBalloon.setValue(parseInt(rec.get("schedule_type_balloon")));
              
            }
        };
        return x;
    },
    formbuttonAction: function(mode, f, a) {
        var me = this;
        var form = f.up('form').getForm();
        var fbc = this.formbuttonControl(mode); /// form button control

        var store = fbc.store;
        var msg = function() {
            f.up('window').body.mask('Saving data, please wait ...');
        };
        switch (f.up('window').state.toLowerCase()) {
            case 'create':
                store.add(form.getValues());
                fbc.createProcess();
                //  me.getFormdata().down('#edit_image_flag').setValue(1);
                f.up('window').close();
                break;
            case 'update':
                var idProperty = store.getProxy().getReader().getIdProperty();



                var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                rec.beginEdit();
                rec.set(form.getValues());
                rec.endEdit();
                if (parseInt(form.findField(idProperty).getValue()) == 0) {
                    f.up('window').close();
                    return;
                }
                store.on('beforesync', msg);
                store.sync({
                    success: function() {
                        f.up('window').body.unmask();
                        store.un('beforesync', msg);
                        fbc.updateProcess();
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully.',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function() {
                                f.up('window').close();
                            }
                        });
                    },
                    failure: function() {
                        f.up('window').body.unmask();
                        store.un('beforesync', msg);
                        fbc.updateProcess();
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: Unable to save data.',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                });
                break;
        }
    },
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function() {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }
        // end added 12 Nov 2013

        if (form.isValid() && vps) {
            
            resetTimer();
            //var store = me.getGrid().getStore();
            var store = null;

            var fida = me.getFinalData(form.getValues());
            var detailData = me.getGriddetail().getStore().data.items;
            var detailList = [];
            var persenUM = 0;
            var tTerminUM = 0;
            var vUM = false;
            var persenINH = 0;
            var tTerminINH = 0;
            var vINH = false;
            var storeDetail = me.getGriddetail().getStore();
            storeDetail.clearFilter(true);
            for(var i=0; i < storeDetail.getCount();i++){
//                fida['details'].push(detailData[items])
                storeDetail.each(function(record,idx){
                        if(i == idx){
                            detailList[i] = record.data;
                        }                        
                    }
                )
            }
            storeDetail.each(function(record,idx){
                    if(record.data.deleted === false){
                        if(record.data.schedule_type_balloon === 5){
                            persenUM += parseFloat(record.data.persen);
                            tTerminUM += record.data.term_angsuran;
                            vUM = true;
                        }
                        if(record.data.schedule_type_balloon === 3){                     
                            persenINH += parseFloat(record.data.persen);                  
                            tTerminINH += record.data.term_angsuran;
                            vINH = true;
                        }
                    }
                }
            )
            fida['details'] = detailList;
//            fida['details'] = [{id:1,name:'imam'},{id:2,name:'hanavi'}];
            
            if (me.instantCreateMode) {

                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                   
                    store = me.getGrid().getStore();
//                    console.log(store);

                } else {

                    store = me.storeProcess;

                }

            }
            console.log('total persen UM ', persenUM);
            if(vUM){
                if(persenUM !== 100){
                    Ext.Msg.show({
                            title: 'Alert',
                            msg: 'Total Persen UM '+persenUM+'%, harus 100%',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                    });
                    return false;
                }
                if(me.getFormdata().down("[name=term_uangmuka]").getValue() !== tTerminUM){
                    Ext.Msg.show({
                            title: 'Alert',
                            msg: 'Total Termin UM tidak sama',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                    });
                    return false;
                }
            }
       
            if(vINH){
                console.log('total persen INH ', persenINH);
                if(persenINH !== 100){
                    Ext.Msg.show({
                            title: 'Alert',
                            msg: 'Total Persen INH '+persenINH+'%, harus 100%',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                    });
                    return false;
                }
                if(me.getFormdata().down("[name=term_angsuran]").getValue() !== tTerminINH){
                    Ext.Msg.show({
                            title: 'Alert',
                            msg: 'Total Termin INH tidak sama',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                    });
                    return false;
                }
            }


            var msg = function() {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            switch (me.getFormdata().up('window').state.toLowerCase()) {
                case 'create':

                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
              
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }
            store.on('beforesync', msg);
            store.sync({
                success: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            me.formDataClose();
                        }
                    });
                },
                failure: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
    JedaOnSelect: function(el) {
        console.log(el)
        var me = this;
        var val = el.getValue();
        var fs = me.getFormdata();
        if (!val) {
            fs.down("[name=periode_jeda]").setReadOnly(true);
            fs.down("[name=type_periode_jeda]").setReadOnly(true);
//            fs.down("[name=type_periode_jeda]").setAllowBlank(true);
        } else {
            fs.down("[name=periode_jeda]").setReadOnly(false);
            fs.down("[name=type_periode_jeda]").setReadOnly(false);
//            fs.down("[name=type_periode_jeda]"). (false);
        }
    },




});