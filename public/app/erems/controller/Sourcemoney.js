Ext.define('Erems.controller.Sourcemoney', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Sourcemoney',
    views: ['sourcemoney.Panel', 'sourcemoney.Grid', 'sourcemoney.FormSearch', 'sourcemoney.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'sourcemoneygrid'
        },
        {
            ref: 'formsearch',
            selector: 'sourcemoneyformsearch'
        },
        {
            ref: 'formdata',
            selector: 'sourcemoneyformdata'
        }
    ],
    controllerName: 'sourcemoney',
    fieldName: 'sourcemoney',
    bindPrefixName:'Sourcemoney',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-posisiwinId',
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;
        
         me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();
        
        this.control({
            'sourcemoneypanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'sourcemoneygrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'sourcemoneygrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'sourcemoneygrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'sourcemoneygrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'sourcemoneygrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'sourcemoneygrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'sourcemoneyformsearch button[action=search]': {
                click: this.dataSearch
            },
            'sourcemoneyformsearch button[action=reset]': {
                click: this.dataReset
            },
            'sourcemoneyformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'sourcemoneyformdata button[action=save]': {
                click: this.mainDataSave
            },
            'sourcemoneyformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    },
    fdar: function() {
        return this.tools.fdar(this);
       
    },
    mainDataSave: function() {
        var me = this;

        me.tools.iNeedYou(me).save();
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
                            var res = Ext.decode(s.operations[0].response.responseText).total == undefined ? 1 : 0;
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