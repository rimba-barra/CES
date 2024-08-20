Ext.define('Gl.controller.Subaccountgroup', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Subaccountgroup',
    requires: [
        'Gl.library.tools.Mytools',
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Projectcombobox',
        'Gl.library.template.combobox.Ptcombobox'

    ],
    views: [
        'subaccountgroup.Panel',
        'subaccountgroup.Grid',
        'subaccountgroup.FormSearch',
        'subaccountgroup.FormData',
        'subaccountgroup.FormImport'
    ],
    stores: [
        'Subaccountgroup',
        'Project',
        'Pt'
    ],
    models: [
        'Subaccountgroup',
        'Project',
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
                    this.dataExist('gl/subaccountgroup/create', me, 'checkexist', 'kelsub');
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
                        url: 'gl/subaccountgroup/create',
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
                        url: 'gl/subaccountgroup/create',
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