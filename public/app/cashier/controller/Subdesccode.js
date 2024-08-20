Ext.define('Cashier.controller.Subdesccode', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Subdesccode',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.combobox.Projectptallcombobox'

    ],
    views: [
                'subdesccode.Panel',
                'subdesccode.Grid', 
                'subdesccode.FormSearch', 
                'subdesccode.FormData',
                'subdesccode.FormImport'
            ],
    stores: [
                'Subdesccode',
                'Project',
                'Pt',
                'Projectptall',
            ],
    models: [
                'Subdesccode',
                'Project',
                'Pt'    
            ],
    refs: [
        {
            ref: 'grid',
            selector: 'subdesccodegrid'
        },
        {
            ref: 'formsearch',
            selector: 'subdesccodeformsearch'
        },
        {
            ref: 'formdata',
            selector: 'subdesccodeformdata'
        },
        {
            ref: 'formimport',
            selector: 'subdesccodeformimport'
        }
    ],
    controllerName: 'subdesccode',
    fieldName: 'subdsk',
    bindPrefixName:'Subdesccode',
    init: function(application) {
        var me = this;
        this.control({
            'subdesccodepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'subdesccodegrid': {
                afterrender: this.gridAfterRenderCustome,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'subdesccodegrid toolbar button[action=create]': {
                click: function() {                    
                    this.formDataShow('create');
                }
            },
            'subdesccodegrid toolbar button[action=import]': {
                click: function () {
                    var countdata = 0;
                    var grid, actionColItems = '';
                    countdata = this.checkStoreExist('Subdesccode');
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
            'subdesccodegrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'subdesccodegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'subdesccodegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'subdesccodegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'subdesccodeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'subdesccodeformsearch [name=subdsk]': {
                keyup : function(){
                  this.liveSearch(this);
              }
            },
            'subdesccodeformsearch [name=description]': {
                keyup : function(){
                  this.liveSearch(this);
              }
            },
            'subdesccodeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'subdesccodeformdata': {
                afterrender: this.formDataAfterRender
            },
            'subdesccodeformdata [name=subdsk]': {
                blur: function () {
                    this.dataExist('cashier/subdesccode/create', me, 'checkexist', 'subdsk');
                }
            },
            'subdesccodeformdata button[action=save]': {
                click: this.dataSave
            },
            'subdesccodeformdata button[action=cancel]': {
                click: this.formDataClose
            },
             'subdesccodeformimport': {
                afterrender: function () {
                    this.formImportAfterRender(this);
                    me.getFormimport().down("[name=pt_id]").setDisabled(true);
                    me.getFormimport().down("button[action=import]").disable(true);
                },
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                },
            },
            'subdesccodeformimport [name=project_id]': {
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
            'subdesccodeformimport [name=pt_id]': {
                select: function () {
                    var project_id, pt_id, formvalue, info = '';

                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('checkdatabyptproject');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'cashier/subdesccode/create',
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
            'subdesccodeformimport button[action=import]': {
                click: function () {
                    var project_id, pt_id, formvalue, info = '';
                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('importdata');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'cashier/subdesccode/create',
                        method: 'POST',
                        params: {data: Ext.encode(formvalue)},
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.getFormimport().setLoading(false);
                            var store = me.getStore('Subdesccode');//mendapatkan store
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
            }
            

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
    formDataAfterRender: function (el) {
        var me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        var fs = me.getFormsearch();
        var fd = me.getFormdata();

        fd.down("[name=project_id]").setValue(fs.down("[name=projectpt_id]").valueModels[0].data.project_id);
        fd.down("[name=pt_id]").setValue(fs.down("[name=projectpt_id]").valueModels[0].data.pt_id);

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();
        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            me.fdar().read();
        }
    },
});