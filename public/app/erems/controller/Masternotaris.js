Ext.define('Erems.controller.Masternotaris', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Masternotaris',
    views: ['masternotaris.Panel', 'masternotaris.Grid', 'masternotaris.FormSearch', 'masternotaris.FormData'],
    stores: ['Masternotaris', 'Masterdata.store.City', 'Masterdata.store.Country'],
    models: ['Masternotaris'],
    refs: [
        {
            ref: 'grid',
            selector: 'masternotarisgrid'
        },
        {
            ref: 'formsearch',
            selector: 'masternotarisformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masternotarisformdata'
        }
    ],
    controllerName: 'masternotaris',
    fieldName: 'notaris',
    bindPrefixName: 'Masternotaris',
    formWidth: 700,
    init: function(application) {
        var me = this;
        this.control({
            'masternotarispanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masternotarisgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masternotarisgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masternotarisgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masternotarisgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masternotarisgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masternotarisgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masternotarisformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'masternotarisformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masternotarisformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masternotarisformdata': {
                afterrender: this.formDataAfterRender
            },
            'masternotarisformdata button[action=save]': {
                click: this.dataSave
            },
            'masternotarisformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masternotarisformdata #fd_country': {
                select: function(el, val) {
                    me.fdCountryOnSelect(el,val, 'fd_city');
                }

            },
            'masternotarisformsearch #fs_country': {
                select: function(el, val) {
                    me.fdCountryOnSelect(el, val, 'fs_city');
                }

            },
        });
    },
    formSearchAfterRender:function(el){
         var ftStore = null;
        ftStore = el.down('#fs_country').getStore();
        ftStore.load({params:{limit:0}});
        ftStore = el.down('#fs_city').getStore();
        ftStore.load({params:{limit:0,country_id:87}});
    },
    fdCountryOnSelect:function(el,val,elId){
       var me = this;
       var idCountry = val[0].internalId;
       var fdCity = null;
       if(elId=='fs_city'){
         fdCity = me.getFormsearch().down('#'+elId).getStore();  
       }else{
         fdCity = me.getFormdata().down('#'+elId).getStore();  
       }
       
    
       fdCity.load({params:{limit:0,country_id:idCountry}});
    },
    formDataAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);

        var ftStore = null;
        ftStore = el.down('#fd_country').getStore();
        ftStore.load({params:{limit:0}});
        ftStore = el.down('#fd_city').getStore();
        ftStore.load({params:{limit:0,country_id:87}});

        var state = el.up('window').state;

        if (state == 'create') {
            // el.down('#active').setValue(1);
        } else if (state == 'update') {

            var grid = me.getGrid();
            var store = grid.getStore();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            el.loadRecord(record);
        }
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