Ext.define('Hrd.controller.Trainingarsip', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingarsip',
    controllerName: 'trainingarsip',
    fieldName: 'trainingarsip',
    bindPrefixName: 'Trainingarsip',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    dynamicrequest: null,
    stores: [
        'Trainingperiode'
    ],
    refs: [
        
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        newEvs['trainingarsipformdata #file_name_upload'] = {
            change: function(fld, a) {

                me.formUploadFoto(fld, a, 'mode');
            }
        };
        
        newEvs['trainingarsipformdata button[action=lihat_file]'] = {
            click: function() {

                me.lihatFile();
            }
        };

        newEvs['trainingarsipformdata [name=trainingschedule_id]'] = {
            select: function() {
               me.getTrainingSchedule();
            }
        };

        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();
        
        this.control(newEvs);
     
        
    },
    lihatFile:function(){
       var me = this;
       var f = me.getFormdata();
       var fileName = f.down("[name=file_name]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/training/arsip/"+fileName);
      
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
                // me.tools.wesea(data.trainingcaption, f.down("[name=trainingschedule_id]")).comboBox();
                me.tools.wesea(data.trainingname, f.down("[name=trainingname_id]")).comboBox();
                // var year = new Date().getFullYear();
                // f.down("trainingarsipformsearch [name=periode]").setValue(year);
            }
        }).read('getSchedule');
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
                        me.tools.wesea(data.trainingcaption, f.down("[name=trainingschedule_id]")).comboBox(); 
                    }
                }).read('getSchedule');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.trainingcaption, f.down("[name=trainingschedule_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        // console.log(rec.get('private'));
                        f.down("[name=file_name_show]").show();
                        f.down("[name=file_name_show]").setValue(rec.get('file_name'));
                        // console.log(rec.get('file_name'));
                    }
                }).read('getSchedule');


                me.unMask(1);

            }
        };
        return x;
    },
    getTrainingSchedule: function () {
        var me = this;
        f = me.getFormdata();
        var sch_id = f.down("[name=trainingschedule_id]").getValue();
        // alert(sch_id);
        me.getFormdata().down("[name=periode]").setValue('');
        me.getFormdata().down("[name=batch]").setValue('');
        me.tools.ajax({
            params: {trainingschedule_id: sch_id},
            success: function (data, model) {
                // console.log(data.others[1][0][0].periode);
                var periode = data.others[1][0][0].periode;
                var batch = data.others[1][0][0].batch;
                var startdate = data.others[1][0][0].startdate;
                var enddate = data.others[1][0][0].enddate;
                me.getFormdata().down("[name=periode]").setValue(periode);
                me.getFormdata().down("[name=batch]").setValue(batch);
            }
        }).read('getVTS');
    },

    dataDestroy: function() {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();

            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).data.trainingname + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
});