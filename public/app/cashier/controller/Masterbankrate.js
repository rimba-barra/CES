Ext.define('Cashier.controller.Masterbankrate', {
    extend  : 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.library.ModuleTools',
        'Cashier.library.Browse',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.Tools',  
        'Cashier.template.ComboBoxFields',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Voucherprefixcombobox',
        'Cashier.library.template.combobox.Projectptcombobox',
        'Cashier.library.template.combobox.Subglcombobox',
    ],
    alias: 'controller.masterbankrate',
    views: [
        'masterbankrate.FormSearch',
        'masterbankrate.Grid',
        'masterbankrate.Panel',
        'masterbankrate.FormData',
    ],
    stores: [
        'Masterbankrate',
        'Project',
        'Pt',
        'Voucherprefixsetupcombo',
        'Subgl',
        'Projectpt'
    ],
    models: [
        'Masterbankrate',
        'Project',
        'Pt',
        'Voucherprefixsetup',
        'Projectpt'
    ],
    refs: [
        { ref: 'grid', selector: 'masterbankrategrid' },
        { ref: 'formsearch', selector: 'masterbankrateformsearch' },
        { ref: 'panel', selector: 'masterbankratepanel' },
        { ref: 'formdata', selector: 'masterbankrateformdata' },
    ],
    controllerName: 'masterbankrate',
    fieldName     : 'deletefield',
    bindPrefixName: 'Masterbankrate',
    formWidth     : 500,
    win           : null,
    winId         : null,
    urlrequest    : null,             senddata: null,
    init          : function(application) {
        var me = this;
        this.control({
            'masterbankratepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender : me.panelAfterRender
            },
            'masterbankrategrid': {
                afterrender    : this.gridAfterRender,
                itemdblclick   : this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'masterbankrateformsearch': {
                afterrender: function() {
                    var me = this;
                    var fd = me.getFormsearch();

                    var project_id = null;

                    var projectptstore = fd.down("[name=pt_id]").getStore();
                    
                    projectptstore.load({
                        callback: function(records) {
                            projectptstore.each( function (rec) {
                                var fs_project_id = rec.get('project_id');
                                var fs_pt_id      = rec.get('pt_id');

                                if (fs_project_id == parseInt(apps.project) && fs_pt_id == parseInt(apps.pt)) {
                                    fd.down("[name=pt_id]").select(rec);
                                }
                            });
                        }
                    })

                    if (fd.down("[name=pt_id]").valueModels[0] !== undefined) {
                        project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id;
                        fd.down("[name=project_id]").setValue(project_id);
                    }
                }
            },
            'masterbankrateformsearch [action=search]': {
                click: me.dataSearch
            },
            'masterbankrateformsearch [action=reset]': {
                click: me.dataReset
            },
            'masterbankrateformdata': {
                afterrender: function() {
                    var me = this;
                    me.formDataAfterRender();
                    me.bankChange();
                }
            },
            'masterbankrateformdata [name=pt_id]': {
                change: function() {
                    var me         = this;
                    var fd         = me.getFormdata();
                    var state      = fd.up('window').state;
                    var project_id = null;

                    if (fd.down("[name=pt_id]").valueModels[0] !== undefined) {
                        project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id;
                        fd.down("[name=project_id]").setValue(project_id);
                    }
                    me.loadDataBank(fd);
                }
            },
            'masterbankrateformsearch [name=pt_id]': {
                change: function() {
                    var me         = this;
                    var fd         = me.getFormsearch();
                    var project_id = null;
                    
                    if (fd.down("[name=pt_id]").valueModels[0] !== undefined) {
                        project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id;
                        fd.down("[name=project_id]").setValue(project_id);
                    }
                    me.loadDataBank(fd);
                }
            },
            'masterbankrateformdata [action=save]': {
                click: me.dataSave
            },
            'masterbankrateformdata [name=voucherprefix_id]': {
                change: function() {
                    var me = this;
                    var fd = me.getFormdata();
                    me.bankChange();
                      // me.subglChange();
                }
            }
        })
    },
      // loadDataBank: function(form) {
      //     var me = this;
      //     var store = form.down("[name=voucherprefix_id]").getStore();

      //     store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetup');
      //     store.getProxy().setExtraParam('project_project_id', parseInt(apps.project));
      //     store.getProxy().setExtraParam('pt_pt_id', parseInt(apps.pt));
      //     store.getProxy().setExtraParam('user_user_id', parseInt(apps.uid));
      //     store.load();
      // },
    loadDataBank: function(f) {
        var me   = this;
        var form = f;
        form.down("[name=voucherprefix_id]").setValue();
        var store      = form.down("[name=voucherprefix_id]").getStore();
        var project_id = null;
        var pt_id      = form.down("[name=pt_id]").getValue();
        if (form.down("[name=pt_id]").valueModels[0] !== undefined) {
            project_id = form.down("[name=pt_id]").valueModels[0].data.project_id;
        } 

        store.getProxy().setExtraParam('hideparam', 'getvoucherprefixsetupmasterbankrate');
        store.getProxy().setExtraParam('project_project_id', parseInt(project_id));
        store.getProxy().setExtraParam('pt_pt_id', parseInt(pt_id));
        store.getProxy().setExtraParam('user_user_id', parseInt(apps.uid));
        store.load();
    },
    formDataAfterRender: function() {
        var me              = this;
        var fd              = me.getFormdata();
            me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        var state = fd.up('window').state;

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {

            fd.down("[name=pt_id]").setReadOnly(true);

            me.fdar().update();
        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            me.fdar().read();
        }

        var projectptstore = fd.down("[name=pt_id]").getStore();
        projectptstore.each( function (rec) {
            var fd_project_id = rec.get('project_id');
            var fd_pt_id      = rec.get('pt_id');

            if (fd_project_id == parseInt(apps.project) && fd_pt_id == parseInt(apps.pt)) {
                fd.down("[name=pt_id]").select(rec);
            }
        });
        me.bankChange();
    },
    dataSave: function() {
        var me = this;
        me.getFormdata().down("[name=hideparam]").setValue('default');  // added on april 2016, ahmad riadi     

        var getform = me.getFormdata();
        var form    = getform.getForm();

        
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp  = me.validationProcess();
        var vps = false;                   // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }


        if (form.isValid() && vps) {
            resetTimer();
            me.unformatCurrencyFormdata(me, getform);
            var store = null;
            var fida  = me.getFinalData(form.getValues());
            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                  /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                      //console.log(store);
                } else {
                    store = me.storeProcess;
                }
            }

            fida.bank = getform.down("[name=voucherprefix_id]").getRawValue();

            var msg = function () {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            var state_submit = me.getFormdata().up('window').state.toLowerCase();

            switch (state_submit) {
                case 'create': 

                    me.urlrequest = 'cashier/masterbankrate/create';
                    me.senddata   = {data: Ext.encode(fida)};

                    me.ajaxRequest();

                    break;
                case 'update': 
                    
                    me.urlrequest = 'cashier/masterbankrate/update';
                    me.senddata   = {data: Ext.encode(fida)};

                    me.ajaxRequest();

                    break;
                default: 
                    return;
            }
        }
    },
    ajaxRequest: function() {
        var me = this;
        var fd = me.getFormdata();

        fd.setLoading("Please wait...");
        Ext.Ajax.request({
            url    : me.urlrequest,
            params : me.senddata,
            success: function(response) {
                var info       = Ext.JSON.decode(response.responseText);
                var icon_alert = Ext.Msg.INFO;
                if (info.success != 'Success') {
                    icon_alert = Ext.Msg.ERROR;
                }

                Ext.Msg.show({
                    title  : info.success,
                    msg    : info.msg,
                    icon   : icon_alert,
                    buttons: Ext.Msg.OK
                });

                fd.up('window').close();
                me.getGrid().getStore().reload();
            }
        })
    },
    bankChange: function(){
        var me               = this;
        var fd               = me.getFormdata();
        var state            = fd.up('window').state;
        var project_id       = null;
        var pt_id            = fd.down("[name=pt_id]").getValue();
        var voucherprefix_id = fd.down("[name=voucherprefix_id]").getValue();
        
        if (fd.down("[name=pt_id]").valueModels[0] !== undefined) {
            project_id = fd.down("[name=pt_id]").valueModels[0].data.project_id;
            fd.down("[name=project_id]").setValue(project_id);
        } 

        var storex = fd.down('[name=subgl_id]').getStore();
        storex.loadData([],false);
        fd.setLoading(true);
        Ext.Ajax.request({
            url   : 'cashier/masterbankrate/read',
            params: {
                pt_id           : pt_id,
                project_id      : project_id,
                hideparam       : 'getkelsubbycoa',
                voucherprefix_id: voucherprefix_id
            },
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                var item = info.data;
                  // fd.down("[name=subgl_id]").setValue();
                console.log(item);
                if (item === undefined ) {
                    fd.setLoading(false);
                }else{
                    if (item[0].kelsub_id !== null) {
                        fd.down("[name=subgl_id]").setVisible(true);
                        fd.down('[name=subgl_id]').setLoading(true);
                        me.subglChange(item[0].kelsub_id);
                        fd.down('[name=subgl_id]').setLoading(false);
                    }else{
                        fd.down("[name=subgl_id]").setValue('');
                        fd.down("[name=subgl_id]").setVisible(false);
                    }
                    fd.setLoading(false);
                }
            },
        })
    },
    subglChange: function (kelsub) {
        var me = this;

        var form       = me.getFormdata();
        var store      = form.down("[name=subgl_id]").getStore();
        var project_id = null;
        var pt_id      = form.down("[name=pt_id]").getValue();
        if (form.down("[name=pt_id]").valueModels[0] !== undefined) {
            project_id = form.down("[name=pt_id]").valueModels[0].data.project_id;
        } else{
            project_id = apps.project;
        }
        var voucherprefix_id = form.down("[name=voucherprefix_id]").getValue();

        store.getProxy().setExtraParam('hideparam', 'getsubglbykelsub');
        store.getProxy().setExtraParam('project_id', parseInt(project_id));
        store.getProxy().setExtraParam('kelsub_id', parseInt(kelsub));
        store.getProxy().setExtraParam('pt_id', parseInt(pt_id));
        store.load();

    },
})
