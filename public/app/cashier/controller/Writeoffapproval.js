Ext.define('Cashier.controller.Writeoffapproval', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Writeoffapproval',
    views: ['writeoffapproval.Grid','writeoffapproval.Writeoffapprovaldendagrid'],
    requires: [
        'Cashier.view.writeoffapproval.Grid',
        'Cashier.library.BrowseCashier',
        'Cashier.library.XyReportB',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    stores: [
        ],
    refs: [
        {
            ref: 'panel',
            selector: 'writeoffapprovalpanel'
        },
        {
            ref: 'formdata',
            selector: 'writeoffapprovalformdata'
        },
        {
            ref: 'grid',
            selector: 'writeoffapprovalgrid'
        },
        {
            ref: 'formsearch',
            selector: 'writeoffapprovalformsearch'
        },
        {
            ref: 'writeoffapprovaldenda',
            selector: 'writeoffapprovaldendagrid'
        },
    ],
    controllerName: 'writeoffapproval',
    fieldName: 'writeoff_no',
    bindPrefixName: 'Writeoffapproval',
    formxWinId: 'win-writeoffapprovalwinId',
    browseHandler: null,
    userrole_id: 0,
    ptId: 0,
    grid: null,
    formdatatype: 'in',
    pt_id:0,
    project_id:0,
    writeoff_id:0,
    iwField: {
        title: 'Write Off List'
    },
    localStore: {
        selectedAngsuran: null,
        detail: null,
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
            
            'writeoffapprovalformsearch [name=project_id]': {
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
            'writeoffapprovalformsearch [name=pt_id]': {
                change: function (el) {
                    var value = el.value;
                    var g = me.getGrid();
//                    me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    me.pt_id = value;


                }
            },
            'writeoffapprovalpanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    me.grid = me.getGrid();
                    var f = me.getFormsearch();
                },
            },
            'writeoffapprovalgrid  ': {
                afterrender: this.gridAfterRender,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
            },
        });
    },
    mainPanelBeforeRender: function (el) {
        var me = this;
        setupObject(el, me.execAction, me);
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        me.fdar().init();
        me.getCustomRequestCombobox('detailproject', '', '', '', 'project_project_id', 'multiproject', 'project', f, '', function () {
            if(state=='update'){
                f.down("[name=project_project_id]").setValue(parseInt(rec.get("project_id")));
            }
        });
        me.getCustomRequestCombobox('detailpt', '', '', '', 'pt_pt_id', 'pt', '', f, '', function () {
            if(state=='update'){
                f.down("[name=pt_pt_id]").setValue(parseInt(rec.get("pt_id")));
            }
        });
        if (state == 'create') {
            me.fdar().create();
            me.setActiveForm(f);
        } else if (state == 'update') {
            me.fdar().update();
            me.writeoff_id=rec.get("writeoff_id");
            me.loadModelDenda();
            me.setActiveForm(f);
        }
    },
    fdar: function () {
        var me = this;
        var state='update';
        var f = me.getFormdata();
        var fs = me.getFormsearch();
        var grid = me.getGrid();
        var rec = grid.getSelectedRecord();
        var x = {
            init: function() {
                /// init here
            },
            create: function() {

            },
            update: function() {
                var grid = me.getGrid();
                var store = grid.getStore();
                
                $("#win-writeoffapprovalwinId_header-targetEl .x-tool-maximize").click();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here
                f.down("#btnSave").setVisible(false);
            }
        };
        return x;
        
        if(state=='update'){
            f.down("[name=project_project_id]").setReadOnly(true);
            f.down("[name=note]").setReadOnly(true);
            f.down("[name=pt_pt_id]").setReadOnly(true);
            f.getForm().loadRecord(rec);
        }
        me.setActiveForm(f);
    },
    loadModelDenda: function () {
        var me = this;
        var grid = me.getWriteoffapprovaldenda();
        grid.getStore().clearFilter(true);
        grid.doInit();
        grid.getStore().load({
            params: {
                writeoff_id: me.writeoff_id
            },
            callback: function (rec, op) {
                if (op) {
                    grid.attachModel(op);
                } else {
                    console.log('error attach model');
                }
            }
        });
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
    
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }
        switch (action) {
            case me.bindPrefixName + 'Approve':
                me.Approve();
                break;
            case me.bindPrefixName + 'Reject':
                me.Reject();
                break;
        }
    },
    Reject: function(){
        var me =this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        Ext.Msg.confirm('Confirm Data', 'Are you Sure? <br>Note Reject<br><textarea rows="4" cols="50" type="text" id="noteapproval" name="noteapproval"></textarea>' , 
                 function callbackWriteofflimit(btn) {
                    if(btn == 'yes') {
                        
                        rows.forEach(function (rec) {
                            
                            me.tools.ajax({
                                params: {
                                    writeoff_id: rec.get("writeoff_id"),
                                    action: 2,
                                    note: Ext.get('noteapproval').getValue()
                                },
                                success: function (data, model) {
                                    try {
                                        me.tools.alert.info("Data Successfully Updated.");
                                        me.getGrid().getStore().reload();
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to Processing.");
                                    }
                                }
                            }).read('prosesapvrjct');
                        });
                    }
                 
             });
    },
    Approve: function(){
        var me =this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        Ext.Msg.confirm('Confirm Data', 'Are you Sure? <br>Note Approval<br><textarea rows="4" cols="50" type="text" id="noteapproval" name="noteapproval"></textarea>' , 
                 function callbackWriteofflimit(btn) {
                    if(btn == 'yes') {
                        
                        rows.forEach(function (rec) {
                            
                            me.tools.ajax({
                                params: {
                                    writeoff_id: rec.get("writeoff_id"),
                                    action: 1,
                                    note: Ext.get('noteapproval').getValue()
                                },
                                success: function (data, model) {
                                    try {
                                        me.tools.alert.info("Data Successfully Updated.");
                                        me.getGrid().getStore().reload();
                                    } catch (err) {
                                        console.log(err.message);
                                        me.tools.alert.warning("Failed to Processing.");
                                    }
                                }
                            }).read('prosesapvrjct');
                        });
                    }
                 
             });
    }
});
