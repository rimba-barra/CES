Ext.define('Erems.controller.Masterpbbinduk', {
    extend: 'Erems.library.template.controller.Controlleralt',
    alias: 'controller.Masterpbbinduk',
    views: ['masterpbbinduk.Panel', 'masterpbbinduk.Grid', 'masterpbbinduk.FormSearch', 'masterpbbinduk.FormData'],
    stores: ['Masterpbbinduk'],
    models: ['Masterpbbinduk'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterpbbindukgrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterpbbindukformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterpbbindukformdata'
        },
    ],
    controllerName: 'masterpbbinduk',
    fieldName: 'code',
    bindPrefixName:'Masterpbbinduk',
    init: function(application) {
        var me = this;
        this.control({
            'masterpbbindukpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'masterpbbindukgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterpbbindukgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterpbbindukgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterpbbindukgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterpbbindukgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterpbbindukgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterpbbindukformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterpbbindukformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterpbbindukformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterpbbindukformdata button[action=save]': {
                click: this.dataSave
            },
            'masterpbbindukformdata button[action=cancel]': {
                click: this.formDataClose
            },
			
			 /* BROWSE CONTROL */
            'masterpbbindukbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'masterpbbindukbrowsepanel button[action=select]':{
                click:me.browsegridSelection
            },
            'masterpbbindukbrowsegrid':{
                afterrender:me.browsegridAfterRender
            },
			'masterpbbindukbrowseformsearch button[action=search]': {
                click: me.browsedataSearch
            },
			'masterpbbindukbrowseformsearch button[action=reset]': {
                click: me.browsedataReset
            }
            /* END BROWSE CONTROL */

        });
    },
    dataDestroy: function () {
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
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            var res = Ext.decode(s.operations[0].response.responseText);
                            if(res.success == false){
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
                                if(res.total[0].result == 1){
                                    var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                                    var successmsg   = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                                    var ttl          = 'Success';
                                }
                                else{
                                    var successmsg = 'Error: Unable to delete data.';
                                    var ttl          = 'Failure';
                                }
                                me.getGrid().up('window').unmask();
                                
                                store.un('beforesync', msg);
                                store.reload();

                                Ext.Msg.show({
                                    title   : ttl,
                                    msg     : successmsg,
                                    icon    : Ext.Msg.INFO,
                                    buttons : Ext.Msg.OK
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
    },
});