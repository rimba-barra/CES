Ext.define('Cashier.controller.Masterbudgetcoa', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.Masterbudgetcoa',
    requires: [
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.combobox.Departmentcombobox',
    ],
    views: [
        'masterbudgetcoa.FormDataDepartment',
    ],
    stores: [
        'Department'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterbudgetcoapanel'
        },
        {
            ref: 'grid',
            selector: 'masterbudgetcoagrid'
        },
        {
            ref: 'formdata',
            selector: 'masterbudgetcoaformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterbudgetcoaformsearch'
        },
        {
            ref: 'formdataupload',
            selector: 'masterbudgetcoaformdataupload'
        },

        {
            ref: 'formdatadepartment',
            selector: 'masterbudgetcoaformdatadepartment'
        },
    ],
    stores: [
        'Department'
    ],
    controllerName: 'masterbudgetcoa',
    fieldName: 'coa',
    bindPrefixName: 'Masterbudgetcoa',
    formxWinId: 'win-masterbudgetcoawinId',
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
            'masterbudgetcoaformsearch [name=projectpt_id]': {
                change: function (el) {
                    var me = this
                    var f = me.getFormsearch();

                    if (el.valueModels !== null) {
                        var data_pt_id = el.valueModels[0].data.pt_id;
                        var data_project_id = el.valueModels[0].data.project_project_id;
                        f.down("[name=pt_id]").setValue(parseInt(data_pt_id));
                        f.down("[name=project_id]").setValue(parseInt(data_project_id));    
                        el.value = data_pt_id;
                    }

                    var value = el.value;
                    // me.setprojectpt(el.name, el.ownerCt, 'project_id');
                    
                    var project_id = f.down("[name=project_id]").getValue();
                    var pt_id = f.down("[name=pt_id]").getValue();
                    me.loaddatadept(project_id, pt_id);
                }
            },

            'masterbudgetcoaformsearch [name=department_id]': {
                change: function (el) {
                    var fs = me.getFormsearch(); 
                    var project_id = fs.down("[name=project_id]").getValue();
                    var pt_id = fs.down("[name=pt_id]").getValue();

                    me.loaddatadept(project_id, pt_id);
                }
            },
            'masterbudgetcoagrid toolbar button[action=generate]': {
                click: function (el, act) {
                    var state = 'generate';
                    me.generateCoa();
                }
            },
            'masterbudgetcoagrid toolbar button[action=upload]': {
                click: function(el, act) {
                    me.instantWindow('FormDataUpload', 500, 'Upload Budget COA', 'create', 'myInstantWindow', me.controllerName);
                }
            },
            'masterbudgetcoagrid toolbar button[action=export]': {
                click: me.exportData
            },
            'masterbudgetcoagrid toolbar button[action=destroy]': {
                click: function() {

                    var rows = me.getGrid().getSelectionModel().getSelection();
                    var isSummary = 0;
                    rows.forEach(function(rec) {
                        if (rec.get('department_id') == '' || rec.get('department_id') == 0) {
                            isSummary = 1;
                        }
                    })

                    if (isSummary == 1) {
                        me.tools.alert.warning("Cannot delete summary record")
                        return false;
                    } else {
                        me.dataDestroy();
                    }
                }
            },
            'masterbudgetcoaformdata [xtype=xmoneyfield]': {
                change: function (el) {
                    var value = el.value;
                    var name = el.name;
                    var f = me.getFormdata();
                    if (name != 'total') {
                        if (value.length > 0) {
                            me.sumTotal();
                        }    
                    }
                    
                }
            },
            'masterbudgetcoaformdata [xtype=xmoneyfield]': {
                change: function (el) {
                    var value = el.value;
                    var name = el.name;
                    var f = me.getFormdata();
                    if (name != 'total') {
                        if (value.length > 0) {
                            me.sumTotal();
                        }    
                    }
                }
            },
            'masterbudgetcoaformdataupload [name=file-path]': {
                change: function(el) {
                    this.validatefiletype(el);
                }
            },
            'masterbudgetcoaformdataupload  button[action=upload]': {
                click: function () {
                    this.UploadJournal();
                }
            },
            'masterbudgetcoaformdatadepartment [name=file-path]': {
                change: function(el) {
                    this.validatefiletype(el);
                }
            },
            'masterbudgetcoagrid toolbar button[action=department]': {
                click: function () {
                    var grid = me.getGrid();
                    var storear = grid.getStore();

                    var myData = storear.data['keys'].length;
                    if(myData>0){
                        me.instantWindow('FormDataDepartment', 350, 'Delete Selected Department', 'create', 'myInstantWindow', me.controllerName);
                    }else{
                        Ext.MessageBox.show({
                        title: 'Informasi',
                        msg: 'Tidak ada data.',
                        buttons: Ext.MessageBox.CANCEL,
                        icon: Ext.MessageBox.INFO
                    });
                    }
                    
                }
            },
            'masterbudgetcoaformdatadepartment toolbar button[action=departmentDel]': {
                click: function () {
                    var form = me.getFormdatadepartment();
                    var department = form.down("[name=department_id_del]").getValue();
                    if (department == null ) {
                        Ext.MessageBox.show({
                            title: 'Informasi',
                            msg: 'Pilih Department yang akan dihapus.',
                            buttons: Ext.MessageBox.CANCEL,
                            icon: Ext.MessageBox.INFO
                        });
                    }else{
                        this.DepartmentDelete();
                    }
                }
            },
            'masterbudgetcoaformdatadepartment': {
                afterrender: function () {
                    var me =this;
                    // me.getStore('Department').load();
                    var fs = me.getFormsearch();
                    var projectId = fs.down("[name=project_id]").getValue();
                    var ptId = fs.down("[name=pt_id]").getValue();

                    this.loaddatadept2(projectId, ptId);
                }
            },
            // 'masterbudgetcoaformsearch [name=pt_pt_id]': {
            //     change: function (el) {
            //         var value = el.value;
            //         me.ptChange(value);
            //     }
            // },
            'masterbudgetcoagrid toolbar button[action=deleteall]': {
                click: function() {
                    var fs = me.getFormsearch(); 
                    var year = fs.down("[name=year]").getValue();
                    var grid = me.getGrid();
                    var storear = grid.getStore();

                    var myData = storear.data['keys'].length;

                    if(myData>0){
                        Ext.MessageBox.show({
                        title: 'Delete All Data',
                        msg: 'Data di periode '+year+' akan dihapus sesuai filter yang anda pilih, apakah anda yakin?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        icon: Ext.MessageBox.WARNING,
                        fn: function(btn){
                            if(btn == 'ok'){
                                grid.setLoading('Please wait');
                                me.dataDeleteAll();
                                storear.load({
                                    callback: function () {
                                        grid.setLoading(false);
                                    }
                                });
                            } else {
                                return;
                            }
                        }
                    });
                    }else{
                        Ext.MessageBox.show({
                            title: 'Informasi',
                            msg: 'Tidak ada data.',
                            buttons: Ext.MessageBox.CANCEL,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                    
                    // var rows = me.getGrid().getAllRange().getSelectionModel().selectAll();
                    
                }
            }
        });
    },
    formDataAfterRender: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var state = el.up('window').state;
        me.fdar().init();
        if (state == 'create') {


        } else if (state == 'update') {

            var rows = me.getGrid().getSelectionModel().getSelection();
            var isSummary = 0;
            rows.forEach(function(rec) {
                if (rec.get('department_id') == '' || rec.get('department_id') == 0) {
                    isSummary = 1;
                }
            })

            if (isSummary == 1) {
                f.down("[action=save]").setDisabled(false);
            }
            
            me.setActiveForm(f);
            var rec = g.getSelectedRecord();
            f.editedRow = g.getSelectedRow();
            f.getForm().loadRecord(rec);
            me.fdarUpdate(rec);
            me.formatCurrencyFormdata(me, f);
        }


    },
    dataSearch: function () {
        var me = this;
        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        var project_id = 0;
        var year = fields.year;
        document.getElementsByName("myYear")[0].value = 'Periode : '+year;
        
        if (me.getFormsearch().down("[name=projectpt_id]").valueModels[0] === undefined) {
            project_id = parseInt(apps.project);
        } else {
            project_id = me.getFormsearch().down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        }

        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.getProxy().setExtraParam('project_id', project_id);
        me.loadPage(store);
        me.getGrid().getStore().reload();

    },
    dataDeleteAll: function () {
        var me = this;
        var f = me.getGrid();
        var s = me.getFormsearch();
        var ptId = s.down("[name=pt_id]").getValue();
        var projectId = s.down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        var year = s.down("[name=year]").getValue();
        var journal_status = s.down("[name=journal_status]").getValue();
        var coa = s.down("[name=name]").getValue();
        var description = s.down("[name=description]").getValue();
        var department = s.down("[name=department_id]").getValue();
        var budget_type = s.down("[name=budget_type]").getValue();
        var coa_nl = s.down("[name=coa_nl]").getValue();

        me.tools.ajax({
            params: {
                pt_id: ptId,
                project_id: projectId,
                year: year,
                journal_status:journal_status,
                coa:coa,
                description:description,
                department_id:department,
                budget_type:budget_type,
                coa_nl:coa_nl
            },
            success: function (success,total) {
                    me.tools.alert.info("Data di tahun " +year+ " sudah dihapus.");
                    me.getGrid().getStore().reload();
                
            },
        }).read('deleteall');

    },
    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {
                module: me.controllerName
            },
            form: p,
            success: function (data, model) {

                try {
                    // me.tools.weseav3(data.pt, f.down("[name=projectpt_id]"), parseInt(apps.projectpt)).comboBox();
                    me.tools.weseav2(data.pt, f.down("[name=projectpt_id]")).comboBox('', function () {
                        var combostore = f.down('[name=projectpt_id]').getStore();
                        var record = combostore.findRecord('projectpt_id', parseInt(apps.projectpt));
                        if (record) {
                            f.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
                            var grid = me.getGrid();
                            grid.setLoading('Please wait');
                            var storear = grid.getStore();
                            var fields = f.getForm().getFieldValues();
                            for (var x in fields) {
                                storear.getProxy().setExtraParam(x, fields[x]);
                            }
                            storear.getProxy().setExtraParam('project_id', f.down("[name=projectpt_id]").valueModels[0].data.project_project_id);
                            storear.load({
                                callback: function () {
                                    grid.setLoading(false);
                                }
                            });
                        }
                    });
                    // me.tools.wesea(data.pt, f.down("[name=pt_pt_id]")).comboBox();
                    me.tools.wesea(data.year, f.down("[name=year]")).comboBox();
                    me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox('', function() {
                        var deptstore = f.down("[name=department_id]").getStore();
                        var dept_id_first = deptstore.data.items[0].data.department_id;
                        f.down("[name=department_id]").setValue(dept_id_first);

                        deptstore.insert(1, [{department_id: 999998, name: '-- SUMMARY --'}])
                    });
                    console.log(apps);
                    f.down('[name=projectpt_id]').setValue(parseInt(apps.projectpt));
                    f.down('[name=pt_id]').setValue(parseInt(apps.pt));
                    f.down('[name=project_id]').setValue(parseInt(apps.project));

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    loaddatadept: function(project_id, pt_id) {
        var me = this;
        var f = me.getFormsearch();
        var p = me.getPanel();

        me.tools.ajax({
            params: {
                module: me.controllerName,
                value: project_id,
                value2: pt_id
            },
            form: p,
            success: function (data, model) {
                try {
                    
                    me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox('', function() {
                        var deptstore = f.down("[name=department_id]").getStore();
                        // var dept_id_first = deptstore.data.items[0].data.department_id;
                        // f.down("[name=department_id]").setValue(dept_id_first);

                        deptstore.insert(1, [{department_id: 999998, name: '-- SUMMARY --'}])
                    });

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('departmentdelete');
    },
    ptChange: function (val) {
        var me = this;
        var f = me.getFormsearch();
        f.down("[name=pt_id]").setValue(val);
    },
    sumTotal: function (total) {
        var me = this;
        var form = me.getFormdata();
        var f = form.getValues();
        var arr = {
            jan: f.jan,
            feb: f.feb,
            mar: f.mar,
            apr: f.apr,
            may: f.may,
            jun: f.jun,
            jul: f.jul,
            aug: f.aug,
            sep: f.sep,
            oct: f.oct,
            nov: f.nov,
            dec: f.dec,
        };

        var summed = 0 ;
        for (var key in arr) {
            summed += accounting.unformat(arr[key]);
        }
        form.down('[name=total]').setValue(accounting.formatMoney(summed));
    },
    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        me.tools.iNeedYou(me).save(false, function (data)
        {
            data.deletedRows = fa.deletedRows;
            return data;
        }
        );


    },
    generateCoa: function () {
        var me = this;
        var f = me.getGrid();
        var s = me.getFormsearch();
        var ptId = s.down("[name=pt_id]").getValue();
        var projectId = s.down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        var year = s.down("[name=year]").getValue();
        var budget_type = s.down("[name=budget_type]").getValue();


        if (ptId == null || ptId == '') {
            me.tools.alert.warning("Please select Company on search panel.");
            return false;
        }

        if (year == null || year == '') {
            me.tools.alert.warning("Please select Year on search panel.");
            return false;
        }

        f.setLoading('Generate from master COA');
        me.tools.ajax({
            params: {
                pt_id: ptId,
                project_id: projectId,
                year: year,
                budget_type : budget_type
            },
            success: function (data, model) {


                if (data['HASIL'][0][0]['hasil'] === 'empty') {
                    me.tools.alert.warning("Master COA is empty for selected company.");
                } else if (data['HASIL'][0][0]['hasil'] === 'error') {
                    me.tools.alert.warning("Already Generated.");
                } else if (data['HASIL'][0][0]['hasil'] === 'valid') {
                    me.getGrid().getStore().reload();
                    me.dataSearch();
                } else {
                    f.getStore().reload();
                    me.dataSearch();
                }
                f.setLoading(false);
            },
        }).read('generatecoa');
    },
    exportData: function() {
        var me = this;
        var fs = me.getFormsearch();
        var project_id = fs.down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        var pt_id = fs.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        var pt_name = fs.down("[name=projectpt_id]").valueModels[0].data.name;
        var periode = fs.down("[name=year]").getValue();
        var budget_type = fs.down("[name=budget_type]").getValue();

        Ext.getBody().mask("Please wait...");
        Ext.Ajax.timeout = 60000 * 30;
        me.tools.ajax({
            params: {
                project_id: project_id,
                pt_id: pt_id,
                periode: periode,
                pt_name: pt_name,
                budget_type : budget_type,
                module: me.controllerName
            },
            form: fs,
            success: function(response) {
                me.info = response;
                me.setSuccessEventExport();

                Ext.getBody().unmask();
            }
        }).read('export');
    },
    setSuccessEventExport: function () {

        var me = this;
        Ext.getBody().unmask();
        var file_path = me.info.url;  
        var a = document.createElement('A');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        Ext.getBody().unmask();
    },
    validatefiletype: function(el) {
        
        var indexofPeriod = el.getValue().lastIndexOf("."),
        uploadedExtension = el.getValue().substr(indexofPeriod + 1, el.getValue().length - indexofPeriod);

        var fullPath = el.getValue();
        var lastIndex = fullPath.lastIndexOf('\\');
        var fileName = fullPath.substring(lastIndex + 1);

        var allowedExtns = ['csv','xls','xlsx'];
        if (!Ext.Array.contains(allowedExtns, uploadedExtension.toLowerCase())) {
            el.setActiveError('Please Use csv/xlsx/xls or txt File Format!');
            Ext.MessageBox.show({
                title: 'File Type Error',
                msg: 'Please Use csv/xlsx/xls or txt File Format!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            el.setRawValue(null);
            return;
        }
        el.setRawValue(fileName);
    },
    UploadJournal: function(){
        var me = this;
        var f = me.getFormdata();
        var form = me.getFormdataupload();

        var filename = form.down("[name=file-path]").getValue();
        if (filename == "" || filename == null) {
            Ext.MessageBox.show({
                title: 'Invalid file',
                msg: 'Please select files to upload',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        Ext.MessageBox.show({
        title: 'Icon Support',
        msg: 'Are you sure you want to proceed?',
        buttons: Ext.MessageBox.OKCANCEL,
        icon: Ext.MessageBox.WARNING,
        fn: function(btn){
            if(btn == 'ok'){
            SomeFunc();
            } else {
                return;
            }
        }
    });


        form.down("[name=mode_read]").setValue('upload');
        if(true){
            form.submit({
                url: 'cashier/masterbudgetcoa/read',
                waitMsg: 'Processing data...',
                params: {
                    module: me.controllerName,
                    mode_read: 'upload'
                },
                success: function(fp, o) {

                    var result = o.result;
                    var success = result.result.success;
                    var failed = result.result.failed;

                    form.up('window').close();
                    me.getGrid().getStore().reload();

                    me.tools.alert.info("Upload success. " + success + "/" + (success + failed) + " data has been inserted.");
                    return false;
                },
                failure: function(fp, o) {

                    form.up('window').close();
                    me.getGrid().getStore().reload();

                    me.tools.alert.error("An error has occured.");
                    return false;
                }
            });
        }
    },
    DepartmentDelete: function(){
        var me = this;
        var f = me.getFormdata();
        var form = me.getFormdatadepartment();
        var f = me.getGrid();
        var s = me.getFormsearch();
        var ptId = s.down("[name=pt_id]").getValue();
        var projectId = s.down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        var year = s.down("[name=year]").getValue();
        var journal_status = s.down("[name=journal_status]").getValue();
        var coa = s.down("[name=name]").getValue();
        var description = s.down("[name=description]").getValue();
        var department = form.down("[name=department_id_del]").getValue();
        var budget_type = s.down("[name=budget_type]").getValue();
        var coa_nl = s.down("[name=coa_nl]").getValue();
        
        me.tools.ajax({
            params: {
                pt_id: ptId,
                project_id: projectId,
                year: year,
                journal_status:journal_status,
                coa:coa,
                description:description,
                department_id:department,
                budget_type:budget_type,
                coa_nl:coa_nl
            },
            success: function (success) {
                    form.up('window').close();
                    me.tools.alert.info("Data department berhasil dihapus.");
                    me.getGrid().getStore().reload();
                
            },
        }).read('deleteDepartment');
    },
    loaddatadept2: function(project_id, pt_id) {
        var me = this;
        var f = me.getFormdatadepartment();
        var p = me.getPanel();
        me.tools.ajax({
            params: {
                module: me.controllerName,
                value: project_id,
                value2: pt_id
            },
            success: function (data, model) {
                try {
                    
                    me.tools.wesea(data.department, f.down("[name=department_id_del]")).comboBox('', function() {
                        var deptstoredel = f.down("[name=department_id_del]").getStore();
                    });

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('departmentdelete');
    },
});
