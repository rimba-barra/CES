Ext.define('Cashier.controller.Subaccountcode', {
    extend: 'Cashier.library.template.controller.Controllergl',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Subaccountgroupcombobox',
        'Cashier.library.template.combobox.Subaccountgroupmulticombobox',
        'Cashier.library.template.combobox.Subdesccodecombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Projectptallcombobox',
        'Cashier.library.template.combobox.Ptprojectcombobox'

    ],
    alias: 'controller.Subaccountcode',
    views: [
        'subaccountcode.Panel',
        'subaccountcode.Grid',
        'subaccountcode.FormSearch',
        'subaccountcode.FormData',
        'subaccountcode.FormImport',
        'subaccountcode.FormDataUpload'
    ],
    stores: [
        'Subaccountcode',
        'Subaccountgroupfs',
        'Projectptall',
        'Subdesccode',
        'Project',
        'Pt'
    ],
    models: [
        'Subaccountcode',
        'Pt',
        'Subdesccode',
        'Project'
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
        },
        {
            ref: 'formdataupload',
            selector: 'subaccountcodeformdataupload'
        }
    ],
    controllerName: 'subaccountcode',
    fieldName: 'code', //for notif even delete
    bindPrefixName: 'Subaccountcode',
    init: function (application) {
        var me = this;

        me.elem = new Cashier.library.tools.Mytools();

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
            //Rizal 31 Mei 2019
            
            'subaccountcodeformsearch [name=projectpt_id]': {
                change: function (field, newValue, oldValue, desc) {
                    me.reloadKelSub(newValue);
                }
            },
            'subaccountcodeformdata [name=projectpt_id]': {
                change: function (field, newValue, oldValue, desc) {
                    me.reloadKelSubFormData(newValue);
                    me.reloadKelSubDescFormData(newValue);
                }
            },
            //
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
                    this.dataExist('cashier/subaccountcode/create', me, 'checkexist', 'code');
                }
            },
            'subaccountcodeformdata [name=kelsub_id]': {
                select: function () {
                    this.dataExist('cashier/subaccountcode/create', me, 'checkexist', 'code');
                    me.checkIsRestrictSub();
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
                        } else {
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
                        url: 'cashier/subaccountcode/create',
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
                        url: 'cashier/subaccountcode/create',
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
            },
            'subaccountcodegrid toolbar button[action=importsub]': {
                click: function () {
                    this.FormUploadSubAccountShow();
                }
            },
            'subaccountcodeformdataupload [name=file-path]': {
                change: function(me) {
                    this.validatefiletype(me);
                }
            },
            'subaccountcodeformdataupload button[action=upload]': {
                click: function () {
                    var me = this;
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
                    
                    //confirmation
                    Ext.MessageBox.show({
                        title  : 'Konfirmasi',
                        msg    : 'Sub account yang diupload akan terdaftar di PT <b>' + apps.ptname + ' </b>. <br><br> Pastikan kolom yang terdapat pada CSV terdapat data : <br> Kolom A  : No urut <br> Kolom B  : Kelsub <br> Kolom C  : Code <br> Kolom D  : Code 1 <br> Kolom E  : Code 2 <br> Kolom F  : Code 3 <br> Kolom G  : Code 4 <br> Kolom H  : Description <br><br> Apakah data yang and upload sudah sesuai ?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        icon   : Ext.MessageBox.WARNING,
                        fn     : function(btn){
                            console.log(btn);
                            if(btn == 'ok'){
                                me.UploadSubAccount();
                            } else {
                                return;
                            }
                        }
                    });
                    
                }
            },

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
              me.getGrid().getStore().load();
              me.getFormdata().down("[name=projectpt_id]").setReadOnly(true);

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
    reloadKelSub: function (value) {
        var me = this;
        var f = me.getFormsearch();
        var rec = f.down("[name=projectpt_id]").getStore().findRecord("projectpt_id", value,0,false,true,true);
        var kelsub = f.down("[name=kelsub_id]").getStore();
        kelsub.getProxy().setExtraParam('projectpt_id', f.down("[name=projectpt_id]").getValue());
        kelsub.getProxy().setExtraParam('limit', 1000000);
        kelsub.load();
    },
    reloadKelSubFormData: function (value) {
        var me = this;
        var f = me.getFormdata();
        var rec = f.down("[name=projectpt_id]").getStore().findRecord("projectpt_id", value,0,false,true,true);
        var kelsub = f.down("[name=kelsub_id]").getStore();
        kelsub.getProxy().setExtraParam('projectpt_id', f.down("[name=projectpt_id]").getValue());
        kelsub.getProxy().setExtraParam('limit', 1000000);
        kelsub.load();
    },
    reloadKelSubDescFormData: function (value) {
        var me = this;
        var f = me.getFormdata();
        var rec = f.down("[name=projectpt_id]").getStore().findRecord("projectpt_id", value,0,false,true,true);
        var kelsub = f.down("[name=code3]").getStore();
        kelsub.getProxy().setExtraParam('projectpt_id', f.down("[name=projectpt_id]").getValue());
        kelsub.getProxy().setExtraParam('limit', 1000000);
        kelsub.load();
    },
    checkIsRestrictSub: function () {
        var me, form, state;
        me = this;
        form = me.getFormdata();
        state = form.up('window').state.toLowerCase();
        var el = form.down("[name=projectpt_id]");
        var project_id = el.valueModels[0].data.project_id;
        var pt_id = el.valueModels[0].data.pt_id;
        var kelsub = form.down("[name=kelsub_id]").valueModels[0].data.kelsub;
        form.down("#btnSave").setDisabled(false);
        if ( state == 'create' && kelsub == 'B' ) {
            Ext.Ajax.request({
                url: 'cashier/subaccountcode/read',
                method: 'POST',
                timeout:100000000,  
                params: {
                    hideparam :'getiscpmsproject',
                    project_id: project_id,
                    pt_id: pt_id
                },
                success: function (response) {
                    response = Ext.JSON.decode(response.responseText);
                    if ( response.total > 0 ) {
                        me.buildWarningAlert('This sub must be added from cpms !');
                        form.down("#btnSave").setDisabled(true);
                    }                    
                },
                failure: function (response) {
                    
                }
            });
        }
    },

    FormUploadSubAccountShow: function () {
        var me, p, psa, pmsa = '';
        me = this;
        var w = me.instantWindow('FormDataUpload', 400, 'Upload Sub Account', 'create', '');
    },

    UploadSubAccount: function(){
        var me = this;
        var f = me.getFormdata();
        var form = me.getFormdataupload();
        
        if(true){
            form.submit({
                url: 'cashier/subaccountcode/import',
                waitMsg: 'Processing data...',
                success: function(fp, o) {
                    Ext.Msg.show({
                        title  : 'Upload Sub Account Success.',
                        icon   : Ext.MessageBox.INFO,
                        buttons: Ext.Msg.OK,
                        msg    : "Data Upload Berhasil disimpan",
                        fn: function () {
                            me.formDataClose(el)
                        }
                    });
                    form.up('window').close();
                    me.getGrid().getStore().reload();
                    return false;
                },
                failure: function(fp, o) {
                    me.info = Ext.JSON.decode(o.response.responseText);
                    
                    var str = '<style> textarea.gfg { margin:5px;  padding:5px; background-color: white; width: 600px; height: 300px; overflow: auto; text-align:justify; cursor:default;} </style> STATUS ## [KELSUB] CODE : [ERROR MESSAGE] <textarea class="gfg" readonly>' + me.info.message + '</textarea>';
                    
                    Ext.Msg.show({
                        title  : 'Upload Sub Account Gagal.',
                        icon   : Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK,
                        msg    : str
                    });

                    return false;
                }
            });
        }
    },
    validatefiletype: function(me) {

        var indexofPeriod = me.getValue().lastIndexOf("."),
            uploadedExtension = me.getValue().substr(indexofPeriod + 1, me.getValue().length - indexofPeriod);

        var fullPath = me.getValue();
        var lastIndex = fullPath.lastIndexOf('\\');
        var fileName = fullPath.substring(lastIndex + 1);

        console.log(uploadedExtension);

        var allowedExtns = ['csv'];
        if (!Ext.Array.contains(allowedExtns, uploadedExtension.toLowerCase())) {
            me.setActiveError('Please Use csv File Format!');
            Ext.MessageBox.show({
                title: 'File Type Error',
                msg: 'Please Use csv  File Format!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            me.setRawValue(null);
            return;
        }
        me.setRawValue(fileName);
    },
    
    //
});