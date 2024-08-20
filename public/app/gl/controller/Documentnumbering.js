Ext.define('Gl.controller.Documentnumbering', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Documentnumbering',
    requires: [
        'Gl.library.tools.Mytools',
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Projectcombobox',
        'Gl.library.template.combobox.Ptcombobox'

    ],
    views: [
                'documentnumbering.Panel',
                'documentnumbering.Grid', 
                'documentnumbering.FormSearch', 
                'documentnumbering.FormData',
                'documentnumbering.FormImport'
            ],
    stores: [
                'Documentnumbering',
                'Project',
                'Pt'
            ],
    models: [
                'Documentnumbering',
                'Project',
                'Pt'    
            ],
    refs: [
        {
            ref: 'grid',
            selector: 'documentnumberinggrid'
        },
        {
            ref: 'formsearch',
            selector: 'documentnumberingformsearch'
        },
        {
            ref: 'formdata',
            selector: 'documentnumberingformdata'
        },
        {
            ref: 'formimport',
            selector: 'documentnumberingformimport'
        }
    ],
    controllerName: 'documentnumbering',
    fieldName: 'subdsk',
    bindPrefixName:'Documentnumbering',
    init: function(application) {
        var me = this;
        this.control({
            'documentnumberingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'documentnumberinggrid': {
                afterrender: this.gridAfterRenderCustome,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'documentnumberinggrid toolbar button[action=create]': {
                click: function() {                    
                    this.formDataShow('create');
                }
            },
            'documentnumberinggrid toolbar button[action=import]': {
                click: function () {
                    var countdata = 0;
                    var grid, actionColItems = '';
                    countdata = this.checkStoreExist('Documentnumbering');
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
            'documentnumberinggrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'documentnumberinggrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'documentnumberinggrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'documentnumberinggrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'documentnumberingformsearch button[action=search]': {
                click: this.dataSearch
            },
            'documentnumberingformsearch [name=subdsk]': {
                keyup : function(){
                  this.liveSearch(this);
              }
            },
            'documentnumberingformsearch [name=description]': {
                keyup : function(){
                  this.liveSearch(this);
              }
            },
            'documentnumberingformsearch button[action=reset]': {
                click: this.dataReset
            },
            'documentnumberingformdata': {
                afterrender: this.formDataAfterRender
            },
            'documentnumberingformdata [name=subdsk]': {
                blur: function () {
                    this.dataExist('gl/documentnumbering/create', me, 'checkexist', 'subdsk');
                }
            },
            'documentnumberingformdata button[action=save]': {
                click: this.dataSave
            },
            'documentnumberingformdata button[action=cancel]': {
                click: this.formDataClose
            },
             'documentnumberingformimport': {
                afterrender: function () {
                    this.formImportAfterRender(this);
                    me.getFormimport().down("[name=pt_id]").setDisabled(true);
                    me.getFormimport().down("button[action=import]").disable(true);
                },
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                },
            },
            'documentnumberingformimport [name=project_id]': {
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
            'documentnumberingformimport [name=pt_id]': {
                select: function () {
                    var project_id, pt_id, formvalue, info = '';

                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('checkdatabyptproject');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'gl/documentnumbering/create',
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
            'documentnumberingformimport button[action=import]': {
                click: function () {
                    var project_id, pt_id, formvalue, info = '';
                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('importdata');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'gl/documentnumbering/create',
                        method: 'POST',
                        params: {data: Ext.encode(formvalue)},
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.getFormimport().setLoading(false);
                            var store = me.getStore('Documentnumbering');//mendapatkan store
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