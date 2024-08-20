Ext.define('Gl.controller.Coa', {
    extend: 'Gl.library.template.controller.Controllergl',
    requires: ['Gl.library.tools.Mytools',
        'Gl.template.ComboBoxFields',
        'Gl.library.template.combobox.Subaccountgroupcombobox',
        'Gl.library.template.combobox.Coacombobox',
        'Gl.library.template.combobox.Projectcombobox',
        'Gl.library.template.combobox.Ptcombobox',
        'Gl.library.template.combobox.Projectptcombobox',
        'Gl.library.template.combobox.Groupglcombobox',
        'Gl.library.template.typehead.Subaccountcodetypehead'
    ],
    alias: 'controller.Coa',
    views: ['coa.Panel',
        'coa.Grid',
        'coa.FormSearch',
        'coa.FormData',
        'coa.FormImport'
    ],
    stores: [
        'Coa',
        'Coacombo',
        'Project',
        'Pt',
        'Projectpt',
        'Groupgl',
    ],
    models: [
        'Coa',
        'Project',
        'Pt',
        'Projectpt'
    ],
    elem: null,
    refs: [
        {
            ref: 'grid',
            selector: 'coagrid'
        },
        {
            ref: 'formsearch',
            selector: 'coaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'coaformdata'
        },
        {
            ref: 'formimport',
            selector: 'coaformimport'
        }
    ],
    controllerName: 'coa',
    fieldName: 'coacode', //for notif even delete
    bindPrefixName: 'Coa',
    stateform: null,
    init: function (application) {
        var me = this;

        me.elem = new Gl.library.tools.Mytools();

        this.control({
            'coapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    //panel.up('window').maximize();
                }
            },
            'coagrid': {
                //afterrender: this.gridAfterRender,
                afterrender: function () {
                    this.gridAfterRenderCustome();

                },
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'coagrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'coagrid toolbar button[action=import]': {
                click: function () {
                    var countdata = 0;
                    var grid, actionColItems = '';
                    countdata = this.checkStoreExist('Coa');
                    if (countdata > 0) {
                        this.buildWarningAlert('Sorry button import not function <br/> because data COA already exists');
                        grid = this.getGrid();
                        grid.down('#btnImport').setDisabled(true);
                        //this.formImportShow('import');
                    } else {
                        this.formImportShow('import');
                    }
                }
            },
            'coagrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                },
            },
            'coagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'coagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'coagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'coaformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'coaformsearch button[action=search]': {
                click: function () {
                    this.liveSearch(this);
                }
            },
            'coaformsearch button[action=reset]': {
                click: function () {
                    this.getFormsearch().down("[name=type]").reset();
                    this.getFormsearch().down("[name=is_journal]").reset();
                    this.getFormsearch().down("[name=report]").reset();
                    this.dataReset()
                }

            },
            'coaformdata': {
                afterrender: function () {
                    me.stateform = me.getFormdata().up('window').state.toLowerCase();
                    this.formDataAfterRenderCustome();
                },
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                    var statefrom = me.getFormdata().up('window').state.toLowerCase();
                    if (statefrom == 'update') {
                        this.getFormdata().down("[name=countparam]").setValue(0);
                    }
                },
            },
            'coaformimport': {
                afterrender: function () {
                    this.formImportAfterRender(this);
                    me.getFormimport().down("[name=pt_id]").setDisabled(true);
                    // me.getFormimport().down("[name=fromlevel]").setReadOnly(true);
                    // me.getFormimport().down("[name=untillevel]").setReadOnly(true);
                    me.getFormimport().down("button[action=import]").disable(true);
                },
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                },
            },
            'coaformdata [name=coacode]': {
                keyup: function () {
                    var value = this.getValue(me, 'coacode', 'value');
                    this.checkNumber_custome(me, value, 'coacode', 'allow');
                    this.maskCOA(me, 'coacode', 'value');
                },
                blur: function () {
                    var value = this.getValue(me, 'parent_id', 'raw');
                    if (value) {
                        this.setValue(me, 'parent_code', value);
                    } else {
                        this.setValue(me, 'parent_code', value);
                    }
                    this.dataExist('gl/coa/create', me, 'checkexist', 'coacode');
                    this.buildLevelCOA('gl/coa/create', me, 'buildlevel', 'level');
                }
            },
            'coaformdata [name=parent_id]': {
                select: function () {
                    var value = this.getValue(me, 'parent_id', 'raw');
                    var value2 = this.getValue(me, 'parent_id', 'value');
                    this.setValue(me, 'parent_code', value);
                },
                blur: function () {
                    var value = this.getValue(me, 'parent_id', 'raw');
                    if (value) {
                        //this.setValueRadio(me, "#radio3", false);
                        //this.setValueRadio(me, "#radio4", true);
                        this.setValue(me, 'parent_code', value);
                    } else {
                        // this.setValueRadio(me, "#radio3", true);
                        // this.setValueRadio(me, "#radio4", false);
                        this.setValue(me, 'parent_code', value);
                    }
                    this.buildLevelCOA('gl/coa/create', me, 'buildlevel', 'level');

                }
            },
            'coaformdata [name=name]': {
                blur: function () {
                    this.setUpper(me, 'name');
                }
            },
            'coaformdata button[action=save]': {
                click: function () {
                    var status, datajournal, accounttype, report, necara, profilloss, debet, credit, journal, nojournal = '';

                    var me = this;

                    debet = this.getValueRadio(me, "#radio1");
                    credit = this.getValueRadio(me, "#radio2");
                    journal = this.getValueRadio(me, "#radio3");
                    nojournal = this.getValueRadio(me, "#radio4");
                    necara = this.getValueRadio(me, "#radio5");
                    profilloss = this.getValueRadio(me, "#radio6");

                    accounttype = me.elem.validationAccountType(debet, credit);
                    datajournal = me.elem.validationJournal(journal, nojournal);
                    report = me.elem.validationReport(necara, profilloss);
                    status = me.elem.bindingValidationCheckbox(accounttype, datajournal, report);

                    if (status !== 1) {
                        this.buildWarningAlert('Please checked Account Type or Jornal or Report');
                    } else {
                        var parentnotvalid = this.getValue(me, 'countparam', 'value');

                        if (parentnotvalid == 1) {
                            me.dataSave();
                        } else {
                            Ext.Msg.show({
                                title: 'Save',
                                msg: 'Parent (COA) should be less than Chart Of Account (COA), <br/>Are you sure to save this data?',
                                width: 300,
                                closable: false,
                                buttons: Ext.Msg.YESNO,
                                buttonText:
                                        {
                                            yes: 'YES',
                                            no: 'CANCEL'
                                        },
                                multiline: false,
                                fn: function (buttonValue, inputText, showConfig) {
                                    if (buttonValue == 'yes') {
                                        me.dataSave();
                                    }
                                },
                                icon: Ext.Msg.QUESTION
                            });
                        }
                    }
                }

            },
            'coaformdata button[action=cancel]': {
                click: this.formDataClose
            },
            /*
             'coaformimport [name=project_id]': {
             select: function () {
             var value = this.getFormimport().down("[name=project_id]").getValue();
             var storept = me.getStore('Projectpt');//mendapatkan store
             storept.load({ params: {
             hideparam: 'dependcombobox',
             project_id: value
             },
             callback: function (records, operation, success) {    
             //storept.filter('project_id', value);
             },
             scope: this
             });
             }
             },
             });
             },
             */
            'coaformimport [name=project_id]': {
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
                        //me.getFormimport().down("[name=fromlevel]").setReadOnly(false);
                        //me.getFormimport().down("[name=untillevel]").setReadOnly(false);
                        me.getFormimport().down("button[action=import]").disable(false);
                    } else {
                        me.getFormimport().down("[name=pt_id]").setDisabled(true);
                        // me.getFormimport().down("[name=fromlevel]").setReadOnly(true);
                        // me.getFormimport().down("[name=untillevel]").setReadOnly(true);
                        me.getFormimport().down("button[action=import]").disable(true);
                    }


                }

            },
            'coaformimport [name=pt_id]': {
                select: function () {
                    var project_id, pt_id, formvalue, info = '';

                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('checkcoabyptproject');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'gl/coa/create',
                        method: 'POST',
                        params: {data: Ext.encode(formvalue)},
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.getFormimport().setLoading(false);

                            if (info.total < 1) {
                                Ext.Msg.show({
                                    title: 'WARNING',
                                    msg: 'Sorry COA in Project : ' + project_id + ' With  ' + pt_id + ' Not Exist',
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
            'coaformimport button[action=import]': {
                click: function () {
                    var project_id, pt_id, formvalue, info = '';
                    project_id = this.getFormimport().down("[name=project_id]").getRawValue();
                    pt_id = this.getFormimport().down("[name=pt_id]").getRawValue();

                    me.getFormimport().down("[name=hideparam]").setValue('importdata');
                    formvalue = me.getFormimport().getForm().getValues();
                    me.getFormimport().setLoading('Please Wait...');
                    Ext.Ajax.request({
                        url: 'gl/coa/create',
                        method: 'POST',
                        params: {data: Ext.encode(formvalue)},
                        success: function (response) {
                            info = Ext.JSON.decode(response.responseText);
                            me.getFormimport().setLoading(false);
                            var store = me.getStore('Coa');//mendapatkan store
                            store.reload();

                            if (info.total < 1) {
                                Ext.Msg.show({
                                    title: 'SUCCESS',
                                    msg: 'COA in Project : ' + project_id + ' With  ' + pt_id + ' Success to import',
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
    dependCombobox: function (url, controller, param) {
        var formvalue, info = '';
        controller.getFormimport().down("[name=hideparam]").setValue(param);
        formvalue = controller.getFormimport().getForm().getValues();

        Ext.Ajax.request({
            url: url,
            method: 'POST',
            params: {data: Ext.encode(formvalue)},
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                if (info.parameter == 'dependcombobox') {
                    resetTimer();
                    alert(info.parameter);
                } else {

                }
            },
            failure: function (response) {
            }
        });

    },
    loadPage: function (store) {
        store.loadPage(1, {
            callback: function () {
                //function for load store
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
        //console.log(storeproject.getTotalCount());
        // me.getStore('Masterdata.store.Project').load();

        //alert('test');
        //me.getStore('Masterdata.store.Projectpt').load();
    },
    formDataAfterRenderCustome: function () {
        var me, grid, store, storecombo, record, row;
        me = this;

        if (me.stateform == 'update') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            row = record['data'];
            me.getFormdata().loadRecord(record);
            if (row.group_gl == '1') {
                me.setValueCombobox(me, "group_gl", "01", "Active");
            } else if (row.group_gl == '2') {
                me.setValueCombobox(me, "group_gl", "02", "Passive");
            }
            this.buildLevelCOA('gl/coa/create', me, 'buildlevel', 'level');

        }

    }
});