Ext.define('Cashier.controller.Subaccountgroup', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Subaccountgroup',
    requires: [
    'Cashier.library.tools.Mytools',
    'Cashier.template.ComboBoxFields',
    'Cashier.library.template.combobox.Projectcombobox',
    'Cashier.library.template.combobox.Ptusercombobox',
    'Cashier.library.template.combobox.Subaccountgroupcombobox',
    'Cashier.library.template.combobox.Projectptallcombobox'
    ],
    views: [
    'subaccountgroup.Panel',
    'subaccountgroup.Grid',
    'subaccountgroup.FormSearch',
    'subaccountgroup.FormData',
    'subaccountgroup.FormDataMerge',
    'subaccountgroup.FormImport'
    ],
    stores: [
    'Subaccountgroup',
    'Projectptall',
    ],
    models: [
    'Subaccountgroup',
    'Pt'
    ],
    refs: [
    {
        ref: 'grid',
        selector: 'subaccountgroupgrid'
    },
    {
        ref: 'formsearch',
        selector: 'subaccountgroupformsearch'
    },
    {
        ref: 'formdata',
        selector: 'subaccountgroupformdata'
    },
    {
        ref: 'formimport',
        selector: 'subaccountgroupformimport'
    },
    {
        ref: 'formdatamerge',
        selector: 'subaccountgroupformdatamerge'
    }
    ],
    controllerName: 'subaccountgroup',
    fieldName: 'kelsub',
    bindPrefixName: 'Subaccountgroup',
    init: function (application) {
        var me = this;
        this.control({
            'subaccountgrouppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'subaccountgroupgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'subaccountgroupgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'subaccountgroupgrid toolbar button[action=import]': {
                click: function () {
                    var countdata = 0;
                    var grid, actionColItems = '';
                    countdata = this.checkStoreExist('Subaccountgroup');
                    if (countdata > 0) {
                        this.buildWarningAlert('Sorry button import not function <br/> because data already exists');
                        grid = this.getGrid();
                        grid.down('#btnImport').setDisabled(true);
                        //this.formImportShow('import');
                    } else {
                        this.formImportShow('import');
                    }
                }
            },
            'subaccountgroupgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'subaccountgroupgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'subaccountgroupgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'subaccountgroupgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'subaccountgroupformsearch [name=kelsub]': {
                keyup: function () {
                    this.liveSearch(this);
                }
            },
            'subaccountgroupformsearch [name=description]': {
                keyup: function () {
                    this.liveSearch(this);
                }
            },
            'subaccountgroupformsearch button[action=search]': {
                click: this.dataSearch
            },
            'subaccountgroupformsearch button[action=reset]': {
                click: this.dataReset
            },
            'subaccountgroupformdata': {
                afterrender: this.formDataAfterRender
            },
            'subaccountgroupformdata [name=kelsub]': {
                blur: function () {
                    this.dataExist('cashier/subaccountgroup/create', me, 'checkexist', 'kelsub');
                }
            },
            'subaccountgroupformdata button[action=save]': {
                click: this.dataSave
            },
            'subaccountgroupformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'subaccountgroupformimport': {
                afterrender: function () {
                    this.formImportAfterRender(this);
                    me.getFormimport().down("[name=pt_id]").setDisabled(true);
                    me.getFormimport().down("button[action=import]").disable(true);
                },
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                },
            },
            'subaccountgroupformimport [name=project_id]': {
                select: function () {
                    var value = this.getFormimport().down("[name=project_id]").getValue();
                    var storept = me.getStore('Pt');//mendapatkan store
                    storept.clearFilter(true);
                    storept.filterBy(function (rec, id) {
                        if (rec.raw.project_id === value) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (storept.getCount() > 0) {
                        me.getFormimport().down("[name=pt_id]").setDisabled(false);
                        me.getFormimport().down("button[action=import]").disable(false);
                    } else {
                        me.getFormimport().down("[name=pt_id]").setDisabled(true);
                        me.getFormimport().down("button[action=import]").disable(true);
                    }
                }
            },
            'subaccountgroupformimport [name=pt_id]': {
                select: function () {
                    var project_id, pt_id, formvalue, info = '';

                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('checkdatabyptproject');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'cashier/subaccountgroup/create',
                        method: 'POST',
                        params: {data: Ext.encode(formvalue)},
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.getFormimport().setLoading(false);

                            if (info.total < 1) {
                                Ext.Msg.show({
                                    title: 'WARNING',
                                    msg: 'Sorry Data in Project : ' + project_id + ' With  ' + pt_id + ' Not Exist',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });

                            }
                            {
                                me.getFormimport().down("button[action=import]").setDisabled(false);
                            }

                        },
                        failure: function (response) {
                        }
                    });
                }
            },
            'subaccountgroupformimport button[action=import]': {
                click: function () {
                    var project_id, pt_id, formvalue, info = '';
                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('importdata');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'cashier/subaccountgroup/create',
                        method: 'POST',
                        params: {data: Ext.encode(formvalue)},
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.getFormimport().setLoading(false);
                            var store = me.getStore('Subaccountgroup');//mendapatkan store
                            store.reload();
                            if (info.total < 1) {
                                Ext.Msg.show({
                                    title: 'SUCCESS',
                                    msg: 'Data in Project : ' + project_id + ' With  ' + pt_id + ' Success to import',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.SUCCESS,
                                    fn: function () {
                                        me.getFormimport().up('window').close();
                                    }
                                });

                            }

                        },
                        failure: function (response) {
                        }
                    });

                }
            },
            'subaccountgroupgrid button[action=merge]': {
                click: function(el, act) {
                    var me = this;
                    me.instantWindow('FormDataMerge', 600, 'Merge Sub Acc Group', 'create', 'myInstantWindow', me.controllerName);
                    // var grid = me.getGrid();
                    // var storear = grid.getStore();
                    // console.log(storear);
                }
            },
            'subaccountgroupformdatamerge': {
                afterrender: function() {
                    var me = this;
                    me.getFormdatamerge().down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
                    me.getFormdatamerge().down("[name=project_id]").setValue(parseInt(apps.project));
                    me.getFormdatamerge().down("[name=pt_id]").setValue(parseInt(apps.pt));
                    me.getkelsub(parseInt(apps.project), parseInt(apps.pt));
                    // var grid = me.getGrid();
                    // var storear = grid.getStore();
                    // console.log(storear);
                }
            },
            'subaccountgroupformdatamerge button[action=save]': {
                click: function() {
                    var project_id, pt_id, formvalue, info = '';

                    project_id = this.getFormdatamerge().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormdatamerge().down("[name=pt_id]").getRawValue();

                    me.getFormdatamerge().down("[name=hideparam]").setValue('mergesub');
                    formvalue = me.getFormdatamerge().getForm().getValues();
                    
                    var kelsub1 = me.getFormdatamerge().down("[name=kelsub_deleted]").getValue();
                    var kelsub2 = me.getFormdatamerge().down("[name=kelsub_keep]").getValue();

                    if (kelsub1 == null || kelsub2 == null) {
                        Ext.Msg.show({
                            title: 'Warning',
                            msg: 'Form Tidak boleh kosong.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.WARNING
                        });
                    }else{
                        me.getFormdatamerge().setLoading('Please Wait...');
                        Ext.Ajax.request({
                            url: 'cashier/subaccountgroup/merge',
                            method: 'POST',
                            params: {data: Ext.encode(formvalue)},
                            success: function (response) {
                                info = Ext.JSON.decode(response.responseText);
                                me.getFormdatamerge().setLoading(false);
                                me.getFormdatamerge().up('window').close();
                                if (info.success) {
                                    Ext.Msg.show({
                                        title: 'Success',
                                        msg: info.msg,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                }else{
                                    Ext.Msg.show({
                                        title: 'Warning',
                                        msg: info.msg,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.WARNING
                                    });
                                }

                            },
                            failure: function (response) {
                            }
                        });
                    }
                }
            },
            'subaccountgroupformdatamerge [name=projectpt_id]': {
                change: function (el) {
                    var me = this;
                    var project_id = parseInt(apps.project);
                    var pt_id = parseInt(apps.pt);
                    
                    if (el.valueModels != null) {
                        var data = el.valueModels[0].data;
                        me.getFormdatamerge().down("[name=project_id]").setValue(data.project_id);
                        me.getFormdatamerge().down("[name=pt_id]").setValue(data.pt_id);
                        project_id = data.project_id;
                        pt_id = data.pt_id;
                    }else{
                        me.getFormdatamerge().down("[name=project_id]").setValue(parseInt(apps.project));
                        me.getFormdatamerge().down("[name=pt_id]").setValue(parseInt(apps.pt));
                        project_id = parseInt(apps.project);
                        pt_id = parseInt(apps.pt);
                    }
                    me.getFormdatamerge().down("[name=kelsub_deleted]").setValue();
                    me.getFormdatamerge().down("[name=kelsub_keep]").setValue();

                    me.getkelsub(parseInt(project_id), parseInt(pt_id));

                }   
            },

        });
},
formImportAfterRender: function (contoller) {
    var me, storeproject, storept = '';
    me = this;

        storeproject = me.getStore('Project');//mendapatkan store
        storept = me.getStore('Pt');//mendapatkan store

        storeproject.load();
        storept.load();

    },
    
    //Rizal 31 Mei 2019
    formDataAfterRender: function (el){
        var me = this;
        var f = me.getFormdata();
        var projectpt_id = 0;
        var state = el.up('window').state;
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        if(state == 'create'){
            me.getFormdata().down("[name=projectpt_id]").getStore().load();
            Ext.Ajax.request({
                url: 'cashier/common/read',
                method: 'POST',
                timeout:100000000,	
                params: {
                    hideparam :'getptbyuserid',
                    project_project_id: apps.project,
                    pt_pt_id: apps.pt,
                    user_id: apps.uid,
                    start: 0,
                    limit: 1000,
                },
                success: function (response) {
                    response = Ext.JSON.decode(response.responseText);
                //console.log(response.data[0]['projectpt_id']);
                projectpt_id = response.data[0]['projectpt_id'];
                //console.log("projectpt_idnya:"+projectpt_id);
                var grid = me.getGrid();
                var storear = grid.getStore();
                f.down("[name=projectpt_id]").setValue(parseInt(projectpt_id));
                var fields = f.getForm().getFieldValues();
                for (var x in fields) {
                    storear.getProxy().setExtraParam(x, fields[x]);
                }
                storear.loadPage(1);
            },
            failure: function (response) {

            }
        });
        }else if (state == 'update'){
          me.fdar().update();


      }else if (state == 'read'){
        me.fdar().read();
    }
},
panelAfterRender: function () {
    var me = this;
    var f = me.getFormsearch();
    var projectpt_id = 0;
    me.getFormsearch().down("[name=projectpt_id]").getStore().load();

    Ext.Ajax.request({
        url: 'cashier/common/read',
        method: 'POST',
        timeout:100000000,	
        params: {
            hideparam :'getptbyuserid',
            project_project_id: apps.project,
            pt_pt_id: apps.pt,
            user_id: apps.uid,
            start: 0,
            limit: 1000,
        },
        success: function (response) {
            response = Ext.JSON.decode(response.responseText);
                //console.log(response.data[0]['projectpt_id']);
                projectpt_id = response.data[0]['projectpt_id'];
                //console.log("projectpt_idnya:"+projectpt_id);
                var grid = me.getGrid();
                var storear = grid.getStore();
                f.down("[name=projectpt_id]").setValue(parseInt(projectpt_id));
                var fields = f.getForm().getFieldValues();
                for (var x in fields) {
                    storear.getProxy().setExtraParam(x, fields[x]);
                }
                storear.loadPage(1);
            },
            failure: function (response) {

            }
        });

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

getkelsub : function(project,pt){
    var f = this.getFormdatamerge();
    Ext.Ajax.request({
        url: 'cashier/subaccountgroup/read',
        method: 'POST',
        params: {
            hideparam :'filtersubbypt',
            project_id: project,
            pt_id: pt
        },
        success: function (response) {
            item = Ext.JSON.decode(response.responseText);
            var form = f.down('[name=kelsub_deleted]');
            var form2 = f.down('[name=kelsub_keep]');
            var store = form.getStore("kelsubdata");
            var store2 = form2.getStore("kelsubdata2");

            var me = this;
            store.removeAll();
            store.clearFilter();
            store2.removeAll();
            store2.clearFilter();
            for (let i = 0; i < item.total; i++) {
                var firstdatacode = item.data[i];
                store.add({
                    project_id: firstdatacode.subgl_id, 
                    pt_id: firstdatacode.pt_id,
                    kelsub_id: firstdatacode.kelsub_id, 
                    kelsub: firstdatacode.kelsub,
                    fullnamekelsub :firstdatacode.fullnamekelsub,
                    description: firstdatacode.description
                });
                store2.add({
                    project_id: firstdatacode.subgl_id, 
                    pt_id: firstdatacode.pt_id,
                    kelsub_id: firstdatacode.kelsub_id, 
                    kelsub: firstdatacode.kelsub,
                    fullnamekelsub :firstdatacode.fullnamekelsub,
                    description: firstdatacode.description
                });
            }

        },
        failure: function (response) {
        }
    });
}
    //
});