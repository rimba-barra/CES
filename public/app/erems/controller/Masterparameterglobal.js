Ext.define('Erems.controller.Masterparameterglobal', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Masterparameterglobal',
    views: ['masterparameterglobal.Panel', 'masterparameterglobal.Grid', 'masterparameterglobal.FormSearch', 'masterparameterglobal.FormData'],
    stores: ['Masterparameterglobal'],
    models: ['Masterparameterglobal'],
    requires: ['Erems.library.box.Config', 'Erems.library.box.tools.Tools'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterparameterglobalgrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterparameterglobalformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterparameterglobalformdata'
        },
        {
            ref:'panel',
            selector:'masterparameterglobalpanel'
        }
    ],
    controllerName: 'masterparameterglobal',
    fieldName: 'parametername',
    bindPrefixName: 'Masterparameterglobal',
    tools: null,
    myConfig: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });


    },
    init: function(application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'masterparameterglobalpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterparameterglobalgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterparameterglobalgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterparameterglobalgrid toolbar button[action=genxml]': {
                click: function() {
                    me.generateXMLFile();
                }
            },
            'masterparameterglobalgrid toolbar button[action=gendata]': {
                click: function() {
                    me.generateDataFromXml();
                }
            },
                  
            'masterparameterglobalgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterparameterglobalgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterparameterglobalgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterparameterglobalgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterparameterglobalformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterparameterglobalformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterparameterglobalformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterparameterglobalformdata button[action=save]': {
                click: function() {
                    me.myDataSave();
                }
            },
            'masterparameterglobalformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    },
    panelAfterRender:function(){
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                // purchaseletter_id: plId
            },
            success: function(data, model) {
                p.setLoading(false);
                var status = data['status'];
                if(status){
                    var g = me.getGrid();
                    g.down('toolbar button[action=gendata]').setVisible(true);
                }
                console.log(data);
            }
        }).read('checkuser');
    },
    myDataSave: function() {
        var me = this;
        var f = me.getFormdata();
        f.setLoading('Please wait...');
        me.tools.ajax({
            params: {
                // purchaseletter_id: plId
            },
            success: function(data, model) {
                console.log(data);
                console.log(model);
                var users = data['users'];
                var adminId = data['admin_id'];
                var str = 'The following users in active status : ';
                var otherUserCount = 0;
                for (var i in users) {
                    if (users[i]['user_id'] !== adminId) {
                        str += users[i]['user_fullname'] + ',';
                        otherUserCount += 1;
                    }
                }
                if (otherUserCount > 0) {
                    me.tools.alert.warning(str);
                } else {
                    me.dataSave();
                }

                f.setLoading(false);
            }
        }).read('checkuseronline');
        //  
    },
    generateXMLFile: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                // purchaseletter_id: plId
            },
            success: function(data, model) {
                p.setLoading(false);
            }
        }).read('gxml');
    },
    generateDataFromXml: function() {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                // purchaseletter_id: plId
            },
            success: function(data, model) {
                p.setLoading(false);
                var status = data['status'];
                if(status){
                    me.getGrid().getStore().loadPage(1);
                }
            }
        }).read('dxml');
    }




});