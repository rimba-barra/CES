Ext.define('Cashier.controller.Masterbudgetcashflow', {
    extend: 'Cashier.template.ControllerForMaster',
    requires: [
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.combobox.Departmentcombobox',
    ],
    alias: 'controller.Masterbudgetcashflow',
    stores: [
        'Department'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterbudgetcashflowpanel'
        },
        {
            ref: 'grid',
            selector: 'masterbudgetcashflowgrid'
        },
        {
            ref: 'formdata',
            selector: 'masterbudgetcashflowformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterbudgetcashflowformsearch'
        },
        {
            ref: 'formdataupload',
            selector: 'masterbudgetcashflowformdataupload'
        }
    ],
    controllerName: 'masterbudgetcashflow',
    fieldName: 'coa',
    bindPrefixName: 'Masterbudgetcashflow',
    formxWinId: 'win-masterbudgetcashflowwinId',
    generateCFYear : new Date().getFullYear(),
    info: null,
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});


        this.control({
            'masterbudgetcashflowgrid toolbar button[action=generate]': {
                click: function (el, act) { 
                    Ext.MessageBox.show({
                        title: 'Confirmation',
                        msg: 'Apakah anda yakin ingin mengenerate data Master Budget Cashflow?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        icon: Ext.MessageBox.WARNING,
                        fn: function(btn){
                            if(btn == 'ok'){
                                me.validate();
                            }
                        }
                    });
                }
            },
            'masterbudgetcashflowformsearch [name=department_id]': {
                change: function (el) {
                    var fs = me.getFormsearch(); 
                    var project_id = fs.down("[name=project_id]").getValue();
                    var pt_id = fs.down("[name=pt_id]").getValue();

                    // me.loaddatadept(project_id, pt_id);
                }
            },
            'masterbudgetcashflowgrid toolbar button[action=upload]': {
                click: function(el, act) {
                    me.instantWindow('FormDataUpload', 500, 'Upload Budget CF', 'create', 'myInstantWindow', me.controllerName);
                }
            },
            'masterbudgetcashflowgrid toolbar button[action=export]': {
                click: me.exportData
            },
            'masterbudgetcashflowformdata [xtype=xmoneyfield]': {
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
            'masterbudgetcashflowformdataupload [name=file-path]': {
                change: function(el) {
                    this.validatefiletype(el);
                }
            },
            'masterbudgetcashflowformdataupload button[action=upload]': {
                click: function () {
                    this.UploadJournal();
                }
            },
            'masterbudgetcashflowformsearch [name=projectpt_id]': {
                select: function (el) {
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
                    me.changePT(project_id, pt_id);
                    me.loaddatadept(project_id, pt_id);

                }
            },
            'masterbudgetcashflowgrid toolbar button[action=deleteall]': {
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
                }
            }
        });
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function () {
                me.fdarInit();

            },
            create: function () {
                me.unMask(1);
            },
            update: function () {

                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.getForm().loadRecord(rec);
                me.fdarUpdate(rec);
                me.formatCurrencyFormdata(me, f);

            }
        };
        return x;
    },
    dataSearch: function () {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        var project_id = 0;

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

    },
    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
        var cashflowtypeStore = f.down('[name=cashflowtype]').getStore("cashflowtypeStore");
        var coaStore          = f.down('[name=coa_cf]').getStore("coaStore");

        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data) {
                try {
                    me.storesearchData(data);
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

                    me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox('', function() {
                        var deptstore = f.down("[name=department_id]").getStore();
                        var dept_id_first = deptstore.data.items[0].data.department_id;
                        f.down("[name=department_id]").setValue(dept_id_first);

                        deptstore.insert(1, [{department_id: 999998, name: '- SUMMARY -'}])
                    });

                    f.down('[name=projectpt_id]').setValue(parseInt(apps.projectpt));
                    f.down('[name=pt_id]').setValue(parseInt(apps.pt));
                    f.down('[name=project_id]').setValue(parseInt(apps.project));
                    me.dataSearch();
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('detail');
    },
    ptChange: function (val) {
        var me = this;
        var f = me.getFormsearch();
        f.down("[name=pt_id]").setValue(val);
    },
    sumTotal: function () {
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
        var summed = 0;
        for (var key in arr) {
            summed += accounting.unformat(arr[key]);
        }
        ;
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
    validate: function () {
        var me = this;
        var f           = me.getGrid();
        var s           = me.getFormsearch();
        var ptId        = s.down("[name=pt_id]").getValue();
        var projectId   = s.down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        var year        = s.down("[name=year]").getValue();
        var budget_type = s.down("[name=budget_type]").getValue();

        f.setLoading('Generate from master CF');
        me.tools.ajax({
            params: {
                pt_id: ptId,
                project_id: projectId,
                year: year,
                budget_type: budget_type
            },
            success: function (data) {
                f.setLoading(false);
                me.changePT(projectId, ptId, 'generateCF');
                if (data[0][0].alert == 1) {
                    Ext.MessageBox.show({
                        title: 'Confirmation',
                        msg: data[0][0].message,
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.OKCANCEL,
                        fn: function(btn) {
                            if (btn == 'ok') {
                                me.generateCF();
                            }else{
                                return false;
                            }
                        }
                    });
                }else{
                    me.generateCF();
                }
            },
        }).read('validate');
    },
    generateCF: function () {
        var me = this;
        var f = me.getGrid();
        var s = me.getFormsearch();
        var ptId = s.down("[name=pt_id]").getValue();
        var projectId = s.down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        var year = s.down("[name=year]").getValue();
        var budget_type = s.down("[name=budget_type]").getValue();
        
        me.generateCFYear = year;
        f.setLoading('Generate from master CF');
        me.tools.ajax({
            params: {
                pt_id: ptId,
                project_id: projectId,
                year: year,
                budget_type: budget_type
            },
            success: function (data, model) {
                if (data['HASIL'][0]['hasil'] === 'empty') {
                    me.tools.alert.warning("Master CF is empty for selected company.");
                } else if (data['HASIL'][0]['hasil'] === 'error') {
                    me.tools.alert.warning("All Cashflow Already Generated.");
                } else {
                    me.dataSearch();
                }
                f.setLoading(false);
            },
        }).read('generatecf');
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

        var allowedExtns = ['csv', 'xls', 'xlsx'];
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

        form.down("[name=mode_read]").setValue('upload');
        if(true){
            form.submit({
                url: 'cashier/masterbudgetcashflow/read',
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
                        deptstore.insert(1, [{department_id: 999998, name: '- SUMMARY -'}])
                    });

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }


                p.setLoading(false);
            }
        }).read('department');
    },
    dataDeleteAll: function () {
        var me = this;
        var f = me.getGrid();
        var s = me.getFormsearch();
        var ptId = s.down("[name=pt_id]").getValue();
        var projectId = s.down("[name=projectpt_id]").valueModels[0].data.project_project_id;
        var year = s.down("[name=year]").getValue();
        var coa = s.down("[name=coa_cf]").getValue();
        var cashflowtype = s.down("[name=cashflowtype]").getValue();
        var department = s.down("[name=department_id]").getValue();
        var budget_type = s.down("[name=budget_type]").getValue();

        me.tools.ajax({
            params: {
                pt_id: ptId,
                project_id: projectId,
                year: year,
                coa:coa,
                cashflowtype:cashflowtype,
                department_id:department,
                budget_type:budget_type,
            },
            success: function (success,total) {
                    me.tools.alert.info("Data di tahun " +year+ " sudah dihapus.");
                    me.getGrid().getStore().reload();
                
            },
        }).read('deleteall');
    },
    changePT: function (project_id, pt_id, $mode=null) {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
        var budget_type = f.down("[name=budget_type]").getValue();

        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName, project_id: project_id, pt_id:pt_id, budget_type: budget_type},
            form: p,
            success: function (data) {
                try {
                    me.storesearchData(data, $mode);

                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('changept');
    },
    storesearchData: function(data, $mode=null){
        var me                = this;
        var f                 = me.getFormsearch();
        var cashflowtypeStore = f.down('[name=cashflowtype]').getStore("cashflowtypeStore");
        var coaStore          = f.down('[name=coa_cf]').getStore("coaStore");
        var yearStore         = f.down('[name=year]').getStore("yearStore");

        // ADD TO STORE
        var itemsearch    = data.search.cashflowtype_search;
        var itemsearchCOA = data.search.coa_search;
        var itemsearchYEAR = data.search.year_search;
        // CASHFLOW
        cashflowtypeStore.removeAll();
        cashflowtypeStore.clearFilter();
        cashflowtypeStore.add({
            cashflowtype_id     : 0,
            cashflowtype        : '- ALL CASHFLOW TYPE -',
        });
        for (let i = 0; i < itemsearch.length; i++) {
            cashflowtypeStore.add({
                cashflowtype_id: itemsearch[i].cashflowtype_id,
                cashflowtype   : itemsearch[i].cashflowtype
            });
        }

        // COA
        
        coaStore.removeAll();
        coaStore.clearFilter();
        coaStore.add(
            {
                coa_id     : 0,
                coa        : '- ALL COA -',
                description: 'Tampilkan Semua COA'
            },{
                coa_id     : -1,
                coa        : '- WITHOUT COA -',
                description: 'Tampilkan Tidak Ada COA'
            }
        );
        for (let i = 0; i < itemsearchCOA.length; i++) {
            coaStore.add({
                coa_id     : itemsearchCOA[i].coa_id,
                coa        : itemsearchCOA[i].coa,
                description: itemsearchCOA[i].description
            });
        }

        //YEAR
        
        yearStore.removeAll();
        yearStore.clearFilter();
        for (let i = 0; i < itemsearchYEAR.length; i++) {
            yearStore.add({
                year: itemsearchYEAR[i].year,
                txt : itemsearchYEAR[i].year,
            });
        }

        f.down('[name=coa_cf]').setValue(0);
        f.down('[name=cashflowtype]').setValue(0);
        f.down('[name=year]').setValue(new Date().getFullYear());
        // END STORE

        if ($mode == 'generateCF') {
            f.down("[name=department_id]").setValue(999998)
            f.down('[name=year]').setValue(me.generateCFYear);
        }
    }
});
