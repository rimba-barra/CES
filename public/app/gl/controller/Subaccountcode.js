Ext.define('Gl.controller.Subaccountcode', {
    extend: 'Gl.library.template.controller.Controllergl',
    requires: [
        'Gl.library.tools.Mytools',
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Subaccountgroupcombobox',
        'Gl.library.template.combobox.Subaccountgroupmulticombobox',
        'Gl.library.template.combobox.Subdesccodecombobox',
        'Gl.library.template.combobox.Projectcombobox',
        'Gl.library.template.combobox.Ptcombobox'
    ],
    alias: 'controller.Subaccountcode',
    views: [
        'subaccountcode.Panel',
        'subaccountcode.Grid',
        'subaccountcode.FormSearch',
        'subaccountcode.FormData',
        'subaccountcode.FormImport'
    ],
    stores: [
        'Subaccountcode',
        'Project',
        'Pt'
    ],
    models: [
        'Subaccountcode',
        'Project',
        'Pt'
    ],
    elem: null,
    refs: [
        {
            ref: 'grid',
            selector: 'subaccountcodegrid'
        },
        {
            ref: 'formsearch',
            selector: 'subaccountcodeformsearch'
        },
        {
            ref: 'formdata',
            selector: 'subaccountcodeformdata'
        },
        {
            ref: 'formimport',
            selector: 'subaccountcodeformimport'
        }
    ],
    controllerName: 'subaccountcode',
    fieldName: 'code', //for notif even delete
    bindPrefixName: 'Subaccountcode',
    init: function (application) {
        var me = this;

        me.elem = new Gl.library.tools.Mytools();

        this.control({
            'subaccountcodepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'subaccountcodegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'subaccountcodegrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'subaccountcodegrid toolbar button[action=import]': {
                click: function () {
                    var countdata = 0;
                    var grid, actionColItems = '';
                    countdata = this.checkStoreExist('Subaccountcode');
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
            'subaccountcodegrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'subaccountcodegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'subaccountcodegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'subaccountcodegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'subaccountcodeformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'subaccountcodeformsearch [name=kelsub_id]': {
                select: function () {
                    this.liveSearch(this);
                }
            },
            'subaccountcodeformsearch [name=code1]': {
                keyup: function () {
                   // this.liveSearch(this);
                }
            },
            'subaccountcodeformsearch [name=code2]': {
                keyup: function () {
                   // this.liveSearch(this);
                }
            },
            'subaccountcodeformsearch [name=code3]': {
                select: function () {
                   // this.liveSearch(this);
                }
            },
            'subaccountcodeformsearch [name=code4]': {
                select: function () {
                   // this.liveSearch(this);
                }
            },
            'subaccountcodeformsearch [name=code]': {
                keyup: function () {
                    //this.liveSearch(this);
                }
            },
            'subaccountcodeformsearch button[action=search]': {
                click: function () {
                    this.liveSearch(this);
                }
            },
            'subaccountcodeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'subaccountcodeformdata': {
                afterrender: this.formDataAfterRender
            },
            'subaccountcodeformdata button[action=save]': {
                click: this.dataSave
            },
            'subaccountcodeformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'subaccountcodeformdata [name=code1]': {
                keyup: function () {
                    this.setUpper(me, 'code1');
                },
                blur: function () {
                    me.elem.set_elem_value(me, 'code1', 'code');
                }
            },
            'subaccountcodeformdata [name=code2]': {
                keyup: function () {
                    this.setUpper(me, 'code1');
                },
                blur: function () {
                    me.elem.set_elem_value(me, 'code2', 'code');
                }
            },
            'subaccountcodeformdata [name=code3]': {
                select: function () {
                    me.elem.set_elem_value(me, 'code3', 'code');
                }
            },
            'subaccountcodeformdata [name=code4]': {
                select: function () {
                    me.elem.set_elem_value(me, 'code4', 'code');
                }
            },
            'subaccountcodeformdata [name=code]': {
                change: function () {
                    this.dataExist('gl/subaccountcode/create', me, 'checkexist', 'code');
                }
            },
            'subaccountcodeformdata [name=kelsub_id]': {
                select: function () {
                    this.dataExist('gl/subaccountcode/create', me, 'checkexist', 'code');
                }
            },
            'subaccountcodeformimport': {
                afterrender: function () {
                    this.formImportAfterRender(this);
                    me.getFormimport().down("[name=pt_id]").setDisabled(true);
                    me.getFormimport().down("[name=grade]").setDisabled(true);
                    me.getFormimport().down("button[action=import]").disable(true);
                },
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                },
            },
            'subaccountcodeformimport [name=project_id]': {
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
                    } else {
                        me.getFormimport().down("[name=pt_id]").setDisabled(true);
                        me.getFormimport().down("[name=grade]").setDisabled(true);
                        me.getFormimport().down("button[action=import]").disable(true);
                    }
                }
            },
            'subaccountcodeformimport [name=pt_id]': {
                select: function () {
                    var project_id, pt_id, formvalue, info = '';

                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('checkdatabyptproject');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'gl/subaccountcode/create',
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

                            } else
                            {
                                
                                var storegroup = me.getStore('Subaccountgroup');//mendapatkan store
                                storegroup.load({
                                    params: {
                                        hideparam: 'change_project_pt',
                                        project_id: me.getFormimport().down("[name=project_id]").getValue(),
                                        pt_id: me.getFormimport().down("[name=pt_id]").getValue(),
                                    }
                                });
                                                                
                                me.getFormimport().down("[name=grade]").setDisabled(false);
                                me.getFormimport().down("button[action=import]").setDisabled(false);
                            }

                        },
                        failure: function (response) {
                        }
                    });
                }
            },
            'subaccountcodeformimport button[action=import]': {
                click: function () {
                    var project_id, pt_id, formvalue, info = '';
                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('importdata');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'gl/subaccountcode/create',
                        method: 'POST',
                        params: {data: Ext.encode(formvalue)},
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.getFormimport().setLoading(false);
                            var store = me.getStore('Subaccountcode');//mendapatkan store
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
        var me, storeproject, storept, storegroup = '';
        me = this;

        storeproject = me.getStore('Project');//mendapatkan store
        storept = me.getStore('Pt');//mendapatkan store
      //  storegroup = me.getStore('Subaccountgroup');//mendapatkan store

        storeproject.load();
        storept.load();
      //  storegroup.load();

    },
});