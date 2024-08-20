/*  JS CONTROLLER FOR 'Approvalmatrix' */

Ext.define('Hrd.controller.Approvalmatrix', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Approvalmatrix',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'approvalmatrix',
    fieldName: 'employee_id',
    bindPrefixName: 'Approvalmatrix',
    formWidth: 850,
    localStore: {},
    editingIndexRow: 0,
    refs: [
        {
            ref: 'griddetail',
            selector: 'approvalmatrixgriddetail'
        },
        {
            ref: 'formdatadetail',
            selector: 'approvalmatrixformdatadetail'
        },
        {
            ref: 'formpackagedocument',
            selector: 'packagemanagementformpackagedocument'
        }
    ],
    dr: null,
    header_id: 0,
    employee_id: 0,
    checkpackagedockument: null,
    arraydata: null,
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dr = new Hrd.library.box.tools.Dynamicrequest();
        var newEvs = {};

        newEvs['approvalmatrixgrid button[action=applyall]'] = {
            click: function () {
                me.Applyselected();
            }
        };
        newEvs['approvalmatrixgriddetail button[action=addDetail]'] = {
            click: function () {
                me.addDetail('create');
            }
        };

        newEvs['approvalmatrixformdata'] = {
            boxready: function () {
                var me, form, packagedocument;
                me = this;
                form = me.getFormdata();
                packagedocument = me.dr.getVal(form, 'pmdocument_id', 'value');
                if (packagedocument == null || packagedocument == '') {
                    me.checkpackagedockument = null;
                } else {
                    me.checkpackagedockument = packagedocument;
                }
            }
        };
        newEvs['packagemanagementformpackagedocument'] = {
            afterrender: function () {
                var me, form,datafilter;
                me = this;
                form = me.getFormpackagedocument();
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                        datafilter = me.filterPackagedocument(data.packagedocument);
                        me.tools.wesea(datafilter, form.down("[name=pmdocument_id]")).comboBox();
                    }
                }).read('headerdata');

            },
           
        };

        newEvs['packagemanagementformpackagedocument button[action=save]'] = {
            click: function () {
                me.saveApplyPackagedocument();
            }
        };

        newEvs['approvalmatrixformdata button[action=close]'] = {
            click: function () {
                me.checkDataHeadBeforeClose();
            }
        };


        newEvs['approvalmatrixformdatadetail'] = {
            afterrender: me.fddar
        };

        newEvs['approvalmatrixformdatadetail button[action=save]'] = {
            click: function () {
                me.saveDetail();
            }
        };

        newEvs['approvalmatrixgriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        };

        newEvs['approvalmatrixformdatadetail combobox[name=department_id]'] = {
            select: me.tcb
        };
        newEvs['approvalmatrixformdatadetail combobox[name=project_id]'] = {
            select: me.tcb
        };
        newEvs['approvalmatrixformdatadetail combobox[name=pt_id]'] = {
            select: me.tcb
        };

        this.control(newEvs);
    },

    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                me.tools.wesea(data.project, f.down("[name=project_id]")).comboBox();
                me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();

                f.down("[name=project_id]").setValue(parseInt(apps.project));
                f.down("[name=pt_id]").setValue(parseInt(apps.pt));
            }
        }).read('listdept');
    },

    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);


        var x = {
            init: function () {},
            create: function () {
                me.unMask(1);
            },
            update: function () {
                me.unMask(1);

                f.down('#btnSave').setVisible(false);
                f.down('#btnClose').setText('Close');

                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (rec) {
                    f.editedRow = g.getSelectedRow();
                    me.tools.ajax({
                        params: {},
                        success: function (data, model) {      
                            var datafilter = me.filterPackagedocument(data.packagedocument);
                            me.tools.wesea(datafilter, f.down("[name=pmdocument_id]")).comboBox();
                            f.loadRecord(rec);
                            me.header_id = rec.data.approvalmatrix_id;
                            me.employee_id = rec.data.employee_id;
                            me.checkpackagedockument = rec.data.pmdocument_id;
                            me.filterPackagedocument(f);

                        }
                    }).read('headerdata');
                    var employee_id = rec.data.employee_id;
                    var detailGrid = me.getGriddetail();

                    detailGrid.doInit();
                    detailGrid.getStore().load({
                        params: {
                            employee_id: employee_id
                        },

                        callback: function (recs, op) {
                            detailGrid.attachModel(op);
                        }
                    });
                }
            }
        };

        return x;
    },

    mainDataSave: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;

        me.insSave({
            form: f,
            grid: g,
            finalData: function (data) {
                return data;
            },
            sync: true,
            callback: {
                create: function (store, form, grid) {}
            }
        });
    },

    addDetail: function (state) {
        var me = this;
        var win = new Ext.Window({
            modal: true,
            closable: true,
            id: 'add_detail',
            width: 500,
            //height      : 500,
            layout: 'auto',
            autoScroll: true,
            state: state,
            listeners: {
                boxready: function () {
                    win.body.mask('Loading...');
                    var tm = setTimeout(function () {
                        win.add(Ext.create('Hrd.view.approvalmatrix.FormDataDetail'));
                        win.center();
                        win.body.unmask();
                        clearTimeout(tm);
                    }, 1000);
                },
            }
        });
        win.show();
    },

    fddar: function () {
        var me = this;
        var f = me.getFormdatadetail();
        var mainFormData = me.getFormdata();

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.project, f.down("[name=project_id]")).comboBox();
                me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();
                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                me.tools.wesea(data.employeeall, f.down("[name=penilai_id]")).comboBox();
                me.tools.wesea(data.approvallevel, f.down("[name=approvallevel_id]")).comboBox();
                me.tools.wesea(data.department, f.down("[name=docdept_id]")).comboBox();


                var state = f.up('window').state;
                if (state == 'create') {
                    f.down("[name=employee_id]").setValue(mainFormData.down("[name=employee_id]").getValue());
                    f.down("[name=project_id]").setValue(parseInt(mainFormData.down("[name=project_id]").getValue()));
                    f.down("[name=pt_id]").setValue(parseInt(mainFormData.down("[name=pt_id]").getValue()));
                    f.down("[name=department_id]").setValue(parseInt(mainFormData.down("[name=department_id]").getValue()));
                    me.tcb();
                } else if (state == 'edit') {
                    var gr = me.getGriddetail();
                    var record = gr.getStore().getAt(me.editingIndexRow);
                    f.loadRecord(record);
                }
            }
        }).read('listdetailcb');



    },

    saveDetail: function () {
        var me = this;
        var f = me.getFormdatadetail();

        var approvalmatrix_id = f.down("[name=approvalmatrix_id]").getValue();
        var employee_id = f.down("[name=employee_id]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var department_id = f.down("[name=department_id]").getValue();
        var penilai_id = f.down("[name=penilai_id]").getValue();
        var approvallevel_id = f.down("[name=approvallevel_id]").getValue();
        var docdept_id = f.down("[name=docdept_id]").getValue();
        var is_plan_approval = f.down("[name=is_plan_approval]").getValue();
        var is_midyear_evaluation = f.down("[name=is_midyear_evaluation]").getValue();
        var is_endyear_evaluation = f.down("[name=is_endyear_evaluation]").getValue();

        if (!project_id || !pt_id || !department_id || !penilai_id || !approvallevel_id || !docdept_id) {
            Ext.Msg.alert('Info', 'All field should be filled');
        } else {
            var state = f.up('window').state;
            var readAction = '';
            if (state == 'create') {
                readAction = 'savedetail';
            } else if (state == 'edit') {
                readAction = 'editdetail';
            }

            var data = {
                approvalmatrix_id: approvalmatrix_id,
                employee_id: employee_id,
                project_id: project_id,
                pt_id: pt_id,
                department_id: department_id,
                penilai_id: penilai_id,
                approvallevel_id: approvallevel_id,
                docdept_id: docdept_id,
                is_plan_approval: is_plan_approval,
                is_midyear_evaluation: is_midyear_evaluation,
                is_endyear_evaluation: is_endyear_evaluation
            };

            me.tools.ajax({
                params: {data: Ext.encode(data)},
                success: function (data, model) {
                    //console.log(data.others[0][0].success);
                    if (data.others[0][0].success) {
                        //console.log('save detail');
                        //Ext.Msg.alert('Info', 'Data Saved');
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully.',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function () {
                                f.up('window').close();
                                var detailGrid = me.getGriddetail();
                                detailGrid.doInit();
                                detailGrid.getStore().load({
                                    params: {
                                        employee_id: employee_id
                                    },

                                    callback: function (recs, op) {
                                        detailGrid.attachModel(op);
                                    }
                                });

                                var gridStore = me.getGrid().getStore();
                                gridStore.reload();
                            }
                        });

                    } else {
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Failed to Save Data',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            }).read(readAction);
        }
    },

    gridDetailActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var gr = me.getGriddetail();
        var record = gr.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);

        if (m) {
            switch (m[1]) {
                case 'edit':
                    me.addDetail('edit');
                    me.editingIndexRow = row;
                    break;
                case 'destroy':
                    Ext.Msg.confirm('Delete Data', 'Delete Selected Record?', function (btn) {
                        if (btn == 'yes') {
                            //console.log(record.data.approvalmatrix_id);
                            var data = {
                                approvalmatrix_id: record.data.approvalmatrix_id
                            };

                            me.tools.ajax({
                                params: {data: Ext.encode(data)},
                                success: function (data, model) {
                                    if (data.others[0][0].success) {
                                        Ext.Msg.show({
                                            title: 'Success',
                                            msg: 'Delete data successfully.',
                                            icon: Ext.Msg.INFO,
                                            buttons: Ext.Msg.OK,
                                            fn: function () {
                                                var detailGrid = me.getGriddetail();
                                                detailGrid.doInit();
                                                detailGrid.getStore().load({
                                                    params: {
                                                        employee_id: record.data.employee_id
                                                    },

                                                    callback: function (recs, op) {
                                                        detailGrid.attachModel(op);
                                                    }
                                                });

                                                var gridStore = me.getGrid().getStore();
                                                gridStore.reload();
                                            }
                                        });

                                    } else {
                                        Ext.Msg.show({
                                            title: 'Failure',
                                            msg: 'Failed to Delete Data',
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                }
                            }).read('deletedetail');
                        }
                    });
                    break
            }
        }
    },

    listEmp: function () {
        var me = this;
        var f = me.getFormdatadetail();

        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var dept_id = f.down("[name=department_id]").getValue();

        var penilaiCombo = f.down("[name=penilai_id]");//Ext.getCmp("penilai_id");

        penilaiCombo.setValue(0);
        var store = penilaiCombo.getStore();
        store.clearFilter();

        //store.filterBy(function(recod){return recod.data.department_id==dept_id && recod.data.project_id==project_id && recod.data.pt_id==pt_id;});
    },

    //for callback (function in function)
    tcb: function () {
        var me = this;
        me.listEmp();
    },
    filterPackagedocument: function (param) {
        //yang ditampilkan hanya yang berstatus is_approve = yes    
        var datahasfilter =[];
         Ext.each(param.data, function (value) {
             if(value.is_approve=='yes'){
                  datahasfilter.push(value);
             }           
        });
       return {'data':datahasfilter,'model':param.model};
    },
    parampackagecodument: {
        //start formgeneate
        fromlocation: 'Hrd.view.approvalmatrix.FormPackageDocument',
        formtitle: 'PACKAGE DOCUMENT', formicon: 'icon-form-add',
        formid: 'win-packagemanagementformpackagedocument', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate       
    },
    checkDataHeadBeforeClose: function () {
        var me, form, packagedocument, oldpackagedocument;
        me = this;
        form = me.getFormdata();
        packagedocument = me.dr.getVal(form, 'pmdocument_id', 'value');
        if (packagedocument == null || packagedocument == '') {
            form.up('window').close();
        } else {
            oldpackagedocument = me.checkpackagedockument;
            if (oldpackagedocument !== packagedocument && oldpackagedocument !== null && oldpackagedocument !== '') {
                me.confirmbeforeSave('Data Package Dokument akan di update, apakah anda yakin ?');
            } else if (oldpackagedocument == null || oldpackagedocument == '') {
                me.confirmbeforeSave('Data Package Dokument akan di simpan, apakah anda yakin ?');
            } else {
                form.up('window').close();
            }
        }

    },
    confirmbeforeSave: function (msg) {
        var me;
        me = this;
        Ext.Msg.show({
            title: 'Save',
            msg: msg,
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
                    me.savePackagedocument();
                } else {
                    me.clearParam();
                    me.getFormdata().up('window').close();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    Applyselected: function () {
        var me, grid, rows;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            me.parampackagecodument.stateform = 'Apply All Package Document';
            me.dr.GenerateFormdata(me.parampackagecodument);
            me.arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                me.arraydata.push(rows[i]['data'].employee_id);
            }
        }
    },
    saveApplyPackagedocument: function () {
        //save data to table employee
        var me, form, data, row, counter, countarray;
        me = this;
        form = me.getFormpackagedocument();
        me.dr.formMask(form);
        data = me.arraydata;
        countarray = data.length;
        counter = 0;
        Ext.each(data, function (value) {
            counter++;
            me.tools.ajax({
                params: {
                    'approvalmatrix_id': 0,
                    'employee_id': value,
                    'pmdocument_id': me.dr.getVal(form, 'pmdocument_id', 'value'),
                },
                success: function (data, model) {
                    me.clearParam();
                }
            }).read('updatepackagedocument');
        });

        if (countarray == counter) {
            me.clearParam();
            me.dr.buildSuccessAlert('Data success update');
            me.dr.formUnmask(form);
            me.dr.formClose(form);
            me.getGrid().getStore().reload();
        }

    },
    savePackagedocument: function () {
        //save data to table employee
        var me, form;
        me = this;
        form = me.getFormdata();
        me.dr.formMask(form);
        me.tools.ajax({
            params: {
                'approvalmatrix_id': me.header_id,
                'employee_id': me.employee_id,
                'pmdocument_id': me.dr.getVal(form, 'pmdocument_id', 'value'),
            },
            success: function (data, model) {
                me.clearParam();
                me.dr.buildSuccessAlert('Data success update');
                me.dr.formUnmask(form);
                me.dr.formClose(form);
                me.getGrid().getStore().reload();
            }
        }).read('updatepackagedocument');

    },
    clearParam: function () {
        var me;
        me = this;
        me.header_id = 0;
        me.employee_id = 0;
        me.checkpackagedockument = null;
    }
});