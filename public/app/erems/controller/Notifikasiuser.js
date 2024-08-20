Ext.define('Erems.controller.Notifikasiuser', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Notifikasiuser',
    views: ['notifikasiuser.Panel', 'notifikasiuser.Grid', 'notifikasiuser.FormSearch', 'notifikasiuser.FormData'],
    requires: [
        'Erems.library.template.component.Emailcombobox',
        'Erems.library.template.component.Notifikasimodulecombobox',
    ],
    stores: ['Notifikasiuser','Email','Notifikasimodule'],
    models: ['Notifikasiuser','Email','Notifikasimodule'],
    refs: [
        {
            ref: 'grid',
            selector: 'notifikasiusergrid'
        },
        {
            ref: 'formsearch',
            selector: 'notifikasiuserformsearch'
        },
        {
            ref: 'formdata',
            selector: 'notifikasiuserformdata'
        }
    ],
    controllerName: 'notifikasiuser',
    fieldName: 'user_email',
    bindPrefixName: 'Notifikasiuser',
    init: function(application) {
        var me = this;
        this.control({
            'notifikasiuserpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'notifikasiusergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'notifikasiusergrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'notifikasiusergrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'notifikasiusergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'notifikasiusergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'notifikasiusergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'notifikasiuserformsearch button[action=search]': {
                click: this.dataSearch
            },
            'notifikasiuserformsearch button[action=reset]': {
                click: this.dataReset
            },
            'notifikasiuserformdata': {
                afterrender: this.formDataAfterRender
            },
            'notifikasiuserformdata button[action=save]': {
                click: this.dataSave
            },
            'notifikasiuserformdata button[action=cancel]': {
                click: this.formDataClose
            },
            // added by rico 06022023
            'notifikasiuserformdata [name=is_allday]': {
                change: this.check_allday
            },
            // added by rico 06022023
            'notifikasiuserformdata [name=dayofmonth]': {
                keyup: function(){
                    this.check_dayofmonth();
                }
            },
            // added by rico 20022023
            'notifikasiuserformdata [name=module_name]': {
                change: function(el, val){
                    this.set_notes(val);
                }
            },
            'notifikasiuserformsearch' : {
                afterrender : this.formSearchAfterRender
            },

        });
    },
    // added by rico 20022023
    set_notes: function(value){
        var me   = this;
        var form = me.getFormdata();

        Ext.Ajax.request({
            url: 'erems/notifikasiuser/read',
            params: {
                read_type_mode: 'get_notes',
                id: value
            },
            success: function (response) {
                var hasil = Ext.decode(response.responseText);

                form.down("[name=notes]").setValue(hasil.data[0].notes);
            },
        });
    },
    // added by rico 06022023
    check_allday: function(){
        var me   = this;
        var form = me.getFormdata();

        form.down("[name=dayofmonth]").setDisabled(form.down("[name=is_allday]").getValue());
    },
    // added by rico 06022023
    check_dayofmonth: function(){
        var me   = this;
        var form = me.getFormdata();
        var dayofmonth = form.down("[name=dayofmonth]").getValue().split(",");

        if(dayofmonth[dayofmonth.length - 1] > 31){
            dayofmonth.pop();
            form.down("[name=dayofmonth]").setValue(dayofmonth.join(","));
        }
    },
    fdar: function() {
        var me = this;
        var x = {
            init: function() {
                /// init here
            },
            create: function() {
                /// create here  

                var form    = me.getFormdata(); // added by rico 25012023
                form.down("[name=status]").setValue(1);
            },
            update: function() {
                var grid    = me.getGrid();
                var store   = grid.getStore();
                var form    = me.getFormdata();

                var record  = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                var dayofmonth = (record.data.is_allday == 1) ? "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31" : record.data.dayofmonth; // added by rico 06022023
                var dayofweek = record.data.dayofweek.split(",");

                form.down("[name=user_email]").setValue(record.data.user_id);
                form.down("[name=notifikasi_user_id]").setValue(record.data.notifikasi_user_id);
                form.down("[name=module_name]").setValue(record.data.notifikasi_module_id);
                form.down("[name=status]").setValue(record.data.Active);

                // added by rico 06022023
                var hari = [];
                for(var i=0;i<dayofweek.length;i++){
                    switch(dayofweek[i]){
                        case "0":
                            hari.push('Minggu');
                            break;
                        case "1":
                            hari.push('Senin');
                            break;
                        case "2":
                            hari.push('Selasa');
                            break;
                        case "3":
                            hari.push('Rabu');
                            break;
                        case "4":
                            hari.push('Kamis');
                            break;
                        case "5":
                            hari.push('Jumat');
                            break;
                        case "6":
                            hari.push('Sabtu');
                            break;
                    }
                }

                form.down("[name=dayofweek]").setValue(hari);  // added by rico 06022023
                form.down("[name=is_allday]").setValue(record.data.is_allday);  // added by rico 06022023
                form.down("[name=dayofmonth]").setValue(dayofmonth);  // added by rico 06022023
                // me.getFormdata().loadRecord(record);

                /// update here
            }
        };
        return x;
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
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
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
                            var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
                            if(res == 0){
                                me.getGrid().up('window').unmask();
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: failmsg + ' <br/>The data may have been used.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                me.getGrid().up('window').unmask();
                                var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                                var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                                store.un('beforesync', msg);
                                store.reload();
                                
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: successmsg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' <br/>The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    }
});