Ext.define('Erems.controller.Mastercontractor', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Mastercontractor',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    views: ['mastercontractor.Panel', 'mastercontractor.Grid', 'mastercontractor.FormSearch', 'mastercontractor.FormData'],
    //stores: ['Mastercontractor', 'Masterdata.store.City', 'Masterdata.store.Country'],
    //models: ['Mastercontractor'],
    refs: [
        {
            ref: 'grid',
            selector: 'mastercontractorgrid'
        },
        {
            ref: 'formsearch',
            selector: 'mastercontractorformsearch'
        },
        {
            ref: 'formdata',
            selector: 'mastercontractorformdata'
        },
        {
            ref: 'panel',
            selector: 'mastercontractorpanel'
        }
    ],
    controllerName: 'mastercontractor',
    fieldName: 'contractorname',
    bindPrefixName: 'Mastercontractor',
    comboBoxIdEl: [],
    dataHolder:{
       city:null,
       country:null
    },
    formWidth: 700,
    formxWinId: 'win-clusterwinId',
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
            'mastercontractorpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mastercontractorgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastercontractorgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'mastercontractorgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'mastercontractorgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastercontractorgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastercontractorgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mastercontractorformsearch':{
                afterrender: this.formSearchAfterRender
            },
            'mastercontractorformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastercontractorformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastercontractorformdata': {
                afterrender: this.formDataAfterRender
            },
            'mastercontractorformdata button[action=save]': {
                click: this.mainDataSave
            },
            'mastercontractorformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'mastercontractorformdata #fd_country': {
                select:function(el,val){
                    me.fdCountryOnSelect(el,val,'fd_city');
                }
                        
            },
            'mastercontractorformsearch #fs_country': {
                select:function(el,val){
                    me.fdCountryOnSelect(el,val,'fs_city');
                }
                        
            },

        });
    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.dataHolder.country = data.country?data.country:null;
                me.dataHolder.city = data.city?data.city:null;
                me.fillFormComponents(data, me.getFormsearch());
                p.setLoading(false);
            }
        }).read('detail');

    },
    fillFormComponents:function(data,f){
        var me = this;
        me.tools.wesea(me.dataHolder.city, f.down("[name=city_city_id]")).comboBox(true);
        me.tools.wesea(me.dataHolder.country, f.down("[name=country_country_id]")).comboBox(true);
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