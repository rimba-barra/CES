Ext.define('Erems.controller.Masteralasangantinama', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Masteralasangantinama',
    views: ['masteralasangantinama.Panel', 'masteralasangantinama.Grid', 'masteralasangantinama.FormSearch', 'masteralasangantinama.FormData'],
    stores: ['Masteralasangantinama'],
    models: ['Masteralasangantinama'],
    refs: [
        {
            ref: 'grid',
            selector: 'masteralasangantinamagrid'
        },
        {
            ref: 'formsearch',
            selector: 'masteralasangantinamaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masteralasangantinamaformdata'
        }
    ],
    controllerName: 'masteralasangantinama',
    fieldName: 'reasonchgname',
    bindPrefixName: 'Masteralasangantinama',
    init: function(application) {
        var me = this;
        this.control({
            'masteralasangantinamapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masteralasangantinamagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masteralasangantinamagrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masteralasangantinamagrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masteralasangantinamagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masteralasangantinamagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masteralasangantinamagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masteralasangantinamaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masteralasangantinamaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masteralasangantinamaformdata': {
                afterrender: this.formDataAfterRender
            },
            'masteralasangantinamaformdata button[action=save]': {
                click: this.dataSave
            },
            'masteralasangantinamaformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
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