Ext.define('Cashier.controller.Writeoffuserrole', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Writeoffuserrole',
    views: ['writeoffuserrole.Grid'],
    requires: [
        'Cashier.view.writeoffuserrole.Grid',
        'Cashier.library.XyReportB',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    stores: [
        'Usermodulecashier',
        ],
    refs: [
        {
            ref: 'panel',
            selector: 'writeoffuserrolepanel'
        },
        {
            ref: 'grid',
            selector: 'writeoffuserrolegrid'
        },
        {
            ref: 'formsearch',
            selector: 'writeoffuserroleformsearch'
        },
        {
            ref: 'formdata',
            selector: 'writeoffuserroleformdata'
        },
    ],
    controllerName: 'writeoffuserrole',
    fieldName: 'Userrole',
    bindPrefixName: 'Writeoffuserrole',
    formxWinId: 'win-writeoffuserrolewinId',
    userrole_id: 0,
    ptId: 0,
    grid: null,
    formdatatype: 'in',
    pt_id:0,
    project_id:0,
    iwField: {
        title: 'Write Off User Role List'
    },
    xyReport: null,
    reportFileName: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            
            'writeoffuserroleformsearch [name=project_id]': {
                change: function (v) {
                    var f = me.getFormsearch();
                    if (v.value) {
                        me.project_id = v.value;
                        var pt = f.down("[name=pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        if(v.value==apps.project){
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                        }else{
                            f.down("[name=pt_id]").setValue('');
                        }
                    }
                }
            },
            'writeoffuserroleformsearch [name=pt_id]': {
                change: function (el) {
                    var value = el.value;
                    var g = me.getGrid();
//                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    me.pt_id = value;


                }
            },
            'writeoffuserroleformdata [name=project_project_id]': {
                change: function (v) {
                    var f = me.getFormdata();
                    if (v.value) {
                        var pt = f.down("[name=pt_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filter('project_project_id', v.value, true, false);
                        if(v.value==apps.project){
                            f.down("[name=pt_pt_id]").setValue(parseInt(apps.pt));
                        }else{
                            f.down("[name=pt_pt_id]").setValue('');
                        }
                    }
                }
            },
            'writeoffuserroleformdata [name=pt_pt_id]': {
                change: function (el) {
                    var value = el.value;
                    var g = me.getGrid();


                }
            },
            'writeoffuserrolepanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    me.grid = me.getGrid();
                    var f = me.getFormsearch();
                },
            },
            'writeoffuserrolegrid  ': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.formdetail,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
            },
            'writeoffuserrolegrid toolbar button[action=create]': {
                click: function (el) {
                    var me = this;
//                    me.instantWindow('FormData', 800, 'Write Off User Role', 'create', 'win-formwriteoffuserrolex');
                }
            },
            'writeoffuserroleformdata': {
                afterrender: function (v) {
                    var state = v.up('window').state;
                    me.fdarbook(me,state);
                }
            },
            'writeoffuserroleformdata button[action=saves]': {
                click: function (v) {
                    me.dataSaveBook();
                }
            },
            'writeoffuserrolegrid': {
                itemdblclick: function () {
                    me.fdarbook(me, 'update');
                },
            },
            'writeoffuserrolegrid toolbar [action=update]': {
                click: function () {
                    me.fdarbook(me, 'update');
                },
            },
            'writeoffuserrolegrid toolbar [action=deletes]': {
                click: function () {
                    me.destroyout();
                },
            },
        });
    },
    mainPanelBeforeRender: function (el) {
        var me = this;
        setupObject(el, me.execAction, me);
    },
    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();


        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data, model) {

                try {
                    me.tools.weseav2(data.project, f.down("[name=project_id]")).comboBox('', function () {
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                    });
                    me.tools.weseav2(data.pt, f.down("[name=pt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=pt_id]').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt),0,false,true,true);
                        if (record) {
                            combostore.filter('project_project_id', apps.project, true, false);
                            f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                            var grid = me.getGrid();
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.loadPage(1);
                        }
                    });

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
    },
    gridSelectionDetail: function () {
        var me = this;
        var f = me.getFormdetail();
        var grid = me.getDetailgrid();
        var row = grid.getSelectionModel().getSelection();
        var deleted = f.down('#btnDelete');
        var updated = f.down('#btnUpdate');
        if (deleted !== null) {
            deleted.setDisabled(row.length < 1);
        }
    },
    fdarbook: function (me,state) {
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        
        if(state=='update'){
            f.down("[name=role_id]").setReadOnly(true);
            f.down("[name=project_project_id]").setReadOnly(true);
            f.down("[name=pt_pt_id]").setReadOnly(true);
            f.getForm().loadRecord(rec);
        }
        me.getCustomRequestCombobox('detailproject', '', '', '', 'project_project_id', 'multiproject', 'project', f, '', function () {
            
            if(state=='create'){
                f.down("[name=project_project_id]").setValue(parseInt(fs.down("[name=project_id]").getValue()));
            }else{
                f.down("[name=project_project_id]").setValue(parseInt(rec.get("project_project_id")));
            }
        });
        me.getCustomRequestCombobox('detailpt', '', '', '', 'pt_pt_id', 'pt', '', f, '', function () {
            if(state=='create'){
                f.down("[name=pt_pt_id]").setValue(parseInt(fs.down("[name=pt_id]").getValue()));
            }else{
                f.down("[name=pt_pt_id]").setValue(parseInt(rec.get("pt_pt_id")));
            }
        });
        me.getCustomRequestCombobox('role', '', '', '', 'role_id', 'role', '', f, '', function () {
            if(state=='update'){
                f.down("[name=role_id]").setValue(parseInt(rec.get("role_id")));
            }
        });
        me.getCustomRequestCombobox('user', '', '', '', 'user_id', 'user', '', f, '', function () {
            if(state=='update'){
                f.down("[name=user_id]").setValue(parseInt(rec.get("user_id")));
            }
        });
        me.setActiveForm(f);
    },
    dataSaveBook: function (call) {
        var me = this;
        var f = me.getFormdata();
        if (f.getForm().isValid()) {
            Ext.MessageBox.confirm(
                        'Confirm', 'Are you sure?', callbackWriteoffuserrole);
                     function callbackWriteoffuserrole(btn) {
                        if(btn == 'yes') {
                                Ext.Ajax.request({
                                    url: 'cashier/writeoffuserrole/read',
                                    method: 'POST',	
                                    async: false ,
                                    params: {
                                        userrole_id: f.down("[name=userrole_id]").getValue(),
                                        role_id: f.down("[name=role_id]").getValue(),
                                        user_id: f.down("[name=user_id]").getValue(),
                                        project_id: f.down("[name=project_project_id]").getValue(),
                                        pt_id: f.down("[name=pt_pt_id]").getValue(),
                                        mode_read:'proseswriteoffuserrole'
                                    },
                                    success: function (response) {
                                        var data = Ext.JSON.decode(response.responseText);
                                        console.log(data);
                                        if(data.data['success']!='1'){
                                            f.up('window').close();
                                            Ext.Msg.alert('Warning', data.data['msg']).setBodyStyle('z-index: 999999;');
//                                            me.tools.alert.warning(data.data['msg']);
                                        }else{
                                            me.tools.alert.info("Data Successfully Updated.");
                                            f.up('window').close();
                                            me.getGrid().getStore().reload();
                                        }
                                    }
                                });
                        }
                     };
        }
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var grid;
        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();

        grid = me.getGrid();
        grid.doInit();
        var store = grid.getStore();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    destroyout: function () {
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
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('userfullname') + ' as ' + store.getAt(store.indexOf(rows[0])).get('rolename') + ']';
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
                            var successmsg = (rows.length == 1 ? selectedRecord : 'Records') + ' deleted successfully.';
                          // var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
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
    getCustomRequestCombobox: function (paramname, val, val2, val3, field, model, submodel, form, param, callback, loading, displayall) {
        var me = this;
        var f = form;
        f.setLoading('Please wait, load option box.');
        var d = null;
        var sm = [];
        if (submodel) {
            sm = Ext.encode(submodel);
        }
        me.tools.ajax({
            params: {
                module: me.controllerName,
                paramname: paramname,
                value: val,
                value2: val2,
                value3: val3,
                model: model,
                submodel: sm
            },
            form: form,
            success: function (data, model, v) {
                try {
                    var obj = [];
                    for (var key in data) {
                        obj = data[key];
                    }
                    if (field) {
                        me.tools.wesea(obj, form.down("[name=" + field + "]")).comboBox(displayall, function () {
                            if (typeof callback === "function") {
                                callback();
                            }
                        });
                    } else {
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                    if (param) {
                        me.afterDataDetailInit(param, f);
                    }


                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to load ini, please try re-open menu.");
                    f.setLoading(false);
                }
                if (!loading) {
                    f.setLoading(false);
                }

            }
        }).read('customrequest');
    },
});
