Ext.define('Cashier.controller.MasterConsolidation', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.MasterConsolidation',
    requires: [
        'Cashier.view.masterconsolidation.DetailGrid',
        'Cashier.library.template.combobox.Consolidationcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterconsolidationpanel'
        },
        {
            ref: 'grid',
            selector: 'masterconsolidationgrid'
        },
        {
            ref: 'detailgrid',
            selector: 'masterconsolidationdetailgrid'
        },
        {
            ref: 'formdata',
            selector: 'masterconsolidationformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterconsolidationformsearch'
        },
    ],
    stores: [
        'Consolidation',
        'Pt'
    ],
    models: [
        'Pt'
    ],
    controllerName: 'masterconsolidation',
    fieldName: 'user_user_fullname',
    bindPrefixName: 'MasterConsolidation',
    formxWinId: 'win-masterconsolidationwinId',
    formWidth: 700,
    formHeight: 700,
    project_id: 0,
    pt_arr: [],
    project_arr: [],
    type_arr: [],
    percentage_arr: [],
    consolidation_id: 0,
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'masterconsolidationformsearch [name=pt_pt_id]': {
                change: function (el) {
                    var value = el.value;
                    me.ptChange(value);
                }
            },
            'masterconsolidationdetailgrid ': {
                selectionchange: function (v) {
                    me.detailgridselectionchange();
                }
            },
            'masterconsolidationformdata [name=project_project_id]': {
                select: function (v) {
                    var me = this;
                    var f = me.getFormdata();
                    f.down('[name=pt_pt_id]').setValue();
                    if (v.value) {
                        //me.loadModelCompany(v.value, 'checked');
                        me.loadModelCompanyCombo(v.value, 'checked');
                    }
                }
            },
            'masterconsolidationformdata [action=addtolist]': {
                click: function (v) {
                    me.addToList();
                }
            },
            'masterconsolidationformdata [action=addtolistconsol]': {
                click: function (v) {
                    me.addToListConsol();
                }
            },
            'masterconsolidationdetailgrid toolbar button[action=destroy]': {
                click: function () {
                    me.fieldName = 'description';
                    this.dataDestroydetailwithflag();
                }
            },
        });
    },
    fdar: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);
        var x = {
            init: function () {
                me.fdarInit();
                me.project_id = 0;
            },
            create: function () {
                me.project_id  = 0;
                me.unMask(1);
                me.getCustomRequestCombobox('user', '', 'user_user_id', 'user', '', f, '');
                me.getCustomRequestCombobox('project', '', 'project_project_id', 'project', '', f, '');

                var gridpt = me.getDetailgrid();
                gridpt.doInit();

                //me.getCustomRequestCombobox('pt', '', 'pt_pt_id', 'pt', '', f, '');
                me.loadModelCompany();
                me.loadModelConsolidation();
            },
            update: function () {
                me.getCustomRequestCombobox('user', '', 'user_user_id', 'user', '', f, 'update');
                me.getCustomRequestCombobox('project', '', 'project_project_id', 'project', '', f, 'update', function () {
                    var pr = f.down('[name=project_project_id]').getValue();
                    me.consolidation_id = f.down('[name=consolidation_id]').getValue();
                    me.project_id = pr;
                    me.loadModelCompanyUpdate();
                    me.loadModelConsolidation();
                });

            }
        };
        return x;
    },
    ptChange: function (val) {
        var me = this;
        var f = me.getFormsearch();
        f.down("[name=pt_id]").setValue(val);
    },
    addToList: function(){
        var row, me, f ;
            me = this;
            f = me.getFormdata();
        var pt_id = f.down("[name=pt_pt_id]").getValue();
        var pt_name = f.down("[name=pt_pt_id]").getRawValue();
        var project_id = f.down("[name=project_project_id]").getValue();
        var project_name = f.down("[name=project_project_id]").getRawValue();
        var percentage = f.down("[name=percentage]").getValue();
        if (f.down("[name=pt_pt_id]").valueModels[0]) {
            var code = f.down("[name=pt_pt_id]").valueModels[0].raw.code;
        }else{
            var code ="";
        }
        me.project_id = project_id;
        var error = false;

        if(project_name == '' || project_name == null){
            Ext.Msg.alert('Warning', 'Project Belum Dipilih');
            return 0;
        }
        if(pt_name == '' || pt_name == null){
            Ext.Msg.alert('Warning', 'PT Belum Dipilih');
            return 0;
        }
        if(percentage < 10 || percentage > 100){
            Ext.Msg.alert('Warning', 'Harus diantara 10-100%');
            return 0;
        }

        var gridpt = me.getDetailgrid();
        var store = gridpt.getStore();

        store.each(function (rec){
            if( parseInt(rec.get("project_id")) +"-"+ parseInt(rec.get("pt_id")) == parseInt(project_id)+"-"+parseInt(pt_id)){
                Ext.Msg.alert('Warning', project_id + " : " + project_name + " - "+ pt_name + ' Sudah ada.');
                error = true;
                return 0;
            }
        });

        if(error){
            return 0;
        }


        row = {
            code:code,
            pt_id: pt_id,
            project_id: project_id,
            pt_name: pt_name,
            project_name: project_name,
            percentage: percentage,
            type: 'PT',
            is_used: 1,
            deleted: 0
        };

        store.add(row);
        store.commitChanges();
        me.pt_arr = [];
        me.type_arr = [];
        me.percentage_arr = [];
        
        store.each(function (rec){
            me.pt_arr += rec.get("pt_id") + "~";
            me.project_arr += rec.get("project_id") + "~";
            me.type_arr += rec.get("type") + "~";
            me.percentage_arr += rec.get("percentage") + "~";
        });

    },
    addToListConsol: function(){
        var row, me, f ;
            me = this;
            f = me.getFormdata();
        var pt_id = f.down("[name=consol_consolidation_id]").getValue();
        var pt_name = f.down("[name=consol_consolidation_id]").getRawValue();
        var project_id = 0;
        var project_name = f.down("[name=consol_consolidation_id]").getRawValue();
        var error = false;
        
        if(project_name == '' || project_name == null){
            Ext.Msg.alert('Warning', 'Group Belum Dipilih');
            return 0;
        }

        var gridpt = me.getDetailgrid();
        var store = gridpt.getStore();

        store.each(function (rec){
            if(rec.get("pt_id") == pt_id){
				if(project_name == rec.get("pt_name")){
					Ext.Msg.alert('Warning', pt_name + ' Sudah ada.');
					error = true;
					return 0;
				}
            }
        });

        if(error){
            return 0;
        }


        row = {
            pt_id: pt_id,
            project_id: project_id,
            pt_name: pt_name,
            project_name: project_name,
            percentage: 100,
            type: 'CONS',
            is_used: 1,
            deleted: '0'
        };

        store.add(row);
        store.commitChanges();
       
        me.pt_arr = [];
        me.project_arr = [];
        me.type_arr = [];
        me.percentage_arr = [];
        
        store.each(function (rec){
            me.pt_arr += rec.get("pt_id") + "~";
            me.project_arr += rec.get("project_id") + "~";
            me.type_arr += rec.get("type") + "~";
            me.percentage_arr += rec.get("percentage") + "~";
        });

    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        var gd = me.getDetailgrid();

        var gc = fa.down("[name=group_consolidation]").getValue();
        if(gc == '' || gc == null){
            Ext.Msg.alert('Warning', 'Group Harus Diisi!');
            return 0;
        }

        var gc = gd.getStore().getCount();
        if(gc==0){
            Ext.Msg.alert('Warning', 'List PT Harus Diisi!');
            return 0;
        }

        var gc = fa.down("[name=pt_pt_idref]").getValue();
        if(gc == null){
            Ext.Msg.alert('Warning', 'Coa Reff Harus Diisi!');
            return 0;
        }

        me.detailgridGetdata();
        me.insSave({
            form: fa,
            grid: me.getGrid(),
            finalData: function (data) {
                data["group_consolidation"] = fa.down("[name=group_consolidation]").getValue();
                data["detailpt"] = me.pt_arr;
                data["detailproject"] = me.project_arr;
                data["type"] = me.type_arr;  // jika cons, maka pt_id = consolidation_id
                data["percentage"] = me.percentage_arr;
                data['deletedRows'] = fa.deletedRows;

                return data;
            },
            sync: true,
            callback: function (a, b, c) {
            },
            cb: function () { //ini baru jaalan callbacknya, di atas gajalan
                if (typeof call === "function") {
                    call();
                }
            }
        });

    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
        if (param == "update") {
            var rec = g.getSelectedRecord();

            setTimeout(function(){ 
                f.down("[name=pt_pt_idref]").setValue(rec.get('pt_pt_idref')) ;
            }, 3000);
            
            f.editedRow = g.getSelectedRow();
            f.getForm().loadRecord(rec);
        }
    },
    loadModelCompany: function (project, cb) {
        var me = this;

        storept = me.getStore('Pt');

        Ext.Ajax.request({
            url: 'cashier/trialbalanceb/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                storept.load({
                    params: {
                        "hideparam": 'ptbyuser',
                        "start": 0,
                        "limit": 1000000 
                    },
                    callback: function (records, operation, success) {

                    }
                });
            },
        });

        var g = me.getDetailgrid();
        g.getStore().clearFilter(true);
        g.doInit();
        g.getStore().load({
            params: {
                project_id: project ? project : me.project_id
            },
            callback: function (rec, op) {
                if (op) {
                    g.attachModel(op);
                    if (cb) {
                        //g.selModel.doSelect(g.store.data.items[0]);
                        var sm = g.getSelectionModel();
                        g.getStore().each(function (rec) {
                            var row = rec.index;
                            sm.select(row, true);
                        });
                    }
                } else {
                    console.log('error attach model ');
                }
            }
        });
    },    
    loadModelConsolidation: function (project, cb) {
        var me = this;
        storeconsol = me.getStore('Consolidation');
        Ext.Ajax.request({
            url: 'cashier/trialbalanceconsolidation/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                storeconsol.load({
                    params: {
                        "hideparam": 'consolidation',
                        "start": 0,
                        "limit": 1000000 
                    },
                    callback: function (records, operation, success) {
                        if (records[0]) {
                            
                        }

                    }
                });
            },
        });
    },    

    
    loadModelCompanyUpdate: function (project, cb) {
        var me = this;
        var g = me.getDetailgrid();
        g.getStore().clearFilter(true);
        g.doInit();
        g.getStore().load({
            params: {
                consolidation_id: me.consolidation_id,
                mode_read: 'detailptconsolidation',
                value: me.consolidation_id
            },
            callback: function (rec, op) {
                if (op) {
                    g.attachModel(op);
                    if (cb) {
                        //g.selModel.doSelect(g.store.data.items[0]);
                        var sm = g.getSelectionModel();
                        g.getStore().each(function (rec) {
                            var row = rec.index;
                            sm.select(row, true);
                        });
                    }
                } else {
                    console.log('error attach model ');
                }
            }
        });

        var f = me.getFormdata();

        storept = me.getStore('Pt');

        Ext.Ajax.request({
            url: 'cashier/trialbalanceb/read',
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);

                storept.load({
                    params: {
                        "hideparam": 'ptbyuser',
                        "start": 0,
                        "limit": 1000000 
                    },
                    callback: function (records, operation, success) {

                    }
                });
            },
        });

        //me.getCustomRequestCombobox('pt', project, 'pt_pt_idref', 'pt', '', f, '');
    },
    loadModelCompanyCombo: function (project, cb) {
        var me = this;
        var f = me.getFormdata();
        me.getCustomRequestCombobox('pt', project, 'pt_pt_id', 'pt', '', f, '');
        //me.getCustomRequestCombobox('pt', project, 'pt_pt_idref', 'pt', '', f, '');
    },
    detailgridselectionchange: function () {
        var me = this;
        var g = me.getDetailgrid();
        me.pt_arr = [];
        var mpdetail = '';
        var row = g.getSelectionModel().getSelection();
        row.forEach(function (rec) {

            me.pt_arr += rec.get("pt_id") + "~";
        });

    },
    detailgridGetdata: function () {
        var me = this;
        var gridpt = me.getDetailgrid();
        var store = gridpt.getStore();
        me.pt_arr = [];
        me.project_arr = [];
        me.type_arr = [];
        me.percentage_arr = [];
        store.each(function (rec){
            me.pt_arr += rec.get("pt_id") + "~";
            project_id = isNaN(parseInt(rec.get("project_id"))) ? 0 : rec.get("project_id");
            me.project_arr += rec.get("project_id") + "~";
            me.type_arr += rec.get("type") + "~";
            me.percentage_arr += rec.get("percentage") + "~";
        });
    },
    dataDestroydetailwithflag: function () {

        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;
        me = this;

        rows = me.getDetailgrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getDetailgrid().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + rows[0].data.pt_name + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getDetailgrid().up('window').mask('Deleting data, please wait ...');
                    };

                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", '1');
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter('deleted', '0');
                    }

                    me.pt_arr = [];
                    me.project_arr = [];
                    me.type_arr = [];
                    me.percentage_arr = [];

                    store.each(function (rec){
                        me.pt_arr += rec.get("pt_id") + "~";
                        project_id = isNaN(parseInt(rec.get("project_id"))) ? 0 : rec.get("project_id");
                        me.project_arr += rec.get("project_id") + "~";
                        me.type_arr += rec.get("type") + "~";
                        me.percentage_arr += rec.get("percentage") + "~";
                    });

                }

            });

        }
    },
    dataDestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('group_consolidation') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
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
                        failure: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        },
                        error: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Error',
                                msg: failmsg + ' Delete request error.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
});
