Ext.define('Cashier.controller.Coaconvert', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Coaconvert',
    views: [
        'coaconvert.Panel',
        'coaconvert.Grid',
        'coaconvert.FormSearch',
        'coaconvert.FormData',
    ],
    stores: [
        'PtbyuserpershV2',
        'Coadeptcombo',
        'Coaconvert',
        'Project'
       // 'Coaconvertcombo'
    ],
    models: [
        'Coaconvert',
        'Project'
    ],
    requires: [
        //'Cashier.library.template.combobox.Coaconvertcombobox'
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Ptusercomboboxpersh',
        'Cashier.library.template.combobox.Coadeptvouchercombobox',
        'Cashier.library.template.combobox.Coacomboboxgrid'
    ],
    refs: [
        {ref: 'grid', selector: 'coaconvertgrid'},
        {ref: 'formsearch', selector: 'coaconvertformsearch'},
        {ref: 'formdata', selector: 'coaconvertformdata'},
    ],
    controllerName: 'coaconvert',
    fieldName: 'coaconvert',
    bindPrefixName: 'Coaconvert',
    rowproject: null, storept: null, state: null,
    pt_id: apps.pt,
    project_id: apps.project,
    projectpt_id : apps.projectpt,
    senddata: null,
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    loadingrequesttop: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait, loading Company..."}),
    is_ready: 0,
    projectname: '',
    ptname: '',
    init: function (application) {
        var me = this;

        this.control({
            'coaconvertpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'coaconvertgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'coaconvertgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'coaconvertgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'coaconvertgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'coaconvertgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'coaconvertgrid toolbar button[action=doconvertcoa]': {
                click: function () {
                    this.doConvertcoa();
                }
            },
            'coaconvertgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'coaconvertformsearch button[action=search]': {
                click: this.dataSearch
            },
            'coaconvertformsearch button[action=reset]': {
                click: this.dataReset
            },
            'coaconvertformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    $("#coaconvertid input[name='coa_new2']").keyup(function ()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/, '$1' + '.' + '$2');
                    });
                }
            },
            'coaconvertformdata [name=mode]': {
                change: function(el) {
                    var me = this;
                    var fd = me.getFormdata();

                    if (el.checked == true) {
                        if (el.inputValue == "move") {
                            fd.down("[name=coa_new]").setVisible(true);
                            fd.down("[name=coa_new2]").setVisible(false);
                        } else {
                            fd.down("[name=coa_new]").setVisible(false);
                            fd.down("[name=coa_new2]").setVisible(true);
                        }
                    }
                }
            },
            'coaconvertformdata [name=coaconvert] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'coaconvertformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'coaconvertformdata button[action=save]': {
                click: function(){
                    if(this.validate()==true){
                        this.dataSave();
                    }else{
                        Ext.Msg.alert('WARNING', 'Pindah coa tidak valid. <br>- Coa harus berbeda, <br>- Jika memiliki sub, harus merupakan sub yang sama');
                    }
                }
            },
            'coaconvertformdata button[action=force]': {
                click: function(){
                    this.forceConvert();
                }
            },
            'coaconvertformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'coaconvertgrid [name=pt_id] ': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    rowdata = record[0]['data'];
                    me.pt_id = rowdata.pt_id;
                    me.project_id = rowdata.project_id;

                    form = me.getFormsearch();
                    var pr_id = parseInt(form.down('[name=project_id]').getValue());

                    if(pr_id>0){
                        // if ( pr_id != me.project_id ) {
                            console.log(rowdata);
                            me.project_id = rowdata.project_id;
                            me.projectname = rowdata.projectname;
                            me.ptname = rowdata.ptname;
                            form.down('[name=project_id]').setValue(me.project_id);
                            form.down('[name=descriptionprpt]').setValue(me.projectname + ' - ' + me.ptname);
                        /*}else{
                            rawdata = form.down('[name=project_id]').valueModels[0]['raw'];
                            me.project_id = pr_id;
                            me.projectname = rawdata.projectname;
                            me.ptname = rawdata.ptname;
                            form.down('[name=descriptionprpt]').setValue(me.projectname + ' - ' + me.ptname);
                        }*/
                    }else{
                         me.project_id = rowdata.project_id;
                         me.projectname = rowdata.projectname;
                         me.ptname = rowdata.ptname;
                         form.down('[name=descriptionprpt]').setValue(me.projectname + ' - ' + me.ptname);
                    }
                   
                    me.reloadgrid();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormsearch();
                    me.reloadgrid();
                }
            },
            'coaconvertformsearch [name=project_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormsearch();
                    var pr_id = parseInt(form.down('[name=project_id]').getValue());
                    if(pr_id>0){
                         rawdata = form.down('[name=project_id]').valueModels[0]['raw'];
                         me.project_id = pr_id;
                         form.down('[name=descriptionprpt]').setValue(rawdata.projectname + ' - ' + me.ptname);
                         me.projectname = rawdata.projectname;

                         grid = me.getGrid();
                         rawdata = grid.down("[name=pt_id]").valueModels[0]['raw'];
                         form.down('[name=descriptionprpt]').setValue(me.projectname + ' - ' + rawdata.ptname);

                    }
                    me.reloadgrid();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormsearch();
                    me.reloadgrid();
                }
            },
        });
    },
    getMe: function(){
       var me = this;
       return _Apps.getController(me.bindPrefixName);
    },
    reloadgrid: function(){
        var me,grid;
        me = this;
        store = me.getGrid().getStore();
        store.proxy.extraParams = {
            "hideparam": 'default',
            "project_id": me.project_id,
            "pt_id": me.pt_id,
            "start": 0,
            "limit": 25
        }
        store.reload({
            params: {
                "hideparam": 'default',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 25,
            },
            callback: function (records, operation, success) {

            }
        });
        //me.setStorePtuser();
    },
    validate: function(){
        var me, store, form, grid, rawdata, coa_new;
        me = this;
        form = me.getFormdata();
        mode = form.down('[name=mode]').getValue();
        console.log(mode);
        coa_old = form.down('[name=coa_old]').valueModels[0]['raw'];
        console.log(coa_old);
        if ( mode ) {
            coa_new = form.down('[name=coa_new]').valueModels[0]['raw'];
            console.log(coa_new);
            
            if(coa_new.coa==coa_old.coa){
                console.log('same coa');
                return false;
            }

            if(coa_new.coa_id==coa_old.coa_id){
                return false;
            }

            if(coa_new.kelsub_id!==coa_old.kelsub_id){
                return false;
            }  
        }else{
            coa_new = form.down('[name=coa_new2]').getValue();
            console.log(coa_new);
            
            if(coa_new==coa_old.coa){
                console.log('same coa');
                return false;
            }
        }

        return true;
    },
    gridAfterRender: function(){
        var me, store, form, grid, rawdata, fs;
        me = this;
        me.project_id = parseInt(apps.project);
        me.pt_id = parseInt(apps.pt);
        me.projectpt_id = parseInt(apps.projectpt);
        me.setStorePtuser();
        grid = me.getGrid();
        grid.down("[name=pt_id]").setValue(me.projectpt_id);
        fs = me.getFormsearch();
        fs.down("[name=project_id]").setValue(me.project_id);
    },
    formDataAfterRender: function(){
        var me, store, form, grid, rawdata;
        var me = this.getMe();

        grid = me.getGrid();

        var valueModels = grid.down('[name=pt_id]').valueModels[0];
       

        if (typeof valueModels == 'undefined') {
            me.getFormdata().up('window').close();
            alert('Company Dropdown is not Ready');
            return 0;
        }
        
        var pt_id = valueModels.data['pt_id'];

        rawdata = grid.down('[name=pt_id]').valueModels[0]['raw'];
        
        //setval
        formdata = me.getFormdata();
        formdata.down("[name=coa_new2]").setVisible(false);
        state = formdata.up('window').state.toLowerCase();
        if(state=='update'){
            var row = grid.getSelectionModel().getSelection()[0];
            formdata.down("[name=mode]").setValue(row.data.mode);
            formdata.down("[name=coaconvert_id]").setValue(row.data.coaconvert_id);
            formdata.down("[name=coa_old]").setValue(row.data.coa_old);
            formdata.down("[action=save]").setVisible(false);
            if ( row.data.mode == 'move' ) {
                formdata.down("[name=coa_new]").setValue(row.data.coa_new);
            }else{
                formdata.down("[name=coa_new2]").setValue(row.data.coa_new);
            }
        }else{
            formdata.down("[action=force]").setVisible(false);
        }

        formdata.down("[name=projectname]").setValue(rawdata.projectname);
        formdata.down("[name=ptname]").setValue(rawdata.ptname);
        formdata.down("[name=project_id]").setValue(rawdata.project_id);
        formdata.down("[name=pt_id]").setValue(rawdata.pt_id);
        //load COA
        store = me.getStore("Coadeptcombo");
        store.load({
            params: {
                "hideparam": 'getcoabyprojectptall',
                "project_id": rawdata.project_id,
                "pt_id": rawdata.pt_id,
                "department_id": 0
            },
            callback: function (records, operation, success) {
                // FILTER UNTUK COA YANG NO JOURNAL TIDAK MUNCUL
                store.clearFilter();
                store.filterBy(function (rec, id) {
                    console.log(rec);
                    console.log(rec.get('is_journal'));
                    if( rec.get('is_journal') == 1 ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

            }
        });

    },
    doConvertcoa: function(){
        var me, store, form, grid, rawdata;
        me = this;
        grid = me.getGrid();
         var valueModels = grid.down('[name=pt_id]').valueModels[0];
        var pt_id = valueModels.data['pt_id'];
        rawdata = grid.down('[name=pt_id]').valueModels[0]['raw'];
        
        //confirmation
        Ext.MessageBox.show({
            title: 'Konfirmasi',
            msg: 'Sistem akan melakukan konversi Coa, <br> Harap pastikan konfigurasi coa sudah benar <br><b>'+rawdata.projectname+' - '+rawdata.ptname+'</b> ?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn){
                if(btn == 'ok'){
                    me.loadingrequest.show();
                    me.doConvertcoaRequest(rawdata.project_id,rawdata.pt_id);
                } else {
                    return;
                }
            }
        });
    },
    doConvertcoaRequest: function (project_id,pt_id) {
        var me,grid;
        me = this;
        grid = me.getGrid();
        
        me.senddata = {
            "hideparam": 'doconvertcoa',
            "project_id": project_id,
            "pt_id": pt_id
        }
        Ext.Ajax.request({
            url: 'cashier/coaconvert/create',
            method: 'POST',
            timeout: 45000000,
            async: false, 
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                if(response) {
                    me.loadingrequest.hide();
                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        Ext.Msg.alert('Success', 'Success');
                        grid.getStore().reload();
                    } catch(e) {
                        Ext.Msg.alert('Warning', 'Request Failed');
                        return false;
                    }
                }
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    forceConvert: function(){
        var me, store, formdata, grid, rawdata;
        me = this;
        formdata = me.getFormdata();
        grid = me.getGrid();

        var valueModels = grid.down('[name=pt_id]').valueModels[0];
        var coaconvert_id = formdata.down("[name=coaconvert_id]").getValue();
        //confirmation

        grid = me.getGrid();
        var pt_id = valueModels.data['pt_id'];
        rawdata = grid.down('[name=pt_id]').valueModels[0]['raw'];

        Ext.MessageBox.show({
            title: 'Konfirmasi',
            msg: 'Sistem akan melakukan konversi Coa tanpa validasi <br>dan kemungkinan akan <b>merging coa</b>. Anda yakin?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn){
                if(btn == 'ok'){
                    me.senddata = {
                        "hideparam": 'forceconvertcoa',
                        "project_id": rawdata.project_id,
                        "pt_id": rawdata.pt_id,
                        "coaconvert_id": coaconvert_id
                    }
                    Ext.Ajax.request({
                        url: 'cashier/coaconvert/create',
                        method: 'POST',
                        timeout: 45000000,
                        async: false, 
                        params: {
                            data: Ext.encode(me.senddata)
                        },
                        success: function (response) {
                            if(response) {
                                me.loadingrequest.hide();
                                try {
                                    me.info = Ext.JSON.decode(response.responseText);
                                    Ext.Msg.alert('Success', 'Success');
                                    formdata.up('window').close();
                                    grid.getStore().reload();
                                } catch(e) {
                                    Ext.Msg.alert('Warning', 'Request Failed');
                                    formdata.up('window').close();
                                    return false;
                                }
                            }
                        },
                        failure: function (response) {
                            me.getFormdata().up('window').close();
                        }
                    });
                    
                } else {
                    return;
                }
            }
        });
    },
    setStorePtuser: function () {
        var me, store, form, grid;
        var me = this.getMe();
        me.is_ready = 0;
        me.loadingrequesttop.show();
        store = me.getStore("PtbyuserpershV2");
        grid = me.getGrid();
        store.reload({
            params: {
                "hideparam": 'getptbyuserpersh',
                "project_id": me.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
               me.setVal(grid, 'pt_id', parseInt(apps.projectpt));
               me.loadingrequesttop.hide();
               me.is_ready = 1;
            }
        });
        gridstore = grid.getStore();
        gridstore.reload();


        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    /*storeproject.each( function (rec, idx) {
                        if ( rec.get('project_id') == apps.project ) {
                            me.getFormsearch().down("[name=project_id]").setValue(rec);
                        }
                    });*/
                }
            }
        });

    },
});