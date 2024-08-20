Ext.define('Hrd.controller.Mastersk', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Mastersk',
    controllerName: 'mastersk',
    fieldName: 'nomor',
    bindPrefixName: 'Mastersk',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    dynamicrequest: null,
    refs: [
        {
            ref: 'gridbrowse',
            selector: 'masterskgridbrowse'
        },
        {
            ref: 'formbrowse',
            selector: 'masterskformbrowse'
        },
        {
            ref: 'gridapply',
            selector: 'masterskgridapply'
        },
        {
            ref: 'formapply',
            selector: 'masterskformapply'
        },
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        newEvs['masterskformdata #file_name_upload'] = {
            change: function(fld, a) {

                me.formUploadFoto(fld, a, 'mode');
            }
        };
        
        newEvs['masterskformdata button[action=lihat_file]'] = {
            click: function() {

                me.lihatFile();
            }
        };

        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();

        newEvs['button[action=import]'] = {
            click: function () {
                me.parambrowse.stateform = 'read';
                me.dynamicrequest.GenerateFormdata(me.parambrowse);
            },
        };
        newEvs['button[action=export_apply]'] = {
            click: function () {
                me.paramapply.stateform = 'read_apply';
                me.dynamicrequest.GenerateFormdata(me.paramapply);
            },
        };
        newEvs['masterskformbrowse'] = {
            boxready: function () {
                me.formBrowseReady();
            },
        };
        newEvs['masterskformapply'] = {
            boxready: function () {
                me.formApplyReady();
            },
        };
        newEvs['masterskformbrowse button[action=process]'] = {
            click: function () {
                me.Processdata();
            },
        };
        newEvs['masterskformapply button[action=processapply]'] = {
            click: function () {
                me.ProcessApplydata();
            },
        };
        
        this.control(newEvs);
     
        
    },
    lihatFile:function(){
       var me = this;
       var f = me.getFormdata();
       var fileName = f.down("[name=file_name]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/mastersk/dokumen/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.masterkategorisk, f.down("[name=masterkategorisk_id]")).comboBox();
            }
        }).read('detail');
    },
    formUploadFoto: function(fld, a, mode) {
        var me = this;

        if (me.uploadFotoKlik === 0) {
            var me = this;
            var form = fld.up("form");
            var p = form.up("window");

            me.uploadFile({
                form: form,
                showalert: false,
                params: {
                    "type": 'dokumen', 
                  //  "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                   // "employee_id":me.getFormdata().down("[name=employee_id]").getValue()
                },
                callback: {
                    success: function(fn) {
                        p.setLoading(false);
                        //console.log(fn);
                      //  me.refreshPhotoInfo(fn);
                        me.uploadFotoKlik = 0;
                        form.down("[name=file_name]").setValue(fn);
                        form.down("[name=file_name_show]").show();
                        form.down("[name=file_name_show]").setValue(fn);

                    },
                    failure: function() {
                        me.uploadFotoKlik = 0;
                        p.setLoading(false);
                    }
                }
            });
            
            me.uploadFotoKlik = 1;
        }


    },
    setReadonlydata: function (form) {
        form.down('[name=name]').setReadOnly(true);
        form.down('[name=nomor]').setReadOnly(true);
        form.down('[name=tanggal]').setReadOnly(true);
        form.down('[name=tanggal_habis]').setReadOnly(true);
        form.down('[name=masterkategorisk_id]').setReadOnly(true);
        form.down('[name=keterangan]').setReadOnly(true);
        form.down('[name=file_name_upload]').setReadOnly(true);
        form.down('[name=file_name_upload]').setDisabled(true);
        form.down('[name=private]').setDisabled(true);
        form.down('[name=active]').setDisabled(true);
    },
    unsetReadonlydata: function (form) {
        form.down('[name=name]').setReadOnly(false);
        form.down('[name=nomor]').setReadOnly(false);
        form.down('[name=tanggal]').setReadOnly(false);
        form.down('[name=tanggal_habis]').setReadOnly(false);
        form.down('[name=masterkategorisk_id]').setReadOnly(false);
        form.down('[name=keterangan]').setReadOnly(false);
        form.down('[name=file_name_upload]').setReadOnly(false);
        form.down('[name=file_name_upload]').setDisabled(false);
        form.down('[name=private]').setDisabled(false);
        form.down('[name=active]').setDisabled(false);
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.masterkategorisk, f.down("[name=masterkategorisk_id]")).comboBox();
                        me.unsetReadonlydata(f);
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.masterkategorisk, f.down("[name=masterkategorisk_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        console.log(rec.get('private'));
                        f.down("[name=file_name_show]").show();
                        f.down("[name=file_name_show]").setValue(rec.get('file_name'));
                        console.log(rec.get('file_name'));
                        var mastersk_id_source = rec.get('mastersk_id_source');
                        if(mastersk_id_source){
                            me.setReadonlydata(f);
                        }else{
                            me.unsetReadonlydata(f);
                        }
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
    parambrowse: {
        //start formgeneate
        fromlocation: 'Hrd.view.mastersk.FormBrowse',
        formtitle: 'Form Browse Document HC Filing (HO)', formicon: 'icon-form-add',
        formid: 'win-masterskgridbrowse', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
    },
    paramapply: {
        //start formgeneate
        fromlocation: 'Hrd.view.mastersk.FormApply',
        formtitle: 'Form Share Document HC Filing to Project Pt', formicon: 'icon-form-add',
        formid: 'win-masterskgridapply', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
    },
    formBrowseReady: function () {
        var me, grid, store;
        me = this;
        grid = me.getGridbrowse();
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getmasterskkantorpusat',
                project_id: 1,
                pt_id: 1,
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'index_no', direction: 'ASC'});
            }
        });
    },
    formApplyReady: function () {
        var me, grid, store;
        me = this;
        grid = me.getGridapply();
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getmastersk'
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'index_no', direction: 'ASC'});
            }
        });
    },
    Processdata: function () {
        var me, grid, store, counter, rows, recordcounttext, record, rowdata, datasave,form;
        me = this;
        grid = me.getGridbrowse();
        form = me.getFormbrowse();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            form.up('window').body.mask('Saving, please wait ...');
            rows = grid.getSelectionModel().getSelection();
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            datasave = [];
            for (var i = 0; i < rows.length; i++) {
                record = rows[i];
                rowdata = record.raw.mastersk;
                datasave[i] = rowdata;
            }
            me.tools.ajax({
                params: {"data": Ext.JSON.encode(datasave)},
                success: function (data, model) {
                    
                }
            }).read('createfromimport');            
            form.up('window').body.unmask();
            me.dynamicrequest.formClose(form);
            me.getGrid().getStore().reload();
        } else {
            me.dynamicrequest.buildWarningAlert("Process failed,no data in this grid");
        }


    },
    ProcessApplydata: function () {
        var me, grid, store, counter, rows, recordcounttext, record, rowdata, datasave,form;
        me = this;
        grid = me.getGridapply();
        form = me.getFormapply();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            form.up('window').body.mask('Saving, please wait ...');
            rows = grid.getSelectionModel().getSelection();
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            datasave = [];
            for (var i = 0; i < rows.length; i++) {
                record = rows[i];
                rowdata = record.raw.mastersk;
                datasave[i] = rowdata;
            }
            me.tools.ajax({
                params: {"data": Ext.JSON.encode(datasave)},
                success: function (data, model) {
                    
                }
            }).read('createtoexport');            
            form.up('window').body.unmask();
            me.dynamicrequest.formClose(form);
            me.dynamicrequest.buildSuccessAlert("Apply Document to Project PT Success");
            me.getGrid().getStore().reload();
        } else {
            me.dynamicrequest.buildWarningAlert("Process failed,no data in this grid");
        }


    }
});