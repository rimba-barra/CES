Ext.define('Gl.controller.Subdesccode', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Subdesccode',
    requires: [
        'Gl.library.tools.Mytools',
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Projectcombobox',
        'Gl.library.template.combobox.Ptcombobox'

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
                'Pt'
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
                    this.dataExist('gl/subdesccode/create', me, 'checkexist', 'subdsk');
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
                        url: 'gl/subdesccode/create',
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
                        url: 'gl/subdesccode/create',
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
     
});