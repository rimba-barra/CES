Ext.define('Cashier.controller.Mastercoa', {
    extend: 'Cashier.library.template.controller.Controller2',
     requires: ['Cashier.library.tools.Mytools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Subaccountgroupcombobox',
        'Cashier.library.template.combobox.Projectptcombobox',
        'Cashier.library.template.combobox.Cashflowtypecomboboxv2',
        'Cashier.library.template.combobox.Departmentcombobox',
    ],
    alias: 'controller.Mastercoa',
    stores: ['Subaccountgroupfs','Projectpt', 'Cashflowtype', 'Department'],
    models: ['Subaccountgroup','Projectpt', 'Cashflowtype', 'Department'],
    refs: [
        {
            ref: 'panel',
            selector: 'mastercoapanel'
        },
        {
            ref: 'grid',
            selector: 'mastercoagrid'
        },
        {
            ref: 'detailgrid',
            selector: 'mastercoadetailgrid'
        },
        {
            ref: 'formdata',
            selector: 'mastercoaformdata'
        },
        {
            ref: 'formdata2',
            selector: 'mastercoaformdata2'
        },
        {
            ref: 'formsearch',
            selector: 'mastercoaformsearch'
        },
        {
            ref: 'formdatacopy',
            selector: 'mastercoaformdatacopy'
        },
    ],
    controllerName: 'mastercoa',
    fieldName: 'coa',
    bindPrefixName: 'Mastercoa',
    formxWinId: 'win-mastercoawinId',
    project_id: 0,
    pt_arr: [],
    pt_id: 0,
    is_edit_coa : 0,
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
            'mastercoaformsearch': {
                afterrender: me.formSearchAfterRender
            },
            'mastercoaformsearch [name=projectpt_id]': {
                change: function() {
                    var me = this;
                    var fs = me.getFormsearch();
                    if (fs.down("[name=projectpt_id]").valueModels != null) {
                        me.project_id = fs.down("[name=projectpt_id]").valueModels[0].data.project_id;
                        me.pt_id = fs.down("[name=projectpt_id]").valueModels[0].data.pt_id;
                    }
                }
            },
            'mastercoaformsearch [action=search]': {
                click: me.dataSearch
            },
            'mastercoadetailgrid ': {
                selectionchange: function (v) {
                    me.detailgridselectionchange();
                }
            },
            'mastercoagrid toolbar [action=destroy]': {
                click: function () {
                    this.dataDestroy();
                }
            },
            'mastercoagrid toolbar [action=copy]': {
                click: function () {
                    this.copyCoa();
                }
            },
            'mastercoagrid toolbar [action=validate]': {
                click: function () {
                    this.validateCoa(me.project_id, me.pt_id);
                }
            },
            'mastercoagrid toolbar [action=updatecoa]': {
                click: function () {
                    this.formDataShow2('', '', 'update', 'FormData2');
                }
            },
            'mastercoaformdata [name=project_project_id]': {
                change: function (v) {

                    var f = me.getFormdata();
                    if (v.value) {
                        var pt = f.down("[name=pt_pt_id]").getStore();
                        pt.clearFilter();
                        pt.filterBy(function (rec, id) {
                            if (rec.get('project_project_id') == v.value) {
                                return true;
                            } else {
                                return false;
                            }
                        })
                        if(v.value==apps.project){
                            f.down("[name=pt_pt_id]").setValue(parseInt(apps.pt));
                        }else{
                            f.down("[name=pt_pt_id]").setValue('');
                        }
                    }
                }
            },
            'mastercoaformdata [name=pt_pt_id] ': {
                change: function (el) {
                    var f = me.getFormdata();
                    var pt = f.down("[name=pt_pt_id]").getValue();
                    var project = f.down("[name=project_project_id]").getValue();
                    if (f.editedRow) {
                        console.log(f.editedRow);
                    }
                    var g = me.getGrid();
                    var rec = g.getSelectedRecord();

                    
                    
                    var state = el.up('window').state;
                    if (state == 'create') {
                        me.getaccgroup();

                        me.getCustomRequestComboboxv2('getparentcoa', pt, project, '', 'parent_id', 'coa', '', f, '', function () {
                        
                        }); 
                    }                    
                }
            },
            'mastercoaformdata [name=parent_id] ': {
                 select: function (field, newValue, oldValue, desc) {
                    var val = field.getValue();
                    me.getCoaNamebyid(val);
                }
            },
            'mastercoaformdata': {
                boxready: function () {
                    var me = this;
                     me.is_edit_coa = 0;
                    $("#mastercoaid").keyup(function (e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.mainDataSave()
                            return false;
                        }
                    });
                    $("#mastercoaid input[name='coa']").keyup(function ()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/, '$1' + '.' + '$2')
                    });
                }
            },
            'mastercoaformdata2': {
                afterrender: this.formDataAfterRender2,
                boxready: function () {
                    var me = this;
                     me.is_edit_coa = 1;
                    $("#mastercoaid2").keyup(function (e) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.mainDataSave2()
                            return false;
                        }
                    });
                    $("#mastercoaid2 input[name='coa']").keyup(function ()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/, '$1' + '.' + '$2')
                    });
                }
            },
            'mastercoaformdata2 [name=pt_pt_id] ': {
                change: function (el) {
                    var f = me.getFormdata2();
                    if (f.editedRow) {
                        console.log(f.editedRow);
                    }
                    var g = me.getGrid();
                    var rec = g.getSelectedRecord();

                    var ptid = f.down("[name=pt_pt_id]").getValue();
                    var projectid = f.down("[name=project_project_id]").getValue();

                    if(ptid != null){
                            ptid = f.down("[name=pt_pt_id]").getValue();
                        }else{
                            ptid = rec.get("pt_pt_id");
                        }

                    if(projectid != null){
                        projectid = f.down("[name=project_project_id]").getValue();
                    }else{
                        projectid = rec.get("project_project_id");
                    }

                    console.log("projectid");
                    console.log(projectid);
                    
                    storesubcode = me.getStore('Subaccountgroupfs');
                    storesubcode.load({
                    params: {
                        "hideparam": 'change_project_pt',
                        "pt_id": ptid,
                        "project_id" : projectid,
                    },
                    sync: false,
                    callback: function (recordscode, operationcode, successcode) {
                        if (successcode) {
                            if (recordscode[0]) {
                                var firstdatacode = recordscode[0]['data'];

                                me.getFormdata2().down('[name=kelsub_kelsub_id]').setValue(firstdatacode.kelsub_id);
                            
                                //me.setValue(me, 'kelsub_kelsub_id', firstdatacode.kelsub_id);
                            
                            }
                        }
                        }
                    });
                }
            },
            'mastercoaformdata2 [action=save]': {
                click: function() {
                    var me = this;
                    me.mainDataSave2();
                    /*var fa = me.getFormdata2();

                    me.insSave({
                        form: fa,
                        grid: me.getGrid(),
                        finalData: function (data) {
                            // data['deletedRows'] = fa.deletedRows;
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
                    */
                }
            },
            'mastercoaformdatacopy': {
                afterrender: function() {
                    this.formdatacopyafterrender();
                }
            },
            'mastercoaformdatacopy [name=project_id]': {
                select: function() {

                    var me = this;
                    var f = me.getFormdatacopy();

                    f.down("[name=pt_id]").getStore().clearFilter();

                    var selected_project = f.down("[name=project_id]").getValue();

                    me.getCustomRequestComboboxv2('detailpt', '', '', '', 'pt_id', 'pt', 'project', f, '', function () {
                        f.down("[name=pt_id]").getStore().filterBy(function(rec) {
                            if (rec.get('project_project_id') == selected_project) {
                                return true;
                            }
                        });

                        f.down("[name=pt_id]").setValue('');
                    });                   
                }
            },
            'mastercoaformdatacopy [name=copy_project_id]': {
                select: function() {

                    var me = this;
                    var f = me.getFormdatacopy();

                    f.down("[name=copy_pt_id]").getStore().clearFilter();

                    var selected_project = f.down("[name=copy_project_id]").getValue();

                    me.getCustomRequestComboboxv2('detailptV2', selected_project, '', '', 'copy_pt_id', 'pt', 'project', f, '', function () {
                        /*f.down("[name=copy_pt_id]").getStore().filterBy(function(rec) {
                            if (rec.get('project_project_id') == selected_project) {
                                return true;
                            }
                        });*/

                        f.down("[name=copy_pt_id]").setValue('');
                    });
                }
            },
            'mastercoaformdatacopy [action=save]': {
                click: function() {
                    this.processCopyCoa();
                }
            },
            'mastercoaformdata [name=is_create_setupcashflow]': {
                change: function(el) {
                    var me = this;
                    var fd = me.getFormdata();

                    console.log(el.checked);
                    
                    if (el.checked == true) {
                        fd.down("[name=setupcashflow_container]").setVisible(true);
                    } else {
                        fd.down("[name=setupcashflow_container]").setVisible(false);
                        fd.down("[name=cashflowtype_id]").setValue('');
                        fd.down("[name=department_id]").setValue('');
                    }
                    
                }
            },
            'mastercoaformdata2 [name=is_create_setupcashflow]': {
                change: function(el) {
                    var me = this;
                    var fd = me.getFormdata();

                    console.log(el.checked);
                    
                    if (el.checked == true) {
                        fd.down("[name=setupcashflow_container]").setVisible(true);
                    } else {
                        fd.down("[name=setupcashflow_container]").setVisible(false);
                        fd.down("[name=cashflowtype_id]").setValue('');
                        fd.down("[name=department_id]").setValue('');
                    }
                    
                }
            },
        });
    },
    dataSearch: function() {
        var me = this;

        var projectpt_valuemodels = me.getFormsearch().down("[name=projectpt_id]").valueModels[0];
        var project_id = apps.project;
        var pt_id = apps.pt;

        if (projectpt_valuemodels !== undefined) {
            project_id = projectpt_valuemodels.data.project_id;
            pt_id = projectpt_valuemodels.data.pt_id;
        }
        
        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.getProxy().setExtraParam('project_id', project_id);
        store.getProxy().setExtraParam('pt_id', pt_id);
        me.loadPage(store);
    },
    formDataShow2: function (el, act, action, formdata) {
        var me = this;
        var formtitle, formicon;

        //  var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;
        /*switch (state) {
         case 'create':
         formtitle = 'Add New';
         formicon = 'icon-form-add';
         break;
         case 'update':
         formtitle = 'Edit';
         formicon = 'icon-form-edit';
         break;
         }*/


        var winId = me.formxWinId;
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: true,
                width: me.formWidth,
                // height:Ext.getBody().getViewSize().height * 0.9,
                //height:200,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                //items: Ext.create('Cashier.view.' + me.controllerName + '.FormData'),
                state: state,
                listeners: {
                    boxready: function () {
                        // win.setHeight(200);

                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.' + formdata));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();

    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        var edit = grid.down('#btnEdit');
        var editCoa = grid.down('#btnEditCoa');
        var deleteb = grid.down('#btnDelete');

        if (row.length <= 0) {
            editCoa.setDisabled(true);
            edit.setDisabled(true);
            deleteb.setDisabled(true);
        } else {
            if (editCoa !== null && row[0].data.level >= 4) {
                editCoa.setDisabled(row.length != 1);
            } else {
                editCoa.setDisabled(true)
            }
            if (edit !== null) {
                edit.setDisabled(row.length != 1);
            }
            if (deleteb !== null) {
                deleteb.setDisabled(row.length < 1);
            }
        }
    },
    formSearchAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
        me.getCustomRequestComboboxModuleV2('global', 'detailprojectptforcoa', '', 'projectpt_id', 'projectpt', '', f, '', function() {
            f.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
        })
    },
    formDataAfterRender: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var state = el.up('window').state;

        ptid = me.getFormdata().down("[name=pt_pt_id]").getValue();
        projectid = me.getFormdata().down("[name=project_project_id]").getValue();

        
        if(ptid != null){
            ptid = me.getFormdata().down("[name=pt_pt_id]").getValue();
        }else{
            ptid = apps.pt;
        }

        if(projectid != null){
            projectid = me.getFormdata().down("[name=project_project_id]").getValue();
        }else{
            projectid = apps.project;
        }       


        me.fdar().init();

        f.down('[name=department_id]').getStore().load();
        f.down('[name=cashflowtype_id]').getStore().load();
        if (state == 'create') {
//            me.project_id = apps.project;
            me.fdar().create();
            me.setActiveForm(f);
            var pt = f.down("[name=pt_pt_id]").getStore();
           // me.getaccgroup();
            // pt.clearFilter();
            pt.filter('project_project_id', parseInt(apps.project), true, false);
            
            me.loadProjectPt('project_project_id', 'pt_pt_id');          

        } else if (state == 'update') {
            me.setActiveForm(f);
            f.editedRow = g.getSelectedRow();
            me.getaccgroup2();
            f.down('[name=coa]').setReadOnly(true);
            f.down('[name=project_project_id]').setReadOnly(true);
            f.down('[name=pt_pt_id]').setReadOnly(true);

            me.getCustomRequestComboboxv2('detailproject', '', '', '', 'project_project_id', 'pt', 'project', f, '', function () {

            });
            me.getCustomRequestComboboxv2('detailpt', '', '', '', 'pt_pt_id', 'pt', 'project', f, '', function () {
                f.loadRecord(rec);
            });  
            me.getCustomRequestComboboxv2('getparentcoa', rec.get("pt_pt_id"), rec.get('project_project_id'), '', 'parent_id', 'coa', '', f, '', function () {
                f.loadRecord(rec);
            });

            f.down('[name=is_create_setupcashflow]').setReadOnly(true);
            f.down('[name=department_id]').setReadOnly(true);
            f.down('[name=cashflowtype_id]').setReadOnly(true);
        } 


    },
    formDataAfterRender2: function(el) {

        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var state = el.up('window').state;
        var f2 = me.getFormdata2();

        me.setActiveForm(f2);
        f2.editedRow = g.getSelectedRow();
        // me.getaccgroup();
        f2.down('[name=coa]').setReadOnly(true);
        f2.down('[name=project_project_id]').setReadOnly(true);
        f2.down('[name=pt_pt_id]').setReadOnly(true);
        f2.down('[name=parent_id]').setReadOnly(true);

        me.getCustomRequestComboboxv2('detailproject', '', '', '', 'project_project_id', 'pt', 'project', f2, '', function () {

        });
        me.getCustomRequestComboboxv2('detailpt', '', '', '', 'pt_pt_id', 'pt', 'project', f2, '', function () {
            f2.loadRecord(rec);
        });  
        me.getCustomRequestComboboxv2('getparentcoa', rec.get("pt_pt_id"), rec.get("project_project_id"), '', 'parent_id', 'coa', '', f2, '', function () {
            f2.loadRecord(rec);
        });

        f2.down('[name=department_id]').getStore().load();
        f2.down('[name=cashflowtype_id]').getStore().load();
    },
    getaccgroup: function(){
            var me = this;
            var g = me.getGrid();
            var rec = g.getSelectedRecord();

            var  ptid = me.getFormdata().down("[name=pt_pt_id]").getValue();
            var projectid = me.getFormdata().down("[name=project_project_id]").getValue();
            console.log(rec);

            if(ptid != null){
                    ptid = me.getFormdata().down("[name=pt_pt_id]").getValue();
                }else{
                    ptid = apps.pt;
                }

            if(projectid != null){
                projectid = me.getFormdata().down("[name=project_project_id]").getValue();
                console.log("INI DAH : " + projectid);
            }else{
                // projectid = rec.get("project_project_id");
                projectid = apps.project;
            }
            
            storesubcode = me.getStore('Subaccountgroupfs');
            storesubcode.load({
            params: {
                "hideparam": 'change_project_pt',
                "pt_id": ptid,
                "project_id" : projectid,
            },
            sync: false,
            callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                       
                        me.setValue(me, 'kelsub_kelsub_id', firstdatacode.kelsub_id);
                       
                    }
                }
                }
            });
    },
    getaccgroup2: function(){
        var me = this;
        var g = me.getGrid();
        var rec = g.getSelectedRecord();

        var  ptid = rec.data['pt_pt_id'];
        var projectid = rec.data['project_project_id'];
        
        storesubcode = me.getStore('Subaccountgroupfs');
        storesubcode.load({
        params: {
            "hideparam": 'change_project_pt',
            "pt_id": ptid,
            "project_id" : projectid,
        },
        sync: false,
        callback: function (recordscode, operationcode, successcode) {
            if (successcode) {
                if (recordscode[0]) {
                    var firstdatacode = recordscode[0]['data'];
                   
                    me.setValue(me, 'kelsub_kelsub_id', firstdatacode.kelsub_id);
                   
                }
            }
            }
        });
},
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        fa.down("[name=modiby]").setValue(parseInt(apps.uid));
        var coa_parent = fa.down("[name=parent_id]").getValue();
        if(coa_parent == null){
            fa.down("[name=level]").setValue(parseInt(1));
        }
        var gd = me.getDetailgrid();
        if (fa.getForm().isValid()) {
            me.insSave({
                form: fa,
                grid: me.getGrid(),
                finalData: function (data) {
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
        }


    },
     mainDataSave2: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata2();
        me.getFormdata2().down('[name=modiby]').setValue(parseInt(apps.uid));
        var gd = me.getDetailgrid();
        if (fa.getForm().isValid()) {
            me.insSave({
                form: fa,
                grid: me.getGrid(),
                finalData: function (data) {
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
        }


    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
        if (param == "update") {
            var rec = g.getSelectedRecord();
            f.editedRow = g.getSelectedRow();

            f.getForm().loadRecord(rec);
        }
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
     getCoaNamebyid: function (newValue) {

        var me = this;
        var f = me.getFormdata();
        var e = f.down("[name=parent_id]");

        var x = e.getStore().findRecord("coa_id", newValue);
        f.down("[name=parent_name]").setValue(x.data['name']);
        var level = x.data['level'];
        var levelnew = parseInt(level) + 1;
        f.down("[name=level]").setValue(parseInt(levelnew));

      
       
    },
    validateBeforeDestroy: function() {

        var me = this;
        var grid = me.getGrid();
        var selectedData = grid.getSelectionModel().getSelection();
        var ids = [];
        var data = null;
        var fs = me.getFormsearch();
        var project_id = fs.down("[name=projectpt_id]").valueModels[0].data.project_id;
        var pt_id = fs.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        
        for (var i = 0; i < selectedData.length; i++) {
            ids.push(selectedData[i].data.coa_id);
        }

        return Ext.Ajax.request({
            url: 'cashier/common/read',
            params: {
                'hideparam': 'validatebeforedeletecoa',
                'iddata': ids.join(','),
                'project_id': project_id == "" ? apps.project : project_id,
                'pt_id': pt_id == "" ? apps.pt : pt_id
            },
            async: false,
            success: function(res) {
                
            } 
        }).responseText
    },
    validateCoaExistsCpmsOrEms: function () {

        var me = this;
        var grid = me.getGrid();
        var selectedData = grid.getSelectionModel().getSelection();
        var ids = [];
        var coas = [];
        var data = null;
        var fs = me.getFormsearch();
        var project_id = fs.down("[name=projectpt_id]").valueModels[0].data.project_id;
        var pt_id = fs.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        
        for (var i = 0; i < selectedData.length; i++) {
            ids.push(selectedData[i].data.coa_id);
            coas.push(selectedData[i].data.coa);
        }

        return Ext.Ajax.request({
            url: 'cashier/common/read',
            params: {
                'hideparam': 'validatecoaexistcpmsorems',
                'iddata': ids.join(','),
                'coas': coas.join(','),
                'project_id': project_id == "" ? apps.project : project_id,
                'pt_id': pt_id == "" ? apps.pt : pt_id
            },
            async: false,
            success: function(res) {
                
            } 
        }).responseText
        
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
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            var validasi = Ext.JSON.decode(me.validateBeforeDestroy());
            validasi = validasi['data'][0];
            
            if (validasi.result == 'false') {
                Ext.Msg.alert('Info', validasi.message);
                return false;
            }

            var validasi2 = Ext.JSON.decode(me.validateCoaExistsCpmsOrEms());
            validasi2 = validasi2['data'][0];
            
            if (validasi2.result == 'false') {
                Ext.Msg.alert('Info', validasi2.message);
                return false;
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
                                msg: failmsg + ' The data may have been used in Voucher / Voucher dept. request / Cashbon dept. request / Has been posted',
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
    copyCoa: function() {

        var me = this;
        me.FormDataCustomeShow('create', 500, 'Copy COA ', 'Cashier.view.mastercoa.FormDataCopy', 'mastercoaformdatacopy');
    },
    formdatacopyafterrender: function() {

        var me = this;
        var f = me.getFormdatacopy();
        me.getCustomRequestComboboxv2('detailproject', '', '', '', 'project_id', 'pt', 'project', f, '', function () {
            f.down("[name=project_id]").setValue(me.project_id);
        });
        me.getCustomRequestComboboxv2('detailpt', '', '', '', 'pt_id', 'pt', 'project', f, '', function () {
            f.down("[name=pt_id]").getStore().filter('project_project_id', me.project_id);
            f.down("[name=pt_id]").setValue(me.pt_id);
        });
        me.getCustomRequestComboboxv2('detailproject', '', '', '', 'copy_project_id', 'pt', 'project', f, '', function () {
        });
    },
    processCopyCoa: function() {

        var me = this;
        var f = me.getFormdatacopy();
        var grid = me.getGrid();

        var from_project = f.down("[name=project_id]").getValue();
        var from_pt = f.down("[name=pt_id]").getValue();
        var to_project = f.down("[name=copy_project_id]").getValue();
        var to_pt = f.down("[name=copy_pt_id]").getValue();
        var copy_sub_group = f.down("[name=copy_sub_group]").getGroupValue();
        var copy_method = f.down("[name=copy_method]").getGroupValue();

        if (from_project == to_project && from_pt == to_pt) {
            me.tools.alert.warning("The project / PT of destination is the same as the original Project / PT");
            return false;
        }

        if (to_project == null || to_project == 0 || to_project == '') {
            Ext.Msg.alert('Info', 'Please Select Project Destination');
            return false;
        }

        if (to_pt == null || to_pt == 0 || to_pt == '') {
            Ext.Msg.alert('Info', 'Please Select PT Destination');
            return false;
        }

        if (copy_method == 1 && grid.getSelectionModel().getSelection().length <= 0) {
            Ext.Msg.alert('Info', 'Please Select Record First');
            return false;
        }

        if (copy_method == 0) {
            Ext.Msg.confirm("Confirmation", "This Process Will Replace All COA in Destination Company. Are You Sure?", function(btn) {
                if (btn == 'yes') {
                    me.doingCopy(from_project, from_pt, to_project, to_pt, copy_sub_group, copy_method, null);
                }
            })
        } else {
            Ext.Msg.confirm("Confirmation", "Are you sure?", function(btn) {
                if (btn == 'yes') {

                    var coa_source_arr = [];
                    var coa_source = null;
                    var data = me.getGrid().getSelectionModel().getSelection();

                    for (var i = 0; i < data.length; i++) {
                        coa_source_arr.push(data[i].data.coa_id);
                    }

                    coa_source = coa_source_arr.join(',');

                    me.doingCopy(from_project, from_pt, to_project, to_pt, copy_sub_group, copy_method, coa_source);
                }
            })
        }
    },
    checkiscoaexists: function(to_project, to_pt) {

        return Ext.Ajax.request({
            url: 'cashier/subaccountgroup/read',
            method: 'POST',
            async: false,
            params: {
                project_id: to_project,
                pt_id: to_pt,
                hideparam: 'checkcoaexists'
            }
        }).responseText
    },
    doingCopy: function(from_project, from_pt, to_project, to_pt, copy_sub_group, copy_method, coa_source) {

        var me = this;
        var f = me.getFormdatacopy();
        var param = {
            from_project: from_project,
            from_pt: from_pt,
            to_project: to_project,
            to_pt: to_pt,
            copy_sub_group: copy_sub_group,
            copy_method: copy_method,
            coa_source: coa_source,
            hideparam: 'copycoa'
        };
        
        f.setLoading("Please wait, data is being processed...");
        Ext.Ajax.request({
            url: 'cashier/subaccountgroup/create',
            method: 'POST',
            params: {
                data: Ext.encode(param)
            },
            success: function(response) {
                var res = Ext.JSON.decode(response.responseText);

                f.setLoading(false);
                me.getGrid().getStore().load();
                f.up('window').close();
                if (res.success == true) {
                    me.tools.alert.info("COA copied successfully.");
                    return false;
                } else {
                    me.tools.alert.error(res.msg);
                    return false;
                }
            }
        })
    },
    validateCoa: function(to_project, to_pt) {
        var me = this;
        var res =  Ext.Ajax.request({
            url: 'cashier/subaccountgroup/read',
            method: 'POST',
            async: false,
            params: {
                project_id: to_project,
                pt_id: to_pt,
                hideparam: 'checkcoavalid'
            }
        }).responseText;
        res = JSON.parse(res);
        me.tools.alert.info(res.total);
    },
    loadProjectPt: function(project_id_field, pt_id_field) {
        var me = this;
        var f = me.getFormdata();
        var fs = me.getFormsearch();

        var project_id_fs = fs.down("[name=projectpt_id]").valueModels[0].data.project_id;
        var pt_id_fs = fs.down("[name=projectpt_id]").valueModels[0].data.pt_id;

        f.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: f,
            success: function (data, model) {

                try {
                    me.tools.weseav2(data.project, f.down("[name="+project_id_field+"]")).comboBox('', function () {
                        if (project_id_fs != null && project_id_fs != "") {
                            f.down("[name="+project_id_field+"]").setValue(parseInt(project_id_fs));
                        } else {
                            f.down("[name="+project_id_field+"]").setValue(parseInt(apps.project));
                        }                            
                    });
                    me.tools.weseav2(data.pt, f.down("[name="+pt_id_field+"]")).comboBox('', function () {
                        var combostore = f.down('[name='+pt_id_field+']').getStore();
                        var record = combostore.findRecord('pt_id', parseInt(apps.pt),0,false,true,true);
                            if (pt_id_fs != null && pt_id_fs != "") {
                                f.down("[name="+pt_id_field+"]").setValue(parseInt(pt_id_fs));
                            } else {
                                f.down("[name="+pt_id_field+"]").setValue(parseInt(apps.pt));
                            }  
                        if (record) {
                            if (project_id_fs != null && project_id_fs != "") {
                                combostore.filter('project_project_id', project_id_fs, true, false);
                            } else {
                                combostore.filter('project_project_id', apps.project, true, false);
                            } 
                            var grid = me.getGrid();
                            grid.setLoading('Please wait');
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.load({
                                callback: function () {
                                    grid.setLoading(false);
                                }
                            });
                        }
                    });

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                f.setLoading(false);
            }
        }).read('initforcoa');
    },
     syncParams: function (form, store, msg, mode, otherStoreUsed, callback) {
        var osu = typeof otherStoreUsed === "undefined" ? false : otherStoreUsed;
        var mod = typeof mode === "undefined" ? "create" : mode;
        var me = this;
        var x = {
            success: function (a, b, c) {
                var d = a.operations;
                if (d) {
                    var info = Ext.JSON.decode(d[0].response['responseText']);
                    if (info.success) {
                        me.saved_id = info.kasbank_id;
                        me.returninfo = info;
                        me.journalsaved_id = info.id;
                    }
                }
                form.up('window').body.unmask();
                //   store.un('beforesync', msg);
                if (me.pointedStore != null) {
                    me.pointedStore.reload();
                } else {
                    store.reload();
                }

                //var msg = mod === "create" ? 'Data saved successfully.' : "Data deleted successfully"
                var msg = 'Data saved successfully';

                if (mod === "create") {
                    var msg = 'Data saved successfully';
                }
                else if (mod === "update") {
                    var msg = 'Data updated successfully';
                }
                else {
                    var msg = 'Data deleted successfully';
                }

                Ext.Msg.show({
                    title: 'Success',
                    msg: msg,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        //console.log('a');
                        if (mod == "create") {
                            form.up('window').close();
                            setTimeout(function () {
                                if (typeof callback === 'function') {
                                    callback();
                                }
                            }, 500);
                        }
                        else if (mod == "update") {
                            form.up('window').close();
                            setTimeout(function () {
                                if (typeof callback === 'function') {
                                    callback();
                                }
                            }, 500);

                        }

                    }
                });



            },
            failure: function (batch, op) {
                var state = me.getActiveForm().up("window").state;
                var erMsg = "Unable to process data.";
                var jsD = batch.proxy.getReader().jsonData;
                if (typeof jsD.msg !== "undefined") {
                    if(state == 'update' && me.is_edit_coa == 0){
                        erMsg = 'Modify COA Is Not Authorized!';
                    }else{
                         erMsg = jsD.msg;
                    }
                   
                }
                form.up('window').body.unmask();
                if (me.pointedStore != null) {
                    me.pointedStore.un('beforesync', msg);
                }

                //console.log(jsD);


                if (state === "create") {

                    var pos = 0;
                    if (store.getCount() >= 1) {
                        pos = store.getCount() - 1;
                    }
                    store.removeAt(pos);
                    if (osu) {
                        pos = me.pointedStore.getCount() - 1;
                        me.pointedStore.removeAt(pos);
                    }
                    store.reload();
                }

                var msgJson = jsD.msg;
                if (!msgJson) {
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Message : ' + erMsg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                     store.reload();
                } else {
                    Ext.Msg.show({
                        title: 'Warning',
                        msg: 'Message : ' + erMsg,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.OK
                    });
                     store.reload();
                }

                // form.up('window').close();
            }
        };
        return x;
    },
});
