Ext.define('Cashier.controller.Masterdebitsource', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Masterdebitsource',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Bankcombobox',
    ],
    views: [
        'masterdebitsource.Panel',
        'masterdebitsource.Grid',
        'masterdebitsource.FormSearch',
        'masterdebitsource.FormData',
    ],
    stores: [
        'Masterdebitsource',
        'Project',
        'Pt',
        'Bank'
    ],
    models: [
        'Masterdebitsource',
        'Project',
        'Pt',
        'Bank'
    ],
    refs: [{
        ref: 'grid',
        selector: 'masterdebitsourcegrid'
    }, {
        ref: 'formsearch',
        selector: 'masterdebitsourceformsearch'
    }, {
        ref: 'formdata',
        selector: 'masterdebitsourceformdata'
    }, ],
    controllerName: 'masterdebitsource',
    fieldName: 'name',
    bindPrefixName: 'Masterdebitsource',
    urldata: 'cashier/masterdebitsource/',
    messagedata: null,
    senddata: null,
    info: null,
    rowproject: null,
    storept: null,
    state: null,
    init: function(application) {
        var me = this;
        this.control({
            'masterdebitsourcepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
            },
            'masterdebitsourcegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'masterdebitsourceformdata': {
                afterrender: function() {

                    var me = this;
                    me.formDataAfterRender(me.getFormdata());
                    me.loadProject(me.getFormdata());
                    me.loadPtbyProject(me.getFormdata());
                }
            },
            'masterdebitsourceformdata [name=bank_id]': {
                change: function(form = '') {
                    var me = this;
                    me.getBankCode(form);
                }
            },
            'masterdebitsourceformdata [action=save]': {
                click: this.dataSavecustome
            },
            'masterdebitsourcegrid toolbar button[action=destroy]': {
                click: this.dataDestroycustome
            },
            'masterdebitsourceformsearch': {
                afterrender: function() {

                    var me = this;

                    me.loadProject(me.getFormsearch());
                    me.loadPtbyProject(me.getFormsearch());
                }
            },
            'masterdebitsourceformsearch [action=search]': {
                click: me.dataSearch
            },
            'masterdebitsourceformsearch [action=reset]': {
                click: me.dataReset
            },
        });
    },
    getBankCode: function(form) {
        var me = this;
        var f = me.getFormdata();
        var id = f.down("[name=bank_id]").getValue();
        var pt = f.down("[name=pt_id]").getValue();
        var project = f.down("[name=project_id]").getValue();
        me.senddata = {
            "hideparam": 'getbankcode',
            "project_id": project,
            "pt_id": pt,
            "bank_id": id
        }
        if (id != 0) {
            me.AjaxRequest(form);
        }
    },
    AjaxRequest: function(form = '') {
        var me;
        me = this;
        if (form != '') {
            Ext.Ajax.request({
                url: 'cashier/masterdebitsource/read',
                timeout: 45000000,
                method: 'POST',
                params: {
                    data: Ext.encode(me.senddata)
                },
                success: function(response) {

                    if (response.responseText.includes("Belum ada")) {
                        Ext.Msg.alert('Error', response.responseText);
                        form.up('window').close();
                        return false;
                    }

                    try {
                        me.info = Ext.JSON.decode(response.responseText);
                        me.setSuccessEvent(form);
                    } catch (err) {
                        Ext.Msg.alert('Error', 'Request Failed.');
                        form.up('window').close();
                    }


                },
                failure: function(response) {
                    form.up('window').close();
                }
            });
        }
    },
    setSuccessEvent: function(form = '') {
        var me, value, data, form, voucher_date, duedate, state;
        me = this;
        if (form != '') {
            data = me.info.data;
            switch (me.info.parameter) {
                case 'getbankcode':
                    var f = me.getFormdata();
                    state = f.up('window').state.toLowerCase();
                    f.down("[name=bank_code]").setValue(data[0].bank_code);
                    break;
            }
        }
    },
    loadProject: function(f) {

        var me = this;

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            },
            callback: function(recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));
                    }
                }
            }
        });
    },
    loadPtbyProject: function(f) {

        var me = this;
        projectid = f.down("[name=project_id]").getValue();

        if (projectid != null) {
            projectid = f.down("[name=project_id]").getValue();
        } else {
            projectid = apps.project;
        }

        var f = f;
        storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function(records, operation, success) {
                if (records[0]) {
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                }
            }
        });
    },
    dataSavecustome: function() {
        var me = this;
        var form = me.getFormdata();
        var formdata = me.getFormdata().getForm();
        var valueData = formdata.getValues();
        var state = form.up('window').state.toLowerCase();

        var project_id = me.getFormdata().down("[name=project_id]").getValue();
        var pt_id = me.getFormdata().down("[name=pt_id]").getValue();
        var bank_id = me.getFormdata().down("[name=bank_id]").getValue();
        var debitsource = me.getFormdata().down("[name=debitsource]").getValue();
        var acc_no = me.getFormdata().down("[name=acc_no]").getValue();

        if (!project_id || !pt_id || !bank_id || !debitsource || !acc_no) {
            me.buildWarningAlert("Column must be filled!");
            return false;
        }

        Ext.Ajax.request({
            url: me.urldata + state,
            method: 'POST',
            params: {
                data: Ext.encode(valueData)
            },
            success: function(response) {
                me.messagedata = 'Data Saved';
                me.alertFormdataSuccess();
            },
            failure: function(response) {
                me.messagedata = 'Data Error';
                me.alertFormdataFailed();
                throw me.messagedata;
            }
        });

        console.log(state);
        console.log(valueData);
    },
    dataDestroycustome: function() {
        var me = this;
        var ids = [];
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + rows[0].data.debitsource + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].data.debitsource_id);
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

                    Ext.Ajax.request({
                        url: 'cashier/masterdebitsource/delete',
                        method: 'POST',
                        params: {
                            data: Ext.encode({
                                hideparam: 'default',
                                debitsource_id: ids
                            })
                        },
                        success: function(response) {
                            me.getGrid().up('window').unmask();
                            me.getGrid().getStore().reload();
                            Ext.Msg.show({
                                title: 'Success',
                                msg: 'Data Deleted',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function(response) {
                            me.getGrid().up('window').unmask();
                            me.getGrid().getStore().reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Data Error',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    })

                }
            });
        }
    },
    alertFormdataSuccess: function() {
        var me, form, store;
        me = this;
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function() {
                me.getFormdata().up('window').close();
                me.getGrid().getStore().reload();
            }
        });
    },
    alertFormdataFailed: function() {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
});